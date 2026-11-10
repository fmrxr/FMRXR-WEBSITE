"use client";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { PublicConfig } from "@/lib/wall/config";
import type { Pos, WallPost } from "@/lib/wall/types";
import { Card, CARD_EM } from "./Card";
import { S_MAX, S_MIN } from "@/lib/wall/shapes";
import type { Strings } from "./strings";

// Le mur : cartes posees librement (positions en 0..1), deplacables au doigt,
// a la souris ou par le capteur. Meme rendu sur l'ecran geant et sur le
// telephone : seule la taille change (la police suit la largeur du mur).
//
// Trois gestes, un par main :
//   glisser une carte        -> elle se deplace, sa taille ne bouge pas ;
//   tirer son coin (poignee) -> elle grandit ou retrecit, elle seule.
//                               C'est LE geste souris, et il marche aussi
//                               au doigt quand la carte est trop petite
//                               pour y poser deux doigts ;
//   pincer                   -> sur une carte (un doigt dessus suffit),
//                               elle seule change ; sur le fond, tout le mur.
// Ctrl / ⌘ + molette reste en plus, c'est la forme du pincement de trackpad.

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

type Pt = { x: number; y: number; post: string | null };
type Gesture =
  | { kind: "drag"; id: string; pointer: number; dx: number; dy: number; sx: number; sy: number; moved: boolean; pos: Pos }
  | { kind: "corner"; id: string; pointer: number; cx: number; cy: number; d0: number; s0: number; pos: Pos }
  | { kind: "pinch"; id: string | null; d0: number; s0: number; frac0: number; pos: Pos | null };

export function Board(p: BoardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [w, setW] = useState(0);
  // La carte qu'on tient : pas de transition sur elle, sinon elle suit le
  // doigt avec 700 ms de retard et le geste parait casse.
  const [held, setHeld] = useState<string | null>(null);
  // Derniere carte touchee : sa poignee reste visible au doigt (pas de survol).
  const [picked, setPicked] = useState<string | null>(null);
  const g = useRef<Gesture | null>(null);
  const pointers = useRef(new Map<number, Pt>());
  const wheel = useRef<{ id: string; pos: Pos; timer: number } | null>(null);

  // Les gestionnaires natifs (molette) lisent toujours l'etat courant.
  const live = useRef(p);
  useLayoutEffect(() => { live.current = p; });

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
  const find = (id: string | null) => (id ? live.current.posts.find((x) => x.id === id) ?? null : null);
  const movable = (id: string | null) => { const post = find(id); return post && live.current.canMove(post) ? post : null; };
  const postAt = (t: EventTarget | null) => ((t as HTMLElement | null)?.closest?.("[data-post-id]") as HTMLElement | null)?.dataset.postId ?? null;
  const span = () => {
    const [a, b] = [...pointers.current.values()];
    return a && b ? Math.hypot(a.x - b.x, a.y - b.y) : 0;
  };
  const capture = (e: React.PointerEvent) => {
    // Refusee si le doigt est deja releve : on continue sans capture.
    try { ref.current?.setPointerCapture(e.pointerId); } catch { /* sans capture */ }
  };

  // Tout passe par le mur, pas par chaque carte : un seul endroit decide
  // quel geste est en cours, donc deux gestes ne se battent jamais.
  const onDown = (e: React.PointerEvent) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    const target = e.target as HTMLElement;
    if (target.closest("button")) return; // like, commentaire : un clic, pas un geste
    const id = postAt(target);
    // Une molette encore en attente d'enregistrement est enregistree tout
    // de suite : sinon elle partirait apres le nouveau geste et l'ecraserait.
    const w = wheel.current;
    if (w) { window.clearTimeout(w.timer); wheel.current = null; p.onMove(w.id, w.pos, true); }
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY, post: id });
    capture(e);

    // Deuxieme doigt : pincement. La carte est celle sous l'un des deux
    // doigts (le premier d'abord). Exiger les deux doigts sur la meme
    // carte la rendait impossible a pincer des qu'elle est petite.
    if (pointers.current.size === 2) {
      const [a, b] = [...pointers.current.values()];
      const post = movable(a.post) ?? movable(b.post);
      if (post) g.current = { kind: "pinch", id: post.id, d0: span(), s0: post.pos.s ?? 1, frac0: 0, pos: null };
      else if (p.onCardFrac) g.current = { kind: "pinch", id: null, d0: span(), s0: 0, frac0: p.cardFrac ?? 0.13, pos: null };
      else g.current = null;
      setHeld(post?.id ?? null);
      return;
    }
    if (pointers.current.size > 2) return;

    setPicked(id);
    const post = movable(id);
    if (!post) { g.current = id ? { kind: "drag", id, pointer: e.pointerId, dx: 0, dy: 0, sx: e.clientX, sy: e.clientY, moved: false, pos: find(id)!.pos } : null; return; }

    const cardEl = target.closest("[data-post-id]") as HTMLElement;
    if (target.closest("[data-corner]")) {
      // Poignee : on mesure depuis le centre de la carte, donc tirer le
      // coin vers l'exterieur agrandit, vers le centre reduit, dans le
      // rapport exact du geste, quelle que soit la rotation.
      const r = cardEl.getBoundingClientRect();
      const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
      g.current = { kind: "corner", id: post.id, pointer: e.pointerId, cx, cy, d0: Math.max(8, Math.hypot(e.clientX - cx, e.clientY - cy)), s0: post.pos.s ?? 1, pos: post.pos };
      setHeld(post.id);
      e.preventDefault();
      return;
    }
    const rect = ref.current!.getBoundingClientRect();
    const cx = rect.left + post.pos.x * rect.width, cy = rect.top + post.pos.y * rect.height;
    g.current = { kind: "drag", id: post.id, pointer: e.pointerId, dx: e.clientX - cx, dy: e.clientY - cy, sx: e.clientX, sy: e.clientY, moved: false, pos: post.pos };
  };

  const onMoveEv = (e: React.PointerEvent) => {
    const pt = pointers.current.get(e.pointerId);
    if (!pt) return;
    pt.x = e.clientX; pt.y = e.clientY;
    const z = g.current;
    if (!z) return;

    if (z.kind === "pinch") {
      if (pointers.current.size < 2 || !z.d0) return;
      const ratio = span() / z.d0;
      if (!ratio) return;
      if (z.id) {
        const post = find(z.id);
        if (!post) return;
        z.pos = { ...post.pos, s: clampS(z.s0 * ratio), z: topZ + 1 };
        p.onMove(z.id, z.pos, false);
      } else {
        p.onCardFrac?.(clampFrac(z.frac0 * ratio));
      }
      return;
    }
    if (z.pointer !== e.pointerId) return;

    if (z.kind === "corner") {
      // Le rapport part toujours de la taille et de la distance du debut
      // du geste : revenir au point de depart rend la taille de depart.
      const d = Math.hypot(e.clientX - z.cx, e.clientY - z.cy);
      z.pos = { ...z.pos, s: clampS(z.s0 * (d / z.d0)), z: topZ + 1 };
      p.onMove(z.id, z.pos, false);
      return;
    }

    // drag
    if (!movable(z.id)) return;
    if (!z.moved && Math.hypot(e.clientX - z.sx, e.clientY - z.sy) < 6) return;
    if (!z.moved) { z.moved = true; setHeld(z.id); }
    const rect = ref.current!.getBoundingClientRect();
    const x = Math.min(0.96, Math.max(0.04, (e.clientX - z.dx - rect.left) / rect.width));
    const y = Math.min(0.94, Math.max(0.06, (e.clientY - z.dy - rect.top) / rect.height));
    // On garde la taille : un deplacement ne doit jamais ramener la carte
    // a sa taille d'origine.
    z.pos = { ...z.pos, x, y, z: topZ + 1 };
    p.onMove(z.id, z.pos, false);
  };

  const onUp = (e: React.PointerEvent) => {
    if (!pointers.current.has(e.pointerId)) return;
    pointers.current.delete(e.pointerId);
    const z = g.current;
    if (!z) return;
    if (z.kind === "pinch") {
      if (pointers.current.size >= 2) return;
      // Le doigt restant ne reprend pas un glissement : on attend qu'il se leve.
      g.current = null;
      setHeld(null);
      if (z.id && z.pos) p.onMove(z.id, z.pos, true);
      return;
    }
    if (z.pointer !== e.pointerId) return;
    g.current = null;
    setHeld(null);
    if (z.kind === "corner") { p.onMove(z.id, z.pos, true); return; }
    if (z.moved) p.onMove(z.id, z.pos, true);
    else if (e.type === "pointerup") { const post = find(z.id); if (post) p.onOpen?.(post); }
  };

  // Ctrl (ou ⌘) + molette, et le pincement du trackpad qui arrive sous
  // cette forme. Ecouteur natif non passif : celui de React est passif,
  // preventDefault y est ignore et le navigateur zoomait toute la page.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      if (!e.ctrlKey && !e.metaKey) return;
      e.preventDefault();
      const P = live.current;
      const by = Math.exp(-e.deltaY / 500);
      const post = movable(postAt(e.target));
      if (post) {
        // La taille se cumule ici, pas dans l'etat React : les evenements
        // arrivent plus vite que l'affichage et liraient tous la meme valeur.
        const prev = wheel.current?.id === post.id ? wheel.current : null;
        if (prev) window.clearTimeout(prev.timer);
        const base = prev?.pos ?? post.pos;
        const pos = { ...base, s: clampS((base.s ?? 1) * by), z: base.z };
        P.onMove(post.id, pos, false);
        // Un seul enregistrement, a la fin du geste.
        const timer = window.setTimeout(() => { live.current.onMove(post.id, pos, true); wheel.current = null; }, 350);
        wheel.current = { id: post.id, pos, timer };
      } else {
        P.onCardFrac?.(clampFrac((P.cardFrac ?? 0.13) * by));
      }
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sorted = [...p.posts].sort((a, b) => a.pos.z - b.pos.z);

  return (
    <div ref={ref} onPointerDown={onDown} onPointerMove={onMoveEv} onPointerUp={onUp} onPointerCancel={onUp}
      className="relative h-full w-full touch-none select-none overflow-hidden" style={{ fontSize: `${em}px` }}>
      {w > 0 && sorted.map((post) => {
        const isFresh = p.fresh.includes(post.id);
        const holding = held === post.id || p.grabbed === post.id;
        const can = p.canMove(post);
        const s = post.pos.s ?? 1;
        return (
          <div
            key={post.id}
            data-post-id={post.id}
            data-movable={can ? "1" : undefined}
            className={`group absolute left-0 top-0 ${can ? "cursor-grab active:cursor-grabbing" : p.onOpen ? "cursor-pointer" : ""} ${holding ? "" : "transition-[left,top,transform] duration-700 ease-[cubic-bezier(.2,.7,.2,1)]"}`}
            style={{
              left: `${post.pos.x * 100}%`, top: `${post.pos.y * 100}%`,
              transform: `translate(-50%,-50%) rotate(${holding ? 0 : post.pos.r}deg) scale(${s * (holding ? 1.04 : p.highlight === post.id ? 1.04 : 1)})`,
              zIndex: holding ? 2147483000 : Math.max(1, post.pos.z),
            }}
          >
            <div className={`${isFresh ? "fm-wall-arrive" : ""} ${p.highlight === post.id || holding ? "rounded-[0.6em] outline outline-[0.18em] outline-offset-[0.25em]" : ""} ${post.mine ? "fm-wall-mine" : ""}`} style={{ outlineColor: p.config.accent }}>
              <Card
                post={post} config={p.config} t={p.t} asset={p.asset} replay={isFresh} compact={p.compact}
                onLike={p.onLike ? () => p.onLike!(post) : undefined}
                onComment={p.onComment ? () => p.onComment!(post) : undefined}
              />
            </div>
            {can && (
              // Poignee de coin. Sa taille compense l'echelle de la carte :
              // elle reste attrapable sur une carte reduite de moitie.
              <span
                data-corner
                aria-label={p.t.bigger}
                className={`absolute bottom-0 right-0 z-10 grid translate-x-1/2 translate-y-1/2 cursor-nwse-resize place-items-center rounded-full border-2 border-white shadow-[0_0.1em_0.4em_rgba(0,0,0,0.5)] transition-opacity ${holding || picked === post.id ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
                style={{ width: `${2.2 / s}em`, height: `${2.2 / s}em`, background: p.config.accent, touchAction: "none" }}
              >
                <svg viewBox="0 0 10 10" className="h-1/2 w-1/2" fill="none" stroke="#111" strokeWidth="1.4" strokeLinecap="round">
                  <path d="M3 7 7 3M5.5 7.5 7.5 5.5M1.5 6.5 6.5 1.5" />
                </svg>
              </span>
            )}
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
