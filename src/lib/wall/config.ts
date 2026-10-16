import { z } from "zod";

// Configuration d'une campagne Live Wall (colonne wall_campaigns.config).
// Tout ce qui est texte, format, option et limite se regle par campagne
// depuis l'admin, sans toucher au code.

export const LOCALES = ["fr", "en", "ar"] as const;
export type Locale = (typeof LOCALES)[number];

// Formats d'affichage des cartes. Inspires des reseaux, sans leurs logos.
export const SKINS = ["memory", "instagram", "facebook", "reddit"] as const;
export type Skin = (typeof SKINS)[number];

export const KINDS = ["text", "drawing", "signature", "photo", "sticker"] as const;
export type Kind = (typeof KINDS)[number];

const localized = z.object({ fr: z.string().max(160), en: z.string().max(160), ar: z.string().max(160) });
export type Localized = z.infer<typeof localized>;

const hex = z.string().regex(/^#[0-9a-fA-F]{6}$/);

const stickerSchema = z.object({
  id: z.string().regex(/^[a-z0-9_-]{1,40}$/),
  url: z.string().refine((u) => u.startsWith("/") || u.startsWith("https://"), "URL absolue https ou chemin du site"),
  label: z.string().max(60),
});
export type Sticker = z.infer<typeof stickerSchema>;

export const wallConfigSchema = z.object({
  title: localized, // en tete du mur
  prompt: localized, // la question posee a l'invite
  brandName: z.string().max(60), // pseudo-communaute affichee (r/<marque>, page de marque)
  clientLogoUrl: z.string().max(500),
  defaultLocale: z.enum(LOCALES),
  locales: z.array(z.enum(LOCALES)).min(1),
  skin: z.enum(SKINS),
  kinds: z.object({ text: z.boolean(), drawing: z.boolean(), signature: z.boolean(), photo: z.boolean(), sticker: z.boolean() })
    .refine((k) => Object.values(k).some(Boolean), "au moins un type de message"),
  likes: z.boolean(),
  comments: z.boolean(),
  // auto : un message propre passe aussitot, un message signale attend.
  // manual : tout attend la validation de l'equipe.
  moderation: z.enum(["auto", "manual"]),
  photoModeration: z.enum(["auto", "manual"]), // une photo est le contenu le plus risque
  blockedWords: z.array(z.string().min(2).max(40)).max(200),
  // Option : set de stickers digitaux de marque.
  stickersEnabled: z.boolean(),
  stickers: z.array(stickerSchema).max(40),
  maxStickersPerPost: z.number().int().min(1).max(12),
  // Interaction
  screenInteractive: z.boolean(), // ecran tactile : deplacer, ouvrir, liker
  guestMove: z.boolean(), // l'invite deplace sa carte depuis son telephone
  // Option capteur : une camera devant l'ecran geant suit les mains (MediaPipe,
  // sur le PC de l'ecran, rien n'est envoye). Poing ferme = attraper, main
  // ouverte = lacher. "none" = ecran tactile ou simple affichage.
  sensor: z.enum(["none", "camera"]),
  sensorMirror: z.boolean(), // camera face au public : image en miroir
  // Limites
  maxChars: z.number().int().min(20).max(500),
  maxPostsPerSession: z.number().int().min(1).max(50),
  cooldownSec: z.number().int().min(0).max(600),
  maxOnWall: z.number().int().min(6).max(120),
  // Couleurs
  accent: hex,
  background: hex,
  palette: z.array(hex).min(1).max(8), // couleurs des cartes « memoire »
});
export type WallConfig = z.infer<typeof wallConfigSchema>;

export const FMRXR_STICKERS: Sticker[] = [
  ["01_logo", "FMRXR//"], ["02_mark-circle", "//"], ["07_badge-ring", "Badge"],
  ["12_reality-is-generated", "Reality is generated"], ["14_emotional-data", "Emotional data"],
  ["21_live", "Live"], ["22_now-showing", "Now showing"], ["23_signal-ok", "Signal OK"],
  ["28_60fps", "60 fps"], ["45_generated-room", "Generated room"], ["46_point-cloud", "Point cloud"],
  ["48_spectrum", "Spectrum"],
].map(([id, label]) => ({ id: id.replace(/^\d+_/, ""), url: `/wall/stickers/fmrxr/${id}.webp`, label }));

export const DEFAULT_CONFIG: WallConfig = {
  title: { fr: "Le mur des mots doux", en: "The sweet words wall", ar: "جدار الكلمات الحلوة" },
  prompt: {
    fr: "Un mot doux, un dessin, une signature pour la marque",
    en: "A sweet word, a drawing, a signature for the brand",
    ar: "كلمة حلوة، رسمة أو توقيع للعلامة",
  },
  brandName: "fmrxr",
  clientLogoUrl: "",
  defaultLocale: "fr",
  locales: ["fr", "en", "ar"],
  skin: "memory",
  kinds: { text: true, drawing: true, signature: true, photo: true, sticker: true },
  likes: true,
  comments: true,
  moderation: "auto",
  photoModeration: "manual",
  blockedWords: [],
  stickersEnabled: true,
  stickers: FMRXR_STICKERS,
  maxStickersPerPost: 6,
  screenInteractive: true,
  guestMove: true,
  sensor: "none",
  sensorMirror: true,
  maxChars: 140,
  maxPostsPerSession: 5,
  cooldownSec: 15,
  maxOnWall: 48,
  accent: "#7bef7b",
  background: "#0d0c14",
  palette: ["#fff4b8", "#ffd6e0", "#cdeccf", "#d5e4ff", "#ffe2c4", "#e7dcff"],
};

export function resolveConfig(override: unknown):
  | { ok: true; config: WallConfig }
  | { ok: false; error: string } {
  const o = (override && typeof override === "object" ? override : {}) as Record<string, unknown>;
  const merged = {
    ...DEFAULT_CONFIG,
    ...o,
    kinds: { ...DEFAULT_CONFIG.kinds, ...((o.kinds && typeof o.kinds === "object" ? o.kinds : {}) as object) },
  };
  const parsed = wallConfigSchema.safeParse(merged);
  if (!parsed.success) {
    const i = parsed.error.issues[0];
    return { ok: false, error: `${i.path.join(".")} : ${i.message}` };
  }
  return { ok: true, config: parsed.data };
}

/** Ce que les telephones et l'ecran recoivent : jamais les mots bloques. */
export function publicConfig(c: WallConfig) {
  const { blockedWords: _b, ...rest } = c;
  void _b;
  return { ...rest, stickers: c.stickersEnabled ? c.stickers : [] };
}
export type PublicConfig = ReturnType<typeof publicConfig>;
