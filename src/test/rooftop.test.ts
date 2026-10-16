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
