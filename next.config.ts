import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Le projet était enregistré sous « Art Basel Paris ». L'exposition réelle
      // est DREAMING AGAIN chez WILDE Paris, aucune source ne la relie à Art Basel.
      // Le slug suit le titre, et l'ancienne URL est redirigée plutôt que laissée en 404.
      {
        source: "/projects/art-basel-paris",
        destination: "/projects/dreaming-again",
        permanent: true,
      },
      // « TouchDesigner / GLSL » nommait un outil, pas un service. Le service est
      // devenu Real-Time Systems, les outils restent cités dans sa fiche.
      {
        source: "/services/touchdesigner",
        destination: "/services/real-time-systems",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
