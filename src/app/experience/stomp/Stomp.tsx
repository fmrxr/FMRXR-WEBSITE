"use client";
import { useEffect, useRef, useState } from "react";
import { DEFAULT_STOMP, StompGame, frost as frostAt, progress, type HitEvent, type Target } from "@/lib/stomp/game";
import { StompEngine } from "@/components/stomp/engine";
import { StompAudio } from "@/components/stomp/audio";
import { attachInput } from "@/components/stomp/input";

// STOMP : le chef d'orchestre. Phases :
//   attract  : verre clair, la ville neon en dessous ; une plaque « marche ici »
//   freeze   : le verre givre en 1,2 s puis compte a rebours 3-2-1
//   play     : la manche ; le verre se degivre a mesure que le jeu accelere
//   reveal   : le verre devient totalement clair, le vide s'ouvre (moment fort)
//   results  : score et record du jour, lisibles des deux cotes du sol
// Le verre n'est un abime qu'aux moments forts : pendant le jeu il reste
// lisible comme une surface (rapport STOMP, inconfort des sols en trompe-l'oeil).

type Phase = "attract" | "freeze" | "play" | "reveal" | "results";

export type StompSettings = { size: number; seconds: number; logo: string; ws: string | null; px: number | null; ox: number | null; oy: number | null; debug: boolean };

const START_ID = -1;
const START_RADIUS = 0.45;
const FREEZE_S = 1.2, COUNT_S = 3, REVEAL_S = 2.2, RESULTS_S = 14;

type Popup = { id: number; x: number; z: number; text: string; tone: "brand" | "gold" | "hazard" | "combo"; at: number };

function bestKey() { return `fmrxr-stomp-best-${new Date().toISOString().slice(0, 10)}`; }
function readBest() { try { return Number(localStorage.getItem(bestKey()) ?? 0) || 0; } catch { return 0; } }
function writeBest(n: number) { try { localStorage.setItem(bestKey(), String(n)); } catch { /* prive */ } }

export function Stomp({ s }: { s: StompSettings }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<Phase>("attract");
  const [hud, setHud] = useState({ score: 0, time: s.seconds, mult: 1, combo: 0 });
  const [count, setCount] = useState(0);
  const [popups, setPopups] = useState<Popup[]>([]);
  const [result, setResult] = useState<{ score: number; hits: number; accuracy: number; bestCombo: number; best: number; record: boolean } | null>(null);
  const [box, setBox] = useState({ size: 600, left: 0, top: 0 });
  const [fps, setFps] = useState(0);
  const phaseRef = useRef<Phase>("attract");
  const engineRef = useRef<StompEngine | null>(null);
  const setP = (p: Phase) => { phaseRef.current = p; setPhase(p); };

  // Carre de rendu : cale sur la zone de pixels du sol LED (?px, ?ox, ?oy), sinon centre.
  useEffect(() => {
    const fit = () => {
      const size = s.px ?? Math.min(window.innerWidth, window.innerHeight);
      setBox({ size, left: s.ox ?? (window.innerWidth - size) / 2, top: s.oy ?? (window.innerHeight - size) / 2 });
    };
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, [s.px, s.ox, s.oy]);

  useEffect(() => {
    const canvas = canvasRef.current!, el = boxRef.current!;
    const engine = new StompEngine(canvas, { size: s.size, logoUrl: s.logo });
    engineRef.current = engine;
    const audio = new StompAudio();
    engine.resize(canvas.clientWidth || 600);
    let game: StompGame | null = null;
    let phaseAt = performance.now() / 1000;
    let lastCount = -1;
    let popupId = 0;
    const startTarget: Target = { id: START_ID, kind: "brand", x: 0, z: 0, bornAt: 0, life: 1e9, state: "live", endAt: null };
    engine.frost = 0;

    const go = (p: Phase) => { setP(p); phaseAt = performance.now() / 1000; };
    const pop = (p: Omit<Popup, "id" | "at">) => {
      const id = ++popupId;
      setPopups((list) => [...list.slice(-10), { ...p, id, at: Date.now() }]);
      window.setTimeout(() => setPopups((list) => list.filter((x) => x.id !== id)), 900);
    };

    const onHits = (events: HitEvent[]) => {
      for (const e of events) {
        engine.impact(e.target.x, e.target.z, e.target.kind);
        if (e.target.kind === "hazard") audio.hazard();
        else if (e.target.kind === "gold") audio.gold();
        else audio.hit(e.combo);
        pop({ x: e.target.x, z: e.target.z, text: `${e.points > 0 ? "+" : ""}${e.points}`, tone: e.target.kind });
        if (e.target.kind !== "hazard" && e.combo > 0 && e.combo % 4 === 0) pop({ x: e.target.x, z: e.target.z - 0.45, text: `×${game!.multiplier}`, tone: "combo" });
      }
    };

    const detach = attachInput(el, s.size, {
      onStomp: (pts) => {
        audio.unlock();
        const ph = phaseRef.current;
        if (ph === "attract" && pts.some((p) => Math.hypot(p.x, p.z) <= START_RADIUS + 0.1)) {
          engine.impact(0, 0, "brand");
          audio.freeze();
          go("freeze");
          return;
        }
        if (ph === "play" && game) onHits(game.stomp(pts));
      },
      onPresence: (pts) => engine.lookFrom(pts),
    }, s.ws);

    // Mode debug : etat lisible depuis la console (tests automatises, reglage sur site).
    if (s.debug) (window as unknown as { __stomp?: unknown }).__stomp = { phase: () => phaseRef.current, game: () => game };

    let raf = 0;
    let last = performance.now();
    let frames = 0, fpsAt = last;
    const loop = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      frames++;
      if (now - fpsAt > 1000) { setFps(frames); frames = 0; fpsAt = now; }
      const t = now / 1000 - phaseAt;
      const ph = phaseRef.current;

      if (ph === "attract") {
        engine.frost += (0 - engine.frost) * 0.05;
        startTarget.bornAt = -10;
        engine.syncTargets([startTarget], now / 1000, 0.55, START_RADIUS);
      } else if (ph === "freeze") {
        // Le verre givre d'abord, puis 3-2-1.
        engine.frost = Math.min(DEFAULT_STOMP.frostStart, (t / FREEZE_S) * DEFAULT_STOMP.frostStart);
        engine.syncTargets([], now / 1000, 0.55, START_RADIUS);
        const c = Math.ceil(COUNT_S - (t - FREEZE_S));
        if (t > FREEZE_S && c !== lastCount && c > 0) { lastCount = c; setCount(c); audio.tick(); }
        if (t > FREEZE_S + COUNT_S) {
          lastCount = -1;
          setCount(0);
          audio.tick(true);
          game = new StompGame({ size: s.size, roundSeconds: s.seconds });
          audio.startPulse(() => 96 + 60 * (game ? progress(game.t, game.c) : 0));
          go("play");
        }
      } else if (ph === "play" && game) {
        game.update(dt);
        engine.frost = frostAt(game.t, game.c);
        engine.syncTargets(game.targets, game.t, game.c.riseSeconds, game.c.targetRadius);
        setHud({ score: game.score, time: Math.ceil(game.c.roundSeconds - game.t), mult: game.multiplier, combo: game.combo });
        if (game.over) {
          audio.stopPulse();
          audio.shatter();
          go("reveal");
        }
      } else if (ph === "reveal" && game) {
        // Moment fort : le verre devient parfaitement clair, le vide s'ouvre.
        engine.frost = Math.max(0, game.c.frostEnd * (1 - t / 0.6));
        engine.syncTargets(game.targets, game.t + t, game.c.riseSeconds, game.c.targetRadius);
        if (t > REVEAL_S) {
          const best = readBest();
          const record = game.score > best;
          if (record) writeBest(game.score);
          setResult({ score: game.score, hits: game.hits, accuracy: game.accuracy, bestCombo: game.bestCombo, best: Math.max(best, game.score), record });
          go("results");
        }
      } else if (ph === "results") {
        engine.syncTargets([], now / 1000, 0.55, START_RADIUS);
        if (t > RESULTS_S) { game = null; setResult(null); setHud({ score: 0, time: s.seconds, mult: 1, combo: 0 }); go("attract"); }
      }
      engine.render(dt);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); detach(); audio.stopPulse(); engine.dispose(); engineRef.current = null; };
  }, [s.size, s.seconds, s.logo, s.ws, s.debug]);

  // Le moteur suit la taille du carre.
  useEffect(() => { engineRef.current?.resize(box.size); }, [box.size]);

  return (
    <main className="fixed inset-0 overflow-hidden bg-black text-white select-none" style={{ cursor: s.debug ? "crosshair" : "none" }}>
      <div ref={boxRef} className="absolute touch-none" style={{ width: box.size, height: box.size, left: box.left, top: box.top }}>
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

        {/* Points qui sautent a l'endroit de l'impact. */}
        {popups.map((p) => (
          <span key={p.id} className="fm-display pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 stomp-pop"
            style={{
              left: `${(p.x / s.size + 0.5) * 100}%`, top: `${(p.z / s.size + 0.5) * 100}%`,
              fontSize: box.size * (p.tone === "combo" ? 0.05 : 0.04),
              color: p.tone === "hazard" ? "#ff4057" : p.tone === "gold" ? "#ffd166" : p.tone === "combo" ? "#19e6d6" : "#ffffff",
              textShadow: "0 0 18px rgba(255,45,149,.9)",
            }}>
            {p.text}
          </span>
        ))}

        {phase === "attract" && (
          <Mirror>
            <div className="flex flex-col items-center" style={{ gap: box.size * 0.01 }}>
              <p className="fm-display stomp-neon" style={{ fontSize: box.size * 0.12, letterSpacing: "0.02em" }}>STOMP</p>
              <p className="fm-display" style={{ fontSize: box.size * 0.028, color: "#19e6d6" }}>Marche sur le cercle pour jouer</p>
            </div>
          </Mirror>
        )}
        {phase === "freeze" && count > 0 && (
          <div className="pointer-events-none absolute inset-0 grid place-items-center">
            <p key={count} className="fm-display stomp-count" style={{ fontSize: box.size * 0.3 }}>{count}</p>
          </div>
        )}
        {(phase === "play" || phase === "freeze") && (
          <Mirror edge>
            <div className="flex items-center justify-between" style={{ width: box.size * 0.9, fontSize: box.size * 0.034 }}>
              <span className="fm-display">{hud.score.toLocaleString("fr-FR")}</span>
              {hud.mult > 1 && <span className="fm-display" style={{ color: "#19e6d6" }}>×{hud.mult}</span>}
              <span className="fm-display" style={{ color: hud.time <= 10 ? "#ff4057" : "#ffffff" }}>{hud.time}s</span>
            </div>
          </Mirror>
        )}
        {phase === "results" && result && (
          <Mirror>
            <div className="flex flex-col items-center text-center" style={{ gap: box.size * 0.008 }}>
              {result.record && <p className="fm-display" style={{ fontSize: box.size * 0.03, color: "#ffd166" }}>Record du jour</p>}
              <p className="fm-display stomp-neon" style={{ fontSize: box.size * 0.11 }}>{result.score.toLocaleString("fr-FR")}</p>
              <p className="fm-grotesk" style={{ fontSize: box.size * 0.022, color: "#e8dcff" }}>
                {result.hits} cibles · {Math.round(result.accuracy * 100)} % · combo {result.bestCombo}
              </p>
              <p className="fm-grotesk" style={{ fontSize: box.size * 0.018, color: "#9d8fc0" }}>Meilleur du jour : {result.best.toLocaleString("fr-FR")}</p>
            </div>
          </Mirror>
        )}
      </div>

      {s.debug && (
        <div className="absolute left-2 top-2 rounded bg-black/70 px-2 py-1 font-mono text-[11px] text-white/80">
          {phase} · {fps} fps · sol {s.size} m · {box.size}px{s.ws ? ` · relais ${s.ws}` : " · souris/tactile"}
        </div>
      )}

      <style>{`
        .stomp-neon { color: #fff; text-shadow: 0 0 10px #ff2d95, 0 0 34px #ff2d95, 0 0 70px #19e6d6; }
        .stomp-pop { animation: stompPop .9s cubic-bezier(.2,.8,.2,1) forwards; }
        @keyframes stompPop { 0% { opacity: 0; transform: translate(-50%,-50%) scale(.6); } 15% { opacity: 1; transform: translate(-50%,-80%) scale(1.15); } 100% { opacity: 0; transform: translate(-50%,-160%) scale(1); } }
        .stomp-count { color: #fff; text-shadow: 0 0 30px #19e6d6, 0 0 90px #ff2d95; animation: stompCount 1s ease-out forwards; }
        @keyframes stompCount { from { opacity: 1; transform: scale(1.4); } to { opacity: 0; transform: scale(.8); } }
      `}</style>
    </main>
  );
}

/**
 * Sur un sol, on joue de tous les cotes : chaque texte est affiche deux fois,
 * a l'endroit pour le cote bas, retourne pour le cote haut.
 * `edge` : colle aux bords (score pendant la partie) ; sinon au centre.
 */
function Mirror({ children, edge }: { children: React.ReactNode; edge?: boolean }) {
  return (
    <div className="pointer-events-none absolute inset-0">
      <div className={`absolute inset-x-0 flex justify-center ${edge ? "bottom-[2%]" : "bottom-[12%]"}`}>{children}</div>
      <div className={`absolute inset-x-0 flex rotate-180 justify-center ${edge ? "top-[2%]" : "top-[12%]"}`}>{children}</div>
    </div>
  );
}
