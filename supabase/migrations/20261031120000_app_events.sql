-- Funnel events recorded by src/utils/analytics.js.
-- Run once in the Supabase SQL editor (or with `supabase db push`).
-- The app can add rows but never read them; you read them in the dashboard.

create table if not exists public.app_events (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  event text not null check (event in (
    'landing_view', 'quiz_start', 'quiz_finish', 'sign_up',
    'paywall_view', 'checkout_start', 'purchase'
  )),
  visit_id uuid,
  user_id uuid default auth.uid() references auth.users (id) on delete set null,
  item text check (char_length(item) <= 120),
  props jsonb not null default '{}'::jsonb check (pg_column_size(props) <= 1024)
);

create index if not exists app_events_event_created_at_idx
  on public.app_events (event, created_at);

alter table public.app_events enable row level security;

grant insert on table public.app_events to anon, authenticated;

drop policy if exists "Anyone can record app events" on public.app_events;
create policy "Anyone can record app events"
  on public.app_events
  for insert
  to anon, authenticated
  with check (user_id is null or user_id = auth.uid());

-- Funnel for the last 30 days (paste into the SQL editor to read it):
--
-- select event,
--        count(*) as events,
--        count(distinct coalesce(user_id::text, visit_id::text)) as people
-- from public.app_events
-- where created_at > now() - interval '30 days'
-- group by event
-- order by array_position(array['landing_view', 'quiz_start', 'quiz_finish', 'sign_up',
--                               'paywall_view', 'checkout_start', 'purchase'], event);
