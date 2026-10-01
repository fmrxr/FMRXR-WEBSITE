import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/site/PageHero";

export const metadata: Metadata = {
  title: "Press & media",
  description:
    "Press coverage, media kit and fact sheet for FMRXR Studio and Effet Mère. Work covered by La Presse, Leaders, Business News, L'Instant M, Kapitalis and Le Temps.",
  keywords: ["FMRXR press", "Effet Mère press", "media kit", "press kit", "new media art Tunisia press"],
  alternates: { canonical: "/press" },
  openGraph: {
    type: "website",
    url: "/press",
    title: "Press & media · FMRXR Studio",
    description: "Press coverage, media kit and fact sheet for FMRXR Studio and Effet Mère.",
  },
};

// Les retombées presse réelles, vérifiées une par une. Elles servent autant de
// preuve pour un commissaire que de maillage sortant pour le référencement.
const COVERAGE: { outlet: string; title: string; project: string; url: string }[] = [
  {
    outlet: "Leaders",
    title: "Quand la technologie Epson donne vie à l'imaginaire : une immersion artistique inédite à Tunis",
    project: "Le Monde Imaginaire",
    url: "https://www.leaders.com.tn/article/36958-quand-la-technologie-epson-donne-vie-a-l-imaginaire-une-immersion-artistique-inedite-a-tunis",
  },
  {
    outlet: "L'Instant M",
    title: "SPECTRUM: The Birth of Light, une immersion artistique où la lumière devient matière",
    project: "SPECTRUM",
    url: "https://linstant-m.tn/single-article/ar10589_spectrum-the-birth-of-light-une-immersion-artistique-ou-la-lumiere-devient-matiere",
  },
  {
    outlet: "L'Instant M",
    title: "Dreaming Again marque la première exposition parisienne de l'artiste Lydia Lhote Lazaar",
    project: "DREAMING AGAIN",
    url: "https://linstant-m.tn/single-article/ar10208_dreaming-again-marque-la-premiere-exposition-parisienne-de-lartiste-lydia-lhote-lazaar",
  },
  {
    outlet: "Kamel Lazaar Foundation",
    title: "Between Frequencies by DAWAN, B7L9 Art Centre",
    project: "Between Frequencies",
    url: "https://www.kamellazaarfoundation.org/concerts-performances/between-frequencies-dawan-0",
  },
  {
    outlet: "La Femme",
    title: "JMC Autrement : la médina aux couleurs de la musique électronique",
    project: "Ambivalence",
    url: "https://www.la-femme.tn/2021/12/21/jmc-autrement-la-medina-aux-couleurs-de-la-musique-electronique/",
  },
  {
    outlet: "Kapitalis",
    title: "JMC 2021 : Musique électro, arts visuels et déambulations à la médina de Tunis",
    project: "Ambivalence",
    url: "https://kapitalis.com/tunisie/2021/12/21/jmc-2021-musique-electro-arts-visuels-et-deambulations-a-la-medina-de-tunis/",
  },
  {
    outlet: "INTERFERENCE Tunis",
    title: "Effet Mère, INTERFERENCE SERIES Tunis 2022",
    project: "Interference",
    url: "https://2022.intunis.net/effet-mere/",
  },
  {
    outlet: "La Presse",
    title: "Ooredoo Tunisie présente l'avenir de la 5G avec une expérience unique",
    project: "Ooredoo 5G",
    url: "https://www.lapresse.tn/2025/02/22/ooredoo-tunisie-presente-lavenir-de-la-5g-avec-une-experience-unique/",
  },
  {
    outlet: "Business News",
    title: "Le look, le fun et la performance : découvrez la Dolphin SURF de BYD",
    project: "BYD Dolphin SURF",
    url: "https://businessnews.com.tn/2026/01/16/le-look-le-fun-et-la-performance-decouvrez-la-dolphin-surf-de-byd/1383231/",
  },
];

const FACTS = [
  ["Studio", "FMRXR Studio, creative technology, founded 2017"],
  ["Artistic identity", "Effet Mère, new media art, in practice since 2009"],
  ["Founder", "Haïfa Al Jamila Becheikh, creative director and new media artist"],
  ["Based", "Tunis, Tunisia"],
  ["Fields", "New media art, generative systems, immersive installation, projection mapping, XR, live A/V"],
  ["Tools", "TouchDesigner, GLSL, Python, Arduino, DMX, real-time engines, generative AI"],
];

export default function Press() {
  return (
    <>
      <PageHero
        index="Press"
        title="Press & media"
        intro="Coverage, fact sheet and media kit. Logos, founder bio and project stills on request."
      />

      <section className="mx-auto max-w-3xl px-5 pb-24 md:px-8">
        <h2 className="fm-display text-lg text-fmfg">Fact sheet</h2>
        <dl className="mt-4 grid gap-px overflow-hidden rounded-xl border border-fmborder bg-fmborder">
          {FACTS.map(([k, v]) => (
            <div key={k} className="bg-fmbg p-5">
              <dt className="text-[10px] uppercase tracking-[0.12em] text-fmmuted">{k}</dt>
              <dd className="fm-grotesk mt-2 text-sm leading-relaxed text-fmfg/85">{v}</dd>
            </div>
          ))}
        </dl>

        <h2 className="fm-display mt-16 text-lg text-fmfg">Selected coverage</h2>
        <ul className="mt-4 flex flex-col gap-px overflow-hidden rounded-xl border border-fmborder bg-fmborder">
          {COVERAGE.map((c) => (
            <li key={c.url} className="bg-fmbg p-5">
              <a href={c.url} target="_blank" rel="noopener noreferrer" className="group block">
                <p className="text-[10px] uppercase tracking-[0.12em] text-fmmuted">
                  {c.outlet} · {c.project}
                </p>
                <p className="fm-grotesk mt-2 text-sm leading-relaxed text-fmfg transition-colors group-hover:text-fmaccent">
                  {c.title}{" "}
                  <span className="inline-block text-fmaccent transition-transform group-hover:translate-x-1">↗</span>
                </p>
              </a>
            </li>
          ))}
        </ul>

        <div className="fm-glass-card mt-16 rounded-xl p-8">
          <p className="fm-grotesk text-fmmuted">
            For press enquiries, interviews, high-resolution stills or the full media kit, get in touch and
            we will send it over.
          </p>
          <Link href="/contact" className="group mt-6 inline-block text-sm uppercase tracking-[0.12em] text-fmfg">
            Request media kit{" "}
            <span className="inline-block text-fmaccent transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </section>
    </>
  );
}
