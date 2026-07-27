// FMRXR OS — fonctions pures de calcul, portées depuis FMRXR_OS.html (days/oppDL/healthScore/
// focusToday/kpiValue/toTND) pour préserver la logique métier validée par le monolithe (§0 du brief).
// Toute fonction qui dépend de "maintenant" accepte `now` en paramètre pour rester testable.

import type { AssetKind, Currency, OsAsset, OsCfBatch, OsDeadline, OsExpense, OsGraph, OsInvoice, OsKpi, OsLibraryItem, OsLogEntry, OsOkr, OsOkrKeyResult, OsOpportunity, OsProject, OsTask } from "./types";

const DEFAULT_EUR_TND = 3.4;
const PENDING_STATUSES = new Set(["sent", "partial", "late", "disputed"]);

/** Jours jusqu'à `dateStr` (négatif si passé), arrondi comme le monolithe : Math.ceil((date-now)/jour). */
export function daysUntil(dateStr: string | undefined | null, now: Date = new Date()): number | null {
  if (!dateStr) return null;
  const t = Date.parse(dateStr);
  if (Number.isNaN(t)) return null;
  return Math.ceil((t - now.getTime()) / 86_400_000);
}

export function toTND(amount: number, currency: Currency, eurTnd: number = DEFAULT_EUR_TND): number {
  return currency === "EUR" ? (amount || 0) * eurTnd : amount || 0;
}

/** Montant restant dû sur une facture (amount - advance, jamais négatif). */
export function restOf(invoice: Pick<OsInvoice, "amount" | "advance">): number {
  return Math.max(0, (invoice.amount || 0) - (invoice.advance || 0));
}

export type OppDeadlineState = "none" | "text" | "expired" | "urgent" | "soon" | "ok";

export function oppDeadlineStatus(
  o: Pick<OsOpportunity, "deadline">,
  now: Date = new Date(),
): { status: OppDeadlineState; days: number | null } {
  if (!o?.deadline) return { status: "none", days: null };
  const d = daysUntil(o.deadline, now);
  if (d === null) return { status: "text", days: null };
  const status: OppDeadlineState = d < 0 ? "expired" : d <= 5 ? "urgent" : d <= 14 ? "soon" : "ok";
  return { status, days: d };
}

/** Opportunités non closes dont la deadline ferme dans ≤14 j (urgent ≤5 j), triées par urgence. */
export function closingSoon(opportunities: OsOpportunity[] = [], now: Date = new Date()): OsOpportunity[] {
  const open = opportunities.filter((o) => o.status !== "won" && o.status !== "lost");
  return open
    .filter((o) => {
      const status = oppDeadlineStatus(o, now).status;
      return status === "urgent" || status === "soon";
    })
    .sort((a, b) => (oppDeadlineStatus(a, now).days ?? 99999) - (oppDeadlineStatus(b, now).days ?? 99999));
}

export interface RelanceItem {
  kind: "invoice" | "quote";
  id: string;
  label: string;
  client?: string;
  amount: number;
  currency: Currency;
  daysSince: number;
}

/** Factures sent/partial émises depuis >14 j + devis sent >10 j, triés du plus en retard au moins. */
export function relances(graph: Pick<OsGraph, "finance" | "quotes">, now: Date = new Date()): RelanceItem[] {
  const invoices: RelanceItem[] = (graph.finance || [])
    .filter((f) => (f.status === "sent" || f.status === "partial") && f.issued)
    .map((f) => ({ f, since: -(daysUntil(f.issued, now) ?? 0) }))
    .filter(({ since }) => since > 14)
    .map(({ f, since }) => ({
      kind: "invoice" as const,
      id: f.id,
      label: f.ref || f.label || f.id,
      client: f.client,
      amount: restOf(f),
      currency: f.currency,
      daysSince: since,
    }));

  const quotes: RelanceItem[] = (graph.quotes || [])
    .filter((q) => q.status === "sent" && q.issued)
    .map((q) => ({ q, since: -(daysUntil(q.issued, now) ?? 0) }))
    .filter(({ since }) => since > 10)
    .map(({ q, since }) => ({
      kind: "quote" as const,
      id: q.id,
      label: q.ref || q.id,
      client: q.client,
      amount: q.amount,
      currency: q.currency,
      daysSince: since,
    }));

  return [...invoices, ...quotes].sort((a, b) => b.daysSince - a.daysSince);
}

export interface ImminentDeadline extends OsDeadline {
  daysUntil: number;
  overdue: boolean;
}

/** Deadlines ouvertes ≤ `horizonDays` (+ tout ce qui est en retard), triées chrono. */
export function imminentDeadlines(
  deadlines: OsDeadline[] = [],
  now: Date = new Date(),
  horizonDays = 7,
): ImminentDeadline[] {
  return deadlines
    .filter((d) => !d.done)
    .map((d) => {
      const du = daysUntil(d.date, now) ?? 0;
      return { ...d, daysUntil: du, overdue: du < 0 };
    })
    .filter((d) => d.overdue || d.daysUntil <= horizonDays)
    .sort((a, b) => a.daysUntil - b.daysUntil);
}

export interface FocusToday {
  deadline: OsDeadline | null;
  cashInvoice: OsInvoice | null;
  task: OsTask | null;
  overdue: boolean;
}

/** Point le plus pressant du jour : deadline en retard > tâche urgente > plus gros encaissement en attente. */
export function focusToday(graph: Pick<OsGraph, "deadlines" | "finance" | "tasks" | "meta">, now: Date = new Date()): FocusToday {
  const openDeadlines = (graph.deadlines || []).filter((d) => !d.done);
  const overdue = openDeadlines
    .filter((d) => (daysUntil(d.date, now) ?? 0) < 0)
    .sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
  const upcoming = openDeadlines
    .filter((d) => (daysUntil(d.date, now) ?? 0) >= 0)
    .sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
  const deadline = overdue[0] ?? upcoming[0] ?? null;

  const eurTnd = graph.meta?.eur_tnd;
  const cashInvoice =
    (graph.finance || [])
      .filter((f) => PENDING_STATUSES.has(f.status))
      .sort((a, b) => toTND(restOf(b), b.currency, eurTnd) - toTND(restOf(a), a.currency, eurTnd))[0] ?? null;

  const task =
    (graph.tasks || [])
      .filter((t) => !t.done && t.due)
      .sort((a, b) => (daysUntil(a.due, now) ?? 0) - (daysUntil(b.due, now) ?? 0))[0] ?? null;

  return { deadline, cashInvoice, task, overdue: overdue.length > 0 };
}

export function kpiOk(k: Pick<OsKpi, "dir" | "target">, value: number): boolean {
  const target = k.target ?? 0;
  return k.dir === "min" ? value <= target : value >= target;
}

/** Valeur courante d'un KPI — calculée si `k.auto`, sinon la valeur saisie manuellement. */
export function kpiValue(k: OsKpi, graph: Pick<OsGraph, "finance" | "deadlines" | "tasks" | "bdm">, now: Date = new Date()): number {
  if (!k.auto) return k.value || 0;
  const year = String(now.getFullYear());
  const finance = graph.finance || [];

  switch (k.auto) {
    case "payDelay": {
      const paid = finance.filter((f) => f.status === "paid" && f.paid_date && f.issued);
      if (!paid.length) return 0;
      const totalDays = paid.reduce(
        (s, f) => s + Math.max(0, (Date.parse(f.paid_date!) - Date.parse(f.issued!)) / 86_400_000),
        0,
      );
      return Math.round(totalDays / paid.length);
    }
    case "pendingTND":
      return Math.round(
        finance.filter((f) => PENDING_STATUSES.has(f.status)).reduce((s, f) => s + toTND(restOf(f), f.currency), 0),
      );
    case "caTND":
      return Math.round(
        finance.filter((f) => (f.issued || "").startsWith(year)).reduce((s, f) => s + toTND(f.amount || 0, f.currency), 0),
      );
    case "pipelineProp": {
      const opps = (graph.bdm?.opportunities || []).filter((o) => o.status !== "won" && o.status !== "lost");
      return opps.length ? Math.round((opps.filter((o) => o.status === "proposal").length / opps.length) * 100) : 0;
    }
    case "lateCount":
      return (
        (graph.deadlines || []).filter((d) => !d.done && (daysUntil(d.date, now) ?? 0) < 0).length +
        (graph.tasks || []).filter((t) => !t.done && t.due && (daysUntil(t.due, now) ?? 0) < 0).length
      );
    default:
      return 0;
  }
}

/** Score santé business 0–100 : % de KPIs dans la cible, pénalisé par le retard et les litiges. */
export function healthScore(graph: Pick<OsGraph, "kpis" | "deadlines" | "tasks" | "finance" | "bdm">, now: Date = new Date()): number {
  const kpis = graph.kpis || [];
  const ok = kpis.filter((k) => kpiOk(k, kpiValue(k, graph, now))).length;
  let score = kpis.length ? Math.round((ok / kpis.length) * 100) : 100;

  const lateDeadlines = (graph.deadlines || []).filter((d) => !d.done && (daysUntil(d.date, now) ?? 0) < 0).length;
  const lateTasks = (graph.tasks || []).filter((t) => !t.done && t.due && (daysUntil(t.due, now) ?? 0) < 0).length;
  const disputed = (graph.finance || []).filter((f) => f.status === "disputed").length;

  score = Math.max(0, score - (lateDeadlines + lateTasks) * 5 - disputed * 8);
  return score;
}

export function curQuarter(now: Date = new Date()): string {
  return `${now.getFullYear()}-Q${Math.floor(now.getMonth() / 3) + 1}`;
}

/**
 * Valeur d'un résultat clé — si `kr.auto==="ca_quarter"`, le CA du trimestre EN COURS (comme le
 * monolithe : même pour un OKR d'un trimestre passé, l'auto-calcul reste sur le trimestre actuel).
 * Sinon la valeur saisie manuellement.
 */
export function okrKrValue(kr: OsOkrKeyResult, graph: Pick<OsGraph, "finance">, now: Date = new Date()): number {
  if (kr.auto !== "ca_quarter") return kr.value || 0;
  const q = curQuarter(now);
  const year = Number(q.slice(0, 4));
  const quarterIndex = Number(q.slice(-1)) - 1;
  return (graph.finance || [])
    .filter((f) => {
      if (!f.issued) return false;
      const d = new Date(f.issued);
      return d.getFullYear() === year && Math.floor(d.getMonth() / 3) === quarterIndex;
    })
    .reduce((s, f) => s + toTND(f.amount || 0, f.currency), 0);
}

export function okrKrProgress(kr: OsOkrKeyResult, graph: Pick<OsGraph, "finance">, now: Date = new Date()): number {
  const value = okrKrValue(kr, graph, now);
  return Math.min(100, (value / (kr.target || 1)) * 100);
}

/** Moyenne de progression des résultats clés d'un objectif (0 si aucun KR). */
export function okrObjectiveProgress(okr: Pick<OsOkr, "krs">, graph: Pick<OsGraph, "finance">, now: Date = new Date()): number {
  const krs = okr.krs || [];
  if (!krs.length) return 0;
  return krs.reduce((s, k) => s + okrKrProgress(k, graph, now), 0) / krs.length;
}

export interface GanttItem {
  id: string;
  label: string;
  date: string;
  done: boolean;
  critical: boolean;
  /** Position 0–100 le long de la frise (voir `ganttItems`). */
  pct: number;
}

export interface GanttResult {
  items: GanttItem[];
  /** Position 0–100 d'"aujourd'hui" sur la même frise que les items (0 ou 100 si hors plage). */
  nowPct: number;
}

/**
 * Jalons (deadlines + tâches datées) positionnés proportionnellement sur une frise, du plus tôt
 * entre "aujourd'hui" et le premier jalon, jusqu'au dernier jalon — porte ganttFor() du monolithe.
 * `projectId` omis = tous les projets.
 */
export function ganttItems(
  deadlines: OsDeadline[] = [],
  tasks: OsTask[] = [],
  projectId?: string,
  now: Date = new Date(),
): GanttResult {
  const fromDeadlines: Omit<GanttItem, "pct">[] = deadlines
    .filter((d) => !projectId || d.project === projectId)
    .map((d) => ({ id: d.id, label: d.label, date: d.date, done: !!d.done, critical: !!d.critical }));
  const fromTasks: Omit<GanttItem, "pct">[] = tasks
    .filter((t) => (!projectId || t.project === projectId) && t.due)
    .map((t) => ({ id: t.id, label: t.label, date: t.due as string, done: t.done, critical: false }));

  const items = [...fromDeadlines, ...fromTasks]
    .filter((i) => i.date)
    .sort((a, b) => Date.parse(a.date) - Date.parse(b.date));

  if (!items.length) return { items: [], nowPct: 0 };

  const t0 = Math.min(now.getTime(), Date.parse(items[0].date));
  const t1 = Math.max(...items.map((i) => Date.parse(i.date)));
  const span = Math.max(1, (t1 - t0) / 86_400_000);
  const pos = (ms: number) => Math.max(0, Math.min(100, ((ms - t0) / 86_400_000 / span) * 100));

  return {
    items: items.map((i) => ({ ...i, pct: pos(Date.parse(i.date)) })),
    nowPct: pos(now.getTime()),
  };
}

// ═══════════ Dashboard (§Business, porté de RENDER.dashboard) ═══════════

export interface MonthlyPoint {
  /** "2026-07" */
  key: string;
  /** "juil." */
  label: string;
  paid: number;
  billed: number;
}

/** CA facturé/encaissé (TND consolidés) des 12 derniers mois glissants — pour le sparkline. */
export function monthlySeries(finance: OsInvoice[] = [], now: Date = new Date(), eurTnd?: number): MonthlyPoint[] {
  const out: MonthlyPoint[] = [];
  for (let i = 11; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    const paid = finance
      .filter((f) => f.status === "paid" && (f.paid_date || f.issued || "").startsWith(key))
      .reduce((s, f) => s + toTND(f.amount || 0, f.currency, eurTnd), 0);
    const billed = finance
      .filter((f) => (f.issued || "").startsWith(key))
      .reduce((s, f) => s + toTND(f.amount || 0, f.currency, eurTnd), 0);
    out.push({ key, label: d.toLocaleDateString("fr-FR", { month: "short" }), paid, billed });
  }
  return out;
}

export interface CashProjectionBuckets {
  d30: number;
  d60: number;
  d90: number;
}

/** Encaissements attendus ≤30j / 30-60j / 60-90j selon l'ancienneté et le statut. */
export function cashProjection(finance: OsInvoice[] = [], now: Date = new Date(), eurTnd?: number): CashProjectionBuckets {
  const p: CashProjectionBuckets = { d30: 0, d60: 0, d90: 0 };
  finance
    .filter((f) => PENDING_STATUSES.has(f.status))
    .forEach((f) => {
      const rest = toTND(restOf(f), f.currency, eurTnd);
      const age = f.issued ? -(daysUntil(f.issued, now) ?? 0) : 0;
      if (f.status === "partial" || age <= 21) p.d30 += rest;
      else if (f.status === "sent") p.d60 += rest;
      else p.d90 += rest;
    });
  return p;
}

/** CA (TND consolidés) réparti par identité, via l'identité du projet de chaque facture. */
export function identitySplit(finance: OsInvoice[] = [], projects: OsProject[] = [], eurTnd?: number): [string, number][] {
  const m = new Map<string, number>();
  finance.forEach((f) => {
    const project = projects.find((p) => p.id === f.project);
    const ids = project?.identity?.length ? project.identity : ["fmrxr-studio"];
    const share = toTND(f.amount || 0, f.currency, eurTnd) / ids.length;
    ids.forEach((id) => m.set(id, (m.get(id) || 0) + share));
  });
  return Array.from(m.entries()).sort((a, b) => b[1] - a[1]);
}

/** CA (TND consolidés) par client — pour la concentration. */
export function clientSplit(finance: OsInvoice[] = [], eurTnd?: number): [string, number][] {
  const m = new Map<string, number>();
  finance.forEach((f) => {
    if (!f.client) return;
    m.set(f.client, (m.get(f.client) || 0) + toTND(f.amount || 0, f.currency, eurTnd));
  });
  return Array.from(m.entries()).sort((a, b) => b[1] - a[1]);
}

export interface FunnelStage {
  status: string;
  label: string;
  count: number;
}

/** Pipeline BDM par statut (piste/contacté/proposition/gagné). */
export function funnelCounts(opportunities: OsOpportunity[] = []): FunnelStage[] {
  const stages: [string, string][] = [
    ["lead", "piste"],
    ["contact", "contacté"],
    ["proposal", "proposition"],
    ["won", "gagné"],
  ];
  return stages.map(([status, label]) => ({ status, label, count: opportunities.filter((o) => o.status === status).length }));
}

/** Montants par devise d'émission, non convertis — ex. "15 500 TND + 1 600 €". Porte fmtSums(). */
export function sumsByCurrency(items: Pick<OsInvoice, "amount" | "currency">[]): string {
  const sumBy = (cur: Currency) => items.filter((f) => f.currency === cur).reduce((s, f) => s + (f.amount || 0), 0);
  const parts = (["TND", "EUR"] as Currency[])
    .map((c) => [sumBy(c), c] as const)
    .filter(([v]) => v > 0)
    .map(([v, c]) => `${v.toLocaleString("fr-FR")}${c === "EUR" ? " €" : " TND"}`);
  return parts.length ? parts.join(" + ") : "0";
}

export interface DashboardAlert {
  title: string;
  sub: string;
  critical: boolean;
  href: string;
}

/**
 * Moteur d'alertes du Dashboard — porte le calcul d'`alerts` dans RENDER.dashboard (sans les
 * branches "données seed" et "watcher fichiers", non applicables en mode natif Supabase).
 */
export function buildAlerts(
  graph: Pick<OsGraph, "deadlines" | "finance" | "quotes" | "bdm" | "log">,
  now: Date = new Date(),
): DashboardAlert[] {
  const alerts: DashboardAlert[] = [];

  (graph.deadlines || [])
    .filter((d) => !d.done && (daysUntil(d.date, now) ?? 0) < 0)
    .forEach((d) => {
      alerts.push({
        title: `Dépassée : ${d.label}`,
        sub: `${d.owner ? d.owner + " — " : ""}marquer fait ou replanifier.`,
        critical: true,
        href: "/os/agenda",
      });
    });

  (graph.deadlines || [])
    .filter((d) => {
      const du = daysUntil(d.date, now) ?? -1;
      return !d.done && du >= 0 && du <= 7;
    })
    .forEach((d) => {
      const du = daysUntil(d.date, now) ?? 0;
      alerts.push({
        title: `J-${du} — ${d.label}`,
        sub: `${d.owner || ""}${d.critical ? " · CRITIQUE" : ""}`,
        critical: !!d.critical,
        href: "/os/agenda",
      });
    });

  (graph.finance || [])
    .filter((f) => f.status === "disputed")
    .forEach((f) => {
      alerts.push({ title: `Litige : ${f.ref || f.id}`, sub: f.notes ?? "", critical: true, href: "/os/finance" });
    });

  (graph.finance || [])
    .filter((f) => (f.status === "sent" || f.status === "partial") && f.issued && -(daysUntil(f.issued, now) ?? 0) > 21)
    .forEach((f) => {
      const since = -(daysUntil(f.issued, now) ?? 0);
      alerts.push({
        title: `Relance recommandée : ${f.ref || f.id}`,
        sub: `envoyée depuis ${since} jours${f.amount != null ? ` · reste ${restOf(f).toLocaleString("fr-FR")} ${f.currency}` : ""}`,
        critical: true,
        href: "/os/finance",
      });
    });

  const noAmount = (graph.finance || []).filter((f) => f.amount == null);
  if (noAmount.length) {
    alerts.push({
      title: `${noAmount.length} facture(s) sans montant renseigné`,
      sub: noAmount.map((f) => f.ref || f.id).join(" · "),
      critical: false,
      href: "/os/finance",
    });
  }

  (graph.quotes || [])
    .filter((q) => q.status === "sent" && q.issued && -(daysUntil(q.issued, now) ?? 0) > 14)
    .forEach((q) => {
      const since = -(daysUntil(q.issued, now) ?? 0);
      alerts.push({
        title: `Devis sans réponse : ${q.ref || q.id}`,
        sub: `envoyé depuis ${since} jours — relancer.`,
        critical: false,
        href: "/os/finance",
      });
    });

  closingSoon(graph.bdm?.opportunities || [], now).forEach((o) => {
    const dl = oppDeadlineStatus(o, now);
    alerts.push({
      title: `${dl.status === "urgent" ? "⚠" : "⏰"} Appel ferme dans ${dl.days} j : ${o.name}`,
      sub: `${o.notes ?? ""} — postuler.`,
      critical: dl.status === "urgent",
      href: "/os/pipeline",
    });
  });

  const unsync = (graph.log || []).filter((l) => !l.synced).length;
  if (unsync) {
    alerts.push({
      title: `${unsync} changement(s) non synchronisé(s) avec Claude`,
      sub: "Dire « sync os » à Claude pour aligner CLAUDE.md et TASKS.md.",
      critical: false,
      href: "/os/dashboard",
    });
  }

  if (!alerts.length) {
    alerts.push({
      title: "Aucun risque détecté",
      sub: "Deadlines tenues, factures suivies, journal synchronisé.",
      critical: false,
      href: "/os/dashboard",
    });
  }

  return alerts.slice(0, 8);
}

// ═══════════ Analyses avancées (2026-2027) — non présentes dans le monolithe ═══════════

export interface ClientConcentration {
  topClientId: string | null;
  topClientPct: number;
  top5Pct: number;
  total: number;
  /** "high" si le plus gros client dépasse 20% du CA, ou le top-5 dépasse 50%. */
  risk: "ok" | "high";
}

/**
 * Risque de concentration client — un client >20% du CA (ou top-5 >50%) est un risque
 * structurel : son départ crée une crise plutôt qu'un simple à-coup. Instantané sur les
 * factures actuelles (pas de tendance 3 mois glissants faute d'historique mensuel par client).
 */
export function clientConcentration(finance: OsInvoice[] = [], eurTnd?: number): ClientConcentration {
  const split = clientSplit(finance, eurTnd);
  const total = split.reduce((s, [, v]) => s + v, 0);
  if (!total || !split.length) return { topClientId: null, topClientPct: 0, top5Pct: 0, total: 0, risk: "ok" };
  const topClientPct = (split[0][1] / total) * 100;
  const top5Pct = (split.slice(0, 5).reduce((s, [, v]) => s + v, 0) / total) * 100;
  const risk: ClientConcentration["risk"] = topClientPct > 20 || top5Pct > 50 ? "high" : "ok";
  return { topClientId: split[0][0], topClientPct, top5Pct, total, risk };
}

export interface RunRateProjection {
  ytdBilled: number;
  avgMonthly: number;
  monthsRemaining: number;
  projectedYearEnd: number;
}

/** Projection fin d'année = CA facturé YTD + (moyenne mensuelle YTD × mois restants). */
export function runRateProjection(finance: OsInvoice[] = [], now: Date = new Date(), eurTnd?: number): RunRateProjection {
  const year = now.getFullYear();
  const ytdBilled = finance
    .filter((f) => (f.issued || "").startsWith(String(year)))
    .reduce((s, f) => s + toTND(f.amount || 0, f.currency, eurTnd), 0);
  const monthsElapsed = now.getMonth() + 1;
  const avgMonthly = monthsElapsed > 0 ? ytdBilled / monthsElapsed : 0;
  const monthsRemaining = 12 - monthsElapsed;
  return { ytdBilled, avgMonthly, monthsRemaining, projectedYearEnd: ytdBilled + avgMonthly * monthsRemaining };
}

export interface PipelineWinRate {
  won: number;
  lost: number;
  /** null si aucune opportunité clôturée pour l'instant. */
  winRatePct: number | null;
}

/** Taux de conversion du pipeline BDM (gagné / (gagné+perdu)). */
export function pipelineWinRate(opportunities: OsOpportunity[] = []): PipelineWinRate {
  const won = opportunities.filter((o) => o.status === "won").length;
  const lost = opportunities.filter((o) => o.status === "lost").length;
  const closed = won + lost;
  return { won, lost, winRatePct: closed ? (won / closed) * 100 : null };
}

export interface MonthlyAnomaly {
  isAnomaly: boolean;
  deviationPct: number;
  direction: "above" | "below" | "none";
  current: number;
  average: number;
}

/**
 * Signal statistique simple (pas de ML) : le mois courant dévie-t-il de ±`thresholdPct` de la
 * moyenne des jusqu'à 6 mois précédents ?
 */
export function monthlyAnomaly(series: MonthlyPoint[], thresholdPct = 40): MonthlyAnomaly {
  if (series.length < 2) return { isAnomaly: false, deviationPct: 0, direction: "none", current: 0, average: 0 };
  const current = series[series.length - 1].billed;
  const history = series.slice(0, -1).slice(-6);
  const average = history.length ? history.reduce((s, p) => s + p.billed, 0) / history.length : 0;
  if (average === 0) return { isAnomaly: false, deviationPct: 0, direction: "none", current, average };
  const deviationPct = ((current - average) / average) * 100;
  return { isAnomaly: Math.abs(deviationPct) >= thresholdPct, deviationPct, direction: deviationPct >= 0 ? "above" : "below", current, average };
}

// ═══════════ Pipeline / BDM (§Business, porté de RENDER.bdm) ═══════════

/** "Expirée" = statut manuel "expired" OU deadline dépassée — porte oppIsExpired() du monolithe. */
export function isOpportunityExpired(o: Pick<OsOpportunity, "status" | "deadline">, now: Date = new Date()): boolean {
  return o.status === "expired" || oppDeadlineStatus(o, now).status === "expired";
}

export interface BdmSummary {
  activeCount: number;
  proposalCount: number;
  closingSoonCount: number;
  closingUrgentCount: number;
  wonCount: number;
}

/** Compteurs du pipeline BDM — porte le bandeau de stats de RENDER.bdm. */
export function bdmSummary(opportunities: OsOpportunity[] = [], now: Date = new Date()): BdmSummary {
  const active = opportunities.filter((o) => o.status !== "won" && o.status !== "lost" && !isOpportunityExpired(o, now));
  const closing = closingSoon(opportunities, now);
  return {
    activeCount: active.length,
    proposalCount: active.filter((o) => o.status === "proposal").length,
    closingSoonCount: closing.length,
    closingUrgentCount: closing.filter((o) => oppDeadlineStatus(o, now).status === "urgent").length,
    wonCount: opportunities.filter((o) => o.status === "won").length,
  };
}

// ═══════════ Finance (§Finance, porté de RENDER.finance) ═══════════

export interface MoneyItem {
  amount: number;
  currency: Currency;
}

export interface FinanceOverview {
  cashInItems: MoneyItem[];
  cashInTND: number;
  pendingItems: MoneyItem[];
  pendingTND: number;
  pendingCount: number;
  noAmountCount: number;
  yearInvoiceItems: MoneyItem[];
  yearInvoiceTND: number;
  yearInvoiceCount: number;
  plafondPct: number;
  expenseItems: MoneyItem[];
  expenseTND: number;
  expenseCount: number;
  recurringExpenseTND: number;
  netTND: number;
}

/** Vue d'ensemble finance — porte le bloc KPI (Encaissé/Reste/Facturé/Plafond/Dépenses/Trésorerie) de RENDER.finance. */
export function financeOverview(
  finance: OsInvoice[] = [],
  expenses: OsExpense[] = [],
  now: Date = new Date(),
  eurTnd?: number,
  plafond = 75_000,
): FinanceOverview {
  const year = String(now.getFullYear());
  const paid = finance.filter((f) => f.status === "paid");
  const pending = finance.filter((f) => PENDING_STATUSES.has(f.status));

  const cashInItems: MoneyItem[] = [
    ...paid.map((f) => ({ amount: f.amount || 0, currency: f.currency })),
    ...pending.filter((f) => f.advance).map((f) => ({ amount: f.advance as number, currency: f.currency })),
  ];
  const cashInTND = cashInItems.reduce((s, i) => s + toTND(i.amount, i.currency, eurTnd), 0);

  const pendingItems: MoneyItem[] = pending.map((f) => ({ amount: restOf(f), currency: f.currency }));
  const pendingTND = pendingItems.reduce((s, i) => s + toTND(i.amount, i.currency, eurTnd), 0);

  const yearInvoices = finance.filter((f) => (f.issued || "").startsWith(year));
  const yearInvoiceItems: MoneyItem[] = yearInvoices.map((f) => ({ amount: f.amount || 0, currency: f.currency }));
  const yearInvoiceTND = yearInvoiceItems.reduce((s, i) => s + toTND(i.amount, i.currency, eurTnd), 0);

  const yearExpenses = expenses.filter((e) => (e.date || "").startsWith(year));
  const expenseItems: MoneyItem[] = yearExpenses.map((e) => ({ amount: e.amount || 0, currency: e.currency }));
  const expenseTND = expenseItems.reduce((s, i) => s + toTND(i.amount, i.currency, eurTnd), 0);
  const recurringExpenseTND = expenses.filter((e) => e.recurring).reduce((s, e) => s + toTND(e.amount || 0, e.currency, eurTnd), 0);

  return {
    cashInItems,
    cashInTND,
    pendingItems,
    pendingTND,
    pendingCount: pending.length,
    noAmountCount: finance.filter((f) => f.amount == null).length,
    yearInvoiceItems,
    yearInvoiceTND,
    yearInvoiceCount: yearInvoices.length,
    plafondPct: (yearInvoiceTND / plafond) * 100,
    expenseItems,
    expenseTND,
    expenseCount: yearExpenses.length,
    recurringExpenseTND,
    netTND: cashInTND - expenseTND,
  };
}

// ═══════════ Bibliothèque créative / Knowledge (§Stack, porté de RENDER.stack) ═══════════

export const LIBRARY_CATEGORIES = ["Assets", "AI", "Visual", "Code", "Knowledge"] as const;

/** Items sans catégorie — inbox de triage affichée en haut du module. */
export function libraryTriage(library: OsLibraryItem[] = []): OsLibraryItem[] {
  return library.filter((i) => !i.category);
}

function libraryTextBlob(item: OsLibraryItem): string {
  const content = item.content;
  const contentText = typeof content === "string" ? content : content ? JSON.stringify(content) : "";
  return `${item.title} ${(item.tags || []).join(" ")} ${item.subcategory || ""} ${contentText}`.toLowerCase();
}

/** Items classés correspondant à la recherche libre — porte libMatch() du monolithe. */
export function libraryMatches(item: OsLibraryItem, query: string): boolean {
  if (!query) return true;
  return libraryTextBlob(item).includes(query.toLowerCase());
}

/** Items d'une catégorie donnée, filtrés par recherche, favoris en tête — porte byCat() de RENDER.stack. */
export function libraryByCategory(library: OsLibraryItem[], category: string, query = ""): OsLibraryItem[] {
  return library
    .filter((i) => i.category === category && libraryMatches(i, query))
    .slice()
    .sort((a, b) => (b.favorite ? 1 : 0) - (a.favorite ? 1 : 0));
}

/** Nombre d'items classés par catégorie — porte le badge des chips de RENDER.stack. */
export function libraryCategoryCounts(library: OsLibraryItem[] = []): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const cat of LIBRARY_CATEGORIES) counts[cat] = 0;
  for (const item of library) {
    if (item.category) counts[item.category] = (counts[item.category] || 0) + 1;
  }
  return counts;
}

// ═══════════ AI Hub (§AI Workforce, porté de RENDER.aihub) ═══════════

/** Nombre total d'entités du graphe — porte `ALL.length` du monolithe (contexte du générateur de prompt). */
export function graphEntityCount(
  graph: Pick<OsGraph, "identities" | "projects" | "people" | "clients" | "finance" | "quotes" | "assets" | "tools" | "businesses" | "library">,
): number {
  return (
    (graph.identities?.length || 0) +
    (graph.projects?.length || 0) +
    (graph.people?.length || 0) +
    (graph.clients?.length || 0) +
    (graph.finance?.length || 0) +
    (graph.quotes?.length || 0) +
    (graph.assets?.length || 0) +
    (graph.tools?.length || 0) +
    (graph.businesses?.length || 0) +
    (graph.library?.length || 0)
  );
}

// ═══════════ Studio & Assets (§Creation, porté de RENDER.studio) ═══════════

/** Ordre + libellés d'affichage par kind — porte le map LABELS de RENDER.studio. */
export const ASSET_KIND_LABELS: [AssetKind, string][] = [
  ["brand", "Brand"],
  ["template", "Templates"],
  ["marketing", "Marketing"],
  ["brief", "Briefs"],
  ["spec", "Specs"],
  ["knowledge", "Mémoire système"],
  ["technical", "Fiches techniques"],
  ["communication", "Communication"],
  ["concept", "Concepts"],
  ["design", "Designs & affiches"],
  ["figma", "Figma — design live"],
];

export function assetKindLabel(kind: AssetKind | undefined): string {
  const k = kind || "autre";
  const found = ASSET_KIND_LABELS.find(([id]) => id === k);
  if (found) return found[1];
  return typeof k === "string" ? k.charAt(0).toUpperCase() + k.slice(1) : "Autre";
}

function assetTextBlob(asset: OsAsset): string {
  return `${asset.name} ${asset.file || ""} ${asset.url || ""} ${asset.notes || ""}`.toLowerCase();
}

export function assetMatches(asset: OsAsset, query: string): boolean {
  if (!query) return true;
  return assetTextBlob(asset).includes(query.toLowerCase());
}

export interface AssetKindGroup {
  kind: AssetKind;
  label: string;
  items: OsAsset[];
}

/**
 * Groupes par kind, dans l'ordre de ASSET_KIND_LABELS puis alphabétique pour les kinds inconnus —
 * porte la boucle Object.entries(kinds) de RENDER.studio, filtrée par recherche.
 */
export function assetKindGroups(assets: OsAsset[] = [], query = ""): AssetKindGroup[] {
  const filtered = assets.filter((a) => assetMatches(a, query));
  const present = new Set(filtered.map((a) => a.kind || "autre"));
  const known = ASSET_KIND_LABELS.filter(([id]) => present.has(id)).map(([id]) => id);
  const unknown = Array.from(present)
    .filter((k) => !known.includes(k))
    .sort((a, b) => String(a).localeCompare(String(b)));
  return [...known, ...unknown].map((kind) => ({
    kind,
    label: assetKindLabel(kind),
    items: filtered.filter((a) => (a.kind || "autre") === kind),
  }));
}

/** Compte les assets par kind (avant recherche) — pour les chips de filtre. */
export function assetKindCounts(assets: OsAsset[] = []): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const a of assets) {
    const k = String(a.kind || "autre");
    counts[k] = (counts[k] || 0) + 1;
  }
  return counts;
}

const FMRXR_ASSET_BUCKET = "FMRXR";

/**
 * Résout le "client" d'affichage d'un asset : projet → client réel s'il en a un, sinon identité
 * liée (ex : EXPLAB), sinon FMRXR — bucket générique pour les fichiers internes/business (brand kit,
 * templates…) et les projets sans client (ex : FMRXR Web Platform).
 */
export function assetClientLabel(asset: OsAsset, graph: Pick<OsGraph, "projects" | "clients" | "identities">): string {
  if (asset.project) {
    const project = graph.projects.find((p) => p.id === asset.project);
    if (project) {
      const client = project.client ? graph.clients?.find((c) => c.id === project.client) : undefined;
      return client?.name || FMRXR_ASSET_BUCKET;
    }
  }
  if (asset.identity) {
    const identity = graph.identities.find((i) => i.id === asset.identity);
    if (identity) return identity.name;
  }
  return FMRXR_ASSET_BUCKET;
}

export interface AssetClientGroup {
  client: string;
  items: OsAsset[];
}

/** Groupes par client — alphabétique, le bucket FMRXR (interne/générique) toujours en dernier. */
export function assetClientGroups(
  assets: OsAsset[] = [],
  graph: Pick<OsGraph, "projects" | "clients" | "identities">,
  query = "",
): AssetClientGroup[] {
  const filtered = assets.filter((a) => assetMatches(a, query));
  const buckets = new Map<string, OsAsset[]>();
  for (const a of filtered) {
    const label = assetClientLabel(a, graph);
    buckets.set(label, [...(buckets.get(label) || []), a]);
  }
  const names = Array.from(buckets.keys()).sort((a, b) => {
    if (a === FMRXR_ASSET_BUCKET) return 1;
    if (b === FMRXR_ASSET_BUCKET) return -1;
    return a.localeCompare(b);
  });
  return names.map((client) => ({ client, items: buckets.get(client)! }));
}

// ═══════════ Content Factory (§Creation, porté de RENDER['content-factory']) ═══════════

export const CF_STAGES: { key: OsCfBatch["stage"]; label: string; tone: "default" | "warn" | "accent" }[] = [
  { key: "attente", label: "En attente de la source", tone: "default" },
  { key: "ingere", label: "Ingéré / trié", tone: "warn" },
  { key: "montage", label: "Montage maître (synchro son)", tone: "warn" },
  { key: "decline", label: "Décliné 9:16 · 1:1 · 16:9", tone: "warn" },
  { key: "livre", label: "Livré", tone: "accent" },
];

export function cfStageLabel(stage: OsCfBatch["stage"]): string {
  return CF_STAGES.find((s) => s.key === stage)?.label ?? stage;
}

/** Index de l'étape suivante/précédente (borné), ou null si déjà à la borne — porte cfAdvance(). */
export function cfAdjacentStage(stage: OsCfBatch["stage"], dir: 1 | -1): OsCfBatch["stage"] | null {
  const i = CF_STAGES.findIndex((s) => s.key === stage);
  if (i < 0) return null;
  const n = Math.max(0, Math.min(CF_STAGES.length - 1, i + dir));
  return n === i ? null : CF_STAGES[n].key;
}

export interface CfSummary {
  total: number;
  doneCount: number;
  counts: Record<string, number>;
}

/** Compteurs par étape + total livré — porte le bandeau de RENDER['content-factory']. */
export function cfSummary(batches: OsCfBatch[] = []): CfSummary {
  const counts: Record<string, number> = {};
  for (const s of CF_STAGES) counts[s.key] = 0;
  for (const b of batches) counts[b.stage] = (counts[b.stage] || 0) + 1;
  return { total: batches.length, doneCount: counts.livre || 0, counts };
}

// ═══════════ Brain — graphe force-directed (§Knowledge, porté de RENDER.graph/gBuild) ═══════════

export type GraphEntityType = "identity" | "project" | "person" | "client" | "invoice" | "quote" | "asset" | "tool";

export const GRAPH_TYPE_LABELS: [GraphEntityType, string][] = [
  ["identity", "Identités"],
  ["project", "Projets"],
  ["person", "Personnes"],
  ["client", "Clients"],
  ["invoice", "Factures"],
  ["quote", "Devis"],
  ["asset", "Assets"],
  ["tool", "Outils"],
];

export const GRAPH_TYPE_COLORS: Record<GraphEntityType, string> = {
  identity: "#7BEF7B",
  project: "#F5F5F8",
  person: "#D9A441",
  client: "#4D9FFF",
  invoice: "#CC6666",
  quote: "#C6A57A",
  asset: "#7A9CC6",
  tool: "#9A7AC6",
};

export interface GraphEntity {
  id: string;
  name: string;
  type: GraphEntityType;
  status?: string;
  /** "ghost" = reconstruite depuis un snapshot de suppression, plus dans les tables vivantes — la couche sédiment. */
  state?: "active" | "ghost";
  /** Horodatage du dernier événement connu — création/modification pour un actif, suppression pour un fantôme. */
  lastSeen?: string;
}

export interface GraphEdge {
  a: string;
  b: string;
  w: number;
  derived: boolean;
}

type GraphSourceGraph = Pick<
  OsGraph,
  "identities" | "projects" | "people" | "clients" | "finance" | "quotes" | "assets" | "tools" | "relations"
>;

/** Roster unifié de toutes les entités du graphe — porte la construction de `ALL` utilisée par RENDER.graph. */
export function graphEntities(graph: GraphSourceGraph): GraphEntity[] {
  return [
    ...graph.identities.map((i) => ({ id: i.id, name: i.name, type: "identity" as const, state: "active" as const })),
    ...graph.projects.map((p) => ({ id: p.id, name: p.name, type: "project" as const, status: p.status, state: "active" as const })),
    ...(graph.people || []).map((p) => ({ id: p.id, name: p.name, type: "person" as const, state: "active" as const })),
    ...(graph.clients || []).map((c) => ({ id: c.id, name: c.name, type: "client" as const, state: "active" as const })),
    ...graph.finance.map((f) => ({ id: f.id, name: f.ref ? `${f.ref}${f.label ? ` — ${f.label}` : ""}` : f.id, type: "invoice" as const, state: "active" as const })),
    ...(graph.quotes || []).map((q) => ({ id: q.id, name: q.ref ? `${q.ref}${q.label ? ` — ${q.label}` : ""}` : q.id, type: "quote" as const, state: "active" as const })),
    ...(graph.assets || []).map((a) => ({ id: a.id, name: a.name, type: "asset" as const, state: "active" as const })),
    ...(graph.tools || []).map((t) => ({ id: t.id, name: t.name, type: "tool" as const, state: "active" as const })),
  ];
}

const GRAPH_VOCABULARY: ReadonlySet<string> = new Set<GraphEntityType>(["identity", "project", "person", "client", "invoice", "quote", "asset", "tool"]);

function snapshotStr(snapshot: unknown, key: string): string | undefined {
  if (!snapshot || typeof snapshot !== "object") return undefined;
  const v = (snapshot as Record<string, unknown>)[key];
  return typeof v === "string" ? v : undefined;
}

function ghostName(type: GraphEntityType, snapshot: unknown, fallbackId: string): string {
  if (type === "invoice" || type === "quote") {
    const ref = snapshotStr(snapshot, "ref");
    const label = snapshotStr(snapshot, "label");
    return ref ? `${ref}${label ? ` — ${label}` : ""}` : fallbackId;
  }
  return snapshotStr(snapshot, "name") || fallbackId;
}

/**
 * Nœuds fantômes — la couche sédiment : une entité supprimée ne disparaît plus du graphe, elle
 * coule dans l'état "ghost" avec sa dernière forme connue, reconstruite depuis le snapshot que
 * `logChange` attache maintenant à chaque suppression. Dérivée de `log`, pas des tables vivantes —
 * aucune nouvelle donnée stockée. Portée volontairement limitée aux types déjà présents dans le
 * graphe (project/client/invoice/quote/asset/identity/person/tool) : tâches, deadlines, lots
 * Content Factory etc. n'ont jamais été des nœuds, donc pas de fantôme pour eux ici.
 */
export function loadHistoricalEntities(graph: Pick<OsGraph, "log">): GraphEntity[] {
  const latestDeleteByEntity = new Map<string, OsLogEntry>();
  for (const entry of graph.log || []) {
    if (entry.action !== "delete" || !entry.entityType || !GRAPH_VOCABULARY.has(entry.entityType) || entry.snapshot === undefined) continue;
    const existing = latestDeleteByEntity.get(entry.entity);
    if (!existing || entry.ts > existing.ts) latestDeleteByEntity.set(entry.entity, entry);
  }
  return Array.from(latestDeleteByEntity.values()).map((entry) => {
    const type = entry.entityType as GraphEntityType;
    return { id: entry.entity, name: ghostName(type, entry.snapshot, entry.entity), type, state: "ghost" as const, lastSeen: entry.ts };
  });
}

/** Union entités vivantes + fantômes — le roster complet que voit le Brain quand l'historique est affiché. */
export function graphEntitiesWithHistory(graph: GraphSourceGraph & Pick<OsGraph, "log">): GraphEntity[] {
  const active = graphEntities(graph);
  const activeIds = new Set(active.map((e) => e.id));
  const ghosts = loadHistoricalEntities(graph).filter((g) => !activeIds.has(g.id));
  return [...active, ...ghosts];
}

/**
 * Liens reconstruits depuis les snapshots de suppression (client/projet référencés au moment de la
 * mort) — sédiment relationnel : un fantôme n'est plus jamais réintégré aux boucles gBuild() qui
 * lisent les tables vivantes, donc sans ceci il serait un point isolé. N'invente rien — ne relie que
 * ce que le snapshot connaissait déjà, et seulement vers des entités encore visibles.
 */
export function loadHistoricalEdges(graph: Pick<OsGraph, "log">, visibleIds: Set<string>): GraphEdge[] {
  const edges: GraphEdge[] = [];
  const seen = new Set<string>();
  for (const entry of graph.log || []) {
    if (entry.action !== "delete" || !entry.entityType || !GRAPH_VOCABULARY.has(entry.entityType) || entry.snapshot === undefined) continue;
    const push = (b: string | undefined) => {
      if (!b || !visibleIds.has(entry.entity) || !visibleIds.has(b) || entry.entity === b) return;
      const key = entry.entity < b ? `${entry.entity}|${b}` : `${b}|${entry.entity}`;
      if (seen.has(key)) return;
      seen.add(key);
      edges.push({ a: entry.entity, b, w: 0.7, derived: false });
    };
    push(snapshotStr(entry.snapshot, "client"));
    push(snapshotStr(entry.snapshot, "project"));
  }
  return edges;
}

/**
 * Liens directs + inférés entre entités visibles — porte gBuild() de RENDER.graph. Un lien n'est
 * conservé que si SES DEUX extrémités existent dans `entities` (ex : masquées par un filtre de
 * type/archives), et les doublons a↔b/b↔a sont dédupliqués — comme push()/seen dans le monolithe.
 */
export function graphEdges(graph: GraphSourceGraph, entities: GraphEntity[]): GraphEdge[] {
  const ids = new Set(entities.map((e) => e.id));
  const edges: GraphEdge[] = [];
  const seen = new Set<string>();
  const push = (a: string | undefined, b: string | undefined, w: number, derived = false) => {
    if (!a || !b || a === b || !ids.has(a) || !ids.has(b)) return;
    const key = a < b ? `${a}|${b}` : `${b}|${a}`;
    if (seen.has(key)) return;
    seen.add(key);
    edges.push({ a, b, w, derived });
  };

  graph.projects.forEach((p) => {
    (p.identity || []).forEach((id) => push(p.id, id, 1));
    if (p.client) push(p.id, p.client, 1.2);
  });
  graph.finance.forEach((f) => {
    push(f.id, f.client, 1);
    if (f.project) push(f.id, f.project, 0.8);
  });
  (graph.quotes || []).forEach((q) => {
    push(q.id, q.client, 1);
    if (q.project) push(q.id, q.project, 0.8);
  });
  (graph.people || []).forEach((p) => {
    if (p.org) push(p.id, p.org, 0.8);
  });
  (graph.assets || []).forEach((a) => {
    if (a.project) push(a.id, a.project, 0.6);
    if (a.identity) push(a.id, a.identity, 0.6);
  });
  (graph.relations || []).forEach((r) => push(r.from, r.to, 1));

  // Liens dérivés (inférés) : identité ↔ client via projets partagés — fait émerger les
  // constellations par casquette, comme dans le monolithe.
  graph.projects.forEach((p) => {
    if (p.client) (p.identity || []).forEach((idn) => push(p.client, idn, 0.35, true));
  });
  // Client ↔ personne du même projet, via une relation projet → personne.
  const entityById = new Map(entities.map((e) => [e.id, e]));
  (graph.relations || []).forEach((r) => {
    const project = graph.projects.find((p) => p.id === r.from);
    if (project?.client && entityById.get(r.to)?.type === "person") push(project.client, r.to, 0.3, true);
  });

  return edges;
}

/** Degré (nombre de liens) par id d'entité — détermine le rayon des nœuds. */
export function graphNodeDegrees(edges: GraphEdge[]): Record<string, number> {
  const deg: Record<string, number> = {};
  for (const e of edges) {
    deg[e.a] = (deg[e.a] || 0) + 1;
    deg[e.b] = (deg[e.b] || 0) + 1;
  }
  return deg;
}

/**
 * Sérialise le graphe en texte compact pour le contexte d'un appel LLM (F3 — /api/os/brain/ask).
 * Chaque ligne d'entité commence par son id entre crochets pour que le modèle puisse citer des
 * ids réels dans sa réponse. `logLimit` borne l'historique inclus (le plus récent d'abord dans le
 * log source, mais on le restitue chronologique croissant pour lire comme une timeline).
 */
export function serializeGraphForAsk(graph: OsGraph, logLimit = 60): string {
  const lines: string[] = [];
  const push = (s: string) => lines.push(s);

  push("## Identités");
  graph.identities.forEach((i) => push(`[${i.id}] ${i.name}${i.role ? ` — ${i.role}` : ""}`));

  push("\n## Clients");
  (graph.clients || []).forEach((c) => push(`[${c.id}] ${c.name}${c.segment ? ` — ${c.segment}` : ""}`));

  push("\n## Personnes");
  (graph.people || []).forEach((p) => push(`[${p.id}] ${p.name}${p.role ? ` — ${p.role}` : ""}${p.org ? ` (org: ${p.org})` : ""}`));

  push("\n## Projets");
  graph.projects.forEach((p) => {
    const client = graph.clients?.find((c) => c.id === p.client)?.name;
    const bits = [p.status, p.category, client ? `client: ${client}` : null, p.priority ? `priorité: ${p.priority}` : null, (p.tools || []).length ? `outils: ${(p.tools || []).join(", ")}` : null].filter(Boolean);
    push(`[${p.id}] ${p.name}${bits.length ? ` — ${bits.join(" · ")}` : ""}`);
  });

  push("\n## Factures & devis");
  graph.finance.forEach((f) => push(`[${f.id}] ${f.ref || f.id} — ${f.status}${f.amount != null ? ` — ${f.amount} ${f.currency}` : ""}`));
  (graph.quotes || []).forEach((q) => push(`[${q.id}] ${q.ref || q.id} — ${q.status} — ${q.amount} ${q.currency}`));

  const openTasks = (graph.tasks || []).filter((t) => !t.done);
  if (openTasks.length) {
    push("\n## Tâches ouvertes");
    openTasks.forEach((t) => push(`[${t.id}] ${t.label}`));
  }

  const openDeadlines = (graph.deadlines || []).filter((d) => !d.done);
  if (openDeadlines.length) {
    push("\n## Échéances à venir");
    openDeadlines.forEach((d) => push(`[${d.id}] ${d.label} — ${d.date}`));
  }

  if (graph.okrs?.length) {
    push("\n## OKR");
    graph.okrs.forEach((o) => push(`[${o.id}] ${o.quarter} — ${o.objective}`));
  }

  if (graph.log?.length) {
    push(`\n## Historique récent (${Math.min(logLimit, graph.log.length)} derniers événements)`);
    graph.log
      .slice(-logLimit)
      .forEach((e) => push(`${e.ts} — ${e.action} [${e.entity}] ${e.detail}`));
  }

  return lines.join("\n");
}
