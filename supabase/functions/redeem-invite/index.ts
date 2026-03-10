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

    // For verifying the user, use anon key with the user's token
    const supabase = createClient(
      Deno.env.get('PROJECT_URL') ?? '',
      Deno.env.get('ANON_KEY') ?? '',
      { global: { headers: { Authorization: authHeader } } }
    )

    const { data: { user }, error: authError } = await supabase.auth.getUser(token)

    if (authError || !user) {
      throw new Error('Not logged in')
    }

    const { teacherId } = await req.json()
    if (!teacherId || teacherId === user.id) {
        throw new Error('Invalid or missing teacher ID')
    }

    // Initialize regular suabase client using Service Role to bypass RLS and update tables securely
    const adminSupabase = createClient(
      Deno.env.get('PROJECT_URL') ?? '',
      Deno.env.get('SERVICE_ROLE_KEY') ?? ''
    )

    // Check teacher exists and has licenses available
    const { data: teacher, error: teacherError } = await adminSupabase
      .from('profiles')
      .select('licenses_total, licenses_used')
      .eq('id', teacherId)
      .eq('role', 'teacher')
      .single()

    if (teacherError || !teacher) {
        throw new Error('Teacher not found or invalid link')
    }

    if (teacher.licenses_used >= teacher.licenses_total) {
        throw new Error('This classroom pack is full. No more licenses available.')
    }

    // Check if the current user already has this teacher linked to prevent double counting
    const { data: currentProfile } = await adminSupabase
        .from('profiles')
        .select('teacher_id, is_premium')
        .eq('id', user.id)
        .single()

    if (currentProfile?.teacher_id === teacherId && currentProfile?.is_premium) {
        // Already redeemed
        return new Response(JSON.stringify({ success: true, message: 'Already joined.' }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 200,
        })
    }

    // Transactional logic is tricky in Supabase RPC without doing it in an SQL function.
    // Here we'll just do it sequentially. If high concurrency is expected, an RPC is better.
    // 1. Increment teacher's used licenses
    const { error: incError } = await adminSupabase
        .from('profiles')
        .update({ licenses_used: teacher.licenses_used + 1 })
        .eq('id', teacherId)

    if (incError) throw new Error('Failed to update teacher licenses.')

    // 2. Grant premium access to the student and set the teacher_id
    const { error: stuError } = await adminSupabase
        .from('profiles')
        .update({ is_premium: true, teacher_id: teacherId })
        .eq('id', user.id)

    if (stuError) throw new Error('Failed to assign premium to student.')

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
