export interface Project {
  id: string; slug: string; title: string; client?: string; year?: string;
  category?: string; location?: string; summary?: string; description?: string;
  role: string[]; stack: string[]; tags: string[]; gradient?: string;
  cover_url?: string; gallery: { url: string; alt: string; caption: string }[];
  sort_order: number; published: boolean;
}
export interface Service { id: string; slug: string; title: string; short?: string; description?: string; outcomes: string[]; sort_order: number; published: boolean; }
export interface Industry { id: string; slug: string; name: string; note?: string; sort_order: number; published: boolean; }
export interface Article { id: string; slug: string; title: string; category?: string; excerpt?: string; body: string[]; cover_url?: string; date?: string; read_time?: string; sort_order: number; published: boolean; }
export interface StackItem { id: string; name: string; sort_order: number; }
export interface Client { id: string; name: string; sort_order: number; }
export interface SiteSettings {
  name: string; tagline?: string; description?: string; email?: string; phone?: string;
  location?: string; founder?: string; artist_alias?: string;
  socials: { instagram?: string; tiktok?: string; linkedin?: string; x?: string; web?: string };
  hero_media?: { url: string; poster?: string }[];
}

export const SITE: SiteSettings = {
  name: "FMRXR Studio", tagline: "CREATIVE TECHNOLOGY",
  description: "Emotional data · Immersive arts · Intelligent realities",
  email: "fmrxr.studio@gmail.com", phone: "+216 56 930 469", location: "Tunis, Tunisie",
  founder: "Haïfa Al Jamila Becheikh", artist_alias: "EFFET MÈRE",
  socials: { instagram: "@fmrxr.studio", tiktok: "@fmrxrstudio", linkedin: "@fmrxrstudio", x: "@fmrxrstudio", web: "fmrxr-studio.webflow.io" },
};
