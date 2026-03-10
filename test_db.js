import { createClient } from "@supabase/supabase-js";

const supabaseUrl = 'https://qjzoncdhfbeyvtiabsdk.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFqem9uY2RoZmJleXZ0aWFic2RrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE0MDc1MDMsImV4cCI6MjA4Njk4MzUwM30.vyegI182lQXo9yqtGW6Mwvqz-BNbSenD-Era4AxZBJE';

const supabase = createClient(supabaseUrl, supabaseKey);

async function check() {
  const { data, error } = await supabase.from('profiles').select('id, email, is_premium, role, teacher_id').order('id', { ascending: false }).limit(20);
  console.log("Teacher IDs (anon key):");
  console.log(data);
  if (error) console.error(error);
}
check();
