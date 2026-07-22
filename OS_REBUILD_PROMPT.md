# FMRXR OS — reconstruction native vers un Agentic Business OS (brief Claude Code)

> Colle ce fichier comme contexte (`@OS_REBUILD_PROMPT.md`) au démarrage. Il est autonome.
> **North Star : Agentic Business Operating System (ABOS)** — §0.b. On y va par couches ; on livre d'abord la Phase A (Fondation + Today).

## 0. Mission

Reconstruire **FMRXR OS** — le business operating system de Haïfa Becheikh (FMRXR Studio · EFFET MÈRE · Haïfa Becheikh · EXPLAB) — **nativement dans cette app Next.js**, en remplaçant le prototype monolithe (un fichier `FMRXR_OS.html` vanilla JS, gardé en parallèle pendant la migration).

Le prototype a validé le modèle. On garde **le knowledge-graph comme contrat de données** et on reconstruit **le front, natif, orienté flux**, avec le design system `fmrxr-design` déjà câblé dans l'app.

**Philosophie** : ce n'est pas 14 écrans indépendants, c'est un système orienté flux qui suit le cycle de décision d'un entrepreneur :
`Observe → Decide → Execute → Sell → Create → Learn → Delegate`.

## 0.b Vision North Star — Agentic Business OS (ABOS)

FMRXR OS n'est pas un dashboard business ni « un CRM avec IA ». C'est un **Agentic Business Operating System** : données, processus et agents IA fonctionnent comme **un seul système**. Cette vision guide l'architecture dès maintenant (même si on la livre par couches).

**5 principes fondateurs :**
1. **Knowledge-first** — une source de vérité unique (le knowledge graph). Tout lit/écrit là.
2. **AI-native** — les agents sont des **collaborateurs**, pas des fonctionnalités. On délègue, on ne « lance pas des prompts ».
3. **Workflow-driven** — des **événements** déclenchent des actions et automatisations. Un workflow est un **objet** (donnée éditable), pas du code figé.
4. **Context-aware** — chaque agent agit avec le contexte complet de l'entreprise (via le Knowledge Core).
5. **Multi-business** — plusieurs marques partagent le **même noyau de connaissance**, avec des espaces de travail scopés (`businesses`).

**Modules = couches, pas silos.** L'UI est un empilement de couches, pas une collection d'écrans :

```
Layer 0  CEO / Founder (toi)
Layer 1  COMMAND CENTER   — « Que dois-je faire maintenant ? » (page vivante d'accueil)
Layer 2  WORK             — Projet → Sprint → Tâches → Deadline → Docs → IA (même contexte)
Layer 3  BUSINESS         — Prospect → Client → Projet → Facture → Paiement → Fidélisation
Layer 4  CREATION         — Asset → Projet → Versions → Livraison → Bibliothèque → Réutilisation
Layer 5  KNOWLEDGE CORE   — graph + docs + personas + SOP + prompts + mémoire + décisions (le cerveau ; tous lisent ici)
Layer 6  AI WORKFORCE     — agents par domaine (CEO, COO, Finance, Studio, Content, Developer, BDM, Marketing, Assistant, Research)
Layer 7  AUTOMATION       — workflows-objets (trigger → steps → log), intégrations
```

**Command Center = page vivante et composable.** 80 % du temps s'y vit. C'est un empilement de cartes qui **agrègent** (Today, recommandations IA, sprint courant, pipeline, trésorerie, derniers assets) **et deep-linkent** vers la couche au clic. Jamais un mur : chaque carte est une projection d'une couche, ouvrable à la demande.

**Le graphe devient une *vue*, pas un module.** On ne « ouvre pas le Graph », on **cherche**. Le Knowledge Core est le module ; le graphe force-directed est l'une de ses vues (à côté d'une recherche, d'une timeline de décisions, etc.).

**Deux objets de première classe à prévoir dès le modèle (même vides en Phase A) :** `agents` et `workflows` (schémas au §3). Cela évite de repeindre plus tard.

**Séquencement honnête :** l'ABOS est la destination. La valeur se livre par couches — on solidifie **Today → Work → Business** d'abord ; les agents et workflows **agissent ensuite** sur cette donnée structurée. Les agents ne valent que par le socle sous eux.

## 1. Décisions déjà prises (ne pas re-débattre)

- **Emplacement** : dans cette app `fmrxr-web` (réutilise auth Supabase + design system + backoffice).
- **Données** : le knowledge-graph reste la source de vérité, stocké dans Supabase (table `os_graph`, JSONB, déjà créée). On normalisera en tables relationnelles plus tard, seulement pour les entités « chaudes ».
- **Première vague** : **Fondation + module Today**. Les autres modules suivent par vagues.
- **Le monolithe reste vivant** à `/os/legacy` le temps de porter chaque module.

## 1.b Schéma d'architecture cible (vue d'ensemble)

### Le flux (les modules ne sont pas des écrans, ce sont des domaines)

```
                          ┌───────────────┐
                          │   STRATÉGIE   │  (toi + OKR)
                          └───────┬───────┘
                                  ▼
                        ╔═════════════════════╗
                        ║   COMMAND CENTER    ║   OBSERVE / DECIDE
                        ║  Today · Dashboard  ║   « Où j'en suis ? »
                        ║        · OKR        ║
                        ╚══════════┬══════════╝
              ┌──────────────────┼───────────────────┐
              ▼                  ▼                    ▼
      ┌──────────────┐  ┌─────────────────┐  ┌────────────────┐
      │     WORK     │  │    BUSINESS     │  │    CREATION    │
      │  EXECUTE     │  │     SELL        │  │    CREATE      │
      │ Projets ·    │  │ Clients ·       │  │ Studio&Assets ·│
      │ Tâches ·     │  │ Pipeline ·      │  │ Content Factory│
      │ Agenda       │  │ Finance         │  │                │
      └──────┬───────┘  └────────┬────────┘  └───────┬────────┘
             └──────────────────┼───────────────────┘
                                ▼
                    ╔═══════════════════════╗
                    ║      KNOWLEDGE        ║   LEARN
                    ║  Brain (graphe) ·     ║   toute la mémoire
                    ║  Knowledge (stack)    ║
                    ╚═══════════┬═══════════╝
                                ▼
                    ╔═══════════════════════╗
                    ║     AI WORKFORCE      ║   DELEGATE
                    ║  agents par domaine   ║   « je délègue »
                    ╚═══════════════════════╝

Boucle : l'IA lit KNOWLEDGE → agit dans WORK → met à jour BUSINESS →
alimente CREATION → remonte les indicateurs au COMMAND CENTER.
```

### La circulation des données (une seule source de vérité)

```
  knowledge-graph.json (contrat)
        │  import unique
        ▼
  Supabase · table os_graph (JSONB, RLS admin)
        ▲│
   PUT  ││  GET      /api/os/graph  (verrou optimiste updated_at)
        │▼
  src/lib/os/store.tsx  ── OsProvider / useOs() ──►  tous les modules
        │                                            (Today, Work, Business…)
        └── mutate(fn) → log + autosave debounce ────┘
```

### Arbre de fichiers cible (Phase A en gras)

```
src/
├─ lib/os/
│  ├─ **types.ts**      types OsGraph (fidèles au §3)
│  ├─ **compute.ts**    fns pures (daysUntil, focusToday, relances, health…)
│  ├─ **nav.ts**        6 familles de flux + modules (§6)
│  └─ **store.tsx**     OsProvider + useOs() (charge/sauve os_graph)
├─ app/os/
│  ├─ **layout.tsx**    auth admin + OsProvider + fm-canvas + Sidebar + Topbar
│  ├─ **page.tsx**      redirect → /os/today
│  ├─ **today/page.tsx**  ← MODULE À LIVRER (§7)
│  ├─ legacy/page.tsx   iframe du monolithe (déplacé)
│  ├─ app/route.ts      (existant) sert le HTML du monolithe
│  ├─ dashboard/…       ┐
│  ├─ okr/…             │
│  ├─ projets/…         │
│  ├─ taches/…          │  Phases B→D :
│  ├─ agenda/…          │  stubs « bientôt » en Phase A,
│  ├─ clients/…         │  portés module par module ensuite
│  ├─ pipeline/…        │
│  ├─ finance/…         │
│  ├─ studio/…          │
│  ├─ content-factory/… │
│  ├─ brain/…           │  (graphe force-directed)
│  ├─ knowledge/…       │  (stack prompts/presets/library)
│  └─ ai-workforce/…    ┘  (agents délégables)
├─ components/os/
│  ├─ **OsSidebar.tsx**  nav groupée par flux
│  ├─ **OsTopbar.tsx**   fil d'Ariane + business + état save
│  └─ **Card/Stat/Badge/Money.tsx**  atomes glass
└─ app/api/os/            (existant) graph/route.ts · import/route.ts
```

### Carte des modules par phase

| Famille | Module | id technique | Phase |
|---|---|---|---|
| Command Center | **Today** | `today` (nouveau) | **A** |
| Command Center | Dashboard | `dashboard` | B |
| Command Center | OKR | `okr` | B |
| Work | Projets | `projets` | B |
| Work | Tâches | `taches` | B |
| Work | Agenda | `agenda` | B |
| Business | Clients | `crm` | C |
| Business | Pipeline | `bdm` | C |
| Business | Finance | `finance` | C |
| Creation | Studio & Assets | `studio` | D |
| Creation | Content Factory | `content-factory` | D |
| Knowledge | Brain | `graph` | D |
| Knowledge | Knowledge | `stack` | D |
| AI | AI Workforce | `aihub` | D |

> Les `id technique` restent identiques au monolithe pour préserver la logique métier portée et les liens profonds.

## 2. Ce qui existe déjà dans le repo (à réutiliser, ne pas casser)

### Stack
Next 16 (app router) · React 19 · TypeScript strict · Tailwind v4 · shadcn/ui · Supabase SSR (`@supabase/ssr`). Tests : Vitest (`npm run test`). Lint : `npm run lint`. Dev : `npm run dev`.

### Auth & rôles (`src/lib/`)
- `auth.ts` : `currentUser()`, `currentRoles()`, `requireUser()`, `assertRole(roles)`.
- `roles.ts` : rôles `"admin" | "editor"`. **L'OS est réservé au rôle `admin`** (espace privé de Haïfa).
- `supabase/server.ts` : `getSupabaseServer()` (client SSR cookies). `supabase/client.ts` : browser. `supabase/admin.ts` : service role.
- `src/middleware.ts` : redirige vers `/auth` si non connecté sur `/admin`, `/os`, `/api/os`.
- Backoffice existant `/admin/*` (EntityForm, EntityTable, CRUD server actions) — **ne pas toucher**, mais s'en inspirer pour les patterns.

### Design system `fmrxr-design` (déjà dans `src/app/globals.css`)
`@theme` expose (dark-first, violet-noir) :
```
--color-fmbg:#0d0c14  --color-fmfg:#f5f5f8  --color-fmmuted:#7b7a8e
--color-fmaccent:#7bef7b (vert électrique — SIGNAL rare)
--color-fmprimary:#4d9fff (bleu — interactif/secondaire)
--color-fmborder:#1e1b2c  --color-fmcard:#111019  --color-fmmutedbg:#181620
--font-display:"Monument Extended" (fallback Geist)  --font-grotesk/sans:"Resolve Sans" (fallback Space Grotesk)  --font-mono:Geist Mono
```
Classes utilitaires disponibles : `.fm-canvas` (trame 72px + halo vert + grain, fade bas), `.fm-glass-card` (verre translucide blur+hairline, hover), `.fm-display` (Monument, uppercase, -0.03em, lh .92), `.fm-glow-accent` (halo vert sur mots accent), `.fm-rise` (entrée), `.fm-link` (hover vert), `.fm-row` (flèche qui glisse au hover).
**Règles couleur** : fond violet-noir ; vert = accent/signal **rare** (états actifs, live, mots-clés) ; bleu = interactif (liens, CTA secondaires) ; **rouge = danger fonctionnel uniquement** (retards, critiques) — jamais comme accent de marque (le rouge est réservé aux documents imprimés). Cartes = glass. Titres = Monument. Coins arrondis en digital.

### Backend OS déjà posé (Phase 1 hybride — à réutiliser tel quel)
- `supabase/migrations/0005_os_graph.sql` : table `os_graph(owner uuid unique, data jsonb, updated_at, updated_by)`, RLS `owner=auth.uid() AND has_role(admin)`.
- `src/app/api/os/graph/route.ts` : **GET** (charge le doc de l'admin) / **PUT** (sauve, **verrou optimiste** via `prevUpdated` vs `updated_at`, 409 si conflit, `force:true` pour écraser). ← **c'est le backend du store natif.**
- `src/app/api/os/import/route.ts` : POST — import unique du `knowledge-graph.json` local vers Supabase (à lancer une fois : `fetch('/api/os/import',{method:'POST'})`).
- `src/app/os/page.tsx` (iframe du monolithe) + `src/app/os/app/route.ts` (sert le HTML + pont Supabase). **À déplacer vers `/os/legacy`** (voir §5).
- Détails : `fmrxr-web/OS_INTEGRATION.md`.

## 3. Contrat de données — le knowledge-graph

Le doc JSON (dans `os_graph.data`) contient ces tableaux. Créer des types TS fidèles dans `src/lib/os/types.ts`. Champs clés :

- **identities** `{id, name, ...}` — les 4 casquettes (`effet-mere`, `fmrxr-studio`, `haifa`, `explab`).
- **businesses** `{id, name, fiscal?{regime,matricule_fiscal,plafond_annuel}}` — filtre multi-business.
- **projects** `{id, name, type:"project", status:"active|archived|...", identity:string[], client, category, priority:"critical|high|...", date?, scope?{objectifs,perimetre,livrables[],ressources,risques,start,end,timeline}}`.
- **people** `{id, name, type:"person", role?, email?, ...}`.
- **clients** `{id, name, type:"client", segment?, email?, web?, notes?}`.
- **finance** (factures) `{id, ref, type:"invoice", client, label, amount, currency:"TND|EUR", advance?, status:"draft|sent|partial|paid|late|disputed", issued, paid_date?}`.
- **quotes** `{id, ref, client, amount, currency, status:"draft|sent|accepted|rejected|expired", issued}`.
- **expenses** `{id, label, amount, currency, date, category?, recurring?}`.
- **tasks** `{id, label, project?, owner?, due?, done:boolean}`.
- **deadlines** `{id, date, label, project?, critical?:boolean, owner?, done?:boolean}`.
- **assets** `{id, ...}` · **tools** `{id, name, cat, notes}` · **relations** `{from, to, rel}`.
- **bdm** `{opportunities:[{id, name, type:"open-call|festival|brand|venue|grant|autre", identity, status:"lead|contact|proposal|won|lost|expired", deadline?:ISO, url?, found?, source?, notes?}]}`.
- **kpis** `[{id, name, unit, target, dir:"min|max", auto?:string, value?}]`.
- **okrs** `[{id, quarter:"2026-Q3", objective, identity?, krs:[{id, label, target, value, unit, auto?:"ca_quarter"}]}]`.
- **cf_batches** `[{id, name, project, source, stage:"attente|ingere|montage|decline|livre", note?}]` — Content Factory.
- **stack** `{prompts:[], presets:[], tools:[]}` — mémoire VJing SD/Deforum.
- **library** `[]` — bibliothèque de prompts réutilisables.
- **trash** `[]` · **log** `[{ts, action, entity, detail, by, synced}]` · **meta** `{seq:{}, eur_tnd:3.38, updated, updated_by, cal_sync}`.

**Objets ABOS à prévoir dès maintenant (tableaux vides en Phase A, mais typés) :**
- **agents** `[{ id, role:"ceo|coo|finance|studio|content|developer|bdm|marketing|assistant|research", name, mission, persona_ref?, tools:string[], scope:{businesses?:string[], modules?:string[]}, capabilities:[{ action, mode:"propose|act" }], memory_ref?, history?:[{ts, action, result}] }]`
  - `mode:"propose"` = l'agent suggère seulement (safe). `mode:"act"` = effet de bord → **human-in-the-loop obligatoire** pour tout envoi (mail), publication, mouvement d'argent, suppression.
- **workflows** `[{ id, name, trigger:{ type:"event|schedule|manual", event?, cron? }, conditions?:[], steps:[{ id, type, params, requires_approval?:boolean }], enabled:boolean, runs?:[{ts, status:"ok|failed|awaiting_approval", detail}] }]`
  - Un workflow est une **donnée éditable** et **rejouable** (idempotent). Ex : `opportunité.créée → créer projet → créer dossier Drive → créer tâches → préparer devis → notifier CEO`.

> Le monolithe de référence : `../FMRXR_OS/FMRXR_OS.html` (logique métier à porter) et `../FMRXR_OS/data/knowledge-graph.json` (données réelles). `../FMRXR_OS/ARCHITECTURE.md` décrit tout.

## 4. Architecture à construire (Phase A)

```
src/lib/os/
  types.ts        # types OsGraph fidèles au §3
  compute.ts      # fonctions PURES : daysUntil, focusToday, relances,
                  #   closingSoon(opps), healthScore, kpiValue, toTND, oppDeadlineStatus
  nav.ts          # groupes de flux + modules (§6)
  store.tsx       # 'use client' OsProvider + useOs() :
                  #   - charge GET /api/os/graph (data + updated_at)
                  #   - state React (graph)
                  #   - save(): PUT /api/os/graph {data, prevUpdated} ; gère 409 (recharge ou force)
                  #   - autosave debounce (~600ms) ; helper mutate(fn) + logChange(action,entity,detail)
src/app/os/
  layout.tsx      # 'server' : assertRole admin (redirect /auth) ; enveloppe <OsProvider> ;
                  #   fond .fm-canvas ; <OsSidebar/> (nav flux) + <OsTopbar/> ; children
  page.tsx        # redirect('/os/today')
  today/page.tsx  # module Today (§7)
  legacy/page.tsx # iframe du monolithe (déplacé, voir §5)
src/components/os/
  OsSidebar.tsx   # nav groupée par flux (fm-glass, accent vert sur actif), lien Legacy en bas
  OsTopbar.tsx    # fil d'Ariane (Groupe · Module) + switch business + état save + ⌘K (stub ok)
  Card.tsx        # carte glass réutilisable (fm-glass-card)
  Stat.tsx, Badge.tsx, Money.tsx  # atomes (Money gère TND/EUR + mode privacy)
```

Store : optimistic-lock identique au monolithe (compare `updated_at`). Toute mutation passe par `mutate()` qui pousse une entrée `log` (`by:"OS web"`) et déclenche l'autosave.

## 5. Cohabitation avec le monolithe

- Déplacer l'actuel `src/app/os/page.tsx` (iframe) → **`src/app/os/legacy/page.tsx`** (même contenu, iframe vers `/os/app`). Garder `src/app/os/app/route.ts` inchangé (sert le HTML).
- `/os` devient l'OS **natif**. Ajouter un lien discret « Ancienne version » vers `/os/legacy` dans la sidebar.
- `middleware.ts` gère déjà `/os` — rien à changer.

## 6. Navigation — orientée flux (6 familles)

```
COMMAND CENTER   Today · Dashboard · OKR          (Observe / Decide)
WORK             Projets · Tâches · Agenda        (Execute)
BUSINESS         Clients · Pipeline · Finance     (Sell)
CREATION         Studio & Assets · Content Factory(Create)
KNOWLEDGE        Brain (graph) · Knowledge (stack)(Learn)
AI WORKFORCE     Agents délégables                (Delegate)
```
Renommages (labels) : Dashboard→Dashboard, CRM→**Clients**, BDM→**Pipeline**, Graph→**Brain**, Bibliothèque/Stack→**Knowledge**, AI Hub→**AI Workforce**. En Phase A, seuls **Today** (+ le shell) sont fonctionnels ; les autres entrées de nav pointent vers des pages stub « bientôt » (ou temporairement vers `/os/legacy#<module>`).

## 7. Module TODAY (le cockpit — à livrer en Phase A)

La home de l'OS. 80 % du temps se vit ici. Sections, toutes issues du store :

1. **En-tête** — salutation selon l'heure + date + **Business Health** (score `healthScore()`), chip couleur (vert ≥70 / ambre ≥45 / rouge <45).
2. **🔥 Priorité #1** — hero glass : le point le plus pressant via `focusToday()` (deadline en retard > tâche urgente > plus gros encaissement en attente). Titre + sous-titre (J-N / montant) + CTA vers le module concerné.
3. **Grille « à traiter aujourd'hui »** (cartes glass) :
   - **Tâches** — top 5 ouvertes triées par échéance (retards en tête, rouge).
   - **Deadlines imminentes** — ≤ 7 j + retards, tri chrono, critiques en accent.
   - **Relances** — factures `sent|partial` émises depuis > 14 j (montant restant) + devis `sent` > 10 j.
   - **Pipeline — ferme bientôt** — opportunités non closes dont la deadline ∈ ]0;14j] (J-N, urgent ≤5j en rouge).
4. **Agent conseillé** — bloc contextuel : s'il y a des relances → « Déléguer au Pipeline/BDM » ; sinon s'il y a des appels imminents → « Préparer les candidatures » ; sinon focus tâches. (Bouton stub pour l'instant → prépare la Phase AI Workforce.)

Chaque item est cliquable et navigue vers son module (ou `/os/legacy#<module>` tant que le module natif n'existe pas). Aucune donnée inventée : tout vient du graphe.

## 8. Règles & garde-fous

- **Ne jamais casser** le site public (`(public)/*`) ni le backoffice (`/admin/*`).
- **RLS/admin** : toutes les routes `/os` et `/api/os` réservées au rôle `admin`.
- **Design** : uniquement les tokens/classes `fmrxr-design` (§2). Vert rare, bleu interactif, rouge = danger seul. Glass + Monument + fm-canvas. Pas de lib d'icônes générique lourde (lucide déjà présent, usage sobre).
- **Données** : le knowledge-graph est le contrat. Ne pas inventer de chiffres (finance, deadlines). Montants : distinguer devise d'émission (fait foi) vs affichage consolidé (switch TND/€).
- **TS strict**, pas de `any` non justifié. Petits composants. Server components par défaut, `'use client'` seulement où nécessaire (store, interactions).
- **Tests** : au moins couvrir `compute.ts` (fonctions pures) en Vitest.
- **Sécurité agents (ABOS)** : un agent en `mode:"act"` ne déclenche JAMAIS un effet de bord (envoi de mail, publication, mouvement d'argent, suppression) sans **validation humaine explicite**. Par défaut, les agents **proposent** ; l'utilisateur approuve. C'est une contrainte de design, pas une option — les `steps` de workflow avec `requires_approval:true` bloquent jusqu'à confirmation.
- **Command Center composable** : la home agrège via des cartes qui **deep-linkent** vers leur couche. Ne jamais en faire un mur figé — chaque carte reste une projection ouvrable.

## 9. Mise en route (à faire tourner)

```bash
npm install
# migration déjà présente : npx supabase db push  (si os_graph pas encore en base)
npm run dev
# se connecter en admin sur /auth
# import initial une seule fois :
#   dans la console navigateur (connectée admin) : await fetch('/api/os/import',{method:'POST'}).then(r=>r.json())
# ouvrir /os  → doit rediriger vers /os/today, alimenté depuis Supabase
npm run lint && npm run test
```

## 10. Vagues suivantes (après Phase A — ne pas faire maintenant)

- **B** : Command Center (Dashboard KPIs/analytics/briefing/plafond) + OKR ; Work (Projets kanban, Tâches, Agenda+Gantt).
- **C** : Business (Clients, Pipeline avec tri urgence/expirées, Finance + générateur devis/facture PDF branded).
- **D** : Creation (Studio/Assets, Content Factory pipeline) ; **Knowledge Core** (le module « cerveau » : recherche + graphe comme *vue* + docs/personas/SOP/prompts/décisions) ; **AI Workforce** (les agents deviennent visibles et délégables — CEO, COO, Finance, Studio, Content, Developer, BDM, Marketing, Assistant, Research ; chacun avec mémoire/outils/permissions).
- **E — Automation & Workflows** : éditeur de workflows-objets (`trigger → steps → log`), remplaçant progressivement les tâches planifiées ; intégrations (Drive, Calendar, Gmail…) comme steps.
- **F — Command Center vivant** : la home passe de « Today » à une surface composable multi-couches (recommandations d'agents, sprint, pipeline, trésorerie, assets), chaque carte deep-linkée.
- **Plus tard** : normaliser tables chaudes (tasks, opportunities, invoices) ; Supabase Realtime multi-appareil ; espaces multi-business scopés sur un Knowledge Core partagé ; retrait progressif de `/os/legacy`.

---

**Objectif de cette session Claude Code : livrer la Phase A (Fondation + Today) qui tourne en `npm run dev`, données réelles depuis Supabase, look `fmrxr-design`. Puis me proposer la Phase B.**
