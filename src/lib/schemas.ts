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

export const galleryItem = z.object({
  url: z.string().url(),
  alt: otext(180),
  caption: otext(280),
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
  // Hero background video slider — list of clips (mp4/webm URL + optional poster).
  hero_media: arr(z.object({ url: ourl, poster: ourl })),
});
