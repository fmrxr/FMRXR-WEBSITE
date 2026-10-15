import type { CampaignConfig, ModelKey } from "./config";

// Adaptateur Higgsfield. Endpoints et schemas verifies sur docs.higgsfield.ai
// le 15/10/2026 :
//   upload  POST /files/generate-upload-url {content_type} puis PUT upload_url
//   flare   POST /marketing-studio/image/flare     (1k|2k|4k, quality low..max, 0-16 refs)
//   sunburst POST /marketing-studio/image/sunburst (meme schema)
//   grok    POST /xai/grok-imagine-image-2.0       (1k|2k, quality low|medium, 0-10 refs)
//   qwen    POST /alibaba/qwen-image-3/edit        (1k|2k, 1-3 refs, negative_prompt)
//   statut  GET status_url -> queued | in_progress | completed | failed | nsfw | canceled
// Higgsfield ne facture pas failed / nsfw / canceled.

export const HF_BASE = "https://api.higgsfield.ai";

export type ProviderStatus = "queued" | "processing" | "completed" | "failed" | "nsfw" | "canceled";

export type SubmitResult =
  | { kind: "accepted"; jobId: string; statusUrl: string }
  // Refus net avant acceptation : rien n'a ete lance, donc rien de facture.
  | { kind: "rejected"; code: string; httpStatus: number }
  // Issue inconnue (reseau, 5xx apres plusieurs essais) : une image a peut-etre ete lancee.
  | { kind: "ambiguous"; code: string };

export type StatusResult = {
  status: ProviderStatus;
  imageUrl?: string;
  error?: string;
} | { status: "error"; error: string };

export interface ImageProvider {
  uploadReference(bytes: Uint8Array, contentType: string): Promise<string>;
  submit(input: {
    model: ModelKey; prompt: string; imageUrl: string; config: CampaignConfig; idempotencyKey: string;
    /** Images de reference en plus de la photo (logo officiel de la marque...). */
    extraImageUrls?: string[];
  }): Promise<SubmitResult>;
  status(statusUrl: string): Promise<StatusResult>;
}

const ENDPOINTS: Record<ModelKey, string> = {
  flare: "/marketing-studio/image/flare",
  sunburst: "/marketing-studio/image/sunburst",
  grok: "/xai/grok-imagine-image-2.0",
  qwen: "/alibaba/qwen-image-3/edit",
};

// Nombre maximal d'images de reference par modele (docs Higgsfield, 15/10/2026).
const MAX_REFS: Record<ModelKey, number> = { flare: 16, sunburst: 16, grok: 10, qwen: 3 };

/** Corps de requete propre a chaque modele (les schemas refusent les champs en trop). */
export function buildRequestBody(model: ModelKey, prompt: string, imageUrl: string, c: CampaignConfig, extra: string[] = []) {
  const cap2k = c.resolution === "4k" ? "2k" : c.resolution;
  // La photo du visiteur reste toujours l'image 1.
  const image_urls = [imageUrl, ...extra].slice(0, MAX_REFS[model]);
  switch (model) {
    case "flare":
    case "sunburst":
      return {
        prompt, image_urls, resolution: c.resolution,
        aspect_ratio: c.aspectRatio, quality: c.quality, enhance_prompt: false,
      };
    case "grok":
      return {
        prompt, image_urls, resolution: cap2k, aspect_ratio: c.aspectRatio,
        quality: c.quality === "low" ? "low" : "medium",
      };
    case "qwen":
      return {
        prompt, image_urls, resolution: cap2k, aspect_ratio: c.aspectRatio,
        negative_prompt: c.negative || undefined,
      };
  }
}

export function rejectionCode(httpStatus: number, body: string): string {
  if (httpStatus === 401) return "PROVIDER_AUTH";
  if (httpStatus === 403) return "PROVIDER_NO_CREDITS";
  if (httpStatus === 400 && /concurrent/i.test(body)) return "PROVIDER_BUSY";
  if (httpStatus === 423 || httpStatus === 503) return "PROVIDER_UNAVAILABLE";
  return "PROVIDER_REJECTED";
}

/** status_url vient de la base : on n'appelle jamais autre chose que l'API Higgsfield. */
export function isTrustedStatusUrl(u: string) {
  try {
    const url = new URL(u);
    return url.protocol === "https:" && url.hostname === "api.higgsfield.ai";
  } catch {
    return false;
  }
}

type Fetch = typeof fetch;

export function createHiggsfieldProvider(opts: {
  keyId: string;
  secret: string;
  fetchImpl?: Fetch;
  timeoutMs?: number;
  retries?: number;
}): ImageProvider {
  const f = opts.fetchImpl ?? fetch;
  const auth = `Key ${opts.keyId}:${opts.secret}`;
  const timeoutMs = opts.timeoutMs ?? 30_000;
  const retries = opts.retries ?? 3;

  const call = (url: string, init: RequestInit) =>
    f(url, { ...init, signal: AbortSignal.timeout(timeoutMs) });

  return {
    async uploadReference(bytes, contentType) {
      const r = await call(`${HF_BASE}/files/generate-upload-url`, {
        method: "POST",
        headers: { Authorization: auth, "Content-Type": "application/json" },
        body: JSON.stringify({ content_type: contentType }),
      });
      if (!r.ok) throw new Error(`UPLOAD_URL_${r.status}`);
      const j = (await r.json()) as { public_url: string; upload_url: string; upload_headers?: Record<string, string> };
      // Les identifiants Higgsfield ne partent jamais vers l'URL de stockage presignee.
      const put = await call(j.upload_url, {
        method: "PUT",
        headers: j.upload_headers ?? { "Content-Type": contentType },
        body: Buffer.from(bytes),
      });
      if (!put.ok) throw new Error(`UPLOAD_PUT_${put.status}`);
      return j.public_url;
    },

    async submit({ model, prompt, imageUrl, config, idempotencyKey, extraImageUrls }) {
      const body = JSON.stringify(buildRequestBody(model, prompt, imageUrl, config, extraImageUrls));
      // Meme Idempotency-Key a chaque essai : Higgsfield renvoie la meme requete
      // au lieu d'en lancer une deuxieme (docs concepts/errors).
      for (let attempt = 0; attempt <= retries; attempt++) {
        try {
          const r = await call(`${HF_BASE}${ENDPOINTS[model]}`, {
            method: "POST",
            headers: { Authorization: auth, "Content-Type": "application/json", "Idempotency-Key": idempotencyKey },
            body,
          });
          if (r.ok) {
            const j = (await r.json()) as { request_id: string; status_url: string };
            return { kind: "accepted", jobId: j.request_id, statusUrl: j.status_url };
          }
          if (r.status < 500) {
            return { kind: "rejected", code: rejectionCode(r.status, await r.text()), httpStatus: r.status };
          }
        } catch {
          // reseau ou timeout : issue inconnue, on reessaie avec la meme cle
        }
        if (attempt < retries) await new Promise((res) => setTimeout(res, 600 * 2 ** attempt + Math.random() * 300));
      }
      return { kind: "ambiguous", code: "PROVIDER_TIMEOUT" };
    },

    async status(statusUrl) {
      if (!isTrustedStatusUrl(statusUrl)) return { status: "error", error: "UNTRUSTED_STATUS_URL" };
      try {
        const r = await call(statusUrl, { headers: { Authorization: auth } });
        if (!r.ok) return { status: "error", error: `STATUS_${r.status}` };
        const j = (await r.json()) as { status: string; images?: { url: string }[]; error?: string };
        const s = j.status === "in_progress" ? "processing" : j.status;
        if (!["queued", "processing", "completed", "failed", "nsfw", "canceled"].includes(s)) {
          return { status: "error", error: `UNKNOWN_STATUS_${j.status}` };
        }
        return { status: s as ProviderStatus, imageUrl: j.images?.[0]?.url, error: j.error };
      } catch {
        return { status: "error", error: "STATUS_NETWORK" };
      }
    },
  };
}
