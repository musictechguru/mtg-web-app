-- Update get_teacher_class_progress to include co-taught classes
-- Run this in your Supabase SQL Editor: https://supabase.com/dashboard/project/qjzoncdhfbeyvtiabsdk/sql

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
  WHERE p.teacher_id = auth.uid()
     OR p.teacher_id IN (
        SELECT id FROM profiles WHERE teacher_id = auth.uid() AND role = 'teacher'
     )
     OR (
        auth.uid() = '7ba50a09-985b-4edd-a679-799f79d02353' -- thor@musictechguru.com
        AND p.teacher_id = '249e4f7e-c4d3-4eeb-846a-fdcdcb82d937' -- mhansom@williamellis.camden.sch.uk
     );
END;
$$;
