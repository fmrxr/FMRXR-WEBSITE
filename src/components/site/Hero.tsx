"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type Clip = { url: string; poster?: string; title?: string; description?: string };

const pad = (n: number) => String(n).padStart(2, "0");

export function Hero({ clips }: { clips: Clip[] }) {
  const valid = (clips ?? []).filter((c) => c?.url);
  const hasVideo = valid.length > 0;
  const [i, setI] = useState(0);
  const refs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    refs.current.forEach((v, idx) => {
      if (!v) return;
      v.muted = true;
      v.defaultMuted = true;
      v.playsInline = true;
      if (idx === i) v.play().catch(() => {});
      else v.pause();
    });
  }, [i, valid.length]);

  useEffect(() => {
    if (valid.length <= 1) return;
    const t = setInterval(() => setI((p) => (p + 1) % valid.length), 15000);
    return () => clearInterval(t);
  }, [valid.length]);

  const active = valid[i];

  return (
    <section className={`relative overflow-hidden ${hasVideo ? "flex min-h-dvh flex-col justify-end" : ""}`}>
      {hasVideo && (
        <div className="absolute inset-0 z-0 overflow-hidden bg-fmbg" aria-hidden>
          {valid.map((c, idx) => (
            // eslint-disable-next-line jsx-a11y/media-has-caption
            <video
              key={c.url}
              ref={(el) => {
                refs.current[idx] = el;
                if (el) {
                  el.muted = true;
                  el.defaultMuted = true;
                }
              }}
              src={c.url}
              poster={c.poster || undefined}
              muted
              loop
              autoPlay
              playsInline
              preload={idx === 0 ? "auto" : "metadata"}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1200ms] ease-in-out ${
                idx === i ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0d0c14]/60 via-[#0d0c14]/30 to-[#0d0c14]" />
        </div>
      )}

      <div
        className={`relative z-20 mx-auto w-full max-w-[1200px] px-5 md:px-8 ${
          hasVideo ? "pb-16 pt-32 md:pb-20 md:pt-40" : "pt-36 pb-20 md:pt-44 md:pb-28"
        }`}
      >
        <div className="fm-rise grid gap-10 md:grid-cols-[1.3fr_1fr] md:items-end" style={{ animationDelay: "120ms" }}>
          {/* La promesse d'abord : un directeur marketing doit comprendre en
              quelques secondes ce que le studio produit, avant de regarder
              quel projet passe derrière. */}
          <div>
            <h1 className="fm-display max-w-2xl text-[clamp(2rem,5vw,3.5rem)] leading-[1.02] text-fmfg">
              Creative technology for experiences that react, generate and perform.
            </h1>
            <p className="fm-grotesk mt-5 max-w-xl text-base leading-relaxed text-fmfg/80 md:text-lg">
              Immersive environments, real-time systems and interactive experiences for brands, artists and institutions.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
              <Link
                href="/start"
                data-cta="hero_start"
                className="group inline-flex items-center gap-2 rounded-full bg-fmaccent px-6 py-3 text-[11px] font-medium uppercase tracking-[0.14em] text-fmbg transition-opacity hover:opacity-90"
              >
                Start a project
                <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
              </Link>
              <Link
                href="/projects"
                data-cta="hero_work"
                className="group text-[11px] uppercase tracking-[0.14em] text-fmfg"
              >
                Explore our work{" "}
                <span className="inline-block text-fmaccent transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </div>

          <div className="flex flex-col items-start gap-4 md:items-end">
            {hasVideo && (
              <div className="fm-glass-card w-full max-w-sm rounded-xl p-5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-[0.15em] text-fmmuted">
                    <span className="text-fmaccent">●</span> Now showing
                  </span>
                  <span className="text-[10px] tabular-nums text-fmmuted">
                    {pad(i + 1)} / {pad(valid.length)}
                  </span>
                </div>
                <h2 className="fm-display mt-3 text-xl text-fmfg">{active?.title || "Untitled"}</h2>
                {active?.description && (
                  <p className="fm-grotesk mt-2 text-[13px] leading-relaxed text-fmmuted">{active.description}</p>
                )}
                {valid.length > 1 && (
                  <div className="mt-4 flex gap-2">
                    {valid.map((_, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setI(idx)}
                        aria-label={`Show clip ${idx + 1}`}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          idx === i ? "w-7 bg-fmfg" : "w-1.5 bg-fmfg/40 hover:bg-fmfg/70"
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}
            <Link href="/effet-mere" className="fm-link text-[11px] uppercase tracking-[0.12em] text-fmmuted">
              About Effet Mère ↠
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
