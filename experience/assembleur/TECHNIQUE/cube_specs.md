# CHAMBRE-CUBE — FICHE TECHNIQUE
### Trois gabarits (3 m · 4 m · 6 m), deux technologies (LED · projection)
*FMRXR Studio — direction technique — v1, 16/10/2026*
*Document de chiffrage. **Tous les prix sont des estimations 2026, hors taxes, hors contenu, hors local, hors transport international**, basés sur les tarifs constatés en Europe ; prévoir +10–25 % pour la Tunisie (transport, douane, marge intégrateur). Les références matériel sont indicatives : à confirmer sur devis au moment de l'achat, les gammes changent chaque année.*

---

## 0. Lecture rapide

| | **Petit — 3×3×3 m** | **Moyen — 4×4×4 m** | **Grand — 6×6×6 m** |
|---|---|---|---|
| Usage | Galerie, festival, itinérance | Lieu semi-permanent, musée, centre d'art | Installation permanente, attraction |
| Joueurs | 1 (+ 1 accompagnant) | 1 joueur + 1–2 spectateurs | 1 joueur + jusqu'à 5 spectateurs |
| Surface d'image | 54 m² | 96 m² | 216 m² |
| Session max | 20 min | 25 min | 30 min |
| **LED — achat** | **220–340 k€** | **350–600 k€** | **700–1 200 k€** |
| **Projection — achat** | **110–210 k€** | **240–400 k€** | **500–900 k€** |
| LED — location 1 semaine | 25–45 k€ | 45–80 k€ | 100–180 k€ |
| Projection — location 1 semaine | 12–25 k€ | 25–45 k€ | 60–110 k€ |
| Emprise au sol (lieu d'accueil) | LED 4,5×4,5 m / proj. 4×4 m | LED 5,5×5,5 m / proj. 7,5×7,5 m | LED 8×8 m / proj. 11×11 m |
| Hauteur libre nécessaire | 4 m / 3,6 m | 5 m / 5 m | 7,5 m / 7,5 m |
| Puissance électrique à prévoir | LED 3×32 A / proj. 3×16 A | LED 3×63 A / proj. 3×32 A | LED 3×125 A / proj. 3×63 A |
| Montage → ouverture | LED 4 j / proj. 3 j | LED 6 j / proj. 6 j | LED 10–12 j / proj. 9–10 j |

**Recommandation de la direction technique :**
- **3 m : projection frontale compacte** pour l'itinérance (festival, galerie) ; LED seulement si un partenaire fournit les dalles.
- **4 m : LED si le lieu est permanent et financé**, sinon projection avec murs en rétroprojection. C'est le gabarit « juste » pour un joueur seul : assez grand pour marcher, assez petit pour que les faces restent lisibles.
- **6 m : projection**, sauf mécène. Le LED à 6 m est une installation de classe teamLab (plus d'une tonne suspendue, 25 kW de chaleur à évacuer, > 700 k€).

---

## 1. Principes communs aux trois gabarits

### 1.1 Géométrie
- Le « cube » est la **surface d'image** (face intérieure). La structure, les projecteurs ou le vide technique derrière les dalles s'ajoutent à l'extérieur : prévoir +0,6 m par côté en LED (service, câbles, air), +0,5 m (projection frontale) à +2,2 m (rétroprojection) en projection.
- **Six faces d'image, dont le sol.** Le sol est marchable : dalles LED pour sol (verre trempé/PC, 1,5–2 t/m²) ou revêtement de projection (vinyle de danse mat gris clair sur plancher technique).
- **Porte** : dans l'un des 4 murs, 0,90 m de passage libre (PMR), ouvrant vers l'extérieur, surface intérieure continue avec le mur (dalles LED sur le vantail, ou toile tendue). L'arête de la porte reste discrètement lisible (liseré LED 0,5 cd/m² asservi à la sécurité).
- Les **arêtes** du cube sont le point faible visuel : joint de dalles (LED, ≤ 1 mm) ou raccord de deux plans de projection avec warp sur deux plans (projection). On ne cherche pas à les cacher : le design des faces (6 facettes du héros, cf. decisions_v1) les assume.

### 1.2 Luminance cible et contraste
- Cible : **80–150 cd/m² (nits)** sur les murs, jusqu'à 250 nits au sol (enfance, couleurs), plafond ≤ 80 nits (le Noyau, sombre). Un cinéma est à 48 nits ; une salle « Van Gogh » tourne entre 60 et 120 nits. Au-delà, dans un cube fermé, l'œil se fatigue et le contraste s'effondre.
- **Le problème du cube : l'inter-réflexion.** Six faces qui s'éclairent mutuellement. Un sol blanc à 100 nits renvoie 20–40 lux sur les murs ; le niveau de noir monte à 3–8 nits ; le contraste réel passe de 2 000:1 (projecteur) à 15–30:1. Parades : surfaces gris foncé (gain 0,5–0,7), contenu sombre, jamais une face entièrement blanche, luminance plafonnée face par face dans le moteur. **Le jeu est sombre par design (archive, nuit, forums) : c'est notre chance.** En LED le problème n'existe quasiment pas (noir réel, contraste > 5 000:1) : c'est l'argument n°1 de la LED.
- LED pilotée à **15–30 % de sa luminance max** (dalles à 800–1 000 nits). Exiger des processeurs à forte profondeur de bits à bas niveau (Brompton Tessera « Dynamic Calibration », Novastar « low brightness high grayscale » ≥ 22 bits) : sans ça, les dégradés sombres bandent.

### 1.3 Résolution
- Règle : distance de vision minimale (m) ≈ pitch (mm) ÷ 1,5 pour un œil non entraîné (P1.95 → confortable dès 1,3 m ; P2.6 → 1,7 m ; P3.9 → 2,6 m).
- Projection : densité cible ≥ 350 px/m sur les murs (3 mm « d'équivalent pitch »), ≥ 250 px/m sol et plafond.

### 1.4 Rendu et distribution vidéo (cf. `architecture_360.md` §3)
- Un PC, un Chromium plein écran, un bureau **NVIDIA Mosaic** sur 3–4 sorties 4K60, une carte **RTX professionnelle** (RTX 6000 Ada / RTX PRO 6000 Blackwell : 4 × DisplayPort 2.1, Mosaic, drivers studio). GeForce = banc de test uniquement.
- **LED** : chaque face est un rectangle de la fenêtre, envoyé pixel pour pixel au processeur LED (HDMI 2.0 / DP 1.4 4K60). Zéro warping.
- **Projection** : chaque sortie 4K est découpée par un **Datapath Fx4** (1 entrée 4K, 4 sorties recadrées/redimensionnées, ~1,8–2,2 k€) en 4 flux 1 920×1 080 → 1 GPU = 16 projecteurs. Warp et blend exécutés **dans le moteur** (grille Bézier par projecteur, masque de blend gamma-corrigé) jusqu'à 4 m ; à partir de 4 m, option **NVIDIA Warp & Blend API** (correction dans le driver, indépendante de l'application) calibrée par caméra avec Vioso Anyblend ou Scalable Display (8–20 k€, calibration en 1–2 h au lieu de 2–3 jours).
- Liaisons > 10 m : extendeurs HDMI/DP sur fibre (Lightware, Kramer) ; en rétroprojection les projecteurs sont à 2–4 m, en 6 m les pods d'angle à 6 m : prévoir la fibre dès 4 m.

### 1.5 Tracking du joueur (identique sur les 3 gabarits, dimensionné par le nombre d'unités)
| Capteur | Rôle | Référence | Prix unitaire |
|---|---|---|---|
| LiDAR 2D à 20 cm du sol | Position au sol (±2 cm, 25–40 Hz), zones, proximité des faces | Hokuyo UST-10LX (10 m) / SICK TiM781 | 1,8–2,8 k€ |
| Caméra de profondeur ToF, coin haut | Hauteur de tête (projection off-axis), bras tendu, nombre de personnes | Orbbec Femto Bolt (successeur Azure Kinect, SDK compatible) | 1,0–1,3 k€ |
| Contacts et capteurs | Porte, tapis à pression 4–8 zones, carte mère capacitive (ESP32 + MPR121), CO₂, température | Sur mesure | 1,5–3 k€ |
| Micro plafond cardioïde + reconnaissance hors ligne | Mots-clés vers TRACE | Shure MX395 ou Audio-Technica ES945 + Vosk/whisper.cpp | 0,5–1 k€ |

Tout remonte dans TouchDesigner (opérateurs Hokuyo, Kinect Azure compatible Femto, OSC In), qui publie en OSC/WebSocket vers le moteur. **Attention LED** : les dalles réfléchissent l'IR des ToF → incliner les caméras de 15–20° et masquer les reflets dans le SDK. **Attention projection** : les ToF en IR actif ignorent la lumière projetée ; les caméras RGB sont inutilisables (noir).

### 1.6 Sécurité (identique sur les 3 gabarits)
Référentiel : règlement ERP français (type L/Y) comme base, à mettre en conformité avec la Protection civile tunisienne pour chaque lieu.

| Sujet | Exigence |
|---|---|
| **Porte** | Jamais verrouillée. Ouverture de l'intérieur sans clé, d'une main, sans voir (barre ou poignée lumineuse). « On ferme » = ventouse 12 V à rupture (coupure courant = ouverte) ou simple ferme-porte. Contact de porte → pause du jeu + lumière de service. Passage 0,90 m, seuil ≤ 2 cm. |
| **Issue de secours** | Effectif ≤ 19 personnes : une issue de 0,90 m suffit (1 UP). Le 6 m accueillant jusqu'à 6 personnes reste sous ce seuil ; prévoir néanmoins un **panneau amovible** opposé à la porte (évacuation si la porte est bloquée par un incident technique). |
| **Éclairage de sécurité** | BAES autonome (1 h) dans le cube, invisible en fonctionnement, allumage à la coupure secteur ou sur bouton STOP régie. Pictogramme « SORTIE » basse luminance (≤ 0,5 cd/m²) sur l'encadrement, ou liseré LED de porte toujours allumé à 2 %. |
| **Régie** | Toujours un opérateur dehors. Caméra IR dans le cube (Axis M-series, affichage régie, panneau d'information RGPD à l'entrée), interphone bidirectionnel, **bouton STOP** (coupe le contenu, monte la lumière, ouvre la ventouse). Mot de sortie prononçable par le joueur (« TRACE, ouvre ») reconnu hors ligne → même effet. |
| **Ventilation / air** | Débit d'air neuf ≥ 30 m³/h par personne (le minimum réglementaire est 18 ; on vise le confort). Soufflage par fente en plinthe (grille continue sous la première rangée de dalles ou de toile), extraction en arête haute. Capteur CO₂ (Senseair S8) dans TouchDesigner : > 1 200 ppm → boost ; > 2 000 ppm → fin de session. Bruit du CVC ≤ 35 dB(A) dans le cube (gaines acoustiques, vitesses d'air basses). |
| **Chaleur** | Cf. chaque gabarit. Règle : tout le courant qui entre dans une dalle LED ou un projecteur ressort en chaleur. Température cible dans le cube 22–25 °C, sol LED ≤ 30 °C au toucher. |
| **Épilepsie** | Référence Ofcom/Harding (WCAG 2.3.1) **durcie** pour un champ visuel total : aucune séquence > 1 flash/s, aucune inversion de luminance plein champ, pas de rouge saturé clignotant. Test automatique des cubemaps enregistrées (outil PEAT ou équivalent) avant chaque livraison de contenu. Affichage d'avertissement à l'entrée + question orale de l'opérateur. |
| **Claustrophobie / malaise** | Briefing de 1 min avant l'entrée (où est la porte, comment sortir, le mot de sortie). La porte est toujours située « derrière » le point d'entrée dans la narration (TRACE le rappelle une fois). Pas d'obscurité totale > 5 s. Premier contenu = ouverture douce, jamais une fermeture brutale. L'opérateur observe les 2 premières minutes. |
| **Durée** | Cube : 20 / 25 / 30 min max (3 / 4 / 6 m), puis 5 min de renouvellement d'air et de remise à zéro. Pause obligatoire pour l'opérateur toutes les 2 h. |
| **Sol** | Antidérapant (R10 min.), aucune marche, aucun câble au sol, aucun projecteur sous 2,2 m de hauteur dans le volume. Dalles LED sol : vérifier la charge (≥ 1,5 t/m²), chaussures propres (tapis à l'entrée), interdiction des talons sur dalles verre. |
| **Incendie** | Toiles et peintures M1 / B-s1,d0 (Gerriets, Rosco, Screen Goo le sont ; vérifier le vinyle de sol). Dalles LED = aluminium/magnésium, OK. Détecteur de fumée dans le cube et dans le vide technique, relié à la régie. Extincteur CO₂ à la régie. Aucun brouillard/haze (de toute façon incompatible avec la projection). |
| **Électrique** | Différentiels 30 mA par départ, liaison équipotentielle de toute la structure et des cadres LED, onduleur sur PC + régie + ventouse. Certificat de conformité par l'électricien du lieu. |
| **Structure** | Toute charge suspendue (plafond LED, pods de projecteurs) fait l'objet d'une note de calcul par un bureau d'études structure et d'un contrôle au montage. En extérieur (festival) : tente ou structure fermée obligatoire, jamais de cube nu au vent. |
| **Hygiène** | Casque : voir Phase 1 (hors sujet ici). Cube : tablette désinfectée entre deux sessions, carte mère physique idem. |

---

## 2. GABARIT PETIT — 3 × 3 × 3 m (galerie, festival, itinérance)

Volume 27 m³ · 6 faces de 9 m² · 1 joueur · session 20 min · emprise avec structure : LED 4,5 × 4,5 m, projection 4 × 4 m.

### 2.1 Option LED (3-L)

| Poste | Spécification |
|---|---|
| **Murs (4)** | P1.95 (dalle 500×500 mm, 256×256 px, service par l'avant obligatoire). 6×6 = 36 dalles/mur, **144 dalles**, 1 536 px par face. Références : ROE Diamond DM1.9, Absen PL1.9 Pro, Unilumin UpadIII H1.9, INFiLED DB1.9. ~7 kg/dalle. |
| **Plafond** | P2.6 (192×192 px), **36 dalles**, 1 152 px. Dalles légères (≤ 7 kg), montage sur cadre suspendu à un portique. |
| **Sol** | Dalles sol P2.6 (surface verre trempé antidérapant, 1,5–2 t/m²) : ROE Black Marble BM2, INFiLED AR Floor 2.6, Unilumin UFloor 2.6, Absen PL2.5 Floor. **36 dalles**, 1 152 px, ~14–19 kg/dalle. |
| **Pixels totaux** | 4 × 1 536² + 2 × 1 152² ≈ **12,1 Mpx** |
| **Processeurs** | **Novastar MX40 Pro ×3** (9 Mpx/unité, 2 faces par unité) ou **MX6000 Pro ×1** ; Brompton **Tessera SX40 ×3** + XD. Rétro-éclairage : cartes réceptrices dans les dalles (A10s Pro / Tessera R2+). |
| **Sorties GPU** | 3 × 4K60 : 2 faces par sortie (3 072 × 1 536 utiles). 1 PC, 1 GPU RTX pro. |
| **Poids** | Murs 1 010 kg (au sol, auto-stables avec contreventement arrière) · plafond **≈ 350–400 kg suspendus** (dalles + cadre) · sol 500–700 kg répartis (56–78 kg/m², tout plancher le supporte). Structure portique alu : 300–500 kg. **Total ≈ 2,3–2,7 t.** |
| **Puissance** | Dimensionnement : 300 W/m² crête (luminance plafonnée à 30 %), 100 W/m² moyenne (contenu sombre + veille des drivers ≈ 60 W/m²). 54 m² → **crête 16 kW, moyenne 5,5 kW**. Alimentation LED dédiée **3 × 32 A**, 6 départs 16 A (1 par face), + 3 × 16 A régie/CVC. |
| **Chaleur** | ≈ 5,5 kW moyens + PC 0,8 + audio 0,3 + joueur 0,15 → **≈ 7 kW à évacuer**. Climatisation **8–10 kW froid** (gainable ou 2 splits), soufflage plinthe 600 m³/h, extraction du vide technique arrière. Sans clim, le cube gagne +1 °C toutes les 2 min. |
| **Vide technique** | 0,5 m derrière les murs (câbles, air, accès si une dalle refuse le service avant), 0,6 m au-dessus du plafond, plancher sol posé sur un plancher technique de 0,1 m (câbles). |
| **Acoustique** | Six surfaces dures de verre et d'alu : RT60 ≈ 1,2 s, inacceptable pour la voix de TRACE. Laine minérale 50 mm + tissu derrière les dalles murales (le son passe entre les dalles), absorbeurs dans le vide plafond. Cible RT60 0,5 s. |
| **Audio** | 8 enceintes compactes aux sommets (Genelec 8020 / JBL 305P MkII), 1 sub 10″ dans le vide plafond ou sous le plancher, 2 transducteurs tactiles (ButtKicker LFE) sous le sol, interface 10 sorties (MOTU UltraLite mk5 / RME Fireface UCX II). |
| **Tracking** | 1 LiDAR (coin), 1 ToF (coin haut opposé), porte, tapis à pression, carte mère capacitive sur pupitre. |
| **Serveur média** | PC Windows 11, i9/Threadripper, 64 Go, RTX 6000 Ada (ou RTX PRO 5000/6000 Blackwell), NVMe 2 To, onduleur 1 500 VA. 3 sorties utilisées / 4. Sync : Mosaic (1 GPU, pas de Quadro Sync). NDI : non requis (le moniteur régie fait tourner le même build en `display=monitor`), OBS→NDI en option pour captation. Timecode : non requis (le jeu n'est pas une timeline) ; LTC via TD si une couche spectacle vivant s'ajoute. |
| **Montage / démontage** | 4 j montage (4 techniciens dont 1 LED, 1 électricien, 1 rigger), dont 1 j de mise en service/colorimétrie ; 1,5 j démontage. 1 camion 20–30 m³ (≈ 22 flight cases LED + 4 cases sol + structure). |

**Budget 3-L (achat)**

| Poste | Fourchette |
|---|---|
| Dalles murs 36 m² P1.95 (2 500–4 500 €/m²) | 90–160 k€ |
| Dalles plafond 9 m² P2.6 (1 800–3 200 €/m²) | 16–29 k€ |
| Dalles sol 9 m² P2.6 (3 500–6 000 €/m²) | 32–54 k€ |
| Processeurs + distribution (fibre, switches) | 18–40 k€ |
| Structure (cadres, portique, plancher, porte, bureau d'études) | 20–35 k€ |
| PC, GPU pro, onduleur, moniteurs régie | 10–15 k€ |
| Audio + transducteurs + traitement acoustique | 10–18 k€ |
| Tracking, capteurs, pupitre, tablette, carte mère | 7–12 k€ |
| CVC (clim 8–10 kW, gaines, CO₂) | 8–15 k€ |
| Électricité (tableau 3×32 A, câblage, BAES) | 5–10 k€ |
| Sécurité (porte, ventouse, caméra IR, interphone, détection) | 3–6 k€ |
| Installation, mise en service, calibration (12–16 j/h) | 15–25 k€ |
| **Total** | **≈ 235–420 k€ → retenir 220–340 k€ en négociant les dalles (brands chinoises) ; 340–420 k€ en ROE/Leyard.** |
| Location 1 semaine (festival, matériel + crew, hors transport) | 25–45 k€ |

### 2.2 Option projection (3-P) — frontale compacte, « UST en arête »

Principe : **tous les projecteurs sont dans le volume, logés dans les arêtes hautes**, hors de portée du corps du joueur. Pas de rétroprojection (emprise 4 × 4 m seulement, montage rapide). Les ombres sont traitées par la géométrie (faisceaux rasants) et par la redondance (sol).

| Face | Projecteurs | Géométrie | Ombres |
|---|---|---|---|
| **Murs (4)** | **2 UST par mur, montés en portrait sur l'arête plafond, soit 8** : Epson EB-810E (5 000 lm, 1080p + pixel-shift 4K, 0,16:1, laser) ou Panasonic PT-CMZ50 (5 200 lm, WUXGA, 0,3:1, laser, installation 360°). Chaque projecteur couvre 1,9 × 3 m, recouvrement 0,75 m, blend dans le moteur. | Le faisceau rase le mur : à hauteur de tête (1,8 m) il n'est qu'à 15–20 cm de la surface. | Seulement si le joueur touche le mur. Acceptable (c'est même un effet : « il touche l'archive »). |
| **Plafond** | **2 UST en portrait sur l'arête haute du mur nord**, projetant *à travers* le plafond (le plafond est un 5ᵉ mur) : mêmes modèles. | Faisceau rasant au plafond, > 2,2 m de haut partout. | Aucune. |
| **Sol** | **4 projecteurs courte focale (0,5–0,7:1) dans les 4 coins hauts**, pointés vers le sol en diagonale, chacun couvrant tout le sol : Epson EB-L530U (5 200 lm, WUXGA, laser) + optique courte, ou Panasonic PT-MZ680 + ET-ELW22. Warp fort (≈ 45°), 4 images superposées. | Les 4 faisceaux se croisent : l'ombre portée par un projecteur est éclairée par les 3 autres à 75 %. | **Ombre résiduelle = léger assombrissement sous les pieds**, invisible en pratique (même principe que les sols Van Gogh / teamLab). |
| **Total** | **14 projecteurs** (10 UST + 4 courte focale), tous laser, 1080p/WUXGA. | | |

| Poste | Spécification |
|---|---|
| **Luminance** | Murs : 2 × 5 000 lm × 0,65 (recouvrement, portrait, uniformité) ≈ 6 500 lm sur 9 m² → 230 nits à pleine puissance sur gris gain 1 ; **surfaces gris moyen gain 0,6 + laser à 50 % → ≈ 70–100 nits**, durée de vie doublée, chaleur réduite. Sol : 4 × 5 200 × 0,45 ≈ 9 400 lm → 300 nits plein, réglé à 30–40 %. Plafond ≈ 90 nits, réglé à 50 %. |
| **Résolution** | Murs 2 × 1 080 px en largeur (recouvrement déduit ≈ 1 800 px/3 m = 600 px/m) × 1 920 px en hauteur : excellent. Sol ≈ 1 100 px utiles / 3 m après warp. Plafond idem murs. |
| **Surfaces** | Murs et plafond : panneaux MDF/contreplaqué 18 mm sur ossature alu, enduit lisse, **peinture de projection gris moyen** (Screen Goo Max Contrast, Rosco Screen Paint « grey », gain 0,6–0,8). Sol : plancher technique + **vinyle de danse mat gris clair** (Harlequin Cascade, Rosco Adagio), collé, nettoyé chaque jour. |
| **Warping / blending** | Dans le moteur (grille Bézier 2D + plan double aux arêtes + masque de blend). Pré-réglage géométrique dans les projecteurs (Epson Professional Tool / Panasonic Geometry Manager). Calibration manuelle : 1,5 j la première fois, 0,5 j à chaque remontage (les positions sont indexées mécaniquement : platines fixes, pions de centrage). |
| **Sorties GPU / distribution** | 14 flux 1 920×1 080 → 4 sorties 4K → **4 × Datapath Fx4** (16 flux, 2 en réserve). Câbles HDMI 2.0 certifiés ≤ 10 m (le cube est petit : pas de fibre). |
| **Puissance** | 14 × 350 W = 4,9 kW + PC 0,8 + audio 0,3 + CVC 2,5 + régie 0,5 → **≈ 9 kW**. Alimentation **3 × 16 A** (ou 2 lignes 32 A mono), onduleur sur PC. |
| **Chaleur** | Tous les projecteurs sont dans le volume : 4,9 kW à 50 % de laser ≈ 3,5 kW + joueur + PC hors cube → **≈ 4 kW** à évacuer. Clim **5–6 kW froid**, soufflage plinthe, extraction en arête haute (au niveau des projecteurs : on évacue leur air chaud directement). Bruit des 14 ventilateurs ≈ 30–33 dB(A) chacun → 40 dB(A) cumulés : il faut les **capoter** (caissons ventilés tissu + laine) pour redescendre ≤ 35 dB(A). |
| **Poids** | Structure + panneaux ≈ 900 kg au sol, projecteurs 14 × 6–9 kg ≈ 110 kg sur l'ossature. Rien de suspendu au bâtiment : le cube est **auto-porteur**. |
| **Acoustique** | Panneaux MDF = surfaces dures. Laine 50 mm derrière les panneaux micro-perforés ? Non : la micro-perforation est visible en projection. Solution : absorbeurs dans le vide plafond + sol flottant + rideaux lourds à l'extérieur du cube. RT60 ≈ 0,7 s accepté. |
| **Audio / tracking / serveur** | Identiques à 3-L (8.1 + tactile ; 1 LiDAR + 1 ToF ; même PC, 4 sorties utilisées). |
| **Montage / démontage** | 2 j montage (3 techniciens) + 1 j calibration et réglages ; 0,5 j démontage. 1 camion 20 m³. Les panneaux sont des modules 1 × 3 m numérotés, les projecteurs restent sur leurs platines dans des flight cases. |
| **Variante premium (galerie permanente)** | Murs en rétroprojection (4 UST derrière toile Gerriets OPERA, emprise 5,5 × 5,5 m) et **sol en rétroprojection** (dalle verre feuilleté 9 m², fosse ou podium 1,1 m, UST + miroir) : aucun projecteur dans le volume, zéro ombre, zéro bruit. **+45–70 k€**, montage 5 j. |

**Budget 3-P (achat)**

| Poste | Fourchette |
|---|---|
| 10 UST 5 000 lm laser (2,8–5 k€) + 4 courte focale WUXGA + optiques (4–6 k€) | 44–74 k€ |
| Structure cube (ossature alu, panneaux, peinture projection, plancher, vinyle, porte, capotages) | 12–25 k€ |
| Distribution vidéo (4 × Fx4, câbles, platines) | 9–13 k€ |
| PC, GPU pro, onduleur, moniteurs régie | 8–12 k€ |
| Calibration : moteur (0) ou Vioso Anyblend + caméra | 0–12 k€ |
| Audio + transducteurs + acoustique | 8–14 k€ |
| Tracking, capteurs, pupitre, tablette, carte mère | 7–12 k€ |
| CVC (clim 5–6 kW, gaines, CO₂) | 5–10 k€ |
| Électricité (3×16 A, câblage, BAES) | 3–6 k€ |
| Sécurité | 3–6 k€ |
| Installation + calibration (8–12 j/h) | 8–15 k€ |
| **Total** | **≈ 107–199 k€ → retenir 110–210 k€** |
| Location 1 semaine (matériel + crew) | 12–25 k€ |

---

## 3. GABARIT MOYEN — 4 × 4 × 4 m (lieu semi-permanent, musée, centre d'art)

Volume 64 m³ · 6 faces de 16 m² · 1 joueur + 1–2 spectateurs · session 25 min · emprise : LED 5,5 × 5,5 m, projection 7,5 × 7,5 m.

### 3.1 Option LED (4-L)

| Poste | Spécification |
|---|---|
| **Murs (4)** | P2.6 (distance de vision 2 m au centre, 1 m près des murs : acceptable ; P1.95 en option premium +60 %). 8×8 = 64 dalles/mur, **256 dalles**, 1 536 px/face. |
| **Plafond** | P2.6, **64 dalles**, 1 536 px. |
| **Sol** | Dalles sol P2.6, **64 dalles**, 1 536 px. |
| **Pixels** | 6 × 1 536² ≈ **14,2 Mpx** |
| **Processeurs** | Novastar MX40 Pro ×2 (3 faces chacun, 7,1 Mpx) ou MX6000 Pro ×1 ; Brompton SX40 ×2. |
| **Sorties GPU** | 3 × 4K60 (2 faces par sortie). 1 PC, 1 GPU. |
| **Poids** | Murs 1 800 kg · **plafond ≈ 600 kg suspendus** (448 kg dalles + cadre) · sol 900–1 200 kg répartis · portique 500–800 kg. **Total ≈ 3,8–4,4 t.** Portique en poutre alu 40 cm (Prolyte H40V ou équiv.) sur 4 tours, note de calcul obligatoire. |
| **Puissance** | 96 m² × 300 W crête = **29 kW crête, ≈ 10 kW moyenne**. Alimentation LED **3 × 63 A**, 6 départs 32 A + 3 × 16 A régie/CVC. |
| **Chaleur** | ≈ 10 kW LED + 1,5 kW divers → **≈ 12 kW**. Clim **12–15 kW froid** (gainable 2 × 7 kW), 1 000 m³/h soufflage plinthe, extraction vide technique. |
| **Vide technique** | 0,6 m murs, 0,8 m plafond (passerelle d'accès), plancher technique 0,15 m. |
| **Acoustique / audio** | Idem 3-L, enceintes plus puissantes (Genelec 8030 / 8040 ou Neumann KH 120), 2 subs, 4 transducteurs. Dante conseillé (Focusrite RedNet, Dante Virtual Soundcard) : câblage réseau unique. |
| **Tracking** | 1 LiDAR, 2 ToF (coins opposés), capteurs, pupitre. |
| **Serveur média** | Idem 3-L. 3 sorties / 4. Mosaic. |
| **Montage / démontage** | 6 j montage (5 techniciens + 2 riggers 2 j) dont 1,5 j mise en service ; 2 j démontage. Camion 40 m³. |

**Budget 4-L (achat)**

| Poste | Fourchette |
|---|---|
| Dalles murs 64 m² P2.6 (1 800–3 200 €/m²) | 115–205 k€ |
| Dalles plafond 16 m² P2.6 | 29–51 k€ |
| Dalles sol 16 m² P2.6 (3 500–6 000 €/m²) | 56–96 k€ |
| Processeurs + distribution | 18–40 k€ |
| Structure (cadres, portique H40V + tours, plancher, passerelle, porte, BE) | 35–60 k€ |
| PC, GPU pro, onduleur, régie | 12–18 k€ |
| Audio (Dante) + transducteurs + acoustique | 16–28 k€ |
| Tracking, capteurs, pupitre, tablette, carte mère | 9–16 k€ |
| CVC (12–15 kW) | 15–25 k€ |
| Électricité (3×63 A) | 8–15 k€ |
| Sécurité | 4–8 k€ |
| Installation, mise en service, colorimétrie (20–30 j/h) | 25–40 k€ |
| **Total** | **≈ 340–600 k€ → retenir 350–600 k€** |
| Location 1 semaine | 45–80 k€ |

### 3.2 Option projection (4-P) — murs en rétroprojection, sol et plafond frontaux

Principe : **les murs sont des écrans de rétroprojection** (projecteurs dehors, zéro ombre, zéro bruit dans le cube, le joueur peut toucher les murs). Sol et plafond sont projetés depuis **4 pods d'angle** à 3,2 m de hauteur, chaque pod contenant 1 projecteur vers le sol et 1 vers le plafond.

| Face | Projecteurs | Géométrie |
|---|---|---|
| **Murs (4)** | **2 par mur en portrait, rétro, soit 8** : Epson EB-L770U (7 000 lm, WUXGA, laser) + optique ELPLU04 (0,64–0,77:1) ou Panasonic PT-MZ780 (7 000 lm) + ET-ELW22 (0,8:1) ou Epson EB-PU1007W + ELPLU03S. Image 2,5 × 4 m par projecteur, recouvrement 1 m. | Jet 2 m, **replié par un miroir première surface** (1,2 × 1,6 m) → 1,2 m derrière l'écran. Emprise 4 + 2 × 1,75 = 7,5 m. |
| **Plafond** | **4 projecteurs courte focale (0,5–0,8:1) dans les pods d'angle**, pointés vers le plafond (30–45°), chacun couvrant tout le plafond : Epson EB-L730U/L770U ou PT-MZ680/780 + optique courte. | Les pods sont au-dessus de la tête : **aucune ombre possible**. |
| **Sol** | **4 projecteurs idem dans les mêmes pods**, pointés vers le sol. 4 images superposées = ombre résiduelle ≤ 25 %. | Pods à 3,2 m, faisceaux à 40–50° : ombre sous les pieds uniquement. |
| **Total** | **16 projecteurs WUXGA laser 6 000–7 000 lm.** | |

| Poste | Spécification |
|---|---|
| **Luminance** | Murs : 2 × 7 000 × 0,6 (recouvrement, portrait, pertes toile) = 8 400 lm / 16 m² → 170 nits sur toile gain 1 → **réglé 60 % ≈ 100 nits**. Sol/plafond : 4 × 7 000 × 0,4 (angle, warp) = 11 200 lm → 220 nits → réglé 40–50 %. |
| **Résolution** | Murs : 2 × 1 200 px − recouvrement ≈ 2 000 px / 4 m = 500 px/m. Sol/plafond ≈ 1 100–1 300 px / 4 m = 300 px/m (OK pour Lego et nœuds, pas pour du texte fin : **le texte lisible reste sur les murs**). |
| **Écrans RP** | Toile de rétroprojection tendue sur cadre alu avec profilé (Gerriets OPERA Creamy / Grey, Rosco Twin White, Showtex) : gain 0,8–1,2, angle large, M1. Épaisseur du cadre 60 mm, invisible depuis l'intérieur. Variante rigide : acrylique diffusant 6 mm (Evonik / Plexiglas Rear Projection), +40 %, meilleure planéité, 4 × 16 m² = lourd (380 kg). |
| **Sol / plafond** | Comme 3-P : panneaux + peinture gris (plafond), plancher + vinyle de danse (sol). |
| **Warping / blending** | Dans le moteur, ou **NVIDIA Warp & Blend + Vioso Anyblend** (caméra de calibration, 1–2 h par recalibration : recommandé à ce gabarit, 16 projecteurs à la main = 2–3 jours). |
| **Sorties GPU / distribution** | 16 flux 1 920×1 080 (WUXGA recadré ou remis à l'échelle 1 200 par le Fx4) → 4 sorties 4K → **4 × Datapath Fx4**. Fibre HDMI pour les 8 projecteurs murs (distance 6–10 m autour du cube) et les pods. |
| **Puissance** | 16 × 450 W = 7,2 kW + PC 1 + audio 0,8 + CVC 4 + régie 0,5 → **≈ 13,5 kW**. **3 × 32 A.** |
| **Chaleur dans le cube** | Seulement les 8 projecteurs des pods (3,6 kW à plein, ≈ 2,2 kW à 50 %) + 2–3 personnes → **≈ 3 kW**. Clim **5–7 kW froid**. Les 8 projecteurs de rétro chauffent le couloir technique : ventilation du couloir 1 500 m³/h ou clim 5 kW. |
| **Bruit** | Pods capotés ventilés : ≤ 35 dB(A). |
| **Poids** | Auto-porteur : ossature 1,2 t, pods 4 × 40 kg sur l'ossature, écrans 4 × 25 kg (toile) ; rien au bâtiment. |
| **Emprise** | 7,5 × 7,5 m au sol, 5 m de hauteur libre (4 m + pods + ossature), **rideaux noirs** autour du couloir technique (la lumière de fuite des rétros doit rester dedans). |
| **Audio / tracking / serveur** | Comme 4-L (Dante ; 1 LiDAR + 2 ToF ; même PC, 4 sorties). |
| **Montage / démontage** | 4 j montage (4 techniciens) + 1,5 j calibration (0,5 j avec Vioso) ; 1,5 j démontage. Camion 40 m³. |

**Budget 4-P (achat)**

| Poste | Fourchette |
|---|---|
| 8 projecteurs murs 7 000 lm WUXGA laser + optiques courtes (7–10 k€) | 56–80 k€ |
| 8 projecteurs sol/plafond 6–7 000 lm + optiques (5–9 k€) | 40–72 k€ |
| Écrans RP 4 × 16 m² + cadres + 4 miroirs première surface | 25–45 k€ |
| Structure (ossature, pods, plafond, plancher, vinyle, porte, rideaux, nacelle) | 25–45 k€ |
| Distribution vidéo (4 × Fx4, fibre, platines) | 10–15 k€ |
| PC, GPU pro, onduleur, régie | 10–15 k€ |
| Calibration caméra (Vioso / Scalable) | 10–20 k€ |
| Audio (Dante) + transducteurs + acoustique | 12–22 k€ |
| Tracking, capteurs, pupitre, tablette, carte mère | 9–16 k€ |
| CVC (cube 5–7 kW + couloir) | 10–18 k€ |
| Électricité (3×32 A) | 5–10 k€ |
| Sécurité | 4–8 k€ |
| Installation + calibration (15–25 j/h) | 20–35 k€ |
| **Total** | **≈ 236–401 k€ → retenir 240–400 k€** |
| Location 1 semaine | 25–45 k€ |

---

## 4. GABARIT GRAND — 6 × 6 × 6 m (installation permanente, attraction)

Volume 216 m³ · 6 faces de 36 m² · 1 joueur + jusqu'à 5 spectateurs (mode « visite guidée ») · session 30 min · emprise : LED 8 × 8 m, projection 11 × 11 m · hauteur libre 7,5 m.

À ce gabarit, le joueur est à 3 m des murs au centre : la sensation de « dedans » vient moins de la proximité que de l'échelle. Le design des faces doit grossir (nœuds du schéma à 30–50 cm) et le tracking doit distinguer le joueur des spectateurs (zone joueur au centre, 2 × 2 m, LiDAR + ToF ; spectateurs le long du mur d'entrée).

### 4.1 Option LED (6-L)

| Poste | Spécification |
|---|---|
| **Murs (4)** | P2.6 (vision à 3 m : confortable ; P3.9 en option économique −40 %, visible de près). 12×12 = 144 dalles/mur, **576 dalles**, 2 304 px/face. |
| **Plafond** | P3.9 (128×128 px, dalles légères ≤ 6,5 kg), **144 dalles**, 1 536 px. Vision à 6 m : P3.9 est largement suffisant. |
| **Sol** | Dalles sol P3.9 (ROE BM4 / Absen PL3.9 Floor / INFiLED AR 3.9), **144 dalles**, 1 536 px. |
| **Pixels** | 4 × 2 304² + 2 × 1 536² ≈ **25,9 Mpx** |
| **Processeurs** | Novastar **MX40 Pro ×3** (≤ 9 Mpx chacun ; répartition : 2 unités à 1 mur + 1 face sol/plafond = 7,7 Mpx, 1 unité à 2 murs = 10,6 Mpx → dépasse : prendre **4 × MX40 Pro** ou **MX6000 Pro ×1** (35 Mpx)) ; Brompton **SX40 ×3** + XD, ou Tessera SQ200. |
| **Sorties GPU** | Un mur fait 2 304 px de haut, plus que les 2 160 d'une sortie 4K. Trois solutions : (a) **rendre 2 160 px et laisser le processeur remettre à l'échelle à 2 304** (perte invisible à 3 m : **recommandé**), (b) sorties DP 2.1 en 5K (5 120 × 2 880) vers un processeur 8K (MX6000 Pro), (c) P3.9 aux murs. Avec (a) : **4 sorties 4K** = 1 mur (2 160²) + une moitié de sol/plafond (1 536² dans les 1 680 px restants) par sortie. **1 PC, 1 GPU RTX pro, 4 sorties.** |
| **Poids** | Murs 4 000 kg · **plafond ≈ 1 300 kg suspendus** (940 kg dalles + 350 kg cadre) · sol 2 000–2 700 kg répartis · portique acier/alu 1,5–2,5 t. **Total ≈ 9–11 t.** Portique en poutre 52 cm (Prolyte H52V ou acier) sur 4 tours ou accroche au bâtiment (points ≥ 500 kg × 6). Bureau d'études + contrôle technique obligatoires. |
| **Puissance** | 216 m² × 300 W crête = **65 kW crête, ≈ 22 kW moyenne**. Alimentation LED **3 × 125 A** (TGBT dédié), 12 départs 32 A (2 par face) + 3 × 32 A CVC + 3 × 16 A régie. |
| **Chaleur** | ≈ 22 kW LED + 3 kW divers + 6 personnes → **≈ 26 kW**. Clim **30 kW froid** (2 gainables 15 kW ou rooftop), 2 500 m³/h soufflage plinthe + extraction vide technique 4 000 m³/h. C'est un poste de 35–60 k€ : **ne pas le sous-estimer, c'est lui qui tue les projets LED fermés.** |
| **Vide technique** | 0,8 m murs (couloir de service), 1 m plafond (passerelle, extraction), plancher technique 0,2 m. |
| **Acoustique / audio** | 8 enceintes Genelec 8040 / 8050 ou d.&b. E6 aux sommets, 4 enceintes intermédiaires (centre des arêtes basses) pour la précision à 3 m, 2 subs 12″, 4 transducteurs. Dante + DSP (Q-SYS Core 8 Flex ou Symetrix). RT60 cible 0,6 s : traitement lourd derrière les dalles. |
| **Tracking** | 2 LiDAR (portée 10 m, coins opposés : élimine les occlusions par les spectateurs), 2–4 ToF, capteurs. |
| **Serveur média** | PC principal (RTX PRO 6000 Blackwell, 4 × DP 2.1) + **PC de secours cloné** (hot spare, bascule matricielle Lightware MX2 sur fibre, 15 k€) : à ce prix d'installation, la redondance est due. Mosaic, pas de Quadro Sync (1 GPU). NDI : captation + mur régie. Timecode : LTC en option (couche spectacle). |
| **Montage / démontage** | 10–12 j montage (6–8 techniciens, riggers, électricien, intégrateur LED) dont 2 j mise en service et colorimétrie ; 3 j démontage. 2 semi-remorques (≈ 90 flight cases). |

**Budget 6-L (achat)**

| Poste | Fourchette |
|---|---|
| Dalles murs 144 m² P2.6 (1 800–3 200 €/m²) | 260–460 k€ |
| Dalles plafond 36 m² P3.9 (1 100–2 000 €/m²) | 40–72 k€ |
| Dalles sol 36 m² P3.9 (2 500–4 000 €/m²) | 90–145 k€ |
| Processeurs + distribution fibre + matrice | 40–80 k€ |
| Structure (portique 1,5 t suspendus, passerelles, plancher, porte, 2ᵉ issue, BE, contrôle) | 80–140 k€ |
| PC principal + spare, GPU pro, onduleurs, régie | 25–40 k€ |
| Audio (Dante, DSP, 12 enceintes, subs, tactile) + acoustique | 30–55 k€ |
| Tracking, capteurs, pupitre, tablette, carte mère | 14–23 k€ |
| CVC (30 kW froid, gaines, extraction) | 35–60 k€ |
| Électricité (3×125 A, TGBT, câblage) | 15–30 k€ |
| Sécurité (porte PMR, 2ᵉ issue, BAES, détection, SSI) | 8–15 k€ |
| Installation, mise en service, colorimétrie (70–100 j/h) | 60–100 k€ |
| **Total** | **≈ 700–1 220 k€ → retenir 700–1 200 k€** |
| Location 1 semaine | 100–180 k€ (rarement pertinent à ce gabarit) |

### 4.2 Option projection (6-P) — murs en rétroprojection, sol et plafond frontaux, 16 projecteurs de forte puissance

Même principe que 4-P, projecteurs plus puissants, pods d'angle à 5 m, serveur vidéo renforcé.

| Face | Projecteurs | Géométrie |
|---|---|---|
| **Murs (4)** | **2 par mur en portrait, rétro, soit 8** : Epson EB-PU2010B (10 000 lm, WUXGA, laser) + ELPLU04 / Panasonic PT-RZ120 (12 000 lm, WUXGA, DLP) + ET-DLE085 (0,8:1) / Barco G62-W11 (11 500 lm) + GLD 0,37:1 (UST, réduit le couloir à 1,4 m). Image 3,75 × 6 m par projecteur, recouvrement 1,5 m. | Jet 3 m replié par miroir → 1,8–2,2 m derrière l'écran. Emprise 6 + 2 × 2,5 = 11 m. |
| **Plafond** | **4 × 8 000–10 000 lm** (Epson EB-PU2010B / Panasonic PT-RZ990) + optiques 0,6–0,8:1, dans les pods d'angle à 5 m, pointés vers le plafond. | Aucune ombre. |
| **Sol** | **4 × idem** dans les mêmes pods, pointés vers le sol. | Ombre résiduelle sous les pieds ≤ 25 %. |
| **Total** | **16 projecteurs, 8 × 10–12 k lm + 8 × 8–10 k lm.** | |

| Poste | Spécification |
|---|---|
| **Luminance** | Murs : 2 × 11 000 × 0,55 = 12 100 lm / 36 m² → 107 nits gain 1 → **≈ 90–100 nits à 80 %**. C'est juste : pas de marge pour un gris sombre, on garde une toile gain 1–1,2 et on compte sur l'inter-réflexion maîtrisée par le contenu. Sol/plafond : 4 × 9 000 × 0,4 = 14 400 lm → 127 nits → réglé 70 %. |
| **Résolution** | Murs ≈ 2 000 px / 6 m = 330 px/m (3 mm « pitch ») : correct à 3 m. Option 4K (Epson EB-PU2220B 20 000 lm 4K, Panasonic PT-RQ13K, Barco G100-4K) : +60 % sur le poste projecteurs. Sol/plafond ≈ 200 px/m : **le sol-Lego sera « gros pixel » à 6 m ; c'est acceptable (Lego) mais à montrer au client sur le banc 3 faces.** |
| **Écrans RP** | 4 × 36 m² de toile RP (Gerriets OPERA, Showtex) sur cadres 6 × 6 m en 2 modules, ou acrylique 8 mm (6 × 6 m impossible d'un tenant : joints visibles → toile). Miroirs première surface 2 × 2,5 m ×4. |
| **Warping / blending** | **Obligatoirement caméra** : NVIDIA Warp & Blend + Vioso Anyblend VR&SIM ou Disguise OmniCal si serveur Disguise. Recalibration mensuelle (dérive thermique des optiques) : 2 h. |
| **Sorties GPU / distribution** | 16 flux WUXGA pleine résolution → **2 GPU RTX pro + Quadro Sync II** (8 sorties 4K, 2 flux 1 920×2 160 par sortie, donc WUXGA portrait sans perte) + 8 × Fx4 ; **ou serveur média** (Disguise vx 2 ≈ 70–90 k€ / Pixera four ≈ 50–70 k€) qui reçoit le Chromium en capture 4 × 4K (DeckLink Quad HDMI) et gère warp, blend, redondance et NDI. Recommandation : 2 GPU + Vioso en v1 ; Disguise si l'exploitant exige un outil de show standard. |
| **Puissance** | 8 × 1 000 W + 8 × 700 W = 13,6 kW + PC 2 + audio 1,5 + CVC 8 + régie 1 → **≈ 26 kW**. **3 × 63 A.** |
| **Chaleur dans le cube** | 8 projecteurs de pods (5,6 kW plein, ≈ 4 kW réglés) + 6 personnes → **≈ 5 kW**. Clim **8–10 kW froid**. Couloir technique : 8 × 1 kW = 8 kW → clim 10 kW ou extraction 3 000 m³/h. |
| **Bruit** | Projecteurs 10–12 k lm : 36–40 dB(A) chacun. Pods capotés avec extraction gainée ; cible ≤ 38 dB(A) dans le cube. |
| **Poids** | Ossature 7 m de haut : 3–4 t, auto-porteuse ; pods 4 × 90 kg. Note de calcul obligatoire. |
| **Emprise** | 11 × 11 m, 7,5 m de hauteur libre, passerelles de service à 5 m (pods) et au-dessus du plafond. |
| **Audio / tracking** | Comme 6-L. |
| **Montage / démontage** | 7–8 j montage (6 techniciens) + 2 j calibration ; 2–3 j démontage. 1 semi-remorque. |

**Budget 6-P (achat)**

| Poste | Fourchette |
|---|---|
| 8 projecteurs murs 10–12 000 lm + optiques courtes (15–24 k€) | 120–190 k€ |
| 8 projecteurs sol/plafond 8–10 000 lm + optiques (10–16 k€) | 80–130 k€ |
| Écrans RP 4 × 36 m² + cadres + miroirs | 60–100 k€ |
| Structure (ossature 7 m, pods, passerelles, plancher, vinyle, porte, 2ᵉ issue, BE) | 70–120 k€ |
| Distribution vidéo : 2 GPU + Quadro Sync + 8 × Fx4 + fibre **ou** serveur média | 25–40 k€ **ou** 70–120 k€ |
| PC(s), onduleurs, régie | 15–25 k€ |
| Calibration caméra (Vioso / OmniCal) | 15–30 k€ |
| Audio (Dante, DSP) + transducteurs + acoustique | 25–45 k€ |
| Tracking, capteurs, pupitre, tablette, carte mère | 14–23 k€ |
| CVC (cube 8–10 kW + couloir 10 kW) | 20–35 k€ |
| Électricité (3×63 A) | 10–20 k€ |
| Sécurité | 8–15 k€ |
| Installation + calibration (40–60 j/h) | 45–75 k€ |
| **Total** | **≈ 507–848 k€ (2 GPU) · 552–928 k€ (serveur média) → retenir 500–900 k€** |
| Location 1 semaine | 60–110 k€ |

---

## 5. Tableau de synthèse « équipement par face »

| | 3-L | 3-P | 4-L | 4-P | 6-L | 6-P |
|---|---|---|---|---|---|---|
| Murs | 144 dalles P1.95 | 8 UST portrait, arête haute | 256 dalles P2.6 | 8 rétro portrait | 576 dalles P2.6 | 8 rétro portrait 10–12 k lm |
| Plafond | 36 dalles P2.6 | 2 UST portrait rasants | 64 dalles P2.6 | 4 courte focale (pods) | 144 dalles P3.9 | 4 × 8–10 k lm (pods) |
| Sol | 36 dalles sol P2.6 | 4 courte focale (coins hauts) | 64 dalles sol P2.6 | 4 courte focale (pods) | 144 dalles sol P3.9 | 4 × 8–10 k lm (pods) |
| Projecteurs | — | 14 | — | 16 | — | 16 |
| Mpx rendus | 12,1 | ≈ 14 flux 1080p | 14,2 | 16 flux 1080p | 25,9 | 16 flux WUXGA |
| Sorties GPU | 3 | 4 (+4 Fx4) | 3 | 4 (+4 Fx4) | 4 | 8 (+8 Fx4) ou serveur média |
| Processeurs LED | 3 × MX40 Pro / 1 × MX6000 Pro | — | 2 × MX40 Pro | — | 3 × MX40 Pro / 1 × MX6000 Pro | — |
| Suspendu | 350–400 kg | 0 | ≈ 600 kg | 0 | ≈ 1 300 kg | 0 |
| Crête / moyenne électrique LED | 16 / 5,5 kW | — | 29 / 10 kW | — | 65 / 22 kW | — |
| Puissance totale appelée | ≈ 20 kW | ≈ 9 kW | ≈ 35 kW | ≈ 13,5 kW | ≈ 75 kW | ≈ 26 kW |
| Froid à installer | 8–10 kW | 5–6 kW | 12–15 kW | 5–7 kW (+5 couloir) | 30 kW | 8–10 kW (+10 couloir) |
| Montage / démontage | 4 j / 1,5 j | 3 j / 0,5 j | 6 j / 2 j | 5,5 j / 1,5 j | 10–12 j / 3 j | 9–10 j / 2–3 j |
| **Achat** | **220–340 k€** | **110–210 k€** | **350–600 k€** | **240–400 k€** | **700–1 200 k€** | **500–900 k€** |

---

## 6. Coûts d'exploitation (ordre de grandeur, par an, lieu permanent)

| Poste | 3 m | 4 m | 6 m |
|---|---|---|---|
| Électricité (8 h/j, 300 j, LED / proj.) | 3–5 k€ / 2–3 k€ | 6–10 k€ / 3–5 k€ | 15–25 k€ / 6–10 k€ |
| Maintenance (dalles de rechange 3 %, lasers 20 000 h = 8 ans, filtres, recalibrations) | 4–8 k€ | 8–15 k€ | 20–40 k€ |
| Opérateur (1 ETP par créneau d'ouverture) | selon lieu | selon lieu | 2 ETP |
| Consommables (vinyle de sol tous les 12–18 mois, tissus, filtres) | 1–2 k€ | 2–3 k€ | 4–6 k€ |

---

## 7. Ce que ce document ne couvre pas (à chiffrer séparément)
- Le contenu (développement du jeu, assets, voix, musique) : cf. `roadmap.md`.
- Le local : loyer, mise en conformité ERP, raccordement électrique jusqu'au tableau.
- Transport international et douane (Tunisie : prévoir 10–25 % sur le matériel importé, délais de 6–12 semaines pour la LED).
- L'assurance (valeur à neuf du matériel + responsabilité civile exploitation).
- La billetterie, l'accueil, la file d'attente, la scénographie extérieure du cube (qui fait 50 % de l'expérience en galerie : le sas d'entrée est le premier écran de l'histoire).
