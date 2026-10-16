import { NextResponse, type NextRequest } from "next/server";
import { currentRoles, currentUser } from "@/lib/auth";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { canSeeCampaign } from "@/lib/photobooth/client";
import { isGalleryKey, isHidden } from "@/lib/photobooth/gallery-access";
import { deleteStoredPortrait } from "@/lib/photobooth/server";

// POST /api/photobooth/portrait/<usageId>/delete  {g?: cle de galerie}
// Supprime un portrait d'une galerie : il est masque (drapeau dans mood),
// disparait des galeries, et ses liens (QR, telechargement) ne marchent plus.
// La ligne reste : l'image a ete facturee et compte dans le quota.
// Autorise : admin, membre de la campagne, ou porteur de la cle de galerie.

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const UUID = /^[0-9a-f-]{36}$/i;

export async function POST(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  if (!UUID.test(id)) return NextResponse.json({ ok: false }, { status: 404 });
  const body = (await req.json().catch(() => ({}))) as { g?: unknown };
  const sb = getSupabaseAdmin();
  const { data: u } = await sb.from("photobooth_usage").select("id, campaign_id, status, mood").eq("id", id).maybeSingle();
  if (!u || u.status !== "succeeded") return NextResponse.json({ ok: false }, { status: 404 });

  const user = await currentUser();
  let via: "admin" | "client" | "gallery_link" | null = null;
  if (user) {
    const roles = await currentRoles();
    if (roles.includes("admin")) via = "admin";
    else if (await canSeeCampaign(user.id, u.campaign_id, false)) via = "client";
  }
  if (!via && typeof body.g === "string") {
    const { data: c } = await sb.from("photobooth_campaigns").select("access_key").eq("id", u.campaign_id).maybeSingle();
    if (c && isGalleryKey(c.access_key, body.g)) via = "gallery_link";
  }
  if (!via) return NextResponse.json({ ok: false }, { status: 404 });
  if (isHidden(u.mood)) return NextResponse.json({ ok: true });

  const mood = { ...((u.mood as Record<string, unknown> | null) ?? {}), hidden: true, hidden_at: new Date().toISOString() };
  const { error } = await sb.from("photobooth_usage").update({ mood }).eq("id", id);
  if (error) return NextResponse.json({ ok: false }, { status: 500 });
  await deleteStoredPortrait(id);
  await sb.from("photobooth_audit").insert({
    campaign_id: u.campaign_id, actor: user?.id ?? null, action: "portrait_deleted",
    before: { usage_id: id }, after: { via },
  });
  return NextResponse.json({ ok: true });
}
