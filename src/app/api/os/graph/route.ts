import { NextResponse } from "next/server";
import { getSupabaseServer } from "@/lib/supabase/server";
import { currentUser, currentRoles } from "@/lib/auth";

// GET  /api/os/graph  → charge le knowledge graph de l'admin connecté
// PUT  /api/os/graph  → sauvegarde (verrou optimiste via updated_at)

async function gate() {
  const user = await currentUser();
  if (!user) return { error: NextResponse.json({ error: "unauthorized" }, { status: 401 }) };
  const roles = await currentRoles();
  if (!roles.includes("admin")) return { error: NextResponse.json({ error: "forbidden" }, { status: 403 }) };
  return { user };
}

export async function GET() {
  const g = await gate();
  if (g.error) return g.error;
  const supabase = await getSupabaseServer();
  const { data, error } = await supabase
    .from("os_graph")
    .select("data, updated_at")
    .eq("owner", g.user!.id)
    .maybeSingle();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(
    { data: data?.data ?? null, updated_at: data?.updated_at ?? null },
    { headers: { "Cache-Control": "no-store" } },
  );
}

export async function PUT(req: Request) {
  const g = await gate();
  if (g.error) return g.error;
  const supabase = await getSupabaseServer();

  let body: { data?: unknown; prevUpdated?: string | null; force?: boolean };
  try { body = await req.json(); } catch { return NextResponse.json({ error: "bad json" }, { status: 400 }); }
  const doc = body.data;
  if (!doc || typeof doc !== "object" || Array.isArray(doc)) {
    return NextResponse.json({ error: "invalid data" }, { status: 400 });
  }

  // verrou optimiste : si le doc a changé depuis le chargement, refuser (409) sauf force
  const { data: cur } = await supabase
    .from("os_graph")
    .select("updated_at")
    .eq("owner", g.user!.id)
    .maybeSingle();
  if (cur && !body.force && body.prevUpdated && cur.updated_at !== body.prevUpdated) {
    const { data: full } = await supabase
      .from("os_graph")
      .select("data, updated_at")
      .eq("owner", g.user!.id)
      .maybeSingle();
    return NextResponse.json(
      { conflict: true, data: full?.data ?? null, updated_at: full?.updated_at ?? null },
      { status: 409 },
    );
  }

  const { data: saved, error } = await supabase
    .from("os_graph")
    .upsert({ owner: g.user!.id, data: doc, updated_by: "OS web" }, { onConflict: "owner" })
    .select("updated_at")
    .maybeSingle();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true, updated_at: saved?.updated_at });
}
