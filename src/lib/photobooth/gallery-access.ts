import { createHash, timingSafeEqual } from "node:crypto";

// Galerie d'equipe et portraits supprimes.
//
// Le lien de la borne circule (WhatsApp, borne en libre acces) : il ne donne
// jamais acces aux portraits des autres. La galerie d'equipe a sa propre cle,
// derivee de la cle de la campagne : changer la cle de la campagne coupe aussi
// l'ancien lien de galerie. Pas de colonne en plus, donc pas de migration.

export function galleryKey(accessKey: string): string {
  return createHash("sha256").update(`${accessKey}:gallery`).digest("hex").slice(0, 32);
}

export function isGalleryKey(accessKey: string, candidate: string | null | undefined): boolean {
  if (!candidate) return false;
  const a = Buffer.from(galleryKey(accessKey));
  const b = Buffer.from(candidate);
  return a.length === b.length && timingSafeEqual(a, b);
}

/**
 * Portrait supprime depuis une galerie : masque (drapeau dans mood), pas
 * efface. La ligne reste, car l'image a ete facturee et compte dans le quota.
 */
export function isHidden(mood: unknown): boolean {
  return Boolean((mood as { hidden?: unknown } | null)?.hidden);
}

/**
 * Code equipe a 6 chiffres, saisi sur la premiere page de la borne pour ouvrir
 * la galerie. Derive de la cle de la campagne, comme le lien de galerie.
 */
export function galleryPin(accessKey: string): string {
  const n = parseInt(createHash("sha256").update(`${accessKey}:pin`).digest("hex").slice(0, 12), 16);
  return String(n % 1_000_000).padStart(6, "0");
}

export function isGalleryPin(accessKey: string, candidate: string | null | undefined): boolean {
  if (!candidate || !/^\d{6}$/.test(candidate)) return false;
  return timingSafeEqual(Buffer.from(galleryPin(accessKey)), Buffer.from(candidate));
}

export function galleryPath(slug: string, accessKey: string): string {
  return `/experience/photobooth/${slug}/galerie?g=${galleryKey(accessKey)}`;
}
