import {
  LEAD_DAYS, daysUntil, targetDate, type Opportunity,
} from "./types";

const DAY = 86_400_000;

/**
 * Fenetre de depot d'un appel : de sa date cible a sa cloture.
 *
 * C'est la periode pendant laquelle le dossier peut partir en gardant l'avance
 * de LEAD_DAYS jours. Deux appels dont les fenetres se croisent peuvent donc
 * etre deposes dans la meme periode, ce qui est exactement la question posee.
 * Rien n'est fixe a la main ici : tout se deduit de la cloture publiee.
 */
export type Window = {
  slug: string;
  title: string;
  org: string | null;
  status: Opportunity["status"];
  assignee: string | null;
  funding_eur: number | null;
  /** Debut de la fenetre de depot, ramene a aujourd'hui si la cible est passee. */
  start: Date;
  end: Date;
  /** Cible theorique, meme passee, pour le signaler. */
  target: Date;
  /** Vrai quand la cible est derriere nous : la fenetre a deja commence a fondre. */
  late: boolean;
  daysLeftToTarget: number;
};

function startOfDayUTC(d: Date) {
  return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), 12));
}

export function today(): Date {
  return startOfDayUTC(new Date());
}

/** Appels datés et encore ouverts, convertis en fenêtres de dépôt. */
export function windowsOf(opportunities: Opportunity[]): Window[] {
  const now = today();
  return opportunities
    .filter((o) => o.eligible && o.deadline)
    .map((o) => {
      const end = new Date(`${o.deadline}T12:00:00Z`);
      const target = targetDate(o.deadline)!;
      const late = target.getTime() < now.getTime();
      return {
        slug: o.slug,
        title: o.title,
        org: o.org,
        status: o.status,
        assignee: o.assignee,
        funding_eur: o.funding_eur,
        // Une fenetre qui a commence hier commence aujourd'hui pour qui la lit
        // aujourd'hui : afficher une barre qui demarre dans le passe ferait
        // croire a du temps disponible qui n'existe plus.
        start: late ? now : target,
        end,
        target,
        late,
        daysLeftToTarget: daysUntil(target) ?? 0,
      };
    })
    .filter((w) => w.end.getTime() >= now.getTime())
    .sort((a, b) => a.end.getTime() - b.end.getTime());
}

export type Batch = {
  windows: Window[];
  from: Date;
  to: Date;
  /** Duree de la periode commune, en jours. */
  days: number;
};

/**
 * Ensembles d'appels reellement deposables ensemble.
 *
 * Un premier essai regroupait de proche en proche : A croise B, B croise C,
 * donc A B C ensemble. Sur des echeances regulierement espacees, tout finit par
 * se tenir par la main et l'on obtient un seul groupe contenant tout, ce qui
 * n'apprend rien. Il faut des groupes dont les membres se croisent **tous deux
 * a deux**, c'est-a-dire qui partagent une periode commune non vide.
 *
 * Sur des intervalles places sur une ligne, ces groupes maximaux se lisent
 * directement : a chaque date de debut, on prend tous les intervalles qui la
 * contiennent. Les ensembles obtenus, debarrasses de ceux inclus dans un autre,
 * sont exactement les groupes recherches.
 */
export function batchesOf(windows: Window[]): Batch[] {
  const points = [...new Set(windows.map((w) => w.start.getTime()))].sort((a, b) => a - b);

  const seen = new Map<string, Window[]>();
  for (const p of points) {
    const members = windows
      .filter((w) => w.start.getTime() <= p && p <= w.end.getTime())
      .sort((a, b) => a.end.getTime() - b.end.getTime());
    if (members.length === 0) continue;
    seen.set(members.map((w) => w.slug).join("|"), members);
  }

  const sets = [...seen.values()];
  // Un ensemble entierement contenu dans un autre n'apporte rien : il decrit la
  // meme periode de travail, en moins complet.
  const maximal = sets.filter(
    (s) => !sets.some((o) => o !== s && o.length > s.length && s.every((w) => o.includes(w))),
  );

  return maximal
    .map((members) => {
      const from = new Date(Math.max(...members.map((w) => w.start.getTime())));
      const to = new Date(Math.min(...members.map((w) => w.end.getTime())));
      return {
        windows: members,
        from,
        to,
        days: Math.max(0, Math.round((to.getTime() - from.getTime()) / DAY)) + 1,
      };
    })
    .sort((a, b) => a.from.getTime() - b.from.getTime());
}

/** Bornes de l'axe, de maintenant a la derniere cloture, avec une marge d'un jour. */
export function axisBounds(windows: Window[]): { from: Date; to: Date; days: number } {
  const from = today();
  const last = windows.length
    ? Math.max(...windows.map((w) => w.end.getTime()))
    : from.getTime() + 30 * DAY;
  const to = new Date(last + DAY);
  return { from, to, days: Math.max(1, Math.round((to.getTime() - from.getTime()) / DAY)) };
}

/** Position d'une date sur l'axe, en pourcentage. */
export function position(date: Date, bounds: { from: Date; days: number }): number {
  const offset = (date.getTime() - bounds.from.getTime()) / DAY;
  return Math.max(0, Math.min(100, (offset / bounds.days) * 100));
}

/** Premiers jours de mois compris dans l'axe, pour les graduations. */
export function monthTicks(bounds: { from: Date; to: Date; days: number }): { date: Date; label: string }[] {
  const ticks: { date: Date; label: string }[] = [];
  const fmt = new Intl.DateTimeFormat("fr-FR", { month: "short", timeZone: "UTC" });
  const cursor = new Date(Date.UTC(bounds.from.getUTCFullYear(), bounds.from.getUTCMonth(), 1, 12));
  // Le mois en cours commence avant l'axe : on part du suivant.
  cursor.setUTCMonth(cursor.getUTCMonth() + 1);
  while (cursor.getTime() < bounds.to.getTime()) {
    ticks.push({ date: new Date(cursor), label: fmt.format(cursor) });
    cursor.setUTCMonth(cursor.getUTCMonth() + 1);
  }
  return ticks;
}

export { LEAD_DAYS };
