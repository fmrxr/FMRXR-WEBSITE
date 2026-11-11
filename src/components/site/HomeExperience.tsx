import Link from "next/link";
import { PhotoboothCTA } from "./PhotoboothCTA";
import { ProductCTA } from "./ProductCTA";
import { PRODUCTS } from "@/lib/products";
import { PHOTOBOOTH_SLUG, findExperience, heroSlug, isVisible } from "@/lib/experiences";

// La nouvelle expérience de l'accueil, choisie dans le CMS (/admin/experiences,
// bouton « Sur l'accueil »). Un bloc produit garde son bloc habituel ; une
// expérience du catalogue montre son aperçu et s'ouvre dans le lecteur de
// /experiences. Sans choix : le hero de /experiences, sinon le Photobooth.

export function HomeExperience({
  slug,
  visible,
  index,
}: {
  slug: string | null | undefined;
  visible: readonly string[] | null | undefined;
  index: string;
}) {
  const pick = [slug, heroSlug(visible), PHOTOBOOTH_SLUG].find((s) => s && isVisible(s, visible)) ?? PHOTOBOOTH_SLUG;

  if (pick === PHOTOBOOTH_SLUG) return <PhotoboothCTA index={index} source="home" />;
  const product = PRODUCTS.find((p) => p.slug === pick);
  if (product) return <ProductCTA product={product} index={index} source="home" />;
  const e = findExperience(pick);
  if (!e) return <PhotoboothCTA index={index} source="home" />;

  return (
    <section className="mx-auto max-w-[1200px] border-t border-fmborder px-5 py-20 md:px-8 md:py-28">
      <div className="fm-glass-card grid items-center gap-10 overflow-hidden rounded-2xl p-6 md:grid-cols-[1fr_1.15fr] md:p-10">
        <div>
          <p className="text-[11px] uppercase tracking-[0.15em] text-fmaccent">{index}</p>
          <h2 className="fm-display mt-3 text-[clamp(2.2rem,6vw,4.4rem)] leading-[0.95] text-fmfg">{e.title}</h2>
          <p className="fm-grotesk mt-5 max-w-xl text-[15px] leading-relaxed text-fmfg/80">{e.pitch}</p>
          <p className="mt-4 text-[10px] uppercase tracking-[0.1em] text-fmmuted">
            {[e.year, ...e.credits].filter(Boolean).join(" · ")}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={`/experiences?play=${e.slug}`}
              data-cta={`experience-play-home-${e.slug}`}
              className="rounded-full bg-fmfg px-6 py-3 text-sm font-semibold text-fmbg transition hover:bg-fmaccent"
            >
              Play it live
            </Link>
            <Link
              href={`/projects/${e.project}`}
              data-cta={`experience-project-home-${e.slug}`}
              className="rounded-full border border-fmborder px-6 py-3 text-sm text-fmfg/85 transition hover:border-fmfg/50"
            >
              See the project
            </Link>
          </div>
          {e.desktopOnly && <p className="mt-4 text-[11px] text-fmmuted">Best on a computer.</p>}
        </div>
        <Link href={`/experiences?play=${e.slug}`} className="group relative block overflow-hidden rounded-xl border border-fmborder" aria-label={`Play ${e.title}`}>
          {e.preview ? (
            <video src={e.preview} poster={e.poster} muted loop autoPlay playsInline preload="metadata" className="aspect-video w-full object-cover" />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={e.poster} alt="" loading="lazy" className="aspect-video w-full object-cover" />
          )}
          <span className="absolute bottom-3 left-3 rounded-full bg-black/60 px-3 py-1.5 text-[10px] uppercase tracking-[0.14em] text-fmfg backdrop-blur">
            <span className="text-fmaccent">▶</span> Running in your browser
          </span>
        </Link>
      </div>
    </section>
  );
}
