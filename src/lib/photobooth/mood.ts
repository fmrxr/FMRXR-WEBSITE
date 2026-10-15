import type { CampaignConfig, Locale, Localized } from "./config";
import { PROMPT_BANK, type Variant } from "./prompt-bank";

// Moteur d'ambiance : traduit les trois reponses en une direction visuelle.
// Titre, palette et description dependent uniquement des reponses.
// La mise en scene (pose, decor, lumiere, cadrage, stylisme...) est tiree dans
// une banque de variantes par reponse, avec une graine : la cle de la photo.
// Meme photo = meme prompt (relance, double clic : jamais une 2e image
// differente) ; visiteur suivant = autre mise en scene.
// Rien ici ne lit le visage : le profil vient uniquement des choix explicites.

export type Answers = [string, string, string]; // ids d'options, dans l'ordre des questions

export type MoodProfile = {
  id: string; // ex. "calm.cinematic.editorial"
  variant: string; // ex. "calm#2.cinematic#4.editorial#0" ("#-" = sans variante)
  title: Localized;
  description: Localized;
  palette: string[];
  lighting: string;
  atmosphere: string;
  expression: string;
  pose: string;
  setting: string;
  styling: string;
  texture: string;
  composition: string;
  camera: string;
  paletteWords: string;
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
 * @param seed cle de la photo (idempotence). Sans graine, ou si la variete
 * est coupee pour la campagne : fragments de base seulement.
 */
export function buildMoodProfile(answers: Answers, config: CampaignConfig, seed?: string): MoodProfile {
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
    lighting: f("lighting"),
    atmosphere: f("atmosphere"),
    expression: f("expression"),
    pose: f("pose"),
    setting: f("setting"),
    styling: f("styling"),
    texture: f("texture"),
    composition: f("composition"),
    camera: f("camera"),
    paletteWords: f("palette"),
  };
}

export function validateMoodProfile(p: MoodProfile): boolean {
  return Boolean(
    p.id && p.lighting && p.atmosphere && p.composition && p.texture && p.camera &&
    p.title.fr && p.title.en && p.title.ar,
  );
}

// Retouche de la peau, automatique et toujours legere (pas de reglage) :
// on n'attenue que ce qui est passager (brillance, rougeurs, petites
// imperfections, cernes). Texture reelle conservee, teinte jamais eclaircie
// ni modifiee, signes distinctifs gardes.
export const SKIN_RETOUCH =
  "Skin: very light professional retouch only. Gently even out the complexion, soften temporary blemishes, redness, shine and dark circles. " +
  "Keep the real skin texture and pores visible. Never lighten, whiten or change the skin tone. Keep freckles, moles, scars and natural features.";

/**
 * Prompt d'edition envoye avec la photo de reference. La premiere phrase fixe
 * la regle la plus importante pour un photobooth : la personne doit rester
 * reconnaissable. Tout le reste est la direction artistique.
 */
export function buildPortraitPrompt(p: MoodProfile, config: CampaignConfig): string {
  return [
    "Transform the person in the reference photo into a new portrait.",
    "Keep their identity exactly: same face, facial features, skin tone, age, hairstyle and body proportions. Do not turn them into a different person.",
    SKIN_RETOUCH,
    config.styleBrief,
    `Mood: ${p.atmosphere}; ${p.expression}.`,
    p.pose ? `Pose: ${p.pose}.` : "",
    p.setting ? `Setting: ${p.setting}.` : "",
    `Lighting: ${p.lighting}.`,
    `Colour palette: ${p.paletteWords}.`,
    p.styling ? `Styling: ${p.styling}.` : "",
    `Composition: ${p.composition}.`,
    `Camera: ${p.camera}.`,
    `Finish: ${p.texture}.`,
    config.negative ? `Avoid: ${config.negative}.` : "",
  ].filter(Boolean).join(" ");
}
