import type { CampaignConfig } from "./config";
import type { ImageProvider } from "./higgsfield";
import { buildMoodProfile, buildPortraitPrompt, fitPrompt, validateMoodProfile, type Answers, type MoodProfile, type Shot } from "./mood";
import type { ExpressionId } from "./expression";
import type { StyleId } from "./styles";

// Orchestration d'une generation. Les dependances (base, fournisseur) sont
// injectees pour que les tests puissent prouver la regle centrale :
// sans reservation reussie, aucun appel au fournisseur payant.

// Images de marque (config brandReferences) envoyees une fois chez Higgsfield
// puis reutilisees : pas un envoi par visiteur. Rafraichies chaque jour.
const BRAND_TTL_MS = 24 * 3600 * 1000;
const brandCache = new Map<string, { url: string; at: number }>();
export const resetBrandCache = () => brandCache.clear();

/** URLs Higgsfield des images de marque. Une image injoignable est ignoree, jamais bloquante. */
export async function brandReferenceUrls(config: CampaignConfig, provider: ImageProvider, fetchImpl: typeof fetch = fetch): Promise<string[]> {
  const out: string[] = [];
  for (const src of config.brandReferences ?? []) {
    const hit = brandCache.get(src);
    if (hit && Date.now() - hit.at < BRAND_TTL_MS) {
      out.push(hit.url);
      continue;
    }
    try {
      const r = await fetchImpl(src, { signal: AbortSignal.timeout(10_000) });
      const type = r.headers.get("content-type") ?? "";
      if (!r.ok || !type.startsWith("image/")) continue;
      const url = await provider.uploadReference(new Uint8Array(await r.arrayBuffer()), type.split(";")[0]);
      brandCache.set(src, { url, at: Date.now() });
      out.push(url);
    } catch {
      // logo injoignable : la generation part quand meme, sans lui
    }
  }
  return out;
}

export type UsageStatus = "reserved" | "processing" | "succeeded" | "failed" | "cancelled" | "unknown";

export type ReserveResult =
  | { ok: true; usage_id: string; duplicate: boolean; status: UsageStatus }
  | { ok: false; error: string };

/**
 * Ce qu'il faut pour relancer une generation sans la photo d'origine : la
 * reference deja chez Higgsfield, les reponses et le format. Range dans
 * photobooth_usage.mood (cle « submission »), donc sans migration.
 */
export type Submission = {
  imageUrl: string;
  answers: Answers;
  model: CampaignConfig["model"];
  aspect?: CampaignConfig["aspectRatio"];
};

/** Marqueur de la relance nsfw dans error_code : une seule relance par ligne. */
export const NSFW_RETRY = "NSFW_RETRY";

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
  // Optionnels : sans eux, un refus nsfw reste un echec net (ancien comportement).
  saveSubmission?(usageId: string, mood: MoodProfile & { submission: Submission }): Promise<void>;
  getRetryContext?(usageId: string): Promise<{ config: CampaignConfig; mood: MoodProfile; submission: Submission } | null>;
  audit?(campaignId: string, action: string, before: unknown, after: unknown): Promise<void>;
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
  style?: StyleId;
  locale?: string;
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
    mood = buildMoodProfile(input.answers, input.config, input.idempotencyKey, input.expression ?? null, input.shot ?? "solo", input.style ?? "mood");
    if (input.locale) mood.locale = input.locale;
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

  const brandRefs = await brandReferenceUrls(input.config, deps.provider);
  // Au-dela de 5 000 caracteres, Higgsfield refuse la requete (PROVIDER_REJECTED).
  const prompt = fitPrompt(buildPortraitPrompt(mood, input.config, { brandRefs: brandRefs.length }));
  // L'identifiant de la ligne sert de cle d'idempotence chez Higgsfield.
  const sub = await deps.provider.submit({
    model: input.config.model, prompt, imageUrl, extraImageUrls: brandRefs,
    config: input.aspect ? { ...input.config, aspectRatio: input.aspect } : input.config,
    idempotencyKey: usageId,
  });

  if (sub.kind === "accepted") {
    await deps.db.transition(usageId, "processing", { providerJobId: sub.jobId, statusUrl: sub.statusUrl });
    // Garde de quoi relancer apres un faux nsfw. Echec ici = pas de relance, rien de plus.
    await deps.db.saveSubmission?.(usageId, {
      ...mood, submission: { imageUrl, answers: input.answers, model: input.config.model, aspect: input.aspect },
    }).catch(() => undefined);
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
    case "nsfw":
      if (u.error_code !== NSFW_RETRY) {
        const retried = await retryAfterNsfw(u, deps);
        if (retried) return retried;
      }
      await deps.db.transition(usageId, "failed", { errorCode: "PROVIDER_NSFW" });
      return { status: "failed", error: "PROVIDER_NSFW" };
    case "failed":
      await deps.db.transition(usageId, "failed", { errorCode: "PROVIDER_FAILED" });
      return { status: "failed", error: "PROVIDER_FAILED" };
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

/**
 * Faux refus « nsfw » (vu sur le style « hero » avec un portrait habille) :
 * une seule relance, autre mise en scene (autre graine) et, pour une
 * transformation, formulation adoucie. La ligne de consommation reste la
 * meme et reste « processing » : aucune nouvelle reservation, donc aucune
 * place de quota en plus (Higgsfield ne facture pas le nsfw).
 * Renvoie null quand la relance est impossible : l'appelant echoue net.
 */
async function retryAfterNsfw(
  u: { id: string; campaign_id: string; status_url: string | null },
  deps: { db: PhotoboothDb; provider: ImageProvider },
): Promise<PollResult | null> {
  const ctx = await deps.db.getRetryContext?.(u.id).catch(() => null);
  if (!ctx) return null;
  let mood: MoodProfile;
  try {
    const m = ctx.mood;
    mood = buildMoodProfile(ctx.submission.answers, ctx.config, `${u.id}:nsfw-retry`, m.expressionReading, m.shot, m.style);
    if (m.locale) mood.locale = m.locale;
  } catch {
    return null;
  }
  const brandRefs = await brandReferenceUrls(ctx.config, deps.provider);
  const prompt = fitPrompt(buildPortraitPrompt(mood, ctx.config, { soften: true, brandRefs: brandRefs.length }));
  const config = ctx.submission.aspect ? { ...ctx.config, aspectRatio: ctx.submission.aspect } : ctx.config;
  // Cle propre a la relance : deux lectures simultanees (borne + reconciliation)
  // retombent sur la meme requete Higgsfield, jamais deux.
  const sub = await deps.provider.submit({
    model: ctx.submission.model, prompt, imageUrl: ctx.submission.imageUrl, config, extraImageUrls: brandRefs,
    idempotencyKey: `${u.id}-nsfw-retry`,
  });
  const audit = (outcome: string, extra: Record<string, unknown> = {}) =>
    deps.db.audit?.(u.campaign_id, "nsfw_retry",
      { usage_id: u.id, status_url: u.status_url, variant: ctx.mood.variant },
      { usage_id: u.id, outcome, variant: mood.variant, softened: true, ...extra },
    ).catch(() => undefined);

  if (sub.kind === "accepted") {
    await deps.db.transition(u.id, "processing", { providerJobId: sub.jobId, statusUrl: sub.statusUrl, errorCode: NSFW_RETRY });
    await deps.db.saveSubmission?.(u.id, { ...mood, submission: ctx.submission }).catch(() => undefined);
    await audit("resubmitted", { provider_job_id: sub.jobId });
    return { status: "processing" };
  }
  if (sub.kind === "rejected") {
    await audit("rejected", { code: sub.code });
    return null; // echec net PROVIDER_NSFW par l'appelant
  }
  // Issue inconnue : on garde la ligne, la prochaine lecture rejoue avec la meme cle.
  await audit("ambiguous", { code: sub.code });
  return { status: "processing" };
}
