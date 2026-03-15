create extension if not exists pgcrypto;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table if not exists public.artist_pages (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  spotify_artist_id text not null,
  slug text not null unique,
  display_name text not null,
  about_text text,
  status text not null default 'draft' check (status in ('draft', 'published')),
  verification_status text not null default 'unverified' check (verification_status in ('unverified', 'verified')),
  published_at timestamptz,
  last_synced_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists artist_pages_user_id_idx on public.artist_pages(user_id);
create index if not exists artist_pages_slug_idx on public.artist_pages(slug);

drop trigger if exists artist_pages_set_updated_at on public.artist_pages;
create trigger artist_pages_set_updated_at
before update on public.artist_pages
for each row execute function public.set_updated_at();

create table if not exists public.artist_social_links (
  id uuid primary key default gen_random_uuid(),
  artist_page_id uuid not null references public.artist_pages(id) on delete cascade,
  platform text not null,
  url text not null,
  is_visible boolean not null default true,
  sort_order integer not null default 0,
  source text not null default 'manual' check (source in ('manual', 'scraped')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (artist_page_id, platform, url)
);

create index if not exists artist_social_links_artist_page_id_idx on public.artist_social_links(artist_page_id);

drop trigger if exists artist_social_links_set_updated_at on public.artist_social_links;
create trigger artist_social_links_set_updated_at
before update on public.artist_social_links
for each row execute function public.set_updated_at();

create table if not exists public.sync_runs (
  id uuid primary key default gen_random_uuid(),
  artist_page_id uuid not null references public.artist_pages(id) on delete cascade,
  requested_by uuid not null references auth.users(id) on delete cascade,
  job_type text not null default 'manual_refresh',
  status text not null default 'queued' check (status in ('queued', 'running', 'completed', 'failed')),
  error text,
  queued_at timestamptz not null default now(),
  started_at timestamptz,
  finished_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists sync_runs_artist_page_id_idx on public.sync_runs(artist_page_id);
create index if not exists sync_runs_status_idx on public.sync_runs(status);

drop trigger if exists sync_runs_set_updated_at on public.sync_runs;
create trigger sync_runs_set_updated_at
before update on public.sync_runs
for each row execute function public.set_updated_at();

alter table public.artist_pages enable row level security;
alter table public.artist_social_links enable row level security;
alter table public.sync_runs enable row level security;

drop policy if exists "Users can read own artist pages" on public.artist_pages;
create policy "Users can read own artist pages"
on public.artist_pages
for select
using (auth.uid() = user_id);

drop policy if exists "Users can create own artist pages" on public.artist_pages;
create policy "Users can create own artist pages"
on public.artist_pages
for insert
with check (auth.uid() = user_id);

drop policy if exists "Users can update own artist pages" on public.artist_pages;
create policy "Users can update own artist pages"
on public.artist_pages
for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "Users can delete own artist pages" on public.artist_pages;
create policy "Users can delete own artist pages"
on public.artist_pages
for delete
using (auth.uid() = user_id);

drop policy if exists "Users can read own artist social links" on public.artist_social_links;
create policy "Users can read own artist social links"
on public.artist_social_links
for select
using (
  exists (
    select 1
    from public.artist_pages ap
    where ap.id = artist_page_id and ap.user_id = auth.uid()
  )
);

drop policy if exists "Users can insert own artist social links" on public.artist_social_links;
create policy "Users can insert own artist social links"
on public.artist_social_links
for insert
with check (
  exists (
    select 1
    from public.artist_pages ap
    where ap.id = artist_page_id and ap.user_id = auth.uid()
  )
);

drop policy if exists "Users can update own artist social links" on public.artist_social_links;
create policy "Users can update own artist social links"
on public.artist_social_links
for update
using (
  exists (
    select 1
    from public.artist_pages ap
    where ap.id = artist_page_id and ap.user_id = auth.uid()
  )
)
with check (
  exists (
    select 1
    from public.artist_pages ap
    where ap.id = artist_page_id and ap.user_id = auth.uid()
  )
);

drop policy if exists "Users can delete own artist social links" on public.artist_social_links;
create policy "Users can delete own artist social links"
on public.artist_social_links
for delete
using (
  exists (
    select 1
    from public.artist_pages ap
    where ap.id = artist_page_id and ap.user_id = auth.uid()
  )
);

drop policy if exists "Users can read own sync runs" on public.sync_runs;
create policy "Users can read own sync runs"
on public.sync_runs
for select
using (auth.uid() = requested_by);

drop policy if exists "Users can enqueue own sync runs" on public.sync_runs;
create policy "Users can enqueue own sync runs"
on public.sync_runs
for insert
with check (
  auth.uid() = requested_by
  and exists (
    select 1
    from public.artist_pages ap
    where ap.id = artist_page_id and ap.user_id = auth.uid()
  )
);

