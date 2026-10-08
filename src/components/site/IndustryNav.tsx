"use client";

import { useEffect, useRef, useState } from "react";

// Bandeau collé sous le header de la page Work : une pastille par rangée, qui
// y renvoie. La pastille de la rangée en cours de lecture s'allume, et se
// recentre dans le bandeau quand il déborde (sur téléphone il défile au doigt).
export function IndustryNav({ items }: { items: { id: string; label: string; count: number }[] }) {
  const [active, setActive] = useState(items[0]?.id);
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Une rangée est « en cours » quand elle traverse le haut de l'écran, juste
    // sous le header et le bandeau : c'est là que l'œil la lit.
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (hit) setActive(hit.target.id);
      },
      { rootMargin: "-130px 0px -55% 0px" },
    );
    items.forEach((it) => {
      const el = document.getElementById(it.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [items]);

  useEffect(() => {
    const b = bar.current;
    const chip = b?.querySelector<HTMLElement>(`[data-id="${active}"]`);
    if (b && chip) b.scrollTo({ left: chip.offsetLeft - b.clientWidth / 2 + chip.clientWidth / 2, behavior: "smooth" });
  }, [active]);

  return (
    <nav
      aria-label="Industries"
      className="sticky top-[57px] z-40 -mx-5 mb-10 border-b border-fmborder/70 bg-[#0d0c14]/75 backdrop-blur-xl md:-mx-8"
    >
      <div ref={bar} className="no-scrollbar flex gap-2 overflow-x-auto px-5 py-3 md:px-8">
        {items.map((it) => (
          <a
            key={it.id}
            data-id={it.id}
            href={`#${it.id}`}
            onClick={(e) => {
              // Glissé plutôt que saut sec : on garde le fil de la page.
              const target = document.getElementById(it.id);
              if (!target) return;
              e.preventDefault();
              target.scrollIntoView({ behavior: "smooth", block: "start" });
              history.replaceState(null, "", `#${it.id}`);
              setActive(it.id);
            }}
            aria-current={active === it.id ? "true" : undefined}
            className={`shrink-0 whitespace-nowrap rounded-full border px-3.5 py-1.5 text-[11px] uppercase tracking-[0.1em] transition-colors ${
              active === it.id
                ? "border-fmaccent/70 bg-fmaccent/10 text-fmfg"
                : "border-fmborder text-fmmuted hover:border-fmfg/30 hover:text-fmfg"
            }`}
          >
            {it.label} <span className="ml-1 text-fmmuted">{String(it.count).padStart(2, "0")}</span>
          </a>
        ))}
      </div>
    </nav>
  );
}
