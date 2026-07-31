import { describe, it, expect } from "vitest";
import {
  daysUntil, toTND, restOf, oppDeadlineStatus, closingSoon, relances,
  imminentDeadlines, focusToday, kpiOk, kpiValue, healthScore,
  curQuarter, okrKrValue, okrKrProgress, okrObjectiveProgress, ganttItems,
  monthlySeries, cashProjection, identitySplit, clientSplit, funnelCounts, sumsByCurrency, buildAlerts,
  clientConcentration, runRateProjection, pipelineWinRate, monthlyAnomaly,
  isOpportunityExpired, bdmSummary, financeOverview,
  libraryTriage, libraryMatches, libraryByCategory, libraryCategoryCounts, graphEntityCount,
  assetKindLabel, assetMatches, assetKindGroups, assetKindCounts, assetClientLabel, assetClientGroups,
  cfStageLabel, cfAdjacentStage, cfSummary,
  graphEntities, graphEdges, graphNodeDegrees, loadHistoricalEntities, graphEntitiesWithHistory, loadHistoricalEdges,
  serializeGraphForAsk, graphAnalytics, clientOverview, futureCommitments,
} from "@/lib/os/compute";
import type { GraphEntity } from "@/lib/os/compute";
import type { OsAsset, OsCfBatch, OsClient, OsGraph, OsIdentity, OsLibraryItem, OsLogEntry, OsProject } from "@/lib/os/types";

const NOW = new Date("2026-07-22T12:00:00.000Z");

describe("daysUntil", () => {
  it("returns null for missing/invalid dates", () => {
    expect(daysUntil(undefined, NOW)).toBeNull();
    expect(daysUntil("not-a-date", NOW)).toBeNull();
  });
  it("is negative for past dates", () => {
    expect(daysUntil("2026-07-20", NOW)).toBeLessThan(0);
  });
  it("is positive for future dates", () => {
    expect(daysUntil("2026-08-01", NOW)).toBeGreaterThan(0);
  });
});

describe("toTND / restOf", () => {
  it("converts EUR using the given rate, leaves TND untouched", () => {
    expect(toTND(100, "EUR", 3.38)).toBeCloseTo(338);
    expect(toTND(100, "TND", 3.38)).toBe(100);
  });
  it("computes remaining amount after advance, never negative", () => {
    expect(restOf({ amount: 1000, advance: 300 })).toBe(700);
    expect(restOf({ amount: 100, advance: 500 })).toBe(0);
  });
});

describe("oppDeadlineStatus / closingSoon", () => {
  it("is 'none' without a deadline", () => {
    expect(oppDeadlineStatus({ deadline: undefined }, NOW).status).toBe("none");
  });
  it("classifies expired / urgent / soon / ok", () => {
    expect(oppDeadlineStatus({ deadline: "2026-07-20" }, NOW).status).toBe("expired");
    expect(oppDeadlineStatus({ deadline: "2026-07-24" }, NOW).status).toBe("urgent");
    expect(oppDeadlineStatus({ deadline: "2026-08-02" }, NOW).status).toBe("soon");
    expect(oppDeadlineStatus({ deadline: "2026-09-01" }, NOW).status).toBe("ok");
  });
  it("keeps only open opportunities closing within 14 days, most urgent first", () => {
    const opps = [
      { id: "a", name: "A", type: "lead", status: "lead", deadline: "2026-08-02" },
      { id: "b", name: "B", type: "lead", status: "won", deadline: "2026-07-23" },
      { id: "c", name: "C", type: "lead", status: "lead", deadline: "2026-07-23" },
      { id: "d", name: "D", type: "lead", status: "lead", deadline: "2026-12-01" },
    ] as const;
    const result = closingSoon([...opps], NOW);
    expect(result.map((o) => o.id)).toEqual(["c", "a"]);
  });
});

describe("relances", () => {
  it("flags invoices sent/partial issued >14 days ago and quotes sent >10 days ago", () => {
    const graph = {
      finance: [
        { id: "f1", type: "invoice" as const, amount: 1000, currency: "TND" as const, status: "sent" as const, issued: "2026-07-01" },
        { id: "f2", type: "invoice" as const, amount: 500, currency: "TND" as const, status: "sent" as const, issued: "2026-07-20" },
        { id: "f3", type: "invoice" as const, amount: 200, currency: "TND" as const, status: "paid" as const, issued: "2026-06-01" },
      ],
      quotes: [
        { id: "q1", amount: 300, currency: "TND" as const, status: "sent" as const, issued: "2026-07-05" },
      ],
    };
    const result = relances(graph, NOW);
    expect(result.map((r) => r.id)).toEqual(["f1", "q1"]);
    expect(result[0].daysSince).toBeGreaterThan(14);
  });
});

describe("imminentDeadlines", () => {
  it("includes overdue and near-term, excludes done and far-future", () => {
    const deadlines = [
      { id: "d1", date: "2026-07-20", label: "Late", done: false },
      { id: "d2", date: "2026-07-25", label: "Soon", done: false },
      { id: "d3", date: "2026-08-20", label: "Far", done: false },
      { id: "d4", date: "2026-07-21", label: "Done already", done: true },
    ];
    const result = imminentDeadlines(deadlines, NOW, 7);
    expect(result.map((d) => d.id)).toEqual(["d1", "d2"]);
    expect(result[0].overdue).toBe(true);
  });
});

describe("focusToday", () => {
  it("prioritises an overdue deadline over tasks and cash", () => {
    const graph = {
      deadlines: [{ id: "d1", date: "2026-07-20", label: "Late", done: false }],
      tasks: [{ id: "t1", label: "T", done: false, due: "2026-07-21" }],
      finance: [{ id: "f1", type: "invoice" as const, amount: 5000, currency: "TND" as const, status: "sent" as const }],
      meta: {},
    };
    const focus = focusToday(graph, NOW);
    expect(focus.overdue).toBe(true);
    expect(focus.deadline?.id).toBe("d1");
  });
  it("falls back to the biggest pending invoice when nothing is overdue", () => {
    const graph = {
      deadlines: [],
      tasks: [],
      finance: [
        { id: "f1", type: "invoice" as const, amount: 500, currency: "TND" as const, status: "sent" as const },
        { id: "f2", type: "invoice" as const, amount: 5000, currency: "TND" as const, status: "sent" as const },
      ],
      meta: {},
    };
    const focus = focusToday(graph, NOW);
    expect(focus.overdue).toBe(false);
    expect(focus.cashInvoice?.id).toBe("f2");
  });
});

describe("kpiOk / kpiValue / healthScore", () => {
  it("kpiOk respects direction (min = ceiling, max = floor)", () => {
    expect(kpiOk({ dir: "min", target: 10 }, 5)).toBe(true);
    expect(kpiOk({ dir: "min", target: 10 }, 15)).toBe(false);
    expect(kpiOk({ dir: "max", target: 10 }, 15)).toBe(true);
  });
  it("kpiValue computes lateCount from overdue deadlines and tasks", () => {
    const graph = {
      finance: [],
      deadlines: [{ id: "d1", date: "2026-07-20", label: "Late", done: false }],
      tasks: [{ id: "t1", label: "T", done: false, due: "2026-07-19" }],
      bdm: { opportunities: [] },
    };
    const k = { id: "k1", name: "Retards", dir: "min" as const, target: 0, auto: "lateCount" };
    expect(kpiValue(k, graph, NOW)).toBe(2);
  });
  it("healthScore defaults to 100 with no KPIs, and drops with late items", () => {
    const base = { kpis: [], deadlines: [], tasks: [], finance: [], bdm: { opportunities: [] } };
    expect(healthScore(base, NOW)).toBe(100);
    const late = { ...base, deadlines: [{ id: "d1", date: "2026-07-01", label: "Late", done: false }] };
    expect(healthScore(late, NOW)).toBe(95);
  });
});

describe("curQuarter / okrKrValue / okrKrProgress / okrObjectiveProgress", () => {
  it("computes the calendar quarter", () => {
    expect(curQuarter(NOW)).toBe("2026-Q3");
    expect(curQuarter(new Date("2026-01-15"))).toBe("2026-Q1");
    expect(curQuarter(new Date("2026-12-31"))).toBe("2026-Q4");
  });

  it("uses the manual value when kr.auto is not ca_quarter", () => {
    const kr = { id: "k1", label: "Candidatures", target: 2, value: 3, unit: "" };
    expect(okrKrValue(kr, { finance: [] }, NOW)).toBe(3);
  });

  it("sums current-quarter invoices in TND when kr.auto is ca_quarter", () => {
    const graph = {
      finance: [
        { id: "f1", type: "invoice" as const, amount: 1000, currency: "TND" as const, status: "paid" as const, issued: "2026-08-01" },
        { id: "f2", type: "invoice" as const, amount: 100, currency: "EUR" as const, status: "paid" as const, issued: "2026-09-15" },
        { id: "f3", type: "invoice" as const, amount: 5000, currency: "TND" as const, status: "paid" as const, issued: "2026-04-01" },
      ],
    };
    const kr = { id: "k1", label: "CA", target: 1000, value: 0, unit: "TND", auto: "ca_quarter" };
    expect(okrKrValue(kr, graph, NOW)).toBeCloseTo(1000 + 100 * 3.4);
  });

  it("caps progress at 100%", () => {
    const kr = { id: "k1", label: "X", target: 100, value: 250, unit: "" };
    expect(okrKrProgress(kr, { finance: [] }, NOW)).toBe(100);
  });

  it("averages KR progress for the objective, 0 with no KRs", () => {
    const okr = {
      krs: [
        { id: "k1", label: "A", target: 100, value: 50, unit: "" },
        { id: "k2", label: "B", target: 100, value: 100, unit: "" },
      ],
    };
    expect(okrObjectiveProgress(okr, { finance: [] }, NOW)).toBe(75);
    expect(okrObjectiveProgress({ krs: [] }, { finance: [] }, NOW)).toBe(0);
  });
});

describe("ganttItems", () => {
  it("returns an empty frise when there is nothing dated", () => {
    expect(ganttItems([], [], undefined, NOW)).toEqual({ items: [], nowPct: 0 });
  });

  it("combines deadlines and dated tasks, filtered by project, sorted chronologically", () => {
    const deadlines = [
      { id: "d1", date: "2026-08-01", label: "D1", project: "p1", done: false, critical: true },
      { id: "d2", date: "2026-07-25", label: "D2", project: "p2", done: false },
    ];
    const tasks = [
      { id: "t1", label: "T1", done: false, project: "p1", due: "2026-07-28" },
      { id: "t2", label: "T2", done: false, project: "p2", due: "2026-07-20" },
    ];
    const { items } = ganttItems(deadlines, tasks, "p1", NOW);
    expect(items.map((i) => i.id)).toEqual(["t1", "d1"]);
  });

  it("positions items proportionally, first item never before 0% and last at 100%", () => {
    const deadlines = [
      { id: "d1", date: "2026-07-22", label: "Start", done: false },
      { id: "d2", date: "2026-08-01", label: "End", done: false },
    ];
    const { items } = ganttItems(deadlines, [], undefined, NOW);
    expect(items[0].pct).toBe(0);
    expect(items[items.length - 1].pct).toBe(100);
  });

  it("positions 'now' at 0% when every item is in the future", () => {
    const deadlines = [{ id: "d1", date: "2026-08-01", label: "Future", done: false }];
    const { nowPct } = ganttItems(deadlines, [], undefined, NOW);
    expect(nowPct).toBe(0);
  });

  it("positions 'now' at 100% when every item is in the past", () => {
    const deadlines = [
      { id: "d1", date: "2026-07-01", label: "Past 1", done: false },
      { id: "d2", date: "2026-07-10", label: "Past 2", done: false },
    ];
    const { nowPct } = ganttItems(deadlines, [], undefined, NOW);
    expect(nowPct).toBe(100);
  });

  it("positions 'now' proportionally between past and future items", () => {
    const deadlines = [
      { id: "d1", date: "2026-07-12", label: "Start", done: false },
      { id: "d2", date: "2026-08-01", label: "End", done: false },
    ];
    // span 2026-07-12T00:00 -> 2026-08-01T00:00 = 20 days ; NOW = 2026-07-22T12:00 = 10.5 days in -> 52.5%
    const { nowPct } = ganttItems(deadlines, [], undefined, NOW);
    expect(nowPct).toBeCloseTo(52.5);
  });
});

describe("monthlySeries / cashProjection", () => {
  const finance = [
    { id: "f1", type: "invoice" as const, amount: 1000, currency: "TND" as const, status: "paid" as const, issued: "2026-07-01", paid_date: "2026-07-10" },
    { id: "f2", type: "invoice" as const, amount: 500, currency: "TND" as const, status: "sent" as const, issued: "2026-07-15" },
    { id: "f3", type: "invoice" as const, amount: 100, currency: "EUR" as const, status: "sent" as const, issued: "2026-06-01" },
  ];

  it("returns 12 months ending on the current month, with paid/billed in TND", () => {
    const series = monthlySeries(finance, NOW, 3.38);
    expect(series).toHaveLength(12);
    expect(series[11].key).toBe("2026-07");
    expect(series[11].paid).toBe(1000);
    expect(series[11].billed).toBe(1500);
  });

  it("buckets pending invoices by age/status into d30/d60/d90", () => {
    const p = cashProjection(finance, NOW, 3.38);
    // f2: sent, issued 2026-07-15 -> age 7j (<=21) -> d30
    expect(p.d30).toBe(500);
    // f3: sent, issued 2026-06-01 -> age > 21j -> d60
    expect(p.d60).toBeCloseTo(100 * 3.38);
    expect(p.d90).toBe(0);
  });

  it("excludes cancelled invoices from the billed series (replaced-invoice case)", () => {
    const withCancelled = [
      ...finance,
      { id: "f4", type: "invoice" as const, amount: 1600, currency: "TND" as const, status: "cancelled" as const, issued: "2026-07-18", replaced_by: "f2" },
    ];
    const series = monthlySeries(withCancelled, NOW, 3.38);
    // le montant annulé (1600) ne doit pas s'ajouter au billed de juillet
    expect(series[11].billed).toBe(1500);
  });

  it("buckets a future-issued invoice by proximity of its issued date, not as always-imminent (recurring-series case)", () => {
    // NOW = 2026-07-22. Une facture "sent" émise dans 40 jours (proche de d60) ne doit pas
    // atterrir dans d30 juste parce que son âge (négatif) était historiquement toujours ≤21.
    const future = [
      { id: "near", type: "invoice" as const, amount: 100, currency: "TND" as const, status: "sent" as const, issued: "2026-08-05" }, // dans 14j -> d30
      { id: "mid", type: "invoice" as const, amount: 200, currency: "TND" as const, status: "sent" as const, issued: "2026-08-31" }, // dans 40j -> d60
      { id: "far", type: "invoice" as const, amount: 300, currency: "TND" as const, status: "sent" as const, issued: "2026-12-27" }, // dans ~150j -> hors fenêtre 90j
    ];
    const p = cashProjection(future, NOW);
    expect(p.d30).toBe(100);
    expect(p.d60).toBe(200);
    expect(p.d90).toBe(0);
  });
});

describe("futureCommitments", () => {
  const NOW2 = new Date("2026-07-22T12:00:00.000Z");

  it("groups already-created, non-cancelled future invoices by month, current month through monthsAhead", () => {
    const finance = [
      { id: "f1", type: "invoice" as const, amount: 1600, currency: "EUR" as const, status: "sent" as const, issued: "2026-07-27" },
      { id: "f2", type: "invoice" as const, amount: 1000, currency: "EUR" as const, status: "sent" as const, issued: "2026-08-27" },
      { id: "f3", type: "invoice" as const, amount: 900, currency: "EUR" as const, status: "cancelled" as const, issued: "2026-08-15" },
      { id: "f4", type: "invoice" as const, amount: 5000, currency: "EUR" as const, status: "sent" as const, issued: "2027-06-01" }, // hors fenêtre
    ];
    const months = futureCommitments(finance, NOW2, 3, 3.38);
    expect(months).toHaveLength(4); // juillet (mois courant) -> octobre inclus
    expect(months[0].key).toBe("2026-07");
    expect(months[0].amountTND).toBeCloseTo(1600 * 3.38);
    expect(months[1].key).toBe("2026-08");
    expect(months[1].amountTND).toBeCloseTo(1000 * 3.38); // f3 annulée exclue
    expect(months[1].count).toBe(1);
    expect(months.every((m) => m.key !== "2027-06")).toBe(true);
  });

  it("returns zero-amount months when nothing is committed", () => {
    const months = futureCommitments([], NOW2, 2);
    expect(months).toHaveLength(3);
    expect(months.every((m) => m.amountTND === 0 && m.count === 0)).toBe(true);
  });
});

describe("identitySplit / clientSplit / funnelCounts / sumsByCurrency", () => {
  it("splits invoice amounts across a project's identities, defaulting to fmrxr-studio", () => {
    const finance = [
      { id: "f1", type: "invoice" as const, amount: 1000, currency: "TND" as const, status: "paid" as const, project: "p1" },
      { id: "f2", type: "invoice" as const, amount: 500, currency: "TND" as const, status: "paid" as const },
    ];
    const projects = [
      { id: "p1", name: "P1", type: "project" as const, status: "active" as const, identity: ["effet-mere", "fmrxr-studio"] },
    ];
    const split = identitySplit(finance, projects);
    const asMap = Object.fromEntries(split);
    expect(asMap["effet-mere"]).toBe(500);
    expect(asMap["fmrxr-studio"]).toBe(500 + 500);
  });

  it("sums per client, sorted descending", () => {
    const finance = [
      { id: "f1", type: "invoice" as const, amount: 100, currency: "TND" as const, status: "paid" as const, client: "c1" },
      { id: "f2", type: "invoice" as const, amount: 900, currency: "TND" as const, status: "paid" as const, client: "c2" },
    ];
    expect(clientSplit(finance)).toEqual([["c2", 900], ["c1", 100]]);
  });

  it("excludes cancelled invoices from identitySplit and clientSplit (replaced-invoice case)", () => {
    const finance = [
      { id: "f1", type: "invoice" as const, amount: 1000, currency: "TND" as const, status: "paid" as const, client: "c1", project: "p1" },
      { id: "f2", type: "invoice" as const, amount: 1600, currency: "TND" as const, status: "cancelled" as const, client: "c1", project: "p1", replaced_by: "f1" },
    ];
    const projects = [{ id: "p1", name: "P1", type: "project" as const, status: "active" as const, identity: ["fmrxr-studio"] }];
    expect(Object.fromEntries(identitySplit(finance, projects))["fmrxr-studio"]).toBe(1000);
    expect(clientSplit(finance)).toEqual([["c1", 1000]]);
  });

  it("counts opportunities per funnel stage", () => {
    const opps = [
      { id: "o1", name: "A", type: "lead" as const, status: "lead" as const },
      { id: "o2", name: "B", type: "lead" as const, status: "proposal" as const },
      { id: "o3", name: "C", type: "lead" as const, status: "won" as const },
    ];
    expect(funnelCounts(opps)).toEqual([
      { status: "lead", label: "piste", count: 1 },
      { status: "contact", label: "contacté", count: 0 },
      { status: "proposal", label: "proposition", count: 1 },
      { status: "won", label: "gagné", count: 1 },
    ]);
  });

  it("formats mixed-currency sums without converting", () => {
    const expected = `${(1500).toLocaleString("fr-FR")} TND + ${(100).toLocaleString("fr-FR")} €`;
    expect(sumsByCurrency([{ amount: 1500, currency: "TND" }, { amount: 100, currency: "EUR" }])).toBe(expected);
    expect(sumsByCurrency([{ amount: 0, currency: "TND" }])).toBe("0");
  });
});

describe("buildAlerts", () => {
  it("flags an overdue deadline as critical", () => {
    const graph = { deadlines: [{ id: "d1", date: "2026-07-20", label: "Late", done: false }], finance: [], quotes: [], bdm: { opportunities: [] }, log: [] };
    const alerts = buildAlerts(graph, NOW);
    expect(alerts[0].critical).toBe(true);
    expect(alerts[0].title).toContain("Dépassée");
  });

  it("falls back to a calm message when nothing is wrong", () => {
    const graph = { deadlines: [], finance: [], quotes: [], bdm: { opportunities: [] }, log: [] };
    const alerts = buildAlerts(graph, NOW);
    expect(alerts).toHaveLength(1);
    expect(alerts[0].title).toBe("Aucun risque détecté");
  });

  it("caps the list at 8 alerts", () => {
    const deadlines = Array.from({ length: 20 }, (_, i) => ({ id: `d${i}`, date: "2026-07-01", label: `Late ${i}`, done: false }));
    const graph = { deadlines, finance: [], quotes: [], bdm: { opportunities: [] }, log: [] };
    expect(buildAlerts(graph, NOW)).toHaveLength(8);
  });
});

describe("clientConcentration", () => {
  it("is ok with no finance data", () => {
    expect(clientConcentration([]).risk).toBe("ok");
  });

  it("flags high risk when the top client exceeds 20% of CA", () => {
    const finance = [
      { id: "f1", type: "invoice" as const, amount: 3000, currency: "TND" as const, status: "paid" as const, client: "big" },
      { id: "f2", type: "invoice" as const, amount: 1000, currency: "TND" as const, status: "paid" as const, client: "small" },
    ];
    const c = clientConcentration(finance);
    expect(c.topClientId).toBe("big");
    expect(c.topClientPct).toBeCloseTo(75);
    expect(c.risk).toBe("high");
  });

  it("stays ok when revenue is spread across enough clients", () => {
    // 20 clients at equal amounts -> top-5 is 25% of CA, well under the 50% risk threshold.
    const finance = Array.from({ length: 20 }, (_, i) => ({
      id: `f${i}`, type: "invoice" as const, amount: 100, currency: "TND" as const, status: "paid" as const, client: `c${i}`,
    }));
    expect(clientConcentration(finance).risk).toBe("ok");
  });
});

describe("runRateProjection", () => {
  it("projects year-end from YTD run-rate", () => {
    // NOW = 2026-07-22 -> 7 months elapsed, 5 remaining
    const finance = [{ id: "f1", type: "invoice" as const, amount: 7000, currency: "TND" as const, status: "paid" as const, issued: "2026-03-01" }];
    const r = runRateProjection(finance, NOW);
    expect(r.ytdBilled).toBe(7000);
    expect(r.monthsRemaining).toBe(5);
    expect(r.avgMonthly).toBeCloseTo(1000);
    expect(r.projectedYearEnd).toBeCloseTo(7000 + 1000 * 5);
  });

  it("excludes cancelled invoices from ytdBilled (replaced-invoice case)", () => {
    const finance = [
      { id: "f1", type: "invoice" as const, amount: 7000, currency: "TND" as const, status: "paid" as const, issued: "2026-03-01" },
      { id: "f2", type: "invoice" as const, amount: 1600, currency: "TND" as const, status: "cancelled" as const, issued: "2026-07-18", replaced_by: "f1" },
    ];
    expect(runRateProjection(finance, NOW).ytdBilled).toBe(7000);
  });

  it("ignores invoices from other years", () => {
    const finance = [{ id: "f1", type: "invoice" as const, amount: 5000, currency: "TND" as const, status: "paid" as const, issued: "2025-01-01" }];
    expect(runRateProjection(finance, NOW).ytdBilled).toBe(0);
  });
});

describe("pipelineWinRate", () => {
  it("returns null win rate with no closed opportunities", () => {
    const opps = [{ id: "o1", name: "A", type: "lead" as const, status: "lead" as const }];
    expect(pipelineWinRate(opps).winRatePct).toBeNull();
  });

  it("computes won / (won+lost)", () => {
    const opps = [
      { id: "o1", name: "A", type: "lead" as const, status: "won" as const },
      { id: "o2", name: "B", type: "lead" as const, status: "won" as const },
      { id: "o3", name: "C", type: "lead" as const, status: "lost" as const },
    ];
    const r = pipelineWinRate(opps);
    expect(r.won).toBe(2);
    expect(r.lost).toBe(1);
    expect(r.winRatePct).toBeCloseTo((2 / 3) * 100);
  });
});

describe("monthlyAnomaly", () => {
  it("reports no anomaly with insufficient history", () => {
    expect(monthlyAnomaly([{ key: "2026-07", label: "juil.", paid: 0, billed: 100 }]).isAnomaly).toBe(false);
  });

  it("flags a month that deviates beyond the threshold from its rolling average", () => {
    const series = [
      { key: "1", label: "a", paid: 0, billed: 1000 },
      { key: "2", label: "b", paid: 0, billed: 1000 },
      { key: "3", label: "c", paid: 0, billed: 1000 },
      { key: "4", label: "current", paid: 0, billed: 3000 },
    ];
    const a = monthlyAnomaly(series, 40);
    expect(a.isAnomaly).toBe(true);
    expect(a.direction).toBe("above");
    expect(a.deviationPct).toBeCloseTo(200);
  });

  it("does not flag a month within the threshold", () => {
    const series = [
      { key: "1", label: "a", paid: 0, billed: 1000 },
      { key: "2", label: "b", paid: 0, billed: 1000 },
      { key: "3", label: "current", paid: 0, billed: 1100 },
    ];
    expect(monthlyAnomaly(series, 40).isAnomaly).toBe(false);
  });
});

describe("isOpportunityExpired / bdmSummary", () => {
  it("is expired via manual status or a past deadline", () => {
    expect(isOpportunityExpired({ status: "expired" }, NOW)).toBe(true);
    expect(isOpportunityExpired({ status: "lead", deadline: "2026-07-01" }, NOW)).toBe(true);
    expect(isOpportunityExpired({ status: "lead", deadline: "2026-08-01" }, NOW)).toBe(false);
  });

  it("counts active/proposal/closing/won, excluding won/lost/expired from active", () => {
    const opps = [
      { id: "o1", name: "A", type: "lead" as const, status: "lead" as const },
      { id: "o2", name: "B", type: "lead" as const, status: "proposal" as const },
      { id: "o3", name: "C", type: "lead" as const, status: "won" as const },
      { id: "o4", name: "D", type: "lead" as const, status: "lost" as const },
      { id: "o5", name: "E", type: "lead" as const, status: "expired" as const },
      { id: "o6", name: "F", type: "lead" as const, status: "lead" as const, deadline: "2026-07-24" }, // urgent, closes in 2 days
    ];
    const s = bdmSummary(opps, NOW);
    expect(s.activeCount).toBe(3); // o1, o2, o6 (not won/lost/expired)
    expect(s.proposalCount).toBe(1);
    expect(s.closingSoonCount).toBe(1);
    expect(s.closingUrgentCount).toBe(1);
    expect(s.wonCount).toBe(1);
  });
});

describe("financeOverview", () => {
  const finance = [
    { id: "f1", type: "invoice" as const, amount: 1000, currency: "TND" as const, status: "paid" as const, issued: "2026-03-01" },
    { id: "f2", type: "invoice" as const, amount: 500, currency: "TND" as const, advance: 200, status: "partial" as const, issued: "2026-07-01" },
    { id: "f3", type: "invoice" as const, amount: 100, currency: "EUR" as const, status: "sent" as const, issued: "2025-01-01" },
    { id: "f4", type: "invoice" as const, amount: null as unknown as number, currency: "TND" as const, status: "draft" as const },
  ];
  const expenses = [
    { id: "e1", label: "SaaS", amount: 200, currency: "TND" as const, date: "2026-05-01", recurring: true },
    { id: "e2", label: "Vieux", amount: 50, currency: "TND" as const, date: "2024-01-01", recurring: false },
  ];

  it("computes cash in (paid + advances), pending (remainder), and year invoices", () => {
    const o = financeOverview(finance, expenses, NOW, 3.38, 75_000);
    expect(o.cashInTND).toBeCloseTo(1000 + 200);
    expect(o.pendingTND).toBeCloseTo(300 + 100 * 3.38);
    expect(o.pendingCount).toBe(2); // f2 (partial), f3 (sent) — f4 is draft, not a pending status
    expect(o.noAmountCount).toBe(1);
    expect(o.yearInvoiceTND).toBeCloseTo(1000 + 500); // f1 + f2 issued in 2026, f3 issued 2025
    expect(o.yearInvoiceCount).toBe(2);
  });

  it("excludes cancelled invoices from yearInvoiceTND/Count (replaced-invoice case)", () => {
    const withCancelled = [
      ...finance,
      { id: "f5", type: "invoice" as const, amount: 1600, currency: "TND" as const, status: "cancelled" as const, issued: "2026-07-18", replaced_by: "f2" },
    ];
    const o = financeOverview(withCancelled, expenses, NOW, 3.38, 75_000);
    expect(o.yearInvoiceTND).toBeCloseTo(1000 + 500); // f5 annulée n'est pas comptée malgré son montant
    expect(o.yearInvoiceCount).toBe(2);
  });

  it("computes the auto-entrepreneur ceiling percentage", () => {
    const o = financeOverview(finance, [], NOW, 3.38, 1500);
    expect(o.plafondPct).toBeCloseTo(((1000 + 500) / 1500) * 100);
  });

  it("computes this year's expenses and net treasury", () => {
    const o = financeOverview(finance, expenses, NOW, 3.38, 75_000);
    expect(o.expenseTND).toBe(200); // only e1 is in 2026
    expect(o.recurringExpenseTND).toBe(200);
    expect(o.netTND).toBeCloseTo(o.cashInTND - 200);
  });
});

describe("clientOverview", () => {
  const finance = [
    { id: "f1", type: "invoice" as const, amount: 1000, currency: "TND" as const, status: "paid" as const, client: "c1" },
    { id: "f2", type: "invoice" as const, amount: 500, currency: "TND" as const, advance: 200, status: "partial" as const, client: "c1" },
    { id: "f3", type: "invoice" as const, amount: 900, currency: "TND" as const, status: "cancelled" as const, client: "c1", replaced_by: "f1" },
    { id: "f4", type: "invoice" as const, amount: 100, currency: "TND" as const, status: "paid" as const, client: "other" },
  ];
  const quotes = [
    { id: "q1", type: "quote" as const, amount: 300, currency: "TND" as const, status: "sent" as const, client: "c1" },
    { id: "q2", type: "quote" as const, amount: 50, currency: "TND" as const, status: "sent" as const, client: "other" },
  ];

  it("sums facturé/encaissé/en attente for one client, excluding other clients and cancelled invoices", () => {
    const o = clientOverview("c1", finance, quotes);
    expect(o.factureTND).toBe(1500); // f1 + f2, f3 annulée exclue, f4 autre client exclue
    expect(o.encaisseTND).toBe(1000 + 200); // f1 payée + avance de f2
    expect(o.enAttenteTND).toBe(300); // reste de f2 (500-200)
    expect(o.invoiceCount).toBe(2);
    expect(o.quoteCount).toBe(1);
  });

  it("returns zeroes for a client with no finance data", () => {
    const o = clientOverview("nobody", finance, quotes);
    expect(o).toEqual({ factureTND: 0, encaisseTND: 0, enAttenteTND: 0, invoiceCount: 0, quoteCount: 0 });
  });
});

describe("libraryTriage / libraryMatches / libraryByCategory / libraryCategoryCounts", () => {
  const library: OsLibraryItem[] = [
    { id: "l1", title: "SEUIL · Couloir liminal", type: "prompt", category: "AI", tags: ["liminal", "vz"], favorite: true, content: { prompt: "empty hallway" } },
    { id: "l2", title: "PEAK · Laser rain", type: "prompt", category: "AI", tags: ["peak"], favorite: false, content: { prompt: "laser beams" } },
    { id: "l3", title: "Mood board", type: "asset", category: "Assets", tags: [], favorite: false, file_ref: "ASSETS/mood.pdf" },
    { id: "l4", title: "Untriaged note", type: "doc" }, // pas de category → inbox de triage
  ];

  it("collects items without a category", () => {
    expect(libraryTriage(library).map((i) => i.id)).toEqual(["l4"]);
  });

  it("matches on title, tags, subcategory and stringified content", () => {
    expect(libraryMatches(library[0], "liminal")).toBe(true);
    expect(libraryMatches(library[0], "hallway")).toBe(true);
    expect(libraryMatches(library[0], "laser")).toBe(false);
    expect(libraryMatches(library[0], "")).toBe(true);
  });

  it("filters by category, applies the search query, and sorts favorites first", () => {
    const items = libraryByCategory(library, "AI");
    expect(items.map((i) => i.id)).toEqual(["l1", "l2"]); // l1 favori → en tête

    const filtered = libraryByCategory(library, "AI", "laser");
    expect(filtered.map((i) => i.id)).toEqual(["l2"]);
  });

  it("counts classified items per category, zero-filled for empty categories", () => {
    const counts = libraryCategoryCounts(library);
    expect(counts.AI).toBe(2);
    expect(counts.Assets).toBe(1);
    expect(counts.Visual).toBe(0);
    expect(counts.Code).toBe(0);
    expect(counts.Knowledge).toBe(0);
  });
});

describe("graphEntityCount", () => {
  it("sums entities across all types, treating missing arrays as empty", () => {
    const count = graphEntityCount({
      identities: [{ id: "i1" } as never],
      projects: [{ id: "p1" } as never, { id: "p2" } as never],
      clients: [{ id: "c1" } as never],
    } as never);
    expect(count).toBe(1 + 2 + 1);
  });
});

describe("assetKindLabel / assetMatches / assetKindGroups / assetKindCounts", () => {
  const assets: OsAsset[] = [
    { id: "a1", name: "FMRXR Brand Guidelines", type: "asset", kind: "brand", file: "FMRXR_Brand_Guidelines.html" },
    { id: "a2", name: "Fiche Technique Scénographie", type: "asset", kind: "technical", file: "VZ_Fiche_Technique.md", project: "vz-calypso" },
    { id: "a3", name: "Figma — VZ Calypso", type: "asset", kind: "figma", url: "https://figma.com/x", project: "vz-calypso" },
    { id: "a4", name: "Mystery doc", type: "asset", kind: "zzz-custom" },
  ];

  it("labels known kinds via the display map, and title-cases unknown kinds", () => {
    expect(assetKindLabel("technical")).toBe("Fiches techniques");
    expect(assetKindLabel("figma")).toBe("Figma — design live");
    expect(assetKindLabel("zzz-custom")).toBe("Zzz-custom");
    expect(assetKindLabel(undefined)).toBe("Autre");
  });

  it("matches on name, file, url and notes", () => {
    expect(assetMatches(assets[0], "brand")).toBe(true);
    expect(assetMatches(assets[1], "scénographie")).toBe(true);
    expect(assetMatches(assets[2], "figma.com")).toBe(true);
    expect(assetMatches(assets[0], "nope")).toBe(false);
  });

  it("groups by kind in ASSET_KIND_LABELS order, unknown kinds appended alphabetically, filtered by query", () => {
    const groups = assetKindGroups(assets);
    expect(groups.map((g) => g.kind)).toEqual(["brand", "technical", "figma", "zzz-custom"]);
    expect(groups.find((g) => g.kind === "technical")?.items).toHaveLength(1);

    const filtered = assetKindGroups(assets, "brand");
    expect(filtered.map((g) => g.kind)).toEqual(["brand"]);
  });

  it("counts assets per kind, unaffected by search", () => {
    const counts = assetKindCounts(assets);
    expect(counts.brand).toBe(1);
    expect(counts.technical).toBe(1);
    expect(counts.figma).toBe(1);
    expect(counts["zzz-custom"]).toBe(1);
  });
});

describe("cfStageLabel / cfAdjacentStage / cfSummary", () => {
  const batches: OsCfBatch[] = [
    { id: "b1", name: "Set 1", stage: "attente" },
    { id: "b2", name: "Set 2", stage: "attente" },
    { id: "b3", name: "Set 3", stage: "montage" },
    { id: "b4", name: "Set 4", stage: "livre" },
  ];

  it("labels stages", () => {
    expect(cfStageLabel("montage")).toBe("Montage maître (synchro son)");
    expect(cfStageLabel("livre")).toBe("Livré");
  });

  it("computes the adjacent stage, bounded at both ends", () => {
    expect(cfAdjacentStage("attente", 1)).toBe("ingere");
    expect(cfAdjacentStage("attente", -1)).toBe(null); // déjà à la première étape
    expect(cfAdjacentStage("livre", 1)).toBe(null); // déjà à la dernière étape
    expect(cfAdjacentStage("montage", -1)).toBe("ingere");
  });

  it("summarizes counts per stage and total delivered", () => {
    const s = cfSummary(batches);
    expect(s.total).toBe(4);
    expect(s.doneCount).toBe(1);
    expect(s.counts.attente).toBe(2);
    expect(s.counts.montage).toBe(1);
    expect(s.counts.ingere).toBe(0);
  });
});

describe("assetClientLabel / assetClientGroups", () => {
  const projects: OsProject[] = [
    { id: "vz-calypso", name: "VIGILANCE ZERO × CALYPSO", type: "project", status: "active", client: "morninglory-paris" },
    { id: "fmrxr-platform", name: "FMRXR Web Platform", type: "project", status: "active" }, // pas de client → interne
  ];
  const clients: OsClient[] = [{ id: "morninglory-paris", name: "Morninglory Paris", type: "client" }];
  const identities: OsIdentity[] = [{ id: "explab", name: "EXPLAB ⵣ", type: "identity" }];
  const graph = { projects, clients, identities };

  const assets: OsAsset[] = [
    { id: "a1", name: "Fiche technique", type: "asset", kind: "technical", project: "vz-calypso" },
    { id: "a2", name: "AGENTS", type: "asset", kind: "document", project: "fmrxr-platform" },
    { id: "a3", name: "Brand Guidelines", type: "asset", kind: "brand" }, // ni projet ni identité
    { id: "a4", name: "Figma explab", type: "asset", kind: "figma", identity: "explab" },
    { id: "a5", name: "Ghost project ref", type: "asset", kind: "document", project: "fmrxr-studio" }, // "projet" en fait une identité, absent de graph.projects
  ];

  it("resolves the real client through project → client when one exists", () => {
    expect(assetClientLabel(assets[0], graph)).toBe("Morninglory Paris");
  });

  it("falls back to the FMRXR bucket for internal projects (no client), generic assets, and dangling project refs", () => {
    expect(assetClientLabel(assets[1], graph)).toBe("FMRXR");
    expect(assetClientLabel(assets[2], graph)).toBe("FMRXR");
    expect(assetClientLabel(assets[4], graph)).toBe("FMRXR");
  });

  it("resolves a linked identity (e.g. EXPLAB) as its own bucket when there's no project", () => {
    expect(assetClientLabel(assets[3], graph)).toBe("EXPLAB ⵣ");
  });

  it("groups assets by client, alphabetical, FMRXR bucket always last", () => {
    const groups = assetClientGroups(assets, graph);
    expect(groups.map((g) => g.client)).toEqual(["EXPLAB ⵣ", "Morninglory Paris", "FMRXR"]);
    expect(groups.find((g) => g.client === "FMRXR")?.items).toHaveLength(3); // a2, a3, a5
    expect(groups.find((g) => g.client === "Morninglory Paris")?.items).toHaveLength(1);
  });

  it("applies the search query before grouping", () => {
    const groups = assetClientGroups(assets, graph, "brand");
    expect(groups).toEqual([{ client: "FMRXR", items: [assets[2]] }]);
  });
});

describe("graphEntities / graphEdges / graphNodeDegrees", () => {
  const source = {
    identities: [{ id: "fmrxr-studio", name: "FMRXR Studio", type: "identity" as const }],
    projects: [
      { id: "vz-calypso", name: "VZ × Calypso", type: "project" as const, status: "active", identity: ["fmrxr-studio"], client: "morninglory-paris" },
    ],
    // momo a un org direct (person→org) ; sofien n'en a pas, donc client↔sofien ne peut venir que du
    // chemin dérivé (relation projet→personne + projet.client) — isole les deux mécanismes dans les tests.
    people: [
      { id: "momo", name: "Momo", type: "person" as const, org: "morninglory-paris" },
      { id: "sofien", name: "Sofien", type: "person" as const },
    ],
    clients: [{ id: "morninglory-paris", name: "Morninglory Paris", type: "client" as const }],
    finance: [{ id: "f1", ref: "INV-1", type: "invoice" as const, client: "morninglory-paris", project: "vz-calypso", amount: 100, currency: "EUR" as const, status: "sent" as const }],
    quotes: [{ id: "q1", ref: "DEV-1", type: "quote" as const, client: "morninglory-paris", amount: 100, currency: "EUR" as const, status: "sent" as const }],
    assets: [{ id: "a1", name: "Asset 1", type: "asset" as const, project: "vz-calypso" }],
    tools: [{ id: "t1", name: "Tool 1" }],
    relations: [
      { from: "vz-calypso", to: "momo", rel: "collaborator" },
      { from: "vz-calypso", to: "sofien", rel: "collaborator" },
    ],
  };

  it("builds a unified entity roster with the right types and count", () => {
    const entities = graphEntities(source);
    // 1 identity + 1 project + 2 people + 1 client + 1 invoice + 1 quote + 1 asset + 1 tool
    expect(entities).toHaveLength(9);
    expect(entities.filter((e) => e.type === "project")).toHaveLength(1);
  });

  it("resolves invoice/quote display names from ref + label, falling back to id", () => {
    const entities = graphEntities(source);
    expect(entities.find((e) => e.id === "f1")?.name).toBe("INV-1");
    expect(entities.find((e) => e.id === "q1")?.name).toBe("DEV-1");
  });

  it("builds direct edges (project↔identity, project↔client, invoice/quote↔client/project, person↔org, asset↔project, relations)", () => {
    const entities = graphEntities(source);
    const edges = graphEdges(source, entities);
    const direct = (a: string, b: string) => edges.some((e) => !e.derived && ((e.a === a && e.b === b) || (e.a === b && e.b === a)));
    expect(direct("vz-calypso", "fmrxr-studio")).toBe(true); // project → identity
    expect(direct("vz-calypso", "morninglory-paris")).toBe(true); // project → client
    expect(direct("f1", "morninglory-paris")).toBe(true); // invoice → client
    expect(direct("f1", "vz-calypso")).toBe(true); // invoice → project
    expect(direct("q1", "morninglory-paris")).toBe(true); // quote → client
    expect(direct("momo", "morninglory-paris")).toBe(true); // person → org
    expect(direct("a1", "vz-calypso")).toBe(true); // asset → project
    expect(direct("vz-calypso", "momo")).toBe(true); // relation
    expect(direct("vz-calypso", "sofien")).toBe(true); // relation
  });

  it("derives identity↔client edges through shared projects, and client↔person edges through project relations", () => {
    const entities = graphEntities(source);
    const edges = graphEdges(source, entities);
    const derived = (a: string, b: string) => edges.some((e) => e.derived && ((e.a === a && e.b === b) || (e.a === b && e.b === a)));
    expect(derived("morninglory-paris", "fmrxr-studio")).toBe(true);
    expect(derived("morninglory-paris", "sofien")).toBe(true);
  });

  it("keeps the first-claimed edge as direct when a derived link would duplicate it (momo already has a direct person→org edge)", () => {
    const entities = graphEntities(source);
    const edges = graphEdges(source, entities);
    const momoLink = edges.find((e) => (e.a === "momo" && e.b === "morninglory-paris") || (e.a === "morninglory-paris" && e.b === "momo"));
    expect(momoLink?.derived).toBe(false);
  });

  it("dedupes a↔b vs b↔a into a single edge", () => {
    const entities = graphEntities(source);
    const edges = graphEdges(source, entities);
    const pairs = edges.map((e) => [e.a, e.b].sort().join("|"));
    expect(new Set(pairs).size).toBe(pairs.length);
  });

  it("drops edges whose endpoint isn't in the visible entity set (e.g. hidden by a type filter)", () => {
    const withoutAssets = graphEntities(source).filter((e) => e.type !== "asset");
    const edges = graphEdges(source, withoutAssets);
    expect(edges.some((e) => e.a === "a1" || e.b === "a1")).toBe(false);
  });

  it("computes node degree from edges", () => {
    const entities = graphEntities(source);
    const edges = graphEdges(source, entities);
    const deg = graphNodeDegrees(edges);
    // morninglory-paris : vz-calypso, f1, q1, momo (direct) + sofien, fmrxr-studio (dérivé) = 6
    expect(deg["morninglory-paris"]).toBe(6);
    expect(deg["t1"]).toBeUndefined(); // aucun lien vers l'outil isolé
  });

  it("tags each edge with a human-readable relation kind (F4)", () => {
    const entities = graphEntities(source);
    const edges = graphEdges(source, entities);
    const kindOf = (a: string, b: string) => edges.find((e) => (e.a === a && e.b === b) || (e.a === b && e.b === a))?.kind;
    expect(kindOf("vz-calypso", "morninglory-paris")).toBe("client");
    expect(kindOf("f1", "morninglory-paris")).toBe("facturé à");
    expect(kindOf("q1", "morninglory-paris")).toBe("devis pour");
    expect(kindOf("momo", "morninglory-paris")).toBe("membre de");
    // relation issue du graphe porte son propre libellé (`rel`), pas un générique.
    expect(kindOf("vz-calypso", "momo")).toBe("collaborator");
  });
});

describe("graphAnalytics", () => {
  const source = {
    identities: [{ id: "fmrxr-studio", name: "FMRXR Studio", type: "identity" as const }],
    projects: [
      { id: "vz-calypso", name: "VZ × Calypso", type: "project" as const, status: "active" as const, identity: ["fmrxr-studio"], client: "morninglory-paris" },
      { id: "no-invoice-proj", name: "Projet sans facture", type: "project" as const, status: "active" as const, client: "morninglory-paris" },
      { id: "archived-proj", name: "Vieux projet archivé", type: "project" as const, status: "archived" as const },
    ],
    people: [] as never[],
    clients: [{ id: "morninglory-paris", name: "Morninglory Paris", type: "client" as const }],
    finance: [{ id: "f1", ref: "INV-1", type: "invoice" as const, client: "morninglory-paris", project: "vz-calypso", amount: 100, currency: "EUR" as const, status: "sent" as const }],
    quotes: [] as never[],
    assets: [] as never[],
    tools: [{ id: "t1", name: "Tool 1 — isolé" }],
    relations: [] as never[],
  };

  it("counts active entities with no edge at all", () => {
    const entities = graphEntities(source);
    const edges = graphEdges(source, entities);
    const stats = graphAnalytics(source, entities, edges);
    // isolé : t1 (aucun lien) — no-invoice-proj et archived-proj ont un lien client/identité ou aucun ? archived-proj n'a ni client ni identity → isolé aussi.
    expect(stats.isolatedCount).toBe(2); // t1, archived-proj
  });

  it("finds the entity with the highest degree", () => {
    const entities = graphEntities(source);
    const edges = graphEdges(source, entities);
    const stats = graphAnalytics(source, entities, edges);
    expect(stats.busiest?.id).toBe("morninglory-paris");
  });

  it("counts active projects with no linked invoice or quote", () => {
    const entities = graphEntities(source);
    const edges = graphEdges(source, entities);
    const stats = graphAnalytics(source, entities, edges);
    // vz-calypso a une facture ; no-invoice-proj n'en a pas ; archived-proj est archivé, ignoré.
    expect(stats.projectsWithoutInvoice).toBe(1);
  });

  it("excludes ghost entities from isolation/busiest stats", () => {
    const entities: GraphEntity[] = [...graphEntities(source), { id: "ghost-1", name: "Fantôme isolé", type: "asset", state: "ghost" }];
    const edges = graphEdges(source, entities);
    const stats = graphAnalytics(source, entities, edges);
    expect(stats.isolatedCount).toBe(2); // ghost-1 n'est pas compté malgré son absence de lien
  });
});

describe("loadHistoricalEntities / graphEntitiesWithHistory / loadHistoricalEdges", () => {
  const log: OsLogEntry[] = [
    {
      // cf_batch n'a jamais été un type de nœud du graphe (comme l'annulation Tazarka évoquée dans
      // la conversation) — doit être ignoré, pas de fantôme pour un type hors vocabulaire.
      ts: "2026-07-21T20:12:00.000Z", action: "delete", entity: "cf-tazarka", entityType: "cf_batch", by: "Claude", synced: true,
      detail: "lot retiré", snapshot: { id: "cf-tazarka", name: "Tournage Tazarka", project: "vz-calypso" },
    },
    {
      ts: "2026-07-08T00:00:00.000Z", action: "delete", entity: "asset-old-poster", entityType: "asset", by: "Claude", synced: true,
      detail: "asset supprimé", snapshot: { id: "asset-old-poster", name: "Ancienne affiche", project: "vz-calypso" },
    },
    {
      ts: "2026-06-01T00:00:00.000Z", action: "delete", entity: "old-proj", entityType: "project", by: "Claude", synced: true,
      detail: "projet supprimé", snapshot: { id: "old-proj", name: "Ancien Projet", client: "morninglory-paris" },
    },
    {
      ts: "2026-06-05T00:00:00.000Z", action: "update", entity: "old-proj", entityType: "project", by: "Claude", synced: true,
      detail: "reclassé par erreur, ne doit pas compter comme suppression la plus récente",
    },
    {
      // deuxième suppression du même id → seule la plus récente doit être gardée
      ts: "2026-06-10T00:00:00.000Z", action: "delete", entity: "old-proj", entityType: "project", by: "Claude", synced: true,
      detail: "resupprimé", snapshot: { id: "old-proj", name: "Ancien Projet (v2)", client: "morninglory-paris" },
    },
    {
      ts: "2026-05-01T00:00:00.000Z", action: "delete", entity: "t-old", entityType: "task", by: "Claude", synced: true,
      detail: "tâche supprimée", snapshot: { id: "t-old", label: "Vieille tâche" },
    },
  ];

  it("derives one ghost per entity from its most recent delete, ignoring types outside the graph vocabulary", () => {
    const ghosts = loadHistoricalEntities({ log });
    const ids = ghosts.map((g) => g.id).sort();
    // "cf-tazarka" (cf_batch) et "t-old" (task) sont hors vocabulaire ; le doublon "old-proj" est dédupliqué.
    expect(ids).toEqual(["asset-old-poster", "old-proj"]);
    expect(ghosts.every((g) => g.state === "ghost")).toBe(true);
  });

  it("keeps the latest snapshot when an entity was deleted more than once", () => {
    const ghosts = loadHistoricalEntities({ log });
    const oldProj = ghosts.find((g) => g.id === "old-proj");
    expect(oldProj?.name).toBe("Ancien Projet (v2)");
    expect(oldProj?.lastSeen).toBe("2026-06-10T00:00:00.000Z");
  });

  it("names asset ghosts from their snapshot's name field", () => {
    const ghosts = loadHistoricalEntities({ log });
    expect(ghosts.find((g) => g.id === "asset-old-poster")?.name).toBe("Ancienne affiche");
  });

  it("merges active and historical entities, letting a live entity win over a same-id ghost", () => {
    const source = {
      identities: [] as never[], projects: [{ id: "old-proj", name: "Recréé depuis", type: "project" as const, status: "active" as const }],
      people: [] as never[], clients: [] as never[], finance: [] as never[], quotes: [] as never[], assets: [] as never[], tools: [] as never[],
      relations: [] as never[], log,
    };
    const all = graphEntitiesWithHistory(source);
    expect(all.filter((e) => e.id === "old-proj")).toHaveLength(1);
    expect(all.find((e) => e.id === "old-proj")?.state).toBe("active");
    expect(all.find((e) => e.id === "asset-old-poster")?.state).toBe("ghost");
    expect(all.some((e) => e.id === "cf-tazarka")).toBe(false); // hors vocabulaire, jamais un nœud
  });

  it("reconstructs edges from ghost snapshots toward still-visible entities only", () => {
    const visible = new Set(["asset-old-poster", "old-proj", "vz-calypso", "morninglory-paris"]);
    const edges = loadHistoricalEdges({ log }, visible);
    const has = (a: string, b: string) => edges.some((e) => (e.a === a && e.b === b) || (e.a === b && e.b === a));
    expect(has("asset-old-poster", "vz-calypso")).toBe(true);
    expect(has("old-proj", "morninglory-paris")).toBe(true);
    expect(edges.every((e) => !e.derived)).toBe(true);
  });

  it("drops reconstructed edges whose target isn't visible", () => {
    const visible = new Set(["asset-old-poster", "old-proj"]); // sans vz-calypso ni morninglory-paris
    const edges = loadHistoricalEdges({ log }, visible);
    expect(edges).toHaveLength(0);
  });
});

describe("serializeGraphForAsk", () => {
  const graph: OsGraph = {
    identities: [{ id: "fmrxr", name: "FMRXR Studio", type: "identity", role: "Studio commercial" }],
    projects: [{ id: "proj-lik", name: "LIK", type: "project", status: "active", client: "rawdha", tools: ["TouchDesigner", "GLSL"] }],
    clients: [{ id: "rawdha", name: "Rawdha Abdallah", type: "client" }],
    finance: [{ id: "inv-1", ref: "F-2026-01", type: "invoice", status: "sent", amount: 1000, currency: "TND", issued: "2026-07-01" }],
    tasks: [{ id: "t-1", label: "Livrer le rendu final", done: false }],
    deadlines: [{ id: "d-1", label: "Livraison LIK", date: "2026-08-01" }],
    log: [{ ts: "2026-07-20T10:00:00.000Z", action: "create", entity: "proj-lik", by: "Haïfa", synced: true, detail: "nouveau projet : LIK" }],
    meta: {} as OsGraph["meta"],
  };

  it("includes real entity ids in brackets so the model can cite them", () => {
    const text = serializeGraphForAsk(graph);
    expect(text).toContain("[proj-lik] LIK");
    expect(text).toContain("[rawdha] Rawdha Abdallah");
    expect(text).toContain("[fmrxr] FMRXR Studio");
  });

  it("surfaces project tools in the serialized line", () => {
    const text = serializeGraphForAsk(graph);
    expect(text).toContain("outils: TouchDesigner, GLSL");
  });

  it("excludes done tasks and deadlines from the open lists", () => {
    const done: OsGraph = { ...graph, tasks: [{ ...graph.tasks[0], done: true }] };
    const text = serializeGraphForAsk(done);
    expect(text).not.toContain("Tâches ouvertes");
  });

  it("caps the log history to logLimit, most recent entries only", () => {
    const manyLog = Array.from({ length: 10 }, (_, i) => ({
      ts: `2026-07-${String(i + 1).padStart(2, "0")}T00:00:00.000Z`, action: "create", entity: `e-${i}`, by: "Haïfa", synced: true, detail: `event ${i}`,
    }));
    const text = serializeGraphForAsk({ ...graph, log: manyLog }, 3);
    expect(text).toContain("event 9");
    expect(text).toContain("event 7");
    expect(text).not.toContain("event 6");
  });
});
