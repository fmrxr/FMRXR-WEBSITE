# Catalogue d'expériences web · `/experiential`

Date : 09/10/2026 · Statut : design validé, spec à relire

## But

Remplacer la page d'attente `/experiential` (« Interactive experiences · Coming soon », hors index) par un catalogue façon Netflix des expériences web créées par FMRXR, **jouables dans la page**. Le portfolio montre des captations, le catalogue laisse le visiteur toucher les systèmes eux-mêmes.

## Décisions prises

| Sujet | Décision |
|---|---|
| Parcours | L'expérience se joue **dans un grand lecteur en haut de page**. Cliquer une carte remplace ce qui joue. Pas de fiche intermédiaire ni de page plein écran séparée |
| Source des fiches | **Registre dans le code** (`src/lib/experiences.ts`), fichiers dans `public/experiences/<slug>/`. Pas de table Supabase : une expérience exige de toute façon un déploiement de fichiers, et la fiche suit le même déploiement que son code |
| ACCESS PROTOCOL | **Version démo** hébergée sur fmrxr.com, sans aucun code promo |
| Sons de SPICY AIRPORT | Accord de Sofi (Spicy Sofi) pour l'usage de « SPICY HOT! », **à condition de le créditer** |

## Catalogue au lancement

| Rangée | Slug | Source | Prérequis |
|---|---|---|---|
| Corps & caméra | `radiance` | `E:\FB ART&EVENT\radiance_cascades_mediapipe (2)\radiance_cascades_final.html`, créée pour SPECTRUM (05/2026) | caméra, ordinateur |
| Jeux | `access-protocol` | `Clients/Morninglory Paris/…/Jeu/game_shotgun/public/` | aucun (son conseillé) |
| Espaces 3D | `spicy-airport` | `spicy-airport/` (Vite + Three.js), rebuild en `base: './'` | ordinateur conseillé, son |
| Espaces 3D | `le-son-de-la-terre` | `Concepts/LeSonDeLaTerre_3D/index.html` (5,9 Mo autoportant) | aucun |
| Labs | `lab-<shader>` | shaders GLSL TouchDesigner portés en WebGL (voir plus bas) | aucun |

Exclus : `tox10_benjemy_tile` et `tox12_benjemy_hilbert` (matière client BENJEMY), et `Concepts/LeSonDeLaTerre_3D/out/` (rendus vidéo, 378 Mo).

## Page `/experiential`

1. **En-tête** : `PageHero` existant (index « Experiential », titre, une phrase).
2. **Lecteur** (`ExperiencePlayer`, client) : cadre 16:9 pleine largeur du conteneur.
   - **État affiche** : poster ou boucle vidéo de l'expérience sélectionnée, titre, pitch, année, rangée, crédits, pastilles de prérequis (« Caméra », « Son », « Ordinateur »), bouton **PLAY**.
   - **État lecture** : `<iframe>` vers `/experiences/<slug>/…`, monté seulement après le clic sur PLAY. `allow="camera; microphone; fullscreen; autoplay; midi"` selon les prérequis déclarés, `loading="eager"`. Barre fine sous le cadre : titre, bouton plein écran (`requestFullscreen` sur le cadre), lien « Ouvrir seule » (nouvel onglet), bouton STOP qui revient à l'état affiche.
   - **Une seule expérience vivante** : changer de sélection démonte l'iframe, ce qui coupe caméra, son et WebGL.
   - Sélection par défaut : l'entrée marquée `featured` (RADIANCE), en état affiche. Rien de lourd ne se charge et aucune autorisation n'est demandée avant le clic.
3. **Rangées** : réutilisent le gabarit de `ProjectRow` (rail horizontal à défilement par snap). Une carte = poster 16:9 + `CardFilm` pour l'aperçu en boucle quand la carte est à l'écran, titre, une ligne. Clic → sélection dans le lecteur en état affiche, défilement doux vers le lecteur, mise à jour de l'URL en `?play=<slug>` (`router.replace`, sans recharger).
4. **Lien profond** : `/experiential?play=<slug>` ouvre la page avec cette expérience sélectionnée, en état affiche. Le navigateur exige un geste de l'utilisateur pour la caméra et le son, d'où le PLAY obligatoire même sur un lien partagé.
5. **Mobile** (< 768 px ou pointeur grossier) : une expérience `desktopOnly` affiche « À vivre sur ordinateur » à la place de PLAY, avec la boucle vidéo en lecture. Les autres se jouent normalement.
6. **SEO** : retirer `robots: { index: false }`. Titre et description propres, `alternates.canonical: "/experiential"`. Ajouter `/experiential` au sitemap s'il n'y est pas.

## Registre `src/lib/experiences.ts`

```ts
export type Experience = {
  slug: string;              // URL ?play= et dossier public/experiences/<slug>/
  title: string;
  row: "body" | "games" | "spaces" | "labs";
  year: number;
  pitch: string;             // une phrase, anglais (langue du site)
  credits: string[];         // ex. "Music: SPICY HOT! by Spicy Sofi, used with permission"
  entry: string;             // chemin de la page jouée, ex. "/experiences/radiance/index.html"
  poster: string;            // jpg 16:9
  preview?: string;          // mp4 boucle courte, muette
  requires: ("camera" | "microphone" | "sound" | "midi")[];
  desktopOnly?: boolean;
  featured?: boolean;
  project?: string;          // slug de fiche projet liée (ex. "spectrum")
};
```

Les libellés des rangées vivent dans le même fichier. Ajouter une expérience = déposer ses fichiers + une entrée.

## Préparation de chaque expérience

**RADIANCE.** Copier `radiance_cascades_final.html` en `public/experiences/radiance/index.html`. Remplacer le chargement local de MediaPipe (`./mediapipe/vision_bundle.mjs` et `./mediapipe/wasm`, 33 Mo) par le CDN jsDelivr en version fixée (`@mediapipe/tasks-vision@0.10.35`, déjà le repli du fichier). Le modèle `hand_landmarker.task` reste chargé depuis storage.googleapis.com. Vérifier que le mode souris fonctionne sans caméra (refus d'autorisation) et que l'écran d'erreur est lisible. Crédit : « Created for SPECTRUM: The Birth of Light, Studio B3, 2026 ». Fiche liée : SPECTRUM.

**ACCESS PROTOCOL (démo).** Copier `game_shotgun/public/` en `public/experiences/access-protocol/`. Dans `game.js` :
- supprimer les trois champs `promo` (codes base64) et le lien `SHOTGUN` ;
- l'écran de victoire affiche « ACCESS GRANTED · Portfolio demo » et un lien vers la fiche projet, à la place du code et du bouton de copie ;
- retirer les balises OpenGraph qui pointent vers `cyberhalloween.netlify.app`, et la clé `localStorage` est renommée pour ne pas croiser celle du vrai jeu.

Ne rien copier depuis `game/` (version caisse), ni `ACCES_BILLETTERIE_CONFIDENTIEL.md`, ni `netlify_CONFIDENTIEL.env`. Contrôle : `grep -ri "promo\|CYBER10\|PIXEL20\|SOFI30\|Q1lC\|UElY\|U09G"` sur le dossier publié doit revenir vide. Crédits : « For Morninglory Paris · Cyberpunk Halloween at 42 Marches, 31/10/2026 ».

**SPICY AIRPORT.** Dans `spicy-airport/`, `vite.config.ts` en `base: './'`, `npm run build`, copier `dist/` (60 Mo) en `public/experiences/spicy-airport/`. Vérifier que les GLB et l'audio se chargent depuis le sous-chemin. Crédits, affichés sur la carte, l'affiche et la barre du lecteur : « SOFI AIRLINES · SPICY COCKPIT universe » et « Music: SPICY HOT! by Spicy Sofi, used with permission ». `requires: ["sound"]`, `midi` non déclaré (le mode `?midi=1` reste hors catalogue).

**Le Son de la Terre.** Copier `index.html` (autoportant) en `public/experiences/le-son-de-la-terre/index.html`. Vérifier sa tenue en 16:9 (le viewer est pensé portrait 9:16, il doit au minimum se centrer proprement).

**Labs · lecteur de shaders.** Une page unique `public/experiences/labs/index.html?s=<shader>` : canvas WebGL2 plein cadre, une passe, uniforms TouchDesigner simulés (`uTime`/`u_time`, `u_aspect`, résolution, vec4 de paramètres avec des valeurs par défaut relevées dans les `.tox` ou réglées à l'œil), nom du shader et légende discrète. Shaders du lancement, une passe seulement :
- `phyllotaxis_grid` (un aperçu web existe déjà : `EFFET MÈRE/Shaders/phyllotaxis_grid_preview.html`)
- `tox13_depth_tunnel`
- `tox4_bouncing_bars`
- `tox8_lightpos_noise`

Hors lancement : `tox6_curl_feedback` et `tox7_curl_double_advect` (feedback multipasse), et le shader des 100 Violons (audio-réactif, demande une entrée micro ou un signal simulé). Chaque shader est une entrée du registre (`lab-phyllotaxis`, etc.), avec la même `entry` et un `?s=` différent.

**Affiches et aperçus.** Pour chaque expérience : un poster jpg 16:9 et une boucle mp4 de 6 à 8 s, muette, sous 1,5 Mo, capturés avec Playwright depuis la version locale. RADIANCE est capturée en mode souris.

## Mesure

Ajouter dans `src/lib/track.ts` un événement `experience_play` (paramètre `experience: slug`) envoyé au clic sur PLAY, et `experience_select` au clic sur une carte. Même canal GA4 que `cta_click`.

## Erreurs et cas limites

- Refus de la caméra (RADIANCE) : l'expérience gère déjà un mode souris, à vérifier dans l'iframe.
- Navigateur sans WebGL2 : chaque page d'expérience affiche son propre message. Le lecteur ne détecte rien lui-même.
- `?play=` inconnu : on retombe sur l'entrée `featured`, sans erreur.
- Iframe et en-têtes : les pages sont servies depuis le même domaine. Vérifier qu'aucun en-tête `X-Frame-Options` ou CSP du site ne bloque le cadrage de `/experiences/*`.

## Hors périmètre

Fiche détaillée par expérience, comptes visiteurs, favoris, commentaires, table Supabase, admin d'édition, version arabe. Le shader des 100 Violons et les shaders à feedback viendront dans un second temps.

## Vérification

- `npm run build` sans erreur, lint propre.
- Pour chaque expérience, dans le panneau navigateur : la carte sélectionne, PLAY monte l'iframe, l'expérience tourne, STOP et le changement de sélection démontent l'iframe (plus de caméra active), le plein écran marche, le lien `?play=` restaure la sélection.
- Mobile (375 px) : rangées défilantes, message « À vivre sur ordinateur » pour RADIANCE.
- Contrôle `grep` des codes promo vide sur `public/experiences/access-protocol/`.
- Après déploiement Hostinger : vérifier la page réelle avant d'annoncer quoi que ce soit (délai de tirage de plusieurs minutes constaté).

## Points ouverts pour Haïfa

- Statut de diffusion de RADIANCE : accord de FB Art & Event nécessaire pour la publier hors SPECTRUM ?
- Morninglory : accord pour publier la démo d'ACCESS PROTOCOL avant le 31/10, ou après seulement.
- Libellés des rangées en anglais (langue du site) : « Body & camera », « Games », « 3D spaces », « Labs · live shaders ».
