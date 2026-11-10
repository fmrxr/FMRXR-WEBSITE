// Le reel peint sur un canvas, pour le rendu MP4 dans le navigateur.
//
// Pourquoi un deuxieme dessin ? Un navigateur ne sait pas se photographier
// lui-meme de facon fiable : il n'existe aucun moyen sur de transformer
// une page en image, et les contournements (foreignObject, html2canvas)
// perdent les polices, les ombres ou les degrades sans prevenir. Pour un
// fichier livre a un client, ce n'est pas acceptable.
//
// Mais il n'y a qu'UNE geometrie : `reel.scene()` rend ce que le moteur
// vient de calculer pour l'apercu, et ce fichier ne fait que le repeindre.
// Rien n'est recalcule ici, donc l'export ne peut pas deriver de ce qu'on
// a vu a l'ecran.

import { CARD_W, EM } from "./reel.js";

const px = (em) => em * EM;

/** Rectangle arrondi, parce que `roundRect` manque encore a certains moteurs. */
function round(g, x, y, w, h, r) {
  if (g.roundRect) { g.beginPath(); g.roundRect(x, y, w, h, r); return; }
  g.beginPath();
  g.moveTo(x + r, y);
  g.arcTo(x + w, y, x + w, y + h, r);
  g.arcTo(x + w, y + h, x, y + h, r);
  g.arcTo(x, y + h, x, y, r);
  g.arcTo(x, y, x + w, y, r);
  g.closePath();
}

/** Decoupe un texte en lignes qui tiennent dans `w`. */
function wrap(g, text, w) {
  const out = [];
  for (const para of String(text).split("\n")) {
    let line = "";
    for (const word of para.split(/\s+/)) {
      const t = line ? line + " " + word : word;
      if (line && g.measureText(t).width > w) { out.push(line); line = word; }
      else line = t;
    }
    out.push(line);
  }
  return out;
}

/** Les traits d'un dessin, jusqu'a la progression p, dans un carre de `size`. */
function strokes(g, list, p, aspect, size) {
  const h = size / aspect;
  const sx = size / 1000, sy = h / (1000 / aspect);
  const total = list.reduce((n, s) => n + s.p.length / 2, 0);
  let budget = total * p;
  g.lineCap = "round"; g.lineJoin = "round";
  for (const s of list) {
    const n = s.p.length / 2;
    if (budget <= 0) break;
    const take = Math.min(n, Math.ceil(budget));
    budget -= n;
    if (take < 2) continue;
    g.strokeStyle = s.c;
    g.lineWidth = (s.w / 1000) * size;
    g.beginPath();
    for (let i = 0; i < take; i++) {
      const x = s.p[i * 2] * sx, y = s.p[i * 2 + 1] * sy;
      i === 0 ? g.moveTo(x, y) : g.lineTo(x, y);
    }
    g.stroke();
  }
}

/** Une carte du mur, dessinee a son origine, centree sur (0,0). */
function card(g, c, images) {
  const w = CARD_W, h = c.h;
  const pad = px(0.7);
  g.save();
  g.translate(-w / 2, -h / 2);

  // Ombre portee, puis le papier.
  g.save();
  g.shadowColor = "rgba(0,0,0,0.6)";
  g.shadowBlur = px(1.6);
  g.shadowOffsetY = px(0.8);
  g.fillStyle = c.post.kind === "text" ? c.post.color : "#ffffff";
  round(g, 0, 0, w, h, px(0.25));
  g.fill();
  g.restore();

  // La bande de scotch.
  g.save();
  g.translate(w / 2, -px(0.55) + px(0.55));
  g.rotate((-3 * Math.PI) / 180);
  g.fillStyle = "rgba(255,255,255,0.55)";
  g.fillRect(-px(2.25), -px(0.55), px(4.5), px(1.1));
  g.restore();

  g.fillStyle = "#1b1a22";
  let y = pad;

  if (c.post.kind === "text") {
    // Centré dans la carte, comme dans le produit : le peintre et l'aperçu
    // doivent poser le mot au même endroit, sinon l'export trahit ce que
    // le client a validé à l'écran.
    g.font = `600 ${px(1.3)}px Inter, system-ui, sans-serif`;
    g.textBaseline = "middle";
    g.textAlign = "center";
    const lh = px(1.3) * 1.25;
    const lines = wrap(g, c.post.body, w - pad * 2);
    const boxH = Math.max(px(5 * 1.3), lines.length * lh);
    const mid = y + boxH / 2;
    lines.forEach((l, i) => g.fillText(l, w / 2, mid + (i - (lines.length - 1) / 2) * lh));
    y += boxH;
  } else if (c.post.kind === "drawing") {
    const size = w - pad * 2;
    g.fillStyle = "#fff";
    g.fillRect(pad, y, size, size);
    g.save(); g.translate(pad, y);
    strokes(g, c.post.strokes, c.draw.replay ?? 1, 1, size);
    g.restore();
    y += size;
    if (c.post.body) {
      g.fillStyle = "#1b1a22";
      g.font = `${px(0.85)}px Inter, system-ui, sans-serif`;
      g.textBaseline = "top"; g.textAlign = "left";
      g.fillText(c.post.body, pad, y + px(0.5));
      y += px(0.5) + px(0.85) * 1.25;
    }
  } else if (c.post.kind === "signature") {
    const size = w - pad * 2;
    const boxH = size / 2.4 + px(1.1);
    g.fillStyle = "#fbf7ee";
    g.fillRect(pad, y, size, boxH);
    g.save(); g.translate(pad + px(0.6), y + px(0.4));
    strokes(g, c.post.strokes, c.draw.replay ?? 1, 2.4, size - px(1.2));
    g.restore();
    g.strokeStyle = "rgba(43,42,51,0.3)"; g.lineWidth = 1;
    const ly = y + boxH - px(0.5);
    g.beginPath(); g.moveTo(pad + px(0.6), ly); g.lineTo(pad + size - px(0.6), ly); g.stroke();
    g.fillStyle = "rgba(43,42,51,0.6)";
    g.font = `${px(0.55)}px Inter, system-ui, sans-serif`;
    g.textBaseline = "top"; g.textAlign = "left";
    g.fillText(`SIGNATURE · ${c.post.author}`.toUpperCase(), pad + px(0.6), ly + px(0.2));
    y += boxH;
  }

  // Les stickers poses sur la carte.
  for (const s of c.post.stickers ?? []) {
    const img = images.get(s.id);
    if (!img?.complete) continue;
    const sw = s.s * w, sh = (img.naturalHeight / img.naturalWidth) * sw;
    g.save();
    g.translate(s.x * w, s.y * h);
    g.rotate((s.r * Math.PI) / 180);
    g.drawImage(img, -sw / 2, -sh / 2, sw, sh);
    g.restore();
  }

  // Le pied : l'auteur a gauche, les coeurs a droite.
  const fy = h - pad - px(0.65);
  g.font = `600 ${px(0.65)}px Inter, system-ui, sans-serif`;
  g.fillStyle = "rgba(27,26,34,0.62)";
  g.textBaseline = "top"; g.textAlign = "left";
  if (c.post.kind !== "signature" && c.post.author) g.fillText("— " + c.post.author, pad, fy);
  if (c.draw.likes) {
    g.textAlign = "right";
    g.fillText(c.draw.likes, w - pad, fy);
    g.fillStyle = "#e64f6a";
    g.fillText("♥", w - pad - g.measureText(c.draw.likes).width - px(0.3), fy);
  }
  g.restore();
}

/** Les cartons de marque : logo, filet, titres. */
function lockup(g, s, which) {
  const o = which === "open" ? s.open : s.close;
  if (o.op <= 0) return;
  const { f, brand } = s;
  g.save();
  g.globalAlpha = o.op;
  g.translate(f.w / 2, f.h / 2 + o.dy);
  g.textAlign = "center";

  const logo = s.logoImage;
  let y = 0;
  const lines = [];
  if (which === "open") {
    if (!o.clean) lines.push(["rule"], ["h1", brand.title], ["sub", brand.date, brand.place]);
  } else {
    if (!o.clean) lines.push(["h2", brand.closing], ["rule"]);
  }

  // Hauteur totale, pour centrer le bloc.
  const H = { rule: 3 + 26, h1: 58 * 1.05 + 26, h2: 62 * 1.05 + 26, sub: 22 * 1.4 };
  const logoH = logo?.complete ? (logo.naturalHeight / logo.naturalWidth) * 420 : 0;
  let total = logoH + (logoH ? 26 : 0);
  for (const [k] of lines) total += H[k] ?? 0;
  if (which === "close") total += logoH ? 0 : 0;
  y = -total / 2;

  const drawLogo = () => {
    if (!logo?.complete) return;
    const lw = 420, lh = (logo.naturalHeight / logo.naturalWidth) * lw;
    g.drawImage(logo, -lw / 2, y, lw, lh);
    y += lh + 26;
  };
  if (which === "open") drawLogo();

  for (const [k, a, b] of lines) {
    if (k === "rule") {
      g.fillStyle = brand.accent;
      g.fillRect(-32, y, 64, 3);
      y += 3 + 26;
    } else if (k === "h1" || k === "h2") {
      const size = k === "h1" ? 58 : 62;
      g.font = `900 ${size}px Inter, system-ui, sans-serif`;
      g.fillStyle = "#fff";
      g.textBaseline = "top";
      for (const l of wrap(g, a, f.w * 0.82)) { g.fillText(l, 0, y); y += size * 1.05; }
      y += 26;
    } else if (k === "sub") {
      g.font = `600 22px Inter, system-ui, sans-serif`;
      g.fillStyle = "rgba(255,255,255,0.82)";
      g.textBaseline = "top";
      g.fillText([a, b].filter(Boolean).join(" · "), 0, y);
      y += 22 * 1.4;
    }
  }
  if (which === "close") {
    drawLogo();
    if (o.credit) {
      g.font = `15px Inter, system-ui, sans-serif`;
      g.fillStyle = "rgba(255,255,255,0.6)";
      g.textBaseline = "top";
      g.fillText("LIVE WALL BY FMRXR//", 0, y + 10);
    }
  }
  g.restore();
}

/** Une image complete du reel. */
export function paintFrame(g, reel, images) {
  const s = reel.scene();
  if (!s) return;
  const { f, cam, surf, brand } = s;
  const scale = s.s;

  g.setTransform(1, 0, 0, 1, 0, 0);
  g.clearRect(0, 0, f.w, f.h);

  // Fond de marque, puis les deux nappes de lumiere qui derivent.
  g.fillStyle = brand.bg;
  g.fillRect(0, 0, f.w, f.h);
  const nappe = (x, y, rx, ry, color, alpha) => {
    if (alpha <= 0) return;
    const r = Math.max(rx, ry);
    const grd = g.createRadialGradient(x, y, 0, x, y, r);
    grd.addColorStop(0, color.replace("ALPHA", String(alpha)));
    grd.addColorStop(0.7, color.replace("ALPHA", "0"));
    g.save();
    g.translate(x, y); g.scale(1, ry / rx); g.translate(-x, -y);
    g.fillStyle = grd; g.fillRect(-f.w, -f.h, f.w * 3, f.h * 3);
    g.restore();
  };
  const L = s.light;
  nappe(f.w * L.l1x / 100, f.h * L.l1y / 100, f.w * 0.62, f.h * 0.44, "rgba(150,190,255,ALPHA)", L.i1);
  nappe(f.w * L.l2x / 100, f.h * L.l2y / 100, f.w * 0.54, f.h * 0.40, "rgba(232,197,107,ALPHA)", L.i2);

  // Le mur, dans la camera.
  g.save();
  g.globalAlpha = s.surfaceOpacity;
  g.translate(f.w / 2, f.h * cam.fy);
  g.scale(scale, scale);
  g.translate(-cam.cx, -cam.cy);
  const list = reel.cards().filter((c) => c.draw && c.draw.opacity > 0);
  list.sort((a, b) => a.draw.z - b.draw.z);
  for (const c of list) {
    g.save();
    g.globalAlpha = s.surfaceOpacity * c.draw.opacity;
    g.translate(c.draw.x, c.draw.y);
    g.rotate((c.draw.rot * Math.PI) / 180);
    g.scale(c.draw.scale, c.draw.scale);
    card(g, c, images);
    g.restore();
  }
  g.restore();

  // Vignettage.
  const vg = g.createRadialGradient(f.w / 2, f.h * 0.47, 0, f.w / 2, f.h * 0.47, Math.max(f.w, f.h) * 0.75);
  vg.addColorStop(0.38, "rgba(2,4,16,0)");
  vg.addColorStop(1, "rgba(2,4,16,0.62)");
  g.fillStyle = vg; g.fillRect(0, 0, f.w, f.h);

  // Grain : le meme motif, au meme calage que l'apercu.
  if (images.grain?.complete) {
    g.save();
    g.globalAlpha = 0.05;
    const [gx, gy] = s.grain;
    const p = g.createPattern(images.grain, "repeat");
    g.translate(-gx, -gy);
    g.fillStyle = p;
    g.fillRect(gx, gy, f.w + gx, f.h + gy);
    g.restore();
  }

  // Voiles et bandeaux.
  const scrim = (op, top) => {
    if (op <= 0) return;
    const h = f.h * 0.26;
    const grd = g.createLinearGradient(0, top ? 0 : f.h, 0, top ? h : f.h - h);
    grd.addColorStop(0, `rgba(5,9,34,${0.9 * op})`);
    grd.addColorStop(0.55, `rgba(5,9,34,${0.55 * op})`);
    grd.addColorStop(1, "rgba(5,9,34,0)");
    g.fillStyle = grd;
    g.fillRect(0, top ? 0 : f.h - h, f.w, h);
  };
  scrim(s.scrim.top, true);
  scrim(s.scrim.bot, false);

  if (s.topbar.op > 0) {
    g.save();
    g.globalAlpha = s.topbar.op;
    g.textAlign = "center";
    let y = f.h * 0.055;
    const logo = images.logo;
    if (logo?.complete) {
      const lw = 230, lh = (logo.naturalHeight / logo.naturalWidth) * lw;
      g.drawImage(logo, f.w / 2 - lw / 2, y, lw, lh);
      y += lh + 12;
    } else {
      g.font = `900 46px Inter, system-ui, sans-serif`;
      g.fillStyle = "#fff"; g.textBaseline = "top";
      g.fillText(brand.name, f.w / 2, y);
      y += 46 + 12;
    }
    g.fillStyle = brand.accent;
    g.fillRect(f.w / 2 - 23, y, 46, 3);
    y += 3 + 12;
    g.font = `700 17px Inter, system-ui, sans-serif`;
    g.fillStyle = "rgba(255,255,255,0.8)";
    g.textBaseline = "top";
    g.fillText([brand.title, brand.date].filter(Boolean).join(" · "), f.w / 2, y);
    g.restore();
  }

  if (s.counter.op > 0) {
    g.save();
    g.globalAlpha = s.counter.op;
    g.textAlign = "center";
    g.textBaseline = "alphabetic";
    g.font = `900 70px Inter, system-ui, sans-serif`;
    g.fillStyle = "#fff";
    const base = f.h * 0.94 - 20;
    g.fillText(s.counter.num, f.w / 2, base);
    g.font = `700 15px Inter, system-ui, sans-serif`;
    g.fillStyle = brand.accent;
    g.fillText("MESSAGES", f.w / 2, base + 22);
    g.restore();
  }

  s.logoImage = images.logo;
  lockup(g, s, "open");
  lockup(g, s, "close");
}
