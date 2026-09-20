// FMRXR OS — logique pure du module OKR : cycle de planification, points de suivi, confiance,
// et contrôle de qualité à la saisie. Aucun rendu ici, aucune valeur métier écrite en dur.

import { curQuarter, okrObjectiveProgress } from "./compute";
import { quarterProgress } from "./today";
import type { OsGraph, OsOkr, OsOkrCheckin, OsOkrKeyResult } from "./types";

export const OKR_RULES = {
  /** Au-delà, ce n'est plus une liste de priorités mais une liste de tâches. */
  maxObjectives: 3,
  minKrs: 2,
  maxKrs: 4,
  /** Un point de suivi plus vieux que ça ne dit plus rien de la situation. */
  checkinStaleDays: 10,
  /** Jours avant la fin du trimestre où la planification du suivant est attendue. */
  planningWindowDays: 21,
  /** En doctrine OKR, atteindre cette part d'un résultat ambitieux est le succès attendu. */
  successPct: 70,
} as const;

/**
 * Verbes qui décrivent une livraison plutôt qu'un changement. Un résultat clé qui commence par
 * l'un d'eux mesure une action et non son effet : c'est l'anti-motif le plus répandu.
 */
const DELIVERY_VERBS = [
  "livrer", "produire", "créer", "creer", "lancer", "signer", "développer", "developper",
  "mettre en place", "organiser", "faire", "réaliser", "realiser", "construire", "rédiger",
  "rediger", "publier", "monter", "préparer", "preparer", "finaliser", "terminer", "ingérer", "ingerer",
];

export interface KrLint {
  level: "ok" | "warn";
  code?: "output-as-kr" | "binary";
  message?: string;
  hint?: string;
}

/**
 * Contrôle de qualité d'un résultat clé, au moment de la saisie. Jamais bloquant : la décision
 * reste à Haïfa, l'outil se contente de poser la question qui sépare un livrable d'un résultat.
 */
export function lintKr(label: string, target?: number): KrLint {
  const text = label.trim().toLowerCase();
  if (!text) return { level: "ok" };

  const verb = DELIVERY_VERBS.find((v) => text.startsWith(`${v} `));
  if (verb) {
    return {
      level: "warn",
      code: "output-as-kr",
      message: `« ${verb} » décrit un livrable, pas un résultat.`,
      hint: "Si ça sort, qu'est-ce qui change ? C'est cette conséquence qui fait un résultat clé.",
    };
  }

  if (target !== undefined && (target === 0 || target === 1)) {
    return {
      level: "warn",
      code: "binary",
      message: "Une cible à 0 ou 1 ne montre aucune progression avant la fin.",
      hint: "Cherche un compteur qui bouge pendant le trimestre.",
    };
  }

  return { level: "ok" };
}

export function lastCheckin(okr: Pick<OsOkr, "checkins">): OsOkrCheckin | null {
  const list = (okr.checkins || []).filter((c) => !Number.isNaN(Date.parse(c.ts)));
  if (!list.length) return null;
  return [...list].sort((a, b) => Date.parse(b.ts) - Date.parse(a.ts))[0];
}

/** Confiance sur un objectif : celle du dernier point, sinon la plus basse déclarée sur ses KR. */
export function objectiveConfidence(okr: Pick<OsOkr, "krs" | "checkins">): 1 | 2 | 3 | null {
  const last = lastCheckin(okr);
  if (last) return last.confidence;
  const declared = (okr.krs || []).map((k) => k.confidence).filter((c): c is 1 | 2 | 3 => !!c);
  if (!declared.length) return null;
  return Math.min(...declared) as 1 | 2 | 3;
}

export const CONFIDENCE_LABEL: Record<1 | 2 | 3, string> = {
  1: "confiance faible",
  2: "confiance moyenne",
  3: "confiance haute",
};

export interface CheckinFreshness {
  last: OsOkrCheckin | null;
  days: number | null;
  stale: boolean;
}

/** Fraîcheur du dernier point. Sans aucun point, l'objectif est considéré comme périmé. */
export function checkinFreshness(okr: Pick<OsOkr, "checkins">, now: Date = new Date()): CheckinFreshness {
  const last = lastCheckin(okr);
  if (!last) return { last: null, days: null, stale: true };
  const days = Math.floor((now.getTime() - Date.parse(last.ts)) / 86_400_000);
  return { last, days, stale: days > OKR_RULES.checkinStaleDays };
}

export function isDraft(okr: Pick<OsOkr, "status">): boolean {
  return okr.status === "draft";
}

/** Objectifs publiés d'un trimestre. Un brouillon ne compte dans aucun chiffre. */
export function publishedOkrs(graph: Pick<OsGraph, "okrs">, quarter: string): OsOkr[] {
  return (graph.okrs || []).filter((o) => o.quarter === quarter && !isDraft(o));
}

export function draftOkrs(graph: Pick<OsGraph, "okrs">, quarter: string): OsOkr[] {
  return (graph.okrs || []).filter((o) => o.quarter === quarter && isDraft(o));
}

export function nextQuarterOf(now: Date = new Date()): string {
  const qi = Math.floor(now.getMonth() / 3);
  return qi === 3 ? `${now.getFullYear() + 1}-Q1` : `${now.getFullYear()}-Q${qi + 2}`;
}

export type CyclePhase = "suivi" | "planification" | "cloture";

export interface PlanningState {
  quarter: string;
  nextQuarter: string;
  daysLeft: number;
  windowOpen: boolean;
  draftCount: number;
  nextPublishedCount: number;
  phase: CyclePhase;
}

/**
 * Où en est le cycle. La planification du trimestre suivant s'ouvre avant la fin du courant, ce
 * qui évite de découvrir le premier jour du trimestre qu'aucun objectif n'existe.
 */
export function planningState(graph: Pick<OsGraph, "okrs">, now: Date = new Date()): PlanningState {
  const quarter = curQuarter(now);
  const nextQuarter = nextQuarterOf(now);
  const { daysLeft } = quarterProgress(now);
  const windowOpen = daysLeft <= OKR_RULES.planningWindowDays;
  const nextPublishedCount = publishedOkrs(graph, nextQuarter).length;
  const draftCount = draftOkrs(graph, nextQuarter).length;
  const phase: CyclePhase = !windowOpen ? "suivi" : nextPublishedCount > 0 ? "cloture" : "planification";
  return { quarter, nextQuarter, daysLeft, windowOpen, draftCount, nextPublishedCount, phase };
}

export interface CapState {
  objectives: number;
  overObjectives: boolean;
  krIssues: Array<{ id: string; count: number; problem: "trop" | "pas assez" }>;
}

/** Contrôle des plafonds : trois objectifs, deux à quatre résultats clés chacun. */
export function capState(okrs: OsOkr[]): CapState {
  const krIssues = okrs
    .map((o) => ({ id: o.id, count: (o.krs || []).length }))
    .filter(({ count }) => count > OKR_RULES.maxKrs || count < OKR_RULES.minKrs)
    .map(({ id, count }) => ({
      id,
      count,
      problem: count > OKR_RULES.maxKrs ? ("trop" as const) : ("pas assez" as const),
    }));
  return { objectives: okrs.length, overObjectives: okrs.length > OKR_RULES.maxObjectives, krIssues };
}

/**
 * Note de clôture d'un objectif, de 0 à 1, calculée sur l'avancement réel de ses résultats clés.
 * Une note autour de 0,7 est le résultat attendu d'un objectif ambitieux, pas un échec.
 */
export function gradeObjective(
  okr: OsOkr,
  graph: Parameters<typeof okrObjectiveProgress>[1],
  now: Date = new Date(),
): number {
  return Math.round(okrObjectiveProgress(okr, graph, now)) / 100;
}

export function gradeLabel(grade: number): string {
  if (grade >= 0.7) return "atteint";
  if (grade >= 0.4) return "partiel";
  return "manqué";
}

/** Un KR sans source de calcul doit être tenu à jour à la main : c'est une dette de suivi. */
export function manualKrs(okrs: OsOkr[]): OsOkrKeyResult[] {
  return okrs.flatMap((o) => (o.krs || []).filter((k) => !k.auto));
}
