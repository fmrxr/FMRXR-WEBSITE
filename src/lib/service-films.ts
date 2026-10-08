// Les boucles motion des services (15 s, style « generated room »,
// BRAND/Motion/FMRXR_MOTION_STYLE.md, projets dans BRAND/Motion/fmrxr-services/).
// Fichiers dans le bucket media : svc-<slug>.mp4 et svc-<slug>.jpg (affiche).
// Un service ajouté sans film n'en affiche simplement pas.
export const MEDIA = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/media`;

const FILMS = new Set([
  "creative-direction", "xr", "projection-mapping", "generative-art", "interactive-installation",
  "real-time-systems", "brand-activation", "vjing", "ai-workflows", "web", "motion-design",
]);

export function serviceFilm(slug: string): { src: string; poster: string } | null {
  return FILMS.has(slug) ? { src: `${MEDIA}/svc-${slug}.mp4`, poster: `${MEDIA}/svc-${slug}.jpg` } : null;
}
