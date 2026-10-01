-- Espace « Opportunities » : veille sur les appels a candidatures et montage
-- des dossiers a plusieurs. Separe de l'OS, qui reste reserve a l'admin.
--
-- Modele d'acces : tout compte porteur d'un role (admin, editor, guest) lit et
-- ecrit ces trois tables. Un compte authentifie SANS role ne voit rien, ce qui
-- evite qu'une simple inscription donne acces au plan de candidatures.

create table if not exists public.opportunities (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  org text,
  url text,
  location text,
  -- Echeance officielle de l'appel. deadline_note couvre les appels sans date
  -- ferme publiee (« a verifier », « variable »), qu'il faut afficher quand meme.
  deadline date,
  deadline_note text,
  -- funding est la phrase a afficher, funding_eur l'ordre de grandeur en euros
  -- servant uniquement a trier et comparer. Les deux coexistent parce qu'une
  -- dotation reelle se lit « 15 000 € par laureat, jusqu'a 50 000 € de production »
  -- et ne se reduit pas a un nombre sans perdre l'information.
  funding text,
  funding_eur numeric,
  covers_travel boolean,
  covers_production boolean,
  -- residency | festival | prize | commission | public_art | other
  category text,
  -- 1 = a faire en premier. Null = non classe.
  priority smallint,
  -- to_study | preparing | submitted | result
  status text not null default 'to_study',
  -- accepted | rejected | no_answer, renseigne quand status = result
  outcome text,
  assignee text,
  summary text,
  why_fit text,
  constraints_note text,
  dossier text,
  -- false pour les appels releves mais fermes a sa candidature : on les garde
  -- pour ne pas les re-analyser chaque semaine.
  eligible boolean not null default true,
  source text,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.opportunity_tasks (
  id uuid primary key default gen_random_uuid(),
  opportunity_id uuid not null references public.opportunities(id) on delete cascade,
  label text not null,
  assignee text,
  due_date date,
  done boolean not null default false,
  position smallint not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.opportunity_notes (
  id uuid primary key default gen_random_uuid(),
  opportunity_id uuid not null references public.opportunities(id) on delete cascade,
  author_email text,
  body text not null,
  created_at timestamptz not null default now()
);

-- Date du dernier releve de veille, pour que la page affiche son age plutot que
-- de laisser croire qu'elle est a jour.
create table if not exists public.collab_meta (
  key text primary key,
  value jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create index if not exists opportunities_deadline_idx on public.opportunities (deadline);
create index if not exists opportunity_tasks_opp_idx on public.opportunity_tasks (opportunity_id);
create index if not exists opportunity_notes_opp_idx on public.opportunity_notes (opportunity_id);

alter table public.opportunities enable row level security;
alter table public.opportunity_tasks enable row level security;
alter table public.opportunity_notes enable row level security;
alter table public.collab_meta enable row level security;

-- security definer : la politique doit pouvoir lire user_roles meme si la RLS
-- de cette table empeche l'utilisateur de la lire directement.
create or replace function public.has_any_role() returns boolean
language sql security definer stable set search_path = public as $$
  select exists (select 1 from public.user_roles ur where ur.user_id = auth.uid());
$$;

drop policy if exists collab_all on public.opportunities;
create policy collab_all on public.opportunities for all to authenticated
  using (public.has_any_role()) with check (public.has_any_role());

drop policy if exists collab_all on public.opportunity_tasks;
create policy collab_all on public.opportunity_tasks for all to authenticated
  using (public.has_any_role()) with check (public.has_any_role());

drop policy if exists collab_all on public.opportunity_notes;
create policy collab_all on public.opportunity_notes for all to authenticated
  using (public.has_any_role()) with check (public.has_any_role());

drop policy if exists collab_all on public.collab_meta;
create policy collab_all on public.collab_meta for all to authenticated
  using (public.has_any_role()) with check (public.has_any_role());

-- updated_at tenu par la base : une mise a jour faite hors de l'app (import,
-- editeur SQL) doit aussi faire bouger la date.
--
-- touch_updated_at() vient de la migration 0001 et sert deja a projects,
-- articles, os_graph et vj_status. On la reutilise telle quelle plutot que de la
-- redefinir : un « create or replace » ici reecrirait une fonction dont quatre
-- autres tables dependent.
drop trigger if exists opportunities_touch on public.opportunities;
create trigger opportunities_touch before update on public.opportunities
  for each row execute function public.touch_updated_at();
