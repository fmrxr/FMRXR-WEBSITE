// Image d'apercu par defaut des liens fmrxr.com (pages sans image propre) :
// un plan du film de la methode, le logo et la promesse du studio.
// Usage : node scripts/og-default.mjs  ->  public/og/fmrxr.jpg
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = process.cwd();
const FONTS = path.join(ROOT, "public", "photobooth", "fonts");
const W = 1200, H = 630, M = 64;
const env = fs.readFileSync(path.join(ROOT, ".env.local"), "utf8");
const SUPA = env.match(/NEXT_PUBLIC_SUPABASE_URL=["']?([^"'\r\n]+)/)[1];

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

// Plan du film : l'ecran d'ondes et la foule de particules, sans les textes du film.
const res = await fetch(`${SUPA}/storage/v1/object/public/media/fmrxr-method-film-poster.jpg`);
const poster = Buffer.from(await res.arrayBuffer());
const plate = await sharp(poster).extract({ left: 290, top: 100, width: 1240, height: 651 }).resize(W, H).toBuffer();

const veil = Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">` +
  `<defs><linearGradient id="v" x1="0" x2="1"><stop offset="0" stop-color="#0d0c14" stop-opacity="0.96"/><stop offset="0.5" stop-color="#0d0c14" stop-opacity="0.55"/><stop offset="1" stop-color="#0d0c14" stop-opacity="0.1"/></linearGradient></defs>` +
  `<rect width="${W}" height="${H}" fill="url(#v)"/></svg>`,
);

const src = fs.readFileSync(path.join(ROOT, "src/lib/photobooth/brand-logo.ts"), "utf8");
const logoSvg = JSON.parse(src.match(/FMRXR_LOGO_DARK_SVG = ("(?:[^"\\]|\\.)*")/)[1]);
const logo = await sharp(Buffer.from(logoSvg), { density: 400 }).resize({ height: 34 }).png().toBuffer();

const layers = [{ input: veil }, { input: logo, top: M, left: M }];
const title = await text("CREATIVE\nTECHNOLOGY", "Geist-Black.ttf", "Geist Black", 80, "#f5f5f8", 640);
layers.push({ input: title.input, top: 190, left: M - 4 });
const sub = await text("Immersive installations, projection mapping, generative systems and live A/V. Tunis, working internationally.", "Geist-Medium.ttf", "Geist Medium", 26, "#c9c8d4", 560);
layers.push({ input: sub.input, top: 190 + title.height + 26, left: M });
const foot = await text("FROM BRIEF TO OPENING NIGHT · FMRXR.COM", "GeistMono-Medium.ttf", "Geist Mono Medium", 15, "#7BEF7B", 640, 1.5);
layers.push({ input: foot.input, top: H - M - foot.height, left: M });

fs.mkdirSync(path.join(ROOT, "public", "og"), { recursive: true });
const out = path.join(ROOT, "public", "og", "fmrxr.jpg");
await sharp(plate).composite(layers).jpeg({ quality: 86, mozjpeg: true }).toFile(out);
console.log(out, fs.statSync(out).size);
