import { z } from "zod";

export const slug = z.string().regex(/^[a-z0-9-]+$/, "lowercase, digits, hyphens only").max(80);

// Optional text/url fields: DB columns are nullable, so rows come back with `null`
// for empty values. Coerce null/undefined -> "" before validating so editing an
// existing row (with nulls) doesn't fail with "expected string, received null".
const otext = (max = 280) => z.preprocess((v) => (v == null ? "" : v), z.string().max(max));
const ourl = z.preprocess((v) => (v == null ? "" : v), z.string().url().or(z.literal("")));
const oemail = z.preprocess((v) => (v == null ? "" : v), z.string().email().or(z.literal("")));
const arr = <T extends z.ZodTypeAny>(item: T) =>
  z.preprocess((v) => (v == null ? [] : v), z.array(item));

// Une entrée de galerie peut être une image ou une vidéo : la page projet
// regarde l'extension de `url` et rend <video> pour .mp4/.webm/.mov, <img>
// sinon. `poster` n'a de sens que pour une vidéo (image affichée avant le
// chargement) et reste vide pour une image.
//
// `sound` sépare les deux usages de la vidéo. À false (le défaut), c'est de la
// documentation d'installation : muette, en boucle, lancée toute seule. À true,
// la bande-son fait partie de l'œuvre : lecteur avec contrôles, rien ne démarre
// sans un clic, et le fichier n'est téléchargé qu'à ce moment-là.
// `credit` nomme l'auteur de la prise de vue, pas celui de l'œuvre. Beaucoup de
// documentation vient de photographes tiers qui autorisent l'usage contre
// mention, donc le crédit doit voyager avec le média et pas se perdre dans une
// légende rédigée à la main.
export const galleryItem = z.object({
  url: z.string().url(),
  alt: otext(180),
  caption: otext(280),
  credit: otext(120),
  poster: ourl,
  sound: z.preprocess((v) => (v == null ? false : v), z.boolean()),
  // `embed` marque une URL qui est une page web jouable ou manipulable, pas un
  // média : la page projet l'affiche dans un cadre, derrière un clic. Réservé
  // aux projets dont le livrable EST le site (jeu, outil, plateforme).
  embed: z.preprocess((v) => (v == null ? false : v), z.boolean()),
});

export const projectSchema = z.object({
  slug, title: z.string().min(1).max(120),
  client: otext(120),
  year: otext(12),
  category: otext(80),
  location: otext(120),
  summary: otext(280),
  description: otext(4000),
  role: arr(otext(80)),
  stack: arr(otext(80)),
  tags: arr(otext(40)),
  gradient: otext(120),
  cover_url: ourl,
  gallery: arr(galleryItem),
  sort_order: z.number().int().default(0),
  published: z.boolean().default(false),
});

export const serviceSchema = z.object({
  slug, title: z.string().min(1).max(120),
  short: otext(200),
  description: otext(4000),
  outcomes: arr(otext(160)),
  sort_order: z.number().int().default(0),
  published: z.boolean().default(false),
});

export const industrySchema = z.object({
  slug, name: z.string().min(1).max(120),
  note: otext(280),
  sort_order: z.number().int().default(0),
  published: z.boolean().default(false),
});

export const articleSchema = z.object({
  slug, title: z.string().min(1).max(160),
  category: otext(80),
  excerpt: otext(320),
  body: arr(otext(4000)),
  cover_url: ourl,
  // `date` is a real Postgres date column: empty must be null, not "".
  date: z.preprocess((v) => (v === "" || v == null ? null : v), z.string().max(20).nullable()),
  read_time: otext(20),
  sort_order: z.number().int().default(0),
  published: z.boolean().default(false),
});

export const stackItemSchema = z.object({
  name: z.string().min(1).max(80),
  sort_order: z.number().int().default(0),
});

export const clientSchema = z.object({
  name: z.string().min(1).max(120),
  sort_order: z.number().int().default(0),
});

export const settingsSchema = z.object({
  name: z.string().min(1).max(120),
  tagline: otext(160),
  description: otext(280),
  email: oemail,
  phone: otext(40),
  location: otext(120),
  founder: otext(120),
  artist_alias: otext(120),
  socials: z.preprocess(
    (v) => (v == null ? {} : v),
    z.object({
      instagram: otext(80),
      tiktok: otext(80),
      linkedin: otext(80),
      x: otext(80),
      web: otext(120),
    }),
  ),
  // Hero background video slider — clips with optional poster + info-card data.
  hero_media: arr(z.object({ url: ourl, poster: ourl, title: otext(120), description: otext(240) })),
});

// Public project-request (lead) submitted from the site.
export const leadSchema = z.object({
  name: z.string().min(1).max(120),
  email: z.string().email(),
  company: otext(160),
  industry: otext(120),
  service: otext(120),
  message: otext(2000),
  attachments: arr(z.object({ url: z.string().url(), name: otext(200), type: otext(80) })),
});
