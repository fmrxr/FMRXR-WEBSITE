-- Live Wall a grande echelle.
-- 1. Index pour savoir en une lecture si le mur a change (feed ?since=).
-- 2. Les 12 derniers commentaires valides de chaque message, et leur total,
--    en une requete (avant : 1000 commentaires au plus pour tout le mur).
-- 3. Les compteurs de tous les murs en une requete pour l'admin (avant :
--    5 requetes par mur, et la somme des likes tronquee a 1000 lignes).

create index if not exists wall_posts_campaign_updated_idx
  on public.wall_posts (campaign_id, updated_at desc);

create or replace function public.wall_feed_comments(p_posts uuid[], p_per int)
returns table (post_id uuid, id uuid, author text, body text, sticker text, created_at timestamptz, total bigint)
language sql
stable
security definer
set search_path = public
as $$
  select x.post_id, x.id, x.author, x.body, x.sticker, x.created_at, x.total
  from (
    select c.post_id, c.id, c.author, c.body, c.sticker, c.created_at,
           row_number() over (partition by c.post_id order by c.created_at desc) as rn,
           count(*) over (partition by c.post_id) as total
    from wall_comments c
    where c.post_id = any(p_posts) and c.status = 'approved'
  ) x
  where x.rn <= p_per
  order by x.created_at;
$$;

create or replace function public.wall_campaign_counts()
returns table (campaign_id uuid, pending bigint, approved bigint, hidden bigint, comments bigint, likes bigint)
language sql
stable
security definer
set search_path = public
as $$
  select w.id,
    (select count(*) from wall_posts p where p.campaign_id = w.id and p.status = 'pending'),
    (select count(*) from wall_posts p where p.campaign_id = w.id and p.status = 'approved'),
    (select count(*) from wall_posts p where p.campaign_id = w.id and p.status = 'hidden'),
    (select count(*) from wall_comments c where c.campaign_id = w.id),
    (select coalesce(sum(p.likes), 0) from wall_posts p where p.campaign_id = w.id)
  from wall_campaigns w;
$$;

revoke all on function public.wall_feed_comments(uuid[], int) from public, anon, authenticated;
revoke all on function public.wall_campaign_counts() from public, anon, authenticated;
grant execute on function public.wall_feed_comments(uuid[], int) to service_role;
grant execute on function public.wall_campaign_counts() to service_role;
