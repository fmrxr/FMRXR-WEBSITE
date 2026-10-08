import { MEDIA } from "@/lib/service-films";

// Aperçus vidéo des cartes de la page Work : 6 s muettes en 4:3, tirées de la
// première vidéo de la galerie du projet (recadrées sur l'image nette quand la
// source est une verticale incrustée sur fond flou). Fichiers dans le bucket
// media : card-<slug>.mp4 et card-<slug>.jpg. Un projet absent de la liste
// garde sa couverture fixe.
const FILMS = new Set([
  "vigilance-zero", "between-frequencies", "classz-manifesto", "100-violons", "cinesthesia",
  "crk-cgi", "entangled-tatwin", "spectrum-birth-of-light", "don-pac-fashion-weak",
  "morninglory-content", "hide-and-seek", "ala-listening-party", "access-protocol", "spicy-sofi",
]);

export function projectFilm(slug: string): string | null {
  return FILMS.has(slug) ? `${MEDIA}/card-${slug}.mp4` : null;
}
