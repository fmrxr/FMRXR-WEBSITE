-- Photobooth V2 : acces client par campagne, jeton de partage des portraits.
--
-- Pourquoi une table d'appartenance et pas un role « client » dans user_roles :
-- les tables de /collab (opportunities, notes, taches) sont ouvertes a tout
-- compte qui porte un role quelconque (has_any_role, migration 0012). Un role
-- client y aurait donne acces. Un client n'a donc AUCUN role : il est seulement
-- membre d'une ou plusieurs campagnes, et le serveur le verifie a chaque page.

create table if not exists public.photobooth_campaign_members (
  campaign_id uuid not null references public.photobooth_campaigns(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (campaign_id, user_id)
);
create index if not exists photobooth_campaign_members_user_idx
  on public.photobooth_campaign_members (user_id);

alter table public.photobooth_campaign_members enable row level security;

-- Un membre voit ses propres lignes (pour savoir ou atterrir apres connexion),
-- l'admin gere tout. Les campagnes et la consommation, elles, ne sont lues
-- que par le serveur apres verification : pas de politique membre dessus.
drop policy if exists photobooth_members_self on public.photobooth_campaign_members;
create policy photobooth_members_self on public.photobooth_campaign_members for select
  using (user_id = auth.uid() or has_role(auth.uid(), 'admin'));
drop policy if exists photobooth_members_admin on public.photobooth_campaign_members;
create policy photobooth_members_admin on public.photobooth_campaign_members for all
  using (has_role(auth.uid(), 'admin')) with check (has_role(auth.uid(), 'admin'));

-- Jeton de partage : 128 bits aleatoires, distinct de l'identifiant interne.
-- La page de partage ne marche que pour une generation reussie, 7 jours apres
-- sa fin (duree de conservation garantie par Higgsfield).
alter table public.photobooth_usage
  add column if not exists share_token text not null default replace(gen_random_uuid()::text, '-', '');
create unique index if not exists photobooth_usage_share_token_idx
  on public.photobooth_usage (share_token);
