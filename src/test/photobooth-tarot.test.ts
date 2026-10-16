import { describe, it, expect } from "vitest";
import { ARCANA, drawArcana } from "@/lib/photobooth/tarot";
import { DEFAULT_CONFIG } from "@/lib/photobooth/config";
import { buildMoodProfile, buildPortraitPrompt, PROMPT_MAX, type Answers } from "@/lib/photobooth/mood";

// Tarot : une carte tiree selon l'aura, fixee par la photo.
const answers: Answers = ["mystery", "cinematic", "cinema"];
const count = (energy: string, expr: Parameters<typeof drawArcana>[2]) => {
  const c: Record<string, number> = {};
  for (let i = 0; i < 4000; i++) { const a = drawArcana(`photo-${i}`, energy, expr); c[a.id] = (c[a.id] ?? 0) + 1; }
  return c;
};

describe("tirage du tarot", () => {
  it("meme photo, meme carte (relance, double clic)", () => {
    expect(drawArcana("photo-1", "calm", "serene").id).toBe(drawArcana("photo-1", "calm", "serene").id);
  });
  it("toutes les cartes peuvent sortir (part de hasard)", () => {
    expect(Object.keys(count("calm", null))).toHaveLength(ARCANA.length);
  });
  it("l'aura compte : energie « mystery » + expression sereine, la Lune sort plus que le Soleil", () => {
    const c = count("mystery", "serene");
    expect(c.moon).toBeGreaterThan(c.sun * 2);
    const d = count("free", "radiant");
    expect(d.sun).toBeGreaterThan(d.moon * 2);
  });
  it("jeu sans carte sombre ni religieuse", () => {
    const ids = ARCANA.map((a) => a.id);
    for (const banned of ["death", "devil", "tower", "hanged", "hierophant", "priestess", "judgement"]) expect(ids).not.toContain(banned);
  });
});

describe("portrait Tarot", () => {
  const mood = buildMoodProfile(answers, DEFAULT_CONFIG, "photo-42", "serene", "solo", "tarot");
  it("la carte tiree devient le titre, sa lecture le sous-titre", () => {
    const a = drawArcana("photo-42", "mystery", "serene");
    expect(mood.tarot).toBe(a.id);
    expect(mood.title.fr).toBe(`${a.numeral} · ${a.name.fr}`);
    expect(mood.description).toEqual(a.reading);
  });
  it("le prompt decrit la carte, sans texte, sous la limite de longueur", () => {
    const p = buildPortraitPrompt(mood, DEFAULT_CONFIG, { brandRefs: 1 });
    expect(p).toContain("THE CARD: the major arcana");
    expect(p).toContain("no text, letters or numerals");
    expect(p.length).toBeLessThanOrEqual(PROMPT_MAX);
  });
  it("sans photo (ecran d'ambiance avant la prise), pas de tirage", () => {
    expect(buildMoodProfile(answers, DEFAULT_CONFIG, undefined, null, "solo", "tarot").tarot).toBeUndefined();
  });
  it("les autres styles ne tirent rien", () => {
    expect(buildMoodProfile(answers, DEFAULT_CONFIG, "photo-42", null, "solo", "anime").tarot).toBeUndefined();
  });
});
