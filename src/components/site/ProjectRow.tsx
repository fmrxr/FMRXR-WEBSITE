"use client";

import { useEffect, useRef, useState } from "react";

// Une rangée de la page Work, à la manière d'un catalogue de streaming : une
// ligne par industrie, qui défile à l'horizontale. Pas d'auto-défilement ici,
// contrairement au Rail de l'accueil : on vient sur cette page pour chercher,
// le contenu ne doit pas bouger sous les yeux.
//
// Le défilement est celui du navigateur, avec aimantation sur les cartes. Au
// doigt c'est donc un swipe natif avec inertie, sans code à maintenir. Les
// flèches ne servent qu'à la souris, elles sont masquées sur écran tactile et
// disparaissent quand on est au bout de la rangée.
export function ProjectRow({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ start: true, end: false });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () =>
      setEdges({
        start: el.scrollLeft <= 4,
        end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4,
      });
    update();
    el.addEventListener("scroll", update, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", update);
      ro.disconnect();
    };
  }, []);

  // Une page de cartes à la fois, moins une carte pour garder un repère.
  const page = (dir: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.max(el.clientWidth * 0.8, 280), behavior: "smooth" });
  };

  const arrow =
    "absolute top-[34%] z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-fmborder bg-fmbg/85 text-fmfg backdrop-blur transition-opacity hover:border-fmaccent/60 hover:text-fmaccent [@media(hover:hover)]:flex";

  return (
    <div className="relative">
      <div
        ref={ref}
        className="no-scrollbar -mx-5 flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 pb-2 md:-mx-8 md:scroll-px-8 md:px-8"
      >
        {children}
      </div>
      <button
        type="button"
        aria-label="Previous projects"
        onClick={() => page(-1)}
        className={`${arrow} -left-3 md:-left-5 ${edges.start ? "pointer-events-none opacity-0" : "opacity-100"}`}
      >
        <span aria-hidden>←</span>
      </button>
      <button
        type="button"
        aria-label="Next projects"
        onClick={() => page(1)}
        className={`${arrow} -right-3 md:-right-5 ${edges.end ? "pointer-events-none opacity-0" : "opacity-100"}`}
      >
        <span aria-hidden>→</span>
      </button>
    </div>
  );
}
