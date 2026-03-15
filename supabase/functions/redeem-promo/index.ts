import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
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

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? Deno.env.get('PROJECT_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? Deno.env.get('ANON_KEY') ?? '',
      { global: { headers: { Authorization: authHeader } } }
    )

    const adminSupabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? Deno.env.get('PROJECT_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? Deno.env.get('SERVICE_ROLE_KEY') ?? ''
    )

    const { data: { user }, error: userError } = await supabaseClient.auth.getUser(token)
    if (userError || !user) {
      throw new Error('Unauthorized')
    }

    const { promoCode } = await req.json()
    if (!promoCode) {
      throw new Error('Promo code is required')
    }

    // Get the valid promo code from environment variables
    const validPromoCode = Deno.env.get('FREE_PROMO_CODE')

    if (!validPromoCode) {
        throw new Error('Promo codes are not currently configured.')
    }

    if (promoCode.trim().toUpperCase() !== validPromoCode.toUpperCase()) {
        throw new Error('Invalid promo code.')
    }

    // Grant premium access to the student
    const { error: stuError } = await adminSupabase
        .from('profiles')
        .update({ is_premium: true })
        .eq('id', user.id)

    if (stuError) throw new Error('Failed to update premium status.')

    return new Response(JSON.stringify({ success: true }), {
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
