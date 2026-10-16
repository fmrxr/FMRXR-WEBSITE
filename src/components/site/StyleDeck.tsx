"use client";
import { useEffect, useState } from "react";

// Paquet de cartes du hero /photobooth : les vraies sorties de la borne
// (public/photobooth/styles/<id>.webp). Toutes les 2,6 s la carte du dessus
// passe derriere, comme un jeu qu'on bat. Immobile si le visiteur demande
// moins d'animations.

export type DeckItem = { id: string; label: string; isNew?: boolean };

const VISIBLE = 4;

export function StyleDeck({ items }: { items: DeckItem[] }) {
  const [top, setTop] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setTop((t) => (t + 1) % items.length), 2600);
    return () => window.clearInterval(id);
  }, [items.length]);

  return (
    <div className="relative mx-auto aspect-[3/4] w-[min(72vw,340px)]" aria-label="Portrait styles of the AI Photo Booth">
      {items.map((it, i) => {
        // Rang dans le paquet : 0 = dessus, puis les cartes derriere.
        const rank = (i - top + items.length) % items.length;
        const shown = rank < VISIBLE;
        const leaving = rank === items.length - 1; // celle qui vient de passer derriere
        const transform = shown
          ? `translate(${rank * 14}px, ${-rank * 10}px) rotate(${rank * 3.5}deg) scale(${1 - rank * 0.04})`
          : leaving
            ? "translate(-28px, 24px) rotate(-10deg) scale(0.96)"
            : `translate(${VISIBLE * 14}px, ${-VISIBLE * 10}px) rotate(${VISIBLE * 3.5}deg) scale(${1 - VISIBLE * 0.04})`;
        return (
          <figure
            key={it.id}
            aria-hidden={rank !== 0}
            className="absolute inset-0 overflow-hidden rounded-2xl border border-white/10 bg-fmcard shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)] transition-[transform,opacity] duration-700 ease-[cubic-bezier(0.2,0.7,0.2,1)] motion-reduce:transition-none"
            style={{ transform, zIndex: items.length - rank, opacity: shown ? 1 - rank * 0.12 : 0 }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`/photobooth/styles/${it.id}.webp`} alt={rank === 0 ? `${it.label} style` : ""} width={600} height={800} className="h-full w-full object-cover" />
            <figcaption className="absolute inset-x-0 bottom-0 flex items-center gap-2 bg-gradient-to-t from-black/85 via-black/40 to-transparent px-4 pb-4 pt-12">
              <span className="fm-display text-sm text-fmfg">{it.label}</span>
              {it.isNew && <span className="fm-new">New</span>}
            </figcaption>
          </figure>
        );
      })}
    </div>
  );
}
