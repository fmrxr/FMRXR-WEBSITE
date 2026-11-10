import type { NextRequest } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { json, loadWall } from "@/lib/wall/server";

// Archive de la soiree, pour l'equipe du client.
// GET ?slug=&m=&format=csv|json -> le tableau des messages valides
//
// C'est la matiere brute : un message par ligne, avec son auteur, son
// heure, ses mentions j'aime et ses commentaires. Les trois autres
// livrables (reel, fresque, kit emailing) se fabriquent a partir de ces
// memes donnees et ne sont pas encore assembles par la plateforme.

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Une cellule CSV sure : guillemets doubles, et jamais interpretee comme formule. */
function cell(v: unknown): string {
  const s = v === null || v === undefined ? "" : String(v);
  // Excel execute une cellule qui commence par = + - @ : on la desamorce.
  const safe = /^[=+\-@\t\r]/.test(s) ? `'${s}` : s;
  return `"${safe.replace(/"/g, '""')}"`;
}

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams;
  const slug = q.get("slug") ?? "";
  const loaded = await loadWall(slug, { m: q.get("m") });
  if (!loaded.ok || loaded.wall.access !== "mod") return json({ ok: false }, 404);

  const sb = getSupabaseAdmin();
  const id = loaded.wall.campaign.id;
  const [{ data: posts }, { data: comments }] = await Promise.all([
    sb.from("wall_posts")
      .select("id, kind, author, body, color, likes, pinned, created_at, moderated_by")
      .eq("campaign_id", id).eq("status", "approved").order("created_at", { ascending: true }),
    sb.from("wall_comments")
      .select("id, post_id, author, body, created_at")
      .eq("campaign_id", id).eq("status", "approved").order("created_at", { ascending: true }),
  ]);

  const rows = posts ?? [];
  const byPost = new Map<string, { author: string; body: string }[]>();
  for (const c of comments ?? []) {
    const list = byPost.get(c.post_id) ?? [];
    list.push({ author: c.author, body: c.body });
    byPost.set(c.post_id, list);
  }

  const name = `${slug}-messages-${new Date().toISOString().slice(0, 10)}`;

  if (q.get("format") === "json") {
    const out = rows.map((p) => ({ ...p, comments: byPost.get(p.id) ?? [] }));
    return new Response(JSON.stringify({ campaign: loaded.wall.campaign.name, posts: out }, null, 2), {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Content-Disposition": `attachment; filename="${name}.json"`,
      },
    });
  }

  const head = ["heure", "type", "auteur", "message", "j_aime", "epingle", "commentaires", "modere_par"];
  const body = rows.map((p) => [
    p.created_at, p.kind, p.author, p.body, p.likes, p.pinned ? "oui" : "",
    (byPost.get(p.id) ?? []).map((c) => `${c.author} : ${c.body}`).join(" | "),
    p.moderated_by ?? "",
  ].map(cell).join(","));

  // BOM : sans lui Excel lit l'UTF-8 de travers, et les accents et l'arabe
  // arrivent en charabia chez le client.
  const csv = "﻿" + [head.map(cell).join(","), ...body].join("\r\n");
  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${name}.csv"`,
    },
  });
}
