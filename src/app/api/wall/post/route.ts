import sharp from "sharp";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { cleanText, flagText } from "@/lib/wall/moderation";
import { autoPos, parseStickers, parseStrokes, zNow } from "@/lib/wall/shapes";
import { availability, clientIp, isSession, json, loadWall, MEDIA_BUCKET, placedCount, rateLimited } from "@/lib/wall/server";
import { KINDS, type Kind } from "@/lib/wall/config";

// POST /api/wall/post (multipart) — un invite envoie un message au mur.
// Champs : slug, k, session, kind, author, body, color, strokes (JSON),
// stickers (JSON), photo (fichier). Publie aussitot si propre et en mode
// auto, sinon en attente de l'equipe.

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_PHOTO = 12 * 1024 * 1024;

export async function POST(req: Request) {
  if (rateLimited(`post:${clientIp(req)}`, 12)) return json({ ok: false, error: "RATE_LIMITED" }, 429);
  let form: FormData;
  try { form = await req.formData(); } catch { return json({ ok: false, error: "BAD_REQUEST" }, 400); }
  const str = (k: string) => { const v = form.get(k); return typeof v === "string" ? v : ""; };

  const loaded = await loadWall(str("slug"), { k: str("k") });
  if (!loaded.ok) return json({ ok: false, error: loaded.error }, loaded.status);
  const { campaign, config } = loaded.wall;
  const closed = availability(campaign);
  if (closed) return json({ ok: false, error: closed }, 403);

  const session = str("session");
  if (!isSession(session)) return json({ ok: false, error: "BAD_SESSION" }, 400);
  const kind = str("kind") as Kind;
  if (!KINDS.includes(kind) || !config.kinds[kind]) return json({ ok: false, error: "KIND_DISABLED" }, 400);

  const sb = getSupabaseAdmin();
  // Limites par invite : nombre de messages et delai entre deux envois.
  const { data: recent } = await sb.from("wall_posts").select("created_at")
    .eq("campaign_id", campaign.id).eq("session_id", session).order("created_at", { ascending: false }).limit(config.maxPostsPerSession);
  if ((recent?.length ?? 0) >= config.maxPostsPerSession) return json({ ok: false, error: "SESSION_LIMIT" }, 429);
  const last = recent?.[0]?.created_at;
  if (last && Date.now() - Date.parse(last) < config.cooldownSec * 1000) {
    return json({ ok: false, error: "COOLDOWN", wait: Math.ceil((config.cooldownSec * 1000 - (Date.now() - Date.parse(last))) / 1000) }, 429);
  }

  const author = cleanText(str("author"), 40);
  const body = cleanText(str("body"), config.maxChars);
  const color = config.palette.includes(str("color")) ? str("color") : config.palette[0];
  const allowed = new Set(config.stickers.map((s) => s.id));
  let stickers = config.stickersEnabled ? parseStickers(safeJson(str("stickers")), allowed, config.maxStickersPerPost) : [];

  let strokes = null;
  if (kind === "drawing" || kind === "signature") {
    strokes = parseStrokes(safeJson(str("strokes")));
    if (!strokes) return json({ ok: false, error: "EMPTY_DRAWING" }, 400);
  }
  if (kind === "text" && !body) return json({ ok: false, error: "EMPTY_TEXT" }, 400);
  if (kind === "sticker") {
    // Un sticker seul : exactement un, pose au centre de sa carte.
    stickers = stickers.slice(0, 1);
    if (stickers.length === 0) return json({ ok: false, error: "NO_STICKER" }, 400);
  }

  let photoPath: string | null = null;
  let photo: Buffer | null = null;
  if (kind === "photo") {
    const f = form.get("photo");
    if (!(f instanceof File) || f.size === 0) return json({ ok: false, error: "NO_PHOTO" }, 400);
    if (f.size > MAX_PHOTO) return json({ ok: false, error: "PHOTO_TOO_LARGE" }, 413);
    try {
      // Rotation selon l'EXIF puis reencodage : aucune metadonnee (GPS...) ne survit.
      photo = await sharp(Buffer.from(await f.arrayBuffer()), { limitInputPixels: 50_000_000 })
        .rotate().resize({ width: 1280, height: 1280, fit: "inside", withoutEnlargement: true })
        .webp({ quality: 82 }).toBuffer();
    } catch {
      return json({ ok: false, error: "PHOTO_UNREADABLE" }, 400);
    }
  }

  const flag = flagText(`${author}\n${body}`, config.blockedWords);
  const manual = config.moderation === "manual" || (kind === "photo" && config.photoModeration === "manual");
  const status = flag || manual ? "pending" : "approved";

  const id = crypto.randomUUID();
  if (photo) {
    photoPath = `${campaign.id}/${id}.webp`;
    const { error } = await sb.storage.from(MEDIA_BUCKET).upload(photoPath, photo, { contentType: "image/webp", upsert: false });
    if (error) return json({ ok: false, error: "STORAGE_FAILED" }, 500);
  }

  const pos = status === "approved" ? autoPos(await placedCount(campaign.id), zNow()) : null;
  const { error } = await sb.from("wall_posts").insert({
    id, campaign_id: campaign.id, session_id: session, kind, author, body, color,
    strokes, stickers, photo_path: photoPath, status, flag, pos,
    moderated_at: status === "approved" ? new Date().toISOString() : null,
  });
  if (error) {
    if (photoPath) await sb.storage.from(MEDIA_BUCKET).remove([photoPath]);
    return json({ ok: false, error: "SAVE_FAILED" }, 500);
  }
  return json({ ok: true, id, status });
}

function safeJson(s: string): unknown {
  if (!s || s.length > 200_000) return null;
  try { return JSON.parse(s); } catch { return null; }
}
