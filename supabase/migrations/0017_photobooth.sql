-- Photobooth IA : campagnes, consommation, reservation atomique du quota.
--
-- Principe : aucune generation payante n'est envoyee a Higgsfield sans une
-- ligne photobooth_usage creee par photobooth_reserve(). Cette fonction
-- verrouille la ligne de campagne (FOR UPDATE), donc deux demandes simultanees
-- passent l'une apres l'autre et ne peuvent pas depasser le quota.
--
-- Comptabilite (une ligne = une image demandee) :
--   reserved / processing / unknown  -> occupent le quota (reservation active)
--   succeeded                        -> consomme le quota
--   failed / cancelled               -> liberent le quota
-- Higgsfield ne facture pas failed / nsfw / canceled (docs billing-and-retention).
-- unknown = issue inconnue (timeout, crash) : on garde la reservation jusqu'a
-- ce qu'un admin ou la reconciliation tranche.
--
-- Les montants sont en milliemes de dollar (mUSD, entier) : 0,040 $ = 40.

create table if not exists public.photobooth_campaigns (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9][a-z0-9-]{1,60}$'),
  name text not null,
  client_name text not null default '',
  status text not null default 'draft'
    check (status in ('draft', 'active', 'suspended', 'ended')),
  -- Cle d'acces de la borne : l'URL publique est /experience/photobooth/<slug>?k=<cle>.
  access_key text not null default replace(gen_random_uuid()::text, '-', ''),
  quota_limit int not null default 0 check (quota_limit >= 0),
  daily_quota_limit int check (daily_quota_limit is null or daily_quota_limit >= 0),
  max_concurrent int not null default 3 check (max_concurrent between 1 and 50),
  spending_limit_musd int check (spending_limit_musd is null or spending_limit_musd >= 0),
  -- Montant reserve par image avant l'appel : une estimation prudente, pas le cout reel.
  reserve_cost_musd int not null default 250 check (reserve_cost_musd >= 0),
  warning_threshold int not null default 70 check (warning_threshold between 1 and 100),
  critical_threshold int not null default 90 check (critical_threshold between 1 and 100),
  timezone text not null default 'Africa/Tunis',
  starts_at timestamptz,
  expires_at timestamptz,
  -- Modele, resolution, textes, questions : valide cote serveur (zod).
  config jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.photobooth_usage (
  id uuid primary key default gen_random_uuid(),
  campaign_id uuid not null references public.photobooth_campaigns(id) on delete cascade,
  session_id text not null check (length(session_id) between 8 and 80),
  idempotency_key text not null check (length(idempotency_key) between 8 and 80),
  status text not null default 'reserved'
    check (status in ('reserved', 'processing', 'succeeded', 'failed', 'cancelled', 'unknown')),
  model text not null default '',
  provider_job_id text,
  status_url text,
  result_url text,
  mood jsonb,
  reserved_cost_musd int not null default 0,
  actual_cost_musd int,
  error_code text,
  created_at timestamptz not null default now(),
  completed_at timestamptz,
  released_at timestamptz,
  unique (campaign_id, idempotency_key)
);

create index if not exists photobooth_usage_campaign_status_idx
  on public.photobooth_usage (campaign_id, status);
create index if not exists photobooth_usage_campaign_created_idx
  on public.photobooth_usage (campaign_id, created_at desc);

-- Journal des modifications de campagne (auteur, avant, apres).
create table if not exists public.photobooth_audit (
  id bigint generated always as identity primary key,
  campaign_id uuid references public.photobooth_campaigns(id) on delete cascade,
  actor uuid,
  action text not null,
  before jsonb,
  after jsonb,
  created_at timestamptz not null default now()
);

create or replace function public.photobooth_campaign_audit() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  if tg_op = 'INSERT' then
    insert into photobooth_audit (campaign_id, actor, action, after)
    values (new.id, auth.uid(), 'create', to_jsonb(new) - 'access_key');
  elsif tg_op = 'UPDATE' then
    new.updated_at := now();
    insert into photobooth_audit (campaign_id, actor, action, before, after)
    values (new.id, auth.uid(), 'update', to_jsonb(old) - 'access_key', to_jsonb(new) - 'access_key');
  end if;
  return new;
end; $$;

drop trigger if exists photobooth_campaign_audit_ins on public.photobooth_campaigns;
create trigger photobooth_campaign_audit_ins after insert on public.photobooth_campaigns
  for each row execute function public.photobooth_campaign_audit();
drop trigger if exists photobooth_campaign_audit_upd on public.photobooth_campaigns;
create trigger photobooth_campaign_audit_upd before update on public.photobooth_campaigns
  for each row execute function public.photobooth_campaign_audit();

-- Compteurs par campagne, lus par l'admin. security_invoker : la vue applique
-- la RLS de l'utilisateur qui la lit, donc rien pour anon.
create or replace view public.photobooth_campaign_usage
with (security_invoker = true) as
select
  c.id as campaign_id,
  count(u.id) filter (where u.status = 'succeeded')::int as succeeded,
  count(u.id) filter (where u.status in ('reserved', 'processing', 'unknown'))::int as active,
  count(u.id) filter (where u.status = 'unknown')::int as unknown,
  count(u.id) filter (where u.status in ('failed', 'cancelled'))::int as failed,
  count(u.id) filter (
    where u.status in ('succeeded', 'reserved', 'processing', 'unknown')
      and (u.created_at at time zone c.timezone)::date = (now() at time zone c.timezone)::date
  )::int as today,
  coalesce(sum(coalesce(u.actual_cost_musd, u.reserved_cost_musd))
    filter (where u.status = 'succeeded'), 0)::int as spent_musd,
  coalesce(sum(u.reserved_cost_musd)
    filter (where u.status in ('reserved', 'processing', 'unknown')), 0)::int as reserved_musd
from public.photobooth_campaigns c
left join public.photobooth_usage u on u.campaign_id = c.id
group by c.id;

-- Reservation atomique. Renvoie {ok:true, usage_id, duplicate} ou {ok:false, error}.
create or replace function public.photobooth_reserve(
  _campaign_id uuid,
  _session_id text,
  _idempotency_key text,
  _model text,
  _mood jsonb
) returns jsonb
language plpgsql security definer set search_path = public as $$
declare
  c photobooth_campaigns%rowtype;
  existing photobooth_usage%rowtype;
  used int;
  today_count int;
  running int;
  spend int;
  new_id uuid;
begin
  -- Verrou : serialise toutes les reservations de cette campagne.
  select * into c from photobooth_campaigns where id = _campaign_id for update;
  if not found then
    return jsonb_build_object('ok', false, 'error', 'CAMPAIGN_NOT_FOUND');
  end if;

  -- Idempotence : meme cle = meme reservation, jamais une deuxieme image.
  select * into existing from photobooth_usage
   where campaign_id = _campaign_id and idempotency_key = _idempotency_key;
  if found then
    return jsonb_build_object('ok', true, 'usage_id', existing.id, 'duplicate', true,
                              'status', existing.status);
  end if;

  if c.status = 'suspended' then
    return jsonb_build_object('ok', false, 'error', 'CAMPAIGN_SUSPENDED');
  end if;
  if c.status <> 'active' then
    return jsonb_build_object('ok', false, 'error', 'CAMPAIGN_INACTIVE');
  end if;
  if c.starts_at is not null and now() < c.starts_at then
    return jsonb_build_object('ok', false, 'error', 'CAMPAIGN_NOT_STARTED');
  end if;
  if c.expires_at is not null and now() >= c.expires_at then
    return jsonb_build_object('ok', false, 'error', 'CAMPAIGN_EXPIRED');
  end if;

  select count(*) filter (where status in ('succeeded', 'reserved', 'processing', 'unknown')),
         count(*) filter (where status in ('succeeded', 'reserved', 'processing', 'unknown')
                            and (created_at at time zone c.timezone)::date
                              = (now() at time zone c.timezone)::date),
         count(*) filter (where status in ('reserved', 'processing')),
         coalesce(sum(case
           when status = 'succeeded' then coalesce(actual_cost_musd, reserved_cost_musd)
           when status in ('reserved', 'processing', 'unknown') then reserved_cost_musd
           else 0 end), 0)
    into used, today_count, running, spend
    from photobooth_usage where campaign_id = _campaign_id;

  if used >= c.quota_limit then
    return jsonb_build_object('ok', false, 'error', 'QUOTA_EXHAUSTED');
  end if;
  if c.daily_quota_limit is not null and today_count >= c.daily_quota_limit then
    return jsonb_build_object('ok', false, 'error', 'DAILY_QUOTA_EXHAUSTED');
  end if;
  if c.spending_limit_musd is not null and spend + c.reserve_cost_musd > c.spending_limit_musd then
    return jsonb_build_object('ok', false, 'error', 'SPENDING_LIMIT_REACHED');
  end if;
  if running >= c.max_concurrent then
    return jsonb_build_object('ok', false, 'error', 'CONCURRENCY_LIMIT_REACHED');
  end if;

  insert into photobooth_usage (campaign_id, session_id, idempotency_key, model, mood, reserved_cost_musd)
  values (_campaign_id, _session_id, _idempotency_key, _model, _mood, c.reserve_cost_musd)
  returning id into new_id;

  return jsonb_build_object('ok', true, 'usage_id', new_id, 'duplicate', false, 'status', 'reserved');
end; $$;

-- Transition d'etat idempotente. Un etat terminal (succeeded, failed,
-- cancelled) ne bouge plus : un deuxieme appel ne compte rien deux fois.
create or replace function public.photobooth_transition(
  _usage_id uuid,
  _to text,
  _provider_job_id text default null,
  _status_url text default null,
  _result_url text default null,
  _error_code text default null,
  _actual_cost_musd int default null
) returns jsonb
language plpgsql security definer set search_path = public as $$
declare
  u photobooth_usage%rowtype;
  allowed boolean;
begin
  select * into u from photobooth_usage where id = _usage_id for update;
  if not found then
    return jsonb_build_object('ok', false, 'error', 'USAGE_NOT_FOUND');
  end if;

  if u.status in ('succeeded', 'failed', 'cancelled') then
    return jsonb_build_object('ok', u.status = _to, 'status', u.status, 'noop', true);
  end if;

  allowed := case u.status
    when 'reserved'   then _to in ('processing', 'failed', 'cancelled', 'unknown')
    when 'processing' then _to in ('processing', 'succeeded', 'failed', 'cancelled', 'unknown')
    when 'unknown'    then _to in ('processing', 'succeeded', 'failed', 'cancelled', 'unknown')
    else false end;
  if not allowed then
    return jsonb_build_object('ok', false, 'error', 'INVALID_TRANSITION', 'status', u.status);
  end if;

  update photobooth_usage set
    status = _to,
    provider_job_id = coalesce(_provider_job_id, provider_job_id),
    status_url = coalesce(_status_url, status_url),
    result_url = coalesce(_result_url, result_url),
    error_code = coalesce(_error_code, error_code),
    actual_cost_musd = coalesce(_actual_cost_musd, actual_cost_musd),
    completed_at = case when _to = 'succeeded' then now() else completed_at end,
    released_at = case when _to in ('failed', 'cancelled') then now() else released_at end
  where id = _usage_id;

  return jsonb_build_object('ok', true, 'status', _to);
end; $$;

-- Seul le serveur (service_role) appelle ces fonctions.
revoke all on function public.photobooth_reserve(uuid, text, text, text, jsonb) from public, anon, authenticated;
revoke all on function public.photobooth_transition(uuid, text, text, text, text, text, int) from public, anon, authenticated;
grant execute on function public.photobooth_reserve(uuid, text, text, text, jsonb) to service_role;
grant execute on function public.photobooth_transition(uuid, text, text, text, text, text, int) to service_role;

-- RLS : admin lit et ecrit les campagnes, admin lit la consommation et le
-- journal. Personne d'autre (ni anon, ni editor, ni guest) ne voit rien ;
-- la borne passe par les routes serveur en service_role.
alter table public.photobooth_campaigns enable row level security;
alter table public.photobooth_usage enable row level security;
alter table public.photobooth_audit enable row level security;

drop policy if exists photobooth_campaigns_admin on public.photobooth_campaigns;
create policy photobooth_campaigns_admin on public.photobooth_campaigns for all
  using (has_role(auth.uid(), 'admin')) with check (has_role(auth.uid(), 'admin'));

drop policy if exists photobooth_usage_admin_read on public.photobooth_usage;
create policy photobooth_usage_admin_read on public.photobooth_usage for select
  using (has_role(auth.uid(), 'admin'));

drop policy if exists photobooth_audit_admin_read on public.photobooth_audit;
create policy photobooth_audit_admin_read on public.photobooth_audit for select
  using (has_role(auth.uid(), 'admin'));
