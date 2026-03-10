-- Drop the old function first, just in case return types are too different to replace cleanly
DROP FUNCTION IF EXISTS get_teacher_class_progress();

-- Create fixed Postgres Function
CREATE OR REPLACE FUNCTION get_teacher_class_progress()
RETURNS TABLE (
  student_id uuid,
  full_name text,
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
    up.progress
  FROM profiles p
  LEFT JOIN user_progress up ON p.id = up.id
  WHERE p.teacher_id = auth.uid();
END;
$$;
