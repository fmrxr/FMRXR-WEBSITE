-- Rangées par industrie sur la page Work : chaque projet porte les slugs des
-- industries qu'il sert (table `industries`). Plusieurs possibles, un projet
-- apparaît alors dans chaque rangée concernée.
alter table public.projects
  add column if not exists industries text[] not null default '{}';
