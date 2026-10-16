-- Live Wall : mur de messages en direct, par campagne.
--
-- Les invites scannent un QR, envoient un mot doux, un dessin, une signature
-- ou une photo a la marque (ou colle un sticker seul sur le mur), decores de stickers de marque en option. Le mur
-- (grand ecran, tactile ou non) affiche les messages valides en cartes
-- deplacables, au format choisi (memoire, Instagram, Facebook, Reddit), avec
-- likes et commentaires envoyes depuis les telephones.
--
-- Toutes les ecritures passent par les routes serveur (service-role) : les
-- tables ne sont ouvertes qu'aux admins par la RLS, jamais a anon.

create table if not exists public.wall_campaigns (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9][a-z0-9-]{1,60}$'),
  name text not null,
  client_name text not null default '',
  status text not null default 'draft'
    check (status in ('draft', 'active', 'suspended', 'ended')),
  -- Cle du lien invite (dans le QR) : /experience/wall/<slug>?k=<cle>.
  -- Les cles de l'ecran et de la moderation en sont derivees (src/lib/wall/keys.ts).
  access_key text not null default replace(gen_random_uuid()::text, '-', ''),
  config jsonb not null default '{}'::jsonb,
  starts_at timestamptz,
  expires_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.wall_posts (
  id uuid primary key default gen_random_uuid(),
  campaign_id uuid not null references public.wall_campaigns(id) on delete cascade,
  session_id text not null check (length(session_id) between 8 and 80),
  kind text not null check (kind in ('text', 'drawing', 'signature', 'photo', 'sticker')),
  author text not null default '' check (length(author) <= 40),
  body text not null default '' check (length(body) <= 500),
  -- Dessin et signature : traits vectoriels normalises (0..1), rejoues sur le mur.
  strokes jsonb,
  has_strokes boolean generated always as (strokes is not null) stored,
  -- Photo : chemin dans le bucket prive wall-media (webp, sans EXIF).
  photo_path text,
  -- Stickers poses par l'invite : [{ id, x, y, s, r }] (x, y en 0..1).
  stickers jsonb not null default '[]'::jsonb,
  color text not null default '',
  status text not null default 'pending'
    check (status in ('pending', 'approved', 'hidden')),
  flag text,
  likes int not null default 0 check (likes >= 0),
  -- Position sur le mur : { x, y, r, z } (x, y en 0..1). Deplacable a l'ecran.
  pos jsonb,
  pinned boolean not null default false,
  created_at timestamptz not null default now(),
  -- Change a chaque deplacement, like ou moderation : le mur ne relit que ce qui a bouge.
  updated_at timestamptz not null default now(),
  moderated_at timestamptz
);

create index if not exists wall_posts_campaign_idx
  on public.wall_posts (campaign_id, status, created_at desc);
create index if not exists wall_posts_session_idx
  on public.wall_posts (campaign_id, session_id, created_at desc);

create table if not exists public.wall_comments (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.wall_posts(id) on delete cascade,
  campaign_id uuid not null references public.wall_campaigns(id) on delete cascade,
  session_id text not null check (length(session_id) between 8 and 80),
  author text not null default '' check (length(author) <= 40),
  body text not null default '' check (length(body) <= 280),
  sticker text check (sticker is null or length(sticker) <= 40),
  status text not null default 'pending'
    check (status in ('pending', 'approved', 'hidden')),
  flag text,
  created_at timestamptz not null default now()
);

create index if not exists wall_comments_post_idx
  on public.wall_comments (post_id, status, created_at);
create index if not exists wall_comments_campaign_idx
  on public.wall_comments (campaign_id, created_at desc);

create table if not exists public.wall_likes (
  post_id uuid not null references public.wall_posts(id) on delete cascade,
  session_id text not null check (length(session_id) between 8 and 80),
  created_at timestamptz not null default now(),
  primary key (post_id, session_id)
);

-- Like / retrait de like, atomique : le compteur suit toujours la table.
create or replace function public.wall_toggle_like(p_post uuid, p_session text)
returns table (liked boolean, likes int)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_deleted int;
begin
  perform 1 from wall_posts where id = p_post for update;
  if not found then
    return;
  end if;
  delete from wall_likes where post_id = p_post and session_id = p_session;
  get diagnostics v_deleted = row_count;
  if v_deleted > 0 then
    update wall_posts set likes = greatest(wall_posts.likes - 1, 0), updated_at = now() where id = p_post;
    return query select false, w.likes from wall_posts w where w.id = p_post;
  else
    insert into wall_likes (post_id, session_id) values (p_post, p_session);
    update wall_posts set likes = wall_posts.likes + 1, updated_at = now() where id = p_post;
    return query select true, w.likes from wall_posts w where w.id = p_post;
  end if;
end;
$$;

revoke all on function public.wall_toggle_like(uuid, text) from public, anon, authenticated;
grant execute on function public.wall_toggle_like(uuid, text) to service_role;

alter table public.wall_campaigns enable row level security;
alter table public.wall_posts enable row level security;
alter table public.wall_comments enable row level security;
alter table public.wall_likes enable row level security;

drop policy if exists wall_campaigns_admin on public.wall_campaigns;
create policy wall_campaigns_admin on public.wall_campaigns for all
  using (has_role(auth.uid(), 'admin')) with check (has_role(auth.uid(), 'admin'));
drop policy if exists wall_posts_admin on public.wall_posts;
create policy wall_posts_admin on public.wall_posts for all
  using (has_role(auth.uid(), 'admin')) with check (has_role(auth.uid(), 'admin'));
drop policy if exists wall_comments_admin on public.wall_comments;
create policy wall_comments_admin on public.wall_comments for all
  using (has_role(auth.uid(), 'admin')) with check (has_role(auth.uid(), 'admin'));
drop policy if exists wall_likes_admin on public.wall_likes;
create policy wall_likes_admin on public.wall_likes for all
  using (has_role(auth.uid(), 'admin')) with check (has_role(auth.uid(), 'admin'));

-- Photos des invites : bucket prive, servies par /api/wall/media/<id>.
insert into storage.buckets (id, name, public)
values ('wall-media', 'wall-media', false)
on conflict (id) do nothing;
