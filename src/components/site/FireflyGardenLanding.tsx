import Link from "next/link";
import type { Product } from "@/lib/products";
import { EmbedDemo } from "./EmbedDemo";
import { ScrollFilm } from "./ScrollFilm";
import { MEDIA } from "@/lib/service-films";

// Page de vente du Jardin des Lucioles, faite a la main sur le modele du Live
// Wall (LiveWallLanding). Toutes les images sont des captures de la vraie
// application, prises dans l'app en temps reel (Concepts/JardinDesLucioles_PDF).
// Textes neutres : la page vend l'installation a toute marque, sans nommer le
// produit du premier client. Fiche, FAQ et SEO : src/lib/products.ts.

const H2 = "fm-display mt-3 text-[clamp(1.8rem,4vw,3rem)] text-fmfg";
const KICK = "text-[11px] uppercase tracking-[0.15em] text-fmaccent";
const SECTION = "mx-auto max-w-[1200px] border-t border-fmborder px-5 py-20 md:px-8 md:py-24";
const BODY = "fm-grotesk text-[16px] leading-relaxed text-fmfg/80";

const img = (name: string) => `/garden/${name}.webp`;

// Les fleurs filmees seules dans l'app (Concepts/JardinDesLucioles_Fleurs),
// 10 s chacune : bouton, la luciole passe, ouverture, refermeture.
const FLEURS: [string, string, string][] = [
  ["corolle-large", "Wide corolla", "Glass"],
  ["etoile-effilee", "Slender star", "Glass"],
  ["aster-rayons-fins", "Fine-rayed aster", "Glass"],
  ["pavot-translucide", "Translucent poppy", "Glass"],
  ["digitale-filamenteuse", "Filament foxglove", "Glass"],
  ["clochette", "Bellflower", "Glass"],
  ["ombelle", "Umbel", "Glass"],
  ["lupin", "Lupin", "Modelled"],
  ["lys", "Lily", "Modelled"],
  ["marguerite", "Daisy", "Modelled"],
];

// Releves dans l'app le 12/11/2026 (scene en cours, format mur 1600 x 600).
const CHIFFRES: [string, string][] = [
  ["130,600", "blades of grass, moving with the wind"],
  ["1,500", "glass flowers in 7 species"],
  ["193", "modelled lupins, lilies and daisies"],
  ["900", "fireflies in the swarm, 34 of them leading"],
  ["4,000", "particles of light and gold dust"],
  ["12.6 M", "triangles drawn in every frame"],
  ["1,402", "animated bones across the fauna"],
  ["148", "GPU programs, all compiled before START"],
  ["58.6", "frames per second on average, wall format"],
  ["10", "states in the piece, from sleep to reset"],
];

/** Le systeme de lumiere, en schema : la main guide l'essaim, l'essaim depose la lumiere, tout le jardin la lit. */
function LightSystem() {
  const cibles = ["Glass flowers", "Grass", "Animals", "Tree lamps", "Modelled flowers"];
  return (
    <svg viewBox="0 0 900 300" className="w-full" role="img" aria-label="The hand guides the swarm, the swarm lays light into a field, every surface of the garden reads that field">
      <g fontFamily="ui-monospace, monospace" fontSize="13" letterSpacing="1.5">
        {[["HAND", "or pointer", 40], ["SWARM", "900 fireflies", 230], ["LIGHT FIELD", "112 × 112 cells", 420]].map(([t, s, x]) => (
          <g key={t as string} transform={`translate(${x} 110)`}>
            <rect width="150" height="80" rx="12" fill="none" stroke="currentColor" strokeOpacity=".35" />
            <text x="75" y="36" textAnchor="middle" fill="currentColor">{t}</text>
            <text x="75" y="58" textAnchor="middle" fill="currentColor" fillOpacity=".55" fontSize="11">{s}</text>
          </g>
        ))}
        <path d="M190 150 H226 M380 150 H416" stroke="currentColor" strokeOpacity=".5" strokeWidth="1.5" markerEnd="url(#fleche)" />
        {cibles.map((c, i) => {
          const y = 22 + i * 56;
          return (
            <g key={c}>
              <path d={`M570 150 C 620 150, 630 ${y + 20}, 676 ${y + 20}`} fill="none" stroke="var(--color-fmaccent)" strokeOpacity=".55" strokeWidth="1.5" markerEnd="url(#fleche)" />
              <rect x="680" y={y} width="190" height="40" rx="10" fill="none" stroke="var(--color-fmaccent)" strokeOpacity=".5" />
              <text x="775" y={y + 25} textAnchor="middle" fill="currentColor">{c.toUpperCase()}</text>
            </g>
          );
        })}
      </g>
      <defs>
        <marker id="fleche" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M0 0 L10 5 L0 10 z" fill="currentColor" fillOpacity=".6" />
        </marker>
      </defs>
    </svg>
  );
}

function Shot({ name, alt, caption, className = "" }: { name: string; alt: string; caption?: string; className?: string }) {
  return (
    <figure className={className}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={img(name)} alt={alt} loading="lazy" className="w-full rounded-xl border border-fmborder bg-black object-cover" />
      {caption && <figcaption className="mt-3 font-mono text-[11px] uppercase tracking-[0.12em] text-fmmuted">{caption}</figcaption>}
    </figure>
  );
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

// Les sept temps de la sequence, durees mesurees dans l'app.
const BEATS: [string, string, string][] = [
  ["START", "0.7 s", "The firefly held on the mark opens the piece."],
  ["Detection", "1.2 s", "The garden dims, attention settles."],
  ["Appearance", "3.8 s", "Your product is born from the light."],
  ["Exploded view", "34 s", "It opens part by part and explains itself."],
  ["Recomposition", "3.2 s", "The parts come back and close."],
  ["Metamorphosis", "2.6 + 3.6 s", "The product dissolves into energy."],
  ["Awakening", "5.2 s", "Flowers, animals and lamps wake up."],
];

const FAUNA: [string, string, string][] = [
  ["biche", "Does", "Standing in the clearing: idles, and a turn of the head toward the light."],
  ["cerf", "Stag", "The only one who walks the garden, on a path of its own."],
  ["grand-loup", "Wolf", "With the pack, on the other side: idles, and a turn of the head toward the light."],
  ["petit-loup", "Young wolf", "With the pack: idles, and a turn of the head toward the light."],
  ["girafe", "Giraffe", "At the back of the garden: ruminates, walks, grazes."],
  ["cheval", "Horse", "Along the right edge: chews at rest, trots."],
  ["chimpanze-sol", "Chimpanzee", "At the foot of the tree: walks on knuckles, gallops, stands, calls."],
  ["chimpanze-perche", "Perched chimpanzee", "On a roof of the tree, calling now and then."],
  ["iguane", "Iguana", "On the mossy stump: chews, eats, walks along it."],
  ["colibri", "Hummingbirds · 2", "Perch to perch: take off, fly, hover, land."],
  ["ecureuil", "Squirrel", "Climbs the inhabited tree, on its bark."],
  ["hibou", "Owls · 2", "Perched in the tree: they breathe, blink and follow the light."],
  ["libellule", "Dragonflies · 6", "Perch to perch, shot in slow motion and played back."],
];

const FLORA: [string, string][] = [
  ["agapanthe", "Agapanthus"],
  ["senecio", "Senecio"],
  ["anemone", "Japanese anemone"],
];

export function FireflyGardenLanding({ product: p }: { product: Product }) {
  const demo = p.demo.kind === "embed" ? p.demo.src : "/experiences/jardin-des-lucioles/index.html";
  return (
    <>
      {/* 1. La promesse, puis l'image */}
      <section className="mx-auto max-w-[1200px] px-5 pb-10 pt-28 md:px-8 md:pt-36">
        <p className={KICK}>Le Jardin des Lucioles · an interactive LED wall for product launches</p>
        <h1 className="fm-display mt-4 max-w-4xl text-[clamp(2.6rem,7vw,5.6rem)] leading-[0.95] text-fmfg">
          Your product, revealed by the light that <span className="text-fmaccent">wakes</span> the garden.
        </h1>
        <p className={`${BODY} mt-6 max-w-2xl`}>
          A night garden asleep on your LED wall, and a single firefly. Your guest leads it with a hand to START: your
          product appears out of the light, opens part by part, closes again, then dissolves into a swarm that wakes
          the flowers, the animals and the lamps of the tree. Then the garden is theirs, to explore with a hand.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href={`/start?ref=${p.slug}`} data-cta={`${p.slug}-start-hero`}
            className="rounded-full bg-fmfg px-6 py-3 text-sm font-semibold text-fmbg transition hover:bg-fmaccent">
            Get a quote for your launch
          </Link>
          <a href="#try" data-cta={`${p.slug}-try-hero`} className="rounded-full border border-fmborder px-6 py-3 text-sm text-fmfg/85 transition hover:border-fmfg/50">
            Play the garden
          </a>
        </div>
      </section>
      <section className="mx-auto max-w-[1200px] px-5 md:px-8">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={img("hero")} alt="The light released by the product reaches the inhabited tree" className="w-full rounded-xl border border-fmborder bg-black" />
        <p className="mt-3 text-[12px] text-fmmuted">Every image on this page is the real installation, captured in real time.</p>
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
        <h2 className={H2}>Your guests don’t watch the launch. They start it.</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            ["The guest presses START", "Nothing plays until someone brings the firefly to the mark. The reveal belongs to the person in front of the wall, and to everyone watching them."],
            ["Your product, explained", "34 seconds of exploded view: every part in its place, labelled, in close-up. Technology you can see, not a slide."],
            ["A reward that stays", "Once the product has turned into light, the garden is awake and answers the hand. Guests stay, play and film it."],
          ].map(([k, v]) => (
            <div key={k} className="rounded-xl border border-fmborder bg-fmcard p-6">
              <p className="fm-display text-xl text-fmfg">{k}</p>
              <p className="fm-grotesk mt-3 text-[15px] leading-relaxed text-fmfg/75">{v}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. La sequence */}
      <section className={SECTION}>
        <p className={KICK}>The visitor’s journey</p>
        <h2 className={H2}>One sequence, seven beats</h2>
        <p className={`${BODY} mt-5 max-w-2xl`}>53.6 seconds from START to the garden awake, then free play. Nine seconds without a visitor and the garden falls back asleep on its START screen.</p>
        <ol className="mt-10 grid gap-px overflow-hidden rounded-xl border border-fmborder bg-fmborder sm:grid-cols-2 lg:grid-cols-7">
          {BEATS.map(([k, t, v], i) => (
            <li key={k} className="bg-fmbg p-4">
              <p className="font-mono text-[11px] text-fmaccent">{String(i + 1).padStart(2, "0")} · {t}</p>
              <p className="fm-display mt-2 text-[15px] text-fmfg">{k}</p>
              <p className="fm-grotesk mt-1 text-[13px] leading-relaxed text-fmmuted">{v}</p>
            </li>
          ))}
        </ol>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Shot name="start" alt="The START screen, a firefly and a doe in the dark" caption="Waiting · bring the firefly here" />
          <Shot name="apparition" alt="The product appears out of a trail of fireflies" caption="Appearance" />
          <Shot name="eclat" alt="The product bursts into its parts" caption="Exploded view" />
          <Shot name="reveil" alt="The garden wakes around the inhabited tree" caption="The garden awake" />
        </div>
      </section>

      {/* 4. La vue eclatee */}
      <section className={SECTION}>
        <p className={KICK}>The exploded view</p>
        <div className="mt-3 grid items-center gap-10 lg:grid-cols-[1fr_1.35fr]">
          <div>
            <h2 className={H2}>Your product crosses the wall</h2>
            <p className={`${BODY} mt-5`}>Laid across the diagonal of the wall, the product opens in five acts over 34 seconds, then closes again. The acts are written for your product: its parts, their order, their labels.</p>
            <Bullets items={[
              "The burst: a compression, then a sharp release with a shock wave.",
              "The master shot: the whole product across the wall, its parts labelled in two bands.",
              "The inside: opened segment by segment, the key part in close-up.",
              "The heart: what makes it work, shown working.",
              "The device: every part in close-up, then back to the master shot.",
            ]} />
          </div>
          <Shot name="eclat" alt="The product's parts spread across the wall around a shock wave" />
        </div>
      </section>

      {/* 5. Le jardin */}
      <section className={SECTION}>
        <p className={KICK}>The garden</p>
        <div className="mt-3 grid items-center gap-10 lg:grid-cols-[1.1fr_1fr]">
          <Shot name="tree" alt="The inhabited tree with its houses, ladders, owls and chimpanzee" className="order-last lg:order-first" />
          <div>
            <h2 className={H2}>A clearing under an inhabited tree</h2>
            <p className={`${BODY} mt-5`}>A dark frame of ferns and trunks, a light mist, and the only light comes from the swarm.</p>
            <Bullets items={[
              "The lamps of the tree wake with the garden and breathe, on two rhythms that never repeat.",
              "Two perched owls follow the light with their eyes and blink.",
              "A chimpanzee lives on a roof of the tree and calls now and then.",
              "A campfire burns amber; the mossy stump carries the iguana.",
              "Seven species of glass flowers open and close with the light, in a dense meadow that moves in the wind.",
            ]} />
          </div>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-[1.6fr_1fr_1fr_1fr]">
          <Shot name="glass" alt="Glass flowers glowing in the meadow" caption="Glass flowers" />
          {FLORA.map(([n, label]) => <Shot key={n} name={n} alt={label} caption={label} />)}
        </div>
      </section>

      {/* 5 bis. La lumiere */}
      <section className={SECTION}>
        <p className={KICK}>Light that moves</p>
        <h2 className={H2}>One light, read by the whole garden</h2>
        <p className={`${BODY} mt-5 max-w-2xl`}>The swarm does not just glow. Wherever it flies it lays light into a field over the ground, and every surface of the garden reads that field: the grass, the flowers, the animals, the lamps of the tree. Nothing is lit by a spotlight; the garden is lit by the guest.</p>
        <div className="mt-10 rounded-xl border border-fmborder bg-fmcard p-6 text-fmfg md:p-10"><LightSystem /></div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            ["A trail, not a flash", "Objects light up fast when the swarm comes near and fade over about four seconds after it leaves. The guest leaves a wake of light behind them."],
            ["The wave of blossoms", "Hold the firefly still for 2.5 seconds and a ring of cold light leaves from beneath it, crossing the meadow at 3 units per second up to 16 units, opening every flower on its way. Then 14 seconds of rest: rare, so it stays precious."],
            ["Lamps that breathe", "The lamps of the tree wake with the garden and breathe on two slow rhythms that never line up, so no cycle ever repeats exactly."],
          ].map(([k, v]) => (
            <div key={k} className="rounded-xl border border-fmborder bg-fmcard p-6">
              <p className="fm-display text-xl text-fmfg">{k}</p>
              <p className="fm-grotesk mt-3 text-[15px] leading-relaxed text-fmfg/75">{v}</p>
            </div>
          ))}
        </div>
        <h3 className="fm-display mt-16 text-[clamp(1.4rem,2.6vw,2rem)] text-fmfg">Every flower, filmed alone</h3>
        <p className={`${BODY} mt-3 max-w-2xl`}>Each flower isolated in the app and lit by the garden’s own light. A firefly passes, the flower opens in under a second, then closes slowly once the light has gone.</p>
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {FLEURS.map(([f, nom, famille]) => (
            <figure key={f}>
              <ScrollFilm src={`/garden/films/fleur-${f}.mp4`} poster={`/garden/films/fleur-${f}.jpg`} label={nom} sound={false} className="" aspect="aspect-video" />
              <figcaption className="mt-2 flex justify-between font-mono text-[11px] uppercase tracking-[0.12em] text-fmmuted"><span>{nom}</span><span>{famille}</span></figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* 6. La faune */}
      <section className={SECTION}>
        <p className={KICK}>The fauna</p>
        <h2 className={H2}>Everything that lives there</h2>
        <p className={`${BODY} mt-5 max-w-2xl`}>Nine large animals and the small fauna, each with its own animations. When the light comes near, an animal stops and turns its head toward it.</p>
        <div className="mt-10 grid gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
          {FAUNA.map(([n, name, line]) => {
            // La libellule, ailes deployees, prend deux colonnes : la derniere
            // rangee se complete avec les papillons et les lucioles, sans image.
            const wide = n === "libellule";
            return (
            <figure key={n} className={wide ? "lg:col-span-2" : ""}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img(`fauna-${n}`)} alt={name} loading="lazy" className={`${wide ? "aspect-[4/3] lg:aspect-[8/3]" : "aspect-[4/3]"} w-full rounded-xl border border-fmborder bg-black object-cover`} />
              <figcaption className="mt-3">
                <p className="fm-display text-[15px] text-fmfg">{name}</p>
                <p className="fm-grotesk mt-1 text-[13px] leading-relaxed text-fmmuted">{line}</p>
              </figcaption>
            </figure>
            );
          })}
          {[
            ["Butterflies", "They drift all the time and beat their wings at their own pace."],
            ["Fireflies", "The swarm the guest leads: it lights, it wakes, it makes the garden bloom."],
          ].map(([name, line]) => (
            <div key={name}>
              <div className="grid aspect-[4/3] w-full place-items-center rounded-xl border border-fmborder bg-fmcard">
                <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-fmaccent">{name}</span>
              </div>
              <p className="fm-display mt-3 text-[15px] text-fmfg">{name}</p>
              <p className="fm-grotesk mt-1 text-[13px] leading-relaxed text-fmmuted">{line}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 7. La manette */}
      <section className={SECTION}>
        <p className={KICK}>The controls</p>
        <h2 className={H2}>A guide without words</h2>
        <p className={`${BODY} mt-5 max-w-2xl`}>Three animated pictograms at the bottom of the screen, one word each. They play the gesture instead of explaining it: shown on START, hidden during the reveal, back for ten seconds once the garden is awake.</p>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {[
            ["On the wall · the hand", "FMRXR technologies hand tracking", [
              ["Move", "The firefly follows the hand, with a slight lag."],
              ["Open · close", "Open, the light comes forward. Closed, it goes deep into the garden."],
              ["Fist = click", "A closed fist held still is a click: it starts the piece and replays it."],
            ]],
            ["Online · the mouse", "The same garden, in this page", [
              ["Move", "The pointer guides the firefly."],
              ["Scroll", "The wheel sends the light deeper into the garden, or brings it back."],
              ["Hold still", "Still for 2.5 s, the firefly sends a wave of blossoms across the meadow."],
            ]],
          ].map(([title, sub, rows]) => (
            <div key={title as string} className="rounded-xl border border-fmborder bg-fmcard p-6">
              <p className="fm-display text-xl text-fmfg">{title as string}</p>
              <p className="mt-1 text-[12px] text-fmmuted">{sub as string}</p>
              <dl className="mt-5 divide-y divide-fmborder border-t border-fmborder">
                {(rows as [string, string][]).map(([k, v]) => (
                  <div key={k} className="grid grid-cols-[120px_1fr] gap-4 py-3">
                    <dt className="font-mono text-[12px] uppercase tracking-[0.12em] text-fmaccent">{k}</dt>
                    <dd className="fm-grotesk text-[14px] leading-relaxed text-fmfg/80">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>
        <p className="mt-5 text-[13px] text-fmmuted">A quick gesture also leaves a warm trail and gold dust behind the firefly.</p>
      </section>

      {/* 7 bis. Sous le capot */}
      <section className={SECTION}>
        <p className={KICK}>Under the hood</p>
        <h2 className={H2}>A whole ecosystem, in real time</h2>
        <p className={`${BODY} mt-5 max-w-2xl`}>Everything on the wall is computed live, at every frame, in a browser. Measured in the running installation:</p>
        <dl className="mt-10 grid gap-px overflow-hidden rounded-xl border border-fmborder bg-fmborder sm:grid-cols-2 lg:grid-cols-5">
          {CHIFFRES.map(([n, t]) => (
            <div key={t} className="bg-fmbg p-5">
              <dt className="fm-display text-[clamp(1.6rem,2.6vw,2.2rem)] text-fmaccent">{n}</dt>
              <dd className="fm-grotesk mt-2 text-[13px] leading-snug text-fmfg/75">{t}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* 8. Essayer */}
      <section id="try" className={SECTION}>
        <p className={KICK}>Try it</p>
        <h2 className={H2}>Wake the garden</h2>
        <p className={`${BODY} mt-5 max-w-2xl`}>The same installation, running in this page. Guide the light with the mouse, or press “Use your hand” and play with your webcam: the hand tracking runs on your device, no image leaves it. Best on a computer; press F for full screen.</p>
        <div className="mt-10"><EmbedDemo src={demo} poster={img("garden")} label="Le Jardin des Lucioles" /></div>
      </section>

      {/* 8 bis. Pour les agences : film et presentation en marque blanche
          (bucket media de Supabase, comme The Wall). Ni marque FMRXR ni
          marque du premier client : a transmettre tel quel. */}
      <section className={SECTION}>
        <div className="grid items-center gap-8 rounded-2xl border border-fmborder bg-fmcard p-6 md:grid-cols-[1fr_auto] md:p-10">
          <div>
            <p className={KICK}>For agencies and brand teams</p>
            <p className="fm-display mt-3 text-[clamp(1.5rem,3vw,2.2rem)] text-fmfg">Pitching the launch to your own client?</p>
            <p className={`${BODY} mt-3 max-w-2xl`}>
              Download the vertical demo film and a 14-page presentation (in French) with the visitor’s journey, the
              flora, the fauna, the controls and the technical sheet. No brand on either, ours included: send them to
              your client as they are.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <a href={`${MEDIA}/firefly-garden-film-marque-blanche-9x16.mp4?download=le-jardin-des-lucioles-film.mp4`} download data-cta={`${p.slug}-whitelabel-download`}
              className="rounded-full bg-fmfg px-6 py-3 text-center text-sm font-semibold text-fmbg transition hover:bg-fmaccent">
              Demo film, 9:16 (MP4, 16 MB)
            </a>
            <a href={`${MEDIA}/firefly-garden-presentation-marque-blanche.pdf?download=le-jardin-des-lucioles-presentation.pdf`} download data-cta={`${p.slug}-whitelabel-deck`}
              className="rounded-full border border-fmborder px-6 py-3 text-center text-sm text-fmfg transition hover:border-fmfg/50">
              Presentation (PDF, FR, 2.9 MB)
            </a>
          </div>
        </div>
      </section>

      {/* 9. Sur place, questions, devis */}
      {p.specs && (
        <section className={SECTION}>
          <p className={KICK}>On site</p>
          <h2 className={H2}>Nothing loads during the piece</h2>
          <p className={`${BODY} mt-5 max-w-2xl`}>Everything loads, compiles and rehearses behind an opening screen where fireflies draw the FMRXR// logo at the real pace of the loading. Then START.</p>
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
          <h2 className={H2}>What launch teams ask us</h2>
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
          Get a quote for your launch
        </Link>
      </section>
    </>
  );
}
