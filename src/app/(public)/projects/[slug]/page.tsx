import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBySlug, getPublished } from "@/lib/public-data";

// Rendu a la demande plutot qu'ISR. L'hebergement fait tourner plusieurs
// processus Node, chacun avec son propre cache : avec revalidate, une meme URL
// renvoyait tantot l'ancienne version tantot la nouvelle selon le worker
// touche. Le contenu vient de Supabase et change souvent, la coherence prime
// ici sur la mise en cache.
export const dynamic = "force-dynamic";

// Une entrée de galerie peut être une vidéo. On ne la lit que sur l'extension
// du fichier, sans champ de type à saisir dans l'admin : une URL qui finit par
// .mp4/.webm/.mov devient un <video>, tout le reste reste une image.
const VIDEO_EXT = /\.(mp4|webm|mov|m4v)(\?.*)?$/i;
const isVideo = (url?: string) => !!url && VIDEO_EXT.test(url);

// Une partie de la documentation ne nous appartient pas et vit sur YouTube
// (captations de festival, full shows). On l'embarque plutôt que de la
// re-héberger : les droits restent chez le diffuseur et le compteur de vues
// aussi. Domaine -nocookie pour ne pas poser de traceur publicitaire tant que
// le visiteur n'a pas lancé la lecture.
const YT = /(?:youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/;
const youtubeId = (url?: string) => (url ? (url.match(YT)?.[1] ?? null) : null);

export async function generateStaticParams() {
  const projects = await getPublished("projects");
  return projects.map((p: any) => ({ slug: p.slug }));
}

// Chaque projet doit porter son propre titre et sa propre description : sans ça
// les dix pages héritaient du titre global et Google les traitait comme des
// doublons. On dérive tout du contenu réel plutôt que d'un gabarit figé.
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = await getBySlug("projects", slug);
  if (!p) return { title: "Projet introuvable", robots: { index: false, follow: false } };

  const context = [p.client, p.year, p.location].filter(Boolean).join(" · ");
  const description = (p.summary || p.description || "").replace(/\s+/g, " ").trim().slice(0, 300)
    || `${p.title}${context ? `. ${context}` : ""}`;
  const url = `/projects/${p.slug}`;
  const images = p.cover_url ? [{ url: p.cover_url, alt: p.title }] : undefined;

  return {
    title: `${p.title}${p.category ? ` · ${p.category}` : ""}`,
    description,
    keywords: [...(p.tags ?? []), ...(p.stack ?? []), p.client, p.category].filter(Boolean),
    alternates: { canonical: url },
    openGraph: { type: "article", url, title: p.title, description, images },
    twitter: { card: "summary_large_image", title: p.title, description, images: images?.map((i) => i.url) },
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = await getBySlug("projects", slug);
  if (!p) notFound();
  return (
    <article className="mx-auto max-w-4xl px-5 pb-24 md:px-8">
      <Link href="/projects" className="fm-link text-[11px] uppercase tracking-[0.12em] text-fmmuted">← Work</Link>

      <p className="mt-8 text-[11px] uppercase tracking-[0.12em] text-fmmuted">
        {[p.client, p.year, p.category].filter(Boolean).join(" · ")}
      </p>
      <h1 className="fm-display mt-3 text-[clamp(2.25rem,6vw,4.5rem)] text-fmfg">{p.title}</h1>

      {p.cover_url && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={p.cover_url} alt={p.title} className="mt-8 w-full rounded-xl border border-fmborder object-cover" />
      )}

      {p.summary && <p className="fm-grotesk mt-8 max-w-2xl text-lg leading-relaxed text-fmfg/85">{p.summary}</p>}
      {p.description && <p className="fm-grotesk mt-4 max-w-2xl whitespace-pre-line leading-relaxed text-fmmuted">{p.description}</p>}

      {(Array.isArray(p.role) && p.role.length > 0) || (Array.isArray(p.stack) && p.stack.length > 0) ? (
        <div className="mt-10 grid gap-px overflow-hidden rounded-xl border border-fmborder bg-fmborder sm:grid-cols-2">
          {Array.isArray(p.role) && p.role.length > 0 && (
            <div className="bg-fmbg p-5">
              <p className="text-[10px] uppercase tracking-[0.12em] text-fmmuted">Role</p>
              <p className="fm-grotesk mt-2 text-sm text-fmfg">{p.role.join(" · ")}</p>
            </div>
          )}
          {Array.isArray(p.stack) && p.stack.length > 0 && (
            <div className="bg-fmbg p-5">
              <p className="text-[10px] uppercase tracking-[0.12em] text-fmmuted">Stack</p>
              <p className="fm-grotesk mt-2 text-sm text-fmfg">{p.stack.join(" · ")}</p>
            </div>
          )}
        </div>
      ) : null}

      {Array.isArray(p.gallery) && p.gallery.length > 0 && (
        // Deux colonnes dès qu'il y a de quoi les remplir. Un média seul reste
        // pleine largeur : à demi-largeur il a l'air d'une vignette orpheline.
        <div className={`mt-10 grid gap-4 ${p.gallery.length > 1 ? "md:grid-cols-2" : ""}`}>
          {p.gallery.map((g: any, i: number) => (
            <figure key={i}>
              {youtubeId(g.url) ? (
                <div className="relative w-full overflow-hidden rounded-xl border border-fmborder pt-[56.25%]">
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${youtubeId(g.url)}`}
                    title={g.alt || g.caption || "Video"}
                    loading="lazy"
                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 h-full w-full"
                  />
                </div>
              ) : isVideo(g.url) ? (
                // Deux comportements selon que la bande-son fait partie de
                // l'œuvre ou non. Sans son : muette, en boucle, lancée seule,
                // et `muted` + `playsInline` sont obligatoires sinon les
                // navigateurs mobiles refusent l'autoplay et la vignette reste
                // figée. Avec son : jamais d'autoplay, contrôles visibles, et
                // `preload="metadata"` pour ne pas imposer le fichier entier à
                // quelqu'un qui ne cliquera pas.
                <video
                  src={g.url}
                  poster={g.poster || undefined}
                  aria-label={g.alt || undefined}
                  controls={!!g.sound}
                  muted={!g.sound}
                  loop={!g.sound}
                  autoPlay={!g.sound}
                  playsInline
                  preload="metadata"
                  className="w-full rounded-xl border border-fmborder"
                />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={g.url} alt={g.alt} className="rounded-xl border border-fmborder" />
              )}
              {(g.caption || g.credit) && (
                <figcaption className="mt-2 text-xs text-fmmuted">
                  {g.caption}
                  {g.credit && (
                    <span className="block text-[10px] uppercase tracking-[0.12em] text-fmmuted/70">
                      Photo {g.credit}
                    </span>
                  )}
                </figcaption>
              )}
            </figure>
          ))}
        </div>
      )}

      <div className="mt-16 border-t border-fmborder pt-8">
        <Link href="/contact" className="group text-sm uppercase tracking-[0.12em] text-fmfg">
          Request a similar installation{" "}
          <span className="inline-block text-fmaccent transition-transform group-hover:translate-x-1">→</span>
        </Link>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        name: p.title,
        headline: p.title,
        about: p.category,
        dateCreated: p.year,
        url: `https://fmrxr.com/projects/${p.slug}`,
        description: p.summary || undefined,
        abstract: p.description || undefined,
        image: p.cover_url || undefined,
        keywords: [...(p.role ?? []), ...(p.stack ?? []), ...(p.tags ?? [])].join(", ") || undefined,
        locationCreated: p.location ? { "@type": "Place", name: p.location } : undefined,
        genre: "New media art",
        inLanguage: "fr",
        creator: {
          "@type": "Organization",
          name: "FMRXR Studio",
          url: "https://fmrxr.com",
          founder: { "@type": "Person", name: "Haïfa Al Jamila Becheikh", alternateName: "EFFET MÈRE" },
        },
        ...(p.client ? { sponsor: { "@type": "Organization", name: p.client } } : {}),
      }) }} />
    </article>
  );
}
