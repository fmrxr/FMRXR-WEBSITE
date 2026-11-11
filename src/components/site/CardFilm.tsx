"use client";

import { useEffect, useRef } from "react";

// Une boucle muette dans une carte de liste. Onze cartes, onze films : rien ne
// se télécharge tant que la carte n'est pas à l'écran (preload="none", seule
// l'affiche s'affiche), et chaque boucle se met en pause dès qu'elle en sort.
export function CardFilm({
  src,
  poster,
  className = "aspect-video w-full rounded-lg border border-fmborder bg-fmbg object-cover",
  preload = "none",
}: {
  src: string;
  poster: string;
  className?: string;
  // "metadata" quand il n'y a pas d'affiche : la taille de la vidéo doit
  // être connue pour une carte au format d'origine.
  preload?: "none" | "metadata";
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
      poster={poster || undefined}
      aria-hidden
      muted
      loop
      playsInline
      preload={preload}
      draggable={false}
      className={className}
    />
  );
}
