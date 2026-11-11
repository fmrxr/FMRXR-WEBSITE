import { projectFilm } from "./project-films";

// La couverture d'un projet, partout où une carte ou le hero la montre.
// Priorité : la couverture choisie dans l'admin (cover_media, une image ou une
// vidéo de la galerie), puis l'aperçu animé de la page Work (card-<slug>.mp4),
// puis la couverture fixe (cover_url). Affichée dans son format d'origine,
// jamais recadrée.

const VIDEO_EXT = /\.(mp4|webm|mov|m4v)(\?.*)?$/i;
export const isVideoUrl = (url?: string | null) => !!url && VIDEO_EXT.test(url);

export type Cover = { src: string; poster?: string; video: boolean };

// L'affiche d'une vidéo est toujours SA première image, jamais l'ancienne
// couverture fixe : sinon l'ancienne couverture s'affiche au chargement, puis
// la vidéo la remplace (signalé le 11/11/2026).
export function projectCover(p: {
  slug: string;
  cover_url?: string | null;
  cover_media?: string | null;
  gallery?: { url: string; poster?: string | null }[] | null;
}): Cover | null {
  if (p.cover_media) {
    if (!isVideoUrl(p.cover_media)) return { src: p.cover_media, video: false };
    // L'affiche saisie dans la galerie pour cette vidéo, sinon aucune : mieux
    // vaut un fond noir le temps du chargement qu'une autre image.
    const poster = p.gallery?.find((g) => g.url === p.cover_media)?.poster || undefined;
    return { src: p.cover_media, poster, video: true };
  }
  const film = projectFilm(p.slug);
  // card-<slug>.jpg : la première image de l'aperçu, publiée avec lui.
  if (film) return { src: film, poster: film.replace(".mp4", ".jpg"), video: true };
  return p.cover_url ? { src: p.cover_url, video: false } : null;
}
