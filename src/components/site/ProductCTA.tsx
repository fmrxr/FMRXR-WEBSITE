import Link from "next/link";
import type { Product } from "@/lib/products";
import { GameDemo } from "./GameDemo";
import { LiveWallDemo } from "./LiveWallDemo";

// Bloc produit de /experiences (et d'autres pages), active depuis le CMS.
// Deux sorties : la page Decouvrir du produit, et le brief prerempli.

export function ProductCTA({ product: p, index, source }: { product: Product; index: string; source: string }) {
  const visual = p.demo.kind === "wall" ? <LiveWallDemo />
    : p.demo.kind === "game" ? <GameDemo src={p.demo.src} poster={p.poster} label={`${p.name[0]}${p.name[1]}`} />
    : (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={p.poster} alt="" className="w-full rounded-xl border border-fmborder object-cover" />
    );
  return (
    <section className="mx-auto max-w-[1200px] border-t border-fmborder px-5 py-20 md:px-8 md:py-28">
      <div className="fm-glass-card grid items-center gap-10 overflow-hidden rounded-2xl p-6 md:grid-cols-[1fr_1.15fr] md:p-10">
        <div>
          <p className="text-[11px] uppercase tracking-[0.15em] text-fmaccent">{index}</p>
          <h2 className="fm-display mt-3 text-[clamp(2.6rem,7vw,5.2rem)] text-fmfg">
            {p.name[0]}<span className="text-fmaccent">{p.name[1]}</span>
          </h2>
          <p className="fm-display mt-3 text-[clamp(1.1rem,2.2vw,1.6rem)] text-fmfg/80">{p.tagline}</p>
          <p className="fm-grotesk mt-5 max-w-xl text-[15px] leading-relaxed text-fmfg/80">{p.intro}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={`/${p.slug}`} data-cta={`${p.slug}-discover-${source}`}
              className="rounded-full bg-fmfg px-6 py-3 text-sm font-semibold text-fmbg transition hover:bg-fmaccent">
              Discover {p.name.join("")}
            </Link>
            <Link href={`/start?ref=${p.slug}`} data-cta={`${p.slug}-start-${source}`}
              className="rounded-full border border-fmborder px-6 py-3 text-sm text-fmfg/85 transition hover:border-fmfg/50">
              Get a quote for your event
            </Link>
          </div>
        </div>
        {visual}
      </div>
      <ul className="mt-3 grid gap-px overflow-hidden rounded-xl border border-fmborder bg-fmborder text-sm sm:grid-cols-2 lg:grid-cols-4">
        {p.facts.map(([k, v]) => (
          <li key={k} className="bg-fmbg p-4">
            <p className="fm-display text-sm text-fmfg">{k}</p>
            <p className="fm-grotesk mt-1 text-[13px] text-fmmuted">{v}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
