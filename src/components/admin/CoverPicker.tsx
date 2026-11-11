"use client";
import { isVideoUrl } from "@/lib/project-cover";
import { projectFilm } from "@/lib/project-films";

type GalleryItem = { url: string; alt?: string; caption?: string };

// Choix de la couverture d'un projet parmi les images et vidéos de sa galerie.
// Elle s'affiche dans son format d'origine sur les cartes et dans le hero de
// l'accueil. « Automatique » : l'aperçu animé de la page Work s'il existe,
// sinon la couverture fixe ci-dessus.
export function CoverPicker({
  value,
  onChange,
  gallery,
  slug,
  coverUrl,
}: {
  value: string | null | undefined;
  onChange: (v: string | null) => void;
  gallery: GalleryItem[];
  slug?: string;
  coverUrl?: string;
}) {
  const media = gallery.filter((g) => g.url && (isVideoUrl(g.url) || /\.(jpe?g|png|webp|gif|avif)(\?.*)?$/i.test(g.url)));
  const film = slug ? projectFilm(slug) : null;
  const auto = film ?? coverUrl;

  const tile = (key: string, selected: boolean, onClick: () => void, src: string | undefined, label: string) => (
    <button
      key={key}
      type="button"
      onClick={onClick}
      className={`relative flex h-32 items-center justify-center overflow-hidden rounded-md border bg-black transition ${selected ? "border-primary ring-2 ring-primary" : "opacity-70 hover:opacity-100"}`}
    >
      {src && (isVideoUrl(src) ? (
        <video src={src} muted loop autoPlay playsInline preload="metadata" className="h-full w-auto" />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt="" loading="lazy" className="h-full w-auto" />
      ))}
      <span className="absolute bottom-1 left-1 rounded bg-black/70 px-1.5 py-0.5 text-[10px] text-white">{label}</span>
    </button>
  );

  return (
    <div className="flex flex-col gap-2">
      <p className="text-xs text-muted-foreground">
        Image ou vidéo de la galerie, montrée sans recadrage dans son format d’origine. Ajoute d’abord le média à la galerie s’il n’y est pas.
      </p>
      <div className="flex flex-wrap gap-2">
        {tile("auto", !value, () => onChange(null), auto, film ? "Automatique · animée" : "Automatique")}
        {media.map((g, i) => tile(g.url, value === g.url, () => onChange(g.url), g.url, `${isVideoUrl(g.url) ? "Vidéo" : "Image"} ${i + 1}`))}
      </div>
      {media.length === 0 && <p className="text-xs text-muted-foreground">La galerie ne contient encore aucune image ni vidéo.</p>}
    </div>
  );
}
