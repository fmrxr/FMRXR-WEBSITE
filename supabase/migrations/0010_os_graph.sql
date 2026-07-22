-- FMRXR OS — stockage du knowledge graph dans Supabase (mode hybride)
-- Un document JSONB par propriétaire (owner), réservé aux admins. Miroir exact de knowledge-graph.json.

create table os_graph (
  id uuid primary key default gen_random_uuid(),
  owner uuid not null references auth.users(id) on delete cascade,
  data jsonb not null default '{}'::jsonb,
  updated_by text,
  updated_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  unique (owner)
);

alter table os_graph enable row level security;

-- Accès strictement réservé au propriétaire ET admin (l'OS est l'espace privé de Haïfa)
create policy os_graph_rw on os_graph for all
  using (owner = auth.uid() and has_role(auth.uid(), 'admin'))
  with check (owner = auth.uid() and has_role(auth.uid(), 'admin'));

create trigger os_graph_touch before update on os_graph
  for each row execute function touch_updated_at();

grant select, insert, update, delete on os_graph to authenticated;
