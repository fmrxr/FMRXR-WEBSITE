"use client";
import { useEffect, useState } from "react";
import type { Stroke } from "@/lib/wall/types";

// Dessin ou signature, rendu en SVG a partir des traits vectoriels. Au premier
// affichage, les traits se redessinent dans l'ordre ou l'invite les a faits.

const cache = new Map<string, Promise<Stroke[] | null>>();

export function fetchStrokes(url: string) {
  if (!cache.has(url)) cache.set(url, fetch(url).then((r) => (r.ok ? r.json() : null)).catch(() => null));
  return cache.get(url)!;
}

export function strokePath(p: number[]) {
  if (p.length === 2) return `M${p[0]} ${p[1]}l0.1 0`;
  let d = `M${p[0]} ${p[1]}`;
  // Courbe lissee par les milieux (quadratiques) : plus douce qu'une polyligne.
  for (let i = 2; i < p.length - 2; i += 2) {
    const mx = (p[i] + p[i + 2]) / 2, my = (p[i + 1] + p[i + 3]) / 2;
    d += `Q${p[i]} ${p[i + 1]} ${mx} ${my}`;
  }
  return d + `L${p[p.length - 2]} ${p[p.length - 1]}`;
}

export function StrokesSvg({ strokes, aspect, replay }: { strokes: Stroke[]; aspect: number; replay?: boolean }) {
  const h = Math.round(1000 / aspect);
  return (
    <svg viewBox={`0 0 1000 ${h}`} className="block h-full w-full" preserveAspectRatio="xMidYMid meet">
      {strokes.map((s, i) => (
        <path
          key={i}
          d={strokePath(s.p.map((v, j) => (j % 2 ? (v * h) / 1000 : v)))}
          fill="none" stroke={s.c} strokeWidth={s.w} strokeLinecap="round" strokeLinejoin="round"
          pathLength={1}
          className={replay ? "fm-stroke-replay" : undefined}
          style={replay ? { animationDelay: `${Math.min(i * 0.18, 3)}s` } : undefined}
        />
      ))}
    </svg>
  );
}

export function RemoteDrawing({ url, aspect, replay }: { url: string; aspect: number; replay?: boolean }) {
  const [strokes, setStrokes] = useState<Stroke[] | null>(null);
  useEffect(() => {
    let live = true;
    void fetchStrokes(url).then((s) => live && setStrokes(s));
    return () => { live = false; };
  }, [url]);
  if (!strokes) return <div className="h-full w-full" />;
  return <StrokesSvg strokes={strokes} aspect={aspect} replay={replay} />;
}
