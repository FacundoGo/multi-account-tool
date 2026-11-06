-- Run this in the Supabase SQL Editor

create table if not exists public.connected_accounts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  platform text not null, -- 'instagram' | 'youtube' | 'x'
  platform_user_id text not null,
  username text,
  access_token text not null, -- encrypt later
  token_expires_at timestamptz,
  created_at timestamptz default now(),
  last_synced_at timestamptz,
  unique (user_id, platform, platform_user_id)
);

alter table public.connected_accounts enable row level security;

create policy "Users can view their own accounts"
  on public.connected_accounts for select
  using (auth.uid() = user_id);

create policy "Users can insert their own accounts"
  on public.connected_accounts for insert
  with check (auth.uid() = user_id);

create policy "Users can delete their own accounts"
  on public.connected_accounts for delete
  using (auth.uid() = user_id);
