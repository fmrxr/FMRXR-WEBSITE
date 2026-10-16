"use client";
import { useRef, useState } from "react";
import { Minus, Plus, RotateCw, Trash2 } from "lucide-react";
import type { Sticker } from "@/lib/wall/config";
import type { PlacedSticker } from "@/lib/wall/types";
import type { Strings } from "./strings";

// Option stickers de marque : l'invite pose des stickers sur son message,
// les glisse, les agrandit, les tourne. Positions en 0..1 de la zone.

export function StickerStage({ children, value, onChange, stickers, max, t }: {
  children: React.ReactNode; value: PlacedSticker[]; onChange: (v: PlacedSticker[]) => void;
  stickers: Sticker[]; max: number; t: Strings;
}) {
  const box = useRef<HTMLDivElement>(null);
  const [sel, setSel] = useState<number | null>(null);
  const drag = useRef<{ i: number; dx: number; dy: number } | null>(null);
  const byId = new Map(stickers.map((s) => [s.id, s]));

  const add = (id: string) => {
    if (value.length >= max) return;
    const n = value.length;
    const next = [...value, { id, x: 0.3 + ((n * 0.17) % 0.4), y: 0.3 + ((n * 0.23) % 0.4), s: 0.28, r: ((n % 3) - 1) * 8 }];
    onChange(next);
    setSel(next.length - 1);
  };
  const patch = (i: number, p: Partial<PlacedSticker>) => onChange(value.map((s, j) => (j === i ? { ...s, ...p } : s)));

  const down = (i: number) => (e: React.PointerEvent) => {
    e.stopPropagation();
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    const r = box.current!.getBoundingClientRect();
    drag.current = { i, dx: e.clientX - (r.left + value[i].x * r.width), dy: e.clientY - (r.top + value[i].y * r.height) };
    setSel(i);
  };
  const move = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d) return;
    const r = box.current!.getBoundingClientRect();
    patch(d.i, {
      x: Math.min(1, Math.max(0, (e.clientX - d.dx - r.left) / r.width)),
      y: Math.min(1, Math.max(0, (e.clientY - d.dy - r.top) / r.height)),
    });
  };

  return (
    <div className="flex flex-col gap-3">
      <div ref={box} className="relative touch-none" onPointerDown={() => setSel(null)}>
        {children}
        {value.map((s, i) => {
          const st = byId.get(s.id);
          if (!st) return null;
          return (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={i} src={st.url} alt={st.label} draggable={false}
              onPointerDown={down(i)} onPointerMove={move} onPointerUp={() => (drag.current = null)}
              className={`absolute cursor-grab select-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)] ${sel === i ? "outline-2 outline-dashed outline-fmaccent" : ""}`}
              style={{ left: `${s.x * 100}%`, top: `${s.y * 100}%`, width: `${s.s * 100}%`, transform: `translate(-50%,-50%) rotate(${s.r}deg)` }}
            />
          );
        })}
      </div>
      {sel !== null && value[sel] && (
        <div className="flex flex-wrap gap-2 text-xs">
          <Tool onClick={() => patch(sel, { s: Math.min(0.9, value[sel].s + 0.06) })} icon={<Plus className="h-3.5 w-3.5" />} label={t.bigger} />
          <Tool onClick={() => patch(sel, { s: Math.max(0.1, value[sel].s - 0.06) })} icon={<Minus className="h-3.5 w-3.5" />} label={t.smaller} />
          <Tool onClick={() => patch(sel, { r: ((value[sel].r + 15 + 180) % 360) - 180 })} icon={<RotateCw className="h-3.5 w-3.5" />} label={t.rotate} />
          <Tool onClick={() => { onChange(value.filter((_, j) => j !== sel)); setSel(null); }} icon={<Trash2 className="h-3.5 w-3.5" />} label={t.remove} />
        </div>
      )}
      <div>
        <p className="mb-2 text-xs text-fmmuted">{t.stickers} · {value.length}/{max} · {t.stickersHint}</p>
        <StickerTray stickers={stickers} onPick={add} disabled={value.length >= max} />
      </div>
    </div>
  );
}

export function StickerTray({ stickers, onPick, disabled, selected }: { stickers: Sticker[]; onPick: (id: string) => void; disabled?: boolean; selected?: string | null }) {
  return (
    <div className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
      {stickers.map((s) => (
        <button key={s.id} type="button" disabled={disabled} onClick={() => onPick(s.id)} title={s.label}
          className={`grid h-16 w-16 shrink-0 place-items-center rounded-xl border bg-fmmutedbg p-1.5 transition disabled:opacity-40 ${selected === s.id ? "border-fmaccent" : "border-fmborder"}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={s.url} alt={s.label} className="max-h-full max-w-full object-contain" draggable={false} />
        </button>
      ))}
    </div>
  );
}

function Tool({ onClick, icon, label }: { onClick: () => void; icon: React.ReactNode; label: string }) {
  return (
    <button type="button" onClick={onClick} className="flex items-center gap-1 rounded-full border border-fmborder px-3 py-1.5">
      {icon}{label}
    </button>
  );
}
