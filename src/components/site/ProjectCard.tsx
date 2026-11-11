import Link from "next/link";
import { CardFilm } from "./CardFilm";
import { projectCover } from "@/lib/project-cover";

// Carte projet commune (accueil et page Work). Toutes les cartes ont la même
// hauteur et chaque couverture garde son format d'origine : une verticale est
// étroite, un paysage est large, rien n'est recadré. Le texte prend la largeur
// de l'image (w-0 min-w-full : il ne compte pas dans la largeur de la carte).

type P = { slug: string; title: string; client?: string; year?: string; category?: string; summary?: string; cover_url?: string | null; cover_media?: string | null; gallery?: { url: string; poster?: string | null }[] | null };

const MEDIA = "block h-full w-auto max-w-none transition-transform duration-700 group-hover:scale-[1.03]";

export function ProjectCard({ p, summary = false, className = "" }: { p: P; summary?: boolean; className?: string }) {
  const c = projectCover(p);
  return (
    <Link
      href={`/projects/${p.slug}`}
      className={`fm-glass-card group flex shrink-0 snap-start flex-col overflow-hidden rounded-xl ${className}`}
    >
      <div className="relative h-[260px] overflow-hidden bg-black md:h-[300px]">
        {c?.video ? (
          <CardFilm src={c.src} poster={c.poster ?? ""} className={MEDIA} preload="metadata" />
        ) : c ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={c.src} alt={p.title} loading="lazy" draggable={false} className={MEDIA} />
        ) : (
          <div className="flex h-full w-[225px] items-center justify-center bg-fmmutedbg md:w-[260px]">
            <span className="fm-display text-3xl text-white/5">FMRXR//</span>
          </div>
        )}
      </div>
      <div className="w-0 min-w-full p-4">
        <h3 className="fm-display text-base text-fmfg">{p.title}</h3>
        <p className="mt-1 text-[10px] uppercase tracking-[0.1em] text-fmmuted">
          {[p.client, p.year, p.category].filter(Boolean).join(" · ")}
        </p>
        {summary && p.summary && <p className="fm-grotesk mt-2 line-clamp-2 text-[13px] leading-relaxed text-fmmuted">{p.summary}</p>}
      </div>
    </Link>
  );
}
