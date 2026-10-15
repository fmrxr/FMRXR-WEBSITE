import "server-only";
import sharp from "sharp";
import { FMRXR_LOGO_DARK_SVG } from "./brand-logo";

// Branding de la photo finale, applique cote serveur a toutes les sorties
// (ecran resultat, telechargement, page de partage, impression, galerie).
// Automatique, sans reglage : une bande sombre discrete en bas, le logo du
// client a gauche s'il est fourni (fichier officiel, utilise tel quel, jamais
// recolore ni recadre), le logo FMRXR// officiel a droite.

const CACHE = new Map<string, Buffer>(); // portrait source -> portrait brande
const LOGOS = new Map<string, Buffer | null>(); // url du logo client -> image
const MAX_CACHE = 40;

async function clientLogo(url: string): Promise<Buffer | null> {
  if (LOGOS.has(url)) return LOGOS.get(url)!;
  let buf: Buffer | null = null;
  try {
    if (url.startsWith("https://")) {
      const r = await fetch(url, { signal: AbortSignal.timeout(10_000) });
      const type = r.headers.get("content-type") ?? "";
      if (r.ok && type.startsWith("image/")) buf = Buffer.from(await r.arrayBuffer());
    }
  } catch {
    buf = null; // logo injoignable : la photo sort quand meme, avec FMRXR seul
  }
  LOGOS.set(url, buf);
  return buf;
}

/** Hauteurs relatives a la photo : lisibles en 10x15 imprime comme a l'ecran. */
export const BRAND_LAYOUT = {
  band: 0.15, // hauteur du degrade sombre en bas
  fmrxr: 0.032, // hauteur du logo FMRXR//
  client: 0.045, // hauteur max du logo client
  margin: 0.04, // marge laterale et basse (fraction de la largeur)
};

export async function brandPortrait(source: Buffer, clientLogoUrl: string): Promise<Buffer> {
  const img = sharp(source).rotate();
  const meta = await img.metadata();
  const W = meta.width ?? 1024;
  const H = meta.height ?? 1365;
  const L = BRAND_LAYOUT;
  const margin = Math.round(W * L.margin);
  const bandH = Math.round(H * L.band);

  const band = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${bandH}">
      <defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#0d0c14" stop-opacity="0"/>
        <stop offset="1" stop-color="#0d0c14" stop-opacity="0.72"/>
      </linearGradient></defs>
      <rect width="100%" height="100%" fill="url(#g)"/>
    </svg>`,
  );

  const fmrxrH = Math.max(24, Math.round(H * L.fmrxr));
  const fmrxr = await sharp(Buffer.from(FMRXR_LOGO_DARK_SVG), { density: 400 })
    .resize({ height: fmrxrH })
    .png()
    .toBuffer();
  const fmrxrMeta = await sharp(fmrxr).metadata();

  const layers: sharp.OverlayOptions[] = [
    { input: band, top: H - bandH, left: 0 },
    { input: fmrxr, top: H - margin - fmrxrH, left: W - margin - (fmrxrMeta.width ?? 0) },
  ];

  if (clientLogoUrl) {
    const raw = await clientLogo(clientLogoUrl);
    if (raw) {
      try {
        const maxH = Math.round(H * L.client);
        const logo = await sharp(raw, { density: 400 })
          .resize({ height: maxH, width: Math.round(W * 0.4), fit: "inside" })
          .png()
          .toBuffer();
        const m = await sharp(logo).metadata();
        layers.push({ input: logo, top: H - margin - (m.height ?? maxH), left: margin });
      } catch {
        // fichier illisible : on n'invente rien, FMRXR seul
      }
    }
  }

  return img.composite(layers).jpeg({ quality: 92, mozjpeg: true }).toBuffer();
}

/** Portrait brande, avec cache memoire (un portrait est relu par l'ecran, le QR, l'impression). */
export async function brandedFromUrl(resultUrl: string, clientLogoUrl: string): Promise<Buffer | null> {
  const key = `${resultUrl}|${clientLogoUrl}`;
  const hit = CACHE.get(key);
  if (hit) return hit;
  let src: Buffer;
  try {
    const r = await fetch(resultUrl, { signal: AbortSignal.timeout(30_000) });
    if (!r.ok || !(r.headers.get("content-type") ?? "").startsWith("image/")) return null;
    src = Buffer.from(await r.arrayBuffer());
  } catch {
    return null;
  }
  const out = await brandPortrait(src, clientLogoUrl);
  CACHE.set(key, out);
  if (CACHE.size > MAX_CACHE) CACHE.delete(CACHE.keys().next().value!);
  return out;
}
