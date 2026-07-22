import { describe, it, expect } from "vitest";
import {
  daysUntil, toTND, restOf, oppDeadlineStatus, closingSoon, relances,
  imminentDeadlines, focusToday, kpiOk, kpiValue, healthScore,
  curQuarter, okrKrValue, okrKrProgress, okrObjectiveProgress, ganttItems,
  monthlySeries, cashProjection, identitySplit, clientSplit, funnelCounts, sumsByCurrency, buildAlerts,
  clientConcentration, runRateProjection, pipelineWinRate, monthlyAnomaly,
} from "@/lib/os/compute";

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
    expect(ganttItems([], [], undefined, NOW)).toEqual([]);
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
    const items = ganttItems(deadlines, tasks, "p1", NOW);
    expect(items.map((i) => i.id)).toEqual(["t1", "d1"]);
  });

  it("positions items proportionally, first item never before 0% and last at 100%", () => {
    const deadlines = [
      { id: "d1", date: "2026-07-22", label: "Start", done: false },
      { id: "d2", date: "2026-08-01", label: "End", done: false },
    ];
    const items = ganttItems(deadlines, [], undefined, NOW);
    expect(items[0].pct).toBe(0);
    expect(items[items.length - 1].pct).toBe(100);
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
