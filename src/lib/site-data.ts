export interface Project {
  id: string; slug: string; title: string; client?: string; year?: string;
  category?: string; location?: string; summary?: string; description?: string;
  role: string[]; stack: string[]; tags: string[]; gradient?: string;
  cover_url?: string; cover_media?: string | null; gallery: { url: string; alt: string; caption: string }[];
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
  hero_media?: { url: string; poster?: string; title?: string; description?: string }[];
  /** Slugs affichés sur /experiences (CMS), null = toutes. */
  experiences_visible?: string[] | null;
  /** Projets du hero de l'accueil (CMS), dans l'ordre. Vide : les 3 premiers publiés. */
  hero_projects?: string[] | null;
  /** Expérience ou bloc produit à la une de l'accueil (CMS). */
  home_experience?: string | null;
}

export const SITE: SiteSettings = {
  name: "FMRXR Studio", tagline: "CREATIVE TECHNOLOGY",
  description: "Emotional data · Immersive arts · Intelligent realities",
  email: "fmrxr.studio@gmail.com", phone: "+216 56 930 469", location: "Tunis, Tunisie",
  founder: "Haïfa Al Jamila Becheikh", artist_alias: "EFFET MÈRE",
  socials: { instagram: "@fmr.xr", tiktok: "@fmrxrstudio", linkedin: "@fmrxrstudio", x: "@fmrxrstudio", web: "fmrxr.com" },
};
