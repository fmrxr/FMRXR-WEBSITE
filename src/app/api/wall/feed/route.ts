import type { NextRequest } from "next/server";
import { publicConfig } from "@/lib/wall/config";
import { availability, isSession, json, loadWall, myPosts, wallFeed } from "@/lib/wall/server";

// GET /api/wall/feed?slug=&k=|s=|m=&session= — le mur tel qu'il est maintenant.
// Telephones et ecran interrogent cette route toutes les 2 s.

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams;
  const loaded = await loadWall(q.get("slug") ?? "", { k: q.get("k"), s: q.get("s"), m: q.get("m") });
  if (!loaded.ok) return json({ ok: false, error: loaded.error }, loaded.status);
  const { campaign, config, access } = loaded.wall;
  const session = isSession(q.get("session")) ? q.get("session")! : null;
  const [posts, mine] = await Promise.all([
    wallFeed(campaign.id, config.maxOnWall, session),
    session && access === "guest" ? myPosts(campaign.id, session) : Promise.resolve([]),
  ]);
  return json({ ok: true, access, closed: availability(campaign), config: publicConfig(config), posts, mine });
}
