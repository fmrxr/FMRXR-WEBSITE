# L'ASSEMBLEUR — prototype jouable 360 / WebXR

Prototype de l'Acte 3, scène 1 (« L'illumination ») et de la mécanique ASSEMBLER, d'après `bible_v1.md` et `decisions_v1.md`.

- **Un seul fichier** : `index.html`, autonome. Three.js `0.160.0` est chargé depuis jsDelivr par importmap (aucun build, aucun npm).
- **Tout est procédural** : textures des 6 faces, sprites, textes, halos et sons sont générés au chargement (aucun fichier image/audio).
- **Ouverture** : double-cliquer sur `index.html` suffit pour le mode desktop. Pour la VR (WebXR) il faut servir le fichier en **HTTPS** (ou `http://localhost`).

## Ce que fait le prototype

| Élément | Détail |
|---|---|
| Pièce cubique | 4,4 m de côté, le joueur au centre. **Sol** = l'enfance (carte mère + tenons Lego). **Plafond** = le Noyau (noir, se révèle à la fin). **4 murs** = zones du schéma : avant *Les Recruteurs*, droite *Les Guides*, arrière *Les Cellules*, gauche *Les Sous-groupes*. |
| Séquence « L'illumination » | ~68 s. TRACE parle en 3D (panneaux ancrés dans l'espace, placés dans la direction du regard), le sol s'allume, les 10 composants apparaissent un à un, puis le schéma se dessine sur les murs. Skippable : bouton *Passer l'intro*, touche `Échap` ou `Espace`, gâchette latérale (*squeeze*) en VR. |
| Mécanique ASSEMBLER | 10 nœuds flottants : `ilyes_94`, `kernel_panic`, `GHOSTWIRE`, `sable`, `null`, SENTINEL, moth, La Toile Libre, `facture_2017.pdf`, `16.03.2016`. On vise un nœud puis un autre. 10 liens corrects sont définis (objet `CORRECT` dans le code) : lien qui s'allume + phrase de TRACE + portion de mur révélée. Lien faux : lien rouge qui s'éteint, flash, **−10 s**. À **5 liens corrects**, le plafond (le Noyau, « un œil ouvert dans un nœud de fils », NŒUD ZÉRO) apparaît et la phrase de fin s'affiche. |
| Compte à rebours « l'avance » | 5 minutes. Existe en 2D (HUD, desktop) **et** en 3D (panneau ancré devant, en bas, visible en VR). À zéro : « L'avance est perdue ». |
| Navigation | Desktop : glisser à la souris / au doigt pour regarder autour (orbite depuis le centre), clic sur un nœud. VR : bouton *Entrer en VR* (affiché seulement si `navigator.xr` et `immersive-vr` sont disponibles), rayon des contrôleurs, *select* = viser. |
| Son | Nappe grave + bips procéduraux (WebAudio), démarre au clic *Commencer*. Bouton ♪ ou touche `m` pour couper. |
| Avertissement | « Expérience immersive. Lumières clignotantes possibles. » sur l'écran d'accueil. |

Les 20 répliques de TRACE sont regroupées en tête du script (objet `T` et objet `CORRECT`) : faciles à réécrire.

## Paramètres d'URL

| URL | Effet |
|---|---|
| `index.html` | Mode desktop / VR, écran d'accueil. |
| `index.html?mode=cube&face=front` | Rend **une seule face** à 90° de FOV, carrée, centrée plein écran, fond noir autour. Faces : `front`, `back`, `left`, `right`, `up`, `down`. Démarre automatiquement (pas d'écran d'accueil). C'est ce qui servira pour envoyer chaque face à un projecteur/écran de la chambre-cube (phase 2). |
| `index.html?mode=cubemap` | Les 6 faces en **grille en croix** (4 × 3) pour vérification, avec étiquettes. |
| `&skip=1` | Saute l'ouverture : tout est allumé, le compte à rebours tourne. |
| `&autostart=1` | Démarre sans écran d'accueil en mode desktop (sans son, faute de geste utilisateur). |

Orientation des faces `up`/`down` : le haut de l'image `up` est du côté du mur arrière (comme quand on lève la tête en regardant devant), le haut de l'image `down` est du côté du mur avant. À ajuster dans `FACE_DEFS` selon le montage physique. En mode cube, chaque face est un navigateur indépendant : la synchronisation entre les 6 instances (horloge commune, état partagé) n'est **pas** faite dans ce prototype.

## Intégration dans Webflow (iframe)

1. Héberger `index.html` sur un hôte HTTPS (le site EphemerXR, Netlify, GitHub Pages, un sous-domaine…). Le fichier n'a aucune dépendance locale : seul Three.js est chargé depuis `cdn.jsdelivr.net`.
2. Dans Webflow, ajouter un élément **Embed** (code HTML) avec :

```html
<iframe
  src="https://VOTRE-HOTE/chemin/index.html"
  width="100%" height="720"
  style="border:0;display:block;background:#04060a"
  allow="xr-spatial-tracking; fullscreen; autoplay"
  allowfullscreen
  title="L'ASSEMBLEUR — prototype 360">
</iframe>
```

- `allow="xr-spatial-tracking"` est **indispensable** pour que le bouton *Entrer en VR* fonctionne dans une iframe (sinon WebXR est bloqué par la politique de permissions et le bouton est simplement masqué).
- Page et iframe doivent être en HTTPS (WebXR l'exige).
- Sur Quest 3 : ouvrir la page Webflow dans le navigateur du casque, cliquer *Commencer* puis *Entrer en VR*. L'espace de référence est `local-floor` (le sol virtuel est à 0,6 m sous les pieds, le centre du cube à hauteur des yeux).
- Sur un iframe, le son démarre au clic sur *Commencer* (geste utilisateur dans l'iframe) : rien à faire côté Webflow.

## Performance

- Pas de lumière, pas d'ombre, pas de post-traitement : matériaux `MeshBasicMaterial` + un petit shader pour les 6 faces (textures 512 × 512 générées en Canvas). Une vingtaine de draw calls au total.
- `devicePixelRatio` plafonné à 2 en desktop. En VR, Three.js utilise le framebuffer natif du casque.
- Mode `cubemap` = 6 rendus par image, réservé à la vérification.

## Tests effectués

Chromium headless (Playwright, rendu logiciel SwiftShader) : aucune erreur console ni erreur de page en mode desktop (accueil, ouverture, jeu, 5 liens, fin), en mode `cube` (front, right, up, down) et en mode `cubemap`. Mécanique vérifiée : lien correct (+1), lien faux (−10 s), sélection par clic souris réel, victoire à 5 liens avec apparition du plafond. Captures dans `captures/`.

Non testé ici (impossible en headless) : la session WebXR réelle (casque), le tactile sur mobile, le son, et le vrai débit d'images GPU. Le code WebXR suit le schéma standard Three.js (`VRButton`, `renderer.xr.getController`, `local-floor`).

## Pistes immédiates

- Synchroniser les 6 instances en mode cube (horloge partagée via WebSocket ou `BroadcastChannel` si même machine).
- Remplacer les bips par les sons de la bible (wizz MSN, modem 56k, ventilateurs).
- Voix de TRACE (TTS ou enregistrement) et spatialisation.
- Enrichir le schéma : plus de composants, plusieurs vagues, liens qui en débloquent d'autres.
