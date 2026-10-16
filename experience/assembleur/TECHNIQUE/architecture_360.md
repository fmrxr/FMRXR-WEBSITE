# ARCHITECTURE 360 — *L'ASSEMBLEUR*
### Un seul moteur, deux salles : le casque (WebXR) et la chambre-cube (CAVE)
*FMRXR Studio — direction technique — v1, 16/10/2026*
*Documents amont : `bible_v1.md`, `decisions_v1.md`. Tous les prix cités sont des estimations 2026, hors taxes, à confirmer sur devis.*

---

## 0. Résumé exécutif

- **Moteur de contenu : Three.js + WebXR (TypeScript, Vite), un seul dépôt, un seul build.** C'est le seul moteur qui tourne nativement dans le navigateur du Quest 3, qui s'embarque dans Webflow, et que l'équipe web du studio peut maintenir sans recruter.
- **Le cube n'est pas un second moteur : c'est un second « mode d'affichage » du même build.** Le build est lancé dans un Chromium en kiosque sur le PC du cube, avec un paramètre `?display=cube`. Il rend alors 6 caméras à 90° (une cubemap) au lieu de 2 yeux, et pose les 6 faces sur les sorties vidéo.
- **TouchDesigner garde le rôle qu'il tient déjà au studio : régie, capteurs, lumière, audio multicanal, calibration.** Il parle au moteur par WebSocket/OSC. Il ne rend pas le jeu.
- **Interactions** : manettes + mains sur Quest 3 ; dans le cube : tablette (le « terminal » d'Ilyes), tracking LiDAR + caméra de profondeur, capteurs physiques (porte, sol, objets), voix.
- **Sauvegarde** : état narratif sérialisé (JSON versionné), local puis compte EphemerXR ; passage casque → cube par QR code.
- **Risque n°1** : faire tenir le même contenu dans le budget GPU du Quest 3 (mobile) *et* sur 6 faces 4K pilotées par un Chromium multi-sorties. Dérisqué dès le test « cube 3 faces » (cf. `roadmap.md`).

---

## 1. Choix du moteur

### 1.1 Contraintes qui tranchent

| Contrainte | Source | Conséquence |
|---|---|---|
| Phase 1 = casque **via navigateur**, embarqué dans un site Webflow | decisions_v1 | Le moteur doit produire du WebGL/WebGPU + WebXR, pas un APK. |
| Phase 2 = cube 6 faces, « même contenu, rendu en cubemap » | decisions_v1 | Il faut un rendu 6 caméras à 90° sur sorties multiples, piloté par un PC. |
| Petit studio, compétences : TouchDesigner + web | contexte | Pas de C++/C#/Blueprint à maintenir ; pas de licence par siège coûteuse. |
| Jeu narratif, interface « schéma » de nœuds, pas de physique lourde, pas de foule | bible §6 | Pas besoin de Nanite/Lumen ni d'un moteur AAA. |
| Faces = facettes du héros ; sol = enfance ; plafond = Noyau | decisions_v1 | Le design de niveau est pensé *par face* : le moteur doit exposer les 6 directions comme des zones logiques, pas seulement comme une cubemap. |

### 1.2 Comparatif

| Critère | **Three.js / WebXR** | Unity | Unreal Engine 5 | TouchDesigner |
|---|---|---|---|---|
| WebXR dans le navigateur Quest | **Natif, stable (WebXRManager)** | Export WebGL + plugin communautaire (`unity-webxr-export`) ; fragile, pas de support officiel Meta | **Aucun export web** (HTML5 abandonné depuis 4.24) | Impossible (pas de runtime web) |
| Embarquable dans Webflow | **Oui (iframe ou sous-domaine)** | Oui mais build 30–80 Mo, chargement lent | Non | Non |
| Rendu cubemap 6 sorties sur PC | Oui : 6 caméras + viewports dans une fenêtre Chromium plein écran (Mosaic) | Oui (excellent, multi-display natif) | Oui (nDisplay = l'outil de référence des CAVE) | Oui (natif, c'est son métier) |
| Même build casque + cube | **Oui, un seul artefact** | Deux builds (WebGL + Windows) à synchroniser | Deux projets (pas de web) | Un build cube seulement |
| Compétences du studio | **Web : oui** | À acquérir (C#) | À acquérir (C++/BP), équipe plus lourde | **Oui** |
| Interface « schéma » (nœuds, texte, UI riche) | **Excellent** (DOM/CSS pour le 2D, three-mesh-ui / troika-text en 3D) | Bon (UI Toolkit) | Moyen (UMG en VR est pénible) | Faible pour du texte/UI narratif |
| Scripting narratif (ink, Yarn) | inkjs, yarn-bound : natifs JS | inkle Unity, Yarn Spinner | Plugins ink non officiels | À bricoler en Python |
| Audio spatial | Web Audio HRTF (PannerNode), Resonance | FMOD/Wwise (meilleur) | MetaSounds (excellent) | CHOPs + Dante : excellent en multicanal |
| Perf sur Quest 3 | Bonne si discipline (≤ 100 draw calls, ≤ 500 k tris) | Meilleure en natif, mais en WebGL export : pire que Three.js | n/a | n/a |
| Licence / coût | **0 €** | Gratuit < 200 k$ CA, sinon Pro ~2 200 $/siège/an | 5 % de royalties > 1 M$ | Commercial 600 $/an/siège (le studio l'a déjà) |
| Risque long terme | Faible (lib la plus utilisée du WebGL, r170+) | Export WebXR dépend d'un bénévole | Hors sujet | Pas de web |

### 1.3 Recommandation

**Three.js + WebXR comme unique moteur de contenu, TouchDesigner comme couche de régie et de capteurs.**

Justification en trois points :
1. **C'est la seule option qui respecte la Phase 1 telle que décidée** (casque via navigateur, dans Webflow) sans plugin tiers. Unity-WebXR est une dette technique ; Unreal est hors course.
2. **Le cube ne demande rien que Three.js ne sache faire** : 6 caméras perspectives à 90°, un canvas très large (jusqu'à 16 384 px, limite WebGL `MAX_TEXTURE_SIZE`), un Chromium plein écran sur un bureau Mosaic. Les CAVE universitaires font tourner des navigateurs sur leurs murs depuis 2016 (projets CalVR/WebVR, « CAVE in browser » de l'UIC) : ce n'est pas exotique.
3. **Le studio garde ses forces** : le web pour le jeu, TouchDesigner pour tout ce qui touche au physique (warping de secours, LiDAR, DMX, Dante, porte, ventilation). Pas de recrutement C#/C++.

**Ce qu'on perd et comment on le compense :**
- *Performance brute* par rapport à Unity natif → discipline d'optimisation (section 7), gros GPU côté cube (le contenu optimisé pour Quest tourne en « qualité haute » sur un RTX 6000 sans effort).
- *Multi-display géré par le moteur* (nDisplay) → NVIDIA Mosaic fait le travail au niveau du driver ; une seule fenêtre, pas de synchronisation logicielle à écrire.
- *Audio moteur pro (Wwise)* → Web Audio suffit pour le casque ; dans le cube, l'audio multicanal passe par TouchDesigner/Dante (section 5).

**Plan B documenté (à ne déclencher que si le test 3 faces échoue, cf. roadmap) :** garder Three.js pour le casque et exporter la scène (glTF + script ink) vers un rendu cube en TouchDesigner. Coût : ~2 mois de réécriture de la logique de jeu en Python TD. On ne veut pas y aller, mais le chemin existe.

---

## 2. Architecture logicielle

### 2.1 Vue d'ensemble

```
┌─────────────────────────── BUILD UNIQUE (Vite, TypeScript) ───────────────────────────┐
│                                                                                       │
│  core/        Machine à états narrative (ink via inkjs), inventaire de composants,    │
│               schéma (graphe), compte à rebours, « traces gardées », sauvegarde.      │
│               → Zéro dépendance au rendu. Testable en Node.                           │
│                                                                                       │
│  world/       Scène Three.js : 6 « zones » (±X ±Y ±Z) = 6 facettes. Assets glTF,     │
│               shaders, animations, l'IA TRACE (voix + présence visuelle).             │
│                                                                                       │
│  display/     Un adaptateur par mode d'affichage :                                    │
│               • xr        → WebXRManager, stéréo, 72/90 Hz, foveation                 │
│               • cube      → 6 caméras 90°, viewports mappés aux sorties, warp/blend   │
│               • flat      → 1 caméra, souris/gyroscope (preview web, mobile, démo)    │
│               • cube3     → variante 3 faces pour le banc de test                     │
│                                                                                       │
│  input/       Un adaptateur par source :                                              │
│               • xr-controllers, xr-hands, gaze                                        │
│               • tablet (WebSocket)  • tracking (OSC depuis TD)                        │
│               • sensors (OSC depuis TD)  • voice (Web Speech / Vosk)                  │
│                                                                                       │
│  audio/       • hrtf (Web Audio PannerNode, casque)                                   │
│               • multichannel (8 canaux via ChannelMerger, cube)                       │
│               • osc-events (délègue à TD/Reaper, cube pro)                            │
│                                                                                       │
│  net/         WebSocket client, OSC (via bridge), sauvegarde (API EphemerXR), QR      │
└───────────────────────────────────────────────────────────────────────────────────────┘
                  ▲ casque Quest 3                       ▲ PC cube (Chromium kiosque)
                  │ https://play.ephemerxr.com           │ http://localhost:5173/?display=cube
                  │                                      │
          Webflow (iframe / lien)             TouchDesigner (régie) ◄─ LiDAR, ToF, porte,
                                               │  WebSocket + OSC       tablette, DMX, Dante
                                               └─► audio 8.1, lumière, ventilation, sécurité
```

### 2.2 Principes

- **`core/` ne connaît ni Three.js ni le DOM.** C'est la garantie qu'on peut tester tout le jeu (y compris la mécanique des traces gardées et le compte à rebours) en ligne de commande, et qu'un plan B de rendu reste possible.
- **Le mode d'affichage est un paramètre d'URL, pas un build.** `?display=xr|cube|flat|cube3&layout=…&calib=…`. Le même déploiement sert partout.
- **Les 6 faces sont des zones logiques avant d'être des surfaces.** Le level design place le contenu dans un repère « face » (sol/plafond/nord/est/sud/ouest). En casque le joueur tourne la tête ; dans le cube il tourne le corps. Les deux voient la même scène au même endroit.
- **Scripting narratif en ink** (`inkjs`) : branches, variables (`traces_gardees`, `avance_restante`, `pseudo_actif`), rejouabilité des scènes de l'Acte 2 avec schéma visible. Les auteurs écrivent en ink, pas en TypeScript.
- **Pas de framework React/R3F** : moins de couches, meilleur contrôle du frame budget sur Quest. Du DOM pour les écrans 2D (menus, terminal d'époque) via `CSS3DRenderer` ou des textures `html2canvas` pré-calculées.

### 2.3 Bibliothèques (versions épinglées au démarrage du projet)

| Besoin | Lib | Remarque |
|---|---|---|
| Rendu | `three` (≥ r170), `three/addons` | WebGL2 ; WebGPU en veille (pas prêt sur Quest Browser en 2026). |
| Build | `vite`, `typescript` | Code splitting par chapitre. |
| Narratif | `inkjs` | Export `.ink.json` depuis Inky. |
| Compression assets | `gltf-transform` (Draco/meshopt), `toktx` (KTX2/Basis UASTC) | Pipeline CLI, pas à la main. |
| Texte 3D | `troika-three-text` | SDF, net en VR, supporte l'arabe/latin. |
| UI 3D | `three-mesh-ui` ou maison | Le « schéma » est un composant maison (graphe force-directed en instancing). |
| Audio | Web Audio natif ; `resonance-audio` optionnel | Voir §5. |
| Réseau | `ws` (Node) côté PC cube, `osc-js` pour le pont OSC | TD parle OSC natif et WebSocket natif. |
| Sauvegarde | `idb-keyval` (local), API HTTPS (Supabase, région UE) | Voir §6. |
| Tests | `vitest` pour `core/`, Playwright pour le flat | Rendu testé en captures de référence par face. |

---

## 3. Pipeline de rendu cubemap (commun aux deux phases)

### 3.1 Le même frame, deux façons de le découper

**Casque (`display=xr`)** : WebXR fournit deux vues (œil gauche/droit) avec leurs matrices de projection. Three.js gère tout ; on ne touche à rien. Cible : 72 Hz (ou 90 Hz si le budget le permet), `renderer.xr.setFoveation(1)`, `framebufferScaleFactor` 1,0–1,2.

**Cube (`display=cube`)** : on remplace la caméra XR par un **rig de 6 `PerspectiveCamera` (fov 90°, aspect 1)** orientées +X −X +Y −Y +Z −Z, positionnées au point de vue (centre du cube par défaut, ou tête trackée, cf. §3.4). Chaque caméra rend dans un **viewport** d'une unique fenêtre Chromium plein écran. La disposition des viewports sur la fenêtre est décrite par un fichier `layout.json` :

```json
{
  "outputs": [
    { "id": "DP1", "size": [3840, 2160], "faces": [ { "face": "north", "rect": [0,0,1920,1920] }, { "face": "east",  "rect": [1920,0,1920,1920] } ] },
    { "id": "DP2", "size": [3840, 2160], "faces": [ { "face": "south", "rect": [0,0,1920,1920] }, { "face": "west",  "rect": [1920,0,1920,1920] } ] },
    { "id": "DP3", "size": [3840, 2160], "faces": [ { "face": "floor", "rect": [0,0,1920,1920] }, { "face": "ceiling","rect": [1920,0,1920,1920] } ] }
  ]
}
```

Ici, 3 sorties 4K = une fenêtre de 11 520 × 2 160 px (NVIDIA Mosaic en 3×1). Chaque face reçoit un carré de 1 920 px. Pour un gabarit 6 m en LED P2.6 (2 304 px/face) on passe à 4 sorties ou à un découpage 1 face par sortie. Le canvas WebGL reste sous 16 384 px de large : contrainte respectée jusqu'à 4 sorties 4K côte à côte (15 360 px).

**Pourquoi pas `THREE.CubeCamera` ?** Elle rend dans une `WebGLCubeRenderTarget` (une texture), ce qui impose une copie supplémentaire vers l'écran. Six caméras + `renderer.setViewport/setScissor` rendent directement dans le framebuffer : c'est plus simple et plus rapide. Le `CubeCamera` sert en revanche au **mode debug** (`display=flat&debug=cubemap`) pour afficher la croix cubemap dans un navigateur quelconque, et aux captures de référence.

### 3.2 Pourquoi une seule fenêtre et non 6

Une fenêtre = un contexte WebGL = un `requestAnimationFrame` = **un seul frame cohérent sur les 6 faces**. Le driver (Mosaic) garantit que les 3–4 sorties partagent la même base de temps (genlock interne). Six fenêtres Chromium sur six écrans donneraient six horloges et des coutures qui « respirent » aux arêtes du cube. C'est le point précis que le test 3 faces doit valider (vsync stable, pas de tearing à la couture).

Matériel qui rend cela possible : **GPU NVIDIA RTX professionnelle (RTX 6000 Ada / RTX PRO Blackwell) avec Mosaic**, 4 sorties DisplayPort 2.1. Un GeForce RTX 5090 fait l'affaire sur le banc de test (Surround limité à 3 sorties, pas de Quadro Sync).

### 3.3 Warping et edge blending : dans le moteur

Pour la **LED**, il n'y a rien à faire : mapping pixel-à-pixel, chaque face est un rectangle de l'écran envoyé au processeur LED.

Pour la **projection**, les faces sont couvertes par 1 à 4 projecteurs chacune, avec recouvrement. Trois endroits possibles pour corriger la géométrie et fondre les bords :

| Où | Avantages | Inconvénients | Verdict |
|---|---|---|---|
| Dans les projecteurs (Epson Professional Tool, Panasonic Geometry Manager Pro) | Zéro code, zéro latence | Grossier (grilles 17×17 max), blend approximatif, réglage par projecteur, pas de fichier central | Pré-réglage grossier uniquement |
| Serveur média intermédiaire (Disguise, Pixera, TD en capture) | Outils pro, calibration caméra (OmniCal) | Il faut capturer la sortie Chromium (cartes DeckLink 4K ×3–4, ou NDI = latence 2–3 frames + 1 PC) ; +40–80 k€ | Réservé au gabarit 6 m si le client l'exige |
| **NVIDIA Warp & Blend API** (correction dans le driver, sur GPU RTX pro, pilotée par Vioso Anyblend / Scalable Display avec calibration caméra) | Indépendant de l'application : Chromium n'en sait rien ; calibration automatique en 1–2 h ; zéro latence | Licence 8–20 k€ + caméra ; GPU pro obligatoire (déjà prévu) | **Recommandé à partir du gabarit 4 m** (16 projecteurs), en complément ou à la place du warp moteur |
| **Dans Three.js, passe finale** : chaque viewport-projecteur est un maillage de warp (grille Bézier 2D) avec un masque de blend gamma-corrigé, calibré par une UI intégrée, sauvé en `calib.json` | Une seule chaîne, zéro latence, fichier versionné, même outil pour 3 ou 6 faces | ~2–3 semaines de dev ; calibration à la main (sans caméra) | **Recommandé** |

La calibration se fait avec TouchDesigner en outil de contrôle (Stoner/Kantan pour vérifier les grilles) mais la correction *s'exécute* dans le moteur. Le format `calib.json` est trivial à ré-exporter vers TD si on devait basculer (plan B).

### 3.4 Perspective : centre fixe d'abord, tête trackée ensuite

- **v1 (centre fixe)** : les 6 caméras sont au centre géométrique du cube. Le rendu est exact pour un spectateur au centre, légèrement faux ailleurs (c'est le cas de 100 % des salles immersives commerciales — Van Gogh, teamLab — et personne ne s'en plaint, parce que le contenu est conçu « enveloppant » et non « fenêtre sur un monde 3D »). Avantage : plusieurs personnes peuvent être dans le cube.
- **v2 (off-axis)** : avec la position de la tête (tracking, §4.2), on calcule pour chaque face une **projection perspective généralisée** (Kooima, 2008 : `projectionMatrix` depuis les 4 coins physiques de la face et le point de vue). Three.js le permet via `camera.projectionMatrix` manuelle. On obtient la vraie parallaxe : le sol-Lego « a de la profondeur », le plafond-Noyau « s'éloigne ». Valable pour **un** joueur. Le jeu est solo : c'est cohérent avec la bible.
- **Stéréo dans le cube : non.** Elle imposerait des projecteurs 3D actifs + lunettes ou des LED 3D, et casserait le principe « on entre sans rien porter ». Décision à acter.

### 3.5 Niveaux de qualité

Même scène, deux profils déclarés dans `quality.json` :

| Paramètre | `xr` (Quest 3) | `cube` (RTX pro) |
|---|---|---|
| Résolution de rendu par vue | ~1 680 × 1 760 par œil (×1,0) | 1 920–2 304 px par face |
| Triangles / frame | ≤ 500 k | ≤ 3 M |
| Draw calls | ≤ 100 | ≤ 500 |
| Ombres | 1 lumière, 1 024 px, statique | 3 lumières, 4 096 px, dynamiques |
| Post-process | Aucun (ou un seul pass tonemap) | Bloom, grain, aberration pour les moments d'emprise |
| Particules (le schéma) | 20 k instances | 500 k instances |
| Textures | KTX2 UASTC, 2 k max | KTX2 ou PNG, 4 k |

Le contenu est **authored pour le profil `xr`**, et le profil `cube` ajoute. Jamais l'inverse.

---

## 4. Interactions

### 4.1 Phase 1 — casque (WebXR Input Sources)

| Source | Usage dans le jeu | Implémentation |
|---|---|---|
| Manettes Touch Plus | Saisir un composant, le poser sur le schéma, tirer un lien | `XRControllerModelFactory`, rayon + préhension ; retour haptique sur « lien correct » |
| Mains (hand tracking) | Même chose, sans manette ; **mode préféré pour l'Acte 1** (monter un PC avec les mains du gamin) | `XRHandModelFactory`, pincement ; fallback manettes si tracking perdu |
| Regard + dwell | Sélection passive, lecture de messages ; accessibilité | Ray depuis la caméra, timer 800 ms |
| Déplacement | **Aucune locomotion artificielle.** Le joueur reste au centre de l'archive, tout vient à lui. Room-scale 2×2 m toléré | Zéro cinétose : décision de design, pas d'option |
| Voix | Dialogue avec TRACE (réponses à choix, mots-clés) | Web Speech API sur Quest Browser (reconnaissance côté Meta/Google, nécessite réseau) ; sinon choix au doigt |

Règle d'or : **tout ce qu'on fait avec les mains doit être faisable au regard** (accessibilité, et démo sur mobile/desktop en mode `flat`).

### 4.2 Phase 2 — cube (sans casque)

Le cube enlève le casque et les manettes. On remplace par quatre canaux, tous via TouchDesigner → OSC/WebSocket → moteur :

**a) La tablette = le terminal d'Ilyes.** Une tablette (iPad ou Android, 11″) fixée sur un pupitre au centre ou tenue en main, qui charge **le même build** en `?display=tablet` : elle affiche le schéma en 2D, les pseudos, l'inventaire, les choix de dialogue. Le cube affiche l'archive autour ; la tablette est l'outil qui la manipule. C'est narrativement juste (le héros a toujours un écran dans les mains) et techniquement robuste (pas de reconnaissance de gestes à fiabiliser). Liaison : WebSocket vers le serveur de show (Node sur le PC cube), latence < 20 ms en Wi-Fi 6 dédié.

**b) Tracking du corps.**
- **Position au sol : LiDAR 2D** (Hokuyo UST-10LX ou SICK TiM781, 1 ou 2 unités à 20 cm du sol, en coin). Fiable dans le noir, insensible à la projection, 25–40 Hz, précision ±2 cm. TD a un opérateur Hokuyo natif → blob tracking → OSC `/player/pos x y`. Sert à : zones du sol (marcher sur une pièce de Lego = la ramasser), proximité d'une face (la face « se réveille » quand on s'approche), déclencheurs.
- **Hauteur de tête et gestes : 1–2 caméras de profondeur ToF** (Orbbec Femto Bolt, successeur de l'Azure Kinect, SDK compatible) en coins hauts. Donne la position de la tête pour la projection off-axis (§3.4) et des gestes simples (bras tendu vers une face = pointer). Les ToF en IR actif ne voient pas la projection ; sur LED, attention aux reflets des dalles (incliner les caméras).
- Non retenu : OptiTrack (10× le prix, nécessite un marqueur porté), suivi RGB (noir dans le cube).

**c) Capteurs physiques.** Tout en TD (Arduino/ESP32 → OSC) :
- Contact de porte : fermée = le jeu commence, ouverte = pause + lumière de service.
- Dalles de sol sensibles (tapis à pression, 4–8 zones) en complément du LiDAR pour les actions « franches ».
- **Un objet physique : la carte mère.** Une réplique de carte mère sur le pupitre avec des emplacements capacitifs (ESP32 + MPR121) : le joueur enfiche physiquement RAM, CPU, carte graphique — c'est le tutoriel de l'Acte 1 rendu tangible. Fort en galerie, cohérent avec la boucle « tu montes, tu reçois ».

**d) Voix.** Micro cardioïde au plafond (ou dans le pupitre). Reconnaissance **hors ligne** (Vosk ou whisper.cpp en français, dans un processus Python lancé par TD) → mots-clés et intentions → OSC `/voice/intent`. Pas de LLM en boucle de jeu : TRACE ne « répond » pas librement, elle montre des liens et pose des questions (bible §6, mécanique 6). Un LLM peut servir *hors ligne* à l'écriture, pas au runtime.

### 4.3 Abstraction commune

Toutes les sources produisent les mêmes **intents** vers `core/` : `select(componentId)`, `link(a, b)`, `choose(optionId)`, `keepTrace()`, `approach(face)`, `say(keyword)`. Le core ne sait pas si l'intent vient d'une manette, d'une tablette ou d'un LiDAR. C'est ce qui rend le « même contenu » vrai.

---

## 5. Audio spatial

| | Casque | Cube |
|---|---|---|
| Moteur | Web Audio API : `PannerNode` HRTF, `AudioListener` lié à la caméra XR | **Option A (recommandée, v1)** : Web Audio sort en 8 canaux discrets (`AudioContext.destination.channelCount = 8`, interface USB multicanal RME/MOTU ou Dante Virtual Soundcard). Panning maison type VBAP sur 8 enceintes aux sommets du cube. **Option B** : le moteur envoie des événements OSC, TD ou Reaper spatialise (CHOPs + Dante). |
| Enceintes | Casque Quest (correct) ou casque filaire conseillé | 8 enceintes aux sommets (coins hauts et bas) + 1–2 subs + **transducteurs tactiles sous le sol** (ButtKicker) pour le modem 56k, les ventilos, les pas |
| Voix de TRACE | Monophonique, « partout », légèrement réverbérée (elle entoure) | Les 8 enceintes à gain égal + léger décorrélé : la voix n'a pas de source |
| Son d'époque (wizz MSN, ventilateurs) | Positionné sur la face concernée | Positionné sur la face concernée, basses dans le sol |
| Réverbération | `ConvolverNode`, 3 IR (chambre d'enfant, cybercafé, archive) | Idem ; attention : le cube physique a sa propre réverb (6 surfaces dures → traitement acoustique derrière la LED/les écrans, cf. `cube_specs.md`) |

Pourquoi Option A en v1 : zéro pont, zéro désynchronisation, un seul fichier de mix. Option B dès qu'on veut un mix de salle pro (compresseur par enceinte, Dante, calage de délais) : le moteur garde les mêmes événements, seul l'adaptateur `audio/` change.

Format des assets : Opus 96 kb/s (voix), Opus 128 kb/s (ambiances), chargés par chapitre. Budget audio total < 60 Mo pour tout le jeu.

---

## 6. Sauvegarde et progression

### 6.1 Ce qu'on sauvegarde

Un seul objet `SaveState` (JSON, `schemaVersion`), sérialisé par `core/` :

```
{
  "schemaVersion": 3,
  "inkState": "...",                     // état complet d'ink (variables, visites, choix)
  "components": { "collected": [...], "linked": [[a,b], ...], "wrongLinks": 4 },
  "traces": ["acte2_s03", "acte2_s07"],  // mécanique 3 : traces gardées (invisible au joueur)
  "advance": 0.62,                        // mécanique 4 : compte à rebours
  "pseudoUnlocked": ["ilyes_94","BlackPixel","kernel_panic","GHOSTWIRE"],
  "facesRevealed": { "floor": 1.0, "ceiling": 0.0, "north": 0.4, ... },
  "playtimeSec": 2710, "updatedAt": "2027-03-02T19:40:11Z", "device": "quest3|cube|flat"
}
```

Taille : < 50 Ko. Migrations de version explicites (`migrate_2_to_3.ts`), testées.

### 6.2 Où

| Couche | Casque | Cube |
|---|---|---|
| Local | IndexedDB (`idb-keyval`), autosave à chaque nœud ink | Disque du PC cube, une session = un fichier |
| Compte | API EphemerXR (Supabase Postgres, région UE, RGPD : e-mail + pseudo seulement, pas de données sensibles) | Même API |
| Lien casque → cube | **QR code** : à l'entrée du cube, le joueur scanne un QR affiché sur la tablette avec son téléphone (connecté à son compte) ; le cube charge sa sauvegarde et **continue** la partie. À la sortie, la sauvegarde remonte au compte. | |
| Mode galerie sans compte | — | Session anonyme de 20 min, pré-réglée sur un chapitre « vitrine » ; QR en sortie pour reprendre chez soi en casque |

Le passage casque → cube est un argument marketing fort pour EphemerXR (« ce que vous avez archivé chez vous, TRACE l'a gardé »). Il ne coûte presque rien si la sauvegarde est pensée dès le prototype.

### 6.3 Télémétrie (anonyme, opt-in)

Événements : chapitre atteint, temps par scène, liens faux, traces gardées, abandon. Nécessaire pour équilibrer la mécanique 3 (combien de joueurs ont une « IA faible » ?). Stockage dans la même base, pas de tiers.

---

## 7. Intégration Webflow (EphemerXR) et performance

### 7.1 Hébergement : pas sur Webflow

Webflow n'héberge ni le code (custom code limité à 10 000 caractères par page, pas de fichiers JS/WASM arbitraires) ni les assets lourds (limite d'upload par fichier, pas de contrôle des en-têtes HTTP). Le jeu vit donc sur **un sous-domaine séparé** :

- `play.ephemerxr.com` → Cloudflare Pages (ou Vercel/Netlify), build Vite statique, CDN mondial, HTTPS obligatoire (WebXR refuse le HTTP).
- Assets (glTF, KTX2, Opus) sur Cloudflare R2 ou le même Pages, avec en-têtes `Cache-Control: immutable` et noms hashés.
- En-têtes nécessaires : `Cross-Origin-Opener-Policy`/`Cross-Origin-Embedder-Policy` seulement si on utilise des `SharedArrayBuffer` (évité) ; `Permissions-Policy: xr-spatial-tracking=(self "https://ephemerxr.com")`.

### 7.2 Deux façons d'être « dans » le site

1. **Page vitrine Webflow avec iframe** (`<iframe src="https://play.ephemerxr.com/?display=flat&chapter=teaser" allow="xr-spatial-tracking; fullscreen; gyroscope; accelerometer; microphone" allowfullscreen>`). Montre un extrait 360 jouable à la souris/au gyroscope. Le bouton « Entrer en VR » fonctionne dans l'iframe sur Quest Browser **si et seulement si** l'attribut `allow="xr-spatial-tracking"` est présent et que la session XR est demandée dans un geste utilisateur. À tester tôt (Quest Browser a eu des régressions sur les iframes cross-origin).
2. **Lien plein écran** : le bouton principal ouvre `play.ephemerxr.com` dans un nouvel onglet. C'est le chemin **recommandé pour la partie complète** : pas de chrome Webflow, pas de scroll parasite, pas de risque iframe. Le design Webflow du site enveloppe la page de lancement (pré-chargement, choix casque/écran, compte).

En pratique : **iframe pour le teaser, plein écran pour jouer.**

### 7.3 Budget poids et chargement

| Poste | Budget | Comment |
|---|---|---|
| Premier affichage (shell + Three.js + chapitre d'ouverture) | **< 12 Mo** | Code splitting, Draco + meshopt, KTX2, polices subset |
| Chaque chapitre suivant | 5–15 Mo, préchargé pendant le chapitre précédent | `fetch` en tâche de fond, cache `Cache Storage` |
| Jeu complet en cache | ~150–250 Mo | Service Worker : rejouable hors ligne une fois chargé |
| Temps avant « Entrer en VR » sur 4G correct | < 15 s | Mesuré en CI (Lighthouse + script) |

### 7.4 Budget performance Quest 3 (le vrai goulot)

Quest 3 = Snapdragon XR2 Gen 2, ~2× le Quest 2, mais ça reste un GPU mobile qui rend deux fois 1,7 Mpx à 72–90 Hz sous navigateur (pas de multiview garanti). Règles non négociables, vérifiées par un **test de charge automatique** à chaque PR (scène de référence + `performance.now()` sur 600 frames) :

- ≤ 100 draw calls, ≤ 500 k triangles, instancing pour tout ce qui se répète (nœuds du schéma, pièces de Lego).
- 1 lumière dynamique max ; le reste cuit (lightmaps) ou en émissif — l'esthétique « archive dans le noir » s'y prête.
- Pas de post-process plein écran en XR ; le « réchauffement/refroidissement » de l'interface (mécanique 2) se fait par uniforms de matériaux, pas par un pass.
- Textures ≤ 2 k, compressées GPU (KTX2), mipmaps.
- `renderer.xr.setFoveation(1)`, `framebufferScaleFactor` 1,0 ; monter à 1,2 seulement si marge > 25 %.
- Texte : SDF (troika) ; jamais de canvas texte regénéré par frame.
- Audio : ≤ 16 `PannerNode` actifs ; le reste en stéréo simple.
- Garbage : zéro allocation dans la boucle de rendu (pools d'objets, `Vector3` réutilisés).

Le **profil `cube`** dispose de 20–50× cette puissance. Le risque n'est donc pas la puissance du cube, c'est **la stabilité** : Chromium en kiosque sur 3–4 sorties 4K pendant 8 h/jour (fuites mémoire, perte de contexte WebGL, mise à jour auto). Mesures : Chromium épinglé (version fixe, `--kiosk --disable-gpu-vsync=false --autoplay-policy=no-user-gesture-required`), watchdog TD qui relance la page si le heartbeat WebSocket s'arrête > 2 s, redémarrage planifié quotidien, GPU pro avec drivers « studio ».

---

## 8. Infrastructure du cube (vue logicielle ; le matériel est dans `cube_specs.md`)

```
 PC CUBE (Windows 11, RTX pro, Mosaic 3–4 × 4K)
 ├── Chromium kiosque  ─── 6 faces → DP1..DP4 → processeurs LED / projecteurs
 ├── Node « show server » (WebSocket :8080, OSC :9000)  ◄──── tablette (Wi-Fi dédié)
 └── TouchDesigner      ─── LiDAR, ToF, ESP32 (porte, sol, carte mère), Vosk
                        ─── Dante / interface audio 8.1, DMX (Art-Net) éclairage service
                        ─── watchdog + planning (ouverture, sessions, redémarrage)
 Régie (hors cube) : écran de monitoring NDI (preview des 6 faces), interphone, bouton STOP.
```

Un seul PC pour les gabarits 3 m et 4 m. Pour 6 m en LED P2.6 (≈ 26 Mpx), un second GPU/PC et Quadro Sync, ou un serveur média : à chiffrer dans `cube_specs.md`.

---

## 9. Décisions à prendre (à inscrire dans `decisions_v2.md`)

1. Three.js/WebXR moteur unique, TouchDesigner régie — **oui / non**.
2. Pas de locomotion artificielle en casque (room-scale + téléport interdit) — oui / non.
3. Cube : mono, centre fixe en v1, off-axis tête trackée en v2 — oui / non.
4. Warp/blend exécutés dans le moteur (pas de serveur média) jusqu'au gabarit 4 m — oui / non.
5. Tablette comme contrôleur principal dans le cube + carte mère physique — oui / non.
6. Comptes EphemerXR et QR casque→cube dès le prototype — oui / non.
7. Voix : hors ligne (Vosk/whisper.cpp), mots-clés, pas de LLM au runtime — oui / non.
