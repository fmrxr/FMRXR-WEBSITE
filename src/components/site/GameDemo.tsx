"use client";
import { useState } from "react";
import { Play } from "lucide-react";

// Jeu au sol jouable dans la page, a la souris. Charge seulement au clic : un
// jeu WebGL plein ecran ne demarre pas a l'ouverture de la page.

export function GameDemo({ src, poster, label }: { src: string; poster: string; label: string }) {
  const [on, setOn] = useState(false);
  return (
    <div className="relative aspect-square w-full overflow-hidden rounded-xl border border-fmborder bg-black">
      {on ? (
        <iframe src={src} title={label} className="absolute inset-0 h-full w-full" allow="autoplay; fullscreen" />
      ) : (
        <button type="button" onClick={() => setOn(true)} className="group absolute inset-0" aria-label={`Play the ${label} demo`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={poster} alt="" className="absolute inset-0 h-full w-full object-cover opacity-80 transition group-hover:opacity-100" />
          <span className="absolute inset-0 grid place-items-center">
            <span className="flex items-center gap-2 rounded-full bg-fmfg px-5 py-3 text-sm font-semibold text-fmbg shadow-lg">
              <Play className="h-4 w-4" /> Play the demo
            </span>
          </span>
          <span className="absolute inset-x-0 bottom-0 bg-black/70 px-3 py-2 text-[12px] text-fmfg/80">Click or tap to step, as on the floor</span>
        </button>
      )}
    </div>
  );
}
