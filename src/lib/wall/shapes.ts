import type { PlacedSticker, Pos, Stroke } from "./types";

// Validation des formes envoyees par les telephones (dessins, stickers,
// positions). Tout est borne : un client trafique ne peut ni grossir la base,
// ni sortir une carte du mur.

const HEX = /^#[0-9a-fA-F]{6}$/;
export const MAX_STROKES = 120;
export const MAX_POINTS = 4000; // points au total, tous traits confondus

const clamp = (n: number, a: number, b: number) => Math.min(b, Math.max(a, n));
const num = (v: unknown) => (typeof v === "number" && Number.isFinite(v) ? v : null);

export function parseStrokes(raw: unknown): Stroke[] | null {
  if (!Array.isArray(raw) || raw.length === 0 || raw.length > MAX_STROKES) return null;
  let total = 0;
  const out: Stroke[] = [];
  for (const s of raw) {
    if (!s || typeof s !== "object") return null;
    const { c, w, p } = s as Record<string, unknown>;
    if (typeof c !== "string" || !HEX.test(c)) return null;
    const width = num(w);
    if (width === null || !Array.isArray(p) || p.length < 2 || p.length % 2) return null;
    const pts: number[] = [];
    for (const v of p) {
      const n = num(v);
      if (n === null) return null;
      pts.push(Math.round(clamp(n, 0, 1000)));
    }
    total += pts.length / 2;
    if (total > MAX_POINTS) return null;
    out.push({ c, w: Math.round(clamp(width, 2, 80)), p: pts });
  }
  return out;
}

export function parseStickers(raw: unknown, allowed: Set<string>, max: number): PlacedSticker[] {
  if (!Array.isArray(raw)) return [];
  const out: PlacedSticker[] = [];
  for (const s of raw.slice(0, max)) {
    if (!s || typeof s !== "object") continue;
    const { id, x, y, s: size, r } = s as Record<string, unknown>;
    if (typeof id !== "string" || !allowed.has(id)) continue;
    const [nx, ny, ns, nr] = [num(x), num(y), num(size), num(r)];
    if (nx === null || ny === null || ns === null || nr === null) continue;
    out.push({ id, x: round3(clamp(nx, 0, 1)), y: round3(clamp(ny, 0, 1)), s: round3(clamp(ns, 0.08, 0.9)), r: Math.round(clamp(nr, -180, 180)) });
  }
  return out;
}

const round3 = (n: number) => Math.round(n * 1000) / 1000;

/** Position validee, gardee dans le mur (la carte reste visible). */
export function parsePos(x: unknown, y: unknown, r: unknown): Omit<Pos, "z"> | null {
  const [nx, ny, nr] = [num(x), num(y), num(r) ?? 0];
  if (nx === null || ny === null) return null;
  return { x: round3(clamp(nx, 0.04, 0.96)), y: round3(clamp(ny, 0.06, 0.94)), r: Math.round(clamp(nr, -20, 20)) };
}

/**
 * Place une nouvelle carte : suite de Halton (bien repartie, sans tas), avec
 * une petite rotation. Deterministe a partir du rang, donc testable.
 */
export function autoPos(rank: number, z: number): Pos {
  const halton = (i: number, b: number) => {
    let f = 1, r = 0;
    while (i > 0) { f /= b; r += f * (i % b); i = Math.floor(i / b); }
    return r;
  };
  const i = rank + 1;
  const x = 0.09 + halton(i, 2) * 0.82;
  const y = 0.14 + halton(i, 3) * 0.72;
  const r = Math.round((halton(i, 5) - 0.5) * 12);
  return { x: round3(x), y: round3(y), r, z };
}

/** Ordre d'empilement : le dernier touche passe devant. Secondes depuis 2026. */
export const zNow = () => Math.floor((Date.now() - Date.UTC(2026, 0, 1)) / 1000);
