import { createHmac, timingSafeEqual } from "node:crypto";

// Trois acces par campagne :
//   k : invites (le QR affiche dans la salle) : ecrire, liker, commenter
//   s : ecran geant : afficher, deplacer, liker
//   m : moderation (equipe) : valider, masquer, epingler, tout deplacer
// s et m sont des HMAC de la cle invite avec un secret serveur : connaitre k
// (il est sur le QR, donc public) ne permet PAS de calculer s ou m.
// Changer la cle de la campagne coupe les trois anciens liens d'un coup.
// Les moderateurs nommes (max 5) ont en plus chacun leur propre cle m.

export type Access = "guest" | "screen" | "mod";

/**
 * Secret de derivation. WALL_KEY_SECRET si pose, sinon la cle service-role
 * Supabase (deja secrete et presente partout ou le serveur tourne). Changer ce
 * secret change tous les liens ecran et moderation communs.
 */
function secret(): string {
  const s = process.env.WALL_KEY_SECRET || process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!s) throw new Error("WALL_KEY_SECRET ou SUPABASE_SERVICE_ROLE_KEY manquant : impossible de deriver les cles du mur");
  return s;
}

const derive = (accessKey: string, role: string) =>
  createHmac("sha256", secret()).update(`${accessKey}:wall:${role}`).digest("hex").slice(0, 32);

export const screenKey = (accessKey: string) => derive(accessKey, "screen");
export const modKey = (accessKey: string) => derive(accessKey, "mod");

function same(a: string, b: string | null | undefined) {
  if (!b) return false;
  const x = Buffer.from(a);
  const y = Buffer.from(b);
  return x.length === y.length && timingSafeEqual(x, y);
}

/** Le plus fort des acces presentes (m > s > k), ou null. */
export function accessFor(accessKey: string, keys: { k?: string | null; s?: string | null; m?: string | null }, moderators: { key: string }[] = []): Access | null {
  if (same(modKey(accessKey), keys.m) || moderators.some((x) => same(x.key, keys.m))) return "mod";
  if (same(screenKey(accessKey), keys.s)) return "screen";
  if (same(accessKey, keys.k)) return "guest";
  return null;
}

export const guestPath = (slug: string, accessKey: string) => `/experience/wall/${slug}?k=${accessKey}`;
export const screenPath = (slug: string, accessKey: string) => `/experience/wall/${slug}/ecran?s=${screenKey(accessKey)}`;

/** Nom de l'auteur d'une action de moderation : le moderateur nomme, ou « Équipe » pour le lien commun. */
export function moderatorName(accessKey: string, m: string | null | undefined, moderators: { key: string; name: string }[]): string | null {
  if (same(modKey(accessKey), m)) return "Équipe";
  return moderators.find((x) => same(x.key, m))?.name ?? null;
}

export const personalModPath = (slug: string, key: string) => `/experience/wall/${slug}/moderation?m=${key}`;
export const modPath = (slug: string, accessKey: string) => `/experience/wall/${slug}/moderation?m=${modKey(accessKey)}`;
