# Refonte de la page Today (FMRXR OS)

**Date :** 20/09/2026
**Statut :** validé par Haïfa, prêt pour le plan d'implémentation
**Page concernée :** `/os/today` (`src/app/os/today/page.tsx`)

## 1. Pourquoi

La page actuelle n'inspire pas confiance, pour quatre raisons identifiées sur la capture du 20/09.

1. **Le Business Health est bloqué à 0/100.** `healthScore()` retire 5 points par retard et 8 par facture litigieuse, sans plancher intermédiaire. Avec 12 retards ouverts, le score touche 0 et n'en repart jamais. Un indicateur toujours au minimum ne porte plus d'information.
2. **Tout est rouge.** Le contrat CONEX non signé et un carrousel Instagram en retard depuis août partagent exactement la même couleur `#ff4d5e`. L'œil n'a plus de point d'entrée.
3. **La page ne montre que la dette.** Le 20/09, deux sites clients sont passés en ligne et un jeu a été déployé. Rien de tout cela n'apparaît. La page ne sait afficher que ce qui manque.
4. **Les retards fossiles polluent le haut de liste.** Des tâches en retard de 22, 41 et 108 jours occupent les premières positions et écrasent les échéances de la semaine.

## 2. Direction retenue

Fusion des directions B (cockpit en colonnes métier) et C (briefing narratif), en pyramide inversée : le résumé en haut, le détail en dessous, la dette repliée en bas.

Six règles issues de la recherche encadrent la refonte.

1. **Pyramide inversée.** Le résumé occupe la zone lisible d'un coup d'œil, en haut à gauche.
2. **Cinq métriques primaires au maximum** par écran.
3. **Le rouge est un budget.** Rouge pour le critique uniquement, ambre pour la surveillance, neutre pour l'état normal. Toute couleur est doublée d'un mot, jamais employée seule.
4. **Montrer ce qui a bougé.** Deltas et courbes courtes répondent à « qu'est-ce qui a changé depuis hier ».
5. **Divulgation progressive.** Les retards restent accessibles mais repliés, triés par enjeu et non par date.
6. **Pas de score composite nu.** Un indice unique ment par omission et devient instable dès que les pondérations changent. On publie les sous-scores nommés, pas le nombre agrégé.

## 3. Contrainte structurante : rien n'est codé en dur

Aucun nom de client, aucun montant, aucune date, aucune phrase complète ne vit dans le JSX. Tout descend du knowledge graph. Concrètement :

- les **gabarits de phrase** (avec emplacements à remplir) vivent dans un module de constantes, séparé de la logique et du rendu ;
- les **valeurs** viennent exclusivement de fonctions pures de sélection prenant `(graph, now)` ;
- une règle qui ne trouve pas de données **ne produit pas de ligne**, elle n'invente pas de repli ;
- une courbe dont la série ne peut pas être dérivée du graphe **n'est pas affichée**, plutôt que remplie de valeurs fictives ;
- les seuils (nombre de jours, plafonds, tailles de listes) sont des constantes nommées et exportées, modifiables en un seul endroit.

## 4. Architecture

### 4.1 Découpage

```
src/lib/os/today.ts          fonctions pures de sélection, aucune dépendance React
src/lib/os/today-copy.ts     gabarits de texte et seuils nommés
src/components/os/today/
  Briefing.tsx               zone 1
  NextAction.tsx             la ligne « si tu ne fais qu'une chose »
  ColumnCard.tsx             une colonne métier, générique
  Sparkline7.tsx             courbe 7 jours, rend null si la série est absente
  HealthChips.tsx            les trois états nommés
  DebtSection.tsx            zone 3, repliable
src/app/os/today/page.tsx    assemblage, aucune logique métier
```

`src/lib/os/compute.ts` n'est pas modifié. `healthScore()` et `focusToday()` restent en place car la page Dashboard les utilise. Les nouvelles fonctions vivent dans `today.ts` et réutilisent les primitives existantes (`daysUntil`, `restOf`, `toTND`, `relances`, `imminentDeadlines`).

Les six composants actuels (`PriorityHero`, `TasksCard`, `DeadlinesCard`, `RelancesCard`, `PipelineCard`, `AgentSuggestion`) ne sont utilisés que par cette page. Ils sont retirés avec elle.

### 4.2 Zone 1, le briefing

`briefing(graph, now): BriefingLine[]` où `BriefingLine = { id, tone: 'win' | 'watch' | 'risk' | 'info', text, href }`.

La fonction évalue une liste de **règles**, chacune renvoyant zéro ou une ligne, puis trie par poids et coupe à `MAX_BRIEFING_LINES` (4).

| Règle | Source dans le graphe | Ligne produite |
|---|---|---|
| `wins` | entrées de `log` des dernières 24 h avec `action` de type création ou clôture, plus `tasks[].done_date` et `projects[].closed_at` du jour | ton `win`, cite le nombre et nomme les deux plus importantes |
| `criticalDeadline` | `deadlines` non faites, `critical: true`, la plus proche | ton `watch` ou `risk` selon le signe de `daysUntil` |
| `cash` | `finance` aux statuts en attente, converti via `toTND` et `meta.eur_tnd` | ton `info`, total et ancienneté de la plus vieille |
| `blockers` | `blockers` non résolus de sévérité `critical` | ton `risk`, nomme le blocage et son propriétaire |

Le taux de change vient de `meta.eur_tnd`, jamais d'une constante.

### 4.3 La ligne « si tu ne fais qu'une chose »

`nextAction(graph, now)` classe les candidats (jalon critique en retard, blocage critique, facture la plus ancienne, tâche la plus urgente) selon un poids explicite combinant urgence et enjeu financier, et renvoie le premier avec son lien de destination. Si aucun candidat n'atteint le seuil, la zone n'est pas rendue.

### 4.4 Zone 2, les colonnes

Les trois colonnes sont décrites par un tableau de configuration, pas par trois composants distincts.

```ts
type ColumnSpec = {
  id: 'argent' | 'clients' | 'production';
  label: string;
  value: (g: OsGraph, now: Date) => { n: number; unit: string };
  delta: (g: OsGraph, now: Date) => { text: string; tone: Tone } | null;
  series: (g: OsGraph, now: Date) => number[] | null;
  items: (g: OsGraph, now: Date) => ColumnItem[];  // 3 maximum
  href: string;
};
```

- **Argent** : somme restant due des factures en attente, items triés par ancienneté décroissante.
- **Clients** : clients rattachés à au moins un projet actif, items triés par attention requise (blocage ouvert, puis activité récente).
- **Production** : projets actifs, items = jalons les plus proches dans `PRODUCTION_HORIZON_DAYS` (10).

`series` dérive un compte d'événements par jour sur 7 jours à partir de `log[].ts` filtré par domaine. Quand le graphe ne contient pas assez d'historique, la fonction renvoie `null` et `Sparkline7` ne rend rien.

### 4.5 Zone 3, la dette

`debt(graph, now)` renvoie `{ items, fossilCount }`. Les items sont les tâches et jalons en retard, triés par enjeu décroissant : montant rattaché, puis sévérité, puis ancienneté. Un item dépassant `FOSSIL_DAYS` (30) est marqué `fossil` et compté à part. La section est repliée par défaut, l'état d'ouverture est conservé en `localStorage` sous une clé versionnée, avec `try/catch` car le stockage peut échouer.

### 4.6 Les trois états de santé

`healthBreakdown(graph, now): HealthFacet[]` avec `HealthFacet = { id, label, state: 'ok' | 'tendu' | 'critique', reason }`.

- **Argent** : état dérivé de l'ancienneté de la plus vieille facture en attente et de la part des encours sur le total facturé.
- **Jalons** : nombre de jalons critiques en retard ou à moins de `SOON_DAYS` (7).
- **Prod** : part des projets actifs ayant bougé dans les 14 derniers jours selon `log`.

Chaque facette porte sa raison en clair, affichée au survol et lue par les lecteurs d'écran. Aucun nombre agrégé n'est publié.

## 5. Couleurs et accessibilité

Le budget de rouge est appliqué par une fonction, pas par la discipline du développeur. `applyRedBudget(items, max)` conserve le ton `risk` sur les `MAX_RED_ITEMS` (2) items les mieux classés et rétrograde les autres en `watch`. Les tons se traduisent en classes Tailwind existantes (`fmaccent`, `fmprimary`, ambre, `#ff4d5e`). Chaque ton s'accompagne d'un mot visible, jamais de la seule couleur.

L'horodatage de fraîcheur affiche `meta.updated` en heure locale, à côté de la date du jour.

## 6. Tests

Fichier `src/test/os-today.test.ts`, sur le modèle de `os-compute.test.ts` (fixtures de graphe, `now` injecté).

- `briefing()` : produit une ligne `win` quand le log contient une clôture du jour, aucune sinon ; respecte le plafond de 4 lignes ; ne fabrique aucune ligne sur un graphe vide.
- `nextAction()` : ordonne correctement jalon en retard, blocage critique et facture ancienne ; renvoie `null` sous le seuil.
- colonnes : chaque `value` et `items` sur une fixture connue ; `series` renvoie `null` sans historique suffisant.
- `debt()` : tri par enjeu, comptage des fossiles à 30 jours pile et à 31 jours.
- `healthBreakdown()` : les trois facettes sur une fixture saine, tendue et critique.
- `applyRedBudget()` : au plus 2 items en `risk`, les suivants rétrogradés.

## 7. Hors périmètre

La page Dashboard, le calcul `healthScore()` existant, les autres modules de l'OS et l'écriture dans le graphe ne sont pas touchés. Cette refonte est en lecture seule sur les données.
