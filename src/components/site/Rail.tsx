"use client";

import { useEffect, useRef } from "react";

// Horizontal auto-scrolling rail that the user can also drag (mouse) or
// swipe (touch, native scrolling with momentum). Children are rendered twice for a seamless infinite loop.
// Each child should carry `shrink-0` so it keeps its intrinsic width.
export function Rail({
  children,
  reverse = false,
  speed = 0.5,
  gapClass = "gap-4",
}: {
  children: React.ReactNode;
  reverse?: boolean;
  speed?: number;
  gapClass?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const st = useRef({ paused: false, dragging: false, touching: false, holdUntil: 0, startX: 0, startScroll: 0, moved: false });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Accumulate position as a float — reading el.scrollLeft back can be
    // integer-rounded, which would stall sub-pixel increments.
    let pos = 1;
    el.scrollLeft = pos;
    let raf = 0;
    const step = () => {
      const s = st.current;
      const half = el.scrollWidth / 2;
      // Au toucher, le navigateur prend la main sur le défilement (inertie
      // comprise) et envoie un pointercancel dès le début du geste. Relancer
      // l'auto-défilement à ce moment-là réécrirait scrollLeft à chaque frame
      // sous le doigt : le carrousel paraissait figé sur mobile. On attend donc
      // la fin du geste et un court silence après le dernier scroll.
      if (!s.paused && !s.dragging && !s.touching && performance.now() > s.holdUntil) {
        pos += reverse ? -speed : speed;
        if (half > 0) {
          if (pos >= half) pos -= half;
          else if (pos < 0) pos += half;
        }
        el.scrollLeft = pos;
      } else {
        // Boucle infinie aussi au doigt : on ne recale qu'une fois le geste
        // lâché, un saut de scrollLeft pendant l'inertie la casserait sur iOS.
        if (!s.touching && half > 0 && el.scrollLeft >= half) el.scrollLeft -= half;
        pos = el.scrollLeft; // stay in sync while hovering / dragging / touch-scrolling
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    // Tout scroll qui ne vient pas de la boucle (doigt, inertie, trackpad)
    // repousse la reprise de l'auto-défilement.
    const onScroll = () => {
      if (Math.abs(el.scrollLeft - pos) > 2) st.current.holdUntil = performance.now() + 1500;
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("scroll", onScroll);
    };
  }, [reverse, speed]);

  function down(e: React.PointerEvent) {
    st.current.moved = false;
    if (e.pointerType !== "mouse") {
      st.current.touching = true;
      return;
    }
    st.current.paused = true;
    const el = ref.current;
    if (!el) return;
    st.current.dragging = true;
    st.current.startX = e.clientX;
    st.current.startScroll = el.scrollLeft;
  }
  function move(e: React.PointerEvent) {
    const el = ref.current;
    const s = st.current;
    if (!el || !s.dragging || e.pointerType !== "mouse") return;
    const dx = e.clientX - s.startX;
    if (Math.abs(dx) > 3) s.moved = true;
    let next = s.startScroll - dx;
    const half = el.scrollWidth / 2;
    if (half > 0) {
      if (next >= half) { next -= half; s.startScroll -= half; }
      else if (next < 0) { next += half; s.startScroll += half; }
    }
    el.scrollLeft = next;
  }
  function up(e: React.PointerEvent) {
    if (e.pointerType !== "mouse") {
      st.current.touching = false;
      st.current.holdUntil = performance.now() + 1500;
      return;
    }
    st.current.dragging = false;
    st.current.paused = false;
  }

  return (
    <div
      ref={ref}
      onMouseEnter={() => (st.current.paused = true)}
      onMouseLeave={() => { st.current.paused = false; st.current.dragging = false; }}
      onPointerDown={down}
      onPointerMove={move}
      onPointerUp={up}
      onPointerCancel={up}
      onDragStart={(e) => e.preventDefault()}
      onClickCapture={(e) => {
        if (st.current.moved) {
          e.preventDefault();
          e.stopPropagation();
        }
      }}
      className={`no-scrollbar flex ${gapClass} cursor-grab touch-pan-x select-none overflow-x-auto active:cursor-grabbing`}
    >
      <div className={`flex ${gapClass} shrink-0`}>{children}</div>
      <div className={`flex ${gapClass} shrink-0`} aria-hidden>{children}</div>
    </div>
  );
}
