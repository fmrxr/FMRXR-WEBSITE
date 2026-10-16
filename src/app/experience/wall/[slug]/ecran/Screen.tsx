"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { Hand as HandIcon, Maximize } from "lucide-react";
import type { PublicConfig } from "@/lib/wall/config";
import type { Pos } from "@/lib/wall/types";
import { Board } from "@/components/wall/Board";
import { Card } from "@/components/wall/Card";
import { useHandSensor } from "@/components/wall/HandSensor";
import { STRINGS } from "@/components/wall/strings";
import { keyQuery, sessionId, useWall } from "@/components/wall/useWall";

// Ecran geant : le mur en direct. Les cartes arrivent des telephones, se
// deplacent au toucher (ecran tactile) ou a la main (option capteur), et
// s'ouvrent en grand avec leurs commentaires.

const FOCUS_MS = 20_000;

export function Screen({ slug, s, initial, qrSvg }: { slug: string; s: string; initial: PublicConfig; qrSvg: string }) {
  const keys = useMemo(() => ({ s }), [s]);
  const [session, setSession] = useState<string | null>(null);
  // localStorage n'existe qu'au navigateur : lu apres le montage.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { setSession(sessionId(`screen-${slug}`)); }, [slug]);
  const { feed, fresh, move, like } = useWall(slug, keys, session);
  const config = feed?.config ?? initial;
  const t = STRINGS[config.defaultLocale];
  const posts = useMemo(() => feed?.posts ?? [], [feed]);
  const asset = (id: string, kind: "strokes" | "photo") => `/api/wall/asset/${id}?slug=${slug}&${keyQuery(keys)}&t=${kind}`;
  const [focus, setFocus] = useState<string | null>(null);
  const focused = posts.find((p) => p.id === focus) ?? null;
  const touch = config.screenInteractive;

  useEffect(() => {
    if (!focus) return;
    const id = window.setTimeout(() => setFocus(null), FOCUS_MS);
    return () => window.clearTimeout(id);
  }, [focus]);

  // --- Capteur : curseurs de main, attraper / lacher ---
  const boardRef = useRef<HTMLDivElement>(null);
  const { hands, status } = useHandSensor(config.sensor === "camera", config.sensorMirror);
  const held = useRef(new Map<number, { post: string; dx: number; dy: number; pos: Pos }>());
  const [hover, setHover] = useState<string | null>(null);
  const [grabbed, setGrabbed] = useState<string | null>(null);

  useEffect(() => {
    const el = boardRef.current;
    if (!el || config.sensor !== "camera") return;
    const rect = el.getBoundingClientRect();
    const topZ = posts.reduce((m, p) => Math.max(m, p.pos.z), 0);
    let hov: string | null = null, grb: string | null = null;
    const under = (h: { x: number; y: number }) => {
      const cx = rect.left + h.x * rect.width, cy = rect.top + h.y * rect.height;
      const hit = document.elementsFromPoint(cx, cy).find((e) => (e as HTMLElement).dataset?.postId) as HTMLElement | undefined;
      return hit?.dataset.postId ?? null;
    };
    for (const h of hands) {
      const g = held.current.get(h.id);
      if (h.grab && !g) {
        const id = under(h);
        const p = posts.find((x) => x.id === id);
        if (p) held.current.set(h.id, { post: p.id, dx: h.x - p.pos.x, dy: h.y - p.pos.y, pos: p.pos });
      } else if (h.grab && g) {
        const pos = { x: clamp(h.x - g.dx, 0.04, 0.96), y: clamp(h.y - g.dy, 0.06, 0.94), r: g.pos.r, z: topZ + 1 };
        g.pos = pos;
        move(g.post, pos, false);
        grb = g.post;
      } else if (!h.grab && g) {
        move(g.post, g.pos, true);
        held.current.delete(h.id);
      }
      if (!h.grab) hov = under(h);
    }
    // Main sortie du champ en tenant une carte : on la pose la ou elle est.
    for (const [id, g] of held.current) {
      if (!hands.some((h) => h.id === id)) { move(g.post, g.pos, true); held.current.delete(id); }
    }
    setHover(hov);
    setGrabbed(grb);
    // posts lu sans dependance : seules les mains declenchent ce calcul.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hands]);

  const newest = fresh.length ? posts.find((p) => p.id === fresh[fresh.length - 1]) : null;

  return (
    <main className="fm fixed inset-0 grid grid-rows-[auto_1fr] overflow-hidden text-fmfg" style={{ background: config.background }}>
      <header className="relative z-20 flex items-center justify-between gap-6 px-[2.5vw] py-[1.8vh]">
        <div className="flex items-center gap-[1.2vw]">
          {config.clientLogoUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={config.clientLogoUrl} alt="" className="h-[5.5vh] rounded-md bg-white object-contain p-1.5" />
          )}
          <div>
            <p className="fm-display text-[3.6vh]">{config.title[config.defaultLocale]}</p>
            <p className="mt-[0.6vh] text-[1.8vh] text-fmmuted">{config.prompt[config.defaultLocale]}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          {config.sensor === "camera" && (
            <span className="flex items-center gap-2 rounded-full border border-fmborder px-3 py-1 text-xs text-fmmuted">
              <HandIcon className="h-3.5 w-3.5" />
              {status === "ready" ? "Poing fermé pour attraper, main ouverte pour lâcher" : status === "failed" ? "Caméra indisponible" : "Caméra…"}
            </span>
          )}
          <button onClick={() => document.documentElement.requestFullscreen?.().catch(() => undefined)} className="rounded-full border border-fmborder p-2 text-fmmuted hover:text-fmfg" aria-label="Plein écran">
            <Maximize className="h-4 w-4" />
          </button>
        </div>
      </header>

      <div ref={boardRef} className="relative min-h-0">
        <Board
          posts={posts} config={config} t={t} asset={asset} fresh={fresh} cardFrac={0.12}
          canMove={() => touch} onMove={move}
          onOpen={touch ? (p) => setFocus(p.id) : undefined}
          onLike={touch && config.likes ? (p) => void like(p.id) : undefined}
          onComment={touch ? (p) => setFocus(p.id) : undefined}
          highlight={hover} grabbed={grabbed}
        />
        {posts.length === 0 && <p className="fm-display absolute inset-0 grid place-items-center text-[5vh] text-fmfg/70">{t.empty}</p>}

        {/* Curseurs du capteur */}
        {hands.map((h) => (
          <span key={h.id} className="pointer-events-none absolute z-[2147483600] -translate-x-1/2 -translate-y-1/2 rounded-full border-[0.35vh] transition-[width,height] duration-150"
            style={{ left: `${h.x * 100}%`, top: `${h.y * 100}%`, width: h.grab ? "3vh" : "5.5vh", height: h.grab ? "3vh" : "5.5vh", borderColor: config.accent, background: h.grab ? config.accent : "transparent", boxShadow: `0 0 3vh ${config.accent}` }} />
        ))}

        {/* QR permanent */}
        <div className="absolute bottom-[2.5vh] right-[2vw] z-[2147483500] flex items-center gap-[1vw] rounded-2xl bg-white p-[1vh] pr-[1.4vw] text-[#111]">
          <div className="h-[15vh] w-[15vh]" dangerouslySetInnerHTML={{ __html: qrSvg }} />
          <div className="max-w-[12vw]">
            <p className="text-[2vh] font-bold leading-tight">{t.scan}</p>
            <p className="mt-[0.6vh] fm-display text-[1.5vh] text-[#111]/60" dir="ltr">FMRXR<span style={{ color: "#3aa63a" }}>{"//"}</span> Live Wall</p>
          </div>
        </div>

        {newest && newest.author && (
          <div key={newest.id} className="fm-wall-toast pointer-events-none absolute bottom-[3vh] left-1/2 z-[2147483500] -translate-x-1/2 rounded-full px-[1.6vw] py-[1vh] text-[2vh] font-semibold text-black" style={{ background: config.accent }}>
            {newest.author} · {t.kinds[newest.kind]}
          </div>
        )}
      </div>

      {focused && (
        <div className="fixed inset-0 z-[2147483647] grid place-items-center bg-black/75 backdrop-blur-sm" onClick={() => setFocus(null)}>
          <div onClick={(e) => e.stopPropagation()} style={{ fontSize: "min(3.4vh, 2.2vw)" }}>
            <Card post={focused} config={config} t={t} asset={asset} onLike={config.likes ? () => void like(focused.id) : undefined} />
          </div>
        </div>
      )}
      <style>{`.fm-wall-toast { animation: fmToast 5s ease both; }
        @keyframes fmToast { 0% { opacity: 0; transform: translate(-50%, 1em); } 10%, 85% { opacity: 1; transform: translate(-50%, 0); } 100% { opacity: 0; } }`}</style>
    </main>
  );
}

const clamp = (n: number, a: number, b: number) => Math.min(b, Math.max(a, n));
