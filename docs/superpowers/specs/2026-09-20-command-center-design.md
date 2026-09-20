# Command Center en une seule page

**Date :** 20/09/2026
**Statut :** validé par Haïfa, suite de la refonte de Today
**Pages concernées :** `/os/today` (devient le Command Center), `/os/dashboard` (retiré), `/os/okr` (conservée pour la planification)

## 1. Pourquoi fusionner

La règle courante veut qu'on scinde un tableau de bord au-delà d'une douzaine d'indicateurs. Le critère réel est le **nombre de publics**, pas le nombre de chiffres. Il n'y en a qu'un ici. Le Dashboard actuel porte 13 blocs parce qu'il tient deux rôles à la fois : le résumé du jour et l'analyse financière.

Quatre blocs du Dashboard sont des doublons exacts de Today : Focus et Santé, Quick stats, Alertes, Aperçu projets. Les garder côte à côte oblige à lire deux fois la même information, dans deux mises en forme différentes.

La page est donc réordonnée selon les questions posées dans l'ordre où elles se posent, plutôt qu'en tuiles de poids égal.

## 2. Structure

```
En-tête           salutation, fraîcheur des données, position dans le trimestre, 3 états de santé
Saisie            un champ unique, toujours accessible
Niveau 1          Où j'en suis : briefing + « si tu ne fais qu'une chose »
Niveau 2a         Argent · Clients · Production (les trois colonnes)
Niveau 2b         Bande OKR : objectifs du trimestre, rythme, fenêtre de planification
Niveau 3          Replis : Dette · Analyse · Journal
```

Les trois replis sont fermés par défaut, leur état est mémorisé par navigateur.

## 3. Ce que devient chaque bloc

| Bloc | Destination |
|---|---|
| Today (briefing, colonnes, dette) | base de la page, inchangé |
| Dashboard, Focus et Santé | supprimé, doublon, y compris le score sur 100 |
| Dashboard, Quick stats | supprimé, doublon des colonnes |
| Dashboard, Alertes | fusionné dans le repli Dette |
| Dashboard, Aperçu projets | supprimé, le module Projets existe |
| Dashboard, Concentration, run rate, anomalie, taux de change, analytics | repli Analyse (relocalisation dans Finance en phase 2) |
| Dashboard, Taux de conversion pipeline | repli Analyse (relocalisation dans Pipeline en phase 2) |
| Dashboard, Activité récente | repli Journal |
| Dashboard, KPI | repli Analyse, puis fusion avec les OKR en phase 2 |
| OKR | bande de suivi dans la page, page dédiée conservée pour planifier, noter et clôturer |

La barre latérale passe de trois entrées à une : « Command Center ». L'entrée OKR reste dans la navigation tant que la page dédiée existe, car elle porte un travail distinct du suivi quotidien.

## 4. Nouveautés

### 4.1 Saisie universelle

Un champ unique en tête de page crée une tâche dans le graphe, sans changer de module. Raccourci clavier `c`. La tâche est créée sans projet ni échéance, à trier ensuite depuis le module Tâches. Une écriture de journal accompagne chaque création.

C'est le seul endroit de la page qui écrit dans le graphe, tout le reste est en lecture.

### 4.2 Depuis ta dernière visite

L'horodatage de la dernière ouverture est conservé par navigateur. Les lignes du briefing et les écritures de journal postérieures portent un marqueur. Si l'horodatage est absent ou illisible, rien n'est marqué, sans erreur.

### 4.3 Bande OKR

`okrStrip(graph, now)` renvoie les objectifs du trimestre courant avec leur avancement, le temps écoulé, le rythme, et un drapeau quand le trimestre suivant n'a aucun objectif alors que la fenêtre de planification est ouverte (deux semaines avant la fin du trimestre).

## 5. Corrections embarquées

1. **CA du trimestre faux.** `okrKrValue()` avec `auto: "ca_quarter"` additionne toutes les factures émises dans le trimestre, brouillons, annulées et remplacées comprises. Le calcul doit exclure les statuts `draft` et `cancelled` ainsi que toute facture portant `replaced_by`, comme le reste de l'OS.
2. **Score sur 100.** `healthScore()` reste dans `compute.ts` mais n'est plus affiché nulle part ; la page utilise `healthBreakdown()`.
3. **Indicateur de journal non synchronisé.** Hérité de l'époque où la vérité vivait dans le fichier local. Retiré de l'en-tête.

## 6. Tests

Dans `src/test/os-today.test.ts`, complété :

- `okrStrip()` : objectifs du seul trimestre courant, rythme = avancement moins temps écoulé, drapeau de planification levé à quinze jours de la fin et seulement si le trimestre suivant est vide.
- `okrKrValue()` avec `ca_quarter` : une facture `draft`, une `cancelled` et une portant `replaced_by` ne comptent pas ; une `sent` et une `paid` comptent.
- `recentActivity()` : tri du plus récent au plus ancien, plafond respecté.
- La saisie universelle est testée par son effet sur le graphe, pas par le rendu.

## 7. Hors périmètre

La relocalisation des cartes d'analyse dans Finance et Pipeline, et la fusion des KPI avec les OKR, sont la phase 2. La refonte du module OKR lui-même (confiance, KR calculés, cycle de planification) fait l'objet de sa propre spec.
