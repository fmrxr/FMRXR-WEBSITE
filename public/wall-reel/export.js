// Rendu MP4 dans le navigateur, image par image.
//
// Le moteur pose une image (`seek`), le peintre la dessine sur un canvas,
// WebCodecs l'encode en H.264 et mp4-muxer l'empaquette. Rien ne depend de
// l'horloge : on avance de 1/30 de seconde a chaque tour, donc le fichier
// est le meme a chaque rendu, et il est identique a ce que l'apercu montre.

import { Muxer, ArrayBufferTarget } from "./vendor/mp4-muxer.mjs";
import { FPS, DURATION } from "./reel.js";
import { paintFrame } from "./paint.js";

/** Les images dont le peintre a besoin, chargees une fois pour toutes. */
async function loadImages(reel) {
  const map = new Map();
  const jobs = [];
  const add = (key, url, into) => {
    if (!url) return;
    const img = new Image();
    img.crossOrigin = "anonymous";
    jobs.push(new Promise((r) => { img.onload = img.onerror = r; }));
    img.src = url;
    into ? (map[key] = img) : map.set(key, img);
  };
  for (const c of reel.cards()) {
    for (const s of c.post.stickers ?? []) {
      if (!map.has(s.id)) {
        const el = document.querySelector(`img.sticker[src*="${s.id}"]`);
        add(s.id, el?.src, false);
      }
    }
  }
  add("logo", reel.scene()?.brand?.logo, true);
  add("grain", "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)'/%3E%3C/svg%3E", true);
  await Promise.all(jobs);
  return map;
}

export function canExport() {
  return typeof VideoEncoder !== "undefined" && typeof VideoFrame !== "undefined";
}

/**
 * Rend le reel et renvoie le fichier. `onProgress(fait, total)` est appele
 * a chaque image pour la barre d'avancement.
 */
export async function renderMp4(reel, { onProgress } = {}) {
  if (!canExport()) throw new Error("NO_WEBCODECS");

  const { w, h } = reel.scene().f;
  const total = Math.round(DURATION * FPS);

  const canvas = document.createElement("canvas");
  canvas.width = w; canvas.height = h;
  const g = canvas.getContext("2d", { alpha: false });

  // Les polices doivent etre la avant la premiere image, sinon les
  // premieres secondes sortent dans une police de secours.
  await document.fonts.ready;
  const images = await loadImages(reel);

  const muxer = new Muxer({
    target: new ArrayBufferTarget(),
    video: { codec: "avc", width: w, height: h },
    fastStart: "in-memory",
  });

  const encoder = new VideoEncoder({
    output: (chunk, meta) => muxer.addVideoChunk(chunk, meta),
    error: (e) => { throw e; },
  });
  // Niveau 5.2 : de quoi tenir du 1080 x 1920 a 30 images par seconde.
  encoder.configure({
    codec: "avc1.640034", width: w, height: h,
    bitrate: 9_000_000, framerate: FPS,
    latencyMode: "quality",
  });

  for (let i = 0; i < total; i++) {
    reel.seek(i / FPS);
    paintFrame(g, reel, images);
    const frame = new VideoFrame(canvas, {
      timestamp: Math.round((i * 1e6) / FPS),
      duration: Math.round(1e6 / FPS),
    });
    // Une image cle toutes les deux secondes : le fichier reste navigable
    // sans gonfler.
    encoder.encode(frame, { keyFrame: i % (FPS * 2) === 0 });
    frame.close();
    onProgress?.(i + 1, total);
    // On laisse l'encodeur souffler, sinon la file grossit sans fin et
    // l'onglet finit par manquer de memoire sur un reel entier.
    if (encoder.encodeQueueSize > 12) {
      await new Promise((r) => setTimeout(r, 0));
      while (encoder.encodeQueueSize > 6) await new Promise((r) => setTimeout(r, 4));
    }
  }

  await encoder.flush();
  muxer.finalize();
  return new Blob([muxer.target.buffer], { type: "video/mp4" });
}
