import "server-only";
import path from "node:path";
import sharp, { type OverlayOptions } from "sharp";
import { FMRXR_LOGO_DARK_SVG } from "./brand-logo";
import type { Layout } from "./styles";
import type { FaceBox } from "./face";

// Mises en page composees par nous apres generation (le texte n'est jamais
// demande a l'IA). Polices Geist embarquees (OFL) : le rendu ne depend pas
// des polices du serveur. Logos : FMRXR// officiel, logo client officiel sur
// plaque blanche.

const FONTS = path.join(process.cwd(), "public", "photobooth", "fonts");
const FONT = {
  black: { file: path.join(FONTS, "Geist-Black.ttf"), family: "Geist Black" },
  medium: { file: path.join(FONTS, "Geist-Medium.ttf"), family: "Geist Medium" },
  mono: { file: path.join(FONTS, "GeistMono-Medium.ttf"), family: "Geist Mono Medium" },
};

export type LayoutText = {
  title: string; // titre de l'ambiance, ex. « Calme · éditorial »
  subtitle: string; // description, ex. « Calme et minimale · Lumière douce · Éditorial minimal »
  masthead: string; // titre de la campagne
  stats: [string, string][]; // carte : [libelle, valeur]
  date: string;
};

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** Texte rendu en image (Pango), largeur max avec retour a la ligne. */
async function text(str: string, font: keyof typeof FONT, sizePx: number, color: string, width: number, align: "left" | "centre" | "right" = "left", spacing = 0) {
  const f = FONT[font];
  const { data, info } = await sharp({
    text: {
      text: `<span foreground="${color}"${spacing ? ` letter_spacing="${Math.round(spacing * 1024)}"` : ""}>${esc(str)}</span>`,
      font: `${f.family} ${sizePx}`,
      fontfile: f.file,
      width,
      align,
      rgba: true,
      dpi: 72,
      wrap: "word",
    },
  }).png().toBuffer({ resolveWithObject: true });
  return { input: data, width: info.width, height: info.height };
}

/** Texte sur une seule ligne, taille reduite jusqu'a tenir dans la largeur. */
async function fitText(str: string, font: keyof typeof FONT, maxPx: number, color: string, width: number, align: "left" | "centre" | "right" = "centre", spacing = 0) {
  let size = maxPx;
  for (let i = 0; i < 12; i++) {
    const r = await text(str, font, size, color, width * 3, align, spacing);
    if (r.width <= width) return r;
    size = Math.floor(size * Math.min(0.95, width / r.width));
  }
  return text(str, font, size, color, width, align, spacing);
}

async function fmrxrLogo(height: number) {
  const b = await sharp(Buffer.from(FMRXR_LOGO_DARK_SVG), { density: 400 }).resize({ height }).png().toBuffer();
  const m = await sharp(b).metadata();
  return { input: b, width: m.width ?? height * 4, height: m.height ?? height };
}

/** Logo client officiel, marge vide retiree, sur plaque blanche arrondie. */
async function clientPlate(raw: Buffer | null, height: number) {
  if (!raw) return null;
  try {
    const trimmed = await sharp(raw, { density: 400 }).trim({ threshold: 12 }).png().toBuffer().catch(() => raw);
    const pad = Math.round(height * 0.22);
    const logo = await sharp(trimmed).resize({ height: height - pad * 2 }).png().toBuffer();
    const m = await sharp(logo).metadata();
    const w = (m.width ?? height) + pad * 2;
    const plate = await sharp(Buffer.from(
      `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${height}"><rect width="${w}" height="${height}" rx="${Math.round(height * 0.14)}" fill="#ffffff"/></svg>`,
    )).composite([{ input: logo, top: pad, left: pad }]).png().toBuffer();
    return { input: plate, width: w, height };
  } catch {
    return null;
  }
}

const gradient = (w: number, h: number, from: number, to: number, dir: "down" | "up") => Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}"><defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#0d0c14" stop-opacity="${dir === "down" ? from : to}"/>
    <stop offset="1" stop-color="#0d0c14" stop-opacity="${dir === "down" ? to : from}"/>
  </linearGradient></defs><rect width="100%" height="100%" fill="url(#g)"/></svg>`,
);

// ---------- Polaroid ----------
/**
 * Recadre l'image au format de la fenetre. Visages connus : ils sont places
 * dans le tiers haut de la fenetre (le cadrage d'origine est garde a la
 * generation, le visage n'est donc plus forcement au centre). Sinon, zone la
 * plus saillante (sharp « attention »).
 */
async function fitWindow(src: Buffer, w: number, h: number, face: FaceBox | null): Promise<Buffer> {
  if (!face) return sharp(src).rotate().resize(w, h, { fit: "cover", position: sharp.strategy.attention }).toBuffer();
  const { data, info } = await sharp(src).rotate().toBuffer({ resolveWithObject: true });
  const W = info.width, H = info.height;
  const target = w / h;
  let cw = W, ch = Math.round(W / target);
  if (ch > H) { ch = H; cw = Math.round(H * target); }
  const cx = (face.x + face.w / 2) * W;
  const cy = (face.y + face.h / 2) * H;
  const clamp = (v: number, max: number) => Math.round(Math.min(Math.max(0, v), Math.max(0, max)));
  const left = clamp(cx - cw / 2, W - cw);
  const top = clamp(cy - ch * 0.38, H - ch);
  return sharp(data).extract({ left, top, width: cw, height: ch }).resize(w, h).toBuffer();
}

async function polaroid(src: Buffer, t: LayoutText, client: Buffer | null, face: FaceBox | null) {
  const W = 1600;
  const side = 90;
  const photo = W - side * 2;
  const H = side + photo + 430;
  const img = await fitWindow(src, photo, photo, face);
  const title = await text(t.title, "medium", 70, "#1c1b22", photo - 40, "left");
  const date = await text(t.date, "mono", 30, "#6b6a75", 600);
  const logo = await fmrxrLogo(46);
  const cl = await clientPlate(client, 130);
  const layers: OverlayOptions[] = [
    { input: img, top: side, left: side },
    { input: title.input, top: side + photo + 70, left: side + 10 },
    { input: date.input, top: H - 90, left: side + 10 },
    // FMRXR en sombre sur fond creme : logo blanc sur pastille sombre discrete
    { input: await pill(logo), top: H - 104, left: W - side - (logo.width + 40) },
  ];
  if (cl) layers.push({ input: cl.input, top: H - 104 - cl.height - 18, left: W - side - cl.width });
  return sharp({ create: { width: W, height: H, channels: 3, background: "#f4f1ea" } })
    .composite(layers).jpeg({ quality: 93, mozjpeg: true }).toBuffer();
}

async function pill(logo: { input: Buffer; width: number; height: number }) {
  const w = logo.width + 40;
  const h = logo.height + 28;
  return sharp(Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}"><rect width="${w}" height="${h}" rx="${h / 2}" fill="#0d0c14"/></svg>`))
    .composite([{ input: logo.input, top: 14, left: 20 }]).png().toBuffer();
}

// ---------- Couverture magazine ----------
async function magazine(src: Buffer, t: LayoutText, client: Buffer | null) {
  const base = sharp(src).rotate();
  const { width: W = 1744, height: H = 2336 } = await base.metadata();
  const m = Math.round(W * 0.06);
  const mast = await fitText(t.masthead.toUpperCase(), "black", Math.round(W * 0.16), "#f5f5f8", W - m * 2, "centre", -2);
  const issue = await text(`N°01 · ${t.date}`, "mono", Math.round(W * 0.018), "#f5f5f8", W - m * 2, "centre");
  const coverTitle = await text(t.title.toUpperCase(), "black", Math.round(W * 0.075), "#f5f5f8", Math.round(W * 0.62));
  const lines = await text(t.subtitle, "medium", Math.round(W * 0.026), "#f5f5f8", Math.round(W * 0.55));
  const logo = await fmrxrLogo(Math.round(H * 0.026));
  const cl = await clientPlate(client, Math.round(H * 0.075));
  const top = Math.round(H * 0.035);
  const footer = Math.max(logo.height, cl?.height ?? 0);
  const ct = H - m - footer - 44 - lines.height - 24 - coverTitle.height;
  const layers: OverlayOptions[] = [
    { input: gradient(W, Math.round(H * 0.3), 0.75, 0, "down"), top: 0, left: 0 },
    { input: gradient(W, Math.round(H * 0.38), 0, 0.8, "down"), top: H - Math.round(H * 0.38), left: 0 },
    { input: mast.input, top, left: m },
    { input: issue.input, top: top + mast.height + 10, left: m },
    { input: coverTitle.input, top: ct, left: m },
    { input: lines.input, top: ct + coverTitle.height + 24, left: m },
    { input: logo.input, top: H - m - logo.height, left: W - m - logo.width },
  ];
  if (cl) layers.push({ input: cl.input, top: H - m - cl.height, left: m });
  return base.composite(layers).jpeg({ quality: 93, mozjpeg: true }).toBuffer();
}

// ---------- Affiche de film ----------
async function poster(src: Buffer, t: LayoutText, client: Buffer | null) {
  const base = sharp(src).rotate();
  const { width: W = 1744, height: H = 2336 } = await base.metadata();
  const m = Math.round(W * 0.07);
  const tagline = await text(t.subtitle.toUpperCase(), "mono", Math.round(W * 0.017), "#d8d6df", W - m * 2, "centre", 2);
  const title = await text(t.title.toUpperCase(), "black", Math.round(W * 0.1), "#f5f5f8", W - m * 2, "centre", -1);
  const credits = await text(`A FMRXR STUDIO PRODUCTION · ${t.masthead.toUpperCase()} · ${t.date}`, "mono", Math.round(W * 0.014), "#a9a7b3", W - m * 2, "centre", 1);
  const logo = await fmrxrLogo(Math.round(H * 0.022));
  const cl = await clientPlate(client, Math.round(H * 0.065));
  const bottom = H - m;
  const logoTop = bottom - Math.max(logo.height, cl?.height ?? 0);
  const creditsTop = logoTop - 30 - credits.height;
  const titleTop = creditsTop - 34 - title.height;
  const tagTop = titleTop - 24 - tagline.height;
  const layers: OverlayOptions[] = [
    { input: gradient(W, Math.round(H * 0.5), 0, 0.92, "down"), top: H - Math.round(H * 0.5), left: 0 },
    { input: tagline.input, top: tagTop, left: Math.round((W - tagline.width) / 2) },
    { input: title.input, top: titleTop, left: Math.round((W - title.width) / 2) },
    { input: credits.input, top: creditsTop, left: Math.round((W - credits.width) / 2) },
  ];
  if (cl) {
    const gap = 40;
    const total = cl.width + gap + logo.width;
    const x = Math.round((W - total) / 2);
    layers.push({ input: cl.input, top: logoTop, left: x }, { input: logo.input, top: logoTop + Math.round((cl.height - logo.height) / 2), left: x + cl.width + gap });
  } else {
    layers.push({ input: logo.input, top: logoTop, left: Math.round((W - logo.width) / 2) });
  }
  return base.composite(layers).jpeg({ quality: 93, mozjpeg: true }).toBuffer();
}

// ---------- Carte a collectionner ----------
// Inspiree de la carte la plus chere jamais vendue (Pikachu Illustrator PSA 10,
// 16,49 M$, Goldin, 16/02/2026, record Guinness) : une carte de jeu des annees
// 1998 (cadre jaune, barre de nom, fenetre d'illustration doree, bandeau
// d'infos, boite de texte, credit d'illustrateur, rarete), presentee dans son
// boitier de gradation. Rien de la marque Pokemon ni du label PSA : la carte
// et l'etiquette sont les notres. Format 2:3, imprime tel quel en 10 x 15.
function serialOf(t: LayoutText): string {
  let h = 2166136261;
  for (const c of `${t.title}|${t.date}|${t.masthead}`) h = Math.imul(h ^ c.charCodeAt(0), 16777619);
  return String((h >>> 0) % 100000000).padStart(8, "0");
}

async function card(src: Buffer, t: LayoutText, client: Buffer | null, face: FaceBox | null) {
  const W = 1600, H = 2400;
  // boitier, etiquette, carte
  const S = { x: 170, y: 170, w: 1260, h: 2060, r: 52 };
  const L = { x: 210, y: 210, w: 1180, h: 270 };
  const C = { x: 250, y: 545, w: 1100, h: 1540 };
  const ink = "#1b1a22";

  // fenetre d'illustration
  const A = { x: 80, y: 178, w: 940, h: 700 };
  const art = await fitWindow(src, A.w, A.h, face);

  const serial = serialOf(t);
  // code-barres decoratif tire du numero de serie (pas un vrai code lisible)
  let bars = "";
  let bx = 0;
  for (let i = 0; i < 46; i++) {
    const d = Number(serial[i % 8]) + i;
    const w = 2 + (d % 3) * 2;
    if (i % 2 === 0) bars += `<rect x="${bx}" y="0" width="${w}" height="54" fill="${ink}"/>`;
    bx += w + 2;
  }

  const base = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
      <defs>
        <radialGradient id="bg" cx="0.5" cy="0.42" r="0.75"><stop offset="0" stop-color="#22202e"/><stop offset="1" stop-color="#0d0c14"/></radialGradient>
        <linearGradient id="yel" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f7d84a"/><stop offset="0.5" stop-color="#f2c41c"/><stop offset="1" stop-color="#e3ab0e"/></linearGradient>
        <linearGradient id="gold" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fbe9a6"/><stop offset="0.45" stop-color="#c9a24a"/><stop offset="1" stop-color="#f3dc8b"/></linearGradient>
        <linearGradient id="panel" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ecebe6"/><stop offset="1" stop-color="#d9d6cd"/></linearGradient>
        <pattern id="hatch" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(35)"><rect width="8" height="8" fill="none"/><line x1="0" y1="0" x2="0" y2="8" stroke="#000" stroke-opacity="0.035" stroke-width="3"/></pattern>
        <filter id="soft" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="28"/></filter>
      </defs>
      <rect width="${W}" height="${H}" fill="url(#bg)"/>
      <ellipse cx="${W / 2}" cy="${S.y + S.h + 40}" rx="${S.w * 0.46}" ry="40" fill="#000" opacity="0.55" filter="url(#soft)"/>
      <!-- boitier acrylique -->
      <rect x="${S.x}" y="${S.y}" width="${S.w}" height="${S.h}" rx="${S.r}" fill="#ffffff" fill-opacity="0.07" stroke="#ffffff" stroke-opacity="0.38" stroke-width="6"/>
      <rect x="${S.x + 18}" y="${S.y + 18}" width="${S.w - 36}" height="${S.h - 36}" rx="${S.r - 14}" fill="none" stroke="#ffffff" stroke-opacity="0.12" stroke-width="3"/>
      <rect x="${C.x - 26}" y="${C.y - 26}" width="${C.w + 52}" height="${C.h + 52}" rx="40" fill="#000" fill-opacity="0.22" stroke="#ffffff" stroke-opacity="0.16" stroke-width="3"/>
      <!-- etiquette -->
      <rect x="${L.x}" y="${L.y}" width="${L.w}" height="${L.h}" rx="18" fill="#f4f3ef" stroke="#d6d3ca" stroke-width="4"/>
      <line x1="${L.x + 820}" y1="${L.y + 30}" x2="${L.x + 820}" y2="${L.y + L.h - 30}" stroke="#d6d3ca" stroke-width="3"/>
      <g transform="translate(${L.x + 40},${L.y + L.h - 84})">${bars}</g>
      <!-- carte -->
      <g transform="translate(${C.x},${C.y})">
        <rect width="${C.w}" height="${C.h}" rx="46" fill="url(#yel)"/>
        <rect x="44" y="44" width="${C.w - 88}" height="${C.h - 88}" rx="20" fill="url(#panel)"/>
        <rect x="44" y="44" width="${C.w - 88}" height="${C.h - 88}" rx="20" fill="url(#hatch)"/>
        <circle cx="${C.w - 118}" cy="118" r="40" fill="${ink}"/>
        <rect x="${A.x - 12}" y="${A.y - 12}" width="${A.w + 24}" height="${A.h + 24}" rx="6" fill="url(#gold)"/>
        <rect x="${A.x - 3}" y="${A.y - 3}" width="${A.w + 6}" height="${A.h + 6}" fill="${ink}"/>
        <rect x="${A.x + 40}" y="${A.y + A.h + 26}" width="${A.w - 80}" height="50" rx="10" fill="url(#gold)"/>
        <rect x="80" y="985" width="${C.w - 160}" height="380" rx="10" fill="#ffffff" fill-opacity="0.45" stroke="#bdb8ab" stroke-width="2"/>
      </g>
    </svg>`,
  );

  const layers: OverlayOptions[] = [{ input: art, top: C.y + A.y, left: C.x + A.x }];

  // barre de nom : titre de l'ambiance, et la marque // dans le cercle a droite
  const name = await fitText(t.title, "black", 66, ink, 760, "left");
  layers.push({ input: name.input, top: C.y + 118 - Math.round(name.height / 2), left: C.x + 84 });
  const mark = await text("//", "black", 40, "#7bef7b", 120, "centre");
  layers.push({ input: mark.input, top: C.y + 118 - Math.round(mark.height / 2), left: C.x + C.w - 118 - Math.round(mark.width / 2) });

  // bandeau d'infos sous l'illustration
  const info = await fitText(`${t.masthead || "FMRXR//"} · ${t.date} · PORTRAIT 1/1`.toUpperCase(), "mono", 24, ink, A.w - 120, "centre", 1);
  layers.push({ input: info.input, top: C.y + A.y + A.h + 51 - Math.round(info.height / 2), left: C.x + Math.round((C.w - info.width) / 2) });

  // boite de texte : les reponses, comme les attaques d'une carte de jeu
  const rows = t.stats.slice(0, 4);
  const rowH = rows.length ? Math.floor(380 / rows.length) : 0;
  for (const [i, [k, v]] of rows.entries()) {
    const cy = C.y + 985 + rowH * i + Math.round(rowH / 2);
    const kk = await fitText(k, "black", 40, ink, 360, "left");
    const vv = await fitText(v, "medium", 40, ink, 520, "right");
    layers.push({ input: kk.input, top: cy - Math.round(kk.height / 2), left: C.x + 116 }, { input: vv.input, top: cy - Math.round(vv.height / 2), left: C.x + C.w - 116 - vv.width });
    if (i < rows.length - 1) {
      layers.push({ input: Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${C.w - 232}" height="2"><rect width="${C.w - 232}" height="2" fill="#bdb8ab"/></svg>`), top: C.y + 985 + rowH * (i + 1), left: C.x + 116 });
    }
  }

  // pied de carte : illustrateur, rarete, numerotation
  const illus = await text("Illus. FMRXR// AI Photobooth", "mono", 22, ink, 520, "left");
  const star = await text("★", "black", 34, ink, 60, "centre");
  const num = await text("1/1", "mono", 24, ink, 160, "right");
  const fy = C.y + C.h - 92;
  layers.push(
    { input: illus.input, top: fy, left: C.x + 84 },
    { input: star.input, top: fy - 6, left: C.x + Math.round((C.w - star.width) / 2) },
    { input: num.input, top: fy, left: C.x + C.w - 84 - num.width },
  );

  // etiquette du boitier : edition, campagne, serie ; a droite la note
  const l1 = await fitText("2026 FMRXR// AI PHOTOBOOTH", "black", 34, ink, 700, "left");
  const l2 = await fitText((t.masthead || "Portrait").toUpperCase(), "medium", 30, ink, 700, "left");
  const l3 = await text(`${t.title.toUpperCase()} · N° ${serial}`, "mono", 22, "#4a4856", 760, "left");
  layers.push(
    { input: l1.input, top: L.y + 34, left: L.x + 40 },
    { input: l2.input, top: L.y + 34 + l1.height + 10, left: L.x + 40 },
    { input: l3.input, top: L.y + 34 + l1.height + l2.height + 22, left: L.x + 40 },
  );
  const gem = await text("GEM MT", "black", 34, ink, 300, "centre");
  const ten = await text("10", "black", 132, ink, 300, "centre");
  const gx = L.x + 820 + Math.round((L.w - 820) / 2);
  layers.push({ input: gem.input, top: L.y + 36, left: gx - Math.round(gem.width / 2) }, { input: ten.input, top: L.y + 70, left: gx - Math.round(ten.width / 2) });
  const cl = await clientPlate(client, 72);
  if (cl) layers.push({ input: cl.input, top: L.y + L.h - 30 - cl.height, left: L.x + 820 - 30 - cl.width });

  // reflet du verre par-dessus tout
  const glare = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${S.w}" height="${S.h}">
      <defs><linearGradient id="gl" x1="0" y1="0" x2="1" y2="0.6"><stop offset="0" stop-color="#fff" stop-opacity="0.16"/><stop offset="0.32" stop-color="#fff" stop-opacity="0.03"/><stop offset="0.5" stop-color="#fff" stop-opacity="0"/><stop offset="0.78" stop-color="#fff" stop-opacity="0.05"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient></defs>
      <rect width="${S.w}" height="${S.h}" rx="${S.r}" fill="url(#gl)"/>
    </svg>`,
  );
  layers.push({ input: glare, top: S.y, left: S.x });

  // la marque du studio sous le boitier
  const logo = await fmrxrLogo(40);
  layers.push({ input: logo.input, top: H - 78, left: Math.round((W - logo.width) / 2) });

  return sharp(base).composite(layers).jpeg({ quality: 93, mozjpeg: true }).toBuffer();
}

export async function renderLayout(layout: Exclude<Layout, "none">, src: Buffer, t: LayoutText, client: Buffer | null, face: FaceBox | null = null): Promise<Buffer> {
  switch (layout) {
    case "polaroid": return polaroid(src, t, client, face);
    case "magazine": return magazine(src, t, client);
    case "poster": return poster(src, t, client);
    case "card": return card(src, t, client, face);
  }
}

/**
 * Image d'apercu d'un lien de campagne (WhatsApp, Instagram, iMessage...) :
 * 1200x630, titre de la campagne, accroche, aura dans les couleurs des
 * ambiances, logo client officiel et FMRXR//.
 */
export async function renderLinkCard(o: { title: string; subtitle: string; palette: string[]; client: Buffer | null }): Promise<Buffer> {
  const W = 1200, H = 630, M = 64;
  const c = o.palette.length ? o.palette : ["#5C85BD", "#C9C5DF", "#F18D85"];
  const at = (i: number) => c[i % c.length];
  // Aura : halos flous superposes et anneaux concentriques nets, cote droit.
  const aura = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">` +
    `<defs><filter id="b" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="70"/></filter></defs>` +
    `<rect width="${W}" height="${H}" fill="#0d0c14"/>` +
    `<g filter="url(#b)">` +
    `<circle cx="900" cy="330" r="230" fill="${at(0)}" fill-opacity="0.55"/>` +
    `<circle cx="990" cy="220" r="170" fill="${at(1)}" fill-opacity="0.5"/>` +
    `<circle cx="830" cy="450" r="160" fill="${at(2)}" fill-opacity="0.45"/>` +
    `</g>` +
    [250, 310, 370, 430].map((r, i) => `<circle cx="900" cy="315" r="${r}" fill="none" stroke="${at(i)}" stroke-opacity="${0.4 - i * 0.08}" stroke-width="2"/>`).join("") +
    // Voile a gauche : le texte reste lisible quelle que soit la couleur.
    `<rect width="${W}" height="${H}" fill="url(#v)"/>` +
    `<defs><linearGradient id="v" x1="0" x2="1"><stop offset="0" stop-color="#0d0c14" stop-opacity="0.92"/><stop offset="0.55" stop-color="#0d0c14" stop-opacity="0.35"/><stop offset="1" stop-color="#0d0c14" stop-opacity="0"/></linearGradient></defs>` +
    `</svg>`,
  );
  const layers: OverlayOptions[] = [];
  const logo = await fmrxrLogo(30);
  layers.push({ input: logo.input, top: M, left: M });
  const title = await fitText(o.title.toUpperCase(), "black", 104, "#f5f5f8", 680, "left");
  const titleTop = 200;
  layers.push({ input: title.input, top: titleTop, left: M });
  const sub = o.subtitle ? await text(o.subtitle, "medium", 30, "#c9c8d4", 600, "left") : null;
  if (sub) layers.push({ input: sub.input, top: titleTop + title.height + 26, left: M });
  const plate = await clientPlate(o.client, 84);
  if (plate) layers.push({ input: plate.input, top: H - M - plate.height, left: M });
  return sharp(aura).composite(layers).jpeg({ quality: 88 }).toBuffer();
}
