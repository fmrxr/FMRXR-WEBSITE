import Link from "next/link";
import type { Product } from "@/lib/products";
import { GameDemo } from "./GameDemo";
import { LiveWallDemo } from "./LiveWallDemo";
import { EmbedDemo } from "./EmbedDemo";
import { ReelSwitcher } from "./ReelSwitcher";

// Page « Decouvrir » d'un produit, generee depuis sa fiche (src/lib/products.ts) :
// hero avec demo jouable, deroule, atouts, materiel, FAQ (+ donnees structurees),
// appel au brief prerempli. Meme grammaire que /photobooth.

const H2 = "fm-display mt-3 text-[clamp(1.8rem,4vw,3rem)] text-fmfg";
const KICK = "text-[11px] uppercase tracking-[0.15em] text-fmaccent";
const SECTION = "mx-auto max-w-[1200px] border-t border-fmborder px-5 py-20 md:px-8 md:py-24";

export function ProductPage({ product: p }: { product: Product }) {
  const title = `${p.name[0]}${p.name[1]}`;
  const demo = p.demo.kind === "wall" ? <LiveWallDemo />
    : p.demo.kind === "game" ? <GameDemo src={p.demo.src} poster={p.poster} label={title} />
    : p.demo.kind === "embed" ? <EmbedDemo src={p.demo.src} poster={p.poster} label={title} hint={p.demo.hint} /> : null;
  return (
    <>
      <section className="mx-auto grid max-w-[1200px] items-center gap-10 px-5 pb-16 pt-2 md:grid-cols-[1fr_1.1fr] md:px-8 md:pt-4">
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

      {p.showcases?.map((s) => (
        <section key={s.title} className={SECTION}>
          <p className={KICK}>{s.kicker}</p>
          <h2 className={H2}>{s.title}</h2>
          {s.body && <p className="fm-grotesk mt-5 max-w-3xl text-[16px] leading-relaxed text-fmfg/80">{s.body}</p>}
          <ul className={`mt-10 grid gap-6 sm:grid-cols-2 ${s.dense ? "lg:grid-cols-4" : s.items.length === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"}`}>
            {s.items.map(([src, k, v, tag]) => (
              <li key={k}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt={`${title}: ${k}`} loading="lazy" width={720} height={405}
                  className="aspect-video w-full rounded-lg border border-fmborder object-cover" />
                <p className={`fm-display mt-3 text-fmfg ${s.dense ? "text-[15px]" : "text-lg"}`}>
                  {k}
                  {tag && s.dense && <span className="ml-2 rounded border border-fmborder px-1.5 py-0.5 align-middle font-mono text-[10px] text-fmmuted">{tag}</span>}
                </p>
                {tag && !s.dense && <p className="mt-1 text-[12px] font-semibold text-fmaccent">{tag}</p>}
                <p className={`fm-grotesk mt-1.5 leading-relaxed text-fmfg/75 ${s.dense ? "text-[13px]" : "text-[14px]"}`}>{v}</p>
              </li>
            ))}
          </ul>
        </section>
      ))}

      {p.controls && (
        <section className={SECTION}>
          <p className={KICK}>{p.controls.kicker}</p>
          <h2 className={H2}>{p.controls.title}</h2>
          {p.controls.body && <p className="fm-grotesk mt-5 max-w-3xl text-[16px] leading-relaxed text-fmfg/80">{p.controls.body}</p>}
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {p.controls.groups.map((g) => (
              <div key={g.title}>
                <p className="text-[11px] uppercase tracking-[0.15em] text-fmmuted">{g.title}</p>
                <dl className="mt-3 divide-y divide-fmborder border-y border-fmborder">
                  {g.rows.map(([k, v]) => (
                    <div key={k} className="grid grid-cols-[minmax(0,9rem)_1fr] gap-3 py-2.5">
                      <dt className="font-mono text-[12px] text-fmfg">{k}</dt>
                      <dd className="fm-grotesk text-[13px] leading-snug text-fmfg/75">{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>
        </section>
      )}

      {p.film && (
        <section className={SECTION}>
          <p className={KICK}>{p.film.kicker}</p>
          <h2 className={H2}>{p.film.title}</h2>
          {/* Le film tient dans sa colonne : un reel vertical a cote du
              texte, pas en pleine largeur, sinon il mange la page. */}
          <div className="mt-10 grid gap-10 md:grid-cols-[minmax(0,1fr)_300px] md:items-start">
            <div>
              <p className="fm-grotesk max-w-xl text-[16px] leading-relaxed text-fmfg/80">{p.film.body}</p>
              <dl className="mt-8 grid gap-px overflow-hidden rounded-xl border border-fmborder bg-fmborder sm:grid-cols-2">
                {p.film.items.map(([k, v]) => (
                  <div key={k} className="bg-fmbg p-5">
                    <dt className="fm-display text-[15px] text-fmfg">{k}</dt>
                    <dd className="fm-grotesk mt-1 text-[13px] leading-relaxed text-fmmuted">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <ReelSwitcher
              cuts={p.film.cuts}
              label={p.film.label}
              aspect={p.film.aspect}
              className="mx-auto w-full max-w-[300px]"
            />
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
          {p.download && (
            <a href={p.download.href} download target="_blank" rel="noopener" data-cta={`${p.slug}-download`}
              className="mt-8 flex flex-col gap-1 rounded-xl border border-fmborder bg-fmcard p-5 transition hover:border-fmfg/50 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
              <span>
                <span className="fm-display block text-[15px] text-fmfg">{p.download.label}</span>
                <span className="fm-grotesk mt-1 block text-[13px] leading-relaxed text-fmmuted">{p.download.line}</span>
              </span>
              <span className="shrink-0 font-mono text-xs uppercase tracking-[0.15em] text-fmaccent">Download ↓</span>
            </a>
          )}
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
