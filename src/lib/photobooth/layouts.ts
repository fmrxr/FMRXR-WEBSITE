import "server-only";
import path from "node:path";
import sharp from "sharp";
import { FMRXR_LOGO_DARK_SVG } from "./brand-logo";
import type { Layout } from "./styles";

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
async function polaroid(src: Buffer, t: LayoutText, client: Buffer | null) {
  const W = 1600;
  const side = 90;
  const photo = W - side * 2;
  const H = side + photo + 430;
  const img = await sharp(src).rotate().resize(photo, photo, { fit: "cover", position: sharp.strategy.attention }).toBuffer();
  const title = await text(t.title, "medium", 70, "#1c1b22", photo - 40, "left");
  const date = await text(t.date, "mono", 30, "#6b6a75", 600);
  const logo = await fmrxrLogo(46);
  const cl = await clientPlate(client, 130);
  const layers: sharp.OverlayOptions[] = [
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
  const layers: sharp.OverlayOptions[] = [
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
  const layers: sharp.OverlayOptions[] = [
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
async function card(src: Buffer, t: LayoutText, client: Buffer | null) {
  const W = 1500;
  const H = 2100;
  const b = 46; // bordure
  const photoW = W - b * 2;
  const photoH = Math.round(H * 0.6);
  const img = await sharp(src).rotate().resize(photoW, photoH, { fit: "cover", position: sharp.strategy.attention }).toBuffer();
  const roundMask = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${photoW}" height="${photoH}"><rect width="${photoW}" height="${photoH}" rx="34" fill="#fff"/></svg>`);
  const photo = await sharp(img).composite([{ input: roundMask, blend: "dest-in" }]).png().toBuffer();
  const frame = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
      <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#7bef7b"/><stop offset="1" stop-color="#4d9fff"/></linearGradient></defs>
      <rect x="6" y="6" width="${W - 12}" height="${H - 12}" rx="56" fill="#111019" stroke="url(#g)" stroke-width="12"/>
    </svg>`,
  );
  const title = await text(t.title.toUpperCase(), "black", 92, "#f5f5f8", photoW - 40);
  const layers: sharp.OverlayOptions[] = [
    { input: photo, top: b + 150, left: b },
    { input: title.input, top: b + 30, left: b + 20 },
  ];
  // stats : libelle a gauche, valeur a droite, separateurs
  let y = b + 150 + photoH + 46;
  for (const [k, v] of t.stats) {
    const kk = await text(k.toUpperCase(), "mono", 30, "#7bef7b", 420, "left", 2);
    const vv = await text(v, "medium", 42, "#f5f5f8", photoW - 480, "right");
    layers.push({ input: kk.input, top: y + 8, left: b + 20 }, { input: vv.input, top: y, left: W - b - 20 - vv.width });
    y += Math.max(kk.height, vv.height) + 34;
  }
  const logo = await fmrxrLogo(46);
  const cl = await clientPlate(client, 140);
  layers.push({ input: logo.input, top: H - b - 30 - logo.height, left: W - b - 20 - logo.width });
  if (cl) layers.push({ input: cl.input, top: H - b - 30 - cl.height, left: b + 20 });
  const date = await text(t.date, "mono", 26, "#7b7a8e", 500);
  layers.push({ input: date.input, top: H - b - 30 - (cl ? cl.height + 44 : 40), left: b + 20 });
  return sharp(frame).composite(layers).jpeg({ quality: 93, mozjpeg: true }).toBuffer();
}

export async function renderLayout(layout: Exclude<Layout, "none">, src: Buffer, t: LayoutText, client: Buffer | null): Promise<Buffer> {
  switch (layout) {
    case "polaroid": return polaroid(src, t, client);
    case "magazine": return magazine(src, t, client);
    case "poster": return poster(src, t, client);
    case "card": return card(src, t, client);
  }
}
