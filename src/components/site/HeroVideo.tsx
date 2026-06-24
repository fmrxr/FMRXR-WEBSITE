"use client";

import { useEffect, useRef, useState } from "react";

type Clip = { url: string; poster?: string };

export function HeroVideo({ clips }: { clips: Clip[] }) {
  const valid = (clips ?? []).filter((c) => c?.url);
  const [i, setI] = useState(0);
  const refs = useRef<(HTMLVideoElement | null)[]>([]);

  // Force muted + inline as DOM properties (React's `muted` attribute alone
  // isn't always honored, which blocks autoplay on iOS/Chrome), then play.
  const playActive = () => {
    refs.current.forEach((v, idx) => {
      if (!v) return;
      v.muted = true;
      v.defaultMuted = true;
      v.playsInline = true;
      if (idx === i) v.play().catch(() => {});
      else v.pause();
    });
  };

  useEffect(() => {
    playActive();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i, valid.length]);

  useEffect(() => {
    if (valid.length <= 1) return;
    const t = setInterval(() => setI((p) => (p + 1) % valid.length), 9000);
    return () => clearInterval(t);
  }, [valid.length]);

  if (valid.length === 0) return null;

  return (
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
          onLoadedData={(e) => {
            if (idx === i) (e.currentTarget as HTMLVideoElement).play().catch(() => {});
          }}
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
