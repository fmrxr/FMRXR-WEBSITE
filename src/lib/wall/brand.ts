import { z } from "zod";
import { LOCALES, SKINS, type WallConfig } from "./config";

// Ce que l'equipe du client a le droit de changer elle-meme sur son mur.
//
// La cle de moderation ouvre l'habillage, jamais le reglage. Tout ce qui
// protege la soiree ou le compte reste a FMRXR : la liste des moderateurs
// et leurs cles, les mots bloques, le mode de moderation, la validation
// des photos, les limites d'envoi, le capteur, les langues ouvertes.
// Un moderateur qui pourrait s'ajouter un collegue, lever la validation
// des photos ou vider les mots bloques tiendrait tout le mur.
//
// La liste ci-dessous est donc une liste blanche : un champ absent d'ici
// n'est pas modifiable par le client, meme s'il arrive dans la requete.

const hex = z.string().regex(/^#[0-9a-fA-F]{6}$/);
const localized = z.object({
  fr: z.string().max(160),
  en: z.string().max(160),
  ar: z.string().max(160),
});

/** Les stickers poses par le client : seulement des fichiers que nous servons. */
const sticker = z.object({
  id: z.string().regex(/^[a-z0-9_-]{1,40}$/),
  url: z.string().refine(
    (u) => u.startsWith("/") || /^https:\/\/[a-z0-9-]+\.supabase\.co\//.test(u),
    "le sticker doit venir du site ou de notre stockage",
  ),
  label: z.string().max(60),
});

export const brandPatchSchema = z.object({
  title: localized,
  prompt: localized,
  brandName: z.string().max(60),
  clientLogoUrl: z.string().max(500),
  skin: z.enum(SKINS),
  accent: hex,
  background: hex,
  backgroundImage: z.string().max(500),
  palette: z.array(hex).min(1).max(8),
  papers: z.array(z.object({
    url: z.string().refine(
      (u) => u.startsWith("/") || /^https:\/\/[a-z0-9-]+\.supabase\.co\//.test(u),
      "le papier doit venir du site ou de notre stockage",
    ),
    ink: z.enum(["dark", "light"]),
  }).nullable()).max(8),
  stickersEnabled: z.boolean(),
  stickers: z.array(sticker).max(40),
  maxStickersPerPost: z.number().int().min(1).max(12),
  defaultLocale: z.enum(LOCALES),
}).partial();

export type BrandPatch = z.infer<typeof brandPatchSchema>;

/** Les champs que la page de controle affiche et renvoie. */
export function brandOf(c: WallConfig) {
  return {
    title: c.title, prompt: c.prompt, brandName: c.brandName,
    clientLogoUrl: c.clientLogoUrl, skin: c.skin, accent: c.accent,
    background: c.background, backgroundImage: c.backgroundImage,
    palette: c.palette, papers: c.papers,
    stickersEnabled: c.stickersEnabled, stickers: c.stickers,
    maxStickersPerPost: c.maxStickersPerPost, defaultLocale: c.defaultLocale,
  };
}

/**
 * Applique la charte du client sur la configuration existante. Ne touche
 * qu'aux cles de la liste blanche, quoi que contienne `patch`.
 */
export function applyBrand(config: WallConfig, patch: BrandPatch): WallConfig {
  const safe: Record<string, unknown> = {};
  for (const k of Object.keys(brandPatchSchema.shape) as (keyof BrandPatch)[]) {
    if (patch[k] !== undefined) safe[k] = patch[k];
  }
  // La langue par defaut doit rester parmi celles ouvertes pour l'evenement.
  if (typeof safe.defaultLocale === "string" && !config.locales.includes(safe.defaultLocale as never)) {
    delete safe.defaultLocale;
  }
  return { ...config, ...safe } as WallConfig;
}
