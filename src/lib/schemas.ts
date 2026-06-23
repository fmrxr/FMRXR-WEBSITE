import { z } from "zod";

export const slug = z.string().regex(/^[a-z0-9-]+$/, "lowercase, digits, hyphens only").max(80);
const text = (max = 280) => z.string().max(max);
const url = z.string().url().or(z.literal(""));

export const galleryItem = z.object({
  url: z.string().url(),
  alt: text(180).default(""),
  caption: text(280).default(""),
});

export const projectSchema = z.object({
  slug, title: z.string().min(1).max(120),
  client: text(120).optional().default(""),
  year: text(12).optional().default(""),
  category: text(80).optional().default(""),
  location: text(120).optional().default(""),
  summary: text(280).optional().default(""),
  description: z.string().max(4000).optional().default(""),
  role: z.array(text(80)).default([]),
  stack: z.array(text(80)).default([]),
  tags: z.array(text(40)).default([]),
  gradient: text(120).optional().default(""),
  cover_url: url.optional().default(""),
  gallery: z.array(galleryItem).default([]),
  sort_order: z.number().int().default(0),
  published: z.boolean().default(false),
});

export const serviceSchema = z.object({
  slug, title: z.string().min(1).max(120),
  short: text(200).optional().default(""),
  description: z.string().max(4000).optional().default(""),
  outcomes: z.array(text(160)).default([]),
  sort_order: z.number().int().default(0),
  published: z.boolean().default(false),
});

export const industrySchema = z.object({
  slug, name: z.string().min(1).max(120),
  note: text(280).optional().default(""),
  sort_order: z.number().int().default(0),
  published: z.boolean().default(false),
});

export const articleSchema = z.object({
  slug, title: z.string().min(1).max(160),
  category: text(80).optional().default(""),
  excerpt: text(320).optional().default(""),
  body: z.array(z.string().max(4000)).default([]),
  cover_url: url.optional().default(""),
  date: z.string().optional().default(""),
  read_time: text(20).optional().default(""),
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
  tagline: text(160).optional().default(""),
  description: text(280).optional().default(""),
  email: z.string().email().or(z.literal("")),
  phone: text(40).optional().default(""),
  location: text(120).optional().default(""),
  founder: text(120).optional().default(""),
  artist_alias: text(120).optional().default(""),
  socials: z.object({
    instagram: text(80).optional().default(""),
    tiktok: text(80).optional().default(""),
    linkedin: text(80).optional().default(""),
    x: text(80).optional().default(""),
    web: text(120).optional().default(""),
  }).default({ instagram: "", tiktok: "", linkedin: "", x: "", web: "" }),
});
