import { describe, expect, it } from "vitest";
import { DEFAULT_STOMP, frost, lifeAt, lineup, maxLiveAt, StompGame } from "@/lib/stomp/game";

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

describe("stomp : 1 a 4 joueurs, equipes de 2", () => {
  const run = (g: StompGame, seconds: number, step = 1 / 60) => { for (let t = 0; t < seconds; t += step) g.update(step); };
  const inZone = (x: number, z: number, zone: { x0: number; x1: number; z0: number; z1: number }) => x > zone.x0 && x < zone.x1 && z > zone.z0 && z < zone.z1;

  it("decoupe le sol selon les plaques choisies", () => {
    expect(lineup(4, [], false).mode).toBe("solo");
    expect(lineup(4, [2], false).sides[0].zone).toEqual({ x0: -2, x1: 2, z0: -2, z1: 2 });
    // Deux joueurs face a face : haut et bas.
    const fb = lineup(4, [0, 2], false);
    expect(fb.sides.map((s) => s.zone.z0)).toEqual([0, -2]);
    // Deux joueurs du meme cote : gauche et droite.
    const lr = lineup(4, [0, 1], false);
    expect(lr.sides.map((s) => s.zone.x0)).toEqual([-2, 0]);
    expect(lineup(4, [0, 1, 3], false).sides).toHaveLength(3);
    expect(lineup(4, [0, 1, 2, 3], false).sides).toHaveLength(4);
  });

  it("en equipes : bas contre haut, a 2 contre 2 comme a 2 contre 1", () => {
    const t = lineup(4, [0, 1, 2, 3], true);
    expect(t.mode).toBe("teams");
    expect(t.sides.map((s) => s.pads)).toEqual([[0, 1], [2, 3]]);
    expect(lineup(4, [0, 1, 3], true).sides.map((s) => s.pads)).toEqual([[0, 1], [3]]);
    // Une equipe vide : pas d'equipes, chacun pour soi.
    expect(lineup(4, [0, 1], true).mode).toBe("versus");
  });

  it("chaque camp recoit ses cibles, toujours dans sa zone", () => {
    const l = lineup(4, [0, 1, 2, 3], false);
    const g = new StompGame({ zones: l.sides.map((s) => s.zone) }, 21);
    const seen = new Set<number>();
    for (let i = 0; i < 30 * 60; i++) {
      g.update(1 / 60);
      for (const t of g.live) { seen.add(t.owner); expect(inZone(t.x, t.z, g.zones[t.owner])).toBe(true); }
    }
    expect([...seen].sort()).toEqual([0, 1, 2, 3]);
  });

  it("les points vont au camp de la cible, chacun garde son combo", () => {
    const l = lineup(4, [0, 2], false);
    const g = new StompGame({ zones: l.sides.map((s) => s.zone), goldChance: 0, hazardChance: 0, maxLiveStart: 0, maxLiveEnd: 0 }, 4);
    const a = g.spawn(0)!, b = g.spawn(1)!;
    g.update(c.riseSeconds);
    g.stomp([{ x: a.x, z: a.z }]);
    g.stomp([{ x: b.x, z: b.z }]);
    const c2 = g.spawn(1)!;
    g.update(0.3);
    g.update(c.riseSeconds);
    g.stomp([{ x: c2.x, z: c2.z }]);
    expect(g.sides[0].score).toBe(100);
    expect(g.sides[1].score).toBe(200);
    expect(g.sides[1].combo).toBe(2);
    expect(g.score).toBe(300);
    expect(g.ranking()[0].i).toBe(1);
  });

  it("une partie a 4 n'etouffe aucun camp", () => {
    const l = lineup(4, [0, 1, 2, 3], false);
    const g = new StompGame({ zones: l.sides.map((s) => s.zone) }, 99);
    run(g, 40);
    const per = [0, 1, 2, 3].map((i) => g.live.filter((t) => t.owner === i).length);
    for (const n of per) expect(n).toBeGreaterThanOrEqual(1);
  });
});
