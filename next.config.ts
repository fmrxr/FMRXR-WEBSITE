import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Tester depuis un telephone sur le Wi-Fi (borne photobooth, camera) :
  // DEV_LAN_ORIGIN=<ip du PC> dans .env.local, puis `npm run dev:lan`.
  // Sans la variable, rien n'est ouvert (dev uniquement, sans effet en prod).
  allowedDevOrigins: process.env.DEV_LAN_ORIGIN ? [process.env.DEV_LAN_ORIGIN] : [],
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
      // La page d'attente /experiential est devenue le catalogue /experiences.
      {
        source: "/experiential",
        destination: "/experiences",
        permanent: true,
      },
      // L'ASSEMBLEUR (experience/assembleur/) : le prototype 360 est servi en
      // statique dans le catalogue. /experience/assembleur reste l'adresse courte.
      {
        source: "/experience/assembleur",
        destination: "/experiences/assembleur/index.html",
        permanent: false,
      },
      {
        source: "/services/touchdesigner",
        destination: "/services/real-time-systems",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
