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

export type DayEvent = { kind: "target" | "deadline"; window: Window };

export type Day = {
  date: Date;
  /** Faux pour les cases de debordement, celles du mois voisin. */
  inMonth: boolean;
  isToday: boolean;
  past: boolean;
  /** Appels dont la fenetre de depot couvre ce jour : la mesure du chevauchement. */
  open: number;
  events: DayEvent[];
};

export type Month = { year: number; month: number; label: string; weeks: Day[][] };

const MONTH_LABEL = new Intl.DateTimeFormat("fr-FR", { month: "long", year: "numeric", timeZone: "UTC" });

function key(d: Date) {
  return d.toISOString().slice(0, 10);
}

/**
 * Decoupe l'horizon en mois, puis en semaines commencant le lundi.
 *
 * Chaque case porte deux choses : les evenements du jour, cible ou cloture, et
 * le nombre d'appels deposables ce jour-la. Ce second chiffre est le
 * chevauchement rendu visible : une case dense est une journee ou plusieurs
 * dossiers peuvent partir, donc une journee a arbitrer.
 */
export function monthsOf(windows: Window[], bounds: { from: Date; to: Date }): Month[] {
  const now = today();

  const targets = new Map<string, Window[]>();
  const deadlines = new Map<string, Window[]>();
  for (const w of windows) {
    // Une cible deja passee n'a plus de case a marquer : elle est derriere nous.
    if (!w.late) {
      const k = key(w.target);
      targets.set(k, [...(targets.get(k) ?? []), w]);
    }
    const k = key(w.end);
    deadlines.set(k, [...(deadlines.get(k) ?? []), w]);
  }

  const months: Month[] = [];
  const cursor = new Date(Date.UTC(bounds.from.getUTCFullYear(), bounds.from.getUTCMonth(), 1, 12));

  while (cursor.getTime() <= bounds.to.getTime()) {
    const year = cursor.getUTCFullYear();
    const month = cursor.getUTCMonth();
    const first = new Date(Date.UTC(year, month, 1, 12));
    const last = new Date(Date.UTC(year, month + 1, 0, 12));

    // Reculer jusqu'au lundi qui ouvre la premiere semaine affichee.
    const gridStart = new Date(first);
    gridStart.setUTCDate(gridStart.getUTCDate() - ((first.getUTCDay() + 6) % 7));

    const weeks: Day[][] = [];
    const d = new Date(gridStart);
    while (d.getTime() <= last.getTime() || weeks.length === 0 || d.getUTCDay() !== 1) {
      const week: Day[] = [];
      for (let i = 0; i < 7; i++) {
        const k = key(d);
        week.push({
          date: new Date(d),
          inMonth: d.getUTCMonth() === month,
          isToday: d.getTime() === now.getTime(),
          past: d.getTime() < now.getTime(),
          open: windows.filter(
            (w) => w.start.getTime() <= d.getTime() && d.getTime() <= w.end.getTime(),
          ).length,
          events: [
            ...(targets.get(k) ?? []).map((w) => ({ kind: "target" as const, window: w })),
            ...(deadlines.get(k) ?? []).map((w) => ({ kind: "deadline" as const, window: w })),
          ],
        });
        d.setUTCDate(d.getUTCDate() + 1);
      }
      weeks.push(week);
      if (d.getTime() > last.getTime()) break;
    }

    months.push({ year, month, label: MONTH_LABEL.format(first), weeks });
    cursor.setUTCMonth(cursor.getUTCMonth() + 1);
  }

  return months;
}

/** Plus grand nombre d'appels simultanement deposables, pour calibrer l'echelle. */
export function peakOpen(months: Month[]): number {
  return Math.max(1, ...months.flatMap((m) => m.weeks.flat().map((d) => d.open)));
}

export type Tick = { date: Date; label: string; monthStart: boolean };

const SHORT = new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "short", timeZone: "UTC" });
const DAYNUM = new Intl.DateTimeFormat("fr-FR", { day: "numeric", timeZone: "UTC" });

/**
 * Graduations hebdomadaires, datees.
 *
 * Une premiere version ne marquait que les debuts de mois. Sur un horizon de
 * deux mois cela donnait deux reperes, places en bas, loin des barres : on
 * voyait des batons flotter sans savoir ou tombait octobre ni ou l'on se
 * trouvait. Une graduation par semaine, portant sa date, permet de lire une
 * barre sans la survoler.
 *
 * Le premier repere est aujourd'hui, puis les lundis : un calendrier de travail
 * se lit par semaines entamees, pas par tranches de sept jours depuis une date
 * arbitraire.
 */
export function weekTicks(bounds: { from: Date; to: Date; days: number }): Tick[] {
  const ticks: Tick[] = [
    { date: bounds.from, label: "auj.", monthStart: false },
  ];

  const cursor = new Date(bounds.from);
  // getUTCDay : 0 = dimanche. On avance jusqu'au lundi suivant.
  cursor.setUTCDate(cursor.getUTCDate() + ((8 - cursor.getUTCDay()) % 7 || 7));
  // Un lundi trop proche d'aujourd'hui ecraserait le repere « auj. ». On saute
  // alors a la semaine suivante plutot que d'empiler deux etiquettes.
  if ((cursor.getTime() - bounds.from.getTime()) / DAY < 4) {
    cursor.setUTCDate(cursor.getUTCDate() + 7);
  }

  while (cursor.getTime() < bounds.to.getTime()) {
    const monthStart = cursor.getUTCDate() <= 7;
    ticks.push({
      date: new Date(cursor),
      // On ne repete le mois qu'a son entree, sinon l'axe se remplit de « oct. ».
      label: monthStart ? SHORT.format(cursor) : DAYNUM.format(cursor),
      monthStart,
    });
    cursor.setUTCDate(cursor.getUTCDate() + 7);
  }
  return ticks;
}

/** Premiers jours de mois, pour les separations plus marquees. */
export function monthTicks(bounds: { from: Date; to: Date; days: number }): Tick[] {
  const fmt = new Intl.DateTimeFormat("fr-FR", { month: "long", timeZone: "UTC" });
  // Le mois en cours commence avant l'axe : on le nomme a l'origine, sinon la
  // premiere bande du calendrier reste anonyme.
  const ticks: Tick[] = [{ date: bounds.from, label: fmt.format(bounds.from), monthStart: true }];
  const cursor = new Date(Date.UTC(bounds.from.getUTCFullYear(), bounds.from.getUTCMonth(), 1, 12));
  cursor.setUTCMonth(cursor.getUTCMonth() + 1);
  while (cursor.getTime() < bounds.to.getTime()) {
    ticks.push({ date: new Date(cursor), label: fmt.format(cursor), monthStart: true });
    cursor.setUTCMonth(cursor.getUTCMonth() + 1);
  }
  return ticks;
}

export { LEAD_DAYS };
