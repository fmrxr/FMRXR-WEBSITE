"use client";

import { useEffect, useRef, useState } from "react";

// Un film qui démarre quand on arrive dessus, pas avant. Lancé à l'avance, le
// visiteur qui scrolle tomberait au milieu du film ; ici il commence au début
// à la première entrée dans l'écran, se met en pause quand on en sort et
// reprend au retour, en boucle. Muet par défaut (un navigateur refuse sinon
// la lecture automatique) ; un bouton discret rend le son, qui fait partie du
// film puisque la salle réagit à la musique.
export function ScrollFilm({
  src,
  poster,
  label,
  sound = true,
  className = "mt-10",
}: {
  src: string;
  poster: string;
  label: string;
  // false for a silent loop: no sound button to offer
  sound?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const started = useRef(false);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!started.current) {
            v.currentTime = 0;
            started.current = true;
          }
          v.play().catch(() => {});
        } else {
          v.pause();
        }
      },
      { threshold: 0.45 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  return (
    <div className={`relative ${className}`}>
      <video
        ref={ref}
        src={src}
        poster={poster}
        aria-label={label}
        muted={muted}
        loop
        playsInline
        preload="metadata"
        className="aspect-video w-full rounded-xl border border-fmborder bg-fmbg object-cover"
      />
      {sound && (
      <button
        type="button"
        onClick={() => {
          const v = ref.current;
          setMuted((m) => !m);
          if (v) {
            v.muted = !v.muted;
            v.play().catch(() => {});
          }
        }}
        className="absolute bottom-3 right-3 rounded-full border border-fmborder bg-fmbg/80 px-3 py-1.5 text-[10px] uppercase tracking-[0.16em] text-fmfg backdrop-blur transition-colors hover:border-fmaccent/60"
      >
        {muted ? "Sound on" : "Sound off"}
      </button>
      )}
    </div>
  );
}
