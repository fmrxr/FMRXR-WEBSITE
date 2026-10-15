import { describe, it, expect, vi } from "vitest";
import { DEFAULT_CONFIG, resolveConfig } from "@/lib/photobooth/config";
import { buildMoodProfile, buildPortraitPrompt, validateMoodProfile, type Answers } from "@/lib/photobooth/mood";
import { classifyGesture, GestureStabilizer, type Point } from "@/lib/photobooth/gestures";
import { sniffImage } from "@/lib/photobooth/image";
import { quotaState } from "@/lib/photobooth/quota";
import { buildRequestBody, createHiggsfieldProvider, isTrustedStatusUrl, rejectionCode, type ImageProvider } from "@/lib/photobooth/higgsfield";
import { pollGeneration, startGeneration, type PhotoboothDb, type UsageStatus } from "@/lib/photobooth/service";

// ---------- configuration ----------
describe("config", () => {
  it("la configuration par defaut est valide", () => {
    expect(resolveConfig({}).ok).toBe(true);
  });
  it("refuse deux reponses sur le meme geste", () => {
    const qs = structuredClone(DEFAULT_CONFIG.questions);
    qs[0].options[1].gesture = "open_palm";
    const r = resolveConfig({ questions: qs });
    expect(r.ok).toBe(false);
  });
  it("refuse un modele inconnu", () => {
    expect(resolveConfig({ model: "dall-e" }).ok).toBe(false);
  });
});

// ---------- moteur d'ambiance ----------
describe("mood", () => {
  const all: Answers[] = [];
  for (const a of DEFAULT_CONFIG.questions[0].options)
    for (const b of DEFAULT_CONFIG.questions[1].options)
      for (const c of DEFAULT_CONFIG.questions[2].options) all.push([a.id, b.id, c.id]);

  it("couvre les 64 combinaisons avec un profil valide", () => {
    expect(all).toHaveLength(64);
    for (const a of all) expect(validateMoodProfile(buildMoodProfile(a, DEFAULT_CONFIG))).toBe(true);
  });
  it("est deterministe", () => {
    const a: Answers = ["bold", "cinematic", "cinema"];
    expect(buildPortraitPrompt(buildMoodProfile(a, DEFAULT_CONFIG), DEFAULT_CONFIG))
      .toBe(buildPortraitPrompt(buildMoodProfile(a, DEFAULT_CONFIG), DEFAULT_CONFIG));
  });
  it("des reponses differentes donnent des prompts differents", () => {
    const prompts = new Set(all.map((a) => buildPortraitPrompt(buildMoodProfile(a, DEFAULT_CONFIG), DEFAULT_CONFIG)));
    expect(prompts.size).toBe(64);
  });
  it("le prompt exige de garder l'identite", () => {
    const p = buildPortraitPrompt(buildMoodProfile(["calm", "natural", "editorial"], DEFAULT_CONFIG), DEFAULT_CONFIG);
    expect(p).toMatch(/Keep their identity/);
  });
  it("refuse une reponse inconnue", () => {
    expect(() => buildMoodProfile(["calm", "nope", "editorial"], DEFAULT_CONFIG)).toThrow();
  });
});

// ---------- gestes ----------
function hand(ext: { thumb: "side" | "up" | "folded"; index: boolean; middle: boolean; ring: boolean; pinky: boolean }): Point[] {
  const p: Point[] = Array.from({ length: 21 }, () => ({ x: 0, y: 0 }));
  p[0] = { x: 0.5, y: 0.9 };
  if (ext.thumb === "side") { p[1] = { x: 0.42, y: 0.82 }; p[2] = { x: 0.37, y: 0.76 }; p[3] = { x: 0.33, y: 0.7 }; p[4] = { x: 0.29, y: 0.64 }; }
  if (ext.thumb === "up") { p[1] = { x: 0.43, y: 0.8 }; p[2] = { x: 0.41, y: 0.62 }; p[3] = { x: 0.4, y: 0.5 }; p[4] = { x: 0.4, y: 0.4 }; }
  if (ext.thumb === "folded") { p[1] = { x: 0.43, y: 0.82 }; p[2] = { x: 0.41, y: 0.78 }; p[3] = { x: 0.4, y: 0.74 }; p[4] = { x: 0.46, y: 0.7 }; }
  const fingers: [number, number, boolean][] = [[5, 0.44, ext.index], [9, 0.5, ext.middle], [13, 0.56, ext.ring], [17, 0.61, ext.pinky]];
  for (const [m, x, open] of fingers) {
    const my = m === 9 ? 0.63 : m === 17 ? 0.68 : 0.65;
    p[m] = { x, y: my };
    if (open) { p[m + 1] = { x, y: my - 0.08 }; p[m + 2] = { x, y: my - 0.14 }; p[m + 3] = { x, y: my - 0.2 }; }
    else { p[m + 1] = { x, y: my - 0.06 }; p[m + 2] = { x, y: my - 0.02 }; p[m + 3] = { x, y: my + 0.03 }; }
  }
  return p;
}

describe("gestures", () => {
  it("main ouverte", () => expect(classifyGesture(hand({ thumb: "side", index: true, middle: true, ring: true, pinky: true }))).toBe("open_palm"));
  it("poing ferme", () => expect(classifyGesture(hand({ thumb: "folded", index: false, middle: false, ring: false, pinky: false }))).toBe("fist"));
  it("pouce leve", () => expect(classifyGesture(hand({ thumb: "up", index: false, middle: false, ring: false, pinky: false }))).toBe("thumb_up"));
  it("signe de paix", () => expect(classifyGesture(hand({ thumb: "folded", index: true, middle: true, ring: false, pinky: false }))).toBe("peace"));
  it("geste ambigu = rien", () => expect(classifyGesture(hand({ thumb: "folded", index: true, middle: false, ring: true, pinky: false }))).toBeNull());
  it("main incomplete = rien", () => expect(classifyGesture([])).toBeNull());

  it("stabilisation : il faut tenir le geste", () => {
    const s = new GestureStabilizer(900, 250);
    expect(s.update("fist", 0).confirmed).toBe(false);
    expect(s.update("fist", 500).confirmed).toBe(false);
    expect(s.update("fist", 950).confirmed).toBe(true);
  });
  it("stabilisation : un autre geste remet a zero", () => {
    const s = new GestureStabilizer(900, 250);
    s.update("fist", 0);
    s.update("peace", 600);
    expect(s.update("peace", 1000).confirmed).toBe(false);
    expect(s.update("peace", 1500).confirmed).toBe(true);
  });
  it("stabilisation : une image perdue est toleree, une absence longue non", () => {
    const s = new GestureStabilizer(900, 250);
    s.update("fist", 0);
    s.update("fist", 200);
    s.update(null, 350); // 150 ms sans main : sous la tolerance de 250 ms
    expect(s.update("fist", 950).confirmed).toBe(true);
    const t = new GestureStabilizer(900, 250);
    t.update("fist", 0);
    t.update(null, 600);
    expect(t.update("fist", 1000).confirmed).toBe(false);
  });
});

// ---------- image ----------
describe("image", () => {
  it("reconnait les signatures et refuse le reste", () => {
    expect(sniffImage(new Uint8Array([0xff, 0xd8, 0xff, 0xe0, 0, 0, 0, 0, 0, 0, 0, 0]))).toBe("image/jpeg");
    expect(sniffImage(new Uint8Array([0x89, 0x50, 0x4e, 0x47, 0, 0, 0, 0, 0, 0, 0, 0]))).toBe("image/png");
    expect(sniffImage(new TextEncoder().encode("RIFF0000WEBPVP8 "))).toBe("image/webp");
    expect(sniffImage(new TextEncoder().encode("<svg onload=alert(1)>"))).toBeNull();
  });
});

// ---------- lecture du quota ----------
describe("quotaState", () => {
  const base = { warning: 70, critical: 90 };
  it("formule : quota - reussies - reservations", () => {
    expect(quotaState({ quota: 500, succeeded: 327, active: 3, ...base })).toMatchObject({ remaining: 170, level: "ok" });
  });
  it("niveaux d'alerte", () => {
    expect(quotaState({ quota: 100, succeeded: 75, active: 0, ...base }).level).toBe("warning");
    expect(quotaState({ quota: 100, succeeded: 92, active: 0, ...base }).level).toBe("critical");
    expect(quotaState({ quota: 100, succeeded: 99, active: 1, ...base }).level).toBe("blocked");
  });
});

// ---------- Higgsfield ----------
describe("higgsfield", () => {
  it("corps de requete conforme au schema de chaque modele", () => {
    const c = { ...DEFAULT_CONFIG, resolution: "4k" as const, quality: "max" as const };
    expect(buildRequestBody("flare", "p", "u", c)).toEqual({
      prompt: "p", image_urls: ["u"], resolution: "4k", aspect_ratio: "3:4", quality: "max", enhance_prompt: false,
    });
    expect(buildRequestBody("grok", "p", "u", c)).toMatchObject({ resolution: "2k", quality: "medium" });
    expect(buildRequestBody("qwen", "p", "u", c)).toMatchObject({ resolution: "2k" });
    expect(buildRequestBody("qwen", "p", "u", c)).not.toHaveProperty("quality");
  });
  it("codes de refus", () => {
    expect(rejectionCode(403, "")).toBe("PROVIDER_NO_CREDITS");
    expect(rejectionCode(401, "")).toBe("PROVIDER_AUTH");
    expect(rejectionCode(400, "Maximum number of concurrent requests (4)")).toBe("PROVIDER_BUSY");
  });
  it("n'interroge que l'API Higgsfield", () => {
    expect(isTrustedStatusUrl("https://api.higgsfield.ai/requests/x/status")).toBe(true);
    expect(isTrustedStatusUrl("https://evil.example/requests")).toBe(false);
    expect(isTrustedStatusUrl("http://api.higgsfield.ai/x")).toBe(false);
  });
  it("rejoue avec la meme Idempotency-Key apres un 5xx", async () => {
    const keys: string[] = [];
    let n = 0;
    const fetchImpl = vi.fn(async (_u: string, init?: RequestInit) => {
      keys.push((init!.headers as Record<string, string>)["Idempotency-Key"]);
      n++;
      return n < 2
        ? new Response("err", { status: 500 })
        : new Response(JSON.stringify({ request_id: "r1", status_url: "https://api.higgsfield.ai/requests/r1/status" }), { status: 200 });
    }) as unknown as typeof fetch;
    const p = createHiggsfieldProvider({ keyId: "a", secret: "b", fetchImpl, retries: 2 });
    const r = await p.submit({ model: "flare", prompt: "p", imageUrl: "u", config: DEFAULT_CONFIG, idempotencyKey: "k-123" });
    expect(r).toMatchObject({ kind: "accepted", jobId: "r1" });
    expect(keys).toEqual(["k-123", "k-123"]);
  });
  it("un 4xx n'est pas rejoue", async () => {
    const fetchImpl = vi.fn(async () => new Response("no credits", { status: 403 })) as unknown as typeof fetch;
    const p = createHiggsfieldProvider({ keyId: "a", secret: "b", fetchImpl, retries: 3 });
    const r = await p.submit({ model: "flare", prompt: "p", imageUrl: "u", config: DEFAULT_CONFIG, idempotencyKey: "k-123" });
    expect(r).toEqual({ kind: "rejected", code: "PROVIDER_NO_CREDITS", httpStatus: 403 });
    expect(fetchImpl).toHaveBeenCalledTimes(1);
  });
});

// ---------- orchestration : la regle centrale ----------
function fakeDb(reserve: Awaited<ReturnType<PhotoboothDb["reserve"]>>) {
  const transitions: [string, UsageStatus, Record<string, unknown>?][] = [];
  const usage = new Map<string, { status: UsageStatus; status_url: string | null; result_url: string | null; error_code: string | null; session_id: string }>();
  const db: PhotoboothDb = {
    reserve: vi.fn(async () => reserve),
    transition: vi.fn(async (id, to, f) => {
      transitions.push([id, to, f]);
      const u = usage.get(id);
      if (u) Object.assign(u, { status: to, status_url: f?.statusUrl ?? u.status_url, result_url: f?.resultUrl ?? u.result_url, error_code: f?.errorCode ?? u.error_code });
      return { ok: true };
    }),
    getUsage: vi.fn(async (id) => {
      const u = usage.get(id);
      return u ? { id, campaign_id: "c", created_at: "", ...u } : null;
    }),
  };
  return { db, transitions, usage };
}

function fakeProvider(over: Partial<ImageProvider> = {}): ImageProvider {
  return {
    uploadReference: vi.fn(async () => "https://cdn/ref.jpg"),
    submit: vi.fn(async () => ({ kind: "accepted" as const, jobId: "job1", statusUrl: "https://api.higgsfield.ai/requests/job1/status" })),
    status: vi.fn(async () => ({ status: "completed" as const, imageUrl: "https://cdn/out.png" })),
    ...over,
  };
}

const input = {
  campaignId: "c", config: DEFAULT_CONFIG, answers: ["calm", "natural", "editorial"] as Answers,
  sessionId: "session-1", idempotencyKey: "idem-0001", image: { bytes: new Uint8Array(12), type: "image/jpeg" },
};

describe("startGeneration", () => {
  for (const error of ["QUOTA_EXHAUSTED", "DAILY_QUOTA_EXHAUSTED", "SPENDING_LIMIT_REACHED", "CAMPAIGN_SUSPENDED", "CAMPAIGN_EXPIRED", "CONCURRENCY_LIMIT_REACHED"]) {
    it(`${error} : aucun appel au fournisseur payant`, async () => {
      const { db } = fakeDb({ ok: false, error });
      const provider = fakeProvider();
      const r = await startGeneration(input, { db, provider });
      expect(r).toEqual({ ok: false, error });
      expect(provider.uploadReference).not.toHaveBeenCalled();
      expect(provider.submit).not.toHaveBeenCalled();
    });
  }

  it("reponses invalides : ni reservation ni appel", async () => {
    const { db } = fakeDb({ ok: true, usage_id: "u1", duplicate: false, status: "reserved" });
    const provider = fakeProvider();
    const r = await startGeneration({ ...input, answers: ["x", "y", "z"] }, { db, provider });
    expect(r).toMatchObject({ ok: false, error: "INVALID_ANSWERS" });
    expect(db.reserve).not.toHaveBeenCalled();
    expect(provider.submit).not.toHaveBeenCalled();
  });

  it("cle deja vue : pas de deuxieme envoi", async () => {
    const { db } = fakeDb({ ok: true, usage_id: "u1", duplicate: true, status: "processing" });
    const provider = fakeProvider();
    const r = await startGeneration(input, { db, provider });
    expect(r).toMatchObject({ ok: true, usageId: "u1", status: "processing" });
    expect(provider.submit).not.toHaveBeenCalled();
  });

  it("acceptee : passe en processing avec l'id de ligne comme cle d'idempotence", async () => {
    const { db, transitions } = fakeDb({ ok: true, usage_id: "u1", duplicate: false, status: "reserved" });
    const provider = fakeProvider();
    await startGeneration(input, { db, provider });
    expect(provider.submit).toHaveBeenCalledWith(expect.objectContaining({ idempotencyKey: "u1", imageUrl: "https://cdn/ref.jpg" }));
    expect(transitions[0]).toEqual(["u1", "processing", { providerJobId: "job1", statusUrl: "https://api.higgsfield.ai/requests/job1/status" }]);
  });

  it("refus net : la reservation est liberee", async () => {
    const { db, transitions } = fakeDb({ ok: true, usage_id: "u1", duplicate: false, status: "reserved" });
    const provider = fakeProvider({ submit: vi.fn(async () => ({ kind: "rejected" as const, code: "PROVIDER_NO_CREDITS", httpStatus: 403 })) });
    const r = await startGeneration(input, { db, provider });
    expect(r).toMatchObject({ ok: false, error: "PROVIDER_NO_CREDITS" });
    expect(transitions[0][1]).toBe("failed");
  });

  it("issue inconnue : la reservation est gardee", async () => {
    const { db, transitions } = fakeDb({ ok: true, usage_id: "u1", duplicate: false, status: "reserved" });
    const provider = fakeProvider({ submit: vi.fn(async () => ({ kind: "ambiguous" as const, code: "PROVIDER_TIMEOUT" })) });
    await startGeneration(input, { db, provider });
    expect(transitions[0][1]).toBe("unknown");
    expect(transitions.some(([, s]) => s === "failed" || s === "cancelled")).toBe(false);
  });

  it("echec d'envoi de la photo : liberee, rien de lance", async () => {
    const { db, transitions } = fakeDb({ ok: true, usage_id: "u1", duplicate: false, status: "reserved" });
    const provider = fakeProvider({ uploadReference: vi.fn(async () => { throw new Error("x"); }) });
    await startGeneration(input, { db, provider });
    expect(provider.submit).not.toHaveBeenCalled();
    expect(transitions[0][1]).toBe("failed");
  });
});

describe("pollGeneration", () => {
  const seed = (status: UsageStatus, status_url: string | null) => {
    const f = fakeDb({ ok: false, error: "x" });
    f.usage.set("u1", { status, status_url, result_url: null, error_code: null, session_id: "session-1" });
    return f;
  };
  const URL_OK = "https://api.higgsfield.ai/requests/job1/status";

  it("une autre session ne voit rien", async () => {
    const { db } = seed("processing", URL_OK);
    expect(await pollGeneration("u1", "intrus", { db, provider: fakeProvider() })).toEqual({ status: "not_found" });
  });
  it("completed -> succeeded", async () => {
    const { db, transitions } = seed("processing", URL_OK);
    const r = await pollGeneration("u1", "session-1", { db, provider: fakeProvider() });
    expect(r).toEqual({ status: "succeeded", resultUrl: "https://cdn/out.png" });
    expect(transitions[0][1]).toBe("succeeded");
  });
  it("nsfw -> failed (non facture)", async () => {
    const { db, transitions } = seed("processing", URL_OK);
    await pollGeneration("u1", "session-1", { db, provider: fakeProvider({ status: vi.fn(async () => ({ status: "nsfw" as const })) }) });
    expect(transitions[0]).toEqual(["u1", "failed", { errorCode: "PROVIDER_NSFW" }]);
  });
  it("statut illisible : on ne libere rien", async () => {
    const { db, transitions } = seed("unknown", URL_OK);
    await pollGeneration("u1", null, { db, provider: fakeProvider({ status: vi.fn(async () => ({ status: "error" as const, error: "STATUS_500" })) }) });
    expect(transitions).toHaveLength(0);
  });
  it("deja reussie : pas de nouvel appel", async () => {
    const f = fakeDb({ ok: false, error: "x" });
    f.usage.set("u1", { status: "succeeded", status_url: URL_OK, result_url: "https://cdn/out.png", error_code: null, session_id: "session-1" });
    const provider = fakeProvider();
    await pollGeneration("u1", "session-1", { db: f.db, provider });
    expect(provider.status).not.toHaveBeenCalled();
  });
});

// ---------- V2 ----------
describe("partage", () => {
  it("le partage est actif par defaut", () => {
    const r = resolveConfig({});
    expect(r.ok && r.config.shareEnabled).toBe(true);
  });
  it("un ancien reglage sans shareEnabled reste valide", () => {
    expect(resolveConfig({ model: "qwen" }).ok).toBe(true);
  });
});

// ---------- calibrage sur de vraies mains (images de test officielles MediaPipe) ----------
import hands from "./fixtures/hands.json";
import { decideGesture, RECOGNIZER_MAP } from "@/lib/photobooth/gestures";

describe("calibrage sur vraies mains", () => {
  const lm = hands.landmarks as Record<string, Point[]>;
  it("la geometrie reconnait les 4 gestes sur de vrais landmarks", () => {
    expect(classifyGesture(lm.open_palm)).toBe("open_palm");
    expect(classifyGesture(lm.fist)).toBe("fist");
    expect(classifyGesture(lm.thumb_up)).toBe("thumb_up");
    expect(classifyGesture(lm.victory)).toBe("peace");
    expect(classifyGesture(lm.pointing_up)).toBeNull();
  });
  it("le modele ne confond jamais deux de nos gestes (45 variantes)", () => {
    const expected: Record<string, string> = { open_palm: "Open_Palm", fist: "Closed_Fist", thumb_up: "Thumb_Up", victory: "Victory", pointing_up: "Pointing_Up" };
    for (const r of hands.recognizer) {
      if (r.category === "-" || r.category === "None") continue;
      expect(r.category).toBe(expected[r.image]);
    }
  });
  it("au seuil retenu : 33 variantes sur 36 acceptees, la geometrie rattrape le pouce dans la penombre", () => {
    const ours = hands.recognizer.filter((r) => r.image !== "pointing_up");
    expect(ours).toHaveLength(36);
    const withGeometry = ours.filter((r) => decideGesture({ categoryName: r.category, score: r.score }, lm[r.image]));
    const modelOnly = ours.filter((r) => decideGesture({ categoryName: r.category, score: r.score }, undefined));
    expect(withGeometry).toHaveLength(33); // refus : main minuscule, poing a 80 % de noir, paix inclinee -25 deg
    expect(modelOnly).toHaveLength(32);
  });
  it("pointer l'index ne repond a aucune question", () => {
    expect(decideGesture({ categoryName: "Pointing_Up", score: 0.95 }, lm.pointing_up)).toBeNull();
    expect(Object.keys(RECOGNIZER_MAP)).not.toContain("Pointing_Up");
  });
  it("score faible sans confirmation geometrique : refuse", () => {
    expect(decideGesture({ categoryName: "Thumb_Up", score: 0.4 }, lm.fist)).toBeNull();
    expect(decideGesture({ categoryName: "Thumb_Up", score: 0.4 }, lm.thumb_up)).toBe("thumb_up");
    expect(decideGesture({ categoryName: "Thumb_Up", score: 0.3 }, lm.thumb_up)).toBeNull();
  });
});

// ---------- impression et reglages des gestes ----------
describe("reglages impression et gestes", () => {
  it("valeurs par defaut : impression coupee, agent local, 10x15, seuil calibre", () => {
    const r = resolveConfig({});
    expect(r.ok && r.config.print).toMatchObject({ enabled: false, mode: "agent", agentUrl: "http://127.0.0.1:7341", paper: "10x15", maxPrints: 1 });
    expect(r.ok && r.config.gestureMinScore).toBe(0.5);
    expect(r.ok && r.config.gestureHoldMs).toBe(900);
  });
  it("une surcharge partielle de print garde les autres valeurs", () => {
    const r = resolveConfig({ print: { enabled: true } });
    expect(r.ok && r.config.print).toMatchObject({ enabled: true, mode: "agent", paper: "10x15" });
  });
  it("l'agent ne peut etre qu'en local (pas d'adresse externe)", () => {
    expect(resolveConfig({ print: { agentUrl: "http://evil.example:7341" } }).ok).toBe(false);
    expect(resolveConfig({ print: { agentUrl: "http://192.168.1.20:7341" } }).ok).toBe(false);
    expect(resolveConfig({ print: { agentUrl: "http://localhost:7341" } }).ok).toBe(true);
  });
  it("seuil de geste borne", () => {
    expect(resolveConfig({ gestureMinScore: 0.2 }).ok).toBe(false);
    expect(resolveConfig({ gestureMinScore: 0.6 }).ok).toBe(true);
  });
});
