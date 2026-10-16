// STOMP : logique de jeu pure, sans rendu ni navigateur (testee a part).
//
// Unites : metres, sur le sol reel. Le sol est un carre de `size` metres,
// centre en (0, 0). Les cibles ont la taille d'une dalle LED (50 cm) : les
// capteurs d'un sol interactif sont des cases de 4 a 12,5 cm, et un pas met
// environ 1 s a arriver (rapport STOMP). La tolerance est donc spatiale
// (rayon de touche plus grand que la cible) plutot que temporelle.

export type Kind = "brand" | "gold" | "hazard";

export type Target = {
  id: number;
  kind: Kind;
  x: number;
  z: number;
  bornAt: number; // s, debut de la montee
  life: number; // s, temps de presence une fois arrivee au verre
  state: "rising" | "live" | "hit" | "gone";
  endAt: number | null; // s, quand elle a ete touchee ou est repartie
};

export type HitEvent = { target: Target; points: number; combo: number; at: number };

export type StompConfig = {
  size: number; // cote du sol, m
  roundSeconds: number;
  targetRadius: number; // m, rayon visuel
  hitRadius: number; // m, rayon de touche (tolerance)
  riseSeconds: number; // montee depuis la ville
  lifeStart: number; // s de presence en debut de manche
  lifeEnd: number; // s de presence en fin de manche
  maxLiveStart: number; // cibles simultanees en debut de manche
  maxLiveEnd: number;
  goldChance: number;
  hazardChance: number; // apparait seulement apres le premier tiers
  points: { brand: number; gold: number; hazard: number };
  comboWindow: number; // s entre deux touches pour garder le combo
  comboStep: number; // une touche de plus = +1 au multiplicateur tous les `comboStep`
  maxMultiplier: number;
  frostStart: number; // 1 = verre totalement depoli
  frostEnd: number; // en fin de manche, avant la revelation
};

export const DEFAULT_STOMP: StompConfig = {
  size: 4,
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

export class StompGame {
  readonly c: StompConfig;
  t = 0;
  score = 0;
  hits = 0;
  misses = 0; // cibles de marque reparties sans etre touchees
  hazardsHit = 0;
  combo = 0;
  bestCombo = 0;
  targets: Target[] = [];
  private nextId = 1;
  private lastHitAt = -99;
  private spawnTimer = 0;
  private rand: () => number;

  constructor(config: Partial<StompConfig> = {}, seed = Date.now()) {
    this.c = { ...DEFAULT_STOMP, ...config, points: { ...DEFAULT_STOMP.points, ...config.points } };
    this.rand = rng(seed);
  }

  get over() { return this.t >= this.c.roundSeconds; }
  get multiplier() { return Math.min(this.c.maxMultiplier, 1 + Math.floor(this.combo / this.c.comboStep)); }
  get live() { return this.targets.filter((x) => x.state === "rising" || x.state === "live"); }

  /** Avance le temps de `dt` secondes : montees, departs, apparitions. */
  update(dt: number) {
    if (this.over) return;
    this.t = Math.min(this.c.roundSeconds, this.t + dt);
    for (const g of this.targets) {
      if (g.state === "rising" && this.t >= g.bornAt + this.c.riseSeconds) g.state = "live";
      if (g.state === "live" && this.t >= g.bornAt + this.c.riseSeconds + g.life) {
        g.state = "gone";
        g.endAt = this.t;
        if (g.kind !== "hazard") { this.misses++; this.combo = 0; }
      }
    }
    if (this.t - this.lastHitAt > this.c.comboWindow) this.combo = 0;
    // On garde un peu d'historique pour les effets de disparition, pas plus.
    this.targets = this.targets.filter((g) => g.endAt === null || this.t - g.endAt < 1.2);

    this.spawnTimer -= dt;
    if (this.spawnTimer <= 0 && this.live.length < maxLiveAt(this.t, this.c)) {
      this.spawn();
      this.spawnTimer = lerp(0.7, 0.28, progress(this.t, this.c));
    }
  }

  /** Nouvelle cible, jamais sur une autre ni trop au bord du sol. */
  spawn(): Target | null {
    const half = this.c.size / 2 - this.c.targetRadius - 0.1;
    const minGap = this.c.targetRadius * 2 + 0.2;
    for (let tries = 0; tries < 20; tries++) {
      const x = (this.rand() * 2 - 1) * half;
      const z = (this.rand() * 2 - 1) * half;
      if (this.live.some((g) => Math.hypot(g.x - x, g.z - z) < minGap)) continue;
      const r = this.rand();
      const hazardsOn = progress(this.t, this.c) > 1 / 3;
      const kind: Kind = r < this.c.goldChance ? "gold" : hazardsOn && r < this.c.goldChance + this.c.hazardChance ? "hazard" : "brand";
      const g: Target = { id: this.nextId++, kind, x, z, bornAt: this.t, life: lifeAt(this.t, this.c), state: "rising", endAt: null };
      this.targets.push(g);
      return g;
    }
    return null;
  }

  /**
   * Des pieds se posent en ces points (metres). Une cible est touchee par le
   * point le plus proche dans son rayon de touche ; une cible encore en
   * montee compte aussi (le pied part avant qu'elle n'arrive). Renvoie les
   * touches pour les effets.
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
      let points_ = this.c.points[g.kind];
      if (g.kind === "hazard") {
        this.hazardsHit++;
        this.combo = 0;
      } else {
        this.combo = this.t - this.lastHitAt <= this.c.comboWindow ? this.combo + 1 : 1;
        this.lastHitAt = this.t;
        this.bestCombo = Math.max(this.bestCombo, this.combo);
        this.hits++;
        points_ *= this.multiplier;
      }
      this.score = Math.max(0, this.score + points_);
      events.push({ target: g, points: points_, combo: this.combo, at: this.t });
    }
    return events;
  }

  /** Taux de reussite sur les cibles de marque, pour l'ecran de fin et le rapport. */
  get accuracy() {
    const total = this.hits + this.misses;
    return total ? this.hits / total : 0;
  }
}
