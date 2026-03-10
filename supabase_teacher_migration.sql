-- Add Classroom License columns to profiles table
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS role text DEFAULT 'student';
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS licenses_total integer DEFAULT 0;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS licenses_used integer DEFAULT 0;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS teacher_id uuid REFERENCES profiles(id);

-- Create a secure Postgres Function to fetch a teacher's students' progress
-- This bypasses RLS for the user_progress and profiles tables but ONLY returns 
-- rows where the profiles.teacher_id matches the authenticated user.
CREATE OR REPLACE FUNCTION get_teacher_class_progress()
RETURNS TABLE (
  student_id uuid,
  full_name text,
  email text,
  progress jsonb
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Ensure the user calling this is a teacher
  IF NOT EXISTS (
    SELECT 1 FROM profiles 
    WHERE id = auth.uid() AND role = 'teacher'
  ) THEN
    RAISE EXCEPTION 'Access denied: User is not a teacher';
  END IF;

  RETURN QUERY
  SELECT 
    p.id as student_id,
    p.full_name,
    p.email,
    up.progress
  FROM profiles p
  LEFT JOIN user_progress up ON p.id = up.id
  WHERE p.teacher_id = auth.uid();
END;
$$;
