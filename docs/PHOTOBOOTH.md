# Photobooth IA — V2

Borne de portraits IA par campagne, avec quota d'images vérifié en base avant tout appel payant.

## Parcours

`/experience/photobooth/<slug>?k=<clé>` : accueil, caméra (seulement après « Commencer »), scan de calibrage, 3 questions par geste (MediaPipe, en local) avec repli au toucher, direction visuelle, photo, confirmation, génération Higgsfield, résultat téléchargeable. Retour à l'accueil après 90 s sans action. FR / EN / AR (RTL).

## Architecture

| Pièce | Où |
|---|---|
| Borne | `src/app/experience/photobooth/[slug]/` |
| API serveur (Node, Hostinger) | `src/app/api/photobooth/{generate,status/[id],download/[id]}` |
| Logique | `src/lib/photobooth/` : `config` (textes, questions, modèle), `mood` (moteur déterministe), `gestures`, `higgsfield` (adaptateur), `service` (orchestration), `server` (Supabase service-role) |
| Admin | `/admin/photobooth` (rôle admin uniquement) |
| Base | `supabase/migrations/0017_photobooth.sql` |
| MediaPipe | `public/photobooth/mediapipe/` (wasm + `gesture_recognizer.task`, hébergés sur le site, version npm 1.0.1) |

Pas d'Edge Functions : fmrxr.com tourne déjà en Node chez Hostinger, les routes Next suffisent.

## Règle des quotas

`photobooth_reserve()` verrouille la ligne de campagne (`FOR UPDATE`) puis vérifie : statut, dates, quota, quota du jour, budget, générations simultanées, clé d'idempotence. Sans réservation réussie, aucun appel Higgsfield. Prouvé par `src/test/photobooth.test.ts` (simulé) et `src/test/photobooth-db.test.ts` (20 demandes simultanées pour 3 places, en base réelle).

`restant = quota − réussies − réservations actives`

| État | Effet sur le quota |
|---|---|
| reserved / processing | occupe une place |
| unknown (timeout, crash) | occupe une place jusqu'à vérification |
| succeeded | consomme la place |
| failed / cancelled | libère la place (Higgsfield ne facture pas failed / nsfw / canceled) |

Une même photo confirmée porte une clé d'idempotence : double clic, rechargement ou réseau qui rejoue ne lancent jamais une deuxième image. L'identifiant de la ligne sert aussi d'`Idempotency-Key` chez Higgsfield.

Budget : chaque image réserve le « coût réservé par image » réglé dans l'admin (estimation). Le coût réel est dans la console Higgsfield ; Flare et Sunburst sont facturés aux tokens, donc le coût exact n'est connu qu'après coup.

## Modèles (`config.model`)

| Clé | Endpoint | Max | Coût mesuré (estimate API, 15/10/2026) |
|---|---|---|---|
| `flare` (défaut) | `/marketing-studio/image/flare` | 4k, quality `max`, 16 refs | aux tokens : image en sortie 30 $ / M tokens |
| `sunburst` | `/marketing-studio/image/sunburst` | idem | idem |
| `grok` | `/xai/grok-imagine-image-2.0` | 2k | 0,09 $ (2k) |
| `qwen` | `/alibaba/qwen-image-3/edit` | 2k | 0,04 $ (1k) · 0,075 $ (2k) |

## Mise en service

1. **Migration** : coller `supabase/migrations/0017_photobooth.sql` dans l'éditeur SQL Supabase et exécuter.
2. **Hostinger** : ajouter `HF_API_KEY_ID` et `HF_API_KEY_SECRET` dans les variables d'environnement (jamais `NEXT_PUBLIC_`), **puis redéployer** : une variable ajoutée n'est lue qu'au déploiement suivant. Vérification sans frais : `GET /api/photobooth/status/00000000-0000-4000-8000-000000000000?session=x` répond `PROVIDER_NOT_CONFIGURED` (503) tant que la clé manque, `not_found` (404) quand elle est vue.
3. Pousser le code, attendre que Hostinger l'ait tiré.
4. `/admin/photobooth` → nouvelle campagne → statut Active → « Copier le lien ».
5. Vérifier : `npx dotenv -e .env.local -- npm test` (les tests en base ne tournent qu'une fois la migration appliquée).

## Données personnelles

- Gestes analysés sur l'appareil, jamais envoyés.
- Pas de détection de visage, pas d'émotion déduite : l'ambiance vient uniquement des réponses.
- La photo confirmée est envoyée au stockage Higgsfield, puis au modèle. Fournisseur tiers : le dire au client et dans les mentions de l'événement.
- Le site ne stocke ni la photo ni le portrait. Le portrait reste chez Higgsfield (au moins 7 jours) et passe par `/api/photobooth/download` (même origine, session vérifiée).
- La base ne garde que : session aléatoire, ambiance choisie, état, identifiant de job.

## V2 (15/10/2026)

**Espace client `/client`.** Le client se connecte sur `/auth` et voit, en lecture seule, ses campagnes : forfait, réalisés, restants, jour, dates, état, lien de la borne, dernières générations. Ni portraits, ni budget, ni réglages. Accès donné et retiré depuis la fiche campagne de l'admin (compte créé avec mot de passe temporaire affiché une seule fois, comme `/admin/team`).

⚠️ **Un client n'a aucun rôle dans `user_roles`.** Les tables de `/collab` sont ouvertes à tout compte qui porte un rôle (`has_any_role`, migration 0012) : un rôle « client » y aurait donné accès. Le client est seulement membre de campagnes (`photobooth_campaign_members`), et le serveur vérifie l'appartenance à chaque page. `landingFor()` (`src/lib/auth.ts`) l'envoie sur `/client` après connexion. Testé par `src/test/photobooth-v2-db.test.ts`.

**QR de partage.** Sur l'écran résultat, un QR ouvre `/experience/photobooth/share/<jeton>` sur le téléphone : portrait + téléchargement, 7 jours. Jeton de 128 bits distinct de l'identifiant interne. Le QR pointe toujours vers `https://fmrxr.com` (surcharge : `PHOTOBOOTH_SHARE_ORIGIN`), donc il ne marche qu'une fois le code déployé. Désactivable par campagne (`shareEnabled`).

**Éditeur visuel.** Le formulaire de campagne édite textes (par langue), langues, logo, modèle, résolution, qualité, format, compte à rebours, partage, direction visuelle et les 3 questions (gestes, libellés, mots du titre, palette, fragments de prompt). Validation en direct avec le schéma du serveur. JSON accessible en mode avancé.

**Galerie admin** `/admin/photobooth/<id>/galerie` : portraits réussis, téléchargement. Images relayées par `/api/photobooth/image/<id>` (admin vérifié dans la route).

Migration : `0018_photobooth_v2.sql` (appliquée le 15/10/2026).

## Gestes : calibrage (15/10/2026)

La borne utilise le modèle officiel **GestureRecognizer** de MediaPipe (`Open_Palm`, `Closed_Fist`, `Thumb_Up`, `Victory`), plus une vérification géométrique de la main (`src/lib/photobooth/gestures.ts`, `decideGesture`).

Calibré sur les images de test officielles MediaPipe (`src/test/fixtures/hands.json`), en 9 variantes chacune : miroir, rotation ±25°, main petite, très petite, sombre à 60 et 80 %, basse résolution.

- Bonne catégorie dans 40 cas sur 45, **aucune confusion entre deux de nos gestes**. Refus : main minuscule, poing dans le noir à 80 %, signe de paix incliné de −25°.
- Scores corrects : de 0,48 à 0,95. La main ouverte est la plus faible : 0,53 à 0,69.
- Règle retenue : score ≥ **0,50**, ou bien score ≥ 0,35 et géométrie concordante. Le geste doit être tenu **900 ms**. Les deux valeurs se règlent par campagne.
- Pointer l'index ne répond à rien.

Vérifié dans la borne réelle avec une caméra simulée à partir de ces photos : les 3 questions répondues **par gestes seuls**, en 8 à 12 s, sur ordinateur (31 analyses/s) et sur mobile émulé (Android, tactile, 15 analyses/s, bridé volontairement). Squelette aligné sur la main malgré recadrage et miroir. La main ouverte n'est pas reconnue si les doigts sortent du cadre : la consigne demande « la main entière dans l'image ».

**Sur place :** ouvrir la borne avec `&debug=1` → panneau de calibrage (squelette, catégorie et score, geste retenu, images analysées par seconde, lumière, imprimante). Sous 55/255 de lumière, la borne affiche une consigne d'éclairage.

## Impression

Deux modes par campagne (admin → Impression) :

- **Agent local** (recommandé) : `tools/photobooth-print-agent/`. Il détecte les imprimantes (prête, hors ligne, erreur papier selon le pilote) et imprime sans dialogue, plein papier. Voir son README.
- **Navigateur** : boîte d'impression du système, page CSS au format choisi, seul le portrait est imprimé. Aucune détection possible depuis une page web. Silencieux avec Chrome `--kiosk --kiosk-printing`. C'est le seul mode possible sur tablette (AirPrint, Mopria).

Limite d'impressions par portrait (1 par défaut). L'écran d'accueil montre l'état de l'imprimante à l'équipe.

## Mobile

Vérifié en émulation Android (Chromium, 412 × 915, tactile) : parcours complet par gestes, pas de débordement horizontal, impression désactivée proprement sans agent. **Non vérifié** : Safari iOS sur un vrai iPhone ou iPad, et les vraies caméras de téléphone. À faire sur un appareil avant un événement.

## Styles (15/10/2026)

14 styles (`src/lib/photobooth/styles.ts`), activés par campagne dans le CMS (« Styles proposés au visiteur »). Un seul style coché : pas d'écran de choix ; plusieurs : écran « Choisissez votre style » dans la borne, après le choix portrait/groupe.

- **Éditoriaux (visage exact)** : Mood Portrait, Film argentique, Polaroid, Couverture magazine, Affiche de film, Carte à collectionner. Prompt verrouillé (seuls lumière, décor, étalonnage, finition changent).
- **Transformations (ressemblance reconnaissable, pas exacte)** : Voyage dans le temps 70s, Anime, Pop art, Peinture à l'huile, Figurine 3D, Pâte à modeler, Super-héros, Cyberpunk. Ni personnage existant, ni marque, ni célébrité.
- **Mises en page** (Polaroid, magazine, affiche, carte) : composées par le serveur après génération (`layouts.ts`, sharp + polices Geist embarquées, OFL, `public/photobooth/fonts/`). Le texte n'est jamais demandé à l'IA. Les mises en page en arabe tombent sur l'anglais (police latine).
- Écartés : portrait animé (modèle vidéo), échange de visage sur un personnage existant (risque juridique).

Page vitrine `/photobooth`, appel à l'action sur l'accueil et sur `/experiences` (`PhotoboothCTA`), vers le brief prérempli `/start?ref=photobooth`.

## Limites connues

- Limite de débit par IP en mémoire (un seul processus Node). Les vrais plafonds sont en base.
- Les portraits ne sont pas copiés chez nous : après 7 jours, galerie et partage peuvent perdre l'image (rétention Higgsfield).
- Une réservation `unknown` se libère à la main dans l'admin après vérification dans la console Higgsfield ; le bouton « Vérifier les générations en cours » interroge Higgsfield pour les autres.
