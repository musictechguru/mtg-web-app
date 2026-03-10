import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL || "https://qjzoncdhfbeyvtiabsdk.supabase.co";
const supabaseKey = process.env.SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFqem9uY2RoZmJleXZ0aWFic2RrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE0MDc1MDMsImV4cCI6MjA4Njk4MzUwM30.vyegI182lQXo9yqtGW6Mwvqz-BNbSenD-Era4AxZBJE";

const supabase = createClient(supabaseUrl, supabaseKey);

async function main() {
    // Log in as the test user
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: "test1234@example.com",
        password: "password123"
    });

    if (authError) {
        console.error("Login failed:", authError.message);
        return;
    }

    const token = authData.session.access_token;
    console.log("Got JWT, invoking edge function...");

    // Invoke the function exactly like the frontend does
    const res = await fetch(`${supabaseUrl}/functions/v1/create-checkout-session`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ priceId: 'price_1T9TUvLxDAAultYKPmTvNQh5' })
    });

    const body = await res.text();
    console.log(`Status: ${res.status}`);
    console.log(`Body: ${body}`);
}

main();
