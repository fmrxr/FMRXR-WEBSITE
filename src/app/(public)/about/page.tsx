import type { Metadata } from "next";
import Link from "next/link";
import { getSiteSettings } from "@/lib/public-data";
import { PageHero } from "@/components/site/PageHero";

// Rendu a la demande plutot qu'ISR. L'hebergement fait tourner plusieurs
// processus Node, chacun avec son propre cache : avec revalidate, une meme URL
// renvoyait tantot l'ancienne version tantot la nouvelle selon le worker
// touche. Le contenu vient de Supabase et change souvent, la coherence prime
// ici sur la mise en cache.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "About · Creative technology studio, Tunis",
  description:
    "FMRXR Studio builds generative systems and immersive installations. New media art, projection mapping, XR and live A/V, shown at the Francophonie Summit, B7L9 Art Centre, Interference Tunis and the National Museum of Carthage.",
  keywords: [
    "creative technology studio", "new media art studio", "generative systems",
    "immersive installation", "projection mapping", "XR", "live A/V",
    "TouchDesigner studio", "Tunis", "Tunisia", "FMRXR Studio", "Effet Mère",
  ],
  alternates: { canonical: "/about" },
  openGraph: {
    type: "website",
    url: "/about",
    title: "About · FMRXR Studio, creative technology, Tunis",
    description:
      "Generative systems and immersive installations. Systems over spectacle, shipped under live conditions.",
  },
};

// Le contenu vit en données plutôt qu'en JSX : le balisage reste identique d'une
// section à l'autre, et le plan de la page se lit d'un coup d'œil.
const SECTIONS: { title: string; body: string[] }[] = [
  {
    title: "What we build",
    body: [
      "Most event visuals are finished files. Someone edits a timeline, exports a master, and the venue plays it back. It works, and it is over the moment the lights come up. The file cannot answer the room it is playing in.",
      "We build the other thing. A system that produces the image while the event is happening, from rules we wrote and inputs the room provides. It costs more thinking up front and considerably less panic on the night. It also means a system can be re-run, re-scaled and re-pointed at a different venue or a different dataset, which turns a production cost into an asset.",
    ],
  },
  {
    title: "Data as material, not decoration",
    body: [
      "At Djerba Explore, the island's cultural, sonic and environmental data were not illustrated, they were the material the image and the sound were generated from. Nine microphones spread at different heights listened to the room and the room drew itself. A jar of olives, wired through an ultrasonic sensor and an Arduino, drove wall pixel mapping over DMX.",
      "The principle holds across formats. For a cinema piece in Dolby Atmos, the image follows the spatial structure of the mix rather than its amplitude. For a hundred and fifty violinists in the round, a single shader feeds sixteen LED surfaces for fifty minutes with no video editing at all. The image is never played back, it is computed while people are watching.",
    ],
  },
  {
    title: "Built for live conditions",
    body: [
      "Software ships when it is merged. A show ships when the doors open, in front of people who paid, on hardware installed that afternoon, in a room nobody could fully test in advance. There is no rollback.",
      "That single constraint shapes the method. Screen resolution confirmed seven days ahead. Setup and rehearsal time treated as design inputs rather than buffer. Redundancy a tired person can operate in the dark. A runbook that is a deliverable, not documentation written afterwards.",
    ],
  },
];

const TRACK = [
  { k: "Institutions", v: "XVIII Francophonie Summit, OIF and TICDCE, Kamel Lazaar Foundation and B7L9 Art Centre, National Museum of Carthage, Regional Commission for Cultural Affairs of Ben Arous." },
  { k: "Festivals and exhibitions", v: "Interference, the first light art festival in Africa, across two editions. Journées Musicales de Carthage. SPECTRUM and Le Monde Imaginaire in the Bhar Lazreg creative district. DREAMING AGAIN at WILDE Paris." },
  { k: "Brands", v: "Ooredoo, Samsung, BYD, Epson, GAT Assurances, CRK Maroquinerie, Morninglory Paris." },
];

const NUMBERS = [
  ["301 m²", "Enclosed LED room, ceiling included, for A.L.A"],
  ["1 000 m²", "Animated entrance tunnel and lateral screens, BYD"],
  ["500 m²", "XR immersive room, SPECTRUM"],
  ["150", "Violinists in the round, National Museum of Carthage"],
  ["152 000", "Views on a single CGI post, CRK"],
  ["16", "LED surfaces driven by one shader, 100 Violons"],
];

export default async function About() {
  const s = await getSiteSettings();
  return (
    <>
      <PageHero index="About" title="Systems over spectacle." intro={s.description} />

      <section className="mx-auto max-w-3xl px-5 pb-24 md:px-8">
        <div className="fm-grotesk flex max-w-2xl flex-col gap-5 text-[15px] leading-relaxed text-fmfg/85">
          <p>
            {s.name} is a creative technology studio based in {s.location}, working at the intersection of
            art, technology and brand. TouchDesigner-first, hardware-aware, editorially rigorous. Every
            project is treated as a living system that has to survive live conditions.
          </p>
          <p>
            Founded and creatively directed by {s.founder}, who also works as {s.artist_alias}. The studio
            spans immersive installations, projection mapping, XR, generative environments, live A/V and
            AI-driven production workflows, from brief to opening night.
          </p>
        </div>

        {SECTIONS.map((sec) => (
          <div key={sec.title} className="mt-12 max-w-2xl">
            <h2 className="fm-display text-lg text-fmfg">{sec.title}</h2>
            <div className="fm-grotesk mt-3 flex flex-col gap-4 text-[15px] leading-relaxed text-fmfg/85">
              {sec.body.map((p, i) => <p key={i}>{p}</p>)}
            </div>
          </div>
        ))}

        <h2 className="fm-display mt-16 text-lg text-fmfg">Where the work has run</h2>
        <dl className="mt-4 grid gap-px overflow-hidden rounded-xl border border-fmborder bg-fmborder">
          {TRACK.map((t) => (
            <div key={t.k} className="bg-fmbg p-5">
              <dt className="text-[10px] uppercase tracking-[0.12em] text-fmmuted">{t.k}</dt>
              <dd className="fm-grotesk mt-2 text-sm leading-relaxed text-fmfg/85">{t.v}</dd>
            </div>
          ))}
        </dl>

        <h2 className="fm-display mt-16 text-lg text-fmfg">At scale</h2>
        <div className="mt-4 grid gap-px overflow-hidden rounded-xl border border-fmborder bg-fmborder sm:grid-cols-2 lg:grid-cols-3">
          {NUMBERS.map(([n, label]) => (
            <div key={label} className="bg-fmbg p-5">
              <p className="fm-display text-2xl text-fmfg">{n}</p>
              <p className="fm-grotesk mt-2 text-xs leading-relaxed text-fmmuted">{label}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 max-w-2xl">
          <h2 className="fm-display text-lg text-fmfg">Two names, one practice</h2>
          <div className="fm-grotesk mt-3 flex flex-col gap-4 text-[15px] leading-relaxed text-fmfg/85">
            <p>
              FMRXR Studio is the commercial identity: brand activations, institutional commissions,
              experience design and the systems that run them.
            </p>
            <p>
              {s.artist_alias} is the artistic one, in practice since 2009, working on generative systems,
              immersive installation and audiovisual performance. The hypothesis underneath both is the same.
              The real is not represented, it is generated, and the artist configures conditions of appearance
              rather than producing fixed objects.
            </p>
          </div>
          <Link href="/effet-mere" className="group mt-5 inline-block text-sm uppercase tracking-[0.12em] text-fmfg">
            Read the artistic practice{" "}
            <span className="inline-block text-fmaccent transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>

        <div className="mt-16 grid gap-px overflow-hidden rounded-xl border border-fmborder bg-fmborder sm:grid-cols-3">
          {[
            ["Founder", s.founder],
            ["Based", s.location],
            ["Since", "2017"],
          ].map(([label, value]) => (
            <div key={label} className="bg-fmbg p-5">
              <p className="text-[10px] uppercase tracking-[0.12em] text-fmmuted">{label}</p>
              <p className="fm-grotesk mt-2 text-sm text-fmfg">{value}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 border-t border-fmborder pt-8">
          <Link href="/start" className="group text-sm uppercase tracking-[0.12em] text-fmfg">
            Work with us{" "}
            <span className="inline-block text-fmaccent transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "FMRXR Studio",
        alternateName: "FMRXR//",
        url: "https://fmrxr.com",
        email: s.email,
        description:
          "Creative technology studio building generative systems and immersive installations. New media art, projection mapping, XR and live A/V.",
        foundingDate: "2017",
        founder: {
          "@type": "Person",
          name: "Haïfa Al Jamila Becheikh",
          alternateName: "Effet Mère",
          url: "https://fmrxr.com/effet-mere",
        },
        address: { "@type": "PostalAddress", addressLocality: "Tunis", addressCountry: "TN" },
        knowsAbout: [
          "New media art", "Generative art", "Immersive installation", "Projection mapping",
          "Interactive installation", "XR", "Live A/V", "TouchDesigner", "GLSL", "Real-time visuals",
        ],
      }) }} />
    </>
  );
}
