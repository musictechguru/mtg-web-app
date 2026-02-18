-- 1. Create the table if it doesn't exist
create table if not exists public.profiles (
  id uuid references auth.users not null primary key,
  updated_at timestamp with time zone,
  username text unique,
  full_name text,
  avatar_url text,
  website text,
  is_premium boolean default false,

  constraint username_length check (char_length(username) >= 3)
);

-- 2. Enable RLS (safe to run multiple times, but policy creation might fail if exists)
alter table public.profiles enable row level security;

-- Drop meaningful policies to recreate them (avoid "policy already exists" error)
drop policy if exists "Public profiles are viewable by everyone." on public.profiles;
drop policy if exists "Users can insert their own profile." on public.profiles;
drop policy if exists "Users can update own profile." on public.profiles;

create policy "Public profiles are viewable by everyone." on public.profiles
  for select using (true);

create policy "Users can insert their own profile." on public.profiles
  for insert with check (auth.uid() = id);

create policy "Users can update own profile." on public.profiles
  for update using (auth.uid() = id);

-- 3. Create Trigger for NEW users
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, avatar_url, is_premium)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url', false);
  return new;
end;
$$ language plpgsql security definer;

-- Drop trigger if exists to avoid error
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 4. Backfill EXISTING users
insert into public.profiles (id, full_name, avatar_url, is_premium)
select 
  id, 
  raw_user_meta_data->>'full_name', 
  raw_user_meta_data->>'avatar_url', 
  false
from auth.users
where id not in (select id from public.profiles);
