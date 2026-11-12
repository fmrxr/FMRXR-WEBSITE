-- Journal de bord par service (12/11/2026), affiché sur /services et sur la
-- page de chaque service. Une ligne par entrée, la date en tête :
--   « 2026-10-08 · Texte de l'entrée »   (ou « 2026-11 · ... » au mois près)
-- Édité dans l'admin Services, champ « Journal de bord ».

alter table services add column if not exists log text[] not null default '{}';
