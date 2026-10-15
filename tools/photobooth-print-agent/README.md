# Agent d'impression de la borne photobooth

Une page web ne peut ni voir les imprimantes ni imprimer sans boîte de dialogue. Cet agent tourne sur le PC de la borne et fait les deux : il dit à la borne si l'imprimante est prête, et imprime le portrait en plein papier, sans dialogue.

- Écoute **uniquement 127.0.0.1** (port 7341), n'accepte que les origines autorisées (`https://fmrxr.com` et `http://localhost:3000` par défaut).
- Aucune dépendance : Node 18 ou plus.
- Windows (impression via System.Drawing, marges à zéro), macOS et Linux (CUPS, `lp`).
- Un même portrait n'est pas imprimé deux fois par erreur (identifiant d'impression).

## Installation sur le PC de la borne

1. Installer Node.js LTS.
2. Copier ce dossier sur le PC, puis : `node agent.mjs`
3. Vérifier : ouvrir `http://127.0.0.1:7341/status` → la liste des imprimantes, celle par défaut, `ready: true`.
4. Dans l'admin de la campagne, **Impression** : cocher, mode « Agent local », papier (10 × 15 par défaut), cadrage.
5. Ouvrir la borne avec `&debug=1` : la ligne « imprimante ready · <nom> » doit apparaître. Sans `debug`, un point vert « Imprimante prête » s'affiche sur l'écran d'accueil.

**Au premier lancement**, Chrome peut demander l'autorisation à fmrxr.com d'accéder aux « appareils du réseau local » : accepter, c'est l'agent.

### Démarrage automatique (Windows)

Créer un raccourci vers `node.exe "C:\chemin\agent.mjs"` dans `shell:startup`.

### Variables

| Variable | Défaut | Rôle |
|---|---|---|
| `PORT` | 7341 | Port d'écoute (à reporter dans l'admin) |
| `ALLOWED_ORIGINS` | `https://fmrxr.com,https://www.fmrxr.com,http://localhost:3000` | Pages autorisées à imprimer |
| `PRINT_TO_DIR` | — | Test sans papier : les imprimantes virtuelles (Print to PDF) écrivent un PDF dans ce dossier |

## Détection

| État | Signification | Borne |
|---|---|---|
| `ready` | Imprimante par défaut (ou celle nommée dans l'admin) en ligne, sans erreur | Bouton Imprimer actif |
| `not_ready` | Hors ligne, plus de papier, bourrage, capot ouvert… | Bouton grisé, « impression indisponible » |
| `none` | Aucune imprimante par défaut | Idem |
| `no_agent` | Agent arrêté | Idem |

Sous Windows : `Win32_Printer` (PrinterStatus, WorkOffline, DetectedErrorState). Le statut papier dépend du pilote : certaines imprimantes photo ne le remontent pas.

## Tablette ou téléphone en borne

L'agent ne tourne pas sur iPad ni Android, et une page https ne peut pas joindre un autre PC du réseau en http. Sur tablette : mode **Navigateur** dans l'admin, qui ouvre la boîte d'impression du système (AirPrint, Mopria) au format choisi. Pas de détection possible dans ce mode.

## Kiosque Chrome sans dialogue, sans agent

Lancer Chrome avec `--kiosk --kiosk-printing` : en mode Navigateur, l'impression part directement sur l'imprimante par défaut. Pas de détection d'état dans ce cas.

## Testé le 15/10/2026

Windows 11, « Microsoft Print to PDF » avec `PRINT_TO_DIR` : page 15,2 × 10,2 cm, image bord à bord, 6 s par impression, double demande ignorée, origine non autorisée refusée (403). Pas encore testé sur une vraie imprimante photo.
