-- Live Wall : qui a modere quoi. Jusqu'a 5 moderateurs nommes par mur
-- (liste dans wall_campaigns.config.moderators, chacun avec son lien) ;
-- chaque validation, masquage ou epinglage garde le nom de son auteur.

alter table public.wall_posts add column if not exists moderated_by text;
alter table public.wall_comments add column if not exists moderated_by text;
alter table public.wall_comments add column if not exists moderated_at timestamptz;
