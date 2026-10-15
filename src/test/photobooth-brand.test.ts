import { describe, it, expect, vi, beforeEach } from "vitest";
import { DEFAULT_CONFIG, resolveConfig } from "@/lib/photobooth/config";
import { buildMoodProfile, buildPortraitPrompt, FACE_FIDELITY, type Answers } from "@/lib/photobooth/mood";
import { buildRequestBody, type ImageProvider } from "@/lib/photobooth/higgsfield";
import { brandReferenceUrls, resetBrandCache, startGeneration, type PhotoboothDb } from "@/lib/photobooth/service";

// Logo officiel joint a la photo : le modele connait la vraie marque et n'en
// invente pas une fausse.

const LOGO = "https://example.com/brand/logo.png";
const answers: Answers = ["calm", "natural", "editorial"];

function provider(): ImageProvider {
  let n = 0;
  return {
    uploadReference: vi.fn(async () => `https://cdn/upload-${++n}.png`),
    submit: vi.fn(async () => ({ kind: "accepted" as const, jobId: "j", statusUrl: "https://api.higgsfield.ai/requests/j/status" })),
    status: vi.fn(async () => ({ status: "queued" as const })),
  };
}
const okFetch = vi.fn(async () => new Response(new Uint8Array(8), { headers: { "content-type": "image/png" } })) as unknown as typeof fetch;

beforeEach(() => resetBrandCache());

describe("corps de requete", () => {
  it("la photo reste l'image 1, le logo suit", () => {
    const b = buildRequestBody("flare", "p", "photo", DEFAULT_CONFIG, ["logo"]);
    expect(b.image_urls).toEqual(["photo", "logo"]);
  });
  it("plafond du modele respecte (qwen : 3 images)", () => {
    expect(buildRequestBody("qwen", "p", "photo", DEFAULT_CONFIG, ["a", "b", "c"]).image_urls).toEqual(["photo", "a", "b"]);
  });
  it("sans logo : la photo seule, comme avant", () => {
    expect(buildRequestBody("flare", "p", "photo", DEFAULT_CONFIG).image_urls).toEqual(["photo"]);
  });
});

describe("images de marque", () => {
  it("envoyees une seule fois chez Higgsfield, puis reutilisees", async () => {
    const p = provider();
    const cfg = { ...DEFAULT_CONFIG, brandReferences: [LOGO] };
    expect(await brandReferenceUrls(cfg, p, okFetch)).toEqual(["https://cdn/upload-1.png"]);
    expect(await brandReferenceUrls(cfg, p, okFetch)).toEqual(["https://cdn/upload-1.png"]);
    expect(p.uploadReference).toHaveBeenCalledTimes(1);
  });
  it("logo injoignable : ignore, jamais bloquant", async () => {
    const p = provider();
    const bad = vi.fn(async () => new Response("nope", { status: 404 })) as unknown as typeof fetch;
    expect(await brandReferenceUrls({ ...DEFAULT_CONFIG, brandReferences: [LOGO] }, p, bad)).toEqual([]);
  });
  it("la configuration accepte jusqu'a 3 images", () => {
    expect(resolveConfig({ brandReferences: [LOGO] }).ok).toBe(true);
    expect(resolveConfig({ brandReferences: [LOGO, LOGO, LOGO, LOGO] }).ok).toBe(false);
  });
});

describe("prompt", () => {
  const mood = buildMoodProfile(answers, DEFAULT_CONFIG, "k-1");
  it("explique l'image 2 et interdit toute fausse marque", () => {
    const p = buildPortraitPrompt(mood, DEFAULT_CONFIG, { brandRefs: 1 });
    expect(p).toContain("BRAND REFERENCE: image 1 is the photo to edit. Image 2 shows the official logo");
    expect(p).toContain("Never invent any other logo");
  });
  it("sans image de marque : aucune ligne", () => {
    expect(buildPortraitPrompt(mood, DEFAULT_CONFIG)).not.toContain("BRAND REFERENCE");
  });
  it("visage petit ou flou : nettoyer, jamais redessiner", () => {
    expect(buildPortraitPrompt(mood, DEFAULT_CONFIG)).toContain(FACE_FIDELITY);
    expect(buildPortraitPrompt({ ...mood, shot: "group" }, DEFAULT_CONFIG)).toContain(FACE_FIDELITY);
  });
});

describe("generation", () => {
  it("le logo part avec la photo, et le prompt le decrit", async () => {
    const p = provider();
    vi.stubGlobal("fetch", okFetch);
    const db: PhotoboothDb = {
      reserve: vi.fn(async () => ({ ok: true as const, usage_id: "u1", duplicate: false, status: "reserved" as const })),
      transition: vi.fn(async () => ({ ok: true })),
      getUsage: vi.fn(async () => null),
    };
    await startGeneration({
      campaignId: "c", config: { ...DEFAULT_CONFIG, brandReferences: [LOGO] }, answers,
      sessionId: "session-1", idempotencyKey: "idem-0001", image: { bytes: new Uint8Array(4), type: "image/jpeg" },
    }, { db, provider: p });
    vi.unstubAllGlobals();
    const call = vi.mocked(p.submit).mock.calls[0][0];
    expect(call.imageUrl).toBe("https://cdn/upload-1.png");
    expect(call.extraImageUrls).toEqual(["https://cdn/upload-2.png"]);
    expect(call.prompt).toContain("Image 2 shows the official logo");
  });
});
