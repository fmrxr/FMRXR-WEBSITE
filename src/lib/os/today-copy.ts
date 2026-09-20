// FMRXR OS — gabarits de texte et seuils de la page Today.
// Tout ce qui est réglable vit ici : aucun seuil ni aucune phrase ne doit être écrit dans un
// composant ou dans today.ts. Les gabarits reçoivent leurs valeurs du graphe, jamais l'inverse.

export const TODAY_LIMITS = {
  /** Nombre maximum de lignes du briefing (règle « 5 métriques primaires au maximum »). */
  briefingLines: 4,
  /** Items listés sous chaque colonne métier. */
  columnItems: 3,
  /** Budget de rouge sur toute la page. */
  redItems: 2,
  /** Fenêtre qui définit « aujourd'hui » pour les mouvements, en heures. */
  winsWindowHours: 24,
  /** Horizon « bientôt » pour les jalons, en jours. */
  soonDays: 7,
  /** Horizon des jalons listés dans la colonne Production, en jours. */
  productionHorizonDays: 10,
  /** Au-delà, un retard est un fossile : il appelle une re-datation ou une clôture. */
  fossilDays: 30,
  /** Largeur de la courbe courte, en jours. */
  sparklineDays: 7,
  /** En dessous, la série n'est pas assez fournie pour être affichée. */
  minSeriesEvents: 3,
  /** Fenêtre d'activité qui rend un projet « vivant » pour la santé Production, en jours. */
  aliveDays: 14,
  /** Fenêtre des livraisons comptées dans la colonne Clients, en jours. */
  deliveryWindowDays: 7,
  /** Longueur maximale d'un libellé cité dans l'énumération des avancées du jour. */
  labelChars: 60,
  /** Longueur maximale d'un libellé qui forme à lui seul une phrase du briefing. */
  sentenceChars: 110,
  /** Longueur maximale d'un libellé listé sous une colonne. */
  itemChars: 58,
  /** Âge de la plus vieille facture en attente qui fait basculer la santé Argent, en jours. */
  cashTenseDays: 30,
  cashCriticalDays: 60,
} as const;

/** Emplacement remplacé par le composant <Money> au rendu (bascule TND/€ et mode présentation). */
export const MONEY_SLOT = "{montant}";

const nf = (n: number) => Math.round(n).toLocaleString("fr-FR");
const plural = (n: number, one: string, many: string) => (n > 1 ? many : one);

export const TODAY_COPY = {
  greeting: (hour: number) => (hour < 12 ? "Bonjour" : hour < 18 ? "Bon après-midi" : "Bonsoir"),
  freshness: (dateLabel: string, timeLabel: string) => `${dateLabel}, données à jour ${timeLabel}`,
  freshnessUnknown: (dateLabel: string) => `${dateLabel}, date de dernière sauvegarde inconnue`,

  briefingTitle: "Ton briefing",
  briefingEmpty: "Rien à signaler dans le graphe aujourd'hui.",
  nextActionTitle: "Si tu ne fais qu'une chose",
  openLink: "Ouvrir",

  wins: {
    one: (label: string) => `Bouclé aujourd'hui : ${label}.`,
    many: (count: number, labels: string[]) =>
      `${count} ${plural(count, "avancée bouclée", "avancées bouclées")} aujourd'hui, dont « ${labels[0]} ».`,
  },

  deadline: {
    overdue: (days: number, label: string) =>
      `En retard de ${days} ${plural(days, "jour", "jours")} : ${label}.`,
    today: (label: string) => `Échéance aujourd'hui : ${label}.`,
    soon: (days: number, label: string) =>
      `${days} ${plural(days, "jour", "jours")} avant ${label}.`,
  },

  /**
   * `MONEY_SLOT` est remplacé au rendu par le composant <Money>, pour que la bascule TND/€ et le
   * mode présentation s'appliquent aussi aux phrases du briefing.
   */
  cash: {
    line: (oldestDays: number, oldestLabel: string) =>
      `${MONEY_SLOT} restent à encaisser, dont la plus vieille facture chez ${oldestLabel} depuis ${nf(oldestDays)} jours.`,
  },

  blocker: {
    line: (label: string, owner?: string) => (owner ? `${label} (${owner}).` : `${label}.`),
  },

  columns: {
    argent: { label: "Argent", unit: "TND", sub: "à encaisser" },
    clients: { label: "Clients", unit: "actifs", sub: "clients avec un projet en cours" },
    production: { label: "Production", unit: "projets", sub: "projets actifs" },
    deltaInvoiced: () => `+${MONEY_SLOT} facturés sur 7 j`,
    deltaDeliveries: (count: number) =>
      `${count} ${plural(count, "livraison", "livraisons")} sur 7 j`,
    deltaMilestones: (count: number, days: number) =>
      `${count} ${plural(count, "jalon", "jalons")} sous ${days} jours`,
    empty: "Rien à afficher.",
    itemAge: (days: number) => `émise il y a ${nf(days)} j`,
    itemOldest: "la plus ancienne",
    itemDue: (days: number) => (days < 0 ? `retard ${Math.abs(days)} j` : days === 0 ? "aujourd'hui" : `J-${days}`),
  },

  health: {
    label: "Santé",
    facets: { argent: "Argent", jalons: "Jalons", prod: "Prod" },
    states: { ok: "ok", tendu: "tendu", critique: "critique" },
    reasonCash: (days: number | null) =>
      days === null
        ? "Aucune facture en attente."
        : `La plus vieille facture en attente date de ${nf(days)} jours.`,
    reasonMilestones: (count: number, days: number) =>
      count === 0
        ? `Aucun jalon critique en retard ou sous ${days} jours.`
        : `${count} ${plural(count, "jalon critique en retard ou imminent", "jalons critiques en retard ou imminents")}.`,
    reasonProd: (alive: number, total: number, days: number) =>
      total === 0
        ? "Aucun projet actif."
        : `${alive} ${plural(alive, "projet actif a bougé", "projets actifs ont bougé")} sur ${total} depuis ${days} jours.`,
  },

  debt: {
    title: "Dette",
    summary: (count: number, fossils: number) =>
      fossils > 0
        ? `${count} ${plural(count, "retard", "retards")} dont ${fossils} de plus de ${TODAY_LIMITS.fossilDays} jours`
        : `${count} ${plural(count, "retard", "retards")}`,
    empty: "Aucun retard ouvert.",
    expand: "déplier",
    collapse: "replier",
    fossilTag: "fossile",
    fossilHint: "À re-dater ou à clôturer plutôt qu'à alerter chaque jour.",
    age: (days: number) => `en retard de ${nf(days)} ${plural(days, "jour", "jours")}`,
  },
} as const;
