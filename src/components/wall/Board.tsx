"use client";
import { useEffect, useRef, useState } from "react";
import type { PublicConfig } from "@/lib/wall/config";
import type { Pos, WallPost } from "@/lib/wall/types";
import { Card, CARD_EM } from "./Card";
import type { Strings } from "./strings";

// Le mur : cartes posees librement (positions en 0..1), deplacables au doigt,
// a la souris ou par le capteur. Meme rendu sur l'ecran geant et sur le
// telephone : seule la taille change (la police suit la largeur du mur).

export type BoardProps = {
  posts: WallPost[];
  config: PublicConfig;
  t: Strings;
  asset: (id: string, kind: "strokes" | "photo") => string;
  fresh: string[];
  canMove: (p: WallPost) => boolean;
  onMove: (id: string, pos: Pos, commit: boolean) => void;
  onOpen?: (p: WallPost) => void;
  onLike?: (p: WallPost) => void;
  onComment?: (p: WallPost) => void;
  cardFrac?: number; // largeur d'une carte en part de la largeur du mur
  compact?: boolean;
  highlight?: string | null; // carte visee par le capteur
  grabbed?: string | null; // carte tenue par le capteur
};

export function Board(p: BoardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [w, setW] = useState(0);
  const drag = useRef<{ id: string; dx: number; dy: number; sx: number; sy: number; moved: boolean; pos: Pos } | null>(null);
  const [dragging, setDragging] = useState<string | null>(null);
  const [replayed] = useState(() => new Set<string>());

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setW(el.clientWidth));
    ro.observe(el);
    setW(el.clientWidth);
    return () => ro.disconnect();
  }, []);

  const em = (w * (p.cardFrac ?? 0.13)) / CARD_EM;
  const topZ = p.posts.reduce((m, x) => Math.max(m, x.pos.z), 0);
  const sorted = [...p.posts].sort((a, b) => a.pos.z - b.pos.z);

  const down = (post: WallPost) => (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    const rect = ref.current!.getBoundingClientRect();
    const cx = rect.left + post.pos.x * rect.width, cy = rect.top + post.pos.y * rect.height;
    drag.current = { id: post.id, dx: e.clientX - cx, dy: e.clientY - cy, sx: e.clientX, sy: e.clientY, moved: false, pos: post.pos };
    if (p.canMove(post)) (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };
  const moveEv = (post: WallPost) => (e: React.PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d || d.id !== post.id || !p.canMove(post)) return;
    if (!d.moved && Math.hypot(e.clientX - d.sx, e.clientY - d.sy) < 6) return;
    if (!d.moved) { d.moved = true; setDragging(post.id); }
    const rect = ref.current!.getBoundingClientRect();
    const x = Math.min(0.96, Math.max(0.04, (e.clientX - d.dx - rect.left) / rect.width));
    const y = Math.min(0.94, Math.max(0.06, (e.clientY - d.dy - rect.top) / rect.height));
    d.pos = { x, y, r: post.pos.r, z: topZ + 1 };
    p.onMove(post.id, d.pos, false);
  };
  const up = (post: WallPost) => () => {
    const d = drag.current;
    drag.current = null;
    setDragging(null);
    if (!d || d.id !== post.id) return;
    if (d.moved) p.onMove(post.id, d.pos, true);
    else p.onOpen?.(post);
  };

  return (
    <div ref={ref} className="relative h-full w-full touch-none select-none overflow-hidden" style={{ fontSize: `${em}px` }}>
      {w > 0 && sorted.map((post) => {
        const isFresh = p.fresh.includes(post.id);
        const replay = isFresh && !replayed.has(post.id);
        if (replay) queueMicrotask(() => replayed.add(post.id));
        const held = dragging === post.id || p.grabbed === post.id;
        return (
          <div
            key={post.id}
            data-post-id={post.id}
            data-movable={p.canMove(post) ? "1" : undefined}
            onPointerDown={down(post)}
            onPointerMove={moveEv(post)}
            onPointerUp={up(post)}
            onPointerCancel={up(post)}
            className={`absolute left-0 top-0 ${p.canMove(post) ? "cursor-grab active:cursor-grabbing" : p.onOpen ? "cursor-pointer" : ""} ${held ? "" : "transition-[left,top,transform] duration-700 ease-[cubic-bezier(.2,.7,.2,1)]"}`}
            style={{
              left: `${post.pos.x * 100}%`, top: `${post.pos.y * 100}%`,
              transform: `translate(-50%,-50%) rotate(${held ? 0 : post.pos.r}deg) scale(${held ? 1.08 : p.highlight === post.id ? 1.04 : 1})`,
              zIndex: held ? 2147483000 : Math.max(1, post.pos.z),
            }}
          >
            <div className={`${isFresh ? "fm-wall-arrive" : ""} ${p.highlight === post.id || held ? "rounded-[0.6em] outline outline-[0.18em] outline-offset-[0.25em]" : ""} ${post.mine ? "fm-wall-mine" : ""}`} style={{ outlineColor: p.config.accent }}>
              <Card
                post={post} config={p.config} t={p.t} asset={p.asset} replay={replay} compact={p.compact}
                onLike={p.onLike ? () => p.onLike!(post) : undefined}
                onComment={p.onComment ? () => p.onComment!(post) : undefined}
              />
            </div>
          </div>
        );
      })}
      <style>{`
        .fm-wall-arrive { animation: fmWallArrive 1.1s cubic-bezier(.2,.8,.2,1) both; }
        @keyframes fmWallArrive { 0% { opacity: 0; transform: scale(1.7) translateY(-1em); filter: blur(6px); } 60% { opacity: 1; filter: none; } 100% { transform: none; } }
        .fm-stroke-replay { stroke-dasharray: 1; stroke-dashoffset: 1; animation: fmStroke 0.9s ease-out forwards; }
        @keyframes fmStroke { to { stroke-dashoffset: 0; } }
        @media (prefers-reduced-motion: reduce) { .fm-wall-arrive, .fm-stroke-replay { animation: none; stroke-dashoffset: 0; } }
      `}</style>
    </div>
  );
}
