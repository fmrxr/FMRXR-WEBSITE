// Contenu de demonstration pour les concepts de reel Live Wall.
// Les cartes reprennent la forme reelle du produit (skin « memory ») :
// papier colore, bande de scotch, texte, auteur, coeur et commentaires.
// Les traces de dessin suivent le type Stroke du produit : points a plat
// x,y exprimes en 0..1000.

export const PALETTE = ["#fff4b8", "#ffd6e0", "#cdeccf", "#d5e4ff", "#ffe2c4", "#e7dcff"];

export const STICKERS = [
  "01_logo", "02_mark-circle", "07_badge-ring", "12_reality-is-generated",
  "14_emotional-data", "21_live", "22_now-showing", "23_signal-ok",
  "28_60fps", "45_generated-room", "46_point-cloud", "48_spectrum",
].map((f) => ({ id: f.replace(/^\d+_/, ""), url: `stickers/${f}.webp` }));

// Un coeur trace a la main, en un seul geste.
const HEART = [{
  c: "#e64f6a", w: 26,
  p: [500, 880, 380, 760, 260, 650, 180, 540, 160, 430, 200, 340, 290, 290, 390, 310, 460, 380, 500, 450,
      540, 380, 610, 310, 710, 290, 800, 340, 840, 430, 820, 540, 740, 650, 620, 760, 500, 880],
}];

// Un soleil : disque puis rayons.
const SUN = [
  { c: "#f0a33c", w: 22, p: [500, 290, 610, 330, 680, 430, 680, 560, 610, 660, 500, 700, 390, 660, 320, 560, 320, 430, 390, 330, 500, 290] },
  { c: "#f0a33c", w: 16, p: [500, 210, 500, 120] },
  { c: "#f0a33c", w: 16, p: [500, 780, 500, 870] },
  { c: "#f0a33c", w: 16, p: [220, 495, 120, 495] },
  { c: "#f0a33c", w: 16, p: [780, 495, 880, 495] },
  { c: "#f0a33c", w: 16, p: [300, 300, 220, 220] },
  { c: "#f0a33c", w: 16, p: [700, 690, 780, 770] },
  { c: "#f0a33c", w: 16, p: [700, 300, 780, 220] },
  { c: "#f0a33c", w: 16, p: [300, 690, 220, 770] },
];

/**
 * Lisse une suite de points de controle en passant exactement par chacun
 * (Catmull-Rom). Une ecriture a la main est faite de courbes, pas de
 * segments : poser les points a la main et les relier droit donnait des
 * lettres cassees, illisibles.
 */
function smooth(pts, per = 9) {
  const P = (i) => pts[Math.max(0, Math.min(pts.length - 1, i))];
  const out = [];
  for (let i = 0; i < pts.length - 1; i++) {
    const [a, b, c, d] = [P(i - 1), P(i), P(i + 1), P(i + 2)];
    for (let s = 0; s < per; s++) {
      const t = s / per, t2 = t * t, t3 = t2 * t;
      for (let k = 0; k < 2; k++) {
        out.push(Math.round(0.5 * (2 * b[k] + (-a[k] + c[k]) * t
          + (2 * a[k] - 5 * b[k] + 4 * c[k] - d[k]) * t2
          + (-a[k] + 3 * b[k] - 3 * c[k] + d[k]) * t3)));
      }
    }
  }
  out.push(pts[pts.length - 1][0], pts[pts.length - 1][1]);
  return out;
}

// « merci » en cursive, d'un seul geste : ligne de base a y = 620, hauteur
// d'x au dessus de y = 470. Le point du i est le seul lever de stylo.
const MERCI_TRACE = [
  // m, trois arches
  [120, 625], [134, 522], [166, 468], [196, 520], [206, 620],
  [218, 520], [248, 468], [278, 522], [288, 620],
  [300, 520], [330, 468], [358, 532], [368, 614],
  // e, boucle
  [398, 562], [432, 524], [456, 482], [440, 460], [406, 476],
  [386, 521], [383, 572], [401, 610], [436, 619], [466, 596],
  // r, epaule
  [491, 521], [501, 479], [521, 496], [546, 477], [561, 501],
  [559, 561], [566, 611],
  // c
  [601, 559], [641, 500], [661, 477], [641, 464], [606, 478],
  [586, 521], [589, 576], [616, 613], [656, 613], [686, 590],
  // i et sortie
  [706, 529], [719, 477], [727, 541], [731, 601], [756, 619],
  [801, 600], [848, 563],
];
const MERCI = [
  { c: "#2b2a33", w: 17, p: smooth(MERCI_TRACE) },
  { c: "#2b2a33", w: 21, p: [722, 414, 725, 423] }, // le point du i
];

// Une signature, format allonge (rapport 2,4).
const SIGN = [{
  c: "#1b2a4a", w: 16,
  p: [60, 620, 110, 380, 150, 600, 210, 330, 250, 600, 320, 420, 360, 560, 430, 360, 470, 580,
      540, 420, 600, 560, 680, 380, 730, 560, 800, 430, 870, 520, 940, 400],
}];

const C = (i) => PALETTE[i % PALETTE.length];

/** Les contributions de la soiree du Nouvel An, dans l'ordre d'arrivee. */
export const POSTS = [
  { id: "p01", kind: "text", author: "Lina", body: "Bonne année à vous tous, quelle nuit", color: C(0), likes: 34, comments: 3, stickers: [{ id: "live", x: 0.84, y: 0.16, s: 0.3, r: 9 }] },
  { id: "p02", kind: "text", author: "Karim", body: "Happy New Year everyone", color: C(3), likes: 21, comments: 1, stickers: [] },
  { id: "p03", kind: "drawing", author: "Ines", body: "Pour 2027", strokes: HEART, color: "#ffffff", likes: 48, comments: 5, stickers: [] },
  { id: "p04", kind: "text", author: "سامي", body: "كل عام وأنتم بخير", color: C(2), likes: 29, comments: 2, rtl: true, stickers: [] },
  { id: "p05", kind: "text", author: "Yasmine", body: "Minuit avec vous, rien de mieux", color: C(1), likes: 41, comments: 4, stickers: [{ id: "badge-ring", x: 0.15, y: 0.82, s: 0.26, r: -12 }] },
  { id: "p06", kind: "signature", author: "Dr. Haddad", strokes: SIGN, color: "#ffffff", likes: 17, comments: 0, stickers: [] },
  { id: "p07", kind: "text", author: "Mehdi", body: "2027 commence très bien", color: C(4), likes: 26, comments: 2, stickers: [] },
  { id: "p08", kind: "drawing", author: "Nour", body: "", strokes: SUN, color: "#ffffff", likes: 33, comments: 1, stickers: [] },
  { id: "p09", kind: "text", author: "Sarra", body: "Cheers to the new year", color: C(5), likes: 19, comments: 0, stickers: [{ id: "emotional-data", x: 0.78, y: 0.84, s: 0.34, r: 6 }] },
  { id: "p10", kind: "text", author: "Anis", body: "On remet ça le 31 décembre 2027 ?", color: C(0), likes: 24, comments: 6, stickers: [] },
  { id: "p11", kind: "drawing", author: "Rim", body: "", strokes: MERCI, color: "#ffffff", likes: 52, comments: 3, stickers: [] },
  { id: "p12", kind: "text", author: "ليلى", body: "سنة سعيدة للجميع", color: C(2), likes: 15, comments: 1, rtl: true, stickers: [] },
  { id: "p13", kind: "text", author: "Table 7", body: "La table 7 vous souhaite le meilleur", color: C(3), likes: 38, comments: 7, stickers: [{ id: "now-showing", x: 0.2, y: 0.18, s: 0.32, r: -7 }] },
  { id: "p14", kind: "text", author: "Olfa", body: "See you in 2027", color: C(1), likes: 12, comments: 0, stickers: [] },
  { id: "p15", kind: "text", author: "Zied", body: "Une année finit, une image reste", color: C(4), likes: 44, comments: 2, stickers: [] },
  { id: "p16", kind: "text", author: "Amal", body: "Que ça continue comme ça", color: C(5), likes: 11, comments: 0, stickers: [{ id: "spectrum", x: 0.82, y: 0.8, s: 0.28, r: 14 }] },
  { id: "p17", kind: "text", author: "Hichem", body: "Le mur est une super idée, bravo", color: C(0), likes: 27, comments: 3, stickers: [] },
  { id: "p18", kind: "text", author: "Emna", body: "Première soirée de l’année, déjà la meilleure", color: C(2), likes: 31, comments: 1, stickers: [] },
  { id: "p19", kind: "text", author: "Walid", body: "Thank you for tonight", color: C(3), likes: 9, comments: 0, stickers: [] },
  { id: "p20", kind: "text", author: "Sonia", body: "On a tous écrit la même chose : merci", color: C(1), likes: 36, comments: 4, stickers: [{ id: "mark-circle", x: 0.16, y: 0.8, s: 0.22, r: -5 }] },
  { id: "p21", kind: "text", author: "Fares", body: "Quelle ambiance", color: C(2), likes: 8, comments: 0, stickers: [] },
  // Aucun nom de client dans les messages : le meme jeu de donnees sert a
  // la demonstration publique FMRXR et a la presentation client.
  { id: "p22", kind: "text", author: "Dorra", body: "Merci pour l’organisation, c’était parfait", color: C(4), likes: 22, comments: 1, stickers: [] },
  { id: "p23", kind: "text", author: "أمين", body: "ليلة لا تُنسى", color: C(0), likes: 14, comments: 0, rtl: true, stickers: [] },
  { id: "p24", kind: "text", author: "Nadia", body: "Le compte à rebours, et puis vous", color: C(3), likes: 40, comments: 5, stickers: [] },
  { id: "p25", kind: "text", author: "Bilel", body: "Bonne année", color: C(5), likes: 6, comments: 0, stickers: [] },
  { id: "p26", kind: "text", author: "Ghada", body: "On n’oubliera pas cette nuit", color: C(1), likes: 25, comments: 2, stickers: [{ id: "signal-ok", x: 0.8, y: 0.2, s: 0.26, r: 10 }] },
  { id: "p27", kind: "text", author: "Marwa", body: "Best way to start a year", color: C(2), likes: 13, comments: 0, stickers: [] },
  { id: "p28", kind: "text", author: "Slim", body: "Ovation pour l’équipe qui a monté tout ça", color: C(0), likes: 30, comments: 3, stickers: [] },
  { id: "p29", kind: "text", author: "Rania", body: "Encore, encore", color: C(4), likes: 10, comments: 1, stickers: [] },
  { id: "p30", kind: "text", author: "Tarek", body: "Que 2027 nous ressemble", color: C(3), likes: 18, comments: 0, stickers: [] },
  { id: "p31", kind: "text", author: "Imen", body: "Bravo pour le mur, on a tous joué", color: C(5), likes: 28, comments: 4, stickers: [] },
  { id: "p32", kind: "text", author: "يسرى", body: "شكراً على هذه الليلة", color: C(1), likes: 16, comments: 0, rtl: true, stickers: [] },
  { id: "p33", kind: "text", author: "Chedly", body: "Belle page qui se tourne", color: C(2), likes: 7, comments: 0, stickers: [] },
  { id: "p34", kind: "text", author: "Maya", body: "Le plus beau réveillon depuis longtemps", color: C(0), likes: 35, comments: 2, stickers: [{ id: "generated-room", x: 0.82, y: 0.82, s: 0.3, r: -9 }] },
];

/**
 * Pose des cartes sur le mur. Une grille regulierement decalee, puis un
 * desordre leger et reproductible : le mur doit avoir l'air pose a la main
 * sans jamais l'etre, puisque personne ne le monte.
 *
 * Reproductible parce que le meme evenement doit donner le meme reel, que
 * le rendu tourne dans le navigateur ou plus tard sur un serveur.
 */
function noise(i, k) {
  const x = Math.sin(i * 127.1 + k * 311.7) * 43758.5453;
  return (x - Math.floor(x)) * 2 - 1; // -1..1
}

export function wallLayout(n, aspect = 16 / 9) {
  const cols = Math.max(3, Math.round(Math.sqrt(n * aspect)));
  const rows = Math.max(2, Math.ceil(n / cols));

  // Les cartes restantes sont reparties sur toutes les rangees, pas
  // entassees sur la derniere : sinon le bas du mur est vide et le plan
  // large penche vers le haut.
  const perRow = Array.from({ length: rows }, (_, r) =>
    Math.floor(n / rows) + (r < n % rows ? 1 : 0));

  const out = [];
  let i = 0;
  for (let r = 0; r < rows; r++) {
    const k = perRow[r];
    for (let c = 0; c < k; c++, i++) {
      out.push({
        x: Math.min(0.93, Math.max(0.07, (c + 0.5) / k + noise(i, 1) * 0.024)),
        y: Math.min(0.93, Math.max(0.07, (r + 0.5) / rows + noise(i, 2) * 0.026)),
        r: noise(i, 3) * 7.5,
      });
    }
  }
  return out;
}

/**
 * Marque de l'evenement, surchargeable par les parametres d'URL.
 *
 * La demonstration est faite au nom d'I-magine Events, pour le Nouvel An
 * 2027. Le logo est le fichier officiel du client, repris tel quel :
 * blanc sur fond transparent, donc pose sur les cartons sombres.
 *
 * `bg` est la couleur des cartons d'ouverture et de fin, `accent` celle
 * des filets et du compteur. Les deux valeurs ci-dessous sont provisoires,
 * en attendant la charte d'I-magine Events.
 */
export function brand() {
  const q = new URLSearchParams(location.search);
  // Quand le monteur est ouvert depuis la page de controle d'un mur, la
  // charte du client fait foi : logo, couleurs et nom de marque viennent
  // d'elle, pas d'une saisie a refaire. `window.__charte` est pose par
  // index.html avant la construction du reel. Les parametres d'URL
  // restent prioritaires, pour pouvoir essayer autre chose sur place.
  const c = globalThis.__charte ?? null;
  return {
    name: q.get("brand") || c?.brandName || "I-MAGINE EVENTS",
    logo: q.get("logo") || c?.clientLogoUrl || (c ? "" : "brand/imagine_events.png"),
    title: q.get("title") || "NOUVEL AN 2027",
    date: q.get("date") || "31 DÉCEMBRE 2026",
    // `??` et non `||` : une demonstration de produit se passe de ville,
    // et `place=` vide doit pouvoir la retirer.
    place: q.get("place") ?? "TUNIS",
    bg: q.get("bg") || c?.background || "#0B1134",
    accent: q.get("accent") || c?.accent || "#E8C56B",
    closing: q.get("closing") || "BONNE ANNÉE 2027",
    count: Number(q.get("count") || 127),
  };
}
