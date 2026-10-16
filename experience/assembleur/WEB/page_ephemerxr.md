# PAGE SITE EPHEMERXR — *L'ASSEMBLEUR*
*Copy prête à intégrer dans Webflow. Structure en sections. FR, version EN à produire après validation.*

---

## SECTION 1 — HERO

**Titre :** L'ASSEMBLEUR
**Sous-titre :** Une expérience narrative à 360°. Vous êtes à l'intérieur de sa mémoire.

**Accroche (3 lignes) :**
Il a appris à monter des ordinateurs comme des Lego.
On l'a monté comme une arme.
Il a gardé une trace de tout.

**CTA principal :** Entrer dans l'archive → *(lien vers le prototype WebXR en iframe ou page dédiée)*
**CTA secondaire :** Jouer dans le Cube → *(formulaire réservation / partenaires)*

**Mention discrète :** Casque VR recommandé. Jouable aussi au clavier et à la souris. Lumières clignotantes possibles.

---

## SECTION 2 — LE CONCEPT

**Titre :** Le réel n'est pas représenté. Il est reconstitué.

Ilyes a grandi dans les années 2000, un tournevis à la main, une carte mère sur les genoux. Son père, ingénieur, lui a appris que tout est assemblage. Adolescent dans un pays où Internet lui fermait ses portes, il a appris à les forcer. Puis il a rencontré ceux qui se disaient les sauveurs de la toile.

Pendant dix ans, il a cru être un activiste. Il était un composant.

Mais une part de lui a résisté. Elle a tout archivé : chaque pseudo, chaque message, chaque logo. Et elle a construit TRACE, une intelligence artificielle qui relie ce que lui ne pouvait plus voir.

Le jour où TRACE connecte la base, le schéma complet s'illumine. Pour la première fois, Ilyes a de l'avance.

Vous entrez à ce moment précis.

---

## SECTION 3 — L'EXPÉRIENCE

**Titre :** Six faces. Une mémoire.

Trois colonnes :

**ASSEMBLER**
Des fragments flottent autour de vous : pseudos, dates, fichiers, visages sans nom. Reliez-les. Chaque lien juste révèle une portion de l'organisation. Chaque lien faux vous coûte du temps.

**REVIVRE**
Explorez dix ans d'emprise, plateforme par plateforme. MSN, Skyblog, mIRC, les forums, les cellules. Vous ferez les choix qu'il a faits. Vous sentirez pourquoi il les a faits.

**DÉMONTER**
L'avance s'érode. Chaque action visible rapproche le moment où ils comprennent. Retournez chaque composant de l'organisation contre elle, jusqu'au Noyau que personne n'a jamais vu.

---

## SECTION 4 — LES FORMATS

**Titre :** Deux façons d'entrer.

**Casque VR** *(disponible)*
Depuis votre navigateur, sans installation. Compatible Meta Quest, PC VR, et mode écran classique.

**Le Cube** *(en production)*
Une chambre immersive à six faces. Sol, plafond, quatre murs. Une porte. Vous entrez, on ferme. L'archive vous entoure physiquement. Conçu pour festivals, galeries, institutions.
→ Fiche technique et gabarits disponibles pour les lieux partenaires.

---

## SECTION 5 — POURQUOI CE PROJET

**Titre :** Une génération, une faille.

Ceux qui ont eu quinze ans en 2009 ont appris le monde par l'écran : MSN, Skyblog, les cybercafés, les coupures, les sites bloqués selon le pays de naissance. Cette génération a produit des bâtisseurs. Elle a aussi produit des cibles.

*L'Assembleur* ne raconte pas un hacker. Il raconte comment un talent se fait retourner, et comment une mémoire peut se reconstruire de l'extérieur.

C'est une fiction. Les mécanismes d'emprise qu'elle décrit ne le sont pas.

---

## SECTION 6 — CRÉDITS & CONTACT

**Production :** FMRXR Studio
**Direction créative :** Haïfa Becheikh
**Univers artistique :** EFFET MÈRE
**Expérimentation & communauté :** EXPLAB

**Partenaires, lieux, programmateurs :** fmrxr.studio@gmail.com · +216 56 930 469

---

## SEO

**Meta titre (≤60) :** L'Assembleur — expérience narrative 360 | FMRXR Studio
**Meta description (≤160) :** Jeu d'histoire immersif en VR et chambre-cube à six faces. Entrez dans la mémoire d'un homme qui a tout archivé pour se reconstruire. Par FMRXR Studio, Tunis.
**Mots-clés :** immersive installation, interactive narrative, VR experience, projection mapping, CAVE, new media art Tunisia, FMRXR Studio, EFFET MÈRE, generative art, 360 storytelling

---

## INTÉGRATION WEBFLOW — NOTES

- Le prototype WebXR s'embarque en `<iframe>` (élément Embed Webflow) avec les attributs `allow="xr-spatial-tracking; fullscreen"` et `allowfullscreen`. Sans ces attributs, le bouton VR ne fonctionnera pas dans l'iframe.
- Hébergement du prototype : Netlify ou GitHub Pages (HTTPS obligatoire pour WebXR). Webflow ne sert pas de fichiers HTML arbitraires.
- Prévoir une page dédiée plein écran `/assembleur/play` en plus de l'iframe de présentation, pour l'expérience casque.
- Mode Cube : chaque face est une URL (`?mode=cube&face=front` etc.), donc un simple navigateur plein écran par sortie vidéo suffit pour les premiers tests.
