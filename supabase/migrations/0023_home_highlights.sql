-- Accueil piloté depuis le CMS.
-- hero_projects : slugs des projets du hero de l'accueil, dans l'ordre de
--   défilement (3 attendus). NULL ou vide : les 3 premiers projets publiés.
-- home_experience : slug de l'expérience (ou du bloc produit) mise à la une
--   sur l'accueil. NULL : le hero de /experiences, sinon le Photobooth.

alter table site_settings add column if not exists hero_projects text[];
alter table site_settings add column if not exists home_experience text;

-- cover_media : la couverture choisie pour un projet, une image ou une vidéo de
--   sa galerie, montrée dans son format d'origine. NULL : l'aperçu animé de la
--   page Work, sinon cover_url.
alter table projects add column if not exists cover_media text;
