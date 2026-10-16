import type { NextRequest } from "next/server";
import { publicConfig } from "@/lib/wall/config";
import { availability, clientIp, isSession, json, loadWall, myPosts, rateLimited, wallFeed, wallVersion } from "@/lib/wall/server";

// GET /api/wall/feed?slug=&k=|s=|m=&session=&since=<version>
// Le mur tel qu'il est maintenant. Telephones et ecran interrogent cette
// route toutes les 2 s : si rien n'a change depuis `since`, la reponse est
// minuscule et ne coute qu'une lecture d'une ligne.

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  if (rateLimited(`feed:${clientIp(req)}`, 120)) return json({ ok: false, error: "RATE_LIMITED" }, 429);
  const q = req.nextUrl.searchParams;
  const loaded = await loadWall(q.get("slug") ?? "", { k: q.get("k"), s: q.get("s"), m: q.get("m") });
  if (!loaded.ok) return json({ ok: false, error: loaded.error }, loaded.status);
  const { campaign, config, access } = loaded.wall;
  // La campagne compte aussi : changer le format ou fermer le mur doit se voir.
  const version = `${await wallVersion(campaign.id)}|${(campaign as { updated_at?: string }).updated_at ?? ""}`;
  if (q.get("since") === version) return json({ ok: true, same: true, version });
  const session = isSession(q.get("session")) ? q.get("session")! : null;
  const [posts, mine] = await Promise.all([
    wallFeed(campaign.id, config.maxOnWall, session),
    session && access === "guest" ? myPosts(campaign.id, session) : Promise.resolve([]),
  ]);
  return json({ ok: true, version, access, closed: availability(campaign), config: publicConfig(config), posts, mine });
}
