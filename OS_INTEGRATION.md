# FMRXR OS → intégration site (mode hybride Supabase)

L'OS est servi dans l'app Next à `/os` (espace privé admin), avec ses données dans **Supabase** (`os_graph`) au lieu du fichier local. Tout le code de l'OS est conservé — seul le stockage change, via un pont injecté à l'exécution.

## Ce qui a été ajouté

| Fichier | Rôle |
|---|---|
| `supabase/migrations/0005_os_graph.sql` | Table `os_graph` (1 doc JSONB par admin) + RLS admin-only |
| `src/app/api/os/graph/route.ts` | GET (charge) / PUT (sauve, verrou optimiste) |
| `src/app/api/os/import/route.ts` | Import unique du `knowledge-graph.json` local → Supabase |
| `src/app/os/page.tsx` | Page `/os` (auth admin) → iframe plein écran |
| `src/app/os/app/route.ts` | Sert le HTML de l'OS + injecte le pont Supabase |
| `src/middleware.ts` | `/os` et `/api/os` protégés par login |
| `.env.local.example` | `OS_HTML_PATH`, `OS_KG_PATH` |

## Mise en route (local, dev)

1. **Migration Supabase**
   ```bash
   cd fmrxr-web
   npx supabase db push     # applique 0005_os_graph.sql
   ```
   (ou colle le SQL dans le SQL editor Supabase)

2. **Variables d'env** — copie les 2 lignes `OS_*` de `.env.local.example` dans `.env.local` (ajuste les chemins si besoin).

3. **Lancer l'app**
   ```bash
   npm run dev
   ```
   Connecte-toi à `/auth` avec ton compte admin.

4. **Import initial (une seule fois)** — amorce Supabase depuis ton fichier local. Connectée en admin, exécute dans la console du navigateur (ou via un outil REST) :
   ```js
   await fetch('/api/os/import', { method: 'POST' }).then(r => r.json())
   // → { ok: true, imported: { projects, finance, tasks } }
   ```

5. **Ouvre `/os`** — l'OS complet se charge, données depuis Supabase. Chaque modification est sauvegardée dans `os_graph` (accessible depuis n'importe quel appareil connecté).

## Comportement

- **Chargement / sauvegarde** : `/api/os/graph` (verrou optimiste via `updated_at` — même logique anti-écrasement que la version fichier).
- **Features du serveur local non portées** (briefing, inbox watcher, backups, verrou fichier) : neutralisées proprement en web. Le cœur (projets, finance, CRM, BDM, tâches, agenda, stack) fonctionne.
- **Sécurité** : RLS stricte — seul l'admin propriétaire lit/écrit son `os_graph`.

## Reste à faire (Phase 2)

- **Déploiement** : `/os/app` et `/api/os/import` lisent des fichiers via chemins absolus locaux (`fs.readFileSync`) — OK en dev, **KO sur Netlify**. Pour la prod : copier `FMRXR_OS.html` dans le repo (ex. `src/os/os-app.html`, importé en string) et retirer la dépendance au chemin local. L'import initial se fera une fois depuis le poste local.
- **Temps réel multi-appareil** : brancher Supabase Realtime sur `os_graph` pour rafraîchir l'OS quand un autre appareil sauvegarde.
- **Backups** : table `os_graph_backups` (rotation) pour retrouver la fonction de restauration.
- **Migration douce vers natif** : porter progressivement des modules en React/Supabase relationnel si besoin.
