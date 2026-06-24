import { PageHero } from "@/components/site/PageHero";

export const metadata = { title: "Experiential — FMRXR//" };

export default function Experiential() {
  return (
    <>
      <PageHero index="Experiential" title="Interactive experiences" intro="Live in-browser generative work, embedded immersive apps, and reactive environments — landing soon." />
      <section className="mx-auto max-w-3xl px-5 pb-24 md:px-8">
        <div className="fm-glass-card flex items-center justify-center rounded-xl p-16 text-center">
          <span className="text-[11px] uppercase tracking-[0.2em] text-fmmuted">
            <span className="text-fmaccent">●</span> Coming soon
          </span>
        </div>
      </section>
    </>
  );
}
