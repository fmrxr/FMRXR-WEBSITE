import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { checkAgentToken } from "@/lib/os/agent-auth";

// POST /api/os/agent/propose — les agents PROPOSENT (ils n'écrivent pas le graphe directement).
// Les propositions atterrissent dans data.inbox[] avec status "pending" ; Haïfa les approuve
// dans l'OS natif (principe ABOS : les agents proposent, l'humain applique).
//
// Body: { source?: string, items: [{ kind, payload?, note? }] }
//   kind ex. "bdm.opportunity" | "task" | "deadline" | "relance" | "note"

type Item = { kind?: string; payload?: unknown; note?: string };

export async function POST(req: Request) {
  if (!checkAgentToken(req)) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  let body: { source?: string; items?: Item[] };
  try { body = await req.json(); } catch { return NextResponse.json({ error: "bad json" }, { status: 400 }); }
  const items = Array.isArray(body.items) ? body.items : null;
  if (!items || !items.length) return NextResponse.json({ error: "items[] requis" }, { status: 400 });

  const sb = getSupabaseAdmin();
  const owner = process.env.OS_OWNER_ID;
  let q = sb.from("os_graph").select("owner, data");
  if (owner) q = q.eq("owner", owner);
  const { data: row, error } = await q.limit(1).maybeSingle();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  if (!row) return NextResponse.json({ error: "os_graph vide" }, { status: 404 });

  const graph = (row.data || {}) as Record<string, unknown>;
  const inbox = Array.isArray(graph.inbox) ? (graph.inbox as unknown[]) : [];
  const now = new Date().toISOString();
  const rid = () => "inbox-" + Math.random().toString(36).slice(2, 10);
  const added = items.map((it) => ({
    id: rid(), ts: now, status: "pending", source: body.source || "agent",
    kind: it.kind || "note", payload: it.payload ?? null, note: it.note || "",
  }));
  graph.inbox = [...inbox, ...added];

  const { error: upErr } = await sb
    .from("os_graph")
    .update({ data: graph, updated_by: "agent:" + (body.source || "?") })
    .eq("owner", row.owner);
  if (upErr) return NextResponse.json({ error: upErr.message }, { status: 500 });

  const pending = (graph.inbox as { status: string }[]).filter((x) => x.status === "pending").length;
  return NextResponse.json({ ok: true, added: added.length, pending });
}
