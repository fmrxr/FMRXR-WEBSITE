"use client";
import { useEffect, useRef, useState } from "react";
import { Eraser, Undo2 } from "lucide-react";
import type { Stroke } from "@/lib/wall/types";
import type { Strings } from "./strings";

// Pad de dessin et de signature au doigt. Les traits sont gardes en vecteurs
// (0..1000 sur chaque axe) : legers a envoyer, nets sur l'ecran geant, et
// rejouables trait par trait a l'arrivee sur le mur.

const INKS = ["#1b1a22", "#e64f6a", "#ff9f1c", "#2ec4b6", "#3a86ff", "#8338ec", "#7bef7b"];
const SIZES = [8, 16, 30];
const MAX_POINTS = 3800;

export function DrawPad({ aspect, signature, t, value, onChange }: {
  aspect: number; signature?: boolean; t: Strings; value: Stroke[]; onChange: (s: Stroke[]) => void;
}) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const current = useRef<Stroke | null>(null);
  const [ink, setInk] = useState(INKS[0]);
  const [size, setSize] = useState(signature ? 10 : SIZES[1]);
  const total = value.reduce((n, s) => n + s.p.length / 2, 0);

  // Redessine tout (canvas a la taille reelle de l'affichage, net en Retina).
  const paint = (list: Stroke[]) => {
    const c = canvas.current;
    if (!c) return;
    const dpr = window.devicePixelRatio || 1;
    const W = c.clientWidth, H = c.clientHeight;
    if (c.width !== Math.round(W * dpr)) { c.width = Math.round(W * dpr); c.height = Math.round(H * dpr); }
    const g = c.getContext("2d")!;
    g.setTransform(dpr, 0, 0, dpr, 0, 0);
    g.clearRect(0, 0, W, H);
    g.lineCap = "round"; g.lineJoin = "round";
    for (const s of list) {
      g.strokeStyle = s.c;
      g.lineWidth = (s.w / 1000) * W;
      g.beginPath();
      for (let i = 0; i < s.p.length; i += 2) {
        const x = (s.p[i] / 1000) * W, y = (s.p[i + 1] / 1000) * H;
        if (i === 0) g.moveTo(x, y); else g.lineTo(x, y);
      }
      if (s.p.length === 2) g.lineTo((s.p[0] / 1000) * W + 0.1, (s.p[1] / 1000) * H);
      g.stroke();
    }
  };

  useEffect(() => { paint(value); }, [value]);
  useEffect(() => {
    const ro = new ResizeObserver(() => paint(current.current ? [...value, current.current] : value));
    if (canvas.current) ro.observe(canvas.current);
    return () => ro.disconnect();
  });

  const point = (e: React.PointerEvent) => {
    const r = canvas.current!.getBoundingClientRect();
    return [Math.round(((e.clientX - r.left) / r.width) * 1000), Math.round(((e.clientY - r.top) / r.height) * 1000)];
  };

  const down = (e: React.PointerEvent) => {
    if (total >= MAX_POINTS) return;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    current.current = { c: signature ? "#1b1a22" : ink, w: size, p: point(e) };
    paint([...value, current.current]);
  };
  const move = (e: React.PointerEvent) => {
    const s = current.current;
    if (!s || total + s.p.length / 2 >= MAX_POINTS) return;
    const [x, y] = point(e);
    const lx = s.p[s.p.length - 2], ly = s.p[s.p.length - 1];
    if (Math.hypot(x - lx, y - ly) < 4) return; // trop proche : on n'alourdit pas le trait
    s.p.push(x, y);
    paint([...value, s]);
  };
  const up = () => {
    if (!current.current) return;
    onChange([...value, current.current]);
    current.current = null;
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="relative overflow-hidden rounded-2xl shadow-inner" style={{ aspectRatio: `${aspect}`, background: signature ? "#fbf7ee" : "#ffffff" }}>
        <canvas ref={canvas} className="absolute inset-0 h-full w-full touch-none" onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={up} />
        {value.length === 0 && (
          <p className="pointer-events-none absolute inset-0 grid place-items-center text-sm text-[#1b1a22]/35">{signature ? t.signHere : t.drawHere}</p>
        )}
        {signature && <div className="pointer-events-none absolute inset-x-6 bottom-[22%] border-b border-[#1b1a22]/25" />}
      </div>
      <div className="flex flex-wrap items-center gap-2">
        {!signature && INKS.map((c) => (
          <button key={c} type="button" onClick={() => setInk(c)} aria-label={c}
            className={`h-8 w-8 rounded-full border-2 ${ink === c ? "border-fmfg scale-110" : "border-transparent"}`} style={{ background: c }} />
        ))}
        {!signature && (
          <div className="flex items-center gap-1 rounded-full bg-fmmutedbg px-2 py-1">
            {SIZES.map((s) => (
              <button key={s} type="button" onClick={() => setSize(s)} className={`grid h-7 w-7 place-items-center rounded-full ${size === s ? "bg-fmfg/15" : ""}`} aria-label={`${s}`}>
                <span className="rounded-full bg-fmfg" style={{ width: 4 + s / 3, height: 4 + s / 3 }} />
              </button>
            ))}
          </div>
        )}
        <div className="ml-auto flex gap-2">
          <button type="button" onClick={() => onChange(value.slice(0, -1))} disabled={!value.length} className="flex items-center gap-1 rounded-full border border-fmborder px-3 py-1.5 text-xs disabled:opacity-40">
            <Undo2 className="h-3.5 w-3.5" />{t.undo}
          </button>
          <button type="button" onClick={() => onChange([])} disabled={!value.length} className="flex items-center gap-1 rounded-full border border-fmborder px-3 py-1.5 text-xs disabled:opacity-40">
            <Eraser className="h-3.5 w-3.5" />{t.clear}
          </button>
        </div>
      </div>
    </div>
  );
}
