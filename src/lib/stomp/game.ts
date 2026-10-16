// STOMP : logique de jeu pure, sans rendu ni navigateur (testee a part).
//
// Unites : metres, sur le sol reel. Le sol est un carre de `size` metres,
// centre en (0, 0), +z vers le bas de l'ecran. Les cibles ont la taille d'une
// dalle LED (50 cm) : les capteurs d'un sol interactif sont des cases de 4 a
// 12,5 cm, et un pas met environ 1 s a arriver (rapport STOMP). La tolerance
// est donc spatiale (rayon de touche plus grand que la cible).
//
// Multijoueur : un sol sait OU on marche, jamais QUI. Chaque camp (un joueur,
// ou une equipe de deux) a donc sa zone du sol, sa couleur, ses cibles et son
// score ; une cible ne compte que pour son camp.

export type Kind = "brand" | "gold" | "hazard";

export type Zone = { x0: number; x1: number; z0: number; z1: number };

export type Target = {
  id: number;
  kind: Kind;
  owner: number; // indice de la zone (du camp)
  x: number;
  z: number;
  bornAt: number; // s, debut de la montee
  life: number; // s, temps de presence une fois arrivee au verre
  state: "rising" | "live" | "hit" | "gone";
  endAt: number | null; // s, quand elle a ete touchee ou est repartie
};

export type SideStats = { score: number; hits: number; misses: number; hazards: number; combo: number; bestCombo: number; lastHitAt: number };

export type HitEvent = { target: Target; points: number; combo: number; multiplier: number; at: number };

export type StompConfig = {
  size: number; // cote du sol, m
  zones: Zone[] | null; // null = tout le sol pour un seul camp
  roundSeconds: number;
  targetRadius: number; // m, rayon visuel
  hitRadius: number; // m, rayon de touche (tolerance)
  riseSeconds: number; // montee depuis la ville
  lifeStart: number; // s de presence en debut de manche
  lifeEnd: number; // s de presence en fin de manche
  maxLiveStart: number; // cibles simultanees sur tout le sol, en debut de manche
  maxLiveEnd: number;
  goldChance: number;
  hazardChance: number; // apparait seulement apres le premier tiers
  points: { brand: number; gold: number; hazard: number };
  comboWindow: number; // s entre deux touches pour garder le combo
  comboStep: number; // +1 au multiplicateur toutes les `comboStep` touches
  maxMultiplier: number;
  frostStart: number; // 1 = verre totalement depoli
  frostEnd: number; // en fin de manche, avant la revelation
};

export const DEFAULT_STOMP: StompConfig = {
  size: 4,
  zones: null,
  roundSeconds: 75,
  targetRadius: 0.25,
  hitRadius: 0.36,
  riseSeconds: 0.55,
  lifeStart: 2.8,
  lifeEnd: 1.3,
  maxLiveStart: 3,
  maxLiveEnd: 7,
  goldChance: 0.08,
  hazardChance: 0.14,
  points: { brand: 100, gold: 300, hazard: -150 },
  comboWindow: 1.6,
  comboStep: 4,
  maxMultiplier: 4,
  frostStart: 0.9,
  frostEnd: 0.08,
};

/** Avancement de la manche, 0 au debut, 1 a la fin. */
export const progress = (t: number, c: StompConfig) => Math.min(1, Math.max(0, t / c.roundSeconds));

const lerp = (a: number, b: number, k: number) => a + (b - a) * k;
const easeIn = (k: number) => k * k;

/**
 * Le verre se « degivre » pendant la manche : depoli au depart, la ville n'est
 * qu'un halo ; de plus en plus transparent, il laisse voir le vide sous les
 * pieds a mesure que le jeu accelere. Courbe douce : l'oeil s'habitue.
 */
export function frost(t: number, c: StompConfig) {
  return lerp(c.frostStart, c.frostEnd, Math.pow(progress(t, c), 1.4));
}

export const lifeAt = (t: number, c: StompConfig) => lerp(c.lifeStart, c.lifeEnd, easeIn(progress(t, c)));
export const maxLiveAt = (t: number, c: StompConfig) => Math.round(lerp(c.maxLiveStart, c.maxLiveEnd, progress(t, c)));

/** Generateur pseudo-aleatoire reproductible (mulberry32) : manches rejouables en test. */
export function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let x = Math.imul(a ^ (a >>> 15), 1 | a);
    x = (x + Math.imul(x ^ (x >>> 7), 61 | x)) ^ x;
    return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
  };
}

// --- Inscription et zones ---------------------------------------------------

/**
 * Les 4 plaques d'inscription, une par quart du sol :
 * 0 bas-gauche, 1 bas-droite, 2 haut-droite, 3 haut-gauche.
 * En mode equipes : plaques 0 et 1 = equipe du bas, 2 et 3 = equipe du haut.
 */
export function padPositions(size: number) {
  const q = size / 4;
  return [{ x: -q, z: q }, { x: q, z: q }, { x: q, z: -q }, { x: -q, z: -q }];
}

export type Lineup = {
  mode: "solo" | "versus" | "teams";
  /** Une entree par camp : sa zone, et les plaques (joueurs) qui le composent. */
  sides: { zone: Zone; pads: number[] }[];
};

/**
 * Decoupe le sol selon les plaques choisies :
 * - 1 joueur : tout le sol ;
 * - 2 joueurs : deux moitiés, coupees entre leurs plaques (haut/bas ou gauche/droite) ;
 * - 3 ou 4 joueurs : le quart de chacun ;
 * - equipes : moitie du bas contre moitie du haut (si les deux equipes ont au moins un joueur).
 */
export function lineup(size: number, pads: number[], teams: boolean): Lineup {
  const h = size / 2;
  const full: Zone = { x0: -h, x1: h, z0: -h, z1: h };
  const bottom: Zone = { x0: -h, x1: h, z0: 0, z1: h };
  const top: Zone = { x0: -h, x1: h, z0: -h, z1: 0 };
  const quad = (p: number): Zone => {
    const left = p === 0 || p === 3, low = p === 0 || p === 1;
    return { x0: left ? -h : 0, x1: left ? 0 : h, z0: low ? 0 : -h, z1: low ? h : 0 };
  };
  const sorted = [...new Set(pads)].filter((p) => p >= 0 && p <= 3).sort();
  if (teams) {
    const a = sorted.filter((p) => p <= 1), b = sorted.filter((p) => p >= 2);
    if (a.length && b.length) return { mode: "teams", sides: [{ zone: bottom, pads: a }, { zone: top, pads: b }] };
  }
  if (sorted.length <= 1) return { mode: "solo", sides: [{ zone: full, pads: sorted.length ? sorted : [0] }] };
  if (sorted.length === 2) {
    const [p, q] = sorted;
    const lowP = p <= 1, lowQ = q <= 1;
    if (lowP !== lowQ) {
      return { mode: "versus", sides: [{ zone: lowP ? bottom : top, pads: [p] }, { zone: lowQ ? bottom : top, pads: [q] }] };
    }
    const leftP = p === 0 || p === 3;
    const left: Zone = { x0: -h, x1: 0, z0: -h, z1: h }, right: Zone = { x0: 0, x1: h, z0: -h, z1: h };
    return { mode: "versus", sides: [{ zone: leftP ? left : right, pads: [p] }, { zone: leftP ? right : left, pads: [q] }] };
  }
  return { mode: "versus", sides: sorted.map((p) => ({ zone: quad(p), pads: [p] })) };
}

// --- Partie -------------------------------------------------------------------

export class StompGame {
  readonly c: StompConfig;
  readonly zones: Zone[];
  readonly sides: SideStats[];
  t = 0;
  targets: Target[] = [];
  private nextId = 1;
  private spawnTimer = 0;
  private rand: () => number;

  constructor(config: Partial<StompConfig> = {}, seed = Date.now()) {
    this.c = { ...DEFAULT_STOMP, ...config, points: { ...DEFAULT_STOMP.points, ...config.points } };
    const h = this.c.size / 2;
    this.zones = this.c.zones?.length ? this.c.zones : [{ x0: -h, x1: h, z0: -h, z1: h }];
    this.sides = this.zones.map(() => ({ score: 0, hits: 0, misses: 0, hazards: 0, combo: 0, bestCombo: 0, lastHitAt: -99 }));
    this.rand = rng(seed);
  }

  get over() { return this.t >= this.c.roundSeconds; }
  get live() { return this.targets.filter((x) => x.state === "rising" || x.state === "live"); }

  // Totaux (solo, equipe unique, rapport).
  get score() { return this.sides.reduce((s, x) => s + x.score, 0); }
  get hits() { return this.sides.reduce((s, x) => s + x.hits, 0); }
  get misses() { return this.sides.reduce((s, x) => s + x.misses, 0); }
  get hazardsHit() { return this.sides.reduce((s, x) => s + x.hazards, 0); }
  get combo() { return this.sides[0].combo; }
  get bestCombo() { return Math.max(...this.sides.map((x) => x.bestCombo)); }
  get multiplier() { return this.multiplierOf(0); }
  multiplierOf(side: number) { return Math.min(this.c.maxMultiplier, 1 + Math.floor(this.sides[side].combo / this.c.comboStep)); }
  accuracyOf(side: number) { const s = this.sides[side]; const n = s.hits + s.misses; return n ? s.hits / n : 0; }
  get accuracy() { const n = this.hits + this.misses; return n ? this.hits / n : 0; }

  /** Cibles simultanees permises dans une zone, selon sa surface. */
  maxLiveIn(side: number) {
    const z = this.zones[side];
    const share = ((z.x1 - z.x0) * (z.z1 - z.z0)) / (this.c.size * this.c.size);
    // Une zone partagee en garde un peu plus que sa part : chaque camp doit avoir de quoi jouer.
    const k = this.zones.length === 1 ? 1 : 1.6;
    return Math.max(1, Math.round(maxLiveAt(this.t, this.c) * share * k));
  }

  /** Avance le temps de `dt` secondes : montees, departs, apparitions. */
  update(dt: number) {
    if (this.over) return;
    this.t = Math.min(this.c.roundSeconds, this.t + dt);
    for (const g of this.targets) {
      if (g.state === "rising" && this.t >= g.bornAt + this.c.riseSeconds) g.state = "live";
      if (g.state === "live" && this.t >= g.bornAt + this.c.riseSeconds + g.life) {
        g.state = "gone";
        g.endAt = this.t;
        if (g.kind !== "hazard") { this.sides[g.owner].misses++; this.sides[g.owner].combo = 0; }
      }
    }
    for (const s of this.sides) if (this.t - s.lastHitAt > this.c.comboWindow) s.combo = 0;
    // Un peu d'historique pour les effets de disparition, pas plus.
    this.targets = this.targets.filter((g) => g.endAt === null || this.t - g.endAt < 1.2);

    this.spawnTimer -= dt;
    if (this.spawnTimer <= 0) {
      // La zone la plus en manque passe en premier : aucun camp n'attend.
      const live = this.live;
      const need = this.zones
        .map((_, i) => ({ i, room: this.maxLiveIn(i) - live.filter((g) => g.owner === i).length }))
        .filter((x) => x.room > 0)
        .sort((a, b) => b.room - a.room);
      if (need.length) this.spawn(need[0].i);
      this.spawnTimer = lerp(0.7, 0.28, progress(this.t, this.c)) / Math.max(1, this.zones.length * 0.75);
    }
  }

  /** Nouvelle cible dans la zone `side`, jamais sur une autre ni a cheval sur une limite. */
  spawn(side = 0): Target | null {
    const z = this.zones[side];
    const m = this.c.targetRadius + 0.1;
    const minGap = this.c.targetRadius * 2 + 0.2;
    for (let tries = 0; tries < 20; tries++) {
      const x = lerp(z.x0 + m, z.x1 - m, this.rand());
      const zz = lerp(z.z0 + m, z.z1 - m, this.rand());
      if (this.live.some((g) => Math.hypot(g.x - x, g.z - zz) < minGap)) continue;
      const r = this.rand();
      const hazardsOn = progress(this.t, this.c) > 1 / 3;
      const kind: Kind = r < this.c.goldChance ? "gold" : hazardsOn && r < this.c.goldChance + this.c.hazardChance ? "hazard" : "brand";
      const g: Target = { id: this.nextId++, kind, owner: side, x, z: zz, bornAt: this.t, life: lifeAt(this.t, this.c), state: "rising", endAt: null };
      this.targets.push(g);
      return g;
    }
    return null;
  }

  /**
   * Des pieds se posent en ces points (metres). Une cible est touchee par un
   * point dans son rayon de touche ; une cible encore en montee compte aussi
   * (le pied part avant qu'elle n'arrive). Les points vont au camp de la cible.
   */
  stomp(points: { x: number; z: number }[]): HitEvent[] {
    if (this.over || points.length === 0) return [];
    const events: HitEvent[] = [];
    for (const g of this.live) {
      const near = points.some((p) => Math.hypot(p.x - g.x, p.z - g.z) <= this.c.hitRadius);
      if (!near) continue;
      // Pendant la premiere moitie de la montee, la cible est encore trop loin dans la ville.
      if (g.state === "rising" && this.t < g.bornAt + this.c.riseSeconds * 0.5) continue;
      g.state = "hit";
      g.endAt = this.t;
      const s = this.sides[g.owner];
      let pts = this.c.points[g.kind];
      if (g.kind === "hazard") {
        s.hazards++;
        s.combo = 0;
      } else {
        s.combo = this.t - s.lastHitAt <= this.c.comboWindow ? s.combo + 1 : 1;
        s.lastHitAt = this.t;
        s.bestCombo = Math.max(s.bestCombo, s.combo);
        s.hits++;
        pts *= this.multiplierOf(g.owner);
      }
      s.score = Math.max(0, s.score + pts);
      events.push({ target: g, points: pts, combo: s.combo, multiplier: this.multiplierOf(g.owner), at: this.t });
    }
    return events;
  }

  /** Classement final : indices des camps, du meilleur au moins bon. */
  ranking() {
    return this.sides.map((s, i) => ({ i, ...s, accuracy: this.accuracyOf(i) })).sort((a, b) => b.score - a.score);
  }
}
