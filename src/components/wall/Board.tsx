"use client";
import { useEffect, useRef, useState } from "react";
import type { PublicConfig } from "@/lib/wall/config";
import type { Pos, WallPost } from "@/lib/wall/types";
import { Card, CARD_EM } from "./Card";
import { S_MAX, S_MIN } from "@/lib/wall/shapes";
import type { Strings } from "./strings";

// Le mur : cartes posees librement (positions en 0..1), deplacables au doigt,
// a la souris ou par le capteur. Meme rendu sur l'ecran geant et sur le
// telephone : seule la taille change (la police suit la largeur du mur).

// Le zoom d'ensemble du mur, entre 6 % et 26 % de sa largeur : plus
// petit on ne lit plus rien a dix metres, plus grand une carte mange
// l'ecran. La taille d'une carte vient en plus, par dessus celle-ci.
export const FRAC_MIN = 0.06, FRAC_MAX = 0.26;
export const clampFrac = (v: number) => Math.min(FRAC_MAX, Math.max(FRAC_MIN, v));
const clampS = (v: number) => Math.min(S_MAX, Math.max(S_MIN, Math.round(v * 1000) / 1000));

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
  onCardFrac?: (v: number) => void; // pincer le fond du mur pour la changer
  compact?: boolean;
  highlight?: string | null; // carte visee par le capteur
  grabbed?: string | null; // carte tenue par le capteur
};

export function Board(p: BoardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [w, setW] = useState(0);
  const drag = useRef<{ id: string; dx: number; dy: number; sx: number; sy: number; moved: boolean; pos: Pos } | null>(null);
  const [dragging, setDragging] = useState<string | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setW(el.clientWidth));
    ro.observe(el);
    setW(el.clientWidth);
    return () => ro.disconnect();
  }, []);

  const em = (w * (p.cardFrac ?? 0.13)) / CARD_EM;

  // Deux doigts, deux gestes, separes par ce qu'ils touchent :
  //   sur une carte  -> cette carte grandit ou retrecit, elle seule ;
  //   sur le fond    -> toutes les cartes changent de taille ensemble.
  // Chaque carte est un objet qu'on manipule, et le mur garde quand meme
  // un reglage d'ensemble pour l'ecran de la salle.
  const pointers = useRef(new Map<number, { x: number; y: number; post: string | null }>());
  const pinch = useRef<{ d0: number; post: string | null; s0: number; frac0: number; pos: Pos | null } | null>(null);
  const two = () => [...pointers.current.values()].slice(0, 2);
  const span = () => {
    const [a, b] = two();
    return a && b ? Math.hypot(a.x - b.x, a.y - b.y) : 0;
  };

  const boardDown = (e: React.PointerEvent) => {
    const el = (e.target as HTMLElement).closest?.("[data-post-id]") as HTMLElement | null;
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY, post: el?.dataset.postId ?? null });
    if (pointers.current.size !== 2) return;
    // Un pincement n'est jamais un deplacement : on coupe le glissement
    // en cours, sinon la carte part en voyage pendant le geste.
    drag.current = null;
    setDragging(null);
    const [a, b] = two();
    const same = a.post && a.post === b.post ? a.post : null;
    const post = same ? p.posts.find((x) => x.id === same) : null;
    if (post && p.canMove(post)) {
      pinch.current = { d0: span(), post: post.id, s0: post.pos.s ?? 1, frac0: 0, pos: null };
    } else if (p.onCardFrac) {
      pinch.current = { d0: span(), post: null, s0: 0, frac0: p.cardFrac ?? 0.13, pos: null };
    }
  };

  const boardMove = (e: React.PointerEvent) => {
    const pt = pointers.current.get(e.pointerId);
    if (!pt) return;
    pt.x = e.clientX; pt.y = e.clientY;
    const z = pinch.current;
    if (!z || pointers.current.size < 2 || !z.d0) return;
    const ratio = span() / z.d0;
    if (!ratio) return;
    if (z.post) {
      const post = p.posts.find((x) => x.id === z.post);
      if (!post) return;
      z.pos = { ...post.pos, s: clampS(z.s0 * ratio), z: topZ + 1 };
      p.onMove(post.id, z.pos, false);
    } else {
      p.onCardFrac?.(clampFrac(z.frac0 * ratio));
    }
  };

  // A la souris et au trackpad : Ctrl (ou ⌘) + molette. C'est le geste de
  // zoom partout ailleurs, et un pincement de trackpad arrive justement
  // au navigateur sous cette forme. Sur une carte elle seule change, sur
  // le fond c'est tout le mur, comme avec deux doigts.
  const commit = useRef<number | null>(null);
  const onWheel = (e: React.WheelEvent) => {
    if (!e.ctrlKey && !e.metaKey) return;
    e.preventDefault();
    const by = Math.exp(-e.deltaY / 400);
    const el = (e.target as HTMLElement).closest?.("[data-post-id]") as HTMLElement | null;
    const post = el ? p.posts.find((x) => x.id === el.dataset.postId) : null;
    if (post && p.canMove(post)) {
      const pos = { ...post.pos, s: clampS((post.pos.s ?? 1) * by), z: topZ + 1 };
      p.onMove(post.id, pos, false);
      // La molette tire des dizaines d'evenements : on n'enregistre
      // qu'une fois le geste fini, sinon le serveur reçoit tout le trajet.
      if (commit.current) window.clearTimeout(commit.current);
      commit.current = window.setTimeout(() => p.onMove(post.id, pos, true), 400);
    } else {
      p.onCardFrac?.(clampFrac((p.cardFrac ?? 0.13) * by));
    }
  };

  const boardUp = (e: React.PointerEvent) => {
    pointers.current.delete(e.pointerId);
    if (pointers.current.size >= 2) return;
    const z = pinch.current;
    pinch.current = null;
    if (z?.post && z.pos) p.onMove(z.post, z.pos, true);
  };
  const topZ = p.posts.reduce((m, x) => Math.max(m, x.pos.z), 0);
  const sorted = [...p.posts].sort((a, b) => a.pos.z - b.pos.z);

  const down = (post: WallPost) => (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0 || pointers.current.size > 1) return;
    const rect = ref.current!.getBoundingClientRect();
    const cx = rect.left + post.pos.x * rect.width, cy = rect.top + post.pos.y * rect.height;
    drag.current = { id: post.id, dx: e.clientX - cx, dy: e.clientY - cy, sx: e.clientX, sy: e.clientY, moved: false, pos: post.pos };
    // La capture peut etre refusee si le doigt a deja ete releve entre
    // les deux evenements. Ce n'est pas une raison pour casser le
    // deplacement : on continue sans capture.
    if (p.canMove(post)) {
      try { (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId); } catch { /* sans capture */ }
    }
  };
  const moveEv = (post: WallPost) => (e: React.PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d || d.id !== post.id || !p.canMove(post) || pinch.current) return;
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
    <div ref={ref} onPointerDown={boardDown} onPointerMove={boardMove} onPointerUp={boardUp} onPointerCancel={boardUp} onWheel={onWheel}
      className="relative h-full w-full touch-none select-none overflow-hidden" style={{ fontSize: `${em}px` }}>
      {w > 0 && sorted.map((post) => {
        const isFresh = p.fresh.includes(post.id);
        const replay = isFresh;
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
              transform: `translate(-50%,-50%) rotate(${held ? 0 : post.pos.r}deg) scale(${(post.pos.s ?? 1) * (held ? 1.08 : p.highlight === post.id ? 1.04 : 1)})`,
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
