// Projets dont la page est ailleurs que /projects/<slug>. Une œuvre = une page :
// quand un projet est aussi un produit avec sa page de vente, la fiche projet
// redirige vers elle (next.config.ts), les cartes y mènent directement et le
// sitemap ne liste que la page qui reste. Décidé par Haïfa le 12/11/2026 pour
// Le Jardin des Lucioles, dont seule /firefly-garden est gardée.
export const PROJECT_PAGES: Record<string, string> = {
  "jardin-des-lucioles": "/firefly-garden",
};

export const projectHref = (slug: string) => PROJECT_PAGES[slug] ?? `/projects/${slug}`;
