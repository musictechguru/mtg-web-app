import { createClient } from "@supabase/supabase-js";
import * as dotenv from 'dotenv';
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://qjzoncdhfbeyvtiabsdk.supabase.co';
const supabaseKey = process.env.SERVICE_ROLE_KEY; 

const supabase = createClient(supabaseUrl, supabaseKey);

async function check() {
    // Get profiles column types
    const { data: cols, error: err2 } = await supabase.rpc('run_sql', {
       sql_query: "SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'profiles';"
    });
    console.log("Cols via RPC (if exists):", cols, err2);
}
check();
