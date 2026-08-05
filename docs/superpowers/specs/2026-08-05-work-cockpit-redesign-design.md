# Work Cockpit — redesign de Projets / Tâches / Agenda

**Date** : 2026-08-05
**Statut** : approuvé par Haïfa (brainstorm terminal + compagnon visuel)

## Contexte

Les 3 pages du groupe de nav "Work" (`/os/projets`, `/os/taches`, `/os/agenda`) sont devenues incohérentes avec la réalité de Haïfa : 9 projets actifs en parallèle (VZ×Calypso, NeoPhi, MauriTalent, Pi Consult, LIK, FMRXR Platform, Extraction LC, FMRXR Labs, Content Creation Morninglory).

Problèmes identifiés (validés en brainstorm) :
- Le kanban Projets (3 colonnes statiques Actif/Livré/Archivé) empile tous les projets actifs dans la même colonne, sans distinction d'urgence — même poids visuel pour un projet chaud et un projet dormant.
- Le mini-Gantt d'Agenda ne montre qu'**un seul** projet ("critical"), pas de vue combinée quand plusieurs projets sont urgents en même temps.
- Tâches est une liste à part (groupée par projet, mais sur une page différente) — pas de vue unifiée projet + tâches + timeline.
- Aucune page ne permet de garder plusieurs projets "ouverts" simultanément — alors que c'est la réalité de travail de Haïfa.

## Design approuvé

### Architecture

Une page unique **`/os/work`** remplace les 3 routes actuelles. `/os/projets`, `/os/taches`, `/os/agenda` deviennent des redirects vers `/os/work` (pour ne pas casser de liens existants, y compris les deep-links `/os/legacy#<id>`). Le groupe de nav "Work" (`nav.ts`) passe de 3 entrées à **1 seule entrée** (label "Work", `href: "/os/work"`).

### Layout (3 zones empilées verticalement)

**1. Bandeau timeline multi-projets** (haut de page)
Un couloir par projet actif, deadlines + tâches datées positionnées proportionnellement sur une frise commune (aujourd'hui → dernier jalon). Généralise `ganttItems()` (déjà dans `compute.ts`, accepte un `projectId` optionnel) : nouvelle fonction `ganttByProject(deadlines, tasks, projectIds, now)` qui appelle `ganttItems` pour chaque projet actif et retourne `{ projectId, ...GanttResult }[]`, plus une frise temporelle partagée (min/max commun à tous les projets, pas par-projet, pour que les couloirs soient alignés).

**2. Bande "Sprint actuel"** (sous le bandeau timeline — détails dans "Fonctionnalités Plane intégrées" ci-dessous) — objectif + vélocité + jours restants du sprint actif (`graph.sprints`). Masquée si aucun sprint actif.

**3. Corps en 2 colonnes**
- **Gauche — liste des projets actifs**, triée par score "pulse" (voir ci-dessous, décroissant). Chaque ligne : point de couleur (pulse), nom, client, chip deadline/statut. Clic = épingle/désépingle (pas de sélection exclusive).
- **Droite — pile de cartes épinglées**. Chaque carte : header (pulse, nom, prochaine deadline, bouton fermer ✕) + corps (client/identité, 3-5 tâches cochables inline — réutilise `TaskRow`/`toggleTask` existants, blockers en rouge si `graph.blockers` a une entrée non résolue pour ce projet). Carte repliable (header seul visible) sans se désépingler. Pas de limite de cartes épinglées.

**Filtre statut** (remplace les colonnes kanban) : barre en haut de la liste gauche avec toggle Actif/Livré/Archivé (Actif par défaut). Le geste "marquer livré" devient un bouton sur la carte épinglée (au lieu du drag-and-drop entre colonnes) — `mutate` + `logChange` identiques à l'actuel `dropStatus`.

### Score "pulse" (hot / warm / cold)

Nouvelle fonction pure dans `compute.ts`, `projectPulse(project, deadlines, blockers, now): "hot" | "warm" | "cold"` :
- **hot** : deadline ouverte ≤ 7 j **OU** blocker non résolu lié au projet **OU** `priority === "critical"`
- **warm** : deadline ouverte ≤ 30 j **OU** projet avec statut "attente client" (heuristique : tâche/blocker contenant "attente"/"relance" — à affiner si trop de faux positifs, sinon champ dédié)
- **cold** : aucun des cas ci-dessus

La liste gauche trie par pulse (hot → warm → cold), puis par proximité de deadline à l'intérieur de chaque groupe.

### Épinglage — état et persistance

État `pinnedProjectIds: string[]` dans un `useState` local à la page, **persisté en `localStorage`** (clé `fmrxr-os-work-pinned`, pas dans `os_graph` — c'est une préférence d'affichage locale, pas une donnée métier à synchroniser). Au premier chargement (aucune préférence sauvegardée), pré-épingler automatiquement les 2 projets les plus "hot".

### Composants à créer/modifier

- `app/os/work/page.tsx` (nouveau, remplace les 3 pages) — orchestration, calcule pulse/tri, gère l'état pinned.
- `components/os/work/MultiProjectTimeline.tsx` (nouveau) — bandeau couloirs, réutilise `MiniGantt` par couloir ou une variante compacte.
- `components/os/work/ProjectListRow.tsx` (nouveau, remplace `ProjectCard` en tant que ligne de liste — `ProjectCard` reste utilisé ailleurs si référencé, sinon fusionné).
- `components/os/work/PinnedProjectCard.tsx` (nouveau) — carte détail épinglée, réutilise `TaskRow` (actuellement interne à `TaskGroupList.tsx` — à extraire en composant partagé).
- `components/os/work/SprintBanner.tsx` (nouveau) — bande "Sprint actuel" (objectif, vélocité, jours restants), lit `graph.sprints`.
- `lib/os/compute.ts` — ajoute `projectPulse()`, `ganttByProject()`, et `activeSprint(sprints, now)` (sélectionne `status === "active"` sinon le plus récent non clôturé).
- Hook clavier léger (`useEffect` + `keydown` sur `n`/`t` en dehors d'un champ de saisie) directement dans `app/os/work/page.tsx` — pas besoin d'un composant dédié pour un seul raccourci.
- `lib/os/nav.ts` — remplace les 3 entrées Work par 1.
- `app/os/projets/page.tsx`, `app/os/taches/page.tsx`, `app/os/agenda/page.tsx` — remplacés par un redirect Next (`redirect("/os/work")`).

### Ce qui ne change pas

- Création de projet/tâche/deadline : mêmes formulaires (`NewTaskForm`, le formulaire inline de création projet), juste déplacés dans la nouvelle page.
- `logChange`/`mutate` : aucun changement de la couche de synchronisation Supabase.
- La page **Today** (Command Center) n'est pas touchée — elle reste la vue "aujourd'hui, tous domaines confondus" (finance/BDM/relances), le cockpit Work est spécifiquement le focus "mes projets en cours".

### Fonctionnalités Plane intégrées (ajout post-review)

Recherche sur [docs.plane.so](https://docs.plane.so/core-concepts/cycles) pour identifier d'autres mécaniques Plane transposables :

- **Cycles → Sprint actuel.** Plane time-boxe le travail en cycles (dates début/fin, % complétion, jours restants, burndown). Haïfa a déjà cet objet dans son graphe (`graph.sprints`, tracking Scrum Master S28→S32) mais **aucune page native ne l'affiche** — jusqu'ici seul le fichier JSON le porte. Ajout : une **bande "Sprint actuel"** en haut de `/os/work` (sous le bandeau timeline) montrant le sprint dont `status === "active"` (ou le plus récent non clôturé) : objectif (`goal`), vélocité (`velocity`, ex. "4/9"), jours restants (`daysUntil(sprint.end)`), lien vers les tâches du sprint (`sprint.tasks`). Pas de burndown chart (complexité disproportionnée pour un seul utilisateur) — juste une barre de progression + le texte de `notes`/`notes_cloture` en tooltip.
- **Raccourci clavier de création rapide.** Plane ouvre un formulaire de création en appuyant sur `Q` n'importe où dans un projet. Ajout léger : `n` (ou `t`) ouvre `NewTaskForm` en focus depuis n'importe où sur `/os/work`, sans clic — cohérent avec le geste "je note vite une tâche pendant que je bosse sur autre chose".
- **Priorité visible en badge.** Le champ `priority` (déjà dans `OsProject`, actuellement seulement lu pour choisir LE projet "critical" du Gantt) devient un badge coloré sur chaque ligne/carte (critical=rouge, high=orange, medium/low=neutre) — cohérent avec le scoring pulse qui l'utilise déjà en entrée.

**Explicitement laissé de côté** (over-engineering pour un usage solo) :
- **Modules** (sous-découpage d'un projet en chunks) — pas de besoin identifié, ses projets ne sont pas assez volumineux pour ça.
- **Vues sauvegardées / Spreadsheet / Board multiples** — un seul layout (celui de ce spec) suffit à l'usage réel.
- **Burndown/build-up charts**, **Epics**, **Intake**, **Dashboards workspace**, **fonctionnalités IA de Plane** — pensés pour des équipes multi-personnes, hors du périmètre solo-operator de Haïfa.

### Hors scope (explicitement exclu de cette itération)

- Fiches-projet dédiées par URL (`/os/work/[id]`) — évoqué comme piste C en brainstorm, pas retenu maintenant.
- Vues sauvegardées / filtres avancés façon Plane — pas demandé (voir ci-dessus).
- Drag-and-drop des tâches entre projets épinglés.

## Tests

- `os-compute.test.ts` : cas pour `projectPulse` (les 3 branches hot/warm/cold), `ganttByProject` (frise commune, projet sans deadline → couloir vide), et `activeSprint` (sprint actif présent / absent / plusieurs clôturés).
- Vérification manuelle en navigateur (dev server + login admin) : épingler/désépingler, filtre statut, marquer une tâche depuis une carte épinglée, bascule livré depuis le bouton (au lieu du drag kanban).
