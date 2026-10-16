import type { CampaignConfig, Locale, Localized } from "./config";
import { PROMPT_BANK, type Variant } from "./prompt-bank";
import { EXPRESSION_PROMPT, type ExpressionId } from "./expression";
import { STYLES, type StyleId } from "./styles";
import { arcanaById, drawArcana } from "./tarot";

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
  /** Style Tarot : arcane tire au moment de la photo (id, voir tarot.ts). */
  tarot?: string;
  /** Visages sur la photo (0-1), mesures sur la borne : recadrage des mises en page. */
  face?: { x: number; y: number; w: number; h: number };
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

  // Tarot : une carte tiree selon l'aura (energie, expression) des qu'il y a
  // une photo (graine). Elle devient le titre, sa lecture le sous-titre.
  const card = styleId === "tarot" && seed ? drawArcana(seed, answers[0], shot === "group" ? null : expressionReading) : null;
  const cardTitle = (loc: Locale) => `${card!.numeral} · ${card!.name[loc]}`;

  return {
    id: answers.join("."),
    variant: chosen.map((c) => `${c.o.id}#${c.idx < 0 ? "-" : c.idx}`).join("."),
    title: card ? { fr: cardTitle("fr"), en: cardTitle("en"), ar: cardTitle("ar") } : { fr: word("fr"), en: word("en"), ar: word("ar") },
    description: card ? card.reading : { fr: desc("fr"), en: desc("en"), ar: desc("ar") },
    ...(card ? { tarot: card.id } : {}),
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

// Cadrage d'origine garde (option de campagne framing: "keep") : test IQOS du
// 16/10/2026, le recul de camera faisait inventer le bas du corps et
// re-poser les bras (mains dans les poches, geste de la main efface).
// Ici rien du corps n'est invente : meme cadre, meme distance, meme pose.
export const FRAMING_KEEP =
  "Keep exactly the original framing, crop and camera distance: the person stays the same size and in the same place in the frame. " +
  "Do not extend the image below or around the original crop and do not invent any part of the body.";
export const POSE_LOCK =
  "Keep the exact body pose of the photo: same shoulders, arms, hands and fingers in the same positions, including any hand gesture or hand near the face. " +
  "Do not add, remove, move or re-pose any limb, do not put hands in pockets, do not turn the body into a model pose.";

// Longueur maximale du prompt chez Higgsfield (Flare) : 5 000 caracteres,
// mesure le 16/10/2026 sur l'API (5 000 acceptes, 5 001 refuses en 400
// « is too long »), non publie dans la documentation.
export const PROMPT_MAX = 5000;

/**
 * Ramene le prompt sous la limite sans toucher a l'essentiel : on retire
 * d'abord les derniers elements de la liste « Avoid », puis la ligne de
 * realisme photo ; en tout dernier recours on coupe la fin.
 */
export function fitPrompt(prompt: string, max = PROMPT_MAX): string {
  if (prompt.length <= max) return prompt;
  const lines = prompt.split("\n");
  const ai = lines.findIndex((l) => l.startsWith("Avoid: "));
  if (ai >= 0) {
    const items = lines[ai].slice("Avoid: ".length).replace(/\.$/, "").split(", ");
    while (items.length > 1 && lines.join("\n").length > max) {
      items.pop();
      lines[ai] = `Avoid: ${items.join(", ")}.`;
    }
  }
  const ri = lines.findIndex((l) => l.startsWith("Photographic realism"));
  if (lines.join("\n").length > max && ri >= 0) lines.splice(ri, 1);
  return lines.join("\n").slice(0, max);
}

// Images de marque jointes a la photo (config brandReferences) : le modele
// sait a quoi ressemble la vraie marque et n'en invente pas une fausse. Le
// logo est pose ensuite sur la bande du bas, pas dans l'image generee.
export function brandReferenceLine(n: number): string {
  if (n <= 0) return "";
  const which = n === 1 ? "image 2 is" : `images 2 to ${n + 1} are`;
  return `BRAND REFERENCE: image 1 is the photo to edit; ${which} the brand's official logo, for reference only. ` +
    "Never invent any other logo or brand-like sign, and do not place this logo in the image (it is added afterwards).";
}

// Visage petit ou flou (photo en pied, contre-jour) : le modele comblait le
// manque de detail en inventant des traits (test IQOS du 16/10, visage d'une
// centaine de pixels). On lui demande de nettoyer, jamais de redessiner.
export const FACE_FIDELITY =
  "If a face is small, soft or dim, only clean it up (exposure, noise, gentle sharpening) and never redraw its features: " +
  "a slightly soft true face beats a sharp different one.";

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
export function buildPortraitPrompt(p: MoodProfile, config: CampaignConfig, opts: { soften?: boolean; brandRefs?: number } = {}): string {
  const style = STYLES[p.style] ?? STYLES.mood;
  const brand = brandReferenceLine(opts.brandRefs ?? 0);
  if (style.family === "transform") return buildTransformPrompt(p, config, opts.soften ?? false, brand);
  if (p.shot === "group") return buildGroupPrompt(withStyle(p), config, brand);
  p = withStyle(p);
  const keep = config.framing === "keep";
  const expression = p.expressionReading
    ? `Keep the person's own expression (${EXPRESSION_PROMPT[p.expressionReading]}); nuance it at most slightly toward: ${p.expression}.`
    : `Keep the person's own expression; nuance it at most slightly toward: ${p.expression}.`;
  return [
    `Edit this person's reference photo into ${p.treatment || "a high-end editorial portrait"}, keeping the same person.`,
    brand,
    `IDENTITY (must not change): ${IDENTITY_LOCK} ${FACE_FIDELITY}`,
    `EXPRESSION: ${expression}`,
    `SKIN: ${SKIN_RETOUCH}`,
    // Une seule famille de changements (lumiere, decor, etalonnage) : changer
    // aussi la tenue multiplie la derive du visage (guides des modeles
    // d'edition, et constat sur les premiers portraits).
    keep ? `POSE (must not change): ${POSE_LOCK}` : "",
    keep
      ? "CHANGE ONLY the lighting, the background set and the colour grade, as follows."
      : "CHANGE ONLY the camera distance, the lighting, the background set and the colour grade, as follows.",
    `FRAMING: ${keep ? FRAMING_KEEP : FRAMING_MEDIUM}`,
    `LIGHTING: ${p.lighting}${p.contrast ? `; ${p.contrast}` : ""}. Light the face cleanly and flatteringly, keeping its features clearly readable. The new light must have one consistent direction and colour on the face, the clothing and the background, like a single real lighting setup.`,
    setLine(p, config),
    "WARDROBE: keep the person's own clothing and accessories exactly as in the photo, simply clean and well lit.",
    `COLOUR: ${p.grade ? `${p.grade}; ` : ""}palette of ${p.paletteWords}.`,
    `MOOD: ${p.atmosphere}.`,
    `FINISH: ${p.texture}. ${config.styleBrief}`,
    keep
      ? "Photographic realism, like a real photo shoot with professional lighting, same lens and perspective as the original photo."
      : "Photographic realism, like a real photo shoot with professional lighting, shot on a 50mm lens from about two and a half metres, natural perspective.",
    (p as MoodProfile & { extra?: string }).extra ?? "",
    keep
      ? `Avoid: changed pose, re-posed arms or hands, removed hand gesture, invented body, empty or blurred background, changed face, different person, ${config.negative}.`
      : `Avoid: tight close-up, face filling the frame, empty or blurred background, wide-angle distortion, changed face, different person, ${config.negative}.`,
  ].filter(Boolean).join("\n");
}

function buildGroupPrompt(p: MoodProfile, config: CampaignConfig, brand = ""): string {
  // « extra people » n'a pas de sens pour un groupe : retire de la liste a eviter.
  const negative = config.negative.split(",").map((x) => x.trim()).filter((x) => x && !/people/i.test(x)).join(", ");
  return [
    `Edit this group's reference photo into ${p.treatment || "a high-end editorial group portrait"}, keeping the same people.`,
    brand,
    `IDENTITY (must not change): ${GROUP_IDENTITY_LOCK} ${FACE_FIDELITY}`,
    `EXPRESSIONS: keep each person's own expression; nuance the overall mood at most slightly toward: ${p.expression}.`,
    `SKIN: ${SKIN_RETOUCH} Apply the same light retouch to everyone.`,
    ...(config.framing === "keep"
      ? [
          `POSES (must not change): ${POSE_LOCK} This applies to every person.`,
          "CHANGE ONLY the lighting, the background set and the colour grade, as follows.",
          `FRAMING: ${FRAMING_KEEP}`,
        ]
      : [
          "CHANGE ONLY the camera distance, the lighting, the background set and the colour grade, as follows.",
          "FRAMING: pull the camera back slightly so that everyone is fully in frame with breathing space around the group and the set clearly visible; same camera height and angle.",
        ]),
    `LIGHTING: ${p.lighting}${p.contrast ? `; ${p.contrast}` : ""}. Light every face cleanly and evenly, so that no one falls into shadow. The new light must have one consistent direction and colour on all the people and the background, like a single real lighting setup.`,
    setLine(p, config),
    "WARDROBE: keep everyone's own clothing and accessories exactly as in the photo, simply clean and well lit.",
    `COLOUR: ${p.grade ? `${p.grade}; ` : ""}palette of ${p.paletteWords}.`,
    `MOOD: ${p.atmosphere}.`,
    `FINISH: ${p.texture}. ${config.styleBrief}`,
    "Photographic realism, like a real group photo shoot with professional lighting. Nobody is cropped out.",
    (p as MoodProfile & { extra?: string }).extra ?? "",
    `Avoid: ${config.framing === "keep" ? "changed poses, re-posed arms or hands, invented bodies, " : ""}wide-angle distortion, changed faces, missing or added people, ${negative}.`,
  ].filter(Boolean).join("\n");
}

/** Tarot : la carte tiree (scene originale), la personne en figure centrale. */
function tarotLine(p: MoodProfile, group: boolean): string {
  const a = p.style === "tarot" ? arcanaById(p.tarot) : null;
  if (!a) return "";
  return `THE CARD: the major arcana ${a.name.en} (${a.numeral}), drawn for ${group ? "these people" : "this person"}: ${a.scene}. ` +
    `${group ? "They are" : "The person is"} the central figure of the card, in this original scene; no text, letters or numerals anywhere on the card.`;
}

/** Style editorial : impose son traitement et sa finition, ajoute sa consigne de cadre. */
function withStyle(p: MoodProfile): MoodProfile & { extra?: string; styleSet?: boolean } {
  const st = STYLES[p.style] ?? STYLES.mood;
  return {
    ...p,
    treatment: st.treatment ?? p.treatment,
    texture: st.finish ?? p.texture,
    extra: st.extra,
    // Style a decor impose (portrait professionnel) : il remplace le decor,
    // la lumiere et la palette de l'ambiance, et la direction de decor de la campagne.
    ...(st.set ? { setting: st.set, styleSet: true } : {}),
    ...(st.lighting ? { lighting: st.lighting, contrast: "" } : {}),
    ...(st.palette ? { paletteWords: st.palette, grade: "" } : {}),
  };
}

/** Consigne de decor : celle du style s'il en impose une, sinon celle de la campagne. */
const setLine = (p: MoodProfile & { styleSet?: boolean }, config: CampaignConfig) =>
  `SET: ${p.setting || "a real location that matches the mood"}. ${p.styleSet ? "" : config.setDirection || SET_DEPTH}`.trim();

/**
 * Transformations (anime, peinture, figurine...) : la personne est
 * reinterpretee. On exige la ressemblance (traits, teint, coiffure,
 * accessoires, expression), sans pouvoir garantir l'exactitude d'une edition.
 * L'ambiance choisie donne encore la palette et l'atmosphere.
 */
function buildTransformPrompt(p: MoodProfile, config: CampaignConfig, soften: boolean, brand = ""): string {
  const st = STYLES[p.style];
  const group = p.shot === "group";
  const who = group ? "every person in the reference photo" : "the person in the reference photo";
  return [
    `Turn ${who} into ${st.transform}.`,
    tarotLine(p, group),
    brand,
    soften ? SOFTEN : "",
    `LIKENESS (most important): the result must stay clearly recognisable as ${group ? "these exact people" : "this exact person"}. ` +
      "Keep each face shape, eye shape, eyebrows, nose, lips, skin tone, age, hairstyle and hair colour, facial hair, glasses and headwear, and their expression. " +
      (group ? "Keep the same number of people and their positions; do not add or remove anyone. " : "") +
      (config.framing === "keep"
        ? "Keep exactly the same pose, arms, hands and any hand gesture as in the reference photo."
        : "Keep the pose close to the reference photo."),
    `FRAMING: ${config.framing === "keep"
      ? "keep exactly the original framing, crop and camera distance; do not invent any part of the body outside the photo"
      : group ? "pull back slightly so everyone is fully in frame with the scene visible around them" : "a medium shot from the top of the head to the waist, the person taking up about half of the frame height"}.`,
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
