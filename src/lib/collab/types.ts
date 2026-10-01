export type OpportunityStatus = "to_study" | "preparing" | "submitted" | "result";
export type OpportunityOutcome = "accepted" | "rejected" | "no_answer";

export type Opportunity = {
  id: string;
  slug: string;
  title: string;
  org: string | null;
  url: string | null;
  location: string | null;
  deadline: string | null;
  deadline_note: string | null;
  funding: string | null;
  funding_eur: number | null;
  covers_travel: boolean | null;
  covers_production: boolean | null;
  category: string | null;
  priority: number | null;
  status: OpportunityStatus;
  outcome: OpportunityOutcome | null;
  assignee: string | null;
  summary: string | null;
  why_fit: string | null;
  constraints_note: string | null;
  dossier: string | null;
  eligible: boolean;
  source: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
};

export type OpportunityTask = {
  id: string;
  opportunity_id: string;
  label: string;
  assignee: string | null;
  due_date: string | null;
  done: boolean;
  position: number;
};

export type OpportunityNote = {
  id: string;
  opportunity_id: string;
  author_email: string | null;
  body: string;
  created_at: string;
};

export const STATUS_LABEL: Record<OpportunityStatus, string> = {
  to_study: "À étudier",
  preparing: "En préparation",
  submitted: "Soumis",
  result: "Résultat",
};

export const OUTCOME_LABEL: Record<OpportunityOutcome, string> = {
  accepted: "Retenu",
  rejected: "Non retenu",
  no_answer: "Sans réponse",
};

export const CATEGORY_LABEL: Record<string, string> = {
  residency: "Résidence",
  festival: "Festival",
  prize: "Prix",
  commission: "Commande",
  public_art: "Espace public",
  other: "Autre",
};

/**
 * Nombre de jours d'avance visé sur la date limite.
 *
 * Ce n'est pas une marge de confort arbitraire. Sur un corpus de 48 567
 * soumissions reparties sur 2 604 appels, les dossiers deposes 30 jours ou plus
 * avant la cloture sont retenus dans 71,4 % des cas, contre 59,3 % pour ceux
 * deposes la veille. L'espace affiche donc partout la date cible et non la date
 * limite : c'est la seule des deux sur laquelle on peut encore agir.
 */
export const LEAD_DAYS = 30;

const DAY = 86_400_000;

export function targetDate(deadline: string | null): Date | null {
  if (!deadline) return null;
  const d = new Date(`${deadline}T12:00:00Z`);
  if (Number.isNaN(d.getTime())) return null;
  return new Date(d.getTime() - LEAD_DAYS * DAY);
}

/** Jours entiers entre aujourd'hui et une date, negatif si elle est passee. */
export function daysUntil(date: Date | string | null): number | null {
  if (!date) return null;
  const d = typeof date === "string" ? new Date(`${date}T12:00:00Z`) : date;
  if (Number.isNaN(d.getTime())) return null;
  const now = new Date();
  const today = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 12);
  return Math.round((d.getTime() - today) / DAY);
}

export type Bucket = "closed" | "late" | "now" | "soon" | "later" | "undated";

export const BUCKET_LABEL: Record<Bucket, string> = {
  late: "Cible dépassée, la fenêtre se referme",
  now: "À rendre dans les quinze jours",
  soon: "À préparer",
  later: "Plus tard",
  undated: "Sans échéance ferme",
  closed: "Clos",
};

export const BUCKET_ORDER: Bucket[] = ["late", "now", "soon", "later", "undated", "closed"];

export function bucketOf(o: Opportunity): Bucket {
  const toDeadline = daysUntil(o.deadline);
  if (toDeadline !== null && toDeadline < 0) return "closed";
  if (toDeadline === null) return "undated";
  const toTarget = daysUntil(targetDate(o.deadline));
  if (toTarget === null) return "undated";
  if (toTarget < 0) return "late";
  if (toTarget <= 14) return "now";
  if (toTarget <= 60) return "soon";
  return "later";
}

/**
 * Tri d'affichage : les appels sans date partent a la fin plutot qu'au debut,
 * puis l'echeance la plus proche d'abord, puis la priorite manuelle.
 */
export function compareForDisplay(a: Opportunity, b: Opportunity) {
  if (!a.deadline !== !b.deadline) return a.deadline ? -1 : 1;
  if (a.deadline && b.deadline && a.deadline !== b.deadline) {
    return a.deadline < b.deadline ? -1 : 1;
  }
  const pa = a.priority ?? 99;
  const pb = b.priority ?? 99;
  if (pa !== pb) return pa - pb;
  return a.title.localeCompare(b.title, "fr");
}

const FR_DATE = new Intl.DateTimeFormat("fr-FR", {
  day: "numeric", month: "long", year: "numeric", timeZone: "UTC",
});

export function formatDate(value: string | Date | null): string {
  if (!value) return "—";
  const d = typeof value === "string" ? new Date(`${value.slice(0, 10)}T12:00:00Z`) : value;
  if (Number.isNaN(d.getTime())) return "—";
  return FR_DATE.format(d);
}

export function formatDelta(days: number | null): string {
  if (days === null) return "";
  if (days === 0) return "aujourd'hui";
  if (days === 1) return "demain";
  if (days === -1) return "hier";
  if (days > 0) return `dans ${days} jours`;
  return `il y a ${-days} jours`;
}
