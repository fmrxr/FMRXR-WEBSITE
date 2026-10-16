// Image d'apercu des liens de /photobooth (WhatsApp, LinkedIn, X) : le paquet
// de cartes des vraies sorties de la borne, le titre, le logo FMRXR//.
// Usage : node scripts/photobooth/og.mjs  ->  public/photobooth/og.jpg
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = process.cwd();
const FONTS = path.join(ROOT, "public", "photobooth", "fonts");
const STYLES = path.join(ROOT, "public", "photobooth", "styles");
const W = 1200, H = 630, M = 64;

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
async function text(str, file, family, size, color, width, spacing = 0) {
  const { data, info } = await sharp({
    text: {
      text: `<span foreground="${color}"${spacing ? ` letter_spacing="${Math.round(spacing * 1024)}"` : ""}>${esc(str)}</span>`,
      font: `${family} ${size}`, fontfile: path.join(FONTS, file), width, rgba: true, dpi: 72, wrap: "word",
    },
  }).png().toBuffer({ resolveWithObject: true });
  return { input: data, width: info.width, height: info.height };
}

// Logo officiel (meme SVG que les portraits).
const src = fs.readFileSync(path.join(ROOT, "src/lib/photobooth/brand-logo.ts"), "utf8");
const logoSvg = JSON.parse(src.match(/FMRXR_LOGO_DARK_SVG = ("(?:[^"\\]|\\.)*")/)[1]);
const logo = await sharp(Buffer.from(logoSvg), { density: 400 }).resize({ height: 34 }).png().toBuffer();

// Une carte : portrait 3:4 arrondi, bordure fine, tourne.
async function card(id, h, deg) {
  const w = Math.round(h * 0.75), r = 18;
  const mask = Buffer.from(`<svg width="${w}" height="${h}"><rect width="${w}" height="${h}" rx="${r}" fill="#fff"/></svg>`);
  const edge = Buffer.from(`<svg width="${w}" height="${h}"><rect x="1" y="1" width="${w - 2}" height="${h - 2}" rx="${r}" fill="none" stroke="#ffffff" stroke-opacity="0.18" stroke-width="2"/></svg>`);
  const img = await sharp(path.join(STYLES, `${id}.webp`)).resize(w, h, { fit: "cover" })
    .composite([{ input: mask, blend: "dest-in" }, { input: edge }]).png().toBuffer();
  return sharp(img).rotate(deg, { background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toBuffer({ resolveWithObject: true });
}

const bg = Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">` +
  `<defs><filter id="b" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="80"/></filter></defs>` +
  `<rect width="${W}" height="${H}" fill="#0d0c14"/>` +
  `<g filter="url(#b)"><circle cx="900" cy="320" r="220" fill="#7BEF7B" fill-opacity="0.16"/><circle cx="1010" cy="200" r="160" fill="#8a7bef" fill-opacity="0.22"/></g>` +
  `</svg>`,
);

// Paquet : trois cartes en eventail, la nouvelle (Tarot) devant.
const deck = [["magazine", -11], ["card", 9], ["tarot", -2]];
const layers = [];
const CH = 430, cx = 915, cy = 318;
for (const [i, [id, deg]] of deck.entries()) {
  const c = await card(id, CH, deg);
  const dx = [-125, 125, 0][i];
  layers.push({ input: c.data, left: Math.round(cx + dx - c.info.width / 2), top: Math.round(cy + [14, 14, 0][i] - c.info.height / 2) });
}
layers.push({ input: logo, top: M, left: M });
const title = await text("AI PHOTO\nBOOTH", "Geist-Black.ttf", "Geist Black", 104, "#f5f5f8", 600);
layers.push({ input: title.input, top: 170, left: M - 4 });
const sub = await text("Branded AI portraits for events, in under a minute. Works with the booth you already have.", "Geist-Medium.ttf", "Geist Medium", 27, "#c9c8d4", 520);
layers.push({ input: sub.input, top: 170 + title.height + 28, left: M });
const foot = await text("15 STYLES · YOUR LOGO ON EVERY IMAGE · FMRXR.COM", "GeistMono-Medium.ttf", "Geist Mono Medium", 15, "#7BEF7B", 640, 1.5);
layers.push({ input: foot.input, top: H - M - foot.height, left: M });

const out = path.join(ROOT, "public", "photobooth", "og.jpg");
await sharp(bg).composite(layers).jpeg({ quality: 86, mozjpeg: true }).toFile(out);
console.log(out, fs.statSync(out).size);
