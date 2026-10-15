import type { CampaignConfig } from "./config";
import type { ImageProvider } from "./higgsfield";
import { buildMoodProfile, buildPortraitPrompt, validateMoodProfile, type Answers, type MoodProfile, type Shot } from "./mood";
import type { ExpressionId } from "./expression";

// Orchestration d'une generation. Les dependances (base, fournisseur) sont
// injectees pour que les tests puissent prouver la regle centrale :
// sans reservation reussie, aucun appel au fournisseur payant.

export type UsageStatus = "reserved" | "processing" | "succeeded" | "failed" | "cancelled" | "unknown";

export type ReserveResult =
  | { ok: true; usage_id: string; duplicate: boolean; status: UsageStatus }
  | { ok: false; error: string };

export interface PhotoboothDb {
  reserve(a: { campaignId: string; sessionId: string; idempotencyKey: string; model: string; mood: MoodProfile }): Promise<ReserveResult>;
  transition(usageId: string, to: UsageStatus, fields?: {
    providerJobId?: string; statusUrl?: string; resultUrl?: string; errorCode?: string;
  }): Promise<{ ok: boolean; status?: string; error?: string }>;
  getUsage(usageId: string): Promise<{
    id: string; campaign_id: string; session_id: string; status: UsageStatus;
    status_url: string | null; result_url: string | null; error_code: string | null; created_at: string;
    share_token?: string;
  } | null>;
}

export type StartInput = {
  campaignId: string;
  config: CampaignConfig;
  answers: Answers;
  sessionId: string;
  idempotencyKey: string;
  image: { bytes: Uint8Array; type: string };
  expression?: ExpressionId | null;
  shot?: Shot;
  /** Format decide par le serveur (chooseAspect), sinon celui de la campagne. */
  aspect?: CampaignConfig["aspectRatio"];
};

export type StartResult =
  | { ok: true; usageId: string; status: UsageStatus; mood: MoodProfile }
  | { ok: false; error: string; usageId?: string };

export async function startGeneration(input: StartInput, deps: { db: PhotoboothDb; provider: ImageProvider }): Promise<StartResult> {
  let mood: MoodProfile;
  try {
    // Graine = cle de la photo : une relance retombe sur la meme mise en scene.
    mood = buildMoodProfile(input.answers, input.config, input.idempotencyKey, input.expression ?? null, input.shot ?? "solo");
  } catch {
    return { ok: false, error: "INVALID_ANSWERS" };
  }
  if (!validateMoodProfile(mood)) return { ok: false, error: "INVALID_MOOD" };

  const r = await deps.db.reserve({
    campaignId: input.campaignId, sessionId: input.sessionId,
    idempotencyKey: input.idempotencyKey, model: input.config.model, mood,
  });
  if (!r.ok) return { ok: false, error: r.error };

  // Double clic, reseau qui rejoue, rerender : meme cle = meme ligne.
  // La premiere requete s'occupe de l'envoi, celle-ci renvoie juste l'identifiant.
  if (r.duplicate) return { ok: true, usageId: r.usage_id, status: r.status, mood };

  const usageId = r.usage_id;
  let imageUrl: string;
  try {
    imageUrl = await deps.provider.uploadReference(input.image.bytes, input.image.type);
  } catch {
    // L'envoi de la photo a echoue : aucune generation lancee, on libere.
    await deps.db.transition(usageId, "failed", { errorCode: "UPLOAD_FAILED" });
    return { ok: false, error: "UPLOAD_FAILED", usageId };
  }

  const prompt = buildPortraitPrompt(mood, input.config);
  // L'identifiant de la ligne sert de cle d'idempotence chez Higgsfield.
  const sub = await deps.provider.submit({
    model: input.config.model, prompt, imageUrl,
    config: input.aspect ? { ...input.config, aspectRatio: input.aspect } : input.config,
    idempotencyKey: usageId,
  });

  if (sub.kind === "accepted") {
    await deps.db.transition(usageId, "processing", { providerJobId: sub.jobId, statusUrl: sub.statusUrl });
    return { ok: true, usageId, status: "processing", mood };
  }
  if (sub.kind === "rejected") {
    await deps.db.transition(usageId, "failed", { errorCode: sub.code });
    return { ok: false, error: sub.code, usageId };
  }
  // Issue inconnue : on garde la reservation, un admin tranchera.
  await deps.db.transition(usageId, "unknown", { errorCode: sub.code });
  return { ok: false, error: sub.code, usageId };
}

export type PollResult =
  | { status: "processing" }
  | { status: "succeeded"; resultUrl: string }
  | { status: "failed"; error: string }
  | { status: "unknown"; error: string };

/**
 * Lit l'etat d'une generation et le fait avancer d'apres Higgsfield.
 * Seul le serveur finalise la comptabilite, jamais le navigateur.
 */
export async function pollGeneration(
  usageId: string,
  sessionId: string | null, // null = appel admin (reconciliation)
  deps: { db: PhotoboothDb; provider: ImageProvider },
): Promise<PollResult | { status: "not_found" }> {
  const u = await deps.db.getUsage(usageId);
  if (!u || (sessionId !== null && u.session_id !== sessionId)) return { status: "not_found" };

  if (u.status === "succeeded" && u.result_url) return { status: "succeeded", resultUrl: u.result_url };
  if (u.status === "failed" || u.status === "cancelled") return { status: "failed", error: u.error_code ?? "FAILED" };
  if (!u.status_url) {
    return u.status === "unknown"
      ? { status: "unknown", error: u.error_code ?? "UNKNOWN" }
      : { status: "processing" };
  }

  const s = await deps.provider.status(u.status_url);
  switch (s.status) {
    case "completed":
      if (!s.imageUrl) return { status: "processing" };
      await deps.db.transition(usageId, "succeeded", { resultUrl: s.imageUrl });
      return { status: "succeeded", resultUrl: s.imageUrl };
    case "failed":
    case "nsfw":
      await deps.db.transition(usageId, "failed", { errorCode: s.status === "nsfw" ? "PROVIDER_NSFW" : "PROVIDER_FAILED" });
      return { status: "failed", error: s.status === "nsfw" ? "PROVIDER_NSFW" : "PROVIDER_FAILED" };
    case "canceled":
      await deps.db.transition(usageId, "cancelled", { errorCode: "PROVIDER_CANCELED" });
      return { status: "failed", error: "PROVIDER_CANCELED" };
    case "queued":
    case "processing":
      if (u.status === "unknown") await deps.db.transition(usageId, "processing");
      return { status: "processing" };
    default:
      // Statut illisible : on ne libere rien, on reessaiera.
      return u.status === "unknown"
        ? { status: "unknown", error: s.error ?? "STATUS_ERROR" }
        : { status: "processing" };
  }
}
