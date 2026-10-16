import { createHash, timingSafeEqual } from "node:crypto";

// Trois acces par campagne, tous derives de la cle du lien invite :
//   k : invites (le QR affiche dans la salle) : ecrire, liker, commenter
//   s : ecran geant : afficher, deplacer, liker
//   m : moderation (equipe) : valider, masquer, epingler, tout deplacer
// Changer la cle de la campagne coupe les trois anciens liens d'un coup.

export type Access = "guest" | "screen" | "mod";

const derive = (accessKey: string, role: string) =>
  createHash("sha256").update(`${accessKey}:wall:${role}`).digest("hex").slice(0, 32);

export const screenKey = (accessKey: string) => derive(accessKey, "screen");
export const modKey = (accessKey: string) => derive(accessKey, "mod");

function same(a: string, b: string | null | undefined) {
  if (!b) return false;
  const x = Buffer.from(a);
  const y = Buffer.from(b);
  return x.length === y.length && timingSafeEqual(x, y);
}

/** Le plus fort des acces presentes (m > s > k), ou null. */
export function accessFor(accessKey: string, keys: { k?: string | null; s?: string | null; m?: string | null }): Access | null {
  if (same(modKey(accessKey), keys.m)) return "mod";
  if (same(screenKey(accessKey), keys.s)) return "screen";
  if (same(accessKey, keys.k)) return "guest";
  return null;
}

export const guestPath = (slug: string, accessKey: string) => `/experience/wall/${slug}?k=${accessKey}`;
export const screenPath = (slug: string, accessKey: string) => `/experience/wall/${slug}/ecran?s=${screenKey(accessKey)}`;
export const modPath = (slug: string, accessKey: string) => `/experience/wall/${slug}/moderation?m=${modKey(accessKey)}`;
