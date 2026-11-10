// Moteur de reel du Live Wall.
//
// Deux regles qui commandent tout le fichier :
//
// 1. AUCUNE INTERVENTION HUMAINE. Le montage est deduit des donnees de la
//    soiree. Le choix des cartes mises en avant, le rythme, la duree des
//    plans et l'ordre des plans sortent de `plan()`, jamais d'une main.
//
// 2. L'IMAGE EST UNE FONCTION PURE DU TEMPS. `seek(t)` pose l'etat complet
//    de l'image a l'instant t, sans rien garder d'une image sur l'autre.
//    C'est ce qui permet de rejouer le reel dans le navigateur ET de le
//    rendre image par image en MP4 ensuite, avec exactement le meme code.

import { POSTS, wallLayout, STICKERS, brand } from "./data.js";

export const FPS = 30;
export const DURATION = 35; // secondes

export const CARD_W = 262; // largeur d'une carte sur la surface
// Une carte se dessine en em, comme dans le produit : 16 em de large.
export const EM = CARD_W / 16;

// « Le mur se remplit » : chaque carte passe d'abord en grand au centre,
// le temps d'etre lue, puis file a sa place. READ_W est la largeur qu'elle
// occupe alors dans l'image, en part de sa largeur.
const READ_W = 0.66;
const READ_HOLD = 0.3; // secondes de lecture au centre
const READ_MOVE = 0.9; // secondes pour aller se poser

// Le mur n'a pas la meme forme selon le format livre. Un mur 16:9 pose dans
// une image verticale ne donne qu'une bande maigre au milieu de l'ecran :
// le reel se refait donc son propre mur, a la forme de l'image.
export const FORMATS = {
  "9x16": { w: 1080, h: 1920, label: "9:16", surf: { w: 1500, h: 2400 } },
  "1x1": { w: 1080, h: 1080, label: "1:1", surf: { w: 1800, h: 1800 } },
  "16x9": { w: 1920, h: 1080, label: "16:9", surf: { w: 2400, h: 1350 } },
};

export const TEMPLATES = [
  { id: "fill", name: "LE MUR SE REMPLIT", line: "Plan large fixe. Le mur se construit sous nos yeux, carte apres carte, de plus en plus vite." },
  { id: "words", name: "LES MOTS", line: "On coupe de carte en carte, en gros plan. Ce sont les phrases qu'on retient." },
  { id: "sweep", name: "LE BALAYAGE", line: "Un seul mouvement continu traverse le mur fini. Les cartes s'allument juste avant la camera." },
];

const clamp01 = (x) => (x < 0 ? 0 : x > 1 ? 1 : x);
const lerp = (a, b, k) => a + (b - a) * k;
/** Progression 0..1 entre les instants a et b. */
const seg = (t, a, b) => clamp01((t - a) / (b - a));
/** Adoucissement symetrique, pour les arrivees et les mouvements de camera. */
const ease = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
/** Sortie seule, pour les choses qui se posent. */
const out = (x) => 1 - Math.pow(1 - x, 3);

// ─────────────────────────────────────────────────────────────────────────
// MONTAGE AUTOMATIQUE
// ─────────────────────────────────────────────────────────────────────────

const OPEN_END = 3.4;   // fin du carton d'ouverture
const CLOSE_IN = 30.6;  // debut du carton de fin

/**
 * Decide le montage a partir des seules donnees de la soiree.
 * Rien ici n'est choisi a la main : les plans serres vont aux cartes les
 * plus aimees et aux dessins, parce que ce sont les deux choses qui se
 * regardent. Le reste defile.
 */
export function plan(posts = POSTS) {
  const liked = [...posts].sort((a, b) => b.likes - a.likes);
  const drawn = posts.filter((p) => p.kind !== "text");

  // Les plans serres : d'abord les dessins, qui se rejouent trait par trait,
  // puis les cartes les plus aimees. Cinq au maximum, sans doublon.
  const seen = new Set();
  const holds = [];
  for (const p of [...drawn, ...liked]) {
    if (seen.has(p.id) || holds.length >= 5) continue;
    seen.add(p.id);
    holds.push(p);
  }

  // L'ordre d'arrivee reste l'ordre reel. La carte la plus aimee est gardee
  // pour la fin, mais seulement dans le TEMPS : son rang d'arrivee est
  // repousse plus bas, jamais sa place sur le mur. Melanger les deux
  // l'envoyait dans le coin le plus excentre, et la camera en plan serre
  // traversait le mur entier pour aller la chercher.
  const hero = liked[0];

  return { order: [...posts], holds, hero, total: posts.length };
}

// ─────────────────────────────────────────────────────────────────────────
// CARTES
// ─────────────────────────────────────────────────────────────────────────

const stickerUrl = new Map(STICKERS.map((s) => [s.id, s.url]));

/** Trace les traits jusqu'a la progression p (0..1), tous traits confondus. */
function drawStrokes(cv, strokes, p, aspect) {
  const dpr = 2;
  const w = cv.clientWidth || 300;
  const h = w / aspect;
  if (cv.width !== w * dpr) { cv.width = w * dpr; cv.height = h * dpr; }
  const g = cv.getContext("2d");
  g.setTransform(dpr, 0, 0, dpr, 0, 0);
  g.clearRect(0, 0, w, h);
  g.lineCap = "round";
  g.lineJoin = "round";
  const sx = w / 1000, sy = h / (1000 / aspect);
  const totalPts = strokes.reduce((n, s) => n + s.p.length / 2, 0);
  let budget = totalPts * clamp01(p);
  for (const s of strokes) {
    const n = s.p.length / 2;
    if (budget <= 0) break;
    const take = Math.min(n, Math.ceil(budget));
    budget -= n;
    if (take < 2) continue;
    g.strokeStyle = s.c;
    g.lineWidth = (s.w / 1000) * w;
    g.beginPath();
    for (let i = 0; i < take; i++) {
      const x = s.p[i * 2] * sx, y = s.p[i * 2 + 1] * sy;
      i === 0 ? g.moveTo(x, y) : g.lineTo(x, y);
    }
    g.stroke();
  }
}

/** Construit une carte, a l'identique du format « memory » du produit. */
function buildCard(post) {
  const el = document.createElement("div");
  el.className = "card";
  el.style.width = CARD_W + "px";
  el.style.fontSize = CARD_W / 16 + "px";
  el.style.background = post.kind === "text" ? post.color : "#ffffff";
  if (post.rtl) el.dir = "rtl";

  const tape = document.createElement("span");
  tape.className = "tape";
  el.append(tape);

  let canvas = null;
  if (post.kind === "text") {
    const body = document.createElement("div");
    body.className = "body";
    const p = document.createElement("p");
    p.className = "txt";
    p.textContent = post.body;
    body.append(p);
    for (const s of post.stickers) {
      const img = document.createElement("img");
      img.className = "sticker";
      img.src = stickerUrl.get(s.id) || "";
      img.style.left = s.x * 100 + "%";
      img.style.top = s.y * 100 + "%";
      img.style.width = s.s * 100 + "%";
      img.style.transform = `translate(-50%,-50%) rotate(${s.r}deg)`;
      body.append(img);
    }
    el.append(body);
  } else if (post.kind === "drawing") {
    const box = document.createElement("div");
    box.className = "media square";
    canvas = document.createElement("canvas");
    box.append(canvas);
    el.append(box);
    if (post.body) {
      const cap = document.createElement("p");
      cap.className = "cap";
      cap.textContent = post.body;
      el.append(cap);
    }
  } else {
    const box = document.createElement("div");
    box.className = "media sign";
    canvas = document.createElement("canvas");
    const line = document.createElement("div");
    line.className = "signlabel";
    line.textContent = "SIGNATURE · " + post.author;
    box.append(canvas, line);
    el.append(box);
  }

  const foot = document.createElement("div");
  foot.className = "foot";
  const who = document.createElement("span");
  who.className = "who";
  who.textContent = post.kind !== "signature" && post.author ? "— " + post.author : "";
  const meta = document.createElement("span");
  meta.className = "meta";
  const heart = document.createElement("span");
  heart.className = "heart";
  heart.textContent = "♥";
  const n = document.createElement("span");
  n.className = "likes";
  const cm = document.createElement("span");
  cm.className = "cm";
  cm.textContent = post.comments ? "💬 " + post.comments : "";
  meta.append(heart, n, cm);
  foot.append(who, meta);
  el.append(foot);

  return { el, canvas, likes: n, post, aspect: post.kind === "signature" ? 2.4 : 1 };
}

// ─────────────────────────────────────────────────────────────────────────
// LE REEL
// ─────────────────────────────────────────────────────────────────────────

export function createReel(root) {
  const b = brand();
  const P = plan();

  root.innerHTML = "";
  root.className = "reel";

  // Le fond de marque tient d'un bout a l'autre du reel. Au dessus, une
  // nappe de lumiere qui derive lentement, un vignettage et un grain fin :
  // le mur n'est jamais pose sur du noir plat.
  const mk = (cls) => { const d = document.createElement("div"); d.className = cls; return d; };
  const bg = mk("bg"), light = mk("light"), vignette = mk("vignette"), grain = mk("grain");
  const surface = mk("surface");
  const ui = mk("ui");
  root.append(bg, light, surface, vignette, grain, ui);

  // Les cartes, construites une fois pour toutes.
  const cards = P.order.map((post) => {
    const c = buildCard(post);
    surface.append(c.el);
    return c;
  });

  let surf = FORMATS["9x16"].surf;
  let holdPath = []; // les cartes a plan serre, dans l'ordre ou la camera les prend

  // Rang d'arrivee : l'ordre reel, la carte vedette repoussee en dernier.
  const heroAt = P.order.findIndex((p) => p.id === P.hero.id);
  let n = 0;
  const timeRank = P.order.map((_, i) => (i === heroAt ? P.order.length - 1 : n++));
  // Rang vers indice, pour retrouver la carte qui arrive juste apres.
  const byRank = [];
  timeRank.forEach((r, i) => { byRank[r] = i; });

  /**
   * Repose le mur a la forme de l'image. Les emplacements sont ranges du
   * centre vers les bords. Les cartes qui auront un plan serre prennent
   * les premiers, donc les plus centraux : la camera de « les mots » ne
   * traverse plus le mur pour passer de l'une a l'autre. Les autres
   * suivent dans l'ordre d'arrivee, donc le mur pousse depuis le milieu
   * et un cadre serre est toujours plein.
   */
  function relayout() {
    surface.style.width = surf.w + "px";
    surface.style.height = surf.h + "px";
    const spots = wallLayout(cards.length, surf.w / surf.h)
      .sort((a, b) => Math.hypot(a.x - 0.5, a.y - 0.5) - Math.hypot(b.x - 0.5, b.y - 0.5));

    const isHold = new Set(P.holds.map((p) => p.id));
    const central = cards.filter((c) => isHold.has(c.post.id));
    const rest = cards.filter((c) => !isHold.has(c.post.id));
    [...central, ...rest].forEach((c, i) => { c.spot = spots[i]; });

    // La camera enchaine les plans serres par le plus court chemin : on
    // part de la carte la plus haute et on prend chaque fois la plus
    // proche. Un classement, ou meme un sens de lecture, la faisait
    // zigzaguer de gauche a droite dans une meme rangee.
    const left = central.slice().sort((a, b) => a.spot.y - b.spot.y);
    holdPath = left.length ? [left.shift()] : [];
    while (left.length) {
      const from = holdPath[holdPath.length - 1].spot;
      const d = (c) => Math.hypot(c.spot.x - from.x, (c.spot.y - from.y) * (surf.h / surf.w));
      let best = 0;
      left.forEach((c, i) => { if (d(c) < d(left[best])) best = i; });
      holdPath.push(left.splice(best, 1)[0]);
    }
  }

  // Habillage : carton d'ouverture, compteur, carton de fin.
  ui.innerHTML = `
    <div class="open">
      <div class="mark"><span class="markbox">LOGO</span><span class="markname"></span></div>
      <div class="rule"></div>
      <h1 class="title"></h1>
      <p class="sub"></p>
    </div>
    <div class="scrim top"></div>
    <div class="scrim bot"></div>
    <div class="topbar">
      <span class="tbname"></span>
      <span class="tbrule"></span>
      <span class="tbtitle"></span>
    </div>
    <div class="counter"><span class="cnum">0</span><span class="clab">MESSAGES</span></div>
    <div class="close">
      <h2 class="closing"></h2>
      <div class="rule"></div>
      <div class="mark"><span class="markbox">LOGO</span><span class="markname"></span></div>
      <p class="credit">LIVE WALL BY FMRXR//</p>
    </div>`;
  const $ = (s) => ui.querySelector(s);
  // Le logo du client est pose tel qu'il nous est fourni, jamais redessine
  // ni recoupe. A defaut de fichier, la place du logo reste marquee.
  ui.querySelectorAll(".mark").forEach((m) => {
    if (!b.logo) return;
    const img = document.createElement("img");
    img.className = "logo";
    img.src = b.logo;
    m.replaceChildren(img);
  });
  ui.querySelectorAll(".markname").forEach((e) => (e.textContent = b.name));

  const tb = $(".tbname");
  if (b.logo) {
    const img = document.createElement("img");
    img.className = "logo small";
    img.src = b.logo;
    tb.replaceWith(img);
  } else tb.textContent = b.name;

  // Le lieu est facultatif : une demonstration de produit n'a pas de ville.
  const join = (...parts) => parts.filter(Boolean).join(" · ");
  $(".tbtitle").textContent = join(b.title, b.date);
  $(".title").textContent = b.title;
  $(".sub").textContent = join(b.date, b.place);
  $(".closing").textContent = b.closing;
  root.style.setProperty("--accent", b.accent);
  root.style.setProperty("--brandbg", b.bg);

  const state = { template: "fill", format: "9x16", burn: true, credit: true };

  function setFormat(id) {
    state.format = id;
    const f = FORMATS[id];
    root.style.width = f.w + "px";
    root.style.height = f.h + "px";
    surf = f.surf;
    relayout();
  }
  setFormat(state.format);

  // ── Camera ──────────────────────────────────────────────────────────
  // Renvoie le point de la surface place au centre de l'image, et la
  // largeur de surface visible. L'echelle s'en deduit, donc le cadrage
  // tient dans les trois formats.
  // Hauteur reelle de chaque carte, mesuree une fois : elle depend du
  // contenu (un dessin est carre, une signature est basse) et ne change
  // plus ensuite.
  let measured = false;
  function measure() {
    cards.forEach((c) => { c.h = c.el.offsetHeight || CARD_W; });
    measured = true;
  }

  /**
   * Boite englobant les cartes deja arrivees, en part de la surface.
   * Chaque carte pousse la boite au rythme de son apparition, donc la
   * boite grandit sans a-coups meme si les cartes, elles, arrivent une
   * par une.
   */
  function arrivedBox(t) {
    if (!measured) measure();
    let x0 = 0.5, x1 = 0.5, y0 = 0.5, y1 = 0.5;
    cards.forEach((c, i) => {
      const a = clamp01((t - arriveAt(i)) / 0.75);
      if (a <= 0) return;
      const hw = CARD_W / 2 / surf.w, hh = c.h / 2 / surf.h;
      x0 = Math.min(x0, lerp(0.5, c.spot.x - hw, a));
      x1 = Math.max(x1, lerp(0.5, c.spot.x + hw, a));
      y0 = Math.min(y0, lerp(0.5, c.spot.y - hh, a));
      y1 = Math.max(y1, lerp(0.5, c.spot.y + hh, a));
    });
    return { cx: (x0 + x1) / 2, cy: (y0 + y1) / 2, w: x1 - x0, h: y1 - y0 };
  }

  function camera(t) {
    const f = FORMATS[state.format];
    // Le plan large laisse volontairement de l'air : les bandeaux de marque
    // s'y posent. « fy » dit ou tombe le centre du mur dans l'image.
    const wide = { cx: surf.w / 2, cy: surf.h / 2, view: surf.w * 1.2, fy: 0.52 };
    const tight = surf.w * 0.4;  // plan de travail
    const close = surf.w * 0.26; // plan serre sur une carte
    const body = clamp01((t - OPEN_END) / (CLOSE_IN - OPEN_END));

    if (state.template === "fill") {
      // La camera cadre les cartes DEJA ARRIVEES, pas une trajectoire
      // ecrite d'avance. Elle part donc serree sur la premiere et recule
      // au rythme ou le mur pousse. C'est la seule facon de garantir
      // qu'aucune carte ne soit coupee par le bord, quel que soit le
      // nombre de messages de la soiree.
      const box = arrivedBox(t);
      // Le cadre doit contenir la boite en largeur ET en hauteur.
      const need = Math.max(box.w * surf.w, box.h * surf.h * (f.w / f.h));
      const view = Math.max(surf.w * 0.34, need * 1.35);
      const k = clamp01((view / surf.w - 0.66) / 0.4);
      return { cx: box.cx * surf.w, cy: box.cy * surf.h, view, fy: lerp(0.5, wide.fy, k) };
    }

    if (state.template === "sweep") {
      // Un seul geste : diagonale haut gauche vers bas droite, puis recul.
      const pull = ease(seg(t, CLOSE_IN - 4.5, CLOSE_IN));
      const k = ease(clamp01(body / 0.86));
      const cx = lerp(surf.w * 0.26, surf.w * 0.76, k);
      const cy = lerp(surf.h * 0.2, surf.h * 0.82, k);
      return {
        cx: lerp(cx, wide.cx, pull),
        cy: lerp(cy, wide.cy, pull),
        view: lerp(tight, wide.view, pull),
        fy: lerp(0.5, wide.fy, pull),
      };
    }

    // « words » : des plans serres enchaines, puis recul sur le mur entier.
    const holdStart = OPEN_END + 0.4;
    const holdEnd = CLOSE_IN - 4.0;
    const each = (holdEnd - holdStart) / holdPath.length;
    // Borne basse a zero : avant le premier plan tenu, la camera est deja
    // posee dessus. Sans cette borne elle tombait dans la branche du recul
    // final, donc sur la DERNIERE carte, et sautait a la premiere a
    // l'instant ou les plans commencent.
    const i = Math.min(holdPath.length - 1, Math.max(0, Math.floor((t - holdStart) / each)));
    if (t < holdEnd) {
      const a = holdPath[i].spot;
      const z = holdPath[Math.min(i + 1, holdPath.length - 1)].spot;
      const local = clamp01((t - holdStart - i * each) / each);
      // Plan tenu, puis glissement vers le suivant sur le dernier quart.
      const k = ease(clamp01((local - 0.74) / 0.26));
      // La camera s'ouvre pendant le deplacement, d'autant plus que les
      // deux cartes sont loin l'une de l'autre, puis se referme. Sans
      // cela, un ecart inhabituel entre deux cartes donnerait un fouette.
      // La regle vaut pour n'importe quelles donnees, pas seulement
      // celles de la demonstration.
      const gap = Math.hypot(z.x - a.x, (z.y - a.y) * (surf.h / surf.w));
      const open = Math.sin(clamp01(k) * Math.PI) * gap * 1.7;
      return {
        cx: lerp(a.x, z.x, k) * surf.w,
        cy: lerp(a.y, z.y, k) * surf.h,
        // Une respiration lente pendant le plan tenu, pour qu'il ne soit
        // jamais tout a fait fixe.
        view: close * (1 + open) * (1 + 0.05 * Math.sin(local * Math.PI)),
        fy: 0.5,
      };
    }
    const k = ease(seg(t, holdEnd, CLOSE_IN));
    const last = holdPath[holdPath.length - 1].spot;
    return {
      cx: lerp(last.x * surf.w, wide.cx, k),
      cy: lerp(last.y * surf.h, wide.cy, k),
      view: lerp(close, wide.view, k),
      fy: lerp(0.5, wide.fy, k),
    };
  }

  /** Instant d'arrivee de la carte i, selon le modele. */
  function arriveAt(idx) {
    const i = timeRank[idx];
    const n = cards.length;
    // Les premieres cartes arrivent pendant que le carton d'ouverture
    // s'efface : sans ce recouvrement, l'image reste vide une demi-seconde.
    const start = OPEN_END - 0.6;
    const end = CLOSE_IN - 2.2;
    if (state.template === "fill") {
      // Acceleration : les premieres cartes prennent leur temps, la fin
      // arrive en rafale. C'est la soiree qui monte. L'exposant reste
      // modere pour que les dernieres cartes aient encore le temps de se
      // montrer au centre avant d'aller se poser.
      const u = i / (n - 1);
      return lerp(start, end, Math.pow(u, 0.78));
    }
    if (state.template === "words") {
      // Le mur est deja la ; les cartes se posent vite au debut.
      return lerp(start, start + 4.5, i / (n - 1));
    }
    // sweep : la carte s'allume AVANT que la camera n'arrive sur elle. Dans
    // un cadre vertical la camera voit loin devant : sans cette avance, la
    // moitie basse de l'image reste noire pendant tout le mouvement.
    // Ici c'est la place de la carte qui commande, pas son rang d'arrivee.
    const sp = cards[idx].spot;
    const d = (sp.x + sp.y) / 2;
    const LEAD = 0.26;
    // La diagonale de la camera va de d = 0,23 a d = 0,79, sur les 86 %
    // premiers du corps du reel ; le reste est le recul final.
    const k = clamp01((d - 0.23) / 0.56 - LEAD);
    return start + k * 0.86 * (end - start);
  }

  // ── Pose de l'image ─────────────────────────────────────────────────
  function seek(t) {
    const f = FORMATS[state.format];
    const cam = camera(t);
    const s = f.w / cam.view;
    surface.style.transform =
      `translate(${f.w / 2}px, ${f.h * cam.fy}px) scale(${s}) translate(${-cam.cx}px, ${-cam.cy}px)`;

    // Point de la surface qui tombe au centre exact de l'image, et facteur
    // d'agrandissement qui donne a une carte une largeur lisible a l'ecran
    // quelle que soit la focale. En plan serre il vaut 1 : la carte est
    // deja grande, rien a corriger.
    const midX = cam.cx;
    const midY = cam.cy + (f.h / 2 - f.h * cam.fy) / s;
    const zBig = Math.max(1, (f.w * READ_W) / (CARD_W * s));

    let arrived = 0;
    cards.forEach((c, i) => {
      const t0 = arriveAt(i);
      const age = t - t0;
      // L'apparition est franche quand la carte entre en grand au centre :
      // une carte agrandie a demi transparente laisse voir le mur au
      // travers et a l'air d'un defaut. Ailleurs elle peut se fondre.
      // Une carte qui entre en grand au centre n'a pas de fondu du tout :
      // meme une seule image a demi transparente laisse voir le mur au
      // travers et se lit comme un defaut. Elle apparait opaque, et c'est
      // le leger grandissement plus bas qui adoucit son arrivee. Ailleurs,
      // la carte est petite et peut se fondre tranquillement.
      const a = state.template === "fill" ? (age >= 0 ? 1 : 0) : clamp01(age / 0.45);
      if (t >= t0) arrived++;
      c.el.style.opacity = String(a);
      // L'ordre d'empilement suit l'ordre d'arrivee : la carte en vol est
      // toujours au dessus de celles deja posees.
      c.el.style.zIndex = String(100 + timeRank[i]);

      if (state.template === "fill") {
        // La carte entre en grand au centre de l'image, le temps d'etre
        // lue, puis part prendre sa place en retrecissant. Sans ce
        // passage au centre, une carte qui arrive dans un plan large est
        // trop petite pour qu'on lise ce qui y est ecrit.
        // Le temps de lecture se replie sur l'ecart avec la carte
        // suivante : en fin de montage les arrivees se resserrent, et
        // sans cela trois cartes se superposeraient au centre.
        const nxt = byRank[timeRank[i] + 1];
        const gap = nxt === undefined ? 1.4 : Math.max(0.25, arriveAt(nxt) - t0);
        const hold = Math.min(READ_HOLD, gap * 0.5);
        const move = Math.min(READ_MOVE, gap * 1.15);
        const m = out(clamp01((age - hold) / move));
        const x = lerp(midX, c.spot.x * surf.w, m), y = lerp(midY, c.spot.y * surf.h, m);
        c.el.style.left = x + "px";
        c.el.style.top = y + "px";
        // Un leger grandissement sur l'apparition, pour que la carte se
        // pose dans l'image au lieu d'y surgir d'un coup.
        const pop = lerp(0.93, 1, out(clamp01(age / 0.16)));
        const rot = lerp(0, c.spot.r, m), sc = lerp(zBig, 1, m) * pop;
        c.el.style.transform = `translate(-50%,-50%) rotate(${rot}deg) scale(${sc})`;
        c.draw = { x, y, rot, scale: sc, opacity: a, z: timeRank[i] };
      } else {
        // Ailleurs le mur est deja la : la carte se pose simplement, d'un
        // decalage mesure sur la focale pour ne jamais deborder du cadre.
        const k = out(clamp01(age / 0.75));
        const dirX = (c.spot.x - 0.5) * 2, dirY = (c.spot.y - 0.5) * 2;
        const reach = cam.view * 0.13;
        const dx = lerp(dirX * reach, 0, k);
        const dy = lerp(dirY * reach + reach * 0.4, 0, k);
        const x = c.spot.x * surf.w, y = c.spot.y * surf.h;
        const rot = lerp(c.spot.r + (dirX > 0 ? 16 : -16), c.spot.r, k), sc = lerp(0.78, 1, k);
        c.el.style.left = x + "px";
        c.el.style.top = y + "px";
        c.el.style.transform = `translate(-50%,-50%) translate(${dx}px,${dy}px) `
          + `rotate(${rot}deg) scale(${sc})`;
        c.draw = { x: x + dx, y: y + dy, rot, scale: sc, opacity: a, z: timeRank[i] };
      }

      // Le compteur de coeurs monte quand la carte vient de se poser.
      // Dans « le mur se remplit » il doit finir sa montee pendant que la
      // carte est encore grande au centre : sinon le plan le plus lisible
      // du reel affiche « 0 » sur chaque message.
      const lk = state.template === "fill"
        ? clamp01(age / 0.42)
        : clamp01((age - 0.35) / 0.8);
      const likes = c.post.likes ? String(Math.round(c.post.likes * out(lk))) : "";
      c.likes.textContent = likes;
      if (c.draw) c.draw.likes = likes;

      // Les dessins se rejouent trait par trait, comme sur le mur.
      const rp = clamp01((t - t0 - 0.15) / 1.25);
      if (c.draw) c.draw.replay = rp;
      if (c.canvas) drawStrokes(c.canvas, c.post.strokes, rp, c.aspect);
    });

    // Habillage.
    const o = $(".open"), cl = $(".close"), ct = $(".counter");
    const oIn = seg(t, 0.25, 1.1), oOut = 1 - seg(t, OPEN_END - 0.7, OPEN_END);
    o.style.opacity = state.burn || t < OPEN_END ? oIn * oOut : 0;
    o.style.transform = `translateY(-50%) translateY(${lerp(26, 0, ease(oIn))}px)`;
    o.classList.toggle("clean", !state.burn);

    const cIn = seg(t, CLOSE_IN, CLOSE_IN + 0.9);
    cl.style.opacity = cIn;
    cl.style.transform = `translateY(-50%) translateY(${lerp(26, 0, ease(cIn))}px)`;
    cl.classList.toggle("clean", !state.burn);
    $(".credit").style.display = state.credit ? "" : "none";

    const show = state.burn && t > OPEN_END + 1 && t < CLOSE_IN - 0.4;
    const live = show ? seg(t, OPEN_END + 1, OPEN_END + 1.8) * (1 - seg(t, CLOSE_IN - 1.2, CLOSE_IN - 0.4)) : 0;
    $(".cnum").textContent = String(Math.round((arrived / cards.length) * b.count));

    // Plus la camera recule, plus le mur laisse des bandes vides en haut et
    // en bas d'un cadre vertical. Ces bandes portent la marque : le plan
    // large devient une composition, pas un reste de place.
    const wideness = clamp01((cam.view / surf.w - 0.66) / 0.4);
    // En plan serre sur une carte, le compteur passerait devant le message.
    // Il ne revient qu'au recul.
    const low = state.template === "words" ? wideness : 1;
    ct.style.opacity = String(live * low);
    $(".topbar").style.opacity = String(live * wideness);
    $(".scrim.top").style.opacity = String(live * wideness);
    $(".scrim.bot").style.opacity = String(live * low);

    // ── Fond ──────────────────────────────────────────────────────────
    // Le bleu de marque ne quitte jamais l'image. Sur les cartons, le mur
    // s'efface derriere, et la lumiere monte d'un cran.
    const brandMoment = Math.max(1 - seg(t, OPEN_END - 1.2, OPEN_END), cIn);
    surface.style.opacity = String(1 - brandMoment * 0.9);

    // Deux nappes de lumiere qui derivent sur des periodes longues et
    // premieres entre elles : le fond bouge sans jamais se repeter sur la
    // duree du reel, et sans jamais attirer l'oeil.
    const L = (k, v) => light.style.setProperty(k, v);
    L("--l1x", (50 + 25 * Math.sin(t * 0.169)).toFixed(2) + "%");
    L("--l1y", (33 + 15 * Math.cos(t * 0.121)).toFixed(2) + "%");
    L("--l2x", (50 + 29 * Math.cos(t * 0.093 + 1.7)).toFixed(2) + "%");
    L("--l2y", (71 + 17 * Math.sin(t * 0.143 + 0.6)).toFixed(2) + "%");
    L("--i1", (0.17 + 0.05 * Math.sin(t * 0.21) + brandMoment * 0.16).toFixed(3));
    L("--i2", (0.09 + 0.035 * Math.cos(t * 0.17 + 2.1) + brandMoment * 0.1).toFixed(3));

    // Grain : le motif est fixe, c'est son calage qui saute, huit fois par
    // seconde. Deterministe, donc identique a chaque rendu.
    const g = Math.floor(t * 8);
    grain.style.backgroundPosition = `${(g % 7) * 37}px ${(g % 5) * 53}px`;

    // Tout ce que l'image vient de recevoir, en clair. Le peintre canvas
    // du rendu MP4 lit ceci et ne recalcule rien : une seule geometrie,
    // deux surfaces de dessin, donc l'export ne peut pas deriver de
    // l'apercu.
    last = {
      t, f, cam, s, surf, brandMoment,
      surfaceOpacity: 1 - brandMoment * 0.9,
      light: {
        l1x: 50 + 25 * Math.sin(t * 0.169), l1y: 33 + 15 * Math.cos(t * 0.121),
        l2x: 50 + 29 * Math.cos(t * 0.093 + 1.7), l2y: 71 + 17 * Math.sin(t * 0.143 + 0.6),
        i1: 0.17 + 0.05 * Math.sin(t * 0.21) + brandMoment * 0.16,
        i2: 0.09 + 0.035 * Math.cos(t * 0.17 + 2.1) + brandMoment * 0.1,
      },
      grain: [(g % 7) * 37, (g % 5) * 53],
      open: { op: state.burn || t < OPEN_END ? oIn * oOut : 0, dy: lerp(26, 0, ease(oIn)), clean: !state.burn },
      close: { op: cIn, dy: lerp(26, 0, ease(cIn)), clean: !state.burn, credit: state.credit },
      counter: { op: live * low, num: $(".cnum").textContent },
      topbar: { op: live * wideness },
      scrim: { top: live * wideness, bot: live * low },
      brand: b,
    };
  }

  let last = null;

  /**
   * Change les mots du reel sans tout reconstruire. Les cartons sont du
   * texte : on le remplace, et la prochaine image le porte. Le logo se
   * remplace de la meme facon, pour qu'on puisse en essayer un autre sur
   * place sans repasser par la charte.
   */
  function setText(next) {
    Object.assign(b, next);
    $(".tbtitle").textContent = join(b.title, b.date);
    $(".title").textContent = b.title;
    $(".sub").textContent = join(b.date, b.place);
    $(".closing").textContent = b.closing;
    if (next.logo !== undefined) {
      ui.querySelectorAll("img.logo").forEach((img) => { img.src = next.logo; });
    }
    if (next.accent) root.style.setProperty("--accent", next.accent);
    if (next.bg) root.style.setProperty("--brandbg", next.bg);
  }

  return {
    seek,
    setFormat,
    setText,
    /** L'etat de la derniere image posee, pour le peintre du rendu MP4. */
    scene: () => last,
    cards: () => cards,
    state,
    plan: P,
    brandInfo: b,
    setTemplate: (id) => { state.template = id; },
    el: root,
  };
}
