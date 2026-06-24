export function PageHero({ index, title, intro }: { index?: string; title: string; intro?: string }) {
  return (
    <section className="mx-auto max-w-[1200px] px-5 pb-12 pt-4 md:px-8 md:pb-16">
      {index && <p className="text-[11px] uppercase tracking-[0.15em] text-fmmuted">— {index}</p>}
      <h1 className="fm-display mt-3 text-[clamp(2.5rem,7vw,5.5rem)] text-fmfg">{title}</h1>
      {intro && (
        <p className="fm-grotesk mt-5 max-w-2xl text-base leading-relaxed text-fmmuted md:text-lg">{intro}</p>
      )}
    </section>
  );
}
