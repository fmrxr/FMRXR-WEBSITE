import type { CampaignConfig, Locale, Localized } from "./config";
import { PROMPT_BANK, type Variant } from "./prompt-bank";
import { EXPRESSION_PROMPT, type ExpressionId } from "./expression";

// Moteur d'ambiance : traduit les trois reponses en une direction visuelle.
// Titre, palette et description dependent uniquement des reponses.
// La mise en scene (lumiere, decor, etalonnage, tenue, finition) est tiree
// dans une banque de variantes par reponse, avec une graine : la cle de la
// photo. Meme photo = meme prompt (relance, double clic : jamais une 2e image
// differente) ; visiteur suivant = autre mise en scene.
// Rien ici ne lit le visage : le profil vient des choix explicites, et de la
// lecture d'expression faite sur l'appareil quand elle existe.

export type Answers = [string, string, string]; // ids d'options, dans l'ordre des questions

export type MoodProfile = {
  id: string; // ex. "calm.cinematic.editorial"
  variant: string; // ex. "calm#2.cinematic#4.editorial#0" ("#-" = sans variante)
  title: Localized;
  description: Localized;
  palette: string[];
  atmosphere: string;
  expression: string;
  contrast: string;
  lighting: string;
  setting: string;
  grade: string;
  paletteWords: string;
  treatment: string;
  texture: string;
  /** Lecture d'expression faite sur l'appareil (categorie seulement), si disponible. */
  expressionReading: ExpressionId | null;
};

function pick(config: CampaignConfig, answers: Answers) {
  return config.questions.map((q, i) => {
    const o = q.options.find((opt) => opt.id === answers[i]);
    if (!o) throw new Error(`INVALID_ANSWER:${q.id}`);
    return o;
  });
}

/** FNV-1a 32 bits : repartition uniforme, stable entre navigateur et serveur. */
export function hashSeed(s: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

type Option = CampaignConfig["questions"][number]["options"][number];

function variantsOf(o: Option): Variant[] {
  // Absent = banque par defaut de la reponse ; tableau vide = pas de variante.
  return o.variants ?? PROMPT_BANK[o.id] ?? [];
}

/**
 * @param seed cle de la photo (idempotence). Sans graine : fragments de base.
 */
export function buildMoodProfile(
  answers: Answers,
  config: CampaignConfig,
  seed?: string,
  expressionReading: ExpressionId | null = null,
): MoodProfile {
  const opts = pick(config, answers);
  const chosen = opts.map((o, i) => {
    const list = variantsOf(o);
    if (!seed || !config.promptVariety || list.length === 0) return { o, idx: -1, f: o.fragments };
    const idx = hashSeed(`${seed}:${config.questions[i].id}`) % list.length;
    return { o, idx, f: { ...o.fragments, ...list[idx] } };
  });
  const [energy, world, style] = chosen;
  const f = (k: string) => energy.f[k] ?? world.f[k] ?? style.f[k] ?? "";
  const word = (loc: Locale) =>
    [energy.o.title?.[loc], style.o.title?.[loc]].filter(Boolean).join(" · ");
  const desc = (loc: Locale) =>
    [energy.o.label[loc], world.o.label[loc], style.o.label[loc]].join(" · ");

  return {
    id: answers.join("."),
    variant: chosen.map((c) => `${c.o.id}#${c.idx < 0 ? "-" : c.idx}`).join("."),
    title: { fr: word("fr"), en: word("en"), ar: word("ar") },
    description: { fr: desc("fr"), en: desc("en"), ar: desc("ar") },
    palette: world.o.palette ?? [],
    atmosphere: f("atmosphere"),
    expression: f("expression"),
    contrast: f("contrast"),
    lighting: f("lighting"),
    setting: f("setting"),
    grade: f("grade"),
    paletteWords: f("palette"),
    treatment: f("treatment"),
    texture: f("texture"),
    expressionReading,
  };
}

export function validateMoodProfile(p: MoodProfile): boolean {
  return Boolean(p.id && p.lighting && p.atmosphere && p.texture && p.title.fr && p.title.en && p.title.ar);
}

// Retouche de la peau, automatique et toujours legere (pas de reglage) :
// on n'attenue que ce qui est passager (brillance, rougeurs, petites
// imperfections, cernes). Texture reelle conservee, teinte jamais eclaircie
// ni modifiee, signes distinctifs gardes.
export const SKIN_RETOUCH =
  "Very light professional retouch only: gently even out the complexion, soften temporary blemishes, redness, shine and dark circles. " +
  "Keep the real skin texture and pores. Never lighten, whiten or change the skin tone. Keep freckles, moles, scars and natural features.";

// Ce qui ne doit jamais changer. Un modele d'edition redessine le visage des
// qu'on change la pose, l'angle ou l'optique : on le lui interdit
// explicitement (constat du 15/10/2026 sur les premiers portraits).
export const IDENTITY_LOCK =
  "This is a photo edit, not a new photo. The person must stay exactly the same and instantly recognisable: " +
  "same face shape, jawline, cheekbones, eyes, eyebrows, nose, lips, ears, skin tone, age, hairline and hair, facial hair, " +
  "and any glasses, cap or headwear they wear. Keep the original head position, head tilt, gaze direction, camera angle, distance and framing, " +
  "with the same facial proportions. Do not reshape, slim, smooth into plastic, or idealise the face, and do not change the pose.";

/**
 * Prompt d'edition envoye avec la photo de reference, ecrit comme un brief de
 * plateau : d'abord ce qui est verrouille (identite, pose, cadrage), puis ce
 * qui change (lumiere, decor, tenue, etalonnage), puis le rendu attendu.
 */
export function buildPortraitPrompt(p: MoodProfile, config: CampaignConfig): string {
  const expression = p.expressionReading
    ? `Keep the person's own expression (${EXPRESSION_PROMPT[p.expressionReading]}); nuance it at most slightly toward: ${p.expression}.`
    : `Keep the person's own expression; nuance it at most slightly toward: ${p.expression}.`;
  return [
    `Edit the reference photo into ${p.treatment || "a high-end editorial portrait"} of the same person.`,
    `IDENTITY (must not change): ${IDENTITY_LOCK}`,
    `EXPRESSION: ${expression}`,
    `SKIN: ${SKIN_RETOUCH}`,
    // Une seule famille de changements (lumiere, decor, etalonnage) : changer
    // aussi la tenue multiplie la derive du visage (guides des modeles
    // d'edition, et constat sur les premiers portraits).
    "CHANGE ONLY the lighting, the background set and the colour grade, as follows.",
    `LIGHTING: ${p.lighting}${p.contrast ? `; ${p.contrast}` : ""}. Light the face cleanly and flatteringly, keeping its features clearly readable. The new light must have one consistent direction and colour on the face, the clothing and the background, like a single real lighting setup.`,
    p.setting ? `SET: ${p.setting}, with natural depth of field behind the person.` : "",
    "WARDROBE: keep the person's own clothing and accessories exactly as in the photo, simply clean and well lit.",
    `COLOUR: ${p.grade ? `${p.grade}; ` : ""}palette of ${p.paletteWords}.`,
    `MOOD: ${p.atmosphere}.`,
    `FINISH: ${p.texture}. ${config.styleBrief}`,
    "Photographic realism, like a real photo shoot with professional lighting. Keep the same framing as the reference, as if shot on a medium telephoto lens.",
    `Avoid: wide-angle distortion, changed face, different person, ${config.negative}.`,
  ].filter(Boolean).join("\n");
}
