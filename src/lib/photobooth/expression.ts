import type { Localized } from "./config";

// Lecture d'expression, sur l'appareil, a partir des « blendshapes » du modele
// officiel MediaPipe FaceLandmarker (valeurs de 0 a 1 par muscle du visage).
//
// Ce n'est pas une detection d'emotion : on decrit une expression visible
// (sourire, sourcils, yeux) pour nuancer la mise en scene, et on le presente
// comme tel au visiteur. Seule la categorie quitte l'appareil, jamais l'image
// ni les valeurs.

export const EXPRESSIONS = ["radiant", "bright", "focused", "curious", "serene"] as const;
export type ExpressionId = (typeof EXPRESSIONS)[number];

export type Blendshapes = Record<string, number>;

const avg = (b: Blendshapes, ...keys: string[]) => keys.reduce((s, k) => s + (b[k] ?? 0), 0) / keys.length;

/** Moyenne de plusieurs lectures (une par image analysee). */
export function averageBlendshapes(samples: Blendshapes[]): Blendshapes {
  const out: Blendshapes = {};
  if (samples.length === 0) return out;
  for (const s of samples) for (const [k, v] of Object.entries(s)) out[k] = (out[k] ?? 0) + v / samples.length;
  return out;
}

export function expressionScores(b: Blendshapes) {
  return {
    smile: avg(b, "mouthSmileLeft", "mouthSmileRight"),
    raise: avg(b, "browInnerUp", "browOuterUpLeft", "browOuterUpRight"),
    wide: avg(b, "eyeWideLeft", "eyeWideRight"),
    focus: avg(b, "browDownLeft", "browDownRight", "mouthPressLeft", "mouthPressRight"),
    jaw: b.jawOpen ?? 0,
  };
}

/**
 * Seuils sur l'echelle des blendshapes (0 = absent, 1 = maximal). Un sourire
 * franc depasse ~0,5, un sourire leger ~0,2 ; un visage au repos reste sous
 * ~0,1 sur la plupart des valeurs. Ordre : le sourire prime (le plus lisible).
 */
export function readExpression(b: Blendshapes): ExpressionId {
  const s = expressionScores(b);
  if (s.smile >= 0.5) return "radiant";
  if (s.smile >= 0.2) return "bright";
  if (s.raise >= 0.3 || s.wide >= 0.3 || s.jaw >= 0.35) return "curious";
  // Sourire = sourcils abaisses aussi (0,83 sur le portrait de test souriant) :
  // « concentree » n'est lue qu'en l'absence de sourire, et au-dela de 0,45.
  if (s.focus >= 0.45) return "focused";
  return "serene";
}

export const EXPRESSION_LABEL: Record<ExpressionId, Localized> = {
  radiant: { fr: "rayonnante", en: "radiant", ar: "مشرقة" },
  bright: { fr: "lumineuse", en: "bright", ar: "مضيئة" },
  focused: { fr: "concentrée", en: "focused", ar: "مركّزة" },
  curious: { fr: "curieuse", en: "curious", ar: "فضولية" },
  serene: { fr: "sereine", en: "serene", ar: "هادئة" },
};

/** Phrase de prompt : garder l'expression reelle, seulement nuancee par l'ambiance. */
export const EXPRESSION_PROMPT: Record<ExpressionId, string> = {
  radiant: "a genuine, wide, radiant smile, with warmth in the eyes",
  bright: "a light, natural smile and bright, open eyes",
  focused: "a focused, intent look with a composed mouth",
  curious: "an open, curious look with lifted brows",
  serene: "a calm, relaxed, neutral expression",
};
