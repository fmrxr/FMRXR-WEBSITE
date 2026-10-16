import { describe, expect, it } from "vitest";
import { DEFAULT_STOMP, frost, lifeAt, maxLiveAt, StompGame } from "@/lib/stomp/game";

const c = DEFAULT_STOMP;

describe("stomp : verre et difficulte", () => {
  it("le verre part depoli et finit presque transparent, sans jamais revenir en arriere", () => {
    expect(frost(0, c)).toBeCloseTo(c.frostStart);
    expect(frost(c.roundSeconds, c)).toBeCloseTo(c.frostEnd);
    let prev = 2;
    for (let t = 0; t <= c.roundSeconds; t += 1) {
      const f = frost(t, c);
      expect(f).toBeLessThanOrEqual(prev);
      prev = f;
    }
  });
  it("les cibles restent moins longtemps et sont plus nombreuses en fin de manche", () => {
    expect(lifeAt(0, c)).toBeCloseTo(c.lifeStart);
    expect(lifeAt(c.roundSeconds, c)).toBeCloseTo(c.lifeEnd);
    expect(maxLiveAt(c.roundSeconds, c)).toBeGreaterThan(maxLiveAt(0, c));
  });
});

describe("stomp : partie", () => {
  const run = (g: StompGame, seconds: number, step = 1 / 60) => { for (let t = 0; t < seconds; t += step) g.update(step); };

  it("fait apparaitre des cibles dans le sol, jamais au bord ni l'une sur l'autre", () => {
    const g = new StompGame({}, 42);
    run(g, 20);
    expect(g.targets.length).toBeGreaterThan(0);
    const half = c.size / 2;
    for (const t of g.targets) {
      expect(Math.abs(t.x)).toBeLessThan(half - c.targetRadius);
      expect(Math.abs(t.z)).toBeLessThan(half - c.targetRadius);
    }
    const live = g.live;
    for (const a of live) for (const b of live) if (a !== b) expect(Math.hypot(a.x - b.x, a.z - b.z)).toBeGreaterThan(c.targetRadius * 2);
  });

  it("un pied dans le rayon de touche marque des points ; a cote, rien", () => {
    const g = new StompGame({}, 7);
    run(g, 2);
    const t = g.live.find((x) => x.state === "live")!;
    expect(g.stomp([{ x: t.x + c.hitRadius + 0.05, z: t.z }])).toHaveLength(0);
    const ev = g.stomp([{ x: t.x + c.hitRadius - 0.05, z: t.z }]);
    expect(ev).toHaveLength(1);
    expect(g.score).toBe(c.points[t.kind]);
    expect(t.state).toBe("hit");
    // La meme cible ne compte qu'une fois.
    expect(g.stomp([{ x: t.x, z: t.z }])).toHaveLength(0);
  });

  it("une cible encore au fond de la ville ne se touche pas", () => {
    const g = new StompGame({}, 3);
    const t = g.spawn()!;
    g.update(c.riseSeconds * 0.2);
    expect(g.stomp([{ x: t.x, z: t.z }])).toHaveLength(0);
    g.update(c.riseSeconds * 0.4);
    expect(g.stomp([{ x: t.x, z: t.z }])).toHaveLength(1);
  });

  it("enchainer les touches fait monter le multiplicateur, une cible manquee le remet a zero", () => {
    const g = new StompGame({ goldChance: 0, hazardChance: 0, maxLiveStart: 0, maxLiveEnd: 0 }, 11);
    // Aucune apparition automatique : seules les cibles du test existent.
    let total = 0;
    for (let i = 0; i < 8; i++) {
      const t = g.spawn()!;
      g.update(c.riseSeconds);
      total += g.stomp([{ x: t.x, z: t.z }])[0].points;
    }
    expect(g.combo).toBe(8);
    expect(g.multiplier).toBe(3);
    expect(total).toBe(100 * (1 + 1 + 1 + 2 + 2 + 2 + 2 + 3));
    // Une cible qui repart sans etre touchee casse le combo.
    g.spawn();
    run(g, c.riseSeconds + c.lifeStart + 0.2);
    expect(g.combo).toBe(0);
    expect(g.misses).toBe(1);
  });

  it("marcher sur une cible interdite coute des points sans passer sous zero", () => {
    const g = new StompGame({}, 5);
    g.t = c.roundSeconds / 2;
    const t = g.spawn()!;
    t.kind = "hazard";
    g.update(c.riseSeconds);
    g.stomp([{ x: t.x, z: t.z }]);
    expect(g.score).toBe(0);
    expect(g.hazardsHit).toBe(1);
  });

  it("pas de cible interdite dans le premier tiers de la manche", () => {
    const g = new StompGame({ hazardChance: 0.9, goldChance: 0 }, 9);
    run(g, c.roundSeconds / 3 - 1);
    expect(g.targets.some((t) => t.kind === "hazard")).toBe(false);
  });

  it("la manche s'arrete a l'heure et ne compte plus rien apres", () => {
    const g = new StompGame({ roundSeconds: 5 }, 1);
    run(g, 6);
    expect(g.over).toBe(true);
    expect(g.stomp([{ x: 0, z: 0 }])).toHaveLength(0);
  });
});
