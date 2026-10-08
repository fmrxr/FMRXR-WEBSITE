"use client";

import { useEffect, useRef } from "react";

// Une boucle muette dans une carte de liste. Onze cartes, onze films : rien ne
// se télécharge tant que la carte n'est pas à l'écran (preload="none", seule
// l'affiche s'affiche), et chaque boucle se met en pause dès qu'elle en sort.
export function CardFilm({
  src,
  poster,
  className = "aspect-video w-full rounded-lg border border-fmborder bg-fmbg object-cover",
}: {
  src: string;
  poster: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const io = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? v.play().catch(() => {}) : v.pause()),
      { threshold: 0.5 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      aria-hidden
      muted
      loop
      playsInline
      preload="none"
      draggable={false}
      className={className}
    />
  );
}
