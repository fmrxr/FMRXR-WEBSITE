# ROADMAP DE PRODUCTION — *L'ASSEMBLEUR*
### Du prototype navigateur à la chambre-cube
*FMRXR Studio — direction technique — v1, 16/10/2026*
*Hypothèses : équipe cœur de 4–6 personnes (1 lead dev Three.js, 1 dev gameplay/TD, 1 DA 3D, 1 auteur·e ink, 1 sound designer à mi-temps, 1 chef de projet/DT), démarrage S1 = novembre 2026. Les durées sont en semaines calendaires. Les coûts matériels renvoient à `cube_specs.md` (estimations 2026).*

---

## 0. Vue d'ensemble

```
2026-11        2027-01            2027-04                 2027-07         2027-10        2028-01        2028-04
 S1 ─── S2 │ S3 ────────── S10 │ S11 ─────────────── S34 │ S24 ──── S32 │ S36 ───────────────────── S60
 ÉTAPE 0   │ ÉTAPE 1           │ ÉTAPE 2                 │ ÉTAPE 3      │ ÉTAPE 4
 Cadrage   │ Proto WebXR       │ Casque complet          │ Test cube    │ Cube complet
 2 sem.    │ 8 sem.            │ 24 sem.                 │ 3 faces      │ 24 sem. (dont 10 d'appro)
           │ ▲ J1 cubemap      │ ▲ J4 alpha  ▲ J5 bêta   │ 9 sem.       │ ▲ J8 structure  ▲ J9 1ʳᵉ image
           │ ▲ J2 schéma       │             ▲ J6 sortie │ ▲ J7 GO/NO-GO│ ▲ J10 soft-launch ▲ J11 ouverture
           │ ▲ J3 tranche vert.│               EphemerXR │   LED/proj.  │
```

Les étapes 2 et 3 se chevauchent volontairement : le test 3 faces se fait **pendant** la production du contenu, pour que ses conclusions (résolution utile, contraste, ombres, densité du texte par face) corrigent les assets avant la bêta, pas après.

**Règle de passage :** aucune étape ne commence sans que les critères de validation de la précédente soient cochés et consignés dans `decisions_vN.md`. Un critère non atteint = une décision explicite (on corrige, on dégrade, on abandonne), jamais un glissement silencieux.

---

## ÉTAPE 0 — Cadrage technique (S1–S2)

**Objectif :** figer les décisions listées dans `architecture_360.md` §9, monter le dépôt, installer la chaîne d'outils.

| Livrable | Détail |
|---|---|
| `decisions_v2.md` | Moteur, locomotion, mono/off-axis, warp moteur, tablette, comptes, voix : 7 oui/non signés. |
| Dépôt + CI | Vite/TS/Three.js, lint, `vitest` sur `core/`, build de preview automatique sur chaque PR (Cloudflare Pages), test de charge Quest automatisé (scène de référence, 600 frames, seuil 72 Hz). |
| Pipeline assets | `gltf-transform` (Draco/meshopt), `toktx` (KTX2), conventions de nommage par face (`floor_`, `ceil_`, `n_`, `e_`, `s_`, `w_`). |
| Maquette « schéma » en 2D | Prototype papier puis HTML du graphe de nœuds : la mécanique centrale doit être amusante **sur un écran plat** avant d'être en 360. Si elle ne l'est pas, le 360 ne la sauvera pas. |
| Matériel | 2 × Quest 3 (dev + test), 1 PC dev RTX 4080/5080, 1 tablette. ≈ 4–5 k€. |

**Validation :** décisions signées ; CI verte ; la maquette 2D du schéma fait dire « encore » à 3 personnes du studio.

**Risques :** aucun technique ; le risque est de sauter cette étape.

---

## ÉTAPE 1 — Prototype WebXR navigateur (S3–S10, 8 semaines)

**Objectif :** une **tranche verticale** jouable en casque dans le navigateur, qui prouve les trois choses non prouvées : (1) le rendu cubemap commun, (2) la mécanique du schéma en 360, (3) la tenue de performance sur Quest 3 via WebXR.

### Contenu de la tranche
- **Ouverture de l'Acte 3 — l'illumination** : le joueur connecte TRACE, le schéma s'allume autour de lui, 6 faces, 6 zones (sol = enfance, plafond noir = Noyau). 5 min.
- **Un flashback Acte 1 — le premier ordinateur** : tutoriel « assembler » avec les mains (hand tracking), le père en voix off. 5 min.
- **Un fragment d'Acte 2** avec un choix « obéir / garder une trace » (mécanique 3) pour tester si le joueur *perçoit* l'enjeu sans qu'on le lui dise. 3 min.
- Sauvegarde locale + compte (stub), mode `flat` souris/gyro, mode `debug=cubemap`.

### Jalons

| Jalon | Semaine | Preuve |
|---|---|---|
| **J1 — « Cubemap walk »** | S4 | Une même scène vue dans le casque et affichée en croix cubemap 6 faces sur un écran, pilotée par la même URL avec `?display=`. Le `layout.json` fonctionne sur 2 écrans du PC dev. |
| **J2 — Schéma jouable** | S7 | On saisit un composant, on le relie, un lien faux coûte du temps, un lien juste révèle une zone. En manette et en mains. |
| **J3 — Tranche verticale** | S10 | 13 min jouables, testées par 10 personnes extérieures (5 habituées VR, 5 non), avec questionnaire SSQ (cinétose) et grille de compréhension. Iframe + plein écran testés sur ephemerxr.com (staging). |

### Critères de validation (GO étape 2)
- Quest 3, Meta Quest Browser : **≥ 72 Hz stables** sur 95 % des frames de la tranche (mesuré, pas ressenti) ; ≤ 100 draw calls ; mémoire GPU < 1,5 Go.
- Chargement jusqu'à « Entrer en VR » **< 15 s** en 4G simulée (Lighthouse CI) ; premier bundle < 12 Mo.
- **SSQ : zéro abandon pour malaise** sur 10 testeurs ; score moyen « nausée » ≤ 5.
- 8 testeurs sur 10 comprennent sans explication qu'un lien juste révèle une partie de l'organisation ; **au moins 5 sur 10 choisissent spontanément « garder une trace »** au moins une fois (sinon la mécanique 3 est illisible : à retravailler avant d'écrire 20 scènes dessus).
- Le bouton « Entrer en VR » fonctionne dans l'iframe Webflow **ou** la décision « plein écran uniquement » est prise.
- Le mode `debug=cubemap` montre des coutures propres aux arêtes (pas de décalage de pixel, pas de différence d'exposition entre faces).

### Risques de l'étape

| Risque | Prob. | Impact | Parade |
|---|---|---|---|
| Le schéma est plus lisible en 2D qu'en 360 (trop d'information à 360°) | Moyenne | Fort : c'est le cœur du jeu | Le schéma est **sur la tablette/la main**, l'archive est autour : le 360 montre, la main manipule. Tester les deux dès J2. |
| Hand tracking WebXR instable sur Quest Browser | Moyenne | Moyen | Manettes toujours disponibles ; l'assemblage de l'Acte 1 doit marcher aux deux. |
| Perf < 72 Hz à cause du texte (interfaces d'époque, MSN, forums) | Forte | Moyen | Texte SDF (troika) + atlas pré-rendus pour les écrans d'époque ; jamais de canvas regénéré. Budget texte fixé à J1. |
| Iframe cross-origin WebXR cassé par une mise à jour du Quest Browser | Moyenne | Faible | Plein écran = chemin principal dès le départ. |

**Budget étape 1 :** 8 semaines × équipe cœur (≈ 4 ETP) + matériel 5 k€.

---

## ÉTAPE 2 — Version casque VR complète (S11–S34, 24 semaines)

**Objectif :** le jeu entier, Actes 1-2-3, sur EphemerXR, en casque et en mode flat (démo), avec comptes, sauvegarde, télémétrie.

### Organisation
- **Production par face.** Chaque face est un lot : sol (enfance), 4 murs (4 époques/pseudos : MSN-Skyblog, mIRC-forums, Toile Libre, cellule-doute), plafond (Noyau). Un lot = assets + scènes ink + audio + tests. Ça fait 6 lots de ~3 semaines, pipelinés sur 2 artistes.
- **Écriture en parallèle** : l'auteur·e livre les scènes ink de l'Acte 2 (10 événements d'emprise) avant S16 ; le Guide SENTINEL et TRACE sont enregistrés (voix) à S20.
- **Une build jouable chaque vendredi**, testée en casque par quelqu'un qui n'a pas travaillé dessus dans la semaine.

### Jalons

| Jalon | Semaine | Contenu |
|---|---|---|
| **J4 — Alpha** | S20 | Tout le jeu traversable de bout en bout avec des assets provisoires ; toutes les mécaniques (couches de pseudos, manipulation, traces, compte à rebours, démonter, dialogue IA) ; sauvegarde/compte réels ; 2 fins sur N. |
| **J5 — Bêta** | S28 | Assets finaux, audio final, toutes les fins, localisation FR (+ AR/EN en option), accessibilité (regard+dwell, sous-titres, mode sans flash). Test externe 30 joueurs, 2 sessions chacun (rejouer l'Acte 2 avec le schéma visible). |
| **J6 — Sortie EphemerXR** | S34 | Page Webflow, sous-domaine play, CDN, monitoring d'erreurs (Sentry), télémétrie opt-in, CGU/RGPD, communication. |

### Critères de validation
- Durée de jeu complète 90–150 min en 3–5 sessions ; **aucune session > 40 min** sans proposition de pause.
- Perf : 72 Hz sur **toutes** les scènes (le test de charge CI couvre maintenant chaque chapitre).
- Taux de complétion de l'Acte 3 ≥ 60 % des testeurs bêta ; au moins 3 fins différentes atteintes spontanément.
- **La mécanique 3 fonctionne** : les testeurs « IA faible » et « IA forte » décrivent des expériences différentes de l'Acte 3 ; corrélation visible dans la télémétrie.
- Sauvegarde : migration de version testée ; reprise sur un autre casque via le compte ; export JSON pour le cube prêt (format figé à S30).
- Zéro séquence refusée par le test épilepsie automatique.

### Risques

| Risque | Prob. | Impact | Parade |
|---|---|---|---|
| Dérive du contenu (6 faces × 3 actes = trop) | Forte | Fort | Lots fermés par face ; une face « réduite » (le plafond, par nature vide jusqu'à la fin) ; coupe à l'alpha, pas à la bêta. |
| Performance qui se dégrade au fil des ajouts | Forte | Moyen | CI de charge bloquante ; profil `xr` = contrat, pas une cible. |
| Voix de TRACE : l'IA « avec les mots du père » tombe dans le gadget | Moyenne | Fort (émotion = fin du jeu) | Écriture et enregistrement de TRACE comme un personnage, pas une interface ; test d'écoute aveugle à J4. |
| Meta change les règles du Quest Browser (permissions, audio autoplay) | Faible | Moyen | Version du navigateur suivie, test hebdo sur casque à jour. |
| Hébergement : pics de trafic au lancement | Faible | Faible | Statique sur CDN ; seule l'API comptes peut saturer → Supabase dimensionné, file de sauvegarde côté client. |

---

## ÉTAPE 3 — Test cube à 3 faces (S24–S32, 9 semaines, en parallèle de l'étape 2)

**Objectif :** dérisquer physiquement la Phase 2 **avant d'acheter quoi que ce soit** : un **coin** (2 murs + sol, 3 × 3 m) monté dans l'atelier du studio à Tunis, avec le build réel en mode `display=cube3`. On y teste le pipeline multi-sorties, le warp/blend moteur, les ombres, l'inter-réflexion, le tracking, la tablette, la voix, l'audio multicanal, et surtout **la sensation d'être dedans sans casque**.

### Montage (S24–S26)
- 2 murs MDF peints gris projection + 1 sol vinyle, structure bois/alu auto-porteuse, rideaux noirs.
- **Projection** : 4 UST portrait (2 par mur, Epson EB-810E ou PT-CMZ50) en arête haute + 2 courte focale en coins hauts pour le sol (demi-configuration 3-P). 6 projecteurs : **achat 18–28 k€** (réutilisables sur la 3-P finale) ou **location 2 mois 4–7 k€**.
- **LED** : si un loueur/partenaire local le permet, **1 mur de 9 m² en P2.6 loué 1–2 semaines** (3–6 k€) pour comparer côte à côte contraste, chaleur, bruit, coût. Ce n'est pas obligatoire mais ça tranche le débat LED/projection sur des faits.
- PC : RTX 5090 (GeForce Surround 3 sorties) suffit pour le banc ; 2 × Datapath Fx4 (ou hubs MST) → 6 projecteurs. **8–10 k€**, réutilisé en PC de spare du cube final.
- Capteurs : 1 LiDAR Hokuyo, 1 Femto Bolt, ESP32 porte/tapis, micro + Vosk, tablette : **5–7 k€**.
- Audio : 4 enceintes + 1 sub + 1 transducteur, interface 8 sorties : **3–5 k€**.

### Jalons

| Jalon | Semaine | Preuve |
|---|---|---|
| **J7a — Première image synchrone** | S27 | 3 faces alignées, warp/blend moteur calibré, Chromium kiosque, 60 Hz, aucune déchirure aux arêtes sur 24 h de soak test (watchdog TD actif). |
| **J7b — Un joueur dedans** | S30 | La tranche verticale jouable au coin avec tablette + LiDAR + voix, 10 testeurs, dont 5 qui ont joué en casque. |
| **J7 — GO/NO-GO Phase 2** | S32 | Rapport de mesures + recommandation gabarit/technologie chiffrée (choix entre 3-P, 4-P, 4-L, 6-P). |

### Ce qui doit être mesuré et validé (c'est le cœur de l'étape)

| Mesure | Méthode | Seuil |
|---|---|---|
| Stabilité Chromium multi-sorties | Soak 3 × 24 h, compteur de frames perdues, mémoire | ≤ 0,1 % frames perdues ; pas de perte de contexte WebGL ; mémoire stable (< +5 %/24 h) |
| Synchronisation des faces | Caméra 240 fps sur une arête, motif de test alterné | Décalage ≤ 1 frame à 60 Hz |
| Latence tablette → image | Horodatage WebSocket + caméra | ≤ 80 ms (perçu comme instantané) |
| Latence LiDAR → image | Idem | ≤ 120 ms |
| Luminance et contraste réels | Spectroradiomètre ou luxmètre/luminancemètre sur 9 points par face, contenu noir/blanc/jeu | Murs 80–150 nits ; **contraste en situation de jeu ≥ 40:1** (c'est bas, et c'est la réalité du cube projeté : si on tombe à 15:1, le gris de « l'archive » sera laiteux → LED ou surfaces plus sombres) |
| Ombres | Testeur collé au mur, marchant sur le sol | Ombre murale seulement au contact ; ombre au sol non remarquée par ≥ 8 testeurs sur 10 |
| Chaleur et bruit | Sondes TD, sonomètre | ≤ +3 °C en 20 min sans clim (sinon chiffrer la clim en conséquence) ; ≤ 38 dB(A) au centre |
| Lisibilité du texte par face | Grille de tailles de police sur chaque face, lecture à 1,5 m | Taille minimale par face consignée → **contraint les assets de la bêta** |
| Voix hors ligne | 50 phrases, 5 locuteurs, FR avec accent tunisien | ≥ 90 % de mots-clés reconnus |
| **« Être dedans »** | Questionnaire de présence (IPQ) comparé casque / coin | Score de présence spatiale du coin ≥ 80 % de celui du casque. Si c'est nettement moins, le cube doit compenser par l'échelle (4 m+) ou par le tactile (carte mère, sol). |

### Critères GO
- Tous les seuils ci-dessus, ou dérogation écrite avec parade.
- Choix **LED vs projection** et **gabarit** tranché avec chiffres de `cube_specs.md` ajustés aux mesures.
- Devis fournisseurs reçus (dalles ou projecteurs, structure, CVC) ; délais d'appro connus (LED : 8–12 sem. ; projecteurs : 4–8 sem.).
- Lieu identifié (dimensions, hauteur, puissance disponible, accès camion, ERP).

### Risques

| Risque | Prob. | Impact | Parade |
|---|---|---|---|
| **Chromium n'est pas stable en kiosque multi-sorties 24/7** (fuite, perte de contexte, mise à jour) | Moyenne | **Très fort** (remet en cause « un seul build ») | Version épinglée, flags, watchdog, redémarrage quotidien. **Plan B écrit :** export de la scène vers TouchDesigner pour le rendu cube (≈ 2 mois), le casque garde Three.js. Décision à J7a, pas plus tard. |
| Contraste insuffisant en projection | Moyenne | Fort | Surfaces plus sombres, laser plus bas, contenu re-gradé par face ; sinon LED au 4 m. |
| Warp/blend moteur insuffisant (coutures visibles) | Moyenne | Moyen | NVIDIA Warp & Blend + Vioso (8–20 k€), testé sur le même banc. |
| Le coin ne « fait pas dedans » | Faible-moyenne | Fort | C'est précisément pour ça qu'on le teste avant d'acheter. Réponse : échelle ou tactile. |
| Tracking perturbé (reflets IR sur sol vinyle brillant, LiDAR voit la tablette) | Moyenne | Faible | Vinyle mat, LiDAR à 20 cm, masque de zones dans TD. |

**Budget étape 3 :** 35–55 k€ matériel (dont 25–35 k€ réutilisés dans le cube final) + 9 semaines × 2 ETP (lead dev + dev TD) + 1 technicien 3 semaines.

---

## ÉTAPE 4 — Cube complet (S36–S60, 24 semaines)

**Objectif :** la chambre-cube ouverte au public, avec le jeu complet (version casque adaptée : passage QR, mode galerie 20–30 min, mode « visite » 6 m).

Planning type pour un **4 m projection** (le scénario le plus probable) ; LED allonge l'appro de 4 semaines et le montage de 2 jours ; 6 m ajoute 4–6 semaines au total.

| Phase | Semaines | Contenu |
|---|---|---|
| **Conception** | S36–S40 | Plans d'exécution (structure, pods, écrans, CVC, élec, sécurité), note de calcul BE, dossier ERP / Protection civile, commandes passées (projecteurs, écrans, PC pro, audio, capteurs). Adaptation du contenu : mode `cube`, profil qualité haut, interface tablette, scènes rythmées pour 25 min, mode visite. |
| **Approvisionnement** | S38–S48 | Projecteurs 4–8 sem., toile/cadres 4–6 sem., LED 8–12 sem., douane Tunisie +2–4 sem. Pendant ce temps : pré-montage de l'ossature à l'atelier, intégration audio et capteurs sur le banc 3 faces, écriture de la régie TD (planning, sessions, watchdog, STOP, DMX). |
| **J8 — Structure recettée** | S48 | Ossature montée sur site, note de calcul vérifiée, élec et CVC raccordés et mesurés (débit d'air, température en charge simulée avec radiateurs), porte et sécurité testées (coupure courant → porte ouverte, BAES). |
| **Montage et calibration** | S49–S52 | Projecteurs/dalles, écrans, calibration caméra (Vioso) ou moteur, colorimétrie face par face (luminancemètre : écart ≤ 10 % entre faces), audio (délais, égalisation), tracking (cartographie des zones). |
| **J9 — Première image complète** | S52 | 6 faces, jeu complet en boucle 48 h, mesures de l'étape 3 refaites à l'échelle. |
| **Soft-launch** | S53–S56 | 100 sessions avec public invité (dont 30 joueurs ayant fini en casque, pour le passage QR), opérateurs formés, procédures d'incident répétées (malaise, coupure, porte), ajustements contenu (rythme, luminance, voix). |
| **J10 — Soft-launch validé** | S56 | Voir critères. |
| **J11 — Ouverture** | S57–S60 | Ouverture publique, monitoring 4 semaines, revue d'exploitation. |

### Critères de validation
- **Sécurité** : procès-verbal de la commission de sécurité ou équivalent local ; test coupure générale → porte ouverte + BAES en < 1 s ; CO₂ < 1 200 ppm en fin de session à pleine jauge ; température ≤ 26 °C après 8 sessions consécutives.
- **Technique** : 0 interruption non planifiée sur les 100 sessions du soft-launch ; redémarrage complet (PC + projecteurs + régie) < 4 min ; recalibration < 2 h.
- **Expérience** : score de présence ≥ celui du banc 3 faces ; **≥ 85 % des sessions terminées** ; ≥ 70 % des joueurs « casque » reconnaissent *leur* archive (passage QR) ; aucun malaise sur 100 sessions.
- **Exploitation** : 2 opérateurs formés et autonomes ; manuel d'exploitation et d'incident ; stock de rechange (1 projecteur ou 3 % de dalles, 1 Fx4, 1 LiDAR, câbles) ; contrat de maintenance.

### Risques

| Risque | Prob. | Impact | Parade |
|---|---|---|---|
| Délais d'approvisionnement et douane | Forte | Moyen (calendrier) | Commander à S38 au plus tard ; incoterm et transitaire choisis à l'étape 3 ; 4 semaines de marge dans le planning. |
| Lieu non conforme (hauteur, puissance, accès) | Moyenne | Fort | Fiche de lieu validée à J7 avec visite technique ; puissance et hauteur sont éliminatoires. |
| Chaleur sous-estimée (surtout LED) | Moyenne | Fort | Test en charge simulée à J8, avant l'arrivée du matériel d'image. |
| Dérive colorimétrique entre faces (projecteurs de lots différents, optiques) | Forte | Moyen | Même lot, même modèle, calibration caméra, profil par projecteur dans le moteur. |
| Le contenu casque, transposé, est trop long ou trop fin pour le cube | Forte | Moyen | Mode galerie écrit *pour* le cube dès S36 (chapitre vitrine 20 min), textes agrandis selon les mesures de l'étape 3. |
| Exploitation : personne pour relancer le système un dimanche | Moyenne | Moyen | Régie TD autonome (watchdog, planning, télémétrie à distance), astreinte studio, procédure papier. |

**Budget étape 4 :** matériel selon gabarit (`cube_specs.md`) + 24 semaines × équipe (2 ETP dev + 1 DA + 1 DT + intégrateur/techniciens au montage) + soft-launch.

---

## Récapitulatif des jalons

| Jalon | Semaine | Date indicative | Décision attendue |
|---|---|---|---|
| J1 Cubemap walk | S4 | déc. 2026 | Le pipeline commun existe. |
| J2 Schéma jouable | S7 | janv. 2027 | La mécanique tient en 360. |
| J3 Tranche verticale | S10 | janv. 2027 | **GO production casque.** |
| J4 Alpha | S20 | avr. 2027 | Coupe de contenu. |
| J7a Première image 3 faces | S27 | mai 2027 | **Chromium multi-sorties : GO ou plan B TD.** |
| J5 Bêta | S28 | juin 2027 | Figer la sauvegarde. |
| J7 GO/NO-GO Phase 2 | S32 | juil. 2027 | **LED ou projection, gabarit, lieu, budget.** |
| J6 Sortie EphemerXR | S34 | juil. 2027 | Lancement Phase 1. |
| J8 Structure recettée | S48 | oct. 2027 | Sécurité et thermique. |
| J9 Première image 6 faces | S52 | nov. 2027 | Qualité à l'échelle. |
| J10 Soft-launch validé | S56 | déc. 2027 | Exploitation. |
| J11 Ouverture | S57–S60 | janv. 2028 | Phase 2 lancée. |

---

## Les trois risques qui dominent tout le reste

1. **Chromium comme moteur de rendu multi-sorties en exploitation continue** (J7a). C'est le pari de l'architecture « un seul build ». Il se gagne ou se perd en S27 sur le banc 3 faces, avec un plan B chiffré (rendu cube en TouchDesigner, ≈ 2 mois).
2. **Le budget GPU du Quest 3 via navigateur** (J1 → J6). Pas une question de talent mais de discipline : CI de charge bloquante dès la semaine 3, profil `xr` comme contrat.
3. **Le contraste du cube projeté** (J7). Physique, pas logicielle. Se mesure au luminancemètre, se corrige par les surfaces, la luminance et le contenu ; à défaut, se paie en LED au gabarit 4 m.

Tout le reste (voix, tracking, Webflow, sauvegarde) a une solution de repli bon marché.
