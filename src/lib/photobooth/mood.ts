import type { CampaignConfig, Locale, Localized } from "./config";

// Moteur d'ambiance : traduit les trois reponses en une direction visuelle.
// Entierement deterministe : memes reponses, meme profil, meme prompt.
// Rien ici ne lit le visage : le profil vient uniquement des choix explicites.

export type Answers = [string, string, string]; // ids d'options, dans l'ordre des questions

export type MoodProfile = {
  id: string; // ex. "calm.cinematic.editorial"
  title: Localized;
  description: Localized;
  palette: string[];
  lighting: string;
  atmosphere: string;
  expression: string;
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

export function buildMoodProfile(answers: Answers, config: CampaignConfig): MoodProfile {
  const [energy, world, style] = pick(config, answers);
  const f = (k: string) =>
    energy.fragments[k] ?? world.fragments[k] ?? style.fragments[k] ?? "";
  const word = (loc: Locale) =>
    [energy.title?.[loc], style.title?.[loc]].filter(Boolean).join(" · ");
  const desc = (loc: Locale) =>
    [energy.label[loc], world.label[loc], style.label[loc]].join(" · ");

  return {
    id: answers.join("."),
    title: { fr: word("fr"), en: word("en"), ar: word("ar") },
    description: { fr: desc("fr"), en: desc("en"), ar: desc("ar") },
    palette: world.palette ?? [],
    lighting: f("lighting"),
    atmosphere: f("atmosphere"),
    expression: f("expression"),
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

/**
 * Prompt d'edition envoye avec la photo de reference. La premiere phrase fixe
 * la regle la plus importante pour un photobooth : la personne doit rester
 * reconnaissable. Tout le reste est la direction artistique.
 */
export function buildPortraitPrompt(p: MoodProfile, config: CampaignConfig): string {
  return [
    "Transform the person in the reference photo into a new portrait.",
    "Keep their identity exactly: same face, facial features, skin tone, age, hairstyle and body proportions. Do not beautify into a different person.",
    config.styleBrief,
    `Mood: ${p.atmosphere}; ${p.expression}.`,
    `Lighting: ${p.lighting}.`,
    `Colour palette: ${p.paletteWords}.`,
    `Composition: ${p.composition}.`,
    `Camera: ${p.camera}.`,
    `Finish: ${p.texture}.`,
    config.negative ? `Avoid: ${config.negative}.` : "",
  ].filter(Boolean).join(" ");
}
