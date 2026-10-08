import Link from "next/link";
import { getPublished } from "@/lib/public-data";
import { PageHero } from "@/components/site/PageHero";
import { ProjectRow } from "@/components/site/ProjectRow";

// Rendu a la demande plutot qu'ISR. L'hebergement fait tourner plusieurs
// processus Node, chacun avec son propre cache : avec revalidate, une meme URL
// renvoyait tantot l'ancienne version tantot la nouvelle selon le worker
// touche. Le contenu vient de Supabase et change souvent, la coherence prime
// ici sur la mise en cache.
export const dynamic = "force-dynamic";

const pad = (n: number) => String(n).padStart(2, "0");

// Combien de projets dans la rangée d'ouverture. Assez pour remplir deux
// largeurs d'écran, pas au point de doubler les rangées qui suivent.
const LATEST = 8;

function Card({ p, i }: { p: any; i: number }) {
  return (
    <Link
      href={`/projects/${p.slug}`}
      className="fm-glass-card group block w-[78vw] max-w-[300px] shrink-0 snap-start overflow-hidden rounded-xl sm:w-72"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        {p.cover_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={p.cover_url}
            alt={p.title}
            loading="lazy"
            draggable={false}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-fmmutedbg">
            <span className="fm-display text-6xl text-white/5">{pad(i + 1)}</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>
      <div className="p-4">
        <h3 className="fm-display text-base text-fmfg">{p.title}</h3>
        <p className="mt-1 text-[10px] uppercase tracking-[0.1em] text-fmmuted">
          {[p.client, p.year, p.category].filter(Boolean).join(" · ")}
        </p>
        {p.summary && <p className="fm-grotesk mt-2 line-clamp-2 text-[13px] leading-relaxed text-fmmuted">{p.summary}</p>}
      </div>
    </Link>
  );
}

function Row({ title, href, projects }: { title: string; href?: string; projects: any[] }) {
  return (
    <section className="mt-14 first:mt-0">
      <div className="mb-4 flex items-baseline justify-between gap-4">
        <h2 className="fm-display text-xl text-fmfg md:text-2xl">
          {title} <span className="ml-1 align-middle text-[11px] tracking-[0.12em] text-fmmuted">{pad(projects.length)}</span>
        </h2>
        {href && (
          <Link href={href} className="fm-link shrink-0 text-[11px] uppercase tracking-[0.12em] text-fmmuted">
            The sector →
          </Link>
        )}
      </div>
      <ProjectRow>
        {projects.map((p, i) => (
          <Card key={p.id} p={p} i={i} />
        ))}
      </ProjectRow>
    </section>
  );
}

// Une rangée par industrie, dans l'ordre éditorial de la table `industries`.
// Un projet qui sert plusieurs secteurs apparaît dans chacun, comme un titre
// classé dans plusieurs genres. Ceux qui n'ont pas encore d'industrie ne
// disparaissent pas : ils tombent dans une dernière rangée.
export default async function Projects() {
  const [projects, industries] = await Promise.all([getPublished("projects"), getPublished("industries")]);

  const rows = industries
    .map((ind: any) => ({
      ind,
      items: projects.filter((p: any) => Array.isArray(p.industries) && p.industries.includes(ind.slug)),
    }))
    .filter((r: any) => r.items.length > 0);

  const known = new Set(industries.map((ind: any) => ind.slug));
  const unsorted = projects.filter(
    (p: any) => !Array.isArray(p.industries) || !p.industries.some((s: string) => known.has(s)),
  );

  return (
    <>
      <PageHero index="Work" title="Selected work" intro="Real systems, shipped under live conditions: new media art installations, projection mapping, generative environments and live A/V." />
      <div className="mx-auto max-w-[1200px] overflow-x-clip px-5 pb-24 md:px-8">
        <Row title="Latest" projects={projects.slice(0, LATEST)} />
        {rows.map(({ ind, items }: any) => (
          <Row key={ind.id} title={ind.name} href={`/industries/${ind.slug}`} projects={items} />
        ))}
        {unsorted.length > 0 && <Row title={rows.length ? "More work" : "All projects"} projects={unsorted} />}
      </div>
    </>
  );
}
