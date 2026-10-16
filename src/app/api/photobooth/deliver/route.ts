import { NextResponse } from "next/server";
import { z } from "zod";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { clientIp, loadCampaign, rateLimited } from "@/lib/photobooth/server";
import { parseContact } from "@/lib/photobooth/contact";
import { saveContact, watchAndDeliver } from "@/lib/photobooth/delivery";

// POST /api/photobooth/deliver — l'invite laisse son email (portrait envoye
// des qu'il est pret) et, si la campagne a l'option, ses coordonnees.
// Seule la session qui a lance la generation peut y attacher une adresse.

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const body = z.object({
  slug: z.string().min(2).max(64),
  k: z.string().min(8).max(128),
  session: z.string().min(8).max(80),
  usageId: z.string().regex(/^[0-9a-f-]{36}$/i),
  email: z.string().max(200).optional(),
  name: z.string().max(200).optional(),
  phone: z.string().max(60).optional(),
  answer: z.string().max(600).optional(),
  optIn: z.boolean().optional(),
});

const err = (error: string, status: number) => NextResponse.json({ ok: false, error }, { status });

export async function POST(req: Request) {
  if (rateLimited(`deliver:${clientIp(req)}`, 10)) return err("RATE_LIMITED", 429);
  const parsed = body.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return err("INVALID_REQUEST", 400);
  const b = parsed.data;

  const loaded = await loadCampaign(b.slug, b.k);
  if (!loaded.ok) return err("CAMPAIGN_NOT_FOUND", 404);
  const { data: u } = await getSupabaseAdmin()
    .from("photobooth_usage").select("campaign_id, session_id, status").eq("id", b.usageId).maybeSingle();
  if (!u || u.campaign_id !== loaded.campaign.id || u.session_id !== b.session) return err("NOT_FOUND", 404);
  if (u.status === "failed" || u.status === "cancelled") return err("PORTRAIT_FAILED", 409);

  const c = parseContact(b, loaded.config);
  if (!c.ok) return err(c.error, 400);
  await saveContact(b.usageId, { contact: c.contact, delivery: c.delivery });
  if (c.delivery) watchAndDeliver(b.usageId);
  return NextResponse.json({ ok: true, email: Boolean(c.delivery) });
}
