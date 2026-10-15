import type { Gesture } from "./config";

// Classification de gestes a partir des 21 points de MediaPipe HandLandmarker.
// Fonctions pures (aucune dependance navigateur) pour etre testables.
// Indices : 0 poignet, 1-4 pouce, 5-8 index, 9-12 majeur, 13-16 annulaire, 17-20 auriculaire.
// Coordonnees normalisees, y vers le bas.

export type Point = { x: number; y: number; z?: number };

const dist = (a: Point, b: Point) => Math.hypot(a.x - b.x, a.y - b.y);

/** Un doigt est tendu si son bout est nettement plus loin du poignet que son articulation PIP. */
function extended(lm: Point[], tip: number, pip: number) {
  return dist(lm[tip], lm[0]) > dist(lm[pip], lm[0]) * 1.12;
}

function thumbExtended(lm: Point[]) {
  // Pouce : le bout s'eloigne de la base de l'index.
  return dist(lm[4], lm[5]) > dist(lm[3], lm[5]) * 1.15 && dist(lm[4], lm[0]) > dist(lm[2], lm[0]);
}

export function classifyGesture(lm: Point[]): Gesture | null {
  if (!lm || lm.length < 21) return null;
  const index = extended(lm, 8, 6);
  const middle = extended(lm, 12, 10);
  const ring = extended(lm, 16, 14);
  const pinky = extended(lm, 20, 18);
  const thumb = thumbExtended(lm);
  const fingers = [index, middle, ring, pinky].filter(Boolean).length;

  if (fingers === 4 && thumb) return "open_palm";
  if (index && middle && !ring && !pinky) return "peace";
  if (fingers === 0 && thumb) {
    // Pouce leve : le bout est au-dessus du reste de la main.
    const handTop = Math.min(lm[5].y, lm[9].y, lm[13].y, lm[17].y);
    const span = dist(lm[0], lm[9]);
    if (lm[4].y < handTop - span * 0.25) return "thumb_up";
    return null;
  }
  if (fingers === 0 && !thumb) return "fist";
  return null;
}

/**
 * Stabilisation : un geste n'est accepte qu'apres avoir ete vu sans
 * interruption pendant `holdMs`. Un trou court (main perdue une image) est
 * tolere, un autre geste remet le compteur a zero.
 */
export class GestureStabilizer {
  private current: Gesture | null = null;
  private since = 0;
  private lastSeen = 0;

  constructor(private holdMs = 900, private graceMs = 250) {}

  /** Renvoie le geste, sa progression 0..1 et s'il vient d'etre valide. */
  update(g: Gesture | null, now: number): { gesture: Gesture | null; progress: number; confirmed: boolean } {
    if (g === null) {
      if (this.current && now - this.lastSeen <= this.graceMs) {
        return { gesture: this.current, progress: this.progress(now), confirmed: false };
      }
      this.current = null;
      return { gesture: null, progress: 0, confirmed: false };
    }
    if (g !== this.current) {
      this.current = g;
      this.since = now;
    }
    this.lastSeen = now;
    const progress = this.progress(now);
    return { gesture: g, progress, confirmed: progress >= 1 };
  }

  reset() {
    this.current = null;
  }

  private progress(now: number) {
    return Math.min(1, (now - this.since) / this.holdMs);
  }
}

// ---------- decision : modele officiel + controle geometrique ----------
// Calibre le 15/10/2026 sur les images de test officielles MediaPipe
// (src/test/fixtures/hands.json) : GestureRecognizer donne la bonne categorie
// dans 40 cas sur 45 (miroir, rotation +-25 deg, main petite, sombre, basse
// resolution), sans jamais confondre deux de nos gestes. Scores corrects
// observes : 0,48 a 0,95, main ouverte 0,53 a 0,69.

/** Categories du modele officiel gesture_recognizer -> nos gestes. Les autres (Pointing_Up, ILoveYou, Thumb_Down, None) sont ignorees. */
export const RECOGNIZER_MAP: Record<string, Gesture> = {
  Open_Palm: "open_palm",
  Closed_Fist: "fist",
  Thumb_Up: "thumb_up",
  Victory: "peace",
};

export const DEFAULT_MIN_SCORE = 0.5;
/** Sous le seuil, on accepte quand meme si la geometrie de la main confirme, jusqu'a ce plancher. */
export const AGREEMENT_FLOOR = 0.35;

export function decideGesture(
  top: { categoryName: string; score: number } | undefined,
  landmarks: Point[] | undefined,
  minScore = DEFAULT_MIN_SCORE,
): Gesture | null {
  if (!top) return null;
  const mapped = RECOGNIZER_MAP[top.categoryName];
  if (!mapped) return null;
  if (top.score >= minScore) return mapped;
  if (top.score >= AGREEMENT_FLOOR && landmarks && classifyGesture(landmarks) === mapped) return mapped;
  return null;
}
