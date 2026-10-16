import Link from "next/link";
import type { Product } from "@/lib/products";
import { GameDemo } from "./GameDemo";
import { LiveWallDemo } from "./LiveWallDemo";

// Page « Decouvrir » d'un produit, generee depuis sa fiche (src/lib/products.ts) :
// hero avec demo jouable, deroule, atouts, materiel, FAQ (+ donnees structurees),
// appel au brief prerempli. Meme grammaire que /photobooth.

const H2 = "fm-display mt-3 text-[clamp(1.8rem,4vw,3rem)] text-fmfg";
const KICK = "text-[11px] uppercase tracking-[0.15em] text-fmaccent";
const SECTION = "mx-auto max-w-[1200px] border-t border-fmborder px-5 py-20 md:px-8 md:py-24";

export function ProductPage({ product: p }: { product: Product }) {
  const title = `${p.name[0]}${p.name[1]}`;
  const demo = p.demo.kind === "wall" ? <LiveWallDemo />
    : p.demo.kind === "game" ? <GameDemo src={p.demo.src} poster={p.poster} label={title} /> : null;
  return (
    <>
      <section className="mx-auto grid max-w-[1200px] items-center gap-10 px-5 pb-16 pt-28 md:grid-cols-[1fr_1.1fr] md:px-8 md:pt-36">
        <div>
          <p className={KICK}>For your event</p>
          <h1 className="fm-display mt-3 text-[clamp(3rem,9vw,6.5rem)] text-fmfg">
            {p.name[0]}<span className="text-fmaccent">{p.name[1]}</span>
          </h1>
          <p className="fm-display mt-4 text-[clamp(1.2rem,2.4vw,1.8rem)] text-fmfg/85">{p.tagline}</p>
          <p className="fm-grotesk mt-6 max-w-xl text-[16px] leading-relaxed text-fmfg/80">{p.intro}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={`/start?ref=${p.slug}`} data-cta={`${p.slug}-start-hero`}
              className="rounded-full bg-fmfg px-6 py-3 text-sm font-semibold text-fmbg transition hover:bg-fmaccent">
              Get a quote for your event
            </Link>
            <Link href="/experiences" className="rounded-full border border-fmborder px-6 py-3 text-sm text-fmfg/85 transition hover:border-fmfg/50">
              All experiences
            </Link>
          </div>
        </div>
        {demo}
      </section>

      <section className="mx-auto max-w-[1200px] px-5 md:px-8">
        <ul className="grid gap-px overflow-hidden rounded-xl border border-fmborder bg-fmborder text-sm sm:grid-cols-2 lg:grid-cols-4">
          {p.facts.map(([k, v]) => (
            <li key={k} className="bg-fmbg p-4">
              <p className="fm-display text-sm text-fmfg">{k}</p>
              <p className="fm-grotesk mt-1 text-[13px] text-fmmuted">{v}</p>
            </li>
          ))}
        </ul>
      </section>

      {p.steps && (
        <section className={`${SECTION} mt-20`}>
          <p className={KICK}>How it plays</p>
          <h2 className={H2}>From the first step to the last</h2>
          <ol className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {p.steps.map(([k, v], i) => (
              <li key={k} className="rounded-xl border border-fmborder bg-fmcard p-5">
                <p className="font-mono text-xs text-fmaccent">0{i + 1}</p>
                <p className="fm-display mt-2 text-lg text-fmfg">{k}</p>
                <p className="fm-grotesk mt-2 text-[14px] leading-relaxed text-fmfg/75">{v}</p>
              </li>
            ))}
          </ol>
        </section>
      )}

      {p.features && (
        <section className={SECTION}>
          <p className={KICK}>What you get</p>
          <h2 className={H2}>Built for live conditions</h2>
          <div className="mt-10 grid gap-x-10 gap-y-8 md:grid-cols-2">
            {p.features.map(([k, v]) => (
              <div key={k}>
                <p className="fm-display text-lg text-fmfg">{k}</p>
                <p className="fm-grotesk mt-2 text-[15px] leading-relaxed text-fmfg/75">{v}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {p.specs && (
        <section className={SECTION}>
          <p className={KICK}>On site</p>
          <h2 className={H2}>What it runs on</h2>
          <dl className="mt-10 grid gap-px overflow-hidden rounded-xl border border-fmborder bg-fmborder sm:grid-cols-2">
            {p.specs.map(([k, v]) => (
              <div key={k} className="bg-fmbg p-5">
                <dt className="text-[11px] uppercase tracking-[0.15em] text-fmmuted">{k}</dt>
                <dd className="fm-grotesk mt-1 text-[15px] text-fmfg">{v}</dd>
              </div>
            ))}
          </dl>
        </section>
      )}

      {p.faq && (
        <section id="faq" className={SECTION}>
          <p className={KICK}>Questions</p>
          <h2 className={H2}>What event teams ask us</h2>
          <div className="mt-10 divide-y divide-fmborder border-y border-fmborder">
            {p.faq.map(([q, a]) => (
              <details key={q} className="group py-5">
                <summary className="fm-display cursor-pointer list-none text-lg text-fmfg">{q}</summary>
                <p className="fm-grotesk mt-3 max-w-3xl text-[15px] leading-relaxed text-fmfg/75">{a}</p>
              </details>
            ))}
          </div>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: p.faq.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
            }) }}
          />
        </section>
      )}

      <section className="mx-auto max-w-[1200px] border-t border-fmborder px-5 py-24 text-center md:px-8 md:py-32">
        <h2 className="fm-display text-[clamp(2rem,5vw,3.6rem)] text-fmfg">{p.closing ?? p.tagline}</h2>
        <Link href={`/start?ref=${p.slug}`} data-cta={`${p.slug}-start-footer`}
          className="mt-8 inline-block rounded-full bg-fmfg px-7 py-3.5 text-sm font-semibold text-fmbg transition hover:bg-fmaccent">
          Get a quote for your event
        </Link>
      </section>
    </>
  );
}
