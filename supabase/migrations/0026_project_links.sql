-- Liens externes d'un projet (12/11/2026) : écoute, réseaux de l'artiste, presse.
-- Une ligne par lien, « Libellé · https://… », affichés en boutons sur la fiche.
alter table projects add column if not exists links text[] not null default '{}';
