"use client";

import { useEffect, useRef, useState } from "react";

// Une rangée de la page Work, à la manière d'un catalogue de streaming : une
// ligne par industrie, qui défile à l'horizontale. Pas d'auto-défilement ici,
// contrairement au Rail de l'accueil : on vient sur cette page pour chercher,
// le contenu ne doit pas bouger sous les yeux.
//
// Le défilement est celui du navigateur, avec aimantation sur les cartes. Au
// doigt c'est donc un swipe natif avec inertie, sans code à maintenir. À la
// souris on attrape la rangée et on la fait glisser, comme le Rail de
// l'accueil ; les flèches s'ajoutent pour qui préfère cliquer. Elles sont
// masquées sur écran tactile et disparaissent au bout de la rangée.
export function ProjectRow({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ start: true, end: false });
  const drag = useRef({ active: false, startX: 0, startScroll: 0, moved: false });
  const [dragging, setDragging] = useState(false);

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

  // Glisser à la souris uniquement : au doigt le navigateur fait mieux que nous.
  // L'aimantation est coupée pendant le geste, sinon elle ramène la rangée à
  // chaque pixel, puis rétablie au lâcher pour que la rangée se cale.
  function down(e: React.PointerEvent) {
    const el = ref.current;
    if (!el || e.pointerType !== "mouse" || e.button !== 0) return;
    drag.current = { active: true, startX: e.clientX, startScroll: el.scrollLeft, moved: false };
  }
  function move(e: React.PointerEvent) {
    const el = ref.current;
    const d = drag.current;
    if (!el || !d.active) return;
    const dx = e.clientX - d.startX;
    if (!d.moved && Math.abs(dx) > 4) {
      d.moved = true;
      setDragging(true);
    }
    if (d.moved) el.scrollLeft = d.startScroll - dx;
  }
  function up() {
    if (!drag.current.active) return;
    drag.current.active = false;
    setDragging(false);
  }

  const arrow =
    "absolute top-[34%] z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-fmborder bg-fmbg/85 text-fmfg backdrop-blur transition-opacity hover:border-fmaccent/60 hover:text-fmaccent [@media(hover:hover)]:flex";

  return (
    <div className="relative">
      <div
        ref={ref}
        onPointerDown={down}
        onPointerMove={move}
        onPointerUp={up}
        onPointerLeave={up}
        onDragStart={(e) => e.preventDefault()}
        onClickCapture={(e) => {
          // Un glisser ne doit pas ouvrir la fiche sous le curseur au lâcher.
          if (drag.current.moved) {
            e.preventDefault();
            e.stopPropagation();
            drag.current.moved = false;
          }
        }}
        className={`no-scrollbar -mx-5 flex select-none ${dragging ? "cursor-grabbing snap-none" : "cursor-grab snap-x snap-mandatory"} scroll-px-5 gap-4 overflow-x-auto px-5 pb-2 md:-mx-8 md:scroll-px-8 md:px-8`}
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
