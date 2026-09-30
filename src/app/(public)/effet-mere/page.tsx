import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/site/PageHero";

export const metadata: Metadata = {
  title: "Effet Mère · New media artist, generative systems",
  description:
    "Effet Mère is the artistic identity of Haïfa Becheikh: new media art, generative systems, immersive installation and audiovisual performance. The real is not represented, it is generated.",
  keywords: [
    "Effet Mère", "new media artist", "generative art", "generative systems",
    "immersive installation", "audiovisual performance", "computational aesthetics",
    "post-digital", "algorithmic art", "Haïfa Becheikh", "digital artist Tunisia",
  ],
  alternates: { canonical: "/effet-mere" },
  openGraph: {
    type: "profile",
    url: "/effet-mere",
    title: "Effet Mère · New media artist, generative systems",
    description:
      "New media art, generative systems and immersive environments. The real is not represented, it is generated.",
  },
};

// Une section de texte : un intertitre, puis ses paragraphes. On garde la
// structure en données plutôt qu'en JSX pour que le balisage reste identique
// d'une section à l'autre et que le plan de la page se lise d'un coup d'œil.
const SECTIONS: { title: string; body: string[] }[] = [
  {
    title: "A name that is a system, not a label",
    body: [
      "Effet Mère is the artistic identity of Haïfa Becheikh, adopted in 2009 after several years under a different digital name. It covers VJing, live audiovisual performance, generative systems and contemporary art.",
      "The name does not work as a pseudonym. It works as a condensed ontological proposition, a hypothesis about how the real produces itself and becomes visible. Effet Mère is not a who, it is a how.",
    ],
  },
  {
    title: "The matrix, not the figure",
    body: [
      "Mother here is not a biographical or anthropological figure. It names a generative matrix: a field of potential, a system that produces forms, a structure that stays invisible while remaining operative.",
      "That matrix is biological through memory and transmission, symbolic through language and narrative, digital through code, systems and data, and perceptual through cognitive structure. It does not necessarily precede the effect. It is constantly reconfigured by what it produces.",
    ],
  },
  {
    title: "The effect is the only accessible form",
    body: [
      "Classical thought runs cause to effect. Effet Mère twists that structure. The origin stops being a fixed point and becomes an active function, which leaves the effect as the only observable reality.",
      "What we call real is then an output, a trace, a temporary manifestation. The real is no longer what is, it is what appears as the result of invisible processes. Seeing is not perceiving the world, it is decoding its generative residue.",
    ],
  },
  {
    title: "An aesthetics of instability",
    body: [
      "No form is final. Every image is a transient state, every structure can reconfigure, the visible is always in the process of being produced. Instability is not a stylistic effect here, it is a condition of the system.",
      "Glitch, variation and error are not failures. Repetition produces difference. The image does not illustrate, it produces. Sound does not represent, it derives. Code does not execute, it invokes.",
    ],
  },
  {
    title: "The artist as operator",
    body: [
      "The role shifts. Not to represent, express or narrate, but to activate generative systems, define conditions of appearance and manipulate matrices of effects.",
      "Creation moves from the level of the object to the level of the conditions under which the visible is produced. The artist is an operator of matrices, and the work is an active environment rather than a finished object.",
    ],
  },
  {
    title: "Theoretical ground",
    body: [
      "The practice sits at an interdisciplinary crossing: process philosophy in its contemporary readings of Whitehead and Deleuze, relational and non-substantial ontologies, computational aesthetics and generative art, post-internet culture, systems theory and feedback loops.",
      "In production it runs on real-time generative engines, TouchDesigner, GLSL, Python, live data, visual and sonic feedback, sensors, cameras and tracking. The tool is never the point. The capacity to produce autonomous generative loops is.",
    ],
  },
];

const FORMATS = [
  { k: "Generative installation", v: "Real-time visual systems, unstable and evolving images, interaction between data and memory." },
  { k: "Immersive environment", v: "Spatialised sound and light, an architecture of appearance, fragmented and dynamic perception." },
  { k: "Algorithmic performance", v: "Live activation of generative systems, artist and machine in exchange, improvisation built on code structures." },
  { k: "Living archive", v: "A mutating visual database, memory that never fixes, documentation as an extension of the work." },
];

export default function EffetMere() {
  return (
    <>
      <PageHero
        index="Effet Mère"
        title="Reality is not represented. It is generated."
        intro="New media artist and creative director. Generative systems, immersive installation and audiovisual performance, in practice since 2009."
      />

      <section className="mx-auto max-w-2xl px-5 pb-8 md:px-8">
        {SECTIONS.map((s) => (
          <div key={s.title} className="mb-10">
            <h2 className="fm-display text-lg text-fmfg">{s.title}</h2>
            <div className="fm-grotesk mt-3 flex flex-col gap-4 text-[15px] leading-relaxed text-fmfg/85">
              {s.body.map((p, i) => <p key={i}>{p}</p>)}
            </div>
          </div>
        ))}

        <h2 className="fm-display mt-14 text-lg text-fmfg">Formats</h2>
        <dl className="mt-4 grid gap-px overflow-hidden rounded-xl border border-fmborder bg-fmborder">
          {FORMATS.map((f) => (
            <div key={f.k} className="bg-fmbg p-5">
              <dt className="text-[10px] uppercase tracking-[0.12em] text-fmmuted">{f.k}</dt>
              <dd className="fm-grotesk mt-2 text-sm text-fmfg/85">{f.v}</dd>
            </div>
          ))}
        </dl>

        <blockquote className="mt-14 border-l-2 border-fmaccent pl-6 text-lg italic text-fmfg/90">
          “Every form is an effect. Every effect comes from a mother. But that mother is never an origin,
          only another form in the act of generating.”
        </blockquote>

        <div className="mt-14 border-t border-fmborder pt-8">
          <Link href="/projects" className="group text-sm uppercase tracking-[0.12em] text-fmfg">
            See the work{" "}
            <span className="inline-block text-fmaccent transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Person",
        name: "Haïfa Al Jamila Becheikh",
        alternateName: "Effet Mère",
        url: "https://fmrxr.com/effet-mere",
        jobTitle: "New media artist and creative director",
        description:
          "New media artist working with generative systems, immersive installation and audiovisual performance. Artistic identity in practice since 2009.",
        knowsAbout: [
          "New media art", "Generative art", "Immersive installation",
          "Projection mapping", "Audiovisual performance", "Computational aesthetics",
          "TouchDesigner", "GLSL", "Real-time visuals",
        ],
        worksFor: { "@type": "Organization", name: "FMRXR Studio", url: "https://fmrxr.com" },
        address: { "@type": "PostalAddress", addressLocality: "Tunis", addressCountry: "TN" },
      }) }} />
    </>
  );
}
