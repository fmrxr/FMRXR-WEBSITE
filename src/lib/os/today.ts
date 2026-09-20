// FMRXR OS — sélecteurs purs de la page Today.
// Règle du module : aucune valeur affichable n'est inventée ici. Chaque fonction lit le graphe et
// renvoie null ou un tableau vide quand la donnée manque, plutôt qu'un repli fabriqué. Les textes
// viennent de today-copy.ts, les seuils de TODAY_LIMITS.

import { breakEven, curQuarter, daysUntil, okrObjectiveProgress, pipelineWinRate, restOf, revenueHorizon, toTND } from "./compute";
import { MONEY_SLOT, TODAY_COPY, TODAY_LIMITS } from "./today-copy";
import type { OsBlocker, OsDeadline, OsGraph, OsLogEntry, OsTask } from "./types";

export type Tone = "win" | "watch" | "risk" | "info";

export interface BriefingLine {
  id: string;
  tone: Tone;
  /** Peut contenir MONEY_SLOT, que le composant remplace par <Money>. */
  text: string;
  /** Montant consolidé en TND associé à la ligne, quand elle en porte un. */
  money?: number;
  href: string;
}

const TONE_ORDER: Record<Tone, number> = { win: 0, risk: 1, watch: 2, info: 3 };

/**
 * Seuils du Command Center. Les valeurs par défaut vivent dans today-copy.ts, mais le graphe peut
 * les surcharger via `meta.cc_limits` : rien n'est figé dans le code, la source de vérité reste
 * le document Supabase, y compris pour la politique d'affichage.
 */
export function ccLimits(graph: Pick<OsGraph, "meta">): typeof TODAY_LIMITS {
  const override = (graph.meta as { cc_limits?: Partial<typeof TODAY_LIMITS> } | undefined)?.cc_limits;
  return override ? { ...TODAY_LIMITS, ...override } : TODAY_LIMITS;
}

/** Coupe un libellé de graphe à une longueur lisible dans une phrase, sur une frontière de mot. */
function shorten(label: string, max: number = TODAY_LIMITS.labelChars): string {
  const clean = label.trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  return `${(lastSpace > max / 2 ? cut.slice(0, lastSpace) : cut).trimEnd()}…`;
}
const DAY_MS = 86_400_000;

function rate(graph: Pick<OsGraph, "meta">): number | undefined {
  return graph.meta?.eur_tnd;
}

function projectName(graph: Pick<OsGraph, "projects">, id?: string): string | undefined {
  if (!id) return undefined;
  return graph.projects?.find((p) => p.id === id)?.name;
}

function clientName(graph: Pick<OsGraph, "clients" | "people">, id?: string): string | undefined {
  if (!id) return undefined;
  return graph.clients?.find((c) => c.id === id)?.name ?? graph.people?.find((p) => p.id === id)?.name ?? id;
}

/** Entrées de journal postérieures à `since`, les plus récentes d'abord. */
export function logSince(log: OsLogEntry[] = [], since: Date): OsLogEntry[] {
  return log
    .filter((e) => {
      const t = Date.parse(e.ts || "");
      return !Number.isNaN(t) && t >= since.getTime();
    })
    .sort((a, b) => Date.parse(b.ts) - Date.parse(a.ts));
}

/** Tâches cochées dans la fenêtre donnée, d'après `done_date`. */
export function tasksDoneSince(tasks: OsTask[] = [], since: Date): OsTask[] {
  return tasks.filter((t) => {
    if (!t.done) return false;
    const raw = (t as OsTask & { done_date?: string }).done_date;
    const ts = Date.parse(raw || "");
    return !Number.isNaN(ts) && ts >= since.getTime();
  });
}

/**
 * Série de comptes d'événements par jour sur `days` jours, du plus ancien au plus récent.
 * Renvoie null si le journal ne contient pas assez d'événements : on n'affiche pas une courbe
 * fabriquée pour faire joli.
 */
export function eventSeries(
  log: OsLogEntry[] = [],
  now: Date,
  days: number = TODAY_LIMITS.sparklineDays,
  match: (e: OsLogEntry) => boolean = () => true,
): number[] | null {
  const start = now.getTime() - days * DAY_MS;
  const buckets = new Array<number>(days).fill(0);
  let total = 0;
  for (const e of log) {
    if (!match(e)) continue;
    const t = Date.parse(e.ts || "");
    if (Number.isNaN(t) || t < start || t > now.getTime()) continue;
    const idx = Math.min(days - 1, Math.floor((t - start) / DAY_MS));
    buckets[idx] += 1;
    total += 1;
  }
  return total >= TODAY_LIMITS.minSeriesEvents ? buckets : null;
}

/** Ne garde le ton `risk` que sur les `max` premiers items, les suivants retombent en `watch`. */
export function applyRedBudget<T extends { tone: Tone }>(items: T[], max: number = TODAY_LIMITS.redItems): T[] {
  let used = 0;
  return items.map((it) => {
    if (it.tone !== "risk") return it;
    used += 1;
    return used <= max ? it : { ...it, tone: "watch" as Tone };
  });
}

/**
 * Blocages encore vivants. Un blocage rattaché à un projet clôturé ne bloque plus rien : le
 * garder ferait remonter d'anciennes alertes en tête de page.
 */
function openBlockers(graph: Pick<OsGraph, "blockers" | "projects">): OsBlocker[] {
  const closed = new Set(
    (graph.projects || []).filter((p) => p.status !== "active").map((p) => p.id),
  );
  return (graph.blockers || []).filter((b) => !b.resolved && !(b.project && closed.has(b.project)));
}

export interface PendingInvoice {
  id: string;
  label: string;
  client?: string;
  amountTnd: number;
  daysSince: number;
}

/**
 * Ce qui est réellement encaissable : les factures émises et non soldées. Les devis restent au
 * Pipeline, les compter ici gonflerait l'encours d'un chiffre que personne ne doit à Haïfa.
 */
function pendingCash(graph: Pick<OsGraph, "finance" | "meta" | "clients" | "people">, now: Date) {
  const items: PendingInvoice[] = (graph.finance || [])
    .filter((f) => !f.replaced_by && (f.status === "sent" || f.status === "partial" || f.status === "late"))
    .map((f) => ({
      id: f.id,
      label: f.ref || f.label || f.id,
      client: f.client,
      amountTnd: toTND(restOf(f), f.currency, rate(graph)),
      daysSince: -(daysUntil(f.issued, now) ?? 0),
    }))
    .sort((a, b) => b.daysSince - a.daysSince);
  const totalTnd = items.reduce((sum, r) => sum + r.amountTnd, 0);
  return { items, totalTnd, oldest: items[0] };
}

/**
 * Les lignes du briefing. Chaque règle produit zéro ou une ligne : une règle sans donnée ne
 * s'invente pas de repli. Le résultat est trié par ton puis coupé à TODAY_LIMITS.briefingLines.
 */
export function briefing(graph: OsGraph, now: Date = new Date()): BriefingLine[] {
  const L = ccLimits(graph);
  const lines: BriefingLine[] = [];
  const since = new Date(now.getTime() - L.winsWindowHours * 3_600_000);

  // 1. Ce qui a bougé aujourd'hui.
  const doneToday = tasksDoneSince(graph.tasks, since);
  const closedToday = (graph.projects || []).filter((p) => {
    const ts = Date.parse((p as { closed_at?: string }).closed_at || "");
    return !Number.isNaN(ts) && ts >= since.getTime();
  });
  const doneDeadlines = (graph.deadlines || []).filter((d) => {
    const ts = Date.parse((d as { done_date?: string }).done_date || "");
    return d.done && !Number.isNaN(ts) && ts >= since.getTime();
  });
  // On compte des achèvements, pas des lignes de journal : une sauvegarde de l'OS n'est pas une avancée.
  const moved = [
    ...doneToday.map((t) => t.label),
    ...closedToday.map((p) => p.name),
    ...doneDeadlines.map((d) => d.label),
  ];
  if (moved.length > 0) {
    const labels = moved.map((label) => shorten(label));
    lines.push({
      id: "wins",
      tone: "win",
      text: moved.length === 1 ? TODAY_COPY.wins.one(labels[0]) : TODAY_COPY.wins.many(moved.length, labels),
      href: "/os/projets",
    });
  }

  // 2. Le jalon critique le plus proche.
  const critical = (graph.deadlines || [])
    .filter((d) => !d.done && d.critical)
    .map((d) => ({ d, days: daysUntil(d.date, now) ?? 0 }))
    .sort((a, b) => a.days - b.days)[0];
  if (critical) {
    const { d, days } = critical;
    lines.push({
      id: `deadline:${d.id}`,
      tone: days < 0 ? "risk" : "watch",
      text:
        days < 0
          ? TODAY_COPY.deadline.overdue(Math.abs(days), shorten(d.label, L.sentenceChars))
          : days === 0
            ? TODAY_COPY.deadline.today(shorten(d.label, L.sentenceChars))
            : TODAY_COPY.deadline.soon(days, shorten(d.label, L.sentenceChars)),
      href: "/os/agenda",
    });
  }

  // 3. L'argent qui dort.
  const cash = pendingCash(graph, now);
  if (cash.oldest) {
    lines.push({
      id: "cash",
      tone: "info",
      text: TODAY_COPY.cash.line(cash.oldest.daysSince, clientName(graph, cash.oldest.client) ?? cash.oldest.label),
      money: cash.totalTnd,
      href: "/os/finance",
    });
  }

  // 4. La falaise de revenu : jusqu'où c'est déjà engagé, et ce qu'il y a après.
  const horizon = revenueHorizon(graph.finance, now, rate(graph));
  if (horizon.lastCommittedMonth && horizon.monthsCovered <= L.horizonWarnMonths) {
    const [y, m] = horizon.lastCommittedMonth.split("-").map(Number);
    const monthLabel = new Date(y, m - 1, 1).toLocaleDateString("fr-FR", { month: "long", year: "numeric" });
    lines.push({
      id: "horizon",
      tone: "watch",
      text: TODAY_COPY.horizon.cliff(monthLabel, horizon.monthsCovered),
      href: "/os/finance",
    });
  }

  // 5. Le seuil de rentabilité : ce que le studio coûte chaque mois face à ce qu'il rapporte.
  const be = breakEven(graph.finance, graph.expenses, now, rate(graph));
  if (be.monthlyBurnTND > 0) {
    const runway = be.runwayMonths && be.runwayMonths > 0
      ? TODAY_COPY.burn.runway(be.runwayMonths)
      : TODAY_COPY.burn.noRunway;
    lines.push({
      id: "burn",
      tone: be.covered ? "info" : "watch",
      text: be.covered
        ? TODAY_COPY.burn.covered(MONEY_SLOT, runway)
        : TODAY_COPY.burn.uncovered(MONEY_SLOT, runway),
      money: Math.abs(be.marginTND),
      href: "/os/finance",
    });
  }

  // 6. Les opportunités périmées sans décision : de la donnée à rafraîchir, pas une défaite.
  const stale = pipelineWinRate(graph.bdm?.opportunities ?? [], now).pendingDecision;
  if (stale > 0) {
    lines.push({
      id: "pipeline-stale",
      tone: "info",
      text: TODAY_COPY.pipeline.stale(stale),
      href: "/os/pipeline",
    });
  }

  // 7. Le blocage critique le plus ancien.
  const blocker = openBlockers(graph)
    .filter((b) => b.severity === "critical")
    .sort((a, b) => Date.parse(a.detected || "") - Date.parse(b.detected || ""))[0];
  if (blocker) {
    lines.push({
      id: `blocker:${blocker.id}`,
      tone: "risk",
      text: TODAY_COPY.blocker.line(shorten(blocker.label, L.sentenceChars), blocker.owner),
      href: "/os/projets",
    });
  }

  const sorted = lines.sort((a, b) => TONE_ORDER[a.tone] - TONE_ORDER[b.tone]);
  return applyRedBudget(sorted).slice(0, L.briefingLines);
}

export interface NextAction {
  id: string;
  label: string;
  reason: string;
  href: string;
  weight: number;
}

/**
 * La seule chose à faire maintenant. Les candidats sont pondérés par urgence et par enjeu,
 * et l'on renvoie null si aucun candidat n'existe.
 */
export function nextAction(graph: OsGraph, now: Date = new Date()): NextAction | null {
  const L = ccLimits(graph);
  const candidates: NextAction[] = [];

  for (const d of graph.deadlines || []) {
    if (d.done) continue;
    const days = daysUntil(d.date, now) ?? 0;
    if (days > L.soonDays) continue;
    candidates.push({
      id: d.id,
      label: shorten(d.label, L.sentenceChars),
      reason:
        days < 0
          ? TODAY_COPY.deadline.overdue(Math.abs(days), projectName(graph, d.project) ?? "")
          : TODAY_COPY.columns.itemDue(days),
      href: "/os/agenda",
      weight: (d.critical ? 200 : 60) + Math.max(0, -days),
    });
  }

  for (const b of openBlockers(graph)) {
    candidates.push({
      id: b.id,
      label: shorten(b.label, L.sentenceChars),
      reason: b.owner ?? projectName(graph, b.project) ?? "",
      href: "/os/projets",
      weight: b.severity === "critical" ? 220 : b.severity === "high" ? 120 : 50,
    });
  }

  const cash = pendingCash(graph, now);
  if (cash.oldest) {
    candidates.push({
      id: cash.oldest.id,
      label: shorten(clientName(graph, cash.oldest.client) ?? cash.oldest.label, L.sentenceChars),
      reason: TODAY_COPY.columns.itemAge(cash.oldest.daysSince),
      href: "/os/finance",
      weight: 40 + cash.oldest.daysSince,
    });
  }

  return candidates.sort((a, b) => b.weight - a.weight)[0] ?? null;
}

export interface ColumnItem {
  id: string;
  label: string;
  meta: string;
  tone: Tone;
}

export interface ColumnView {
  id: "argent" | "clients" | "production";
  label: string;
  value: number;
  unit: string;
  sub: string;
  /** Peut contenir MONEY_SLOT. */
  delta: string | null;
  /** Montant TND à injecter dans `delta` quand il porte un MONEY_SLOT. */
  deltaMoney?: number;
  /** `money` fait rendre la valeur via <Money>, `count` la rend telle quelle. */
  format: "money" | "count";
  series: number[] | null;
  items: ColumnItem[];
  href: string;
}

export function columns(graph: OsGraph, now: Date = new Date()): ColumnView[] {
  const L = ccLimits(graph);
  const C = TODAY_COPY.columns;

  // Argent
  const cash = pendingCash(graph, now);
  const invoicedLast7 = (graph.finance || [])
    .filter((f) => {
      const days = daysUntil(f.issued, now);
      return days !== null && days <= 0 && days > -L.deliveryWindowDays;
    })
    .reduce((sum, f) => sum + toTND(restOf(f), f.currency, rate(graph)), 0);

  const argent: ColumnView = {
    id: "argent",
    label: C.argent.label,
    value: cash.totalTnd,
    unit: C.argent.unit,
    sub: C.argent.sub,
    delta: invoicedLast7 > 0 ? C.deltaInvoiced() : null,
    deltaMoney: invoicedLast7 > 0 ? invoicedLast7 : undefined,
    format: "money",
    series: eventSeries(graph.log, now, L.sparklineDays, (e) => e.entityType === "invoice" || e.entityType === "quote"),
    items: cash.items.slice(0, L.columnItems).map((r, i) => ({
      id: r.id,
      label: `${clientName(graph, r.client) ?? r.label}, ${Math.round(r.amountTnd).toLocaleString("fr-FR")} TND`,
      meta: i === 0 ? `${C.itemAge(r.daysSince)}, ${C.itemOldest}` : C.itemAge(r.daysSince),
      tone: i === 0 && r.daysSince > L.fossilDays ? "risk" : "info",
    })),
    href: "/os/finance",
  };

  // Clients
  const activeProjects = (graph.projects || []).filter((p) => p.status === "active");
  const activeClientIds = new Set(activeProjects.map((p) => p.client).filter(Boolean) as string[]);
  const deliverySince = new Date(now.getTime() - L.deliveryWindowDays * DAY_MS);
  const deliveries = tasksDoneSince(graph.tasks, deliverySince).length;
  const blockersByClient = new Map<string, OsBlocker>();
  for (const b of openBlockers(graph)) {
    const proj = activeProjects.find((p) => p.id === b.project);
    if (proj?.client && !blockersByClient.has(proj.client)) blockersByClient.set(proj.client, b);
  }
  const clientItems: ColumnItem[] = [...activeClientIds]
    .map((cid) => {
      const blk = blockersByClient.get(cid);
      const projects = activeProjects.filter((p) => p.client === cid);
      return {
        id: cid,
        label: clientName(graph, cid) ?? cid,
        meta: blk ? blk.label : (projects[0]?.name ?? ""),
        tone: (blk ? (blk.severity === "critical" ? "risk" : "watch") : "info") as Tone,
        rank: blk ? (blk.severity === "critical" ? 2 : 1) : 0,
      };
    })
    .sort((a, b) => b.rank - a.rank)
    .slice(0, L.columnItems)
    .map(({ id, label, meta, tone }) => ({ id, label, meta, tone }));

  const clients: ColumnView = {
    id: "clients",
    label: C.clients.label,
    value: activeClientIds.size,
    unit: C.clients.unit,
    sub: C.clients.sub,
    delta: deliveries > 0 ? C.deltaDeliveries(deliveries) : null,
    format: "count",
    series: eventSeries(graph.log, now, L.sparklineDays, (e) => e.entityType === "project" || e.entityType === "client"),
    items: clientItems,
    href: "/os/clients",
  };

  // Production
  const nearMilestones = (graph.deadlines || [])
    .filter((d) => !d.done)
    .map((d) => ({ d, days: daysUntil(d.date, now) ?? 0 }))
    .filter(({ days }) => days >= 0 && days <= L.productionHorizonDays)
    .sort((a, b) => a.days - b.days);

  const production: ColumnView = {
    id: "production",
    label: C.production.label,
    value: activeProjects.length,
    unit: C.production.unit,
    sub: C.production.sub,
    delta: nearMilestones.length > 0 ? C.deltaMilestones(nearMilestones.length, L.productionHorizonDays) : null,
    format: "count",
    series: eventSeries(graph.log, now, L.sparklineDays, (e) => e.entityType === "task" || e.entityType === "deadline"),
    items: nearMilestones.slice(0, L.columnItems).map(({ d, days }) => ({
      id: d.id,
      label: shorten(d.label, TODAY_LIMITS.itemChars),
      meta: `${C.itemDue(days)}${projectName(graph, d.project) ? `, ${projectName(graph, d.project)}` : ""}`,
      tone: (d.critical ? "watch" : "info") as Tone,
    })),
    href: "/os/agenda",
  };

  return [argent, clients, production].map((col) => ({ ...col, items: applyRedBudget(col.items) }));
}

export interface DebtItem {
  id: string;
  label: string;
  project?: string;
  daysOverdue: number;
  fossil: boolean;
  stake: number;
  kind: "task" | "deadline";
}

/** Les retards, triés par enjeu et non par date, avec les fossiles comptés à part. */
export function debt(graph: OsGraph, now: Date = new Date()): { items: DebtItem[]; fossilCount: number } {
  const L = ccLimits(graph);
  const cashByProject = new Map<string, number>();
  for (const f of graph.finance || []) {
    if (!f.project) continue;
    if (f.status !== "sent" && f.status !== "partial" && f.status !== "late") continue;
    cashByProject.set(f.project, (cashByProject.get(f.project) ?? 0) + toTND(restOf(f), f.currency, rate(graph)));
  }
  const criticalProjects = new Set(
    openBlockers(graph).filter((b) => b.severity === "critical").map((b) => b.project),
  );

  const fromTasks: DebtItem[] = (graph.tasks || [])
    .filter((t) => !t.done && t.due)
    .map((t) => ({ t, days: -(daysUntil(t.due, now) ?? 0) }))
    .filter(({ days }) => days > 0)
    .map(({ t, days }) => ({
      id: t.id,
      label: t.label,
      project: projectName(graph, t.project),
      daysOverdue: days,
      fossil: days > L.fossilDays,
      stake: (cashByProject.get(t.project ?? "") ?? 0) + (criticalProjects.has(t.project) ? 5000 : 0) + days,
      kind: "task" as const,
    }));

  const fromDeadlines: DebtItem[] = (graph.deadlines || [])
    .filter((d) => !d.done)
    .map((d) => ({ d, days: -(daysUntil(d.date, now) ?? 0) }))
    .filter(({ days }) => days > 0)
    .map(({ d, days }) => ({
      id: d.id,
      label: d.label,
      project: projectName(graph, d.project),
      daysOverdue: days,
      fossil: days > L.fossilDays,
      stake: (cashByProject.get(d.project ?? "") ?? 0) + (d.critical ? 10_000 : 0) + days,
      kind: "deadline" as const,
    }));

  const items = [...fromDeadlines, ...fromTasks].sort((a, b) => b.stake - a.stake);
  return { items, fossilCount: items.filter((i) => i.fossil).length };
}

export type HealthState = "ok" | "tendu" | "critique";

export interface HealthFacet {
  id: "argent" | "jalons" | "prod";
  label: string;
  state: HealthState;
  reason: string;
}

/**
 * Trois états nommés au lieu d'un score agrégé. Chaque facette porte sa raison en clair : un
 * indice composite unique masque ses composantes et devient instable dès que les poids bougent.
 */
export function healthBreakdown(graph: OsGraph, now: Date = new Date()): HealthFacet[] {
  const H = TODAY_COPY.health;
  const L = ccLimits(graph);

  const cash = pendingCash(graph, now);
  const oldestDays = cash.oldest ? cash.oldest.daysSince : null;
  const argentState: HealthState =
    oldestDays === null ? "ok" : oldestDays >= L.cashCriticalDays ? "critique" : oldestDays >= L.cashTenseDays ? "tendu" : "ok";

  const criticalLate = (graph.deadlines || []).filter((d) => {
    if (d.done || !d.critical) return false;
    const days = daysUntil(d.date, now) ?? 0;
    return days <= L.soonDays;
  }).length;
  const jalonsState: HealthState = criticalLate === 0 ? "ok" : criticalLate <= 2 ? "tendu" : "critique";

  const activeProjects = (graph.projects || []).filter((p) => p.status === "active");
  const aliveSince = new Date(now.getTime() - L.aliveDays * DAY_MS);
  const touched = new Set(logSince(graph.log, aliveSince).map((e) => e.entity));
  const alive = activeProjects.filter(
    (p) =>
      touched.has(p.id) ||
      (graph.tasks || []).some((t) => t.project === p.id && touched.has(t.id)) ||
      (graph.deadlines || []).some((d) => d.project === p.id && touched.has(d.id)),
  ).length;
  const share = activeProjects.length === 0 ? 1 : alive / activeProjects.length;
  const prodState: HealthState = share >= 0.5 ? "ok" : share >= 0.25 ? "tendu" : "critique";

  return [
    { id: "argent", label: H.facets.argent, state: argentState, reason: H.reasonCash(oldestDays) },
    { id: "jalons", label: H.facets.jalons, state: jalonsState, reason: H.reasonMilestones(criticalLate, L.soonDays) },
    { id: "prod", label: H.facets.prod, state: prodState, reason: H.reasonProd(alive, activeProjects.length, L.aliveDays) },
  ];
}

export type { OsBlocker, OsDeadline };

// ═══════════ Command Center : bande OKR, journal, dernière visite ═══════════

export interface OkrStripObjective {
  id: string;
  label: string;
  pct: number;
  /** Écart à la ligne de base du temps écoulé, en points. */
  pace: number;
  tone: Tone;
}

export interface OkrStrip {
  quarter: string;
  objectives: OkrStripObjective[];
  globalPct: number;
  elapsedPct: number;
  pace: number;
  daysLeft: number;
  /** Le trimestre suivant n'a aucun objectif alors que la fenêtre de planification est ouverte. */
  planningDue: boolean;
  nextQuarter: string;
}

/** Part du trimestre déjà écoulée, en pourcentage, et jours restants. */
export function quarterProgress(now: Date = new Date()): { elapsedPct: number; daysLeft: number; end: Date } {
  const qi = Math.floor(now.getMonth() / 3);
  const start = new Date(now.getFullYear(), qi * 3, 1);
  const end = new Date(now.getFullYear(), qi * 3 + 3, 0, 23, 59, 59);
  const elapsedPct = Math.min(100, Math.max(0, ((now.getTime() - start.getTime()) / (end.getTime() - start.getTime())) * 100));
  const daysLeft = Math.max(0, Math.ceil((end.getTime() - now.getTime()) / DAY_MS));
  return { elapsedPct, daysLeft, end };
}

function nextQuarterKey(now: Date): string {
  const qi = Math.floor(now.getMonth() / 3);
  return qi === 3 ? `${now.getFullYear() + 1}-Q1` : `${now.getFullYear()}-Q${qi + 2}`;
}

/**
 * Bande de suivi OKR du Command Center.
 *
 * Le ton d'un objectif se juge par rapport au temps écoulé, pas dans l'absolu : atteindre 70 % d'un
 * KR ambitieux est le succès attendu, donc un objectif n'est en alerte que s'il décroche nettement
 * du rythme du trimestre.
 */
export function okrStrip(graph: OsGraph, now: Date = new Date()): OkrStrip {
  const L = ccLimits(graph);
  const quarter = curQuarter(now);
  const { elapsedPct, daysLeft } = quarterProgress(now);
  const current = (graph.okrs || []).filter((o) => o.quarter === quarter);

  const objectives: OkrStripObjective[] = current.map((o) => {
    const pct = okrObjectiveProgress(o, graph, now);
    const pace = pct - elapsedPct;
    return {
      id: o.id,
      label: o.objective,
      pct,
      pace,
      tone: pace >= 0 ? "win" : pace > -L.okrPaceTense ? "watch" : "risk",
    };
  });

  const globalPct = objectives.length ? objectives.reduce((s, o) => s + o.pct, 0) / objectives.length : 0;
  const nextQuarter = nextQuarterKey(now);
  const nextEmpty = !(graph.okrs || []).some((o) => o.quarter === nextQuarter);

  return {
    quarter,
    objectives,
    globalPct,
    elapsedPct,
    pace: globalPct - elapsedPct,
    daysLeft,
    nextQuarter,
    planningDue: nextEmpty && daysLeft <= L.planningWindowDays,
  };
}

export interface ActivityEntry {
  id: string;
  ts: string;
  detail: string;
  by: string;
  isNew: boolean;
}

/** Dernières écritures du journal, de la plus récente à la plus ancienne. */
export function recentActivity(graph: Pick<OsGraph, "log">, limit: number = TODAY_LIMITS.journalEntries, since?: Date): ActivityEntry[] {
  return (graph.log || [])
    .filter((e) => !Number.isNaN(Date.parse(e.ts || "")))
    .sort((a, b) => Date.parse(b.ts) - Date.parse(a.ts))
    .slice(0, limit)
    .map((e, i) => ({
      id: `${e.ts}:${e.entity}:${i}`,
      ts: e.ts,
      detail: e.detail,
      by: e.by,
      isNew: since ? Date.parse(e.ts) > since.getTime() : false,
    }));
}
