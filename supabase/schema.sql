-- FinançasPessoais - Database Schema
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Transactions table
create table if not exists public.transactions (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  description text not null,
  amount numeric(12, 2) not null check (amount > 0),
  type text not null check (type in ('income', 'expense')),
  category text not null,
  date date not null,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- Index for faster queries by user and date
create index if not exists transactions_user_id_idx on public.transactions(user_id);
create index if not exists transactions_date_idx on public.transactions(date desc);

-- Row Level Security
alter table public.transactions enable row level security;

-- Policy: users can only see their own transactions
create policy "Users can view own transactions"
  on public.transactions for select
  using (auth.uid() = user_id);

-- Policy: users can insert their own transactions
create policy "Users can insert own transactions"
  on public.transactions for insert
  with check (auth.uid() = user_id);

-- Policy: users can update their own transactions
create policy "Users can update own transactions"
  on public.transactions for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Policy: users can delete their own transactions
create policy "Users can delete own transactions"
  on public.transactions for delete
  using (auth.uid() = user_id);

-- Trigger to auto-update updated_at
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger on_transactions_updated
  before update on public.transactions
  for each row execute procedure public.handle_updated_at();
