// FMRXR OS — fonctions pures de calcul, portées depuis FMRXR_OS.html (days/oppDL/healthScore/
// focusToday/kpiValue/toTND) pour préserver la logique métier validée par le monolithe (§0 du brief).
// Toute fonction qui dépend de "maintenant" accepte `now` en paramètre pour rester testable.

import type { Currency, OsDeadline, OsGraph, OsInvoice, OsKpi, OsOkr, OsOkrKeyResult, OsOpportunity, OsProject, OsTask } from "./types";

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
): GanttItem[] {
  const fromDeadlines: Omit<GanttItem, "pct">[] = deadlines
    .filter((d) => !projectId || d.project === projectId)
    .map((d) => ({ id: d.id, label: d.label, date: d.date, done: !!d.done, critical: !!d.critical }));
  const fromTasks: Omit<GanttItem, "pct">[] = tasks
    .filter((t) => (!projectId || t.project === projectId) && t.due)
    .map((t) => ({ id: t.id, label: t.label, date: t.due as string, done: t.done, critical: false }));

  const items = [...fromDeadlines, ...fromTasks]
    .filter((i) => i.date)
    .sort((a, b) => Date.parse(a.date) - Date.parse(b.date));

  if (!items.length) return [];

  const t0 = Math.min(now.getTime(), Date.parse(items[0].date));
  const t1 = Math.max(...items.map((i) => Date.parse(i.date)));
  const span = Math.max(1, (t1 - t0) / 86_400_000);
  const pos = (dateStr: string) => Math.max(0, Math.min(100, ((Date.parse(dateStr) - t0) / 86_400_000 / span) * 100));

  return items.map((i) => ({ ...i, pct: pos(i.date) }));
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
