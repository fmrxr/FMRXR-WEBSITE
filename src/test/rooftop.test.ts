import { describe, expect, it } from "vitest";
import { DEFAULT_ROOFTOP, RooftopGame, frost } from "@/lib/rooftop/game";
import { lineup } from "@/lib/stomp/game";

const c = DEFAULT_ROOFTOP;
const run = (g: RooftopGame, seconds: number, step = 1 / 60) => { for (let t = 0; t < seconds; t += step) g.update(step); };

describe("rooftop : la ville", () => {
  it("demarre avec beaucoup de toits, et le vide grandit pendant la manche", () => {
    const g = new RooftopGame({}, 1);
    expect(g.n).toBe(8);
    expect(g.voidShare()).toBeLessThanOrEqual(c.voidStart + 0.05);
    run(g, 60);
    expect(g.voidShare()).toBeGreaterThan(c.voidStart);
  });
  it("les immeubles ne se chevauchent jamais", () => {
    const g = new RooftopGame({}, 2);
    for (let k = 0; k < 6; k++) {
      run(g, 10);
      for (let col = 0; col < g.n; col++) for (let r = 0; r < g.n; r++) {
        const here = g.buildings.filter((b) => b.state !== "gone" && col >= b.c0 && col < b.c0 + b.w && r >= b.r0 && r < b.r0 + b.h);
        expect(here.length).toBeLessThanOrEqual(1);
      }
    }
  });
  it("un toit clignote avant de s'effondrer : on a le temps de partir", () => {
    const g = new RooftopGame({}, 3);
    run(g, 40);
    const warned = g.buildings.find((b) => b.state === "warning");
    if (warned) {
      expect(g.isRoof(warned.c0, warned.r0)).toBe(true);
    }
    expect(frost(0, c)).toBeGreaterThan(frost(c.roundSeconds, c));
  });
});

describe("rooftop : jouer", () => {
  it("marcher sur un logo le ramasse ; marcher dans le vide fait chuter", () => {
    const g = new RooftopGame({ goldChance: 0 }, 4);
    run(g, 0.5);
    const logo = g.logos.find((l) => !l.gone)!;
    const p = g.cellCenter(logo.c, logo.r);
    const ev = g.step([p]);
    expect(ev[0]).toMatchObject({ type: "collect", points: 100 });
    expect(g.score).toBe(100);
    // Une case de vide.
    let hole: { c: number; r: number } | null = null;
    for (let col = 0; col < g.n && !hole; col++) for (let r = 0; r < g.n && !hole; r++) if (!g.isRoof(col, r)) hole = { c: col, r };
    const fall = g.step([g.cellCenter(hole!.c, hole!.r)]);
    expect(fall[0]).toMatchObject({ type: "fall" });
    expect(g.score).toBe(100 + c.points.fall);
    // Le meme pied qui tremble dans le meme vide ne compte qu'une chute.
    expect(g.step([g.cellCenter(hole!.c, hole!.r)])).toHaveLength(0);
  });

  it("rester sur un toit qui s'effondre, c'est chuter", () => {
    const g = new RooftopGame({}, 5);
    const b = g.buildings.find((x) => x.state === "up")!;
    const p = g.cellCenter(b.c0, b.r0);
    g.update(0.016, [p]);
    b.state = "warning"; b.since = g.t;
    let fell = false;
    for (let i = 0; i < 200 && !fell; i++) fell = g.update(1 / 60, [p]).some((e) => e.type === "fall");
    expect(fell).toBe(true);
  });

  it("le combo monte en enchainant les logos et fait grimper le multiplicateur", () => {
    const g = new RooftopGame({ goldChance: 0, logosPerZone: 6 }, 6);
    run(g, 0.2);
    let total = 0;
    for (let i = 0; i < 6; i++) {
      run(g, 0.2);
      const l = g.logos.find((x) => !x.gone);
      if (!l) continue;
      total += g.step([g.cellCenter(l.c, l.r)])[0].points;
    }
    expect(g.sides[0].combo).toBeGreaterThanOrEqual(3);
    expect(total).toBeGreaterThan(600);
  });

  it("chaque camp a ses logos dans sa zone et ses propres points", () => {
    const l = lineup(4, [0, 1, 2, 3], true);
    const g = new RooftopGame({ zones: l.sides.map((s) => s.zone) }, 7);
    run(g, 5);
    for (const logo of g.logos.filter((x) => !x.gone)) expect(g.sideOf(logo.c, logo.r)).toBe(logo.owner);
    const top = g.logos.find((x) => !x.gone && x.owner === 1)!;
    g.step([g.cellCenter(top.c, top.r)]);
    expect(g.sides[1].score).toBeGreaterThan(0);
    expect(g.sides[0].score).toBe(0);
  });
});

describe("rooftop : mode coureur (la ville defile)", () => {
  const runner = (seed: number, extra = {}) => new RooftopGame({ scroll: true, ...extra }, seed);

  it("vitesse douce : 15 cm/s au depart, 45 cm/s au plus, l'essentiel de l'acceleration a la fin", async () => {
    const { speedAt } = await import("@/lib/rooftop/game");
    const cfg = { ...c, scroll: true };
    expect(speedAt(0, cfg) * 0.5).toBeCloseTo(0.15); // m/s (une case = 50 cm)
    expect(speedAt(cfg.roundSeconds, cfg) * 0.5).toBeCloseTo(0.45);
    // Aux deux tiers de la manche, on est encore sous le tiers de la hausse.
    const k = (speedAt(cfg.roundSeconds * 2 / 3, cfg) - cfg.speedStart) / (cfg.speedEnd - cfg.speedStart);
    expect(k).toBeLessThan(0.4);
  });

  it("aucun saut : chaque case vide a un toit a un pas (50 cm), pendant toute la manche", () => {
    for (const seed of [1, 2, 3, 4, 5]) {
      const g = runner(seed);
      for (let t = 0; t < c.roundSeconds; t += 0.25) {
        g.update(0.25);
        for (let col = 0; col < g.n; col++) for (let r = 0; r < g.n; r++) {
          if (g.isRoof(col, r)) continue;
          const near = [[1, 0], [-1, 0], [0, 1], [0, -1]].some(([dc, dr]) => {
            const cc = col + dc, rr = r + dr;
            // Une rangee au-dela des bords haut et bas compte : la ville y est deja construite et arrive sur le sol.
            return cc >= 0 && rr >= -1 && cc < g.n && rr <= g.n && g.isRoof(cc, rr);
          });
          expect(near).toBe(true);
        }
      }
    }
  });

  it("on part tous d'un toit, la ville avance, et rester immobile finit par faire tomber", () => {
    const g = runner(8);
    // La moitie basse du sol est entierement en toits au depart.
    for (let col = 0; col < g.n; col++) expect(g.isRoof(col, g.n - 1)).toBe(true);
    const foot = g.cellCenter(1, g.n - 1);
    let fell = false;
    for (let i = 0; i < 60 * 40 && !fell; i++) fell = g.update(1 / 60, [foot]).some((e) => e.type === "fall");
    expect(g.scroll).toBeGreaterThan(0);
    expect(fell).toBe(true);
  });

  it("les logos arrivent par le haut et se ramassent en marchant dessus", () => {
    const g = runner(9, { goldChance: 0 });
    run(g, 1);
    const l = g.logos.find((x) => !x.gone)!;
    const at = g.floorPos(l.c, l.r);
    expect(at.z).toBeLessThan(0.2); // moitie haute du sol
    const ev = g.step([at]);
    expect(ev[0]).toMatchObject({ type: "collect", points: 100 });
  });
});
