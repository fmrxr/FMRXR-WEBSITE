import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { checkAgentToken } from "@/lib/os/agent-auth";

// GET /api/os/agent/graph — lecture du knowledge graph pour les agents (token Bearer).
// Service-role : contourne RLS. Opère sur l'unique ligne os_graph (OS solo admin) ou OS_OWNER_ID.

export async function GET(req: Request) {
  if (!checkAgentToken(req)) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const sb = getSupabaseAdmin();
  const owner = process.env.OS_OWNER_ID;
  let q = sb.from("os_graph").select("owner, data, updated_at");
  if (owner) q = q.eq("owner", owner);
  const { data, error } = await q.limit(1).maybeSingle();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  if (!data) return NextResponse.json({ error: "os_graph vide" }, { status: 404 });

  return NextResponse.json(
    { data: data.data, updated_at: data.updated_at, owner: data.owner },
    { headers: { "Cache-Control": "no-store" } },
  );
}
