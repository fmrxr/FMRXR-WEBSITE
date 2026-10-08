-- Qualification des demandes du formulaire Start a project.
alter table public.leads
  add column if not exists budget text not null default '',
  add column if not exists timeline text not null default '',
  add column if not exists location text not null default '';
