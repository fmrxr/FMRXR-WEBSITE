"use client";

import { useEffect, useRef, useState } from "react";

type Clip = { url: string; poster?: string };

export function HeroVideo({ clips }: { clips: Clip[] }) {
  const valid = (clips ?? []).filter((c) => c?.url);
  const [i, setI] = useState(0);
  const [reduced, setReduced] = useState(false);
  const refs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (reduced || valid.length <= 1) return;
    const t = setInterval(() => setI((p) => (p + 1) % valid.length), 9000);
    return () => clearInterval(t);
  }, [reduced, valid.length]);

  useEffect(() => {
    if (reduced) return;
    refs.current.forEach((v, idx) => {
      if (!v) return;
      if (idx === i) v.play().catch(() => {});
      else v.pause();
    });
  }, [i, reduced]);

  if (valid.length === 0) return null;

  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-fmbg" aria-hidden>
      {valid.map((c, idx) => (
        // eslint-disable-next-line jsx-a11y/media-has-caption
        <video
          key={c.url}
          ref={(el) => {
            refs.current[idx] = el;
          }}
          src={reduced ? undefined : c.url}
          poster={c.poster || undefined}
          muted
          loop
          playsInline
          autoPlay={!reduced && idx === 0}
          preload={idx === 0 ? "auto" : "none"}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1200ms] ease-in-out ${
            idx === i ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      {valid.length > 1 && (
        <div className="absolute bottom-6 left-1/2 z-30 flex -translate-x-1/2 gap-2">
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
  );
}
