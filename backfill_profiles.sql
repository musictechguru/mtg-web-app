-- Insert profiles for existing users who don't have one yet
INSERT INTO public.profiles (id, full_name, avatar_url, is_premium)
SELECT 
  id, 
  raw_user_meta_data->>'full_name', 
  raw_user_meta_data->>'avatar_url', 
  false
FROM auth.users
WHERE id NOT IN (SELECT id FROM public.profiles);
