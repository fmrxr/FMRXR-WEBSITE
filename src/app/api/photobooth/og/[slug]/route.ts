import { NextResponse, type NextRequest } from "next/server";
import { loadCampaign } from "@/lib/photobooth/server";
import { clientLogo } from "@/lib/photobooth/branding";
import { renderLinkCard } from "@/lib/photobooth/layouts";

// GET /api/photobooth/og/<slug>?k=<cle> — image d'apercu du lien d'une campagne.
// Meme regle que la borne : sans la bonne cle, la campagne n'existe pas.

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest, ctx: { params: Promise<{ slug: string }> }) {
  const { slug } = await ctx.params;
  const loaded = await loadCampaign(slug, req.nextUrl.searchParams.get("k"));
  if (!loaded.ok) return new NextResponse("Not found", { status: 404 });
  const c = loaded.config;
  const loc = c.defaultLocale;
  // Couleurs des ambiances proposees : deux par reponse, toutes questions confondues.
  const palette = [...new Set(c.questions.flatMap((q) => q.options.flatMap((o) => (o.palette ?? []).slice(0, 2))))].slice(0, 4);
  const img = await renderLinkCard({
    title: c.title[loc],
    subtitle: c.intro[loc],
    palette,
    client: c.clientLogoUrl ? await clientLogo(c.clientLogoUrl) : null,
  });
  return new NextResponse(new Uint8Array(img), {
    headers: { "Content-Type": "image/jpeg", "Cache-Control": "public, max-age=3600", "X-Content-Type-Options": "nosniff" },
  });
}
