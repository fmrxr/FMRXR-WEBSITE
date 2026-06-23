create type app_role as enum ('admin', 'editor');

create table user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  role app_role not null,
  unique (user_id, role)
);

create table site_settings (
  id uuid primary key default gen_random_uuid(),
  name text not null default 'FMRXR Studio',
  tagline text,
  description text,
  email text,
  phone text,
  location text,
  founder text,
  artist_alias text,
  socials jsonb not null default '{}'::jsonb
);

create table projects (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  client text,
  year text,
  category text,
  location text,
  summary text,
  description text,
  role text[] not null default '{}',
  stack text[] not null default '{}',
  tags text[] not null default '{}',
  gradient text,
  cover_url text,
  gallery jsonb not null default '[]'::jsonb,
  sort_order int not null default 0,
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table services (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  short text,
  description text,
  outcomes text[] not null default '{}',
  sort_order int not null default 0,
  published boolean not null default false
);

create table industries (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  note text,
  sort_order int not null default 0,
  published boolean not null default false
);

create table articles (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  category text,
  excerpt text,
  body text[] not null default '{}',
  cover_url text,
  date date,
  read_time text,
  published boolean not null default false,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table stack_items (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  sort_order int not null default 0
);

create table clients (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  sort_order int not null default 0
);

create or replace function touch_updated_at() returns trigger
language plpgsql as $$
begin new.updated_at = now(); return new; end; $$;

create trigger projects_touch before update on projects
  for each row execute function touch_updated_at();
create trigger articles_touch before update on articles
  for each row execute function touch_updated_at();
