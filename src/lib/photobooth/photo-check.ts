// Controle de la photo avant l'envoi : ce qui donne des visages « fondus »
// ou invente par l'IA (visage absent, trop loin, coupe, trop sombre, flou,
// yeux fermes). Mesure faite sur la borne (faceBox.ts) ; ici, les regles,
// pures et testees. Seul « aucun visage » bloque l'envoi : le reste est un
// conseil, l'invite garde la main (et chaque envoi evite est un portrait
// paye en moins).

export const PHOTO_ISSUES = ["no_face", "far", "cut", "dark", "bright", "blur", "eyes_closed"] as const;
export type PhotoIssue = (typeof PHOTO_ISSUES)[number];

export type FaceMetrics = {
  /** Rectangle de chaque visage (0-1). */
  faces: { x: number; y: number; w: number; h: number }[];
  /** Luminance moyenne (0-255) sur les visages. */
  luma: number;
  /** Variance du laplacien sur les visages (netteté, image reduite a 160 px). */
  sharpness: number;
  /** Probabilite moyenne des yeux fermes (blendshapes MediaPipe), max sur les visages. */
  eyesClosed: number;
};

/** Seuils : prudents, pour ne jamais gronder une bonne photo. */
export const LIMITS = {
  soloMinFace: 0.12, // hauteur du visage / hauteur de la photo
  groupMinFace: 0.07,
  edge: 0.01,
  dark: 55,
  bright: 225,
  blur: 18,
  eyesClosed: 0.6,
};

export function photoIssues(m: FaceMetrics, shot: "solo" | "group"): PhotoIssue[] {
  if (m.faces.length === 0) return ["no_face"];
  const out: PhotoIssue[] = [];
  const min = shot === "group" ? LIMITS.groupMinFace : LIMITS.soloMinFace;
  if (Math.min(...m.faces.map((f) => f.h)) < min) out.push("far");
  const e = LIMITS.edge;
  if (m.faces.some((f) => f.x < e || f.y < e || f.x + f.w > 1 - e || f.y + f.h > 1 - e)) out.push("cut");
  if (m.luma < LIMITS.dark) out.push("dark");
  else if (m.luma > LIMITS.bright) out.push("bright");
  if (m.sharpness < LIMITS.blur) out.push("blur");
  if (m.eyesClosed > LIMITS.eyesClosed) out.push("eyes_closed");
  return out;
}

/** Luminance moyenne d'une image RGBA. */
export function meanLuma(px: Uint8ClampedArray): number {
  let sum = 0;
  const n = px.length / 4;
  for (let i = 0; i < px.length; i += 4) sum += 0.2126 * px[i] + 0.7152 * px[i + 1] + 0.0722 * px[i + 2];
  return n ? sum / n : 0;
}

/** Variance du laplacien (niveaux de gris) : bas = flou. */
export function laplacianVariance(px: Uint8ClampedArray, w: number, h: number): number {
  if (w < 3 || h < 3) return 0;
  const g = new Float32Array(w * h);
  for (let i = 0; i < w * h; i++) g[i] = 0.2126 * px[i * 4] + 0.7152 * px[i * 4 + 1] + 0.0722 * px[i * 4 + 2];
  let sum = 0, sum2 = 0, n = 0;
  for (let y = 1; y < h - 1; y++) {
    for (let x = 1; x < w - 1; x++) {
      const i = y * w + x;
      const v = g[i - w] + g[i + w] + g[i - 1] + g[i + 1] - 4 * g[i];
      sum += v; sum2 += v * v; n++;
    }
  }
  const mean = sum / n;
  return sum2 / n - mean * mean;
}
