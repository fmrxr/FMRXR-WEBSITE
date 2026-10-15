import type { CampaignConfig, Locale, Localized } from "./config";
import { PROMPT_BANK, type Variant } from "./prompt-bank";
import { EXPRESSION_PROMPT, type ExpressionId } from "./expression";
import { STYLES, type StyleId } from "./styles";

// Moteur d'ambiance : traduit les trois reponses en une direction visuelle.
// Titre, palette et description dependent uniquement des reponses.
// La mise en scene (lumiere, decor, etalonnage, tenue, finition) est tiree
// dans une banque de variantes par reponse, avec une graine : la cle de la
// photo. Meme photo = meme prompt (relance, double clic : jamais une 2e image
// differente) ; visiteur suivant = autre mise en scene.
// Rien ici ne lit le visage : le profil vient des choix explicites, et de la
// lecture d'expression faite sur l'appareil quand elle existe.

export type Answers = string[]; // ids d'options, une par question, dans l'ordre

/** Portrait seul ou photo de groupe, choisi par le visiteur apres le scan. */
export type Shot = "solo" | "group";
export const SHOTS: readonly Shot[] = ["solo", "group"];

/**
 * Format de sortie. Un groupe pris par une camera en paysage (borne, poste
 * fixe) sort en 4:3 horizontal pour ne couper personne ; sinon le format de
 * la campagne (portrait 3:4 par defaut).
 */
export function chooseAspect(shot: Shot, width: number, height: number, campaignAspect: CampaignConfig["aspectRatio"]): CampaignConfig["aspectRatio"] {
  return shot === "group" && width > height ? "4:3" : campaignAspect;
}

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
  shot: Shot;
  style: StyleId;
  /** Langue du visiteur : textes des mises en page. */
  locale?: string;
};

function pick(config: CampaignConfig, answers: Answers) {
  if (answers.length !== config.questions.length) throw new Error("INVALID_ANSWER_COUNT");
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
  shot: Shot = "solo",
  styleId: StyleId = "mood",
): MoodProfile {
  const opts = pick(config, answers);
  const chosen = opts.map((o, i) => {
    const list = variantsOf(o);
    if (!seed || !config.promptVariety || list.length === 0) return { o, idx: -1, f: o.fragments };
    const idx = hashSeed(`${seed}:${config.questions[i].id}`) % list.length;
    return { o, idx, f: { ...o.fragments, ...list[idx] } };
  });
  // Un fragment vient de la premiere reponse qui le definit, dans l'ordre des questions.
  const f = (k: string) => chosen.find((c) => c.f[k] !== undefined)?.f[k] ?? "";
  const word = (loc: Locale) =>
    chosen.map((c) => c.o.title?.[loc]).filter(Boolean).join(" · ");
  const desc = (loc: Locale) => chosen.map((c) => c.o.label[loc]).join(" · ");

  return {
    id: answers.join("."),
    variant: chosen.map((c) => `${c.o.id}#${c.idx < 0 ? "-" : c.idx}`).join("."),
    title: { fr: word("fr"), en: word("en"), ar: word("ar") },
    description: { fr: desc("fr"), en: desc("en"), ar: desc("ar") },
    palette: chosen.find((c) => c.o.palette?.length)?.o.palette ?? [],
    atmosphere: f("atmosphere"),
    expression: f("expression"),
    contrast: f("contrast"),
    lighting: f("lighting"),
    setting: f("setting"),
    grade: f("grade"),
    paletteWords: f("palette"),
    treatment: f("treatment"),
    texture: f("texture"),
    // En groupe, une lecture d'expression ne vaudrait que pour un visage : ignoree.
    expressionReading: shot === "group" ? null : expressionReading,
    shot,
    style: styleId,
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
// explicitement (constat du 15/10/2026 sur les premiers portraits). La
// distance, elle, change (FRAMING_MEDIUM) : un sujet plein cadre ecrase le decor.
export const IDENTITY_LOCK =
  "This is a photo edit, not a new photo. The person must stay exactly the same and instantly recognisable: " +
  "same face shape, jawline, cheekbones, eyes, eyebrows, nose, lips, ears, skin tone, age, hairline and hair, facial hair, " +
  "and any glasses, cap or headwear they wear. Keep the original head tilt, gaze direction and camera angle (same eye level), " +
  "with the same facial proportions. Do not reshape, slim, smooth into plastic, or idealise the face, and do not change the pose.";

// Cadrage plan moyen : le sujet ne remplit plus l'image, le decor se lit
// (retour du 15/10/2026 : « le background doit etre plus detaille et le sujet
// moins grand »). Methode du recul de camera en edition : seule la distance
// change, l'angle et la hauteur restent ceux de la photo.
export const FRAMING_MEDIUM =
  "Pull the camera back to a medium shot: show the person from the top of the head to the waist, head in the upper third of the frame, " +
  "the person taking up about half of the frame height so that the set around them is clearly visible on both sides. " +
  "Same camera height and eye-level angle as the photo. Continue their own clothing naturally below the original crop; arms relaxed, hands out of frame or resting naturally.";

// Decor detaille : plusieurs plans de profondeur lisibles, pas un flou.
export const SET_DEPTH =
  "Build it as a fully realised, believable location with clear depth layers: a soft foreground element at one edge of the frame, the person in the midground, " +
  "and a detailed background with readable architecture, materials, props and practical light sources. " +
  "Moderate depth of field, as at f/4: the background stays recognisable and rich in detail, never an empty blur.";

// Version groupe : chaque visage est verrouille, et le nombre de personnes aussi.
export const GROUP_IDENTITY_LOCK =
  "This is a photo edit, not a new photo. Keep exactly the same people, the same number of people and their same positions: do not add, remove, merge or swap anyone. " +
  "Every person must stay exactly the same and instantly recognisable: same face shape, jawline, eyes, eyebrows, nose, lips, skin tone, age, hairline and hair, facial hair, " +
  "and any glasses, cap or headwear. Keep each person's head position, head tilt, gaze direction, the camera angle, distance and framing, with the same facial proportions. " +
  "Do not reshape, slim, smooth into plastic, or idealise any face, and do not change anyone's pose.";

/**
 * Prompt d'edition envoye avec la photo de reference, ecrit comme un brief de
 * plateau : d'abord ce qui est verrouille (identite, pose, cadrage), puis ce
 * qui change (lumiere, decor, tenue, etalonnage), puis le rendu attendu.
 */
export function buildPortraitPrompt(p: MoodProfile, config: CampaignConfig, opts: { soften?: boolean } = {}): string {
  const style = STYLES[p.style] ?? STYLES.mood;
  if (style.family === "transform") return buildTransformPrompt(p, config, opts.soften ?? false);
  if (p.shot === "group") return buildGroupPrompt(withStyle(p), config);
  p = withStyle(p);
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
    "CHANGE ONLY the camera distance, the lighting, the background set and the colour grade, as follows.",
    `FRAMING: ${FRAMING_MEDIUM}`,
    `LIGHTING: ${p.lighting}${p.contrast ? `; ${p.contrast}` : ""}. Light the face cleanly and flatteringly, keeping its features clearly readable. The new light must have one consistent direction and colour on the face, the clothing and the background, like a single real lighting setup.`,
    `SET: ${p.setting || "a real location that matches the mood"}. ${config.setDirection || SET_DEPTH}`,
    "WARDROBE: keep the person's own clothing and accessories exactly as in the photo, simply clean and well lit.",
    `COLOUR: ${p.grade ? `${p.grade}; ` : ""}palette of ${p.paletteWords}.`,
    `MOOD: ${p.atmosphere}.`,
    `FINISH: ${p.texture}. ${config.styleBrief}`,
    "Photographic realism, like a real photo shoot with professional lighting, shot on a 50mm lens from about two and a half metres, natural perspective.",
    (p as MoodProfile & { extra?: string }).extra ?? "",
    `Avoid: tight close-up, face filling the frame, empty or blurred background, wide-angle distortion, changed face, different person, ${config.negative}.`,
  ].filter(Boolean).join("\n");
}

function buildGroupPrompt(p: MoodProfile, config: CampaignConfig): string {
  // « extra people » n'a pas de sens pour un groupe : retire de la liste a eviter.
  const negative = config.negative.split(",").map((x) => x.trim()).filter((x) => x && !/people/i.test(x)).join(", ");
  return [
    `Edit the reference photo into ${p.treatment || "a high-end editorial group portrait"} of the same group of people.`,
    `IDENTITY (must not change): ${GROUP_IDENTITY_LOCK}`,
    `EXPRESSIONS: keep each person's own expression; nuance the overall mood at most slightly toward: ${p.expression}.`,
    `SKIN: ${SKIN_RETOUCH} Apply the same light retouch to everyone.`,
    "CHANGE ONLY the camera distance, the lighting, the background set and the colour grade, as follows.",
    "FRAMING: pull the camera back slightly so that everyone is fully in frame with breathing space around the group and the set clearly visible; same camera height and angle.",
    `LIGHTING: ${p.lighting}${p.contrast ? `; ${p.contrast}` : ""}. Light every face cleanly and evenly, so that no one falls into shadow. The new light must have one consistent direction and colour on all the people and the background, like a single real lighting setup.`,
    `SET: ${p.setting || "a real location that matches the mood"}. ${config.setDirection || SET_DEPTH}`,
    "WARDROBE: keep everyone's own clothing and accessories exactly as in the photo, simply clean and well lit.",
    `COLOUR: ${p.grade ? `${p.grade}; ` : ""}palette of ${p.paletteWords}.`,
    `MOOD: ${p.atmosphere}.`,
    `FINISH: ${p.texture}. ${config.styleBrief}`,
    "Photographic realism, like a real group photo shoot with professional lighting. Nobody is cropped out.",
    (p as MoodProfile & { extra?: string }).extra ?? "",
    `Avoid: wide-angle distortion, changed faces, missing or added people, ${negative}.`,
  ].filter(Boolean).join("\n");
}

/** Style editorial : impose son traitement et sa finition, ajoute sa consigne de cadre. */
function withStyle(p: MoodProfile): MoodProfile & { extra?: string } {
  const st = STYLES[p.style] ?? STYLES.mood;
  return {
    ...p,
    treatment: st.treatment ?? p.treatment,
    texture: st.finish ?? p.texture,
    extra: st.extra,
  };
}

/**
 * Transformations (anime, peinture, figurine...) : la personne est
 * reinterpretee. On exige la ressemblance (traits, teint, coiffure,
 * accessoires, expression), sans pouvoir garantir l'exactitude d'une edition.
 * L'ambiance choisie donne encore la palette et l'atmosphere.
 */
function buildTransformPrompt(p: MoodProfile, config: CampaignConfig, soften: boolean): string {
  const st = STYLES[p.style];
  const group = p.shot === "group";
  const who = group ? "every person in the reference photo" : "the person in the reference photo";
  return [
    `Turn ${who} into ${st.transform}.`,
    soften ? SOFTEN : "",
    `LIKENESS (most important): the result must stay clearly recognisable as ${group ? "these exact people" : "this exact person"}. ` +
      "Keep each face shape, eye shape, eyebrows, nose, lips, skin tone, age, hairstyle and hair colour, facial hair, glasses and headwear, and their expression. " +
      (group ? "Keep the same number of people and their positions; do not add or remove anyone. " : "") +
      "Keep the pose close to the reference photo.",
    `FRAMING: ${group ? "pull back slightly so everyone is fully in frame with the scene visible around them" : "a medium shot from the top of the head to the waist, the person taking up about half of the frame height"}.`,
    "SCENE: a detailed, fully realised environment in the same style around the subject, with foreground, midground and background depth.",
    `COLOUR: palette of ${p.paletteWords}${p.grade ? `; ${p.grade}` : ""}.`,
    `MOOD: ${p.atmosphere}.`,
    "Original artwork: no existing characters, franchises, celebrities, brands, emblems or logos.",
    // De la liste « a eviter » de la campagne, seuls texte, lettres, logos et filigrane
    // valent pour une transformation (« cartoon », « plastic skin » la contrediraient).
    `Avoid: ${["text, letters, watermark", ...config.negative.split(",").map((x) => x.trim()).filter((x) => /logo|watermark|text|letter/i.test(x))].join(", ")}, ${group ? "missing or added people" : "extra people"}, deformed hands, distorted face.`,
  ].filter(Boolean).join("\n");
}

// Relance apres un faux refus « nsfw » de Higgsfield (vu sur « hero » avec un
// portrait habille ordinaire) : formulation adoucie, sans rien de corporel.
export const SOFTEN =
  "Family-friendly result: fully clothed, modest costume covering the shoulders, arms and torso, natural confident pose, no skin emphasis.";
