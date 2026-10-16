import type { Metadata } from "next";

// Balises de partage (WhatsApp, LinkedIn, X, Google). Next fusionne les
// metadonnees des segments superficiellement : une page qui redefinit
// openGraph perd siteName, la langue et l'image du layout. Chaque page passe
// donc par social(), qui remet le tout et une image par defaut.

type Img = { url: string; width?: number; height?: number; alt?: string };

/** Image par defaut (scripts/og-default.mjs) : film de la methode, logo, promesse. */
export const DEFAULT_OG_IMAGE: Img = {
  url: "/og/fmrxr.jpg", width: 1200, height: 630,
  alt: "FMRXR// Creative Technology: immersive installations, projection mapping, generative systems, live A/V",
};

/** Description coupee au mot : Google en affiche environ 160 caracteres. */
export function clip(s: string, max = 160): string {
  const t = s.replace(/\s+/g, " ").trim();
  if (t.length <= max) return t;
  const cut = t.slice(0, max - 1);
  return `${cut.slice(0, cut.lastIndexOf(" ") > 80 ? cut.lastIndexOf(" ") : cut.length).replace(/[\s,;:.·-]+$/, "")}…`;
}

export function social(o: {
  url: string;
  title: string;
  description: string;
  type?: "website" | "article" | "profile";
  images?: Img[];
  /** Champs d'article (publishedTime, authors). */
  article?: { publishedTime?: string; authors?: string[] };
}): Pick<Metadata, "openGraph" | "twitter"> {
  const images = o.images?.length ? o.images : [DEFAULT_OG_IMAGE];
  return {
    openGraph: {
      type: o.type ?? "website",
      siteName: "FMRXR Studio",
      locale: "en_US",
      url: o.url,
      title: o.title,
      description: o.description,
      images,
      ...(o.type === "article" ? o.article : {}),
    } as Metadata["openGraph"],
    twitter: {
      card: "summary_large_image",
      site: "@fmrxrstudio",
      creator: "@fmrxrstudio",
      title: o.title,
      description: o.description,
      images: images.map((i) => i.url),
    },
  };
}
