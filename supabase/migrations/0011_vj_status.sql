-- VJ Studio — remote status heartbeat, so the hosted page can show live render
-- progress from off the local machine. Single-row singleton (not per-owner
-- like os_graph): there's exactly one local render engine, and only the local
-- Python server (via SUPABASE_SERVICE_ROLE_KEY, which bypasses RLS) ever
-- writes to it - the RLS policy below only governs reads from the browser.

create table vj_status (
  id text primary key default 'singleton',
  online boolean not null default false,
  project_count int not null default 0,
  jobs_running int not null default 0,
  jobs_queued int not null default 0,
  active jsonb,
  updated_at timestamptz not null default now()
);

alter table vj_status enable row level security;

create policy vj_status_read on vj_status for select
  using (has_role(auth.uid(), 'admin'));

grant select on vj_status to authenticated;

create trigger vj_status_touch before update on vj_status
  for each row execute function touch_updated_at();
