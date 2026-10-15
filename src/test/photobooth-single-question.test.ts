import { describe, it, expect } from "vitest";
import { DEFAULT_CONFIG, resolveConfig, type CampaignConfig } from "@/lib/photobooth/config";
import { buildMoodProfile, buildPortraitPrompt, validateMoodProfile } from "@/lib/photobooth/mood";

// Format court (brief IQOS) : une seule question, deux ambiances.
const L = (s: string) => ({ fr: s, en: s, ar: s });
const oneQuestion: CampaignConfig["questions"] = [{
  id: "mood",
  prompt: L("Choose your mood"),
  options: [
    {
      id: "cool", gesture: "fist", label: L("Cool & Unstoppable"), title: L("Cool & Unstoppable"),
      palette: ["#00d1d2", "#34303d"],
      fragments: { atmosphere: "a", expression: "b", lighting: "c", setting: "d", grade: "e", palette: "f", treatment: "g", texture: "h" },
      variants: [],
    },
    {
      id: "bright", gesture: "thumb_up", label: L("Bright & Adventurous"), title: L("Bright & Adventurous"),
      fragments: { atmosphere: "a2", expression: "b2", lighting: "c2", setting: "d2", grade: "e2", palette: "f2", treatment: "g2", texture: "h2" },
      variants: [],
    },
  ],
}];

describe("une question, deux reponses", () => {
  it("la configuration est valide", () => {
    expect(resolveConfig({ questions: oneQuestion }).ok).toBe(true);
  });
  it("deux reponses sur le meme geste : refuse", () => {
    const qs = structuredClone(oneQuestion);
    qs[0].options[1].gesture = "fist";
    expect(resolveConfig({ questions: qs }).ok).toBe(false);
  });
  it("une seule reponse : refuse", () => {
    const qs = structuredClone(oneQuestion);
    qs[0].options = qs[0].options.slice(0, 1);
    expect(resolveConfig({ questions: qs }).ok).toBe(false);
  });
  it("le profil se construit avec une reponse", () => {
    const r = resolveConfig({ questions: oneQuestion, styles: ["mood"] });
    if (!r.ok) throw new Error(r.error);
    const p = buildMoodProfile(["cool"], r.config, "k-1");
    expect(validateMoodProfile(p)).toBe(true);
    expect(p.title.en).toBe("Cool & Unstoppable");
    expect(p.palette).toEqual(["#00d1d2", "#34303d"]);
    expect(buildPortraitPrompt(p, r.config)).toContain("SET: d.");
  });
  it("nombre de reponses different du nombre de questions : refuse", () => {
    const r = resolveConfig({ questions: oneQuestion });
    if (!r.ok) throw new Error(r.error);
    expect(() => buildMoodProfile(["cool", "bright"], r.config)).toThrow();
    expect(() => buildMoodProfile(["calm", "natural"], DEFAULT_CONFIG)).toThrow();
  });
});
