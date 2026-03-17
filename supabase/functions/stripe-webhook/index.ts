import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import Stripe from 'https://esm.sh/stripe@14.14.0'
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const signature = req.headers.get('Stripe-Signature')
    const body = await req.text()

    const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
      apiVersion: '2023-10-16',
      httpClient: Stripe.createFetchHttpClient(),
    })

    let event
    try {
      event = await stripe.webhooks.constructEventAsync(
        body,
        signature!,
        Deno.env.get('STRIPE_WEBHOOK_SECRET')!
      )
    } catch (err) {
      console.log(`⚠️  Webhook signature verification failed.`, err.message)
      return new Response(err.message, { status: 400 })
    }

    // Initialize regular suabase client using Service Role to bypass RLS and update tables
    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? Deno.env.get('PROJECT_URL') ?? ''
    const supabaseKey = Deno.env.get('SERVICE_ROLE_KEY') ?? ''

    const supabase = createClient(
      supabaseUrl,
      supabaseKey
    )

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object
      const uuid = session.metadata?.supabase_uuid
      let checkoutType = session.metadata?.checkout_type || 'standard'
      const customerId = session.customer
      const subscriptionId = session.subscription

      // Safety check: If Price ID matches a known classroom price, force checkoutType to classroom
      // This protects against metadata being lost or incorrectly passed
      const lineItems = await stripe.checkout.sessions.listLineItems(session.id);
      const firstPriceId = lineItems.data[0]?.price?.id;
      
      const CLASSROOM_PRICES = [
        'price_1TBY9LLxDAAultYKd6OrgvvY', // 5 seats
        'price_1T9TUvLxDAAultYKPmTvNQh5'  // 10 seats
      ];

      if (CLASSROOM_PRICES.includes(firstPriceId)) {
        console.log(`Force-setting checkoutType to classroom based on Price ID: ${firstPriceId}`);
        checkoutType = 'classroom';
      }
      
      if (uuid) {
         console.log(`Processing update for user: ${uuid}`);
         console.log(`Checkout type: ${checkoutType}`);
         
         // Default updates for all purchases
         const updates: any = {
            is_premium: true,
            stripe_customer_id: customerId,
            stripe_subscription_id: subscriptionId
         }

         // Classroom Pack Handling
         if (checkoutType === 'classroom') {
            console.log("Detected Classroom Pack purchase. Upgrading to Teacher role.");
            updates.role = 'teacher'
            
            // Get seats from metadata (quantity field was used to store it)
            const quantityFromMetadata = session.metadata?.quantity;
            console.log(`Metadata Quantity/Seats: ${quantityFromMetadata}`);
            
            const seatsToAdd = parseInt(quantityFromMetadata || '10', 10)
            
            // Fetch current licenses to increment
            const { data: profile, error: profileError } = await supabase
              .from('profiles')
              .select('licenses_total')
              .eq('id', uuid)
              .single()
            
            if (profileError) {
              console.error(`Error fetching profile for licenses: ${profileError.message}`);
            }

            updates.licenses_total = (profile?.licenses_total || 0) + seatsToAdd
            console.log(`Adding ${seatsToAdd} licenses. New total will be: ${updates.licenses_total}`);
         }

         const { error: updateError } = await supabase.from('profiles').update(updates).eq('id', uuid)
         if (updateError) {
           console.error(`Error updating profile: ${updateError.message}`);
         } else {
           console.log(`Successfully updated profile for ${uuid}`);
         }
      } else {
        console.warn("No supabase_uuid found in session metadata. Cannot update profile.");
      }
    } else if (event.type === 'customer.subscription.deleted') {
      const subscription = event.data.object
      const customerId = subscription.customer
      
      // Find the user to handle potential teacher revocations
      const { data: profile } = await supabase.from('profiles').select('id, role').eq('stripe_customer_id', customerId).single()
      
      const updates: any = {
        is_premium: false,
        stripe_subscription_id: null
      }

      if (profile?.role === 'teacher') {
         updates.role = 'student'
         updates.licenses_total = 0
         // Revoke premium access for all students of this teacher
         await supabase.from('profiles').update({ is_premium: false, teacher_id: null }).eq('teacher_id', profile.id)
      }

      // Remove premium from user with this customer ID
      await supabase.from('profiles').update(updates).eq('stripe_customer_id', customerId)
    }

    return new Response(JSON.stringify({ received: true }), { headers: corsHeaders })
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 400,
      headers: corsHeaders,
    })
  }
})
