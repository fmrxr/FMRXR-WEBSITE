"use client";
import { useEffect, useRef, useState } from "react";
import { DEFAULT_STOMP, StompGame, frost as frostAt, lineup, padPositions, progress, type HitEvent, type Lineup, type Target, type Zone } from "@/lib/stomp/game";
import { SIDE_HEX, StompEngine } from "@/components/stomp/engine";
import { StompAudio } from "@/components/stomp/audio";
import { attachInput } from "@/components/stomp/input";

// STOMP : le chef d'orchestre. Phases :
//   attract  : verre clair, la ville neon en dessous ; 4 plaques de couleur
//   lobby    : des joueurs ont choisi leur plaque, les autres ont quelques
//              secondes pour monter ; la plaque du centre bascule en equipes 2v2
//   freeze   : le verre givre, les zones de chaque camp s'allument, 3-2-1
//   play     : la manche ; le verre se degivre a mesure que le jeu accelere
//   reveal   : le verre devient totalement clair, le vide s'ouvre (moment fort)
//   results  : score ou classement, et record du jour, lisibles de tous cotes
// Le verre n'est un abime qu'aux moments forts : pendant le jeu il reste
// lisible comme une surface (rapport STOMP, inconfort des sols en trompe-l'oeil).
//
// Lisibilite : tout texte pose sur la ville a une plaque sombre derriere lui
// (la ville peut etre noire ou saturee de neon juste dessous) et un contour.

type Phase = "attract" | "lobby" | "freeze" | "play" | "reveal" | "results";

export type StompSettings = { size: number; seconds: number; logo: string; ws: string | null; px: number | null; ox: number | null; oy: number | null; debug: boolean };

const PAD_RADIUS = 0.42;
const TEAM_PAD_RADIUS = 0.3;
const TEAM_PAD_ID = -20;
const LOBBY_S = 6, LOBBY_MAX_S = 12, FREEZE_S = 1.2, COUNT_S = 3, REVEAL_S = 2.2, RESULTS_S = 14;
const TEAM_NAMES = ["Rose", "Turquoise", "Orange", "Violet"];
// Contrastes mesures (WCAG) : sur la plaque, chaque teinte de texte depasse
// 5,9:1 meme quand la plaque passe sur un neon blanc (pire cas), donc AA
// partout. Les teintes de texte sont des versions eclaircies des neons des
// camps (les neons purs restent pour les bordures et les halos).
// Daltonisme : rose et turquoise sont la paire la plus proche en
// deuteranopie ; sans consequence, un camp ne voit des cibles que dans sa
// zone, la couleur ne decide jamais seule a qui est une cible.
const PLATE = "rgba(9, 5, 18, 0.88)";
const SIDE_TEXT = ["#ff6fb8", "#5ff5e6", "#ffa266", "#bf9bff", "#ffffff"];
const DANGER = "#ff7586";
const INK = "#f6f1ff";
const MUTED = "#c9bce6";
/** Contour sombre + halo : lisible sur du noir comme sur un neon. */
const outline = (glow: string) => `0 0 2px #05020a, 0 0 2px #05020a, 0 2px 6px rgba(5,2,10,.9), 0 0 18px ${glow}`;

type Popup = { id: number; x: number; z: number; text: string; color: string };
type SideView = { name: string; color: string; text: string; score: number; mult: number; zone: Zone };
type Result = { ranking: { name: string; color: string; text: string; score: number; hits: number; accuracy: number; bestCombo: number }[]; mode: Lineup["mode"]; best: number; record: boolean };

function bestKey() { return `fmrxr-stomp-best-${new Date().toISOString().slice(0, 10)}`; }
function readBest() { try { return Number(localStorage.getItem(bestKey()) ?? 0) || 0; } catch { return 0; } }
function writeBest(n: number) { try { localStorage.setItem(bestKey(), String(n)); } catch { /* prive */ } }

/** Nom et couleur d'un camp : un joueur garde la couleur de sa plaque, une equipe celle de son cote. */
function sideIdentity(l: Lineup, i: number) {
  const pads = l.sides[i].pads;
  const color = SIDE_HEX[l.mode === "teams" ? (i === 0 ? 0 : 1) : pads[0]];
  const name = l.mode === "teams" ? `Équipe ${TEAM_NAMES[i === 0 ? 0 : 1]}` : l.mode === "solo" ? "" : `J${pads[0] + 1}`;
  const text = SIDE_TEXT[l.mode === "teams" ? (i === 0 ? 0 : 1) : pads[0]];
  return { name, color, text };
}

export function Stomp({ s }: { s: StompSettings }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<StompEngine | null>(null);
  const phaseRef = useRef<Phase>("attract");
  const [phase, setPhase] = useState<Phase>("attract");
  const [joined, setJoined] = useState<number[]>([]);
  const [teams, setTeams] = useState(false);
  const [lobbyLeft, setLobbyLeft] = useState(0);
  const [count, setCount] = useState(0);
  const [time, setTime] = useState(s.seconds);
  const [sides, setSides] = useState<SideView[]>([]);
  const [popups, setPopups] = useState<Popup[]>([]);
  const [result, setResult] = useState<Result | null>(null);
  const [box, setBox] = useState({ size: 600, left: 0, top: 0 });
  const [fps, setFps] = useState(0);
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

    const pads = padPositions(s.size);
    const padTargets: Target[] = pads.map((p, i) => ({ id: -10 - i, kind: "brand", owner: i, x: p.x, z: p.z, bornAt: -10, life: 1e9, state: "live", endAt: null }));
    const teamPad: Target = { id: TEAM_PAD_ID, kind: "brand", owner: 4, x: 0, z: 0, bornAt: -10, life: 1e9, state: "live", endAt: null };

    let game: StompGame | null = null;
    let line: Lineup = lineup(s.size, [], false);
    let picked: number[] = [];
    let teamMode = false;
    let teamToggledAt = -9;
    let phaseAt = performance.now() / 1000;
    let lobbyEnds = 0;
    let lastCount = -1;
    let popupId = 0;
    engine.frost = 0;

    const go = (p: Phase) => { setP(p); phaseAt = performance.now() / 1000; };
    const pop = (x: number, z: number, text: string, color: string) => {
      const id = ++popupId;
      setPopups((list) => [...list.slice(-12), { id, x, z, text, color }]);
      window.setTimeout(() => setPopups((list) => list.filter((p) => p.id !== id)), 900);
    };
    const resetLobby = () => {
      picked = []; teamMode = false;
      setJoined([]); setTeams(false);
      engine.highlight.clear();
      engine.setOwnerColors(SIDE_HEX);
      engine.setZones([], [], 0);
    };

    const onHits = (events: HitEvent[]) => {
      for (const e of events) {
        engine.impact(e.target.x, e.target.z, e.target.kind, e.target.owner);
        if (e.target.kind === "hazard") audio.hazard();
        else if (e.target.kind === "gold") audio.gold();
        else audio.hit(e.combo);
        pop(e.target.x, e.target.z, `${e.points > 0 ? "+" : ""}${e.points}`, e.target.kind === "hazard" ? DANGER : e.target.kind === "gold" ? "#ffd166" : INK);
        if (e.target.kind !== "hazard" && e.combo > 0 && e.combo % 4 === 0) pop(e.target.x, e.target.z - 0.45, `×${e.multiplier}`, sideIdentity(line, e.target.owner).text);
      }
    };

    const detach = attachInput(el, s.size, {
      onStomp: (pts) => {
        audio.unlock();
        const ph = phaseRef.current;
        const now = performance.now() / 1000;
        if (ph === "attract" || ph === "lobby") {
          // Plaques de couleur : rejoindre la partie.
          pads.forEach((p, i) => {
            if (picked.includes(i) || !pts.some((q) => Math.hypot(q.x - p.x, q.z - p.z) <= PAD_RADIUS + 0.1)) return;
            picked = [...picked, i];
            setJoined(picked);
            engine.highlight.add(-10 - i);
            engine.impact(p.x, p.z, "brand", i);
            audio.hit(picked.length * 3);
            if (phaseRef.current === "attract") { go("lobby"); lobbyEnds = performance.now() / 1000 + LOBBY_S; }
            else lobbyEnds = Math.min(phaseAt + LOBBY_MAX_S, Math.max(lobbyEnds, now + 3)); // un nouveau venu laisse le temps au suivant
          });
          // Plaque du centre : equipes 2v2 (une bascule par appui).
          if (pts.some((q) => Math.hypot(q.x, q.z) <= TEAM_PAD_RADIUS + 0.1) && now - teamToggledAt > 0.8) {
            teamToggledAt = now;
            teamMode = !teamMode;
            setTeams(teamMode);
            // Les plaques prennent la couleur de leur equipe : bas = rose, haut = turquoise.
            engine.setOwnerColors(teamMode ? [SIDE_HEX[0], SIDE_HEX[0], SIDE_HEX[1], SIDE_HEX[1], SIDE_HEX[4]] : SIDE_HEX);
            engine.impact(0, 0, "gold");
            audio.tick();
          }
          return;
        }
        if (ph === "play" && game) onHits(game.stomp(pts));
      },
      onPresence: (pts) => engine.lookFrom(pts),
    }, s.ws);

    // Mode debug : etat lisible depuis la console (tests automatises, reglage sur site).
    if (s.debug) (window as unknown as { __stomp?: unknown }).__stomp = {
      phase: () => phaseRef.current, game: () => game, lineup: () => line,
      snapshot: (type = "image/jpeg") => { engine.render(0); return canvas.toDataURL(type, 0.88); },
    };

    const sideViews = () => line.sides.map((side, i) => ({ ...sideIdentity(line, i), score: game?.sides[i].score ?? 0, mult: game ? game.multiplierOf(i) : 1, zone: side.zone }));

    let raf = 0;
    let last = performance.now();
    let frames = 0, fpsAt = last;
    let hudAt = 0;
    const loop = (nowMs: number) => {
      const dt = Math.min(0.05, (nowMs - last) / 1000);
      last = nowMs;
      frames++;
      if (nowMs - fpsAt > 1000) { setFps(frames); frames = 0; fpsAt = nowMs; }
      const now = nowMs / 1000;
      const t = now - phaseAt;
      const ph = phaseRef.current;

      if (ph === "attract" || ph === "lobby") {
        engine.frost += (0 - engine.frost) * 0.05;
        engine.syncTargets([...padTargets, teamPad], now, 0.55, PAD_RADIUS);
        if (ph === "lobby") {
          setLobbyLeft(Math.max(0, Math.ceil(lobbyEnds - now)));
          if (now >= lobbyEnds) {
            line = lineup(s.size, picked, teamMode);
            const ids = line.sides.map((_, i) => sideIdentity(line, i));
            engine.setOwnerColors(ids.map((x) => x.color));
            engine.setZones(line.sides.map((x) => x.zone), ids.map((x) => x.color), 1);
            setSides(sideViews());
            engine.impact(0, 0, "brand");
            audio.freeze();
            go("freeze");
          }
        }
      } else if (ph === "freeze") {
        // Le verre givre, les zones s'allument pour que chacun rejoigne la sienne, puis 3-2-1.
        engine.frost = Math.min(DEFAULT_STOMP.frostStart, (t / FREEZE_S) * DEFAULT_STOMP.frostStart);
        engine.syncTargets([], now, 0.55, PAD_RADIUS);
        const c = Math.ceil(COUNT_S - (t - FREEZE_S));
        if (t > FREEZE_S && c !== lastCount && c > 0) { lastCount = c; setCount(c); audio.tick(); }
        if (t > FREEZE_S + COUNT_S) {
          lastCount = -1;
          setCount(0);
          audio.tick(true);
          game = new StompGame({ size: s.size, roundSeconds: s.seconds, zones: line.sides.map((x) => x.zone) });
          engine.setZones(line.sides.map((x) => x.zone), line.sides.map((_, i) => sideIdentity(line, i).color), 0.25);
          audio.startPulse(() => 96 + 60 * (game ? progress(game.t, game.c) : 0));
          go("play");
        }
      } else if (ph === "play" && game) {
        game.update(dt);
        engine.frost = frostAt(game.t, game.c);
        engine.syncTargets(game.targets, game.t, game.c.riseSeconds, game.c.targetRadius);
        if (now - hudAt > 0.1) { hudAt = now; setSides(sideViews()); setTime(Math.ceil(game.c.roundSeconds - game.t)); }
        if (game.over) {
          audio.stopPulse();
          audio.shatter();
          setSides(sideViews());
          go("reveal");
        }
      } else if (ph === "reveal" && game) {
        // Moment fort : le verre devient parfaitement clair, le vide s'ouvre.
        engine.frost = Math.max(0, game.c.frostEnd * (1 - t / 0.6));
        engine.setZones(line.sides.map((x) => x.zone), line.sides.map((_, i) => sideIdentity(line, i).color), Math.max(0, 0.25 - t * 0.2));
        engine.syncTargets(game.targets, game.t + t, game.c.riseSeconds, game.c.targetRadius);
        if (t > REVEAL_S) {
          const ranking = game.ranking().map((r) => ({ ...sideIdentity(line, r.i), score: r.score, hits: r.hits, accuracy: r.accuracy, bestCombo: r.bestCombo }));
          const top = ranking[0]?.score ?? 0;
          const best = readBest();
          const record = top > best;
          if (record) writeBest(top);
          setResult({ ranking, mode: line.mode, best: Math.max(best, top), record });
          go("results");
        }
      } else if (ph === "results") {
        engine.syncTargets([], now, 0.55, PAD_RADIUS);
        if (t > RESULTS_S) {
          game = null;
          setResult(null);
          setSides([]);
          setTime(s.seconds);
          resetLobby();
          go("attract");
        }
      }
      engine.render(dt);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); detach(); audio.stopPulse(); engine.dispose(); engineRef.current = null; };
  }, [s.size, s.seconds, s.logo, s.ws, s.debug]);

  // Le moteur suit la taille du carre.
  useEffect(() => { engineRef.current?.resize(box.size); }, [box.size]);

  const pct = (v: number) => `${(v / s.size + 0.5) * 100}%`;
  const u = box.size;
  const pads = padPositions(s.size);
  const plate = (border: string): React.CSSProperties => ({ background: PLATE, border: `${Math.max(1, u * 0.002)}px solid ${border}`, borderRadius: u * 0.012, padding: `${u * 0.006}px ${u * 0.016}px` });

  return (
    <main className="fixed inset-0 overflow-hidden bg-black select-none" style={{ cursor: s.debug ? "crosshair" : "none", color: INK }}>
      <div ref={boxRef} className="absolute touch-none" style={{ width: u, height: u, left: box.left, top: box.top }}>
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

        {/* Points qui sautent a l'endroit de l'impact. */}
        {popups.map((p) => (
          <span key={p.id} className="fm-display pointer-events-none absolute stomp-pop"
            style={{ left: pct(p.x), top: pct(p.z), fontSize: u * 0.042, color: p.color, textShadow: outline("rgba(255,45,149,.7)") }}>
            {p.text}
          </span>
        ))}

        {/* Inscription : une etiquette par plaque, tournee vers son bord ; la plaque du centre pour les equipes. */}
        {(phase === "attract" || phase === "lobby") && (
          <>
            <Mirror edge>
              <div className="flex flex-col items-center" style={plate("rgba(255,45,149,.55)")}>
                <p className="fm-display stomp-neon" style={{ fontSize: u * 0.07 }}>STOMP</p>
                <p className="fm-display" style={{ fontSize: u * 0.022, color: INK }}>
                  {phase === "lobby" ? `Départ dans ${lobbyLeft} · les autres, montez !` : "1 à 4 joueurs · marche sur ta couleur"}
                </p>
              </div>
            </Mirror>
            {pads.map((p, i) => {
              const on = joined.includes(i);
              const team = teams ? (i <= 1 ? 0 : 1) : null;
              const col = SIDE_HEX[team ?? i];
              const txt = SIDE_TEXT[team ?? i];
              return (
                <div key={i} className="pointer-events-none absolute flex flex-col items-center"
                  style={{ left: pct(p.x), top: pct(p.z + (p.z > 0 ? 0.62 : -0.62)), transform: `translate(-50%,-50%) rotate(${p.z > 0 ? 0 : 180}deg)`, ...plate(col) }}>
                  <span className="fm-display" style={{ fontSize: u * 0.03, color: txt, textShadow: outline(col) }}>
                    {on ? "PRÊT" : `J${i + 1}`}
                  </span>
                  {team !== null && <span className="fm-grotesk" style={{ fontSize: u * 0.017, color: INK }}>Équipe {TEAM_NAMES[team]}</span>}
                </div>
              );
            })}
            <div className="pointer-events-none absolute left-1/2 top-1/2" style={{ transform: `translate(-50%, ${u * 0.085}px)`, ...plate(teams ? "#ffd166" : "rgba(201,188,230,.5)") }}>
              <span className="fm-display" style={{ fontSize: u * 0.022, color: teams ? "#ffd166" : INK }}>
                {teams ? "ÉQUIPES 2v2 · ON" : "ÉQUIPES 2v2"}
              </span>
            </div>
          </>
        )}

        {phase === "freeze" && count > 0 && (
          <div className="pointer-events-none absolute inset-0 grid place-items-center">
            <p key={count} className="fm-display stomp-count" style={{ fontSize: u * 0.3 }}>{count}</p>
          </div>
        )}

        {/* Score de chaque camp, au bord de sa zone, tourne vers son joueur. */}
        {(phase === "freeze" || phase === "play" || phase === "reveal") && sides.map((sd, i) => (
          <SideLabel key={i} zone={sd.zone} size={s.size} u={u} style={plate(sd.color)}>
            <span className="fm-display" style={{ fontSize: u * 0.034, color: sides.length > 1 ? sd.text : INK, textShadow: outline(sd.color) }}>
              {sd.name ? `${sd.name} · ` : ""}{sd.score.toLocaleString("fr-FR")}
            </span>
            {sd.mult > 1 && <span className="fm-display" style={{ fontSize: u * 0.03, color: "#5ff5e6", marginInline: u * 0.015, textShadow: outline("#19e6d6") }}>×{sd.mult}</span>}
            <span className="fm-display" style={{ fontSize: u * 0.026, color: time <= 10 ? DANGER : INK, marginInlineStart: u * 0.02 }}>{time}s</span>
          </SideLabel>
        ))}

        {phase === "results" && result && (
          <Mirror>
            <div className="flex flex-col items-center text-center" style={{ gap: u * 0.006, ...plate(result.ranking[0].color) }}>
              {result.record && <p className="fm-display" style={{ fontSize: u * 0.026, color: "#ffd166" }}>Record du jour</p>}
              {result.mode === "solo" ? (
                <>
                  <p className="fm-display stomp-neon" style={{ fontSize: u * 0.1 }}>{result.ranking[0].score.toLocaleString("fr-FR")}</p>
                  <p className="fm-grotesk" style={{ fontSize: u * 0.02, color: INK }}>
                    {result.ranking[0].hits} cibles · {Math.round(result.ranking[0].accuracy * 100)} % · combo {result.ranking[0].bestCombo}
                  </p>
                </>
              ) : (
                <>
                  <p className="fm-display" style={{ fontSize: u * 0.06, color: result.ranking[0].text, textShadow: outline(result.ranking[0].color) }}>
                    {result.ranking[0].score === result.ranking[1]?.score ? "Égalité !" : `${result.ranking[0].name} gagne`}
                  </p>
                  <div className="flex items-baseline" style={{ gap: u * 0.03 }}>
                    {result.ranking.map((r) => (
                      <span key={r.name} className="fm-display" style={{ fontSize: u * 0.03, color: r.text, textShadow: outline(r.color) }}>{r.name} {r.score.toLocaleString("fr-FR")}</span>
                    ))}
                  </div>
                </>
              )}
              <p className="fm-grotesk" style={{ fontSize: u * 0.018, color: MUTED }}>Meilleur du jour : {result.best.toLocaleString("fr-FR")}</p>
            </div>
          </Mirror>
        )}
      </div>

      {s.debug && (
        <div className="absolute left-2 top-2 rounded bg-black/70 px-2 py-1 font-mono text-[11px] text-white/80">
          {phase} · {fps} fps · sol {s.size} m · {u}px · {joined.length} joueur(s){teams ? " · équipes" : ""}{s.ws ? ` · relais ${s.ws}` : " · souris/tactile"}
        </div>
      )}

      <style>{`
        .stomp-neon { color: #fff; text-shadow: 0 0 2px #05020a, 0 0 10px #ff2d95, 0 0 34px #ff2d95, 0 0 70px #19e6d6; }
        .stomp-pop { transform: translate(-50%,-50%); animation: stompPop .9s cubic-bezier(.2,.8,.2,1) forwards; }
        @keyframes stompPop { 0% { opacity: 0; transform: translate(-50%,-50%) scale(.6); } 15% { opacity: 1; transform: translate(-50%,-80%) scale(1.15); } 100% { opacity: 0; transform: translate(-50%,-160%) scale(1); } }
        .stomp-count { color: #fff; text-shadow: 0 0 3px #05020a, 0 0 30px #19e6d6, 0 0 90px #ff2d95; animation: stompCount 1s ease-out forwards; }
        @keyframes stompCount { from { opacity: 1; transform: scale(1.4); } to { opacity: 0; transform: scale(.8); } }
      `}</style>
    </main>
  );
}

/**
 * Sur un sol, on joue de tous les cotes : chaque texte est affiche deux fois,
 * a l'endroit pour le cote bas, retourne pour le cote haut.
 * `edge` : colle aux bords ; sinon au centre.
 */
function Mirror({ children, edge }: { children: React.ReactNode; edge?: boolean }) {
  return (
    <div className="pointer-events-none absolute inset-0">
      <div className={`absolute inset-x-0 flex justify-center ${edge ? "bottom-[2%]" : "bottom-[14%]"}`}>{children}</div>
      <div className={`absolute inset-x-0 flex rotate-180 justify-center ${edge ? "top-[2%]" : "top-[14%]"}`}>{children}</div>
    </div>
  );
}

/**
 * Etiquette d'un camp, posee contre le bord exterieur de sa zone et tournee
 * vers le joueur qui s'y tient : bas = a l'endroit, haut = retournee,
 * moitie gauche ou droite = de cote.
 */
function SideLabel({ zone, size, u, style: extra, children }: { zone: Zone; size: number; u: number; style: React.CSSProperties; children: React.ReactNode }) {
  const h = size / 2;
  const cx = ((zone.x0 + zone.x1) / 2 / size + 0.5) * 100;
  const cz = ((zone.z0 + zone.z1) / 2 / size + 0.5) * 100;
  const fullHeight = zone.z0 <= -h + 1e-6 && zone.z1 >= h - 1e-6;
  const fullWidth = zone.x0 <= -h + 1e-6 && zone.x1 >= h - 1e-6;
  let style: React.CSSProperties;
  if (fullHeight && !fullWidth) {
    const left = zone.x0 <= -h + 1e-6;
    style = { top: `${cz}%`, left: left ? u * 0.04 : undefined, right: left ? undefined : u * 0.04, transform: `translate(${left ? "-50%" : "50%"},-50%) rotate(${left ? 90 : -90}deg)` };
  } else {
    const bottom = zone.z1 >= h - 1e-6 && zone.z0 >= -1e-6;
    style = { left: `${cx}%`, top: bottom ? undefined : u * 0.012, bottom: bottom ? u * 0.012 : undefined, transform: `translateX(-50%) rotate(${bottom ? 0 : 180}deg)` };
  }
  return <div className="pointer-events-none absolute flex items-baseline whitespace-nowrap" style={{ ...extra, ...style }}>{children}</div>;
}
