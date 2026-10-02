import type { MetadataRoute } from "next";

// Sans robots.txt, rien ne déclare le sitemap aux moteurs. On autorise le site
// public et on ferme explicitement l'OS, l'admin et les routes API, qui sont
// déjà protégées par le proxy mais n'ont aucune raison d'être explorées.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/os", "/os/", "/admin", "/admin/", "/collab", "/collab/",
          "/account", "/api/", "/auth", "/start/thanks",
        ],
      },
    ],
    sitemap: "https://fmrxr.com/sitemap.xml",
    host: "https://fmrxr.com",
  };
}
