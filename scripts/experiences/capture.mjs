// Affiches (jpg 16:9) et boucles d'aperçu (mp4 muet) de chaque expérience,
// capturées sur le serveur de dev. Une page par expérience, enregistrée par
// Playwright, puis recadrée et compressée par ffmpeg.
//
//   NODE_PATH=<node_modules avec playwright-core> node scripts/experiences/capture.mjs [slug ...]
//   BASE=http://localhost:3000 par défaut, FFMPEG=ffmpeg par défaut.
import { createRequire } from "node:module";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright-core");
const HERE = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.resolve(HERE, "..", "..", "public", "experiences", "_media");
const TMP = path.join(OUT, ".tmp");
const BASE = process.env.BASE || "http://localhost:3000";
const FFMPEG = process.env.FFMPEG || "ffmpeg";
const W = 1280, H = 720;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// Ce que fait la « main » pendant l'enregistrement, par expérience.
async function circle(page, cx, cy, r, ms) {
  const t0 = Date.now();
  await page.mouse.move(cx + r, cy);
  await page.mouse.down();
  while (Date.now() - t0 < ms) {
    const a = ((Date.now() - t0) / 1600) * Math.PI * 2;
    await page.mouse.move(cx + Math.cos(a) * r, cy + Math.sin(a) * r * 0.6);
    await sleep(30);
  }
  await page.mouse.up();
}

const SHOTS = {
  radiance: { url: "/experiences/radiance/index.html", warm: 3000, act: (p) => circle(p, 520, 380, 220, 9000) },
  "access-protocol": {
    url: "/experiences/access-protocol/index.html", warm: 2500,
    act: async (p) => {
      await p.click("#btnStart").catch(() => {});
      const t0 = Date.now();
      while (Date.now() - t0 < 9000) {
        await p.mouse.click(200 + Math.random() * 880, 150 + Math.random() * 450);
        await sleep(220);
      }
    },
  },
  "spicy-airport": { url: "/experiences/spicy-airport/index.html", warm: 7000, act: (p) => circle(p, 640, 360, 160, 9000) },
  "le-son-de-la-terre": { url: "/experiences/le-son-de-la-terre/index.html", warm: 5000, act: () => sleep(9000) },
  "lab-storm-tunnel": { url: "/experiences/labs/storm.html", warm: 3000, act: () => sleep(9000) },
  "lab-flooded": { url: "/experiences/labs/flooded.html", warm: 3000, act: () => sleep(9000) },
  "lab-stormy-torus": { url: "/experiences/labs/torus.html", warm: 3000, act: () => sleep(9000) },
  "lab-phyllotaxis": { url: "/experiences/labs/index.html?s=phyllotaxis_grid", warm: 1500, act: () => sleep(9000) },
  "lab-depth-tunnel": { url: "/experiences/labs/index.html?s=tox13_depth_tunnel", warm: 1500, act: () => sleep(9000) },
  "lab-bouncing-bars": { url: "/experiences/labs/index.html?s=tox4_bouncing_bars", warm: 1500, act: () => sleep(9000) },
  "lab-lightpos-noise": { url: "/experiences/labs/index.html?s=tox8_lightpos_noise", warm: 1500, act: () => sleep(9000) },
};

fs.mkdirSync(TMP, { recursive: true });
const exe = process.env.CHROME || `${process.env.LOCALAPPDATA}/ms-playwright/chromium-1243/chrome-win64/chrome.exe`;
const browser = await chromium.launch({ executablePath: exe, args: ["--use-angle=default", "--ignore-gpu-blocklist"] });

for (const slug of process.argv.slice(2).length ? process.argv.slice(2) : Object.keys(SHOTS)) {
  const s = SHOTS[slug];
  const ctx = await browser.newContext({ viewport: { width: W, height: H }, recordVideo: { dir: TMP, size: { width: W, height: H } } });
  const page = await ctx.newPage();
  await page.goto(BASE + s.url, { waitUntil: "load" });
  await sleep(s.warm);
  await s.act(page);
  await page.screenshot({ path: path.join(OUT, `${slug}.jpg`), type: "jpeg", quality: 82 });
  const video = page.video();
  await ctx.close();
  const webm = await video.path();
  // On garde 7 s prises après l'échauffement : ni écran de chargement, ni scène vide.
  // Les 7 dernières secondes : c'est la partie où la « main » agit, quel que
  // soit le temps de chargement (une scène lourde réduit la durée enregistrée).
  const probe = FFMPEG.replace(/ffmpeg(\.exe)?$/i, (m) => m.replace("ffmpeg", "ffprobe"));
  const dur = parseFloat(execFileSync(probe, ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", webm]).toString());
  const start = Math.max(0, dur - 7.5).toFixed(2);
  execFileSync(FFMPEG, ["-y", "-loglevel", "error", "-ss", start, "-t", "7", "-i", webm,
    "-vf", "scale=960:540", "-an", "-c:v", "libx264", "-preset", "slow", "-crf", "30",
    "-pix_fmt", "yuv420p", "-movflags", "+faststart", path.join(OUT, `${slug}.mp4`)]);
  fs.rmSync(webm, { force: true });
  const kb = Math.round(fs.statSync(path.join(OUT, `${slug}.mp4`)).size / 1024);
  console.log(`ok ${slug} · mp4 ${kb} Ko`);
}

await browser.close();
fs.rmSync(TMP, { recursive: true, force: true });
