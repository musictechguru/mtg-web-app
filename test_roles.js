import { createClient } from "@supabase/supabase-js";
import * as dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(
  process.env.VITE_SUPABASE_URL || process.env.PROJECT_URL,
  process.env.SERVICE_ROLE_KEY
);

async function check() {
  const { data, error } = await supabase.from('profiles').select('id, full_name, email, role, teacher_id, is_premium').not('teacher_id', 'is', null);
  console.log("Students with a teacher_id:");
  console.log(data);
  console.log("Error:", error);

  // Check if get_teacher_class_progress is callable
  // we would have to call it as a specific teacher to test it properly, which needs their token.
}
check();
