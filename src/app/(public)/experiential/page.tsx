import { PageHero } from "@/components/site/PageHero";

// Page d'attente : son canonical est le sien (sinon elle héritait de "/"), et
// elle reste hors index tant qu'elle n'a pas de contenu. Retirer `robots` le
// jour où elle se remplit.
export const metadata = {
  title: "Experiential",
  alternates: { canonical: "/experiential" },
  robots: { index: false, follow: true },
};

export default function Experiential() {
  return (
    <>
      <PageHero index="Experiential" title="Interactive experiences" intro="Live in-browser generative work, embedded immersive apps, and reactive environments. Landing soon." />
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
