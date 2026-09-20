import { describe, it, expect } from "vitest";
import {
  applyRedBudget, briefing, columns, debt, eventSeries, healthBreakdown, logSince, nextAction,
  okrStrip, quarterProgress, recentActivity, tasksDoneSince,
} from "@/lib/os/today";
import { MONEY_SLOT, TODAY_LIMITS } from "@/lib/os/today-copy";
import type { OsGraph, OsLogEntry } from "@/lib/os/types";

const NOW = new Date("2026-09-20T12:00:00.000Z");
const iso = (daysFromNow: number) => new Date(NOW.getTime() + daysFromNow * 86_400_000).toISOString();
const day = (daysFromNow: number) => iso(daysFromNow).slice(0, 10);

/** Graphe minimal : chaque test n'ajoute que ce dont il a besoin. */
function graphOf(partial: Partial<OsGraph> = {}): OsGraph {
  return {
    identities: [],
    projects: [],
    finance: [],
    tasks: [],
    deadlines: [],
    log: [],
    meta: { eur_tnd: 3.4 },
    ...partial,
  } as OsGraph;
}

const logEntry = (tsDays: number, entity: string, entityType: string): OsLogEntry => ({
  ts: iso(tsDays),
  action: "update",
  entity,
  entityType,
  detail: "",
  by: "test",
  synced: true,
});

describe("briefing", () => {
  it("ne produit aucune ligne sur un graphe vide, au lieu d'inventer un repli", () => {
    expect(briefing(graphOf(), NOW)).toEqual([]);
  });

  it("produit une ligne win quand une tâche a été cochée aujourd'hui", () => {
    const g = graphOf({
      tasks: [{ id: "t1", label: "Mettre le site en ligne", done: true, done_date: day(0) }],
    });
    const lines = briefing(g, NOW);
    expect(lines).toHaveLength(1);
    expect(lines[0].tone).toBe("win");
    expect(lines[0].text).toContain("Mettre le site en ligne");
  });

  it("ignore une tâche cochée il y a trois jours", () => {
    const g = graphOf({ tasks: [{ id: "t1", label: "Vieille tâche", done: true, done_date: day(-3) }] });
    expect(briefing(g, NOW)).toEqual([]);
  });

  it("qualifie un jalon critique dépassé en risk et un jalon à venir en watch", () => {
    const late = graphOf({ deadlines: [{ id: "d1", date: day(-9), label: "Contrat", critical: true }] });
    expect(briefing(late, NOW)[0]).toMatchObject({ tone: "risk" });
    expect(briefing(late, NOW)[0].text).toContain("9");

    const soon = graphOf({ deadlines: [{ id: "d2", date: day(7), label: "Vaccination", critical: true }] });
    expect(briefing(soon, NOW)[0]).toMatchObject({ tone: "watch" });
  });

  it("convertit les montants avec le taux du graphe, pas avec une constante", () => {
    const g = graphOf({
      meta: { eur_tnd: 4 },
      finance: [{ id: "f1", type: "invoice", amount: 100, currency: "EUR", status: "sent", issued: day(-30) }],
    });
    const cash = briefing(g, NOW).find((l) => l.id === "cash");
    // 100 € au taux 4 du graphe, et non au taux par défaut de compute.ts.
    expect(cash?.money).toBe(400);
    // Le montant reste un emplacement dans le texte : c'est <Money> qui l'affiche au rendu.
    expect(cash?.text).toContain(MONEY_SLOT);
  });

  it("plafonne le nombre de lignes", () => {
    const g = graphOf({
      tasks: [{ id: "t1", label: "A", done: true, done_date: day(0) }],
      deadlines: [
        { id: "d1", date: day(-1), label: "D1", critical: true },
        { id: "d2", date: day(-2), label: "D2", critical: true },
      ],
      finance: [{ id: "f1", type: "invoice", amount: 100, currency: "TND", status: "sent", issued: day(-40) }],
      blockers: [
        { id: "b1", label: "B1", severity: "critical", detected: day(-5) },
        { id: "b2", label: "B2", severity: "critical", detected: day(-4) },
      ],
    });
    expect(briefing(g, NOW).length).toBeLessThanOrEqual(TODAY_LIMITS.briefingLines);
  });
});

describe("applyRedBudget", () => {
  it("ne laisse passer que le budget de rouge et rétrograde le reste", () => {
    const items = [{ tone: "risk" as const }, { tone: "risk" as const }, { tone: "risk" as const }];
    const out = applyRedBudget(items, 2);
    expect(out.filter((i) => i.tone === "risk")).toHaveLength(2);
    expect(out[2].tone).toBe("watch");
  });
});

describe("nextAction", () => {
  it("renvoie null quand il n'y a aucun candidat", () => {
    expect(nextAction(graphOf(), NOW)).toBeNull();
  });

  it("fait passer un blocage critique devant une vieille facture", () => {
    const g = graphOf({
      blockers: [{ id: "b1", label: "Contrat non signé", severity: "critical", detected: day(-12) }],
      finance: [{ id: "f1", type: "invoice", amount: 3500, currency: "TND", status: "sent", issued: day(-78) }],
    });
    expect(nextAction(g, NOW)?.id).toBe("b1");
  });

  it("fait passer un jalon critique en retard devant un blocage moyen", () => {
    const g = graphOf({
      deadlines: [{ id: "d1", date: day(-9), label: "Signature", critical: true }],
      blockers: [{ id: "b1", label: "Charte", severity: "medium", detected: day(-20) }],
    });
    expect(nextAction(g, NOW)?.id).toBe("d1");
  });
});

describe("eventSeries", () => {
  it("renvoie null quand le journal est trop maigre", () => {
    expect(eventSeries([logEntry(-1, "x", "task")], NOW, 7)).toBeNull();
  });

  it("compte les événements par jour quand il y en a assez", () => {
    const log = [logEntry(-1, "a", "task"), logEntry(-1, "b", "task"), logEntry(-3, "c", "task")];
    const series = eventSeries(log, NOW, 7);
    expect(series).not.toBeNull();
    expect(series!.reduce((a, b) => a + b, 0)).toBe(3);
    expect(series).toHaveLength(7);
  });

  it("respecte le filtre de domaine", () => {
    const log = [logEntry(-1, "a", "invoice"), logEntry(-1, "b", "task"), logEntry(-2, "c", "task")];
    expect(eventSeries(log, NOW, 7, (e) => e.entityType === "invoice")).toBeNull();
  });
});

describe("columns", () => {
  const g = graphOf({
    clients: [{ id: "c1", name: "Calypso", type: "client" }],
    projects: [{ id: "p1", name: "Projet 1", type: "project", status: "active", client: "c1" }],
    finance: [{ id: "f1", ref: "FACT-1", type: "invoice", amount: 3500, currency: "TND", status: "sent", issued: day(-78), client: "c1" }],
    deadlines: [{ id: "d1", date: day(5), label: "Jalon proche", project: "p1" }],
    tasks: [{ id: "t1", label: "Livrée", done: true, done_date: day(-2), project: "p1" }],
  });

  it("renvoie les trois colonnes dans l'ordre", () => {
    expect(columns(g, NOW).map((c) => c.id)).toEqual(["argent", "clients", "production"]);
  });

  it("calcule l'encours en TND et nomme le client, sans coder son nom en dur", () => {
    const argent = columns(g, NOW)[0];
    expect(argent.value).toBe(3500);
    expect(argent.items[0].label).toContain("Calypso");
  });

  it("ne compte que les clients ayant un projet actif", () => {
    expect(columns(g, NOW)[1].value).toBe(1);
    const archived = graphOf({
      clients: [{ id: "c1", name: "X", type: "client" }],
      projects: [{ id: "p1", name: "P", type: "project", status: "archived", client: "c1" }],
    });
    expect(columns(archived, NOW)[1].value).toBe(0);
  });

  it("ne garde dans Production que les jalons de l'horizon", () => {
    const far = graphOf({ deadlines: [{ id: "d9", date: day(40), label: "Loin" }] });
    expect(columns(far, NOW)[2].items).toHaveLength(0);
  });

  it("n'affiche pas de courbe sans historique suffisant", () => {
    expect(columns(g, NOW).every((c) => c.series === null)).toBe(true);
  });
});

describe("debt", () => {
  it("trie par enjeu et non par date", () => {
    const g = graphOf({
      projects: [{ id: "p1", name: "Gros", type: "project", status: "active" }],
      finance: [{ id: "f1", type: "invoice", amount: 20_000, currency: "TND", status: "sent", issued: day(-20), project: "p1" }],
      tasks: [
        { id: "vieux", label: "Vieux détail", done: false, due: day(-100) },
        { id: "cher", label: "Bloque un encaissement", done: false, due: day(-2), project: "p1" },
      ],
    });
    expect(debt(g, NOW).items[0].id).toBe("cher");
  });

  it("marque les fossiles au-delà du seuil, pas pile dessus", () => {
    const g = graphOf({
      tasks: [
        { id: "pile", label: "Pile au seuil", done: false, due: day(-TODAY_LIMITS.fossilDays) },
        { id: "apres", label: "Un jour de plus", done: false, due: day(-TODAY_LIMITS.fossilDays - 1) },
      ],
    });
    const out = debt(g, NOW);
    expect(out.fossilCount).toBe(1);
    expect(out.items.find((i) => i.id === "apres")?.fossil).toBe(true);
    expect(out.items.find((i) => i.id === "pile")?.fossil).toBe(false);
  });

  it("ignore les tâches sans échéance", () => {
    const g = graphOf({ tasks: [{ id: "t", label: "Sans date", done: false }] });
    expect(debt(g, NOW).items).toHaveLength(0);
  });
});

describe("healthBreakdown", () => {
  it("renvoie trois facettes nommées, chacune avec sa raison", () => {
    const facets = healthBreakdown(graphOf(), NOW);
    expect(facets.map((f) => f.id)).toEqual(["argent", "jalons", "prod"]);
    expect(facets.every((f) => f.reason.length > 0)).toBe(true);
  });

  it("passe l'argent en critique quand la plus vieille facture dépasse le seuil", () => {
    const g = graphOf({
      finance: [{ id: "f1", type: "invoice", amount: 100, currency: "TND", status: "sent", issued: day(-TODAY_LIMITS.cashCriticalDays - 1) }],
    });
    expect(healthBreakdown(g, NOW)[0].state).toBe("critique");
  });

  it("tend les jalons dès un critique imminent et les passe en critique au-delà de deux", () => {
    const one = graphOf({ deadlines: [{ id: "d1", date: day(1), label: "A", critical: true }] });
    expect(healthBreakdown(one, NOW)[1].state).toBe("tendu");

    const three = graphOf({
      deadlines: [
        { id: "d1", date: day(1), label: "A", critical: true },
        { id: "d2", date: day(2), label: "B", critical: true },
        { id: "d3", date: day(-1), label: "C", critical: true },
      ],
    });
    expect(healthBreakdown(three, NOW)[1].state).toBe("critique");
  });

  it("juge la production sur l'activité réelle du journal", () => {
    const dormants = (n: number) =>
      Array.from({ length: n }, (_, i) => ({
        id: `dormant${i}`,
        name: `Dormant ${i}`,
        type: "project" as const,
        status: "active",
      }));
    const vivant = { id: "p1", name: "Vivant", type: "project" as const, status: "active" };

    // 1 projet vivant sur 4, soit la limite basse de « tendu ».
    const tendu = graphOf({ projects: [vivant, ...dormants(3)], log: [logEntry(-1, "p1", "project")] });
    expect(healthBreakdown(tendu, NOW)[2].state).toBe("tendu");

    // 1 sur 5 passe sous la limite.
    const critique = graphOf({ projects: [vivant, ...dormants(4)], log: [logEntry(-1, "p1", "project")] });
    expect(healthBreakdown(critique, NOW)[2].state).toBe("critique");
  });

  it("compte un projet comme vivant quand c'est une de ses tâches qui a bougé", () => {
    const g = graphOf({
      projects: [{ id: "p1", name: "P", type: "project", status: "active" }],
      tasks: [{ id: "t1", label: "T", done: false, project: "p1" }],
      log: [logEntry(-1, "t1", "task")],
    });
    expect(healthBreakdown(g, NOW)[2].state).toBe("ok");
  });
});

describe("helpers de fenêtre", () => {
  it("logSince ne garde que les entrées postérieures et les trie du plus récent au plus ancien", () => {
    const log = [logEntry(-10, "vieux", "task"), logEntry(-1, "recent", "task"), logEntry(-2, "moyen", "task")];
    const out = logSince(log, new Date(NOW.getTime() - 3 * 86_400_000));
    expect(out.map((e) => e.entity)).toEqual(["recent", "moyen"]);
  });

  it("tasksDoneSince ignore les tâches ouvertes et celles sans done_date", () => {
    const tasks = [
      { id: "a", label: "A", done: true, done_date: day(0) },
      { id: "b", label: "B", done: false, done_date: day(0) },
      { id: "c", label: "C", done: true },
    ];
    expect(tasksDoneSince(tasks, new Date(NOW.getTime() - 86_400_000)).map((t) => t.id)).toEqual(["a"]);
  });
});

describe("okrStrip", () => {
  const okr = (id: string, quarter: string, value: number, target: number) => ({
    id, quarter, objective: `Objectif ${id}`,
    krs: [{ id: `${id}-kr`, label: "KR", target, value, unit: "" }],
  });

  it("ne garde que les objectifs du trimestre courant", () => {
    const g = graphOf({ okrs: [okr("a", "2026-Q3", 5, 10), okr("b", "2026-Q2", 10, 10)] });
    expect(okrStrip(g, NOW).objectives.map((o) => o.id)).toEqual(["a"]);
  });

  it("mesure le rythme comme l'écart au temps écoulé du trimestre", () => {
    const g = graphOf({ okrs: [okr("a", "2026-Q3", 5, 10)] });
    const s = okrStrip(g, NOW);
    // Au 20 septembre, le T3 est écoulé à environ 88 % et l'objectif est à 50 %.
    expect(s.elapsedPct).toBeGreaterThan(80);
    expect(s.globalPct).toBe(50);
    expect(s.pace).toBeCloseTo(50 - s.elapsedPct, 6);
    expect(s.objectives[0].tone).toBe("risk");
  });

  it("qualifie en win un objectif en avance sur le calendrier", () => {
    const g = graphOf({ okrs: [okr("a", "2026-Q3", 10, 10)] });
    expect(okrStrip(g, NOW).objectives[0].tone).toBe("win");
  });

  it("réclame la planification quand le trimestre suivant est vide et la fin proche", () => {
    const g = graphOf({ okrs: [okr("a", "2026-Q3", 5, 10)] });
    const s = okrStrip(g, NOW);
    expect(s.nextQuarter).toBe("2026-Q4");
    expect(s.daysLeft).toBeLessThanOrEqual(TODAY_LIMITS.planningWindowDays);
    expect(s.planningDue).toBe(true);
  });

  it("ne réclame rien si le trimestre suivant a déjà un objectif", () => {
    const g = graphOf({ okrs: [okr("a", "2026-Q3", 5, 10), okr("b", "2026-Q4", 0, 10)] });
    expect(okrStrip(g, NOW).planningDue).toBe(false);
  });

  it("passe à Q1 de l'année suivante depuis un quatrième trimestre", () => {
    const enDecembre = new Date("2026-12-10T12:00:00.000Z");
    expect(okrStrip(graphOf(), enDecembre).nextQuarter).toBe("2027-Q1");
  });

  it("reste à zéro sans objectif, sans diviser par zéro", () => {
    const s = okrStrip(graphOf(), NOW);
    expect(s.globalPct).toBe(0);
    expect(s.objectives).toEqual([]);
  });
});

describe("recentActivity", () => {
  it("trie du plus récent au plus ancien et respecte le plafond", () => {
    const g = graphOf({ log: [logEntry(-5, "a", "task"), logEntry(-1, "b", "task"), logEntry(-3, "c", "task")] });
    const out = recentActivity(g, 2);
    expect(out.map((e) => e.detail)).toHaveLength(2);
    expect(Date.parse(out[0].ts)).toBeGreaterThan(Date.parse(out[1].ts));
  });

  it("marque comme nouveau ce qui suit la dernière visite", () => {
    const g = graphOf({ log: [logEntry(-1, "recent", "task"), logEntry(-10, "vieux", "task")] });
    const out = recentActivity(g, 10, new Date(NOW.getTime() - 3 * 86_400_000));
    expect(out[0].isNew).toBe(true);
    expect(out[1].isNew).toBe(false);
  });

  it("ignore les entrées dont l'horodatage est illisible", () => {
    const g = graphOf({ log: [{ ts: "pas une date", action: "x", entity: "y", detail: "", by: "t", synced: true }] });
    expect(recentActivity(g)).toEqual([]);
  });
});

describe("quarterProgress", () => {
  it("borne le pourcentage écoulé et compte les jours restants", () => {
    const q = quarterProgress(new Date(2026, 6, 1, 0));
    expect(q.elapsedPct).toBeGreaterThanOrEqual(0);
    expect(q.elapsedPct).toBeLessThan(2);
    expect(q.daysLeft).toBeGreaterThan(80);
  });
});

describe("briefing, falaise de revenu et pipeline périmé", () => {
  it("annonce la falaise quand le revenu engagé couvre peu de mois", () => {
    const g = graphOf({
      finance: [
        { id: "f1", type: "invoice", amount: 2000, currency: "TND", status: "sent", issued: day(10) },
        { id: "f2", type: "invoice", amount: 2000, currency: "TND", status: "sent", issued: day(40) },
      ],
    });
    const line = briefing(g, NOW).find((l) => l.id === "horizon");
    expect(line?.tone).toBe("watch");
    expect(line?.text).toContain("octobre");
  });

  it("ne dit rien quand rien n'est engagé, plutôt que d'inventer une alerte", () => {
    expect(briefing(graphOf(), NOW).find((l) => l.id === "horizon")).toBeUndefined();
  });

  it("signale les opportunités périmées comme donnée à trancher, pas comme échec", () => {
    const g = graphOf({
      bdm: { opportunities: [
        { id: "o1", name: "Périmée", type: "grant", status: "lead", deadline: day(-30) },
        { id: "o2", name: "Périmée aussi", type: "grant", status: "contact", deadline: day(-10) },
      ] },
    });
    const line = briefing(g, NOW).find((l) => l.id === "pipeline-stale");
    expect(line?.tone).toBe("info");
    expect(line?.text).toContain("2");
  });
});

describe("briefing, seuil de rentabilité", () => {
  const salaire = {
    id: "exp-remu", label: "Rémunération", amount: 2500, currency: "TND" as const,
    date: "2026-01-01", recurring: true, frequency: "monthly" as const,
  };

  it("dit combien il manque chaque mois quand les charges ne sont pas couvertes", () => {
    const g = graphOf({
      expenses: [salaire],
      finance: [{ id: "f1", type: "invoice", amount: 3000, currency: "TND", status: "paid", issued: day(-60) }],
    });
    const line = briefing(g, NOW).find((l) => l.id === "burn");
    expect(line?.tone).toBe("watch");
    expect(line?.text).toContain("Il manque");
    expect(line?.money).toBeGreaterThan(0);
  });

  it("se tait quand aucune charge récurrente n'est déclarée", () => {
    expect(briefing(graphOf(), NOW).find((l) => l.id === "burn")).toBeUndefined();
  });

  it("annonce la marge quand le revenu dépasse les charges", () => {
    const g = graphOf({
      expenses: [salaire],
      finance: [{ id: "f1", type: "invoice", amount: 80_000, currency: "TND", status: "paid", issued: day(-60) }],
    });
    const line = briefing(g, NOW).find((l) => l.id === "burn");
    expect(line?.text).toContain("couvertes");
    expect(line?.tone).toBe("info");
  });
});
