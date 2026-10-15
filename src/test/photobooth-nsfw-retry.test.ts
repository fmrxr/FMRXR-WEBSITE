import { describe, it, expect, vi } from "vitest";
import { DEFAULT_CONFIG } from "@/lib/photobooth/config";
import { buildMoodProfile, SOFTEN, type Answers, type MoodProfile } from "@/lib/photobooth/mood";
import type { ImageProvider, StatusResult } from "@/lib/photobooth/higgsfield";
import { NSFW_RETRY, pollGeneration, startGeneration, type PhotoboothDb, type Submission, type UsageStatus } from "@/lib/photobooth/service";
import { quotaState } from "@/lib/photobooth/quota";

// Faux refus « nsfw » de Higgsfield : une relance, une seule, sur la meme
// ligne de consommation, donc sans place de quota en plus.

type Row = {
  status: UsageStatus; status_url: string | null; result_url: string | null; error_code: string | null;
  session_id: string; mood: (MoodProfile & { submission?: Submission }) | null;
};

const QUOTA = 2;

/** Base en memoire qui applique les regles de photobooth_reserve / photobooth_transition. */
function memoryDb() {
  const rows = new Map<string, Row>();
  const audits: { action: string; before: unknown; after: unknown }[] = [];
  let n = 0;
  const used = () => [...rows.values()].filter((r) => ["succeeded", "reserved", "processing", "unknown"].includes(r.status)).length;
  const db: PhotoboothDb = {
    reserve: vi.fn(async ({ sessionId, mood }) => {
      if (used() >= QUOTA) return { ok: false as const, error: "QUOTA_EXHAUSTED" };
      const id = `u${++n}`;
      rows.set(id, { status: "reserved", status_url: null, result_url: null, error_code: null, session_id: sessionId, mood });
      return { ok: true as const, usage_id: id, duplicate: false, status: "reserved" as const };
    }),
    transition: vi.fn(async (id, to, f = {}) => {
      const r = rows.get(id)!;
      if (["succeeded", "failed", "cancelled"].includes(r.status)) return { ok: r.status === to, status: r.status };
      Object.assign(r, {
        status: to,
        status_url: f.statusUrl ?? r.status_url,
        result_url: f.resultUrl ?? r.result_url,
        error_code: f.errorCode ?? r.error_code,
      });
      return { ok: true, status: to };
    }),
    getUsage: vi.fn(async (id) => {
      const r = rows.get(id);
      return r ? { id, campaign_id: "c", created_at: "", ...r } : null;
    }),
    saveSubmission: vi.fn(async (id, mood) => { rows.get(id)!.mood = mood; }),
    getRetryContext: vi.fn(async (id) => {
      const m = rows.get(id)?.mood;
      return m?.submission ? { config: DEFAULT_CONFIG, mood: m, submission: m.submission } : null;
    }),
    audit: vi.fn(async (_c, action, before, after) => { audits.push({ action, before, after }); }),
  };
  const quota = () => quotaState({
    quota: QUOTA, warning: 70, critical: 90,
    succeeded: [...rows.values()].filter((r) => r.status === "succeeded").length,
    active: [...rows.values()].filter((r) => ["reserved", "processing", "unknown"].includes(r.status)).length,
  });
  return { db, rows, audits, quota };
}

const JOB1 = "https://api.higgsfield.ai/requests/job1/status";
const JOB2 = "https://api.higgsfield.ai/requests/job2/status";

/** Higgsfield : job1 a la premiere soumission, job2 a la relance ; statuts donnes par URL. */
function provider(statusByUrl: Record<string, StatusResult>): ImageProvider {
  let jobs = 0;
  return {
    uploadReference: vi.fn(async () => "https://cdn/ref.jpg"),
    submit: vi.fn(async () => {
      jobs++;
      return { kind: "accepted" as const, jobId: `job${jobs}`, statusUrl: jobs === 1 ? JOB1 : JOB2 };
    }),
    status: vi.fn(async (url: string) => statusByUrl[url]),
  };
}

const input = {
  campaignId: "c", config: DEFAULT_CONFIG, answers: ["calm", "natural", "editorial"] as Answers,
  sessionId: "session-1", idempotencyKey: "idem-0001", image: { bytes: new Uint8Array(12), type: "image/jpeg" },
  style: "hero" as const,
};

async function started(p: ImageProvider) {
  const m = memoryDb();
  const r = await startGeneration(input, { db: m.db, provider: p });
  if (!r.ok) throw new Error(r.error);
  return { ...m, usageId: r.usageId };
}

describe("relance apres un faux nsfw", () => {
  it("nsfw -> une relance -> reussie", async () => {
    const p = provider({ [JOB1]: { status: "nsfw" }, [JOB2]: { status: "completed", imageUrl: "https://cdn/out.png" } });
    const { db, rows, audits, usageId } = await started(p);

    expect(await pollGeneration(usageId, "session-1", { db, provider: p })).toEqual({ status: "processing" });
    expect(p.submit).toHaveBeenCalledTimes(2);
    const [first, retry] = vi.mocked(p.submit).mock.calls.map((c) => c[0]);
    // Autre cle d'idempotence, autre prompt (formulation adoucie), meme photo de reference.
    expect(retry.idempotencyKey).toBe(`${usageId}-nsfw-retry`);
    expect(retry.imageUrl).toBe("https://cdn/ref.jpg");
    expect(first.prompt).not.toContain(SOFTEN);
    expect(retry.prompt).toContain(SOFTEN);
    expect(rows.get(usageId)).toMatchObject({ status: "processing", status_url: JOB2, error_code: NSFW_RETRY });
    expect(audits).toEqual([expect.objectContaining({ action: "nsfw_retry", after: expect.objectContaining({ outcome: "resubmitted" }) })]);

    expect(await pollGeneration(usageId, "session-1", { db, provider: p })).toEqual({ status: "succeeded", resultUrl: "https://cdn/out.png" });
    expect(rows.get(usageId)!.status).toBe("succeeded");
  });

  it("la relance tire une autre mise en scene, graine propre a la relance", async () => {
    const p = provider({ [JOB1]: { status: "nsfw" }, [JOB2]: { status: "processing" } });
    const { db, rows, usageId } = await started(p);
    const first = rows.get(usageId)!.mood!;
    await pollGeneration(usageId, "session-1", { db, provider: p });
    const after = rows.get(usageId)!.mood!;
    const expected = buildMoodProfile(input.answers, DEFAULT_CONFIG, `${usageId}:nsfw-retry`, null, "solo", "hero");
    expect(after.variant).toBe(expected.variant);
    expect(first.variant).toBe(buildMoodProfile(input.answers, DEFAULT_CONFIG, input.idempotencyKey, null, "solo", "hero").variant);
    // Titre et description ne dependent que des reponses : la carte finale ne change pas.
    expect(after.title).toEqual(first.title);
    expect(after.submission?.imageUrl).toBe("https://cdn/ref.jpg");
  });

  it("nsfw deux fois -> echec net, pas de troisieme envoi", async () => {
    const p = provider({ [JOB1]: { status: "nsfw" }, [JOB2]: { status: "nsfw" } });
    const { db, rows, usageId } = await started(p);

    await pollGeneration(usageId, "session-1", { db, provider: p });
    expect(await pollGeneration(usageId, "session-1", { db, provider: p })).toEqual({ status: "failed", error: "PROVIDER_NSFW" });
    expect(await pollGeneration(usageId, "session-1", { db, provider: p })).toEqual({ status: "failed", error: "PROVIDER_NSFW" });
    expect(p.submit).toHaveBeenCalledTimes(2);
    expect(rows.get(usageId)).toMatchObject({ status: "failed", error_code: "PROVIDER_NSFW" });
  });

  it("la relance ne consomme aucune place de quota", async () => {
    const p = provider({ [JOB1]: { status: "nsfw" }, [JOB2]: { status: "completed", imageUrl: "https://cdn/out.png" } });
    const { db, rows, quota, usageId } = await started(p);
    const during = quota().used;

    await pollGeneration(usageId, "session-1", { db, provider: p });
    expect(db.reserve).toHaveBeenCalledTimes(1);
    expect(rows.size).toBe(1);
    expect(quota().used).toBe(during);

    await pollGeneration(usageId, "session-1", { db, provider: p });
    // Une image livree = une place, comme sans relance.
    expect(quota()).toMatchObject({ used: 1, remaining: QUOTA - 1 });
  });

  it("echec definitif : la place est rendue", async () => {
    const p = provider({ [JOB1]: { status: "nsfw" }, [JOB2]: { status: "nsfw" } });
    const { db, quota, usageId } = await started(p);
    await pollGeneration(usageId, "session-1", { db, provider: p });
    await pollGeneration(usageId, "session-1", { db, provider: p });
    expect(quota()).toMatchObject({ used: 0, remaining: QUOTA });
  });

  it("relance refusee net par Higgsfield -> echec nsfw", async () => {
    const p = provider({ [JOB1]: { status: "nsfw" } });
    const { db, rows, audits, usageId } = await started(p);
    vi.mocked(p.submit).mockResolvedValueOnce({ kind: "rejected", code: "PROVIDER_REJECTED", httpStatus: 400 });
    expect(await pollGeneration(usageId, "session-1", { db, provider: p })).toEqual({ status: "failed", error: "PROVIDER_NSFW" });
    expect(rows.get(usageId)!.status).toBe("failed");
    expect(audits[0].after).toMatchObject({ outcome: "rejected" });
  });

  it("sans contexte de relance (base ancienne) : echec net comme avant", async () => {
    const p = provider({ [JOB1]: { status: "nsfw" } });
    const { db, usageId } = await started(p);
    db.getRetryContext = undefined;
    expect(await pollGeneration(usageId, "session-1", { db, provider: p })).toEqual({ status: "failed", error: "PROVIDER_NSFW" });
    expect(p.submit).toHaveBeenCalledTimes(1);
  });
});
