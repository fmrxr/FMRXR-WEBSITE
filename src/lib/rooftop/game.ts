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
//
// Mode « coureur » (scroll) : la ville defile vers le bas du sol comme un
// tapis roulant, facon jeu de course sans fin mais au sol. Les toits et les
// logos arrivent par le haut ; qui reste immobile voit son toit partir et
// tombe. SECURITE : vitesse douce (15 cm/s au depart, 45 cm/s au plus, un pas
// normal fait ~1,3 m/s), acceleration surtout en fin de manche, et jamais plus
// d'une case de rue (50 cm) entre deux toits : on passe d'un pas, sans sauter.
// En mode coureur, les rangees des immeubles et des logos sont des rangees du
// MONDE ; rangee du sol = rangee du monde + scroll.

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
/** Proprietaire « neutre » : en mode coureur, un logo compte pour la zone ou on le ramasse. */
export const NEUTRAL = -1;

export type SideStats = { score: number; logos: number; falls: number; combo: number; bestCombo: number; lastAt: number };

export type RoofEvent =
  | { type: "collect"; logo: Logo; points: number; combo: number; side: number; x: number; z: number }
  | { type: "fall"; c: number; r: number; side: number; points: number; x: number; z: number };

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
  scroll: boolean; // mode coureur : la ville defile
  speedStart: number; // cases/s (0,3 = 15 cm/s)
  speedEnd: number; // cases/s (0,9 = 45 cm/s)
  streetChance: number; // probabilite d'une rue d'une case entre deux bandes d'immeubles
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
  scroll: false,
  speedStart: 0.3,
  speedEnd: 0.9,
  streetChance: 0.55,
};

const lerp = (a: number, b: number, k: number) => a + (b - a) * k;
export const progress = (t: number, c: RooftopConfig) => Math.min(1, Math.max(0, t / c.roundSeconds));
export const frost = (t: number, c: RooftopConfig) => lerp(c.frostStart, c.frostEnd, Math.pow(progress(t, c), 1.3));
/** Vitesse du defilement : douce longtemps, puis plus vive vers la fin (courbe p^2,5). */
export const speedAt = (t: number, c: RooftopConfig) => lerp(c.speedStart, c.speedEnd, Math.pow(progress(t, c), 2.5));

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
  /** Mode coureur : de combien de cases la ville a defile (rangee du sol = rangee du monde + scroll). */
  scroll = 0;
  private genTop = 0; // plus haute rangee du monde deja construite
  private lastAlleys = new Set<number>(); // ruelles de la derniere bande
  private lastStreet = false; // une rue la separe de la prochaine

  constructor(config: Partial<RooftopConfig> = {}, seed = Date.now()) {
    this.c = { ...DEFAULT_ROOFTOP, ...config, points: { ...DEFAULT_ROOFTOP.points, ...config.points } };
    this.n = Math.max(4, Math.round(this.c.size / CELL));
    const h = this.c.size / 2;
    this.zones = this.c.zones?.length ? this.c.zones : [{ x0: -h, x1: h, z0: -h, z1: h }];
    this.sides = this.zones.map(() => ({ score: 0, logos: 0, falls: 0, combo: 0, bestCombo: 0, lastAt: -99 }));
    this.rand = rng(seed);
    if (this.c.scroll) this.fillRunway(); else this.initialCity();
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
  /** Rangee du monde sous la rangee (fractionnaire) du sol `rf`. */
  worldRow(rf: number) { return Math.floor(rf - this.scroll); }
  /** Centre, sur le sol, d'une case du monde (mode coureur) ou du sol (mode fixe). */
  floorPos(c: number, wr: number) {
    const k = this.c.scroll ? this.scroll : 0;
    return { x: -this.c.size / 2 + (c + 0.5) * CELL, z: -this.c.size / 2 + (wr + 0.5 + k) * CELL };
  }
  /** Case du monde sous un point du sol, ou null hors du sol. */
  worldCellAt(x: number, z: number) {
    const cell = this.cellAt(x, z);
    if (!cell) return null;
    return { c: cell.c, wr: this.c.scroll ? this.worldRow((z + this.c.size / 2) / CELL) : cell.r, floor: cell };
  }
  isRoofAt(x: number, z: number) {
    const w = this.worldCellAt(x, z);
    return w ? this.isRoofWorld(w.c, w.wr) : false;
  }
  private isRoofWorld(c: number, wr: number) {
    const b = this.buildingAt(c, wr);
    if (!b) return false;
    if (b.state === "up" || b.state === "warning") return true;
    return b.state === "rising" && this.t - b.since >= this.c.riseSeconds * 0.66;
  }

  buildingAt(c: number, r: number) {
    return this.buildings.find((b) => b.state !== "gone" && c >= b.c0 && c < b.c0 + b.w && r >= b.r0 && r < b.r0 + b.h) ?? null;
  }
  /**
   * Un toit sur lequel on peut se tenir, pour la case (c, r) DU SOL (debout, ou
   * en train de clignoter ; un immeuble qui monte l'est aux deux tiers de sa montee).
   */
  isRoof(c: number, r: number) {
    return this.isRoofWorld(c, this.c.scroll ? this.worldRow(r + 0.5) : r);
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

  /**
   * Mode coureur : une bande d'immeubles au-dessus de ce qui existe deja.
   * 2 a 3 rangees de haut, des toits de 1 a 3 cases separes ou non par une
   * ruelle d'une case, puis parfois une rue d'une case. Jamais plus d'une case
   * de vide entre deux toits : on passe toujours d'un pas.
   */
  private addBand() {
    const h = 2 + Math.floor(this.rand() * 2);
    const r0 = this.genTop - h;
    const alleys = new Set<number>();
    let c = 0;
    while (c < this.n) {
      const w = Math.min(this.n - c, 1 + Math.floor(this.rand() * 3));
      this.buildings.push({ id: this.nextId++, c0: c, r0, w, h, state: "up", since: this.t, style: this.rand() });
      c += w;
      // Ruelle d'une case, sauf face a une ruelle de la bande d'en dessous quand
      // une rue les separe : le croisement n'aurait aucun toit a un pas.
      if (c < this.n && this.rand() < 0.4 && !(this.lastStreet && this.lastAlleys.has(c))) { alleys.add(c); c += 1; }
    }
    this.lastAlleys = alleys;
    this.lastStreet = this.rand() < this.c.streetChance;
    this.genTop = r0 - (this.lastStreet ? 1 : 0);
  }

  /** Construit la ville du bas du sol jusqu'au-dela du bord haut (en cours de partie aussi). */
  private fillRunway() {
    if (this.buildings.length === 0) {
      // Depart : une premiere bande pleine sous les pieds, sans ruelle, pour que chacun parte d'un toit.
      this.genTop = this.n + 2;
      const h = 4, r0 = this.genTop - h;
      for (let c = 0; c < this.n; c += 2) this.buildings.push({ id: this.nextId++, c0: c, r0, w: Math.min(2, this.n - c), h, state: "up", since: 0, style: this.rand() });
      this.genTop = r0 - 1;
    }
    while (this.genTop > -this.scroll - 3) this.addBand();
    // Ce qui est passe sous le bord bas du sol disparait.
    this.buildings = this.buildings.filter((b) => b.r0 + this.scroll < this.n + 3);
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
      const passed = this.c.scroll && l.r + this.scroll > this.n;
      if (!b || b.state === "sinking" || passed || (!this.c.scroll && this.t - l.bornAt > l.life)) {
        l.gone = true;
        if (l.owner !== NEUTRAL) this.sides[l.owner].combo = 0;
      }
    }
    this.logos = this.logos.filter((l) => !l.gone || (l.takenAt !== null && this.t - l.takenAt < 1));

    if (this.c.scroll) {
      this.scroll += speedAt(this.t, this.c) * dt;
      this.fillRunway();
    } else {
      this.shiftTimer -= dt;
      if (this.shiftTimer <= 0) {
        this.shift();
        this.shiftTimer = lerp(this.c.shiftStart, this.c.shiftEnd, progress(this.t, this.c));
      }
    }
    this.spawnLogos();
    for (const s of this.sides) if (this.t - s.lastAt > this.c.comboWindow) s.combo = 0;

    // Rester sur un toit qui disparait sous ses pieds : chute.
    const roofNow = new Set<string>();
    for (const p of presence) {
      const cell = this.cellAt(p.x, p.z);
      if (!cell) continue;
      const key = `${cell.c},${cell.r}`;
      if (this.isRoofAt(p.x, p.z)) roofNow.add(key);
      else if (this.wasRoof.has(key)) { const ev = this.fall(cell.c, cell.r, p.x, p.z); if (ev) events.push(ev); }
    }
    this.wasRoof = roofNow;
    return events;
  }

  private spawnLogos() {
    const prog = progress(this.t, this.c);
    for (let side = 0; side < this.zones.length; side++) {
      if (this.c.scroll) {
        // Mode coureur : les logos arrivent par la moitie haute du sol et descendent vers les joueurs.
        if (side > 0) break;
        const live = this.logos.filter((l) => !l.gone).length;
        if (live >= (this.c.logosPerZone + 1) * this.zones.length) break;
        const cells: { c: number; r: number }[] = [];
        for (let c = 0; c < this.n; c++) for (let rf = 0; rf < this.n / 2; rf++) {
          const wr = this.worldRow(rf + 0.5);
          if (this.buildingAt(c, wr)?.state !== "up" || this.logos.some((l) => !l.gone && l.c === c && l.r === wr)) continue;
          cells.push({ c, r: wr });
        }
        if (!cells.length) break;
        const { c, r } = cells[Math.floor(this.rand() * cells.length)];
        this.logos.push({ id: this.nextId++, c, r, owner: NEUTRAL, kind: this.rand() < this.c.goldChance ? "gold" : "brand", bornAt: this.t, life: 1e9, takenAt: null, gone: false });
        break;
      }
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

  private fall(c: number, r: number, x?: number, z?: number): RoofEvent | null {
    const key = `${c},${r}`;
    if (this.t - (this.lastFall.get(key) ?? -99) < this.c.fallCooldown) return null;
    this.lastFall.set(key, this.t);
    const side = this.sideOf(c, r);
    const s = this.sides[side];
    s.falls++;
    s.combo = 0;
    s.score = Math.max(0, s.score + this.c.points.fall);
    const p = this.cellCenter(c, r);
    return { type: "fall", c, r, side, points: this.c.points.fall, x: x ?? p.x, z: z ?? p.z };
  }

  /** Nouveaux appuis : ramasser un logo, ou chuter dans le vide. */
  step(points: { x: number; z: number }[]): RoofEvent[] {
    if (this.over) return [];
    const events: RoofEvent[] = [];
    for (const p of points) {
      const w = this.worldCellAt(p.x, p.z);
      if (!w) continue;
      if (!this.isRoofWorld(w.c, w.wr)) {
        const ev = this.fall(w.floor.c, w.floor.r, p.x, p.z);
        if (ev) events.push(ev);
        continue;
      }
      const logo = this.logos.find((l) => !l.gone && l.c === w.c && l.r === w.wr);
      if (!logo) continue;
      logo.gone = true;
      logo.takenAt = this.t;
      // Mode coureur : le logo compte pour la zone ou on le ramasse.
      const side = logo.owner === NEUTRAL ? this.sideOf(w.floor.c, w.floor.r) : logo.owner;
      const s = this.sides[side];
      s.combo = this.t - s.lastAt <= this.c.comboWindow ? s.combo + 1 : 1;
      s.lastAt = this.t;
      s.bestCombo = Math.max(s.bestCombo, s.combo);
      s.logos++;
      const pts = this.c.points[logo.kind] * this.multiplierOf(side);
      s.score += pts;
      const at = this.floorPos(logo.c, logo.r);
      events.push({ type: "collect", logo, points: pts, combo: s.combo, side, x: at.x, z: at.z });
    }
    return events;
  }

  ranking() {
    return this.sides.map((s, i) => ({ i, ...s })).sort((a, b) => b.score - a.score);
  }
}
