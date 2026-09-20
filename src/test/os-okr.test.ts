import { describe, it, expect } from "vitest";
import {
  capState, checkinFreshness, draftOkrs, gradeLabel, gradeObjective, lastCheckin, lintKr, manualKrs,
  nextQuarterOf, objectiveConfidence, OKR_RULES, planningState, publishedOkrs,
} from "@/lib/os/okr";
import type { OsGraph, OsOkr } from "@/lib/os/types";

const NOW = new Date("2026-09-20T12:00:00.000Z");
const iso = (days: number) => new Date(NOW.getTime() + days * 86_400_000).toISOString();

function okr(partial: Partial<OsOkr> & { id: string }): OsOkr {
  return { quarter: "2026-Q3", objective: "Objectif", krs: [], ...partial };
}
const graphOf = (okrs: OsOkr[]) => ({ okrs }) as Pick<OsGraph, "okrs">;

describe("lintKr", () => {
  it("signale un livrable déguisé en résultat", () => {
    const out = lintKr("Livrer les 4 phases visuelles avant le 14/08");
    expect(out.level).toBe("warn");
    expect(out.code).toBe("output-as-kr");
    expect(out.hint).toContain("qu'est-ce qui change");
  });

  it("attrape les autres verbes de production, avec ou sans accent", () => {
    expect(lintKr("Produire 100 vidéos").code).toBe("output-as-kr");
    expect(lintKr("Creer une nouvelle offre").code).toBe("output-as-kr");
    expect(lintKr("Signer 2 retainers").code).toBe("output-as-kr");
  });

  it("laisse passer un vrai résultat", () => {
    expect(lintKr("Part du CA couverte par du revenu récurrent", 60).level).toBe("ok");
  });

  it("ne se déclenche pas sur un verbe présent ailleurs dans la phrase", () => {
    expect(lintKr("Taux de clients qui signent une seconde mission", 30).level).toBe("ok");
  });

  it("signale une cible binaire, qui ne montre aucune progression", () => {
    expect(lintKr("Pipeline opérationnel de bout en bout", 1).code).toBe("binary");
    expect(lintKr("Nombre de clients récurrents", 3).level).toBe("ok");
  });

  it("ne dit rien sur un libellé vide, on ne réprimande pas un champ à peine commencé", () => {
    expect(lintKr("").level).toBe("ok");
  });
});

describe("confiance et points de suivi", () => {
  it("prend la confiance du dernier point", () => {
    const o = okr({
      id: "a",
      checkins: [
        { ts: iso(-14), confidence: 3 },
        { ts: iso(-2), confidence: 1, note: "le client ne répond plus" },
      ],
    });
    expect(lastCheckin(o)?.note).toBe("le client ne répond plus");
    expect(objectiveConfidence(o)).toBe(1);
  });

  it("retombe sur la confiance la plus basse des KR quand aucun point n'existe", () => {
    const o = okr({
      id: "a",
      krs: [
        { id: "k1", label: "A", target: 1, value: 0, confidence: 3 },
        { id: "k2", label: "B", target: 1, value: 0, confidence: 2 },
      ],
    });
    expect(objectiveConfidence(o)).toBe(2);
  });

  it("ne renvoie rien quand rien n'est déclaré, au lieu d'inventer une confiance", () => {
    expect(objectiveConfidence(okr({ id: "a" }))).toBeNull();
  });

  it("considère un objectif sans point comme périmé", () => {
    const f = checkinFreshness(okr({ id: "a" }), NOW);
    expect(f.stale).toBe(true);
    expect(f.days).toBeNull();
  });

  it("compte les jours depuis le dernier point et signale au-delà du seuil", () => {
    const frais = checkinFreshness(okr({ id: "a", checkins: [{ ts: iso(-3), confidence: 2 }] }), NOW);
    expect(frais.days).toBe(3);
    expect(frais.stale).toBe(false);

    const vieux = checkinFreshness(
      okr({ id: "a", checkins: [{ ts: iso(-OKR_RULES.checkinStaleDays - 1), confidence: 2 }] }),
      NOW,
    );
    expect(vieux.stale).toBe(true);
  });

  it("ignore un horodatage illisible", () => {
    expect(lastCheckin({ checkins: [{ ts: "hier", confidence: 2 }] })).toBeNull();
  });
});

describe("brouillons et cycle", () => {
  it("sépare les brouillons des objectifs publiés", () => {
    const g = graphOf([
      okr({ id: "pub", quarter: "2026-Q4" }),
      okr({ id: "brouillon", quarter: "2026-Q4", status: "draft" }),
    ]);
    expect(publishedOkrs(g, "2026-Q4").map((o) => o.id)).toEqual(["pub"]);
    expect(draftOkrs(g, "2026-Q4").map((o) => o.id)).toEqual(["brouillon"]);
  });

  it("ouvre la planification dans la fenêtre et la referme en dehors", () => {
    const proche = planningState(graphOf([]), NOW);
    expect(proche.daysLeft).toBeLessThanOrEqual(OKR_RULES.planningWindowDays);
    expect(proche.windowOpen).toBe(true);
    expect(proche.phase).toBe("planification");

    const loin = planningState(graphOf([]), new Date("2026-08-01T12:00:00.000Z"));
    expect(loin.windowOpen).toBe(false);
    expect(loin.phase).toBe("suivi");
  });

  it("passe en clôture dès que le trimestre suivant a un objectif publié", () => {
    const g = graphOf([okr({ id: "q4", quarter: "2026-Q4" })]);
    expect(planningState(g, NOW).phase).toBe("cloture");
  });

  it("ne compte pas un brouillon comme une planification faite", () => {
    const g = graphOf([okr({ id: "q4", quarter: "2026-Q4", status: "draft" })]);
    const s = planningState(g, NOW);
    expect(s.phase).toBe("planification");
    expect(s.draftCount).toBe(1);
    expect(s.nextPublishedCount).toBe(0);
  });

  it("enchaîne sur le premier trimestre de l'année suivante depuis un T4", () => {
    expect(nextQuarterOf(new Date("2026-11-15T12:00:00.000Z"))).toBe("2027-Q1");
  });
});

describe("plafonds", () => {
  it("signale au-delà de trois objectifs", () => {
    const four = Array.from({ length: 4 }, (_, i) => okr({ id: `o${i}` }));
    expect(capState(four).overObjectives).toBe(true);
    expect(capState(four.slice(0, 3)).overObjectives).toBe(false);
  });

  it("signale un objectif qui a trop ou trop peu de résultats clés", () => {
    const kr = (id: string) => ({ id, label: "x", target: 2, value: 0 });
    const out = capState([
      okr({ id: "trop", krs: [kr("a"), kr("b"), kr("c"), kr("d"), kr("e")] }),
      okr({ id: "maigre", krs: [kr("a")] }),
      okr({ id: "bon", krs: [kr("a"), kr("b"), kr("c")] }),
    ]);
    expect(out.krIssues).toHaveLength(2);
    expect(out.krIssues.find((i) => i.id === "trop")?.problem).toBe("trop");
    expect(out.krIssues.find((i) => i.id === "maigre")?.problem).toBe("pas assez");
  });
});

describe("clôture", () => {
  const graph = { finance: [] };

  it("note un objectif sur l'avancement réel de ses résultats", () => {
    const o = okr({ id: "a", krs: [{ id: "k", label: "x", target: 10, value: 7 }] });
    expect(gradeObjective(o, graph, NOW)).toBeCloseTo(0.7);
  });

  it("considère 0,7 comme atteint, et non comme un échec", () => {
    expect(gradeLabel(0.7)).toBe("atteint");
    expect(gradeLabel(0.5)).toBe("partiel");
    expect(gradeLabel(0.2)).toBe("manqué");
  });
});

describe("dette de suivi", () => {
  it("liste les résultats clés encore tenus à la main", () => {
    const out = manualKrs([
      okr({ id: "a", krs: [
        { id: "auto", label: "CA", target: 1, value: 0, auto: "ca_quarter" },
        { id: "manuel", label: "Sets montés", target: 3, value: 3 },
      ] }),
    ]);
    expect(out.map((k) => k.id)).toEqual(["manuel"]);
  });
});
