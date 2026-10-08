-- Classement par service sur la page Work : slugs de la table `services`.
alter table public.projects
  add column if not exists services text[] not null default '{}';
