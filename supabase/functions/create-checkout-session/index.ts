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
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      throw new Error('Missing Authorization header')
    }
    const token = authHeader.replace('Bearer ', '')

    const supabase = createClient(
      Deno.env.get('PROJECT_URL') ?? '',
      Deno.env.get('ANON_KEY') ?? '',
      { global: { headers: { Authorization: authHeader } } }
    )

    const {
      data: { user },
      error: authError
    } = await supabase.auth.getUser(token)

    if (authError) {
      console.error("Auth Error:", authError);
      throw new Error(`Auth Error: ${authError.message}`)
    }
    if (!user) {
      console.error("User not found from token");
      throw new Error('Not logged in')
    }
    
    console.log("Authenticated User ID:", user.id);

    // Get active user profile
    const { data: profile } = await supabase
      .from('profiles')
      .select('stripe_customer_id, full_name')
      .eq('id', user.id)
      .single()

    const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
      apiVersion: '2023-10-16',
      httpClient: Stripe.createFetchHttpClient(),
    })
    
    // Create customer if not exists
    let customerId = profile?.stripe_customer_id
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        name: profile?.full_name || '',
        metadata: {
          supabase_uuid: user.id
        }
      })
      customerId = customer.id
      
      // Save it back to profiles
      await supabase.from('profiles').update({ stripe_customer_id: customerId }).eq('id', user.id)
    }

    const { priceId, checkoutType = 'standard', quantity = 1 } = await req.json()

    // Create a checkout session
    // Provide a fallback URL in case the origin header is missing during server-to-server invocation
    const originUrl = req.headers.get('origin') || Deno.env.get('PROJECT_URL')?.replace('.supabase.co', '') || 'http://localhost:5176'
    
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      line_items: [
        {
          price: priceId,
          quantity: quantity,
        },
      ],
      mode: 'subscription',
      success_url: `${originUrl}/?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${originUrl}/`,
      metadata: {
        supabase_uuid: user.id,
        checkout_type: checkoutType
      }
    })

    return new Response(JSON.stringify({ sessionId: session.id, url: session.url }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    console.error("Function encountered an error:", error.message, error.stack, error)
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})
