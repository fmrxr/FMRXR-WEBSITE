import Link from "next/link";
import type { Product } from "@/lib/products";
import { MEDIA } from "@/lib/service-films";
import { LiveWallDemo } from "./LiveWallDemo";
import { ReelSwitcher } from "./ReelSwitcher";
import { ScrollFilm } from "./ScrollFilm";

// La page de vente du Live Wall, faite a la main (comme /photobooth) : elle
// montre le produit au lieu de le decrire. Tout ce qui bouge ici est la vraie
// app, filmee (Concepts/LiveWall_Demo) : le film de demonstration en tete,
// puis une boucle par geste. Les textes ne promettent que ce que le produit
// fait aujourd'hui. Fiche, FAQ et SEO : src/lib/products.ts.

const H2 = "fm-display mt-3 text-[clamp(1.8rem,4vw,3rem)] text-fmfg";
const KICK = "text-[11px] uppercase tracking-[0.15em] text-fmaccent";
const SECTION = "mx-auto max-w-[1200px] border-t border-fmborder px-5 py-20 md:px-8 md:py-24";
const BODY = "fm-grotesk text-[16px] leading-relaxed text-fmfg/80";

const loop = (name: string) => ({ src: `${MEDIA}/live-wall-loop-${name}.mp4`, poster: `${MEDIA}/live-wall-loop-${name}.jpg` });

/** Une boucle muette, dans un telephone : c'est l'ecran d'un invite ou de l'equipe. */
function Phone({ name, label, className = "" }: { name: string; label: string; className?: string }) {
  return (
    <div className={`mx-auto w-full max-w-[260px] rounded-[2.4rem] border border-fmborder bg-[#16151d] p-2.5 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.9)] ${className}`}>
      <ScrollFilm {...loop(name)} label={label} sound={false} className="" aspect="aspect-[390/844] !rounded-[1.9rem] !border-0" />
    </div>
  );
}

/** Une boucle muette au format de l'ecran geant. */
function Screen({ name, label }: { name: string; label: string }) {
  return <ScrollFilm {...loop(name)} label={label} sound={false} className="" aspect="aspect-video" />;
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="mt-6 flex flex-col gap-3">
      {items.map((t) => (
        <li key={t} className="fm-grotesk flex gap-3 text-[15px] leading-relaxed text-fmfg/80">
          <span className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-fmaccent" />
          {t}
        </li>
      ))}
    </ul>
  );
}

export function LiveWallLanding({ product: p }: { product: Product }) {
  const whiteLabel = `${MEDIA}/live-wall-film-whitelabel-16x9.mp4?download=live-wall-demo-film.mp4`;
  const deck = `${MEDIA}/live-wall-presentation-marque-blanche.pdf?download=live-wall-presentation.pdf`;
  return (
    <>
      {/* 1. La promesse, puis le film */}
      <section className="mx-auto max-w-[1200px] px-5 pb-10 pt-28 md:px-8 md:pt-36">
        <p className={KICK}>Live Wall · for your event</p>
        <h1 className="fm-display mt-4 max-w-4xl text-[clamp(2.6rem,7vw,5.6rem)] leading-[0.95] text-fmfg">
          Every guest leaves a word on your <span className="text-fmaccent">brand</span>.
        </h1>
        <p className={`${BODY} mt-6 max-w-2xl`}>
          A QR code in the room turns every phone into a pen. Words, drawings and signatures land on your big screen
          as cards in your colours, your team decides what goes up, and when the show ends the wall edits its own
          recap for social media.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href={`/start?ref=${p.slug}`} data-cta={`${p.slug}-start-hero`}
            className="rounded-full bg-fmfg px-6 py-3 text-sm font-semibold text-fmbg transition hover:bg-fmaccent">
            Get a quote for your event
          </Link>
          <a href="#try" data-cta={`${p.slug}-try-hero`} className="rounded-full border border-fmborder px-6 py-3 text-sm text-fmfg/85 transition hover:border-fmfg/50">
            Try the wall
          </a>
        </div>
      </section>
      <section id="film" className="mx-auto max-w-[1200px] px-5 md:px-8">
        <ScrollFilm src={`${MEDIA}/live-wall-film-16x9.mp4`} poster={`${MEDIA}/live-wall-film-16x9.jpg`} label="Live Wall, the demo film" className="" />
        <p className="mt-3 text-[12px] text-fmmuted">Every screen in this film is the real app, filmed during a demo night.</p>
      </section>

      <section className="mx-auto mt-14 max-w-[1200px] px-5 md:px-8">
        <ul className="grid gap-px overflow-hidden rounded-xl border border-fmborder bg-fmborder text-sm sm:grid-cols-2 lg:grid-cols-4">
          {p.facts.map(([k, v]) => (
            <li key={k} className="bg-fmbg p-4">
              <p className="fm-display text-sm text-fmfg">{k}</p>
              <p className="fm-grotesk mt-1 text-[13px] text-fmmuted">{v}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* 2. Pourquoi ca marche */}
      <section className={`${SECTION} mt-20`}>
        <p className={KICK}>Why it works</p>
        <h2 className={H2}>Your guests stop watching. They write.</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            ["Guests become authors", "A screen people only look at is decoration. A wall they write on is theirs: every card is a moment someone chose to share, in front of the whole room."],
            ["Your brand in every hand", "Your logo, your colours, your card format, your papers and your stickers, on every phone and on the giant screen, all night long."],
            ["The night keeps working", "The morning after, your team has a recap reel, a print sheet, a mailing kit and every card as an image. Content made by your guests, ready to post."],
          ].map(([k, v]) => (
            <div key={k} className="rounded-xl border border-fmborder bg-fmcard p-6">
              <p className="fm-display text-xl text-fmfg">{k}</p>
              <p className="fm-grotesk mt-3 text-[15px] leading-relaxed text-fmfg/75">{v}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Une soiree, trois roles */}
      <section className={SECTION}>
        <p className={KICK}>How the night plays</p>
        <h2 className={H2}>One wall, three roles</h2>
        <div className="mt-12 grid items-start gap-12 lg:grid-cols-[260px_1fr_1.4fr] lg:gap-10">
          <div>
            <Phone name="write" label="A guest writes a card on their phone" />
            <p className="mt-5 font-mono text-xs text-fmaccent">01 · The guest</p>
            <p className="fm-display mt-2 text-lg text-fmfg">Scan, write, send</p>
            <p className="fm-grotesk mt-2 text-[14px] leading-relaxed text-fmfg/75">No app, no account. A word, a paper colour, your stickers, a first name, and it goes.</p>
          </div>
          <div className="lg:pt-24">
            <ScrollFilm {...loop("team")} label="The team publishes a card" sound={false} className="" aspect="aspect-[13/10]" />
            <p className="mt-5 font-mono text-xs text-fmaccent">02 · Your team</p>
            <p className="fm-display mt-2 text-lg text-fmfg">Nothing goes up unseen</p>
            <p className="fm-grotesk mt-2 text-[14px] leading-relaxed text-fmfg/75">The card waits for your team. One tap publishes it, from a phone, anywhere in the room.</p>
          </div>
          <div className="lg:pt-10">
            <Screen name="land" label="The card lands on the big screen" />
            <p className="mt-5 font-mono text-xs text-fmaccent">03 · The room</p>
            <p className="fm-display mt-2 text-lg text-fmfg">It lands in front of everyone</p>
            <p className="fm-grotesk mt-2 text-[14px] leading-relaxed text-fmfg/75">The card arrives on the giant screen with its animation, among everyone else’s, in your colours.</p>
          </div>
        </div>
      </section>

      {/* 4. Les fonctionnalites, en images */}
      <section className={SECTION}>
        <p className={KICK}>Your brand</p>
        <div className="mt-3 grid items-center gap-10 lg:grid-cols-[1fr_1.35fr]">
          <div>
            <h2 className={H2}>Your cards, your papers, your stickers</h2>
            <p className={`${BODY} mt-5`}>Your team sets the look from its own control page, before or during the night, and the wall follows live.</p>
            <Bullets items={[
              "Four card formats: memory notes, or layouts in the spirit of a photo feed, a timeline or a forum.",
              "Paper colours, or your own paper images. The ink is measured on each paper, so the text stays readable.",
              "Your sticker set, on the messages and as reactions.",
              "Your logo, your background colour or a 4K background image.",
            ]} />
          </div>
          <Screen name="brand" label="The wall changes card format, then takes the brand's papers" />
        </div>
      </section>

      <section className={SECTION}>
        <p className={KICK}>More than words</p>
        <div className="mt-3 grid items-center gap-10 lg:grid-cols-[260px_1fr] lg:gap-16">
          <Phone name="draw" label="A guest draws a heart" className="order-last lg:order-first" />
          <div>
            <h2 className={H2}>Draw it. Sign it.</h2>
            <p className={`${BODY} mt-5`}>Some guests write. Others draw, sign or just drop a sticker. Every gesture becomes a card.</p>
            <Bullets items={[
              "Drawings replay stroke by stroke when they land.",
              "Signatures, on a paper strip like a guestbook.",
              "Photos, validated by hand by your team before they show.",
              "French, English and Arabic: each guest picks a language, and the wall reads right to left in Arabic.",
            ]} />
          </div>
        </div>
      </section>

      <section className={SECTION}>
        <p className={KICK}>Play together</p>
        <h2 className={H2}>Touch the wall</h2>
        <div className="mt-10 grid items-start gap-10 lg:grid-cols-[1.6fr_260px]">
          <div>
            <Screen name="play" label="A card is moved, resized by its corner and liked" />
            <Bullets items={[
              "Move a card, pull its corner to resize it, on a touch screen or with a mouse.",
              "Guests move and resize their own card from their phone.",
              "Likes and comments, from any phone, straight onto the card.",
              "Optional hand tracking in front of the screen: close your fist to grab a card, open it to drop.",
            ]} />
          </div>
          <div>
            <Phone name="comment" label="A guest comments on a card from their phone" />
            <p className="mt-4 text-center text-[13px] text-fmmuted">A comment, sent from a phone, lands on the card.</p>
          </div>
        </div>
      </section>

      <section className={SECTION}>
        <p className={KICK}>Moderated live</p>
        <div className="mt-3 grid items-center gap-10 lg:grid-cols-[1fr_1fr]">
          <div>
            <h2 className={H2}>Your team keeps the wall</h2>
            <Bullets items={[
              "Manual moderation, or automatic with a filter for insults, links and phone numbers in French, English, Derja and Arabic.",
              "Up to five named moderators, each with their own link, every action signed.",
              "Hide a card or a comment in one tap, from a phone or right on the giant screen.",
              "Open, pause or close the wall whenever you want, and print the table QR codes.",
            ]} />
          </div>
          <ScrollFilm {...loop("team")} label="The moderation queue" sound={false} className="" aspect="aspect-[13/10]" />
        </div>
      </section>

      {/* 5. Essayer */}
      <section id="try" className={SECTION}>
        <p className={KICK}>Try it</p>
        <h2 className={H2}>Drag a card, tap a heart</h2>
        <p className={`${BODY} mt-5 max-w-2xl`}>The same wall, running in this page. Switch the card format below it.</p>
        <div className="mt-10"><LiveWallDemo /></div>
      </section>

      {/* 6. Apres la soiree */}
      {p.film && (
        <section className={SECTION}>
          <p className={KICK}>{p.film.kicker}</p>
          <h2 className={H2}>{p.film.title}</h2>
          <div className="mt-10 grid gap-10 md:grid-cols-[minmax(0,1fr)_300px] md:items-start">
            <div>
              <p className={`${BODY} max-w-xl`}>{p.film.body}</p>
              <dl className="mt-8 grid gap-px overflow-hidden rounded-xl border border-fmborder bg-fmborder sm:grid-cols-2">
                {p.film.items.map(([k, v]) => (
                  <div key={k} className="bg-fmbg p-5">
                    <dt className="fm-display text-[15px] text-fmfg">{k}</dt>
                    <dd className="fm-grotesk mt-1 text-[13px] leading-relaxed text-fmmuted">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <ReelSwitcher cuts={p.film.cuts} label={p.film.label} aspect={p.film.aspect} className="mx-auto w-full max-w-[300px]" />
          </div>
        </section>
      )}

      {/* 7. Pour les agences */}
      <section className={SECTION}>
        <div className="grid items-center gap-8 rounded-2xl border border-fmborder bg-fmcard p-6 md:grid-cols-[1fr_auto] md:p-10">
          <div>
            <p className={KICK}>For agencies and event planners</p>
            <p className="fm-display mt-3 text-[clamp(1.5rem,3vw,2.2rem)] text-fmfg">Selling the night to your own client?</p>
            <p className={`${BODY} mt-3 max-w-2xl`}>
              Download the same demo film without our brand, and a 14-page presentation (in French) with every feature
              and the guides for moderators, for your client’s team and for guests. Neutral logo, no credit: send them
              to your client as they are.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <a href={whiteLabel} download data-cta={`${p.slug}-whitelabel-download`}
              className="rounded-full bg-fmfg px-6 py-3 text-center text-sm font-semibold text-fmbg transition hover:bg-fmaccent">
              White-label film (MP4, 13 MB)
            </a>
            <a href={deck} download data-cta={`${p.slug}-whitelabel-deck`}
              className="rounded-full border border-fmborder px-6 py-3 text-center text-sm text-fmfg transition hover:border-fmfg/50">
              Presentation and guides (PDF, FR, 2.8 MB)
            </a>
          </div>
        </div>
      </section>

      {/* 8. Sur place, questions, devis */}
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
