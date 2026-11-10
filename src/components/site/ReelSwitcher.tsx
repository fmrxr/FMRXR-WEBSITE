"use client";

import { useEffect, useRef, useState } from "react";

export type Cut = { id: string; label: string; line: string; src: string; poster: string };

// Plusieurs montages du même reel, au choix du visiteur. Le film démarre
// quand on arrive dessus, pas avant, et repart du début à chaque montage
// choisi : on compare deux écritures, pas deux instants au hasard.
export function ReelSwitcher({
  cuts,
  label,
  aspect = "aspect-[9/16]",
  className = "",
}: {
  cuts: Cut[];
  label: string;
  aspect?: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const seen = useRef(false);
  const [i, setI] = useState(0);
  const cut = cuts[i];

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return v.pause();
        if (!seen.current) {
          v.currentTime = 0;
          seen.current = true;
        }
        v.play().catch(() => {});
      },
      { threshold: 0.4 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  // Changer de montage relance la lecture. L'élément vidéo n'est jamais
  // recréé (pas de `key`) : sinon React en fabrique un neuf, l'observateur
  // d'entrée dans l'écran reste accroché à l'ancien, et le film choisi
  // s'arrête sur sa première image.
  const first = useRef(true);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (first.current) { first.current = false; return; }
    v.load();
    if (seen.current) v.play().catch(() => {});
  }, [i]);

  return (
    <div className={className}>
      <video
        ref={ref}
        src={cut.src}
        poster={cut.poster}
        aria-label={`${label} — ${cut.label}`}
        muted
        loop
        playsInline
        preload="metadata"
        className={`${aspect} w-full rounded-xl border border-fmborder bg-fmbg object-cover`}
      />
      <div role="tablist" aria-label="Cuts" className="mt-3 flex gap-1.5">
        {cuts.map((c, n) => (
          <button
            key={c.id}
            type="button"
            role="tab"
            aria-selected={n === i}
            onClick={() => setI(n)}
            className={`flex-1 rounded-full border px-2 py-2 text-[10px] uppercase tracking-[0.12em] transition ${
              n === i
                ? "border-fmaccent/70 bg-fmaccent/10 text-fmfg"
                : "border-fmborder text-fmmuted hover:border-fmfg/40 hover:text-fmfg"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>
      <p className="fm-grotesk mt-3 text-[13px] leading-relaxed text-fmmuted">{cut.line}</p>
    </div>
  );
}
