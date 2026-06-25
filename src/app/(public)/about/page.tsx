import Link from "next/link";
import { getSiteSettings } from "@/lib/public-data";
import { PageHero } from "@/components/site/PageHero";

export const revalidate = 60;

export default async function About() {
  const s = await getSiteSettings();
  return (
    <>
      <PageHero index="About" title="Systems over spectacle." intro={s.description} />
      <section className="mx-auto max-w-3xl px-5 pb-24 md:px-8">
        <div className="fm-grotesk flex max-w-2xl flex-col gap-5 text-[15px] leading-relaxed text-fmfg/85">
          <p>
            {s.name} is a creative technology studio based in {s.location}, working at the intersection of
            art, technology and brand. TouchDesigner-first, hardware-aware, editorially rigorous — every
            project is treated as a living system that must survive live conditions.
          </p>
          <p>
            Founded and creatively directed by {s.founder}, also performing as {s.artist_alias}. The studio
            spans immersive installations, projection mapping, XR, generative environments, live A/V and
            AI-driven workflows.
          </p>
        </div>

        <div className="mt-10 grid gap-px overflow-hidden rounded-xl border border-fmborder bg-fmborder sm:grid-cols-3">
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
    </>
  );
}
