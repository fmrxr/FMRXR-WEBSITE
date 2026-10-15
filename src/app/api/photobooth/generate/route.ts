import { NextResponse } from "next/server";
import { z } from "zod";
import { sniffImage } from "@/lib/photobooth/image";
import { campaignAvailability, clientIp, createSupabaseDb, getProvider, loadCampaign, rateLimited } from "@/lib/photobooth/server";
import { startGeneration } from "@/lib/photobooth/service";
import { EXPRESSIONS, type ExpressionId } from "@/lib/photobooth/expression";

// POST /api/photobooth/generate — multipart : slug, k, session, idem, answers (JSON), image.
// Ordre : validation -> reservation atomique du quota -> seulement ensuite Higgsfield.

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const fields = z.object({
  slug: z.string().min(2).max(64),
  k: z.string().min(8).max(128),
  session: z.string().min(8).max(80),
  idem: z.string().min(8).max(80),
  answers: z.string().max(300),
});

const err = (error: string, status: number) => NextResponse.json({ ok: false, error }, { status });

export async function POST(req: Request) {
  if (rateLimited(clientIp(req))) return err("RATE_LIMITED", 429);

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return err("INVALID_REQUEST", 400);
  }
  const parsed = fields.safeParse(Object.fromEntries(
    ["slug", "k", "session", "idem", "answers"].map((n) => [n, form.get(n)]),
  ));
  if (!parsed.success) return err("INVALID_REQUEST", 400);
  const { slug, k, session, idem } = parsed.data;

  let answers: [string, string, string];
  try {
    const a = JSON.parse(parsed.data.answers);
    if (!Array.isArray(a) || a.length !== 3 || !a.every((x) => typeof x === "string")) throw 0;
    answers = a as [string, string, string];
  } catch {
    return err("INVALID_ANSWERS", 400);
  }

  const loaded = await loadCampaign(slug, k);
  if (!loaded.ok) return err(loaded.error === "NOT_FOUND" ? "CAMPAIGN_NOT_FOUND" : "CAMPAIGN_MISCONFIGURED", 404);
  const blocked = campaignAvailability(loaded.campaign);
  if (blocked) return err(blocked, 403);

  const file = form.get("image");
  if (!(file instanceof Blob)) return err("INVALID_UPLOAD", 400);
  if (file.size > loaded.config.maxUploadBytes) return err("UPLOAD_TOO_LARGE", 413);
  const bytes = new Uint8Array(await file.arrayBuffer());
  const type = sniffImage(bytes);
  if (!type) return err("INVALID_UPLOAD", 400);

  // Lecture d'expression faite sur l'appareil : une categorie connue, sinon rien.
  const exprRaw = form.get("expr");
  const expression = typeof exprRaw === "string" && (EXPRESSIONS as readonly string[]).includes(exprRaw)
    ? (exprRaw as ExpressionId) : null;

  const provider = getProvider();
  if (!provider) return err("PROVIDER_NOT_CONFIGURED", 503);

  const r = await startGeneration(
    { campaignId: loaded.campaign.id, config: loaded.config, answers, sessionId: session, idempotencyKey: idem, image: { bytes, type }, expression },
    { db: createSupabaseDb(), provider },
  );
  if (!r.ok) {
    const status = /QUOTA|LIMIT|CAMPAIGN/.test(r.error) ? 409 : r.error.startsWith("INVALID") ? 400 : 502;
    return NextResponse.json({ ok: false, error: r.error, usageId: r.usageId }, { status });
  }
  return NextResponse.json({ ok: true, usageId: r.usageId, status: r.status });
}
