-- Ajoute « guest » au type app_role.
--
-- user_roles.role est un ENUM Postgres cree en 0001 avec seulement 'admin' et
-- 'editor'. Declarer le role cote TypeScript ne suffit donc pas : la base aurait
-- refuse l'insertion avec « invalid input value for enum app_role: guest ».
--
-- ADD VALUE ne peut pas etre suivi, dans la meme transaction, d'une requete qui
-- utilise la nouvelle valeur. Cette migration ne fait que l'ajouter, et doit
-- rester seule.
alter type app_role add value if not exists 'guest';
