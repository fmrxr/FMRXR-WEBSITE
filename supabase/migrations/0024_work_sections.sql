-- Page Work en deux sections (11/11/2026), réglées par projet dans l'admin.
-- 'brands' : Brands & Institutions · 'art' : Art, Music & Live.
-- NULL : section déduite des industries (src/lib/work-sections.ts).

alter table projects add column if not exists section text
  check (section is null or section in ('brands', 'art'));

update projects set section = 'brands' where slug in (
  'ooredoo-5g', 'dolphin-surf', 'crk-cgi', 'classz-manifesto', 'neophi',
  'mauritalent', 'piconsult', 'djerba-explore', 'mapping-oudhna',
  'access-protocol', 'morninglory-content', 'jardin-des-lucioles'
);

update projects set section = 'art' where section is null;
