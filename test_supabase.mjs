import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    console.error("Missing Superbase URL or Anon Key");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testSupabase() {
    console.log("Testing Supabase Connection...");

    // 1. Try to fetch a non-existent user or just query profiles table to check RLS
    const { data, error } = await supabase.from('profiles').select('*').limit(1);
    if (error) {
        console.error("Error connecting to 'profiles' table:", error.message);
        console.log("This might mean the table doesn't exist, or Row Level Security blocks the read, or the URL/Key is invalid.");
    } else {
        console.log("Successfully connected to 'profiles' table. Data fetched:", data);
    }

    // 2. Try to create a dummy user
    const dummyEmail = `testuser_${Date.now()}@example.com`;
    const dummyPassword = "Password123!";
    console.log(`\nAttempting to sign up dummy user: ${dummyEmail}`);

    const { data: authData, error: authError } = await supabase.auth.signUp({
        email: dummyEmail,
        password: dummyPassword,
    });

    if (authError) {
        console.error("Sign up failed:", authError.message);
    } else {
        console.log("Sign up succeeded! User ID:", authData.user?.id);
        if (authData.user?.identities?.length === 0) {
            console.log("NOTE: User might already exist, or sign up restriction is active.");
        }
    }

}

testSupabase();
