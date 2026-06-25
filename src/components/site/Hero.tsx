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
        <h1 className="sr-only">FMRXR — Creative Technology</h1>

        <div className="fm-rise grid gap-8 md:grid-cols-[1.3fr_1fr]" style={{ animationDelay: "120ms" }}>
          <div>
            {hasVideo ? (
              <div className="fm-glass-card max-w-md rounded-xl p-5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-[0.15em] text-fmmuted">
                    <span className="text-fmaccent">●</span> Now showing
                  </span>
                  <span className="text-[10px] tabular-nums text-fmmuted">
                    {pad(i + 1)} / {pad(valid.length)}
                  </span>
                </div>
                <h2 className="fm-display mt-3 text-2xl text-fmfg">{active?.title || "Untitled"}</h2>
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
            ) : (
              <p className="fm-grotesk max-w-xl text-base leading-relaxed text-fmfg/85 md:text-lg">
                Immersive systems, generative worlds, real-time AI art and marketing automation.
              </p>
            )}
          </div>

          <div className="flex flex-col items-start gap-4 md:items-end md:justify-end">
            <Link href="/experiential" className="group text-sm uppercase tracking-[0.12em] text-fmfg">
              Experiential{" "}
              <span className="inline-block text-fmaccent transition-transform group-hover:translate-x-1">→</span>
            </Link>
            <Link href="/effet-mere" className="fm-link text-sm uppercase tracking-[0.12em] text-fmmuted">
              About Effet Mère ↠
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
