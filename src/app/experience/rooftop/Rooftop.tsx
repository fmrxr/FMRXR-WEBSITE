"use client";
import { useEffect, useRef, useState } from "react";
import { lineup, padPositions, type Lineup, type Zone } from "@/lib/stomp/game";
import { RooftopGame, frost as frostAt, progress, type RoofEvent } from "@/lib/rooftop/game";
import { RooftopEngine, SIDE_HEX } from "@/components/rooftop/engine";
import { StompAudio } from "@/components/stomp/audio";
import { attachInput, type FloorPoint } from "@/components/stomp/input";

// ROOFTOP : courir sur les toits de la ville neon et ramasser les logos.
// Phases : attract (verre a moitie depoli, plaques de couleur) -> lobby
// (les autres montent ; plaque du centre = equipes 2v2) -> freeze (zones,
// 3-2-1) -> play (le verre des vides s'eclaircit, la ville se creuse) ->
// reveal (tous les toits s'effondrent sauf ceux ou l'on se tient) -> results.
// Inscription, zones, etiquettes et contrastes : memes regles que STOMP.

type Phase = "attract" | "lobby" | "freeze" | "play" | "reveal" | "results";

// Modes : SOLO (une plaque, depart immediat, tout le sol), 2v2 (deux equipes,
// bas contre haut), 4 JOUEURS (un quart chacun, jouable a 2 ou 3).
// « menu » : l'accueil propose les trois, on choisit en marchant sur sa plaque.
export type Mode = "solo" | "teams" | "versus";
export type RooftopSettings = { size: number; seconds: number; logo: string; ws: string | null; px: number | null; ox: number | null; oy: number | null; debug: boolean; mode: Mode | "menu"; tone: "agx" | "aces" };

const MODE_LABEL: Record<Mode, string> = { solo: "SOLO", teams: "2v2", versus: "4 JOUEURS" };
const MODE_HINT: Record<Mode, string> = { solo: "1 joueur", teams: "2 équipes de 2", versus: "2 à 4 joueurs" };
const MODE_COLOR: Record<Mode, string> = { solo: "#ff2d95", teams: "#19e6d6", versus: "#ff8a3d" };
const WAIT_FIRST_S = 20; // sans joueur sur une plaque, retour a l'accueil

/** Plaques de l'accueil : une par mode, en ligne au milieu du sol. */
const menuPads = (size: number) => (["solo", "teams", "versus"] as Mode[]).map((m, i) => ({ m, x: (i - 1) * size * 0.31, z: 0 }));
/** Plaques d'inscription du mode choisi. */
const padsFor = (mode: Mode, size: number) => (mode === "solo" ? [{ x: 0, z: 0 }] : padPositions(size));

const PAD_RADIUS = 0.42;
const LOBBY_S = 6, LOBBY_MAX_S = 12, FREEZE_S = 1.2, COUNT_S = 3, REVEAL_S = 2.4, RESULTS_S = 14;
const TEAM_NAMES = ["Rose", "Turquoise"];
const PLATE = "rgba(9, 5, 18, 0.88)";
const INK = "#f6f1ff", MUTED = "#c9bce6", DANGER = "#ff7586";
// Contrastes mesures pour STOMP (>= 5,9:1 sur la plaque, meme sur un neon blanc).
const SIDE_TEXT = ["#ff6fb8", "#5ff5e6", "#ffa266", "#bf9bff", "#ffffff"];
const outline = (glow: string) => `0 0 2px #05020a, 0 0 2px #05020a, 0 2px 6px rgba(5,2,10,.9), 0 0 18px ${glow}`;

type Popup = { id: number; x: number; z: number; text: string; color: string };
type SideView = { name: string; color: string; text: string; score: number; mult: number; zone: Zone };
type Result = { ranking: { name: string; color: string; text: string; score: number; logos: number; falls: number; bestCombo: number }[]; mode: Lineup["mode"]; best: number; record: boolean };

const bestKey = () => `fmrxr-rooftop-best-${new Date().toISOString().slice(0, 10)}`;
const readBest = () => { try { return Number(localStorage.getItem(bestKey()) ?? 0) || 0; } catch { return 0; } };
const writeBest = (n: number) => { try { localStorage.setItem(bestKey(), String(n)); } catch { /* prive */ } };

function sideIdentity(l: Lineup, i: number) {
  const pads = l.sides[i].pads;
  const k = l.mode === "teams" ? (i === 0 ? 0 : 1) : pads[0];
  const name = l.mode === "teams" ? `Équipe ${TEAM_NAMES[i === 0 ? 0 : 1]}` : l.mode === "solo" ? "" : `J${pads[0] + 1}`;
  return { name, color: SIDE_HEX[k], text: SIDE_TEXT[k] };
}

export function Rooftop({ s }: { s: RooftopSettings }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<RooftopEngine | null>(null);
  const phaseRef = useRef<Phase>("attract");
  const [phase, setPhase] = useState<Phase>("attract");
  const [joined, setJoined] = useState<number[]>([]);
  const [chosen, setChosen] = useState<Mode | null>(s.mode === "menu" ? null : s.mode);
  const [waiting, setWaiting] = useState(false); // mode choisi, personne encore sur une plaque
  const teams = chosen === "teams";
  const [lobbyLeft, setLobbyLeft] = useState(0);
  const [count, setCount] = useState(0);
  const [time, setTime] = useState(s.seconds);
  const [sides, setSides] = useState<SideView[]>([]);
  const [popups, setPopups] = useState<Popup[]>([]);
  const [result, setResult] = useState<Result | null>(null);
  const [box, setBox] = useState({ size: 600, left: 0, top: 0 });
  const [fps, setFps] = useState(0);
  const setP = (p: Phase) => { phaseRef.current = p; setPhase(p); };

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
    const engine = new RooftopEngine(canvas, { size: s.size, logoUrl: s.logo, tone: s.tone });
    engineRef.current = engine;
    const audio = new StompAudio();
    engine.resize(canvas.clientWidth || 600);

    const fixed: Mode | null = s.mode === "menu" ? null : s.mode;
    let mode: Mode | null = fixed;
    let waitingFirst = false;
    // Ville d'attente : la meme mecanique, sans logos ni score, pour que l'ecran vive.
    let preview = new RooftopGame({ size: s.size, roundSeconds: 1e6, shiftStart: 3, shiftEnd: 3 });
    let game: RooftopGame | null = null;
    let line: Lineup = lineup(s.size, [], false);
    let picked: number[] = [];
    let phaseAt = performance.now() / 1000;
    let lobbyEnds = 0;
    let lastCount = -1;
    let popupId = 0;
    let presence: FloorPoint[] = [];
    engine.frost = 0.5;

    const go = (p: Phase) => { setP(p); phaseAt = performance.now() / 1000; };
    const pop = (x: number, z: number, text: string, color: string) => {
      const id = ++popupId;
      setPopups((list) => [...list.slice(-12), { id, x, z, text, color }]);
      window.setTimeout(() => setPopups((list) => list.filter((p) => p.id !== id)), 900);
    };
    const resetLobby = () => {
      picked = []; mode = fixed; waitingFirst = false;
      setJoined([]); setChosen(fixed); setWaiting(false);
      engine.setOwnerColors(SIDE_HEX);
      engine.setZones([], [], 0);
      preview = new RooftopGame({ size: s.size, roundSeconds: 1e6, shiftStart: 3, shiftEnd: 3 });
    };

    const onEvents = (g: RooftopGame, events: RoofEvent[]) => {
      for (const e of events) {
        if (e.type === "collect") {
          const p = g.cellCenter(e.logo.c, e.logo.r);
          engine.collect(p.x, p.z, e.logo.kind === "gold", e.logo.owner);
          if (e.logo.kind === "gold") audio.gold(); else audio.hit(e.combo);
          pop(p.x, p.z, `+${e.points}`, e.logo.kind === "gold" ? "#ffd166" : INK);
          if (e.combo > 0 && e.combo % 3 === 0) pop(p.x, p.z - 0.45, `×${g.multiplierOf(e.side)}`, sideIdentity(line, e.side).text);
        } else {
          const p = g.cellCenter(e.c, e.r);
          engine.fall(p.x, p.z);
          audio.hazard();
          pop(p.x, p.z, `${e.points}`, DANGER);
        }
      }
    };

    const detach = attachInput(el, s.size, {
      onStomp: (pts) => {
        audio.unlock();
        const ph = phaseRef.current;
        const now = performance.now() / 1000;
        if (ph === "attract" || ph === "lobby") {
          const near = (p: { x: number; z: number }) => pts.some((q) => Math.hypot(q.x - p.x, q.z - p.z) <= PAD_RADIUS + 0.1);
          // 1. Accueil : choisir un mode.
          if (mode === null) {
            const hit = menuPads(s.size).find(near);
            if (!hit) return;
            mode = hit.m;
            setChosen(mode);
            engine.collect(hit.x, hit.z, true, 0);
            audio.tick();
            if (mode === "solo") { picked = [0]; setJoined(picked); lobbyEnds = now; }
            else { waitingFirst = true; setWaiting(true); lobbyEnds = now + WAIT_FIRST_S; }
            go("lobby");
            return;
          }
          // 2. Inscription sur les plaques du mode.
          padsFor(mode, s.size).forEach((p, i) => {
            if (picked.includes(i) || !near(p)) return;
            picked = [...picked, i];
            setJoined(picked);
            engine.collect(p.x, p.z, false, mode === "teams" ? (i <= 1 ? 0 : 1) : i);
            audio.hit(picked.length * 3);
            if (mode === "solo") lobbyEnds = now; // solo : depart immediat
            else if (waitingFirst) { waitingFirst = false; setWaiting(false); lobbyEnds = now + LOBBY_S; }
            else lobbyEnds = Math.min(now + LOBBY_MAX_S, Math.max(lobbyEnds, now + 3)); // un nouveau venu laisse le temps au suivant
            if (phaseRef.current === "attract") go("lobby");
          });
          return;
        }
        if (ph === "play" && game) onEvents(game, game.step(pts));
      },
      onPresence: (pts) => { presence = pts; engine.lookFrom(pts); },
    }, s.ws);

    if (s.debug) (window as unknown as { __rooftop?: unknown }).__rooftop = {
      phase: () => phaseRef.current, game: () => game, lineup: () => line,
      // Image du rendu en cours (vignettes, captures de reglage sur site).
      snapshot: (type = "image/jpeg") => { engine.render(0); return canvas.toDataURL(type, 0.88); },
    };

    const sideViews = () => line.sides.map((side, i) => ({ ...sideIdentity(line, i), score: game?.sides[i].score ?? 0, mult: game ? game.multiplierOf(i) : 1, zone: side.zone }));
    const timing = (g: RooftopGame) => ({ warn: g.c.warnSeconds, sink: g.c.sinkSeconds, rise: g.c.riseSeconds });

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
        preview.update(dt);
        preview.logos = [];
        engine.frost += (0.5 - engine.frost) * 0.05;
        engine.syncCity(preview.buildings, preview.t, timing(preview));
        engine.syncLogos([], now);
        if (ph === "lobby") {
          setLobbyLeft(Math.max(0, Math.ceil(lobbyEnds - now)));
          if (now >= lobbyEnds && picked.length === 0) {
            // Personne n'est monte : retour a l'accueil.
            resetLobby();
            go("attract");
          } else if (now >= lobbyEnds) {
            line = lineup(s.size, picked, mode === "teams");
            const ids = line.sides.map((_, i) => sideIdentity(line, i));
            engine.setOwnerColors(ids.map((x) => x.color));
            engine.setZones(line.sides.map((x) => x.zone), ids.map((x) => x.color), 1);
            game = new RooftopGame({ size: s.size, roundSeconds: s.seconds, zones: line.sides.map((x) => x.zone) });
            setSides(sideViews());
            audio.freeze();
            go("freeze");
          }
        }
      } else if (ph === "freeze" && game) {
        // Le verre des vides givre, les zones s'allument, 3-2-1 : on rejoint sa zone.
        engine.frost = Math.min(game.c.frostStart, engine.frost + dt);
        engine.syncCity(game.buildings, game.t, timing(game));
        engine.syncLogos([], now);
        const c = Math.ceil(COUNT_S - (t - FREEZE_S));
        if (t > FREEZE_S && c !== lastCount && c > 0) { lastCount = c; setCount(c); audio.tick(); }
        if (t > FREEZE_S + COUNT_S) {
          lastCount = -1;
          setCount(0);
          audio.tick(true);
          engine.setZones(line.sides.map((x) => x.zone), line.sides.map((_, i) => sideIdentity(line, i).color), 0.2);
          audio.startPulse(() => 100 + 60 * (game ? progress(game.t, game.c) : 0));
          go("play");
        }
      } else if (ph === "play" && game) {
        onEvents(game, game.update(dt, presence));
        engine.frost = frostAt(game.t, game.c);
        engine.syncCity(game.buildings, game.t, timing(game));
        engine.syncLogos(game.logos, game.t);
        if (now - hudAt > 0.1) { hudAt = now; setSides(sideViews()); setTime(Math.ceil(game.c.roundSeconds - game.t)); }
        if (game.over) {
          audio.stopPulse();
          audio.shatter();
          // Final : tous les toits libres s'effondrent d'un coup, le vide s'ouvre.
          for (const b of game.buildings) if (b.state === "up" || b.state === "rising") { b.state = "warning"; b.since = game.t - game.c.warnSeconds + 0.15; }
          setSides(sideViews());
          go("reveal");
        }
      } else if (ph === "reveal" && game) {
        engine.frost = Math.max(0, engine.frost - dt * 0.5);
        const g = game;
        g.t += dt;
        for (const b of g.buildings) {
          if (b.state === "warning" && g.t - b.since >= g.c.warnSeconds) { b.state = "sinking"; b.since = g.t; }
          else if (b.state === "sinking" && g.t - b.since >= g.c.sinkSeconds * 2) { b.state = "gone"; b.since = g.t; }
        }
        engine.syncCity(g.buildings, g.t, { ...timing(g), sink: g.c.sinkSeconds * 2 });
        engine.syncLogos(g.logos, g.t);
        engine.setZones(line.sides.map((x) => x.zone), line.sides.map((_, i) => sideIdentity(line, i).color), Math.max(0, 0.2 - t * 0.2));
        if (t > REVEAL_S) {
          const ranking = g.ranking().map((r) => ({ ...sideIdentity(line, r.i), score: r.score, logos: r.logos, falls: r.falls, bestCombo: r.bestCombo }));
          const top = ranking[0]?.score ?? 0;
          const best = readBest();
          const record = top > best;
          if (record) writeBest(top);
          setResult({ ranking, mode: line.mode, best: Math.max(best, top), record });
          go("results");
        }
      } else if (ph === "results") {
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
  }, [s.size, s.seconds, s.logo, s.ws, s.debug, s.mode, s.tone]);

  useEffect(() => { engineRef.current?.resize(box.size); }, [box.size]);

  const pct = (v: number) => `${(v / s.size + 0.5) * 100}%`;
  const u = box.size;
  const pads = chosen ? padsFor(chosen, s.size) : [];
  const plate = (border: string): React.CSSProperties => ({ background: PLATE, border: `${Math.max(1, u * 0.002)}px solid ${border}`, borderRadius: u * 0.012, padding: `${u * 0.006}px ${u * 0.016}px` });

  return (
    <main className="fixed inset-0 overflow-hidden bg-black select-none" style={{ cursor: s.debug ? "crosshair" : "none", color: INK }}>
      <div ref={boxRef} className="absolute touch-none" style={{ width: u, height: u, left: box.left, top: box.top }}>
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

        {popups.map((p) => (
          <span key={p.id} className="fm-display pointer-events-none absolute roof-pop"
            style={{ left: pct(p.x), top: pct(p.z), fontSize: u * 0.04, color: p.color, textShadow: outline("rgba(255,45,149,.7)") }}>
            {p.text}
          </span>
        ))}

        {(phase === "attract" || phase === "lobby") && (
          <>
            <Mirror edge>
              <div className="flex flex-col items-center" style={plate("rgba(25,230,214,.55)")}>
                <p className="fm-display roof-neon" style={{ fontSize: u * 0.065 }}>ROOFTOP</p>
                <p className="fm-display" style={{ fontSize: u * 0.021, color: INK }}>
                  {chosen === null ? "Choisis ton mode : marche sur sa plaque"
                    : chosen === "solo" ? "Marche sur le cercle pour jouer"
                    : waiting ? (chosen === "teams" ? "Rose en bas, turquoise en haut · montez sur vos plaques" : "Chacun sur sa couleur")
                    : `Départ dans ${lobbyLeft} · les autres, montez !`}
                </p>
              </div>
            </Mirror>
            {pads.map((p, i) => {
              const on = joined.includes(i);
              const k = teams ? (i <= 1 ? 0 : 1) : i;
              return (
                <div key={i}>
                  {/* Plaque d'inscription : anneau de couleur pose sur les toits. */}
                  <div className="pointer-events-none absolute rounded-full"
                    style={{
                      left: pct(p.x), top: pct(p.z), width: `${(PAD_RADIUS * 2 / s.size) * 100}%`, height: `${(PAD_RADIUS * 2 / s.size) * 100}%`,
                      transform: "translate(-50%,-50%)", border: `${u * 0.008}px solid ${SIDE_HEX[k]}`,
                      background: on ? `${SIDE_HEX[k]}55` : "rgba(9,5,18,.55)", boxShadow: `0 0 ${u * 0.03}px ${SIDE_HEX[k]}, inset 0 0 ${u * 0.02}px ${SIDE_HEX[k]}`,
                    }} />
                  <div className="pointer-events-none absolute flex flex-col items-center"
                    style={{ left: pct(p.x), top: pct(p.z + (p.z >= 0 ? 0.6 : -0.6)), transform: `translate(-50%,-50%) rotate(${p.z >= 0 ? 0 : 180}deg)`, ...plate(SIDE_HEX[k]) }}>
                    <span className="fm-display" style={{ fontSize: u * 0.028, color: SIDE_TEXT[k], textShadow: outline(SIDE_HEX[k]) }}>{chosen === "solo" ? "JOUER" : on ? "PRÊT" : `J${i + 1}`}</span>
                    {teams && <span className="fm-grotesk" style={{ fontSize: u * 0.016, color: INK }}>Équipe {TEAM_NAMES[k]}</span>}
                  </div>
                </div>
              );
            })}
            {/* Accueil : une plaque par mode, etiquette lisible des deux cotes du sol. */}
            {chosen === null && menuPads(s.size).map((p) => (
              <div key={p.m}>
                <div className="pointer-events-none absolute rounded-full"
                  style={{
                    left: pct(p.x), top: pct(p.z), width: `${(PAD_RADIUS * 2 / s.size) * 100}%`, height: `${(PAD_RADIUS * 2 / s.size) * 100}%`,
                    transform: "translate(-50%,-50%)", border: `${u * 0.008}px solid ${MODE_COLOR[p.m]}`, background: "rgba(9,5,18,.6)",
                    boxShadow: `0 0 ${u * 0.03}px ${MODE_COLOR[p.m]}, inset 0 0 ${u * 0.02}px ${MODE_COLOR[p.m]}`,
                  }} />
                {[1, -1].map((side) => (
                  <div key={side} className="pointer-events-none absolute flex flex-col items-center"
                    style={{ left: pct(p.x), top: pct(p.z + side * 0.62), transform: `translate(-50%,-50%) rotate(${side > 0 ? 0 : 180}deg)`, ...plate(MODE_COLOR[p.m]) }}>
                    <span className="fm-display whitespace-nowrap" style={{ fontSize: u * 0.03, color: INK, textShadow: outline(MODE_COLOR[p.m]) }}>{MODE_LABEL[p.m]}</span>
                    <span className="fm-grotesk whitespace-nowrap" style={{ fontSize: u * 0.016, color: MUTED }}>{MODE_HINT[p.m]}</span>
                  </div>
                ))}
              </div>
            ))}
          </>
        )}

        {phase === "freeze" && count > 0 && (
          <div className="pointer-events-none absolute inset-0 grid place-items-center">
            <p key={count} className="fm-display roof-count" style={{ fontSize: u * 0.3 }}>{count}</p>
          </div>
        )}

        {(phase === "freeze" || phase === "play" || phase === "reveal") && sides.map((sd, i) => (
          <SideLabel key={i} zone={sd.zone} size={s.size} u={u} style={plate(sd.color)}>
            <span className="fm-display" style={{ fontSize: u * 0.032, color: sides.length > 1 ? sd.text : INK, textShadow: outline(sd.color) }}>
              {sd.name ? `${sd.name} · ` : ""}{sd.score.toLocaleString("fr-FR")}
            </span>
            {sd.mult > 1 && <span className="fm-display" style={{ fontSize: u * 0.028, color: "#5ff5e6", marginInline: u * 0.015, textShadow: outline("#19e6d6") }}>×{sd.mult}</span>}
            <span className="fm-display" style={{ fontSize: u * 0.025, color: time <= 10 ? DANGER : INK, marginInlineStart: u * 0.02 }}>{time}s</span>
          </SideLabel>
        ))}

        {phase === "results" && result && (
          <Mirror>
            <div className="flex flex-col items-center text-center" style={{ gap: u * 0.006, ...plate(result.ranking[0].color) }}>
              {result.record && <p className="fm-display" style={{ fontSize: u * 0.026, color: "#ffd166" }}>Record du jour</p>}
              {result.mode === "solo" ? (
                <>
                  <p className="fm-display roof-neon" style={{ fontSize: u * 0.1 }}>{result.ranking[0].score.toLocaleString("fr-FR")}</p>
                  <p className="fm-grotesk" style={{ fontSize: u * 0.02, color: INK }}>
                    {result.ranking[0].logos} logos · {result.ranking[0].falls} chute{result.ranking[0].falls > 1 ? "s" : ""} · combo {result.ranking[0].bestCombo}
                  </p>
                </>
              ) : (
                <>
                  <p className="fm-display" style={{ fontSize: u * 0.06, color: result.ranking[0].text, textShadow: outline(result.ranking[0].color) }}>
                    {result.ranking[0].score === result.ranking[1]?.score ? "Égalité !" : `${result.ranking[0].name} gagne`}
                  </p>
                  <div className="flex items-baseline" style={{ gap: u * 0.03 }}>
                    {result.ranking.map((r) => (
                      <span key={r.name} className="fm-display" style={{ fontSize: u * 0.028, color: r.text, textShadow: outline(r.color) }}>{r.name} {r.score.toLocaleString("fr-FR")}</span>
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
        .roof-neon { color: #fff; text-shadow: 0 0 2px #05020a, 0 0 10px #19e6d6, 0 0 34px #19e6d6, 0 0 70px #ff2d95; }
        .roof-pop { transform: translate(-50%,-50%); animation: roofPop .9s cubic-bezier(.2,.8,.2,1) forwards; }
        @keyframes roofPop { 0% { opacity: 0; transform: translate(-50%,-50%) scale(.6); } 15% { opacity: 1; transform: translate(-50%,-80%) scale(1.15); } 100% { opacity: 0; transform: translate(-50%,-160%) scale(1); } }
        .roof-count { color: #fff; text-shadow: 0 0 3px #05020a, 0 0 30px #19e6d6, 0 0 90px #ff2d95; animation: roofCount 1s ease-out forwards; }
        @keyframes roofCount { from { opacity: 1; transform: scale(1.4); } to { opacity: 0; transform: scale(.8); } }
      `}</style>
    </main>
  );
}

function Mirror({ children, edge }: { children: React.ReactNode; edge?: boolean }) {
  return (
    <div className="pointer-events-none absolute inset-0">
      <div className={`absolute inset-x-0 flex justify-center ${edge ? "bottom-[2%]" : "bottom-[14%]"}`}>{children}</div>
      <div className={`absolute inset-x-0 flex rotate-180 justify-center ${edge ? "top-[2%]" : "top-[14%]"}`}>{children}</div>
    </div>
  );
}

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
