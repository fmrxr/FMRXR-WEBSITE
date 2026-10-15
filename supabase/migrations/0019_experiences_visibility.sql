-- Visibilite des experiences sur /experiences, pilotee depuis le CMS
-- (/admin/experiences). Liste des slugs AFFICHES : une experience ajoutee
-- plus tard dans le code reste cachee tant qu'on ne l'active pas.
-- "photobooth" designe le bloc AI Photobooth de la page.
-- NULL = pas encore regle : tout s'affiche (comportement d'avant).

alter table site_settings add column if not exists experiences_visible text[];

-- Etat de depart demande : seul le Photobooth reste visible.
update site_settings set experiences_visible = array['photobooth'] where experiences_visible is null;
