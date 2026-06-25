"use client";

import { useEffect, useRef } from "react";

// Horizontal auto-scrolling rail that the user can also drag (mouse) or
// swipe (touch). Children are rendered twice for a seamless infinite loop.
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
  const st = useRef({ paused: false, dragging: false, startX: 0, startScroll: 0, moved: false });

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
      if (!s.paused && !s.dragging) {
        pos += reverse ? -speed : speed;
        if (half > 0) {
          if (pos >= half) pos -= half;
          else if (pos < 0) pos += half;
        }
        el.scrollLeft = pos;
      } else {
        pos = el.scrollLeft; // stay in sync while hovering / dragging / touch-scrolling
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [reverse, speed]);

  function down(e: React.PointerEvent) {
    st.current.paused = true;
    st.current.moved = false;
    if (e.pointerType === "mouse") {
      const el = ref.current;
      if (!el) return;
      st.current.dragging = true;
      st.current.startX = e.clientX;
      st.current.startScroll = el.scrollLeft;
    }
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
  function up() {
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
