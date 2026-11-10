import type { NextRequest } from "next/server";
import { randomUUID } from "node:crypto";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { json, loadWall } from "@/lib/wall/server";

// Le bucket « wall-media » est prive : il garde les photos des invites,
// servies une par une par /api/wall/asset. Un logo et des stickers sont
// publics par nature, affiches sur l'ecran geant et sur chaque telephone,
// donc ils vont dans « media », le bucket public du site.
const BUCKET = "media";

// Depot d'un logo ou d'un sticker par l'equipe du client.
// POST multipart { slug, m, file } -> { ok, url }
//
// Trois garde-fous, parce que le fichier arrive d'un invite du client :
//  - types fixes, et pas de SVG : un SVG est un document, il peut porter
//    du script, alors qu'un sticker n'a besoin que d'etre une image ;
//  - 1,5 Mo au plus, le sticker s'affiche a quelques centaines de pixels ;
//  - le nom est tire au sort cote serveur et range sous l'identifiant de
//    la campagne : celui qui depose ne choisit jamais le chemin.

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const TYPES: Record<string, string> = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/webp": "webp",
};
const MAX = 1_500_000;

export async function POST(req: NextRequest) {
  const form = await req.formData().catch(() => null);
  if (!form) return json({ ok: false, error: "BAD_REQUEST" }, 400);

  const slug = String(form.get("slug") ?? "");
  const m = String(form.get("m") ?? "");
  const loaded = await loadWall(slug, { m });
  if (!loaded.ok || loaded.wall.access !== "mod") return json({ ok: false }, 404);

  const file = form.get("file");
  if (!(file instanceof File)) return json({ ok: false, error: "NO_FILE" }, 400);
  const ext = TYPES[file.type];
  if (!ext) return json({ ok: false, error: "TYPE" }, 415);
  if (file.size > MAX) return json({ ok: false, error: "TOO_LARGE" }, 413);

  const path = `wall-brand/${loaded.wall.campaign.id}/${randomUUID()}.${ext}`;
  const sb = getSupabaseAdmin();
  const { error } = await sb.storage.from(BUCKET)
    .upload(path, Buffer.from(await file.arrayBuffer()), { contentType: file.type, upsert: false });
  if (error) return json({ ok: false, error: "UPLOAD_FAILED" }, 500);

  const { data } = sb.storage.from(BUCKET).getPublicUrl(path);
  return json({ ok: true, url: data.publicUrl });
}
