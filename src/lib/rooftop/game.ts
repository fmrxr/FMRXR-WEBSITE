// ROOFTOP : logique de jeu pure (testee a part).
//
// Le sol LED est une grille de cases de 50 cm (une dalle = une case, la
// resolution reelle des capteurs). Chaque case est un toit de gratte-ciel ou
// un vide au-dessus de la ville neon. Les joueurs marchent de toit en toit et
// ramassent les logos poses dessus ; marcher dans le vide, ou rester sur un
// toit qui s'effondre, c'est chuter. La ville bouge : des immeubles
// s'enfoncent (apres un avertissement), d'autres montent, et la part de vide
// grandit pendant la manche. Mecanique « le sol est de la lave », la plus
// jouee sur ce type de sol (rapport STOMP, Groundfall chez Valo).
//
// Un sol sait OU on marche, jamais QUI : chaque camp a sa zone (cf. lineup()
// de STOMP, reutilise tel quel).

import type { Zone } from "@/lib/stomp/game";
import { rng } from "@/lib/stomp/game";

export const CELL = 0.5; // m, une dalle LED

export type Building = {
  id: number;
  c0: number; r0: number; w: number; h: number; // en cases
  state: "up" | "warning" | "sinking" | "rising" | "gone";
  since: number; // s, debut de l'etat
  style: number; // 0..1, tire au hasard : piscine, heliport, enseigne...
};

export type Logo = { id: number; c: number; r: number; owner: number; kind: "brand" | "gold"; bornAt: number; life: number; takenAt: number | null; gone: boolean };

export type SideStats = { score: number; logos: number; falls: number; combo: number; bestCombo: number; lastAt: number };

export type RoofEvent =
  | { type: "collect"; logo: Logo; points: number; combo: number; side: number }
  | { type: "fall"; c: number; r: number; side: number; points: number };

export type RooftopConfig = {
  size: number; // m
  zones: Zone[] | null;
  roundSeconds: number;
  warnSeconds: number; // un toit clignote avant de s'enfoncer
  sinkSeconds: number;
  riseSeconds: number;
  shiftStart: number; // s entre deux changements de la ville, en debut de manche
  shiftEnd: number;
  voidStart: number; // part de vide visee
  voidEnd: number;
  logoLifeStart: number;
  logoLifeEnd: number;
  logosPerZone: number;
  goldChance: number;
  points: { brand: number; gold: number; fall: number };
  comboWindow: number;
  comboStep: number;
  maxMultiplier: number;
  fallCooldown: number; // s : un meme pied dans le meme vide ne compte qu'une chute
  frostStart: number;
  frostEnd: number;
};

export const DEFAULT_ROOFTOP: RooftopConfig = {
  size: 4,
  zones: null,
  roundSeconds: 75,
  warnSeconds: 1.6,
  sinkSeconds: 0.9,
  riseSeconds: 0.9,
  shiftStart: 4.5,
  shiftEnd: 1.6,
  voidStart: 0.22,
  voidEnd: 0.45,
  logoLifeStart: 5,
  logoLifeEnd: 2.4,
  logosPerZone: 2,
  goldChance: 0.12,
  points: { brand: 100, gold: 300, fall: -80 },
  comboWindow: 2.2,
  comboStep: 3,
  maxMultiplier: 4,
  fallCooldown: 1.2,
  frostStart: 0.85,
  frostEnd: 0.05,
};

const lerp = (a: number, b: number, k: number) => a + (b - a) * k;
export const progress = (t: number, c: RooftopConfig) => Math.min(1, Math.max(0, t / c.roundSeconds));
export const frost = (t: number, c: RooftopConfig) => lerp(c.frostStart, c.frostEnd, Math.pow(progress(t, c), 1.3));

export class RooftopGame {
  readonly c: RooftopConfig;
  readonly n: number; // cases par cote
  readonly zones: Zone[];
  readonly sides: SideStats[];
  t = 0;
  buildings: Building[] = [];
  logos: Logo[] = [];
  private nextId = 1;
  private shiftTimer = 0;
  private rand: () => number;
  private lastFall = new Map<string, number>();
  private wasRoof = new Set<string>();

  constructor(config: Partial<RooftopConfig> = {}, seed = Date.now()) {
    this.c = { ...DEFAULT_ROOFTOP, ...config, points: { ...DEFAULT_ROOFTOP.points, ...config.points } };
    this.n = Math.max(4, Math.round(this.c.size / CELL));
    const h = this.c.size / 2;
    this.zones = this.c.zones?.length ? this.c.zones : [{ x0: -h, x1: h, z0: -h, z1: h }];
    this.sides = this.zones.map(() => ({ score: 0, logos: 0, falls: 0, combo: 0, bestCombo: 0, lastAt: -99 }));
    this.rand = rng(seed);
    this.initialCity();
    this.shiftTimer = this.c.shiftStart;
  }

  get over() { return this.t >= this.c.roundSeconds; }
  get score() { return this.sides.reduce((s, x) => s + x.score, 0); }
  multiplierOf(side: number) { return Math.min(this.c.maxMultiplier, 1 + Math.floor(this.sides[side].combo / this.c.comboStep)); }

  // --- Geometrie --------------------------------------------------------------

  cellCenter(c: number, r: number) { return { x: -this.c.size / 2 + (c + 0.5) * CELL, z: -this.c.size / 2 + (r + 0.5) * CELL }; }
  cellAt(x: number, z: number) {
    const c = Math.floor((x + this.c.size / 2) / CELL), r = Math.floor((z + this.c.size / 2) / CELL);
    return c >= 0 && r >= 0 && c < this.n && r < this.n ? { c, r } : null;
  }
  sideOf(c: number, r: number) {
    const p = this.cellCenter(c, r);
    const i = this.zones.findIndex((z) => p.x >= z.x0 && p.x <= z.x1 && p.z >= z.z0 && p.z <= z.z1);
    return i < 0 ? 0 : i;
  }
  buildingAt(c: number, r: number) {
    return this.buildings.find((b) => b.state !== "gone" && c >= b.c0 && c < b.c0 + b.w && r >= b.r0 && r < b.r0 + b.h) ?? null;
  }
  /** Un toit sur lequel on peut se tenir (debout, ou en train de clignoter). */
  isRoof(c: number, r: number) {
    const b = this.buildingAt(c, r);
    if (!b) return false;
    if (b.state === "up" || b.state === "warning") return true;
    // Un immeuble qui monte devient praticable aux deux tiers de sa montee.
    return b.state === "rising" && this.t - b.since >= this.c.riseSeconds * 0.66;
  }
  voidShare() {
    let v = 0;
    for (let c = 0; c < this.n; c++) for (let r = 0; r < this.n; r++) if (!this.isRoof(c, r)) v++;
    return v / (this.n * this.n);
  }

  // --- Ville ------------------------------------------------------------------

  /** `gap` : cases de rue exigees autour (1 = une rue d'un pas entre deux toits, 0 = toits mitoyens). */
  private fits(c0: number, r0: number, w: number, h: number, gap: number) {
    if (c0 < 0 || r0 < 0 || c0 + w > this.n || r0 + h > this.n) return false;
    return !this.buildings.some((b) => b.state !== "gone" && c0 < b.c0 + b.w + gap && c0 + w + gap > b.c0 && r0 < b.r0 + b.h + gap && r0 + h + gap > b.r0);
  }

  private tryPlace(state: Building["state"], gap = 1, maxSide = 3) {
    for (let k = 0; k < 40; k++) {
      const w = 1 + Math.floor(this.rand() * maxSide), h = 1 + Math.floor(this.rand() * maxSide);
      const c0 = Math.floor(this.rand() * (this.n - w + 1)), r0 = Math.floor(this.rand() * (this.n - h + 1));
      if (!this.fits(c0, r0, w, h, gap)) continue;
      const b: Building = { id: this.nextId++, c0, r0, w, h, state, since: this.t, style: this.rand() };
      this.buildings.push(b);
      return b;
    }
    return null;
  }

  private initialCity() {
    // D'abord des immeubles separes par des rues d'un pas, puis des toits
    // mitoyens dans les rues jusqu'a la part de vide de depart : beaucoup de
    // toits au debut, la ville se creuse ensuite.
    for (let i = 0; i < 200; i++) this.tryPlace("up");
    for (let i = 0; i < 400 && this.voidShare() > this.c.voidStart; i++) this.tryPlace("up", 0, 2);
  }

  /** Un changement de la ville : un immeuble s'enfonce (apres avertissement) et/ou un autre monte. */
  private shift() {
    const target = lerp(this.c.voidStart, this.c.voidEnd, progress(this.t, this.c));
    const standing = this.buildings.filter((b) => b.state === "up");
    if (this.voidShare() < target && standing.length > 2) {
      const b = standing[Math.floor(this.rand() * standing.length)];
      b.state = "warning"; b.since = this.t;
    }
    // Toujours un peu de neuf : la ville reste vivante meme quand la cible est atteinte.
    if (this.voidShare() > target - 0.05 || this.rand() < 0.5) this.tryPlace("rising", this.rand() < 0.5 ? 0 : 1, 2);
  }

  // --- Boucle -----------------------------------------------------------------

  update(dt: number, presence: { x: number; z: number }[] = []): RoofEvent[] {
    if (this.over) return [];
    this.t = Math.min(this.c.roundSeconds, this.t + dt);
    const events: RoofEvent[] = [];
    for (const b of this.buildings) {
      const age = this.t - b.since;
      if (b.state === "warning" && age >= this.c.warnSeconds) { b.state = "sinking"; b.since = this.t; }
      else if (b.state === "sinking" && age >= this.c.sinkSeconds) { b.state = "gone"; b.since = this.t; }
      else if (b.state === "rising" && age >= this.c.riseSeconds) { b.state = "up"; b.since = this.t; }
    }
    this.buildings = this.buildings.filter((b) => b.state !== "gone" || this.t - b.since < 1);

    // Les logos sur un toit qui s'enfonce tombent avec lui.
    for (const l of this.logos) {
      if (l.gone) continue;
      const b = this.buildingAt(l.c, l.r);
      if (!b || b.state === "sinking" || this.t - l.bornAt > l.life) { l.gone = true; this.sides[l.owner].combo = 0; }
    }
    this.logos = this.logos.filter((l) => !l.gone || (l.takenAt !== null && this.t - l.takenAt < 1));

    this.shiftTimer -= dt;
    if (this.shiftTimer <= 0) {
      this.shift();
      this.shiftTimer = lerp(this.c.shiftStart, this.c.shiftEnd, progress(this.t, this.c));
    }
    this.spawnLogos();
    for (const s of this.sides) if (this.t - s.lastAt > this.c.comboWindow) s.combo = 0;

    // Rester sur un toit qui disparait sous ses pieds : chute.
    const roofNow = new Set<string>();
    for (const p of presence) {
      const cell = this.cellAt(p.x, p.z);
      if (!cell) continue;
      const key = `${cell.c},${cell.r}`;
      if (this.isRoof(cell.c, cell.r)) roofNow.add(key);
      else if (this.wasRoof.has(key)) { const ev = this.fall(cell.c, cell.r); if (ev) events.push(ev); }
    }
    this.wasRoof = roofNow;
    return events;
  }

  private spawnLogos() {
    const prog = progress(this.t, this.c);
    for (let side = 0; side < this.zones.length; side++) {
      const mine = this.logos.filter((l) => !l.gone && l.owner === side).length;
      if (mine >= this.c.logosPerZone + Math.round(prog)) continue;
      // Une case de toit stable (pas en alerte), dans la zone, sans logo deja pose.
      const cells: { c: number; r: number }[] = [];
      for (let c = 0; c < this.n; c++) for (let r = 0; r < this.n; r++) {
        const b = this.buildingAt(c, r);
        if (b?.state !== "up" || this.sideOf(c, r) !== side) continue;
        if (this.logos.some((l) => !l.gone && l.c === c && l.r === r)) continue;
        cells.push({ c, r });
      }
      if (!cells.length) continue;
      const { c, r } = cells[Math.floor(this.rand() * cells.length)];
      this.logos.push({
        id: this.nextId++, c, r, owner: side, kind: this.rand() < this.c.goldChance ? "gold" : "brand",
        bornAt: this.t, life: lerp(this.c.logoLifeStart, this.c.logoLifeEnd, prog), takenAt: null, gone: false,
      });
    }
  }

  private fall(c: number, r: number): RoofEvent | null {
    const key = `${c},${r}`;
    if (this.t - (this.lastFall.get(key) ?? -99) < this.c.fallCooldown) return null;
    this.lastFall.set(key, this.t);
    const side = this.sideOf(c, r);
    const s = this.sides[side];
    s.falls++;
    s.combo = 0;
    s.score = Math.max(0, s.score + this.c.points.fall);
    return { type: "fall", c, r, side, points: this.c.points.fall };
  }

  /** Nouveaux appuis : ramasser un logo, ou chuter dans le vide. */
  step(points: { x: number; z: number }[]): RoofEvent[] {
    if (this.over) return [];
    const events: RoofEvent[] = [];
    for (const p of points) {
      const cell = this.cellAt(p.x, p.z);
      if (!cell) continue;
      if (!this.isRoof(cell.c, cell.r)) {
        const ev = this.fall(cell.c, cell.r);
        if (ev) events.push(ev);
        continue;
      }
      const logo = this.logos.find((l) => !l.gone && l.c === cell.c && l.r === cell.r);
      if (!logo) continue;
      logo.gone = true;
      logo.takenAt = this.t;
      const s = this.sides[logo.owner];
      s.combo = this.t - s.lastAt <= this.c.comboWindow ? s.combo + 1 : 1;
      s.lastAt = this.t;
      s.bestCombo = Math.max(s.bestCombo, s.combo);
      s.logos++;
      const pts = this.c.points[logo.kind] * this.multiplierOf(logo.owner);
      s.score += pts;
      events.push({ type: "collect", logo, points: pts, combo: s.combo, side: logo.owner });
    }
    return events;
  }

  ranking() {
    return this.sides.map((s, i) => ({ i, ...s })).sort((a, b) => b.score - a.score);
  }
}
