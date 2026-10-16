// Entrees de STOMP : d'ou viennent les pieds.
//
// 1. Pointeurs du navigateur (souris, tactile, stylet) : simulateur sur un
//    ordinateur, ou sol qui se presente comme un ecran tactile.
// 2. Relais local par WebSocket (?ws=ws://127.0.0.1:7777) : les capteurs des
//    sols LED (BrightLogic, OEM) et les capteurs ajoutes (LiDAR, camera IR)
//    passent par un petit programme sur le PC du sol, qui envoie :
//      { "type": "down", "points": [[u, v], ...] }   u, v en 0..1 : nouveaux appuis
//      { "type": "cells", "cols": 32, "rows": 32, "on": [[i, j], ...] }   grille occupee
//    Pour une grille, seules les cases qui viennent de s'allumer comptent comme
//    un pas (rester debout sur une case ne marque pas en boucle).
//
// Coordonnees rendues en metres sur le sol, origine au centre, -z en haut de
// l'ecran (comme la camera du moteur).

export type FloorPoint = { x: number; z: number };

export type InputHandlers = {
  onStomp: (points: FloorPoint[]) => void; // nouveaux appuis
  onPresence: (points: FloorPoint[]) => void; // tous les appuis actuels (parallaxe)
};

export function attachInput(el: HTMLElement, size: number, h: InputHandlers, wsUrl?: string | null) {
  const toFloor = (u: number, v: number): FloorPoint => ({ x: (u - 0.5) * size, z: (v - 0.5) * size });
  const pointers = new Map<number, FloorPoint>();
  const fromEvent = (e: PointerEvent) => {
    const r = el.getBoundingClientRect();
    return toFloor((e.clientX - r.left) / r.width, (e.clientY - r.top) / r.height);
  };
  let wsPresence: FloorPoint[] = [];
  const presence = () => h.onPresence([...pointers.values(), ...wsPresence]);

  const down = (e: PointerEvent) => {
    e.preventDefault();
    const p = fromEvent(e);
    pointers.set(e.pointerId, p);
    h.onStomp([p]);
    presence();
  };
  const move = (e: PointerEvent) => {
    if (!pointers.has(e.pointerId)) return;
    pointers.set(e.pointerId, fromEvent(e));
    presence();
  };
  const up = (e: PointerEvent) => { pointers.delete(e.pointerId); presence(); };
  el.addEventListener("pointerdown", down);
  el.addEventListener("pointermove", move);
  el.addEventListener("pointerup", up);
  el.addEventListener("pointercancel", up);
  el.addEventListener("pointerleave", up);

  // Relais du sol.
  let ws: WebSocket | null = null;
  let retry: number | null = null;
  let closed = false;
  let prevCells = new Set<string>();
  const connect = () => {
    if (!wsUrl || closed) return;
    try { ws = new WebSocket(wsUrl); } catch { return; }
    ws.onmessage = (m) => {
      let msg: { type?: string; points?: [number, number][]; cols?: number; rows?: number; on?: [number, number][] };
      try { msg = JSON.parse(String(m.data)); } catch { return; }
      if (msg.type === "down" && Array.isArray(msg.points)) {
        const pts = msg.points.filter(validUV).map(([u, v]) => toFloor(u, v));
        if (pts.length) h.onStomp(pts);
      } else if (msg.type === "cells" && msg.cols && msg.rows && Array.isArray(msg.on)) {
        const cols = msg.cols, rows = msg.rows;
        const now = new Set(msg.on.map(([i, j]) => `${i},${j}`));
        const center = ([i, j]: number[]) => toFloor((i + 0.5) / cols, (j + 0.5) / rows);
        const fresh = msg.on.filter(([i, j]) => !prevCells.has(`${i},${j}`)).map(center);
        prevCells = now;
        wsPresence = msg.on.map(center);
        if (fresh.length) h.onStomp(fresh);
        presence();
      }
    };
    ws.onclose = () => { if (!closed) retry = window.setTimeout(connect, 1500); };
  };
  connect();

  return () => {
    closed = true;
    if (retry) window.clearTimeout(retry);
    ws?.close();
    el.removeEventListener("pointerdown", down);
    el.removeEventListener("pointermove", move);
    el.removeEventListener("pointerup", up);
    el.removeEventListener("pointercancel", up);
    el.removeEventListener("pointerleave", up);
  };
}

const validUV = (p: unknown): p is [number, number] =>
  Array.isArray(p) && p.length === 2 && p.every((n) => typeof n === "number" && n >= 0 && n <= 1);
