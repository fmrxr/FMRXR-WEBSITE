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

describe("decor de campagne", () => {
  it("setDirection remplace la consigne de decor generique", () => {
    const r = resolveConfig({ questions: oneQuestion, styles: ["mood"], setDirection: "Built studio set, not a real place." });
    if (!r.ok) throw new Error(r.error);
    const prompt = buildPortraitPrompt(buildMoodProfile(["cool"], r.config, "k-1"), r.config);
    expect(prompt).toContain("SET: d. Built studio set, not a real place.");
    expect(prompt).not.toContain("readable architecture");
  });
  it("sans setDirection : consigne generique inchangee", () => {
    const r = resolveConfig({ questions: oneQuestion, styles: ["mood"] });
    if (!r.ok) throw new Error(r.error);
    expect(buildPortraitPrompt(buildMoodProfile(["cool"], r.config, "k-1"), r.config)).toContain("readable architecture");
  });
});

describe("cadrage garde (framing: keep)", () => {
  const build = (framing?: "keep" | "medium", shot: "solo" | "group" = "solo") => {
    const r = resolveConfig({ questions: oneQuestion, styles: ["mood"], framing });
    if (!r.ok) throw new Error(r.error);
    return buildPortraitPrompt(buildMoodProfile(["cool"], r.config, "k-1", null, shot), r.config);
  };
  it("verrouille la pose, les mains et le geste, sans recul de camera", () => {
    const p = build("keep");
    expect(p).toContain("POSE (must not change)");
    expect(p).toContain("including any hand gesture");
    expect(p).toContain("Keep exactly the original framing");
    expect(p).not.toContain("Pull the camera back");
    expect(p).not.toContain("hands out of frame or resting naturally");
  });
  it("groupe : poses verrouillees aussi", () => {
    const p = build("keep", "group");
    expect(p).toContain("POSES (must not change)");
    expect(p).not.toContain("pull the camera back");
  });
  it("par defaut : recul de camera inchange", () => {
    expect(build()).toContain("Pull the camera back to a medium shot");
  });
});
