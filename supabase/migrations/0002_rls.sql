create or replace function has_role(_user_id uuid, _role app_role)
returns boolean
language sql stable security definer set search_path = public
as $$
  select exists (
    select 1 from user_roles where user_id = _user_id and role = _role
  );
$$;

create or replace function grant_first_admin() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  if (select count(*) from user_roles where role = 'admin') = 0 then
    insert into user_roles (user_id, role) values (new.id, 'admin');
  end if;
  return new;
end; $$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function grant_first_admin();

alter table user_roles enable row level security;
alter table site_settings enable row level security;
alter table projects enable row level security;
alter table services enable row level security;
alter table industries enable row level security;
alter table articles enable row level security;
alter table stack_items enable row level security;
alter table clients enable row level security;

create policy projects_read on projects for select
  using (published = true or has_role(auth.uid(),'admin') or has_role(auth.uid(),'editor'));
create policy projects_write on projects for all
  using (has_role(auth.uid(),'admin') or has_role(auth.uid(),'editor'))
  with check (has_role(auth.uid(),'admin') or has_role(auth.uid(),'editor'));

create policy services_read on services for select
  using (published = true or has_role(auth.uid(),'admin') or has_role(auth.uid(),'editor'));
create policy services_write on services for all
  using (has_role(auth.uid(),'admin') or has_role(auth.uid(),'editor'))
  with check (has_role(auth.uid(),'admin') or has_role(auth.uid(),'editor'));

create policy industries_read on industries for select
  using (published = true or has_role(auth.uid(),'admin') or has_role(auth.uid(),'editor'));
create policy industries_write on industries for all
  using (has_role(auth.uid(),'admin') or has_role(auth.uid(),'editor'))
  with check (has_role(auth.uid(),'admin') or has_role(auth.uid(),'editor'));

create policy articles_read on articles for select
  using (published = true or has_role(auth.uid(),'admin') or has_role(auth.uid(),'editor'));
create policy articles_write on articles for all
  using (has_role(auth.uid(),'admin') or has_role(auth.uid(),'editor'))
  with check (has_role(auth.uid(),'admin') or has_role(auth.uid(),'editor'));

create policy stack_read on stack_items for select using (true);
create policy stack_write on stack_items for all
  using (has_role(auth.uid(),'admin') or has_role(auth.uid(),'editor'))
  with check (has_role(auth.uid(),'admin') or has_role(auth.uid(),'editor'));

create policy clients_read on clients for select using (true);
create policy clients_write on clients for all
  using (has_role(auth.uid(),'admin') or has_role(auth.uid(),'editor'))
  with check (has_role(auth.uid(),'admin') or has_role(auth.uid(),'editor'));

create policy settings_read on site_settings for select using (true);
create policy settings_write on site_settings for all
  using (has_role(auth.uid(),'admin'))
  with check (has_role(auth.uid(),'admin'));

create policy roles_self_read on user_roles for select
  using (user_id = auth.uid() or has_role(auth.uid(),'admin'));
create policy roles_admin_write on user_roles for all
  using (has_role(auth.uid(),'admin'))
  with check (has_role(auth.uid(),'admin'));

grant usage on schema public to anon, authenticated;
grant select on all tables in schema public to anon, authenticated;
grant insert, update, delete on all tables in schema public to authenticated;
