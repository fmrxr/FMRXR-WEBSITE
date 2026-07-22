import { NextResponse } from "next/server";
import { getSupabaseServer } from "@/lib/supabase/server";
import { currentUser, currentRoles } from "@/lib/auth";
import fs from "node:fs";

// POST /api/os/import — import unique du knowledge-graph.json local vers Supabase.
// À lancer une seule fois (connectée en admin) pour amorcer os_graph.
// Chemin surchargeable via env OS_KG_PATH.

const KG_PATH = process.env.OS_KG_PATH || "E:/FMRXR/CLAUDE PRO/FMRXR_OS/data/knowledge-graph.json";

export async function POST() {
  const user = await currentUser();
  if (!user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const roles = await currentRoles();
  if (!roles.includes("admin")) return NextResponse.json({ error: "forbidden" }, { status: 403 });

  let json: unknown;
  try {
    json = JSON.parse(fs.readFileSync(KG_PATH, "utf8"));
  } catch (e) {
    return NextResponse.json({ error: "lecture impossible: " + KG_PATH + " — " + (e as Error).message }, { status: 500 });
  }
  if (!json || typeof json !== "object" || !(json as Record<string, unknown>).projects) {
    return NextResponse.json({ error: "structure invalide (projects manquant)" }, { status: 400 });
  }

  const supabase = await getSupabaseServer();
  const { error } = await supabase
    .from("os_graph")
    .upsert({ owner: user.id, data: json, updated_by: "import initial" }, { onConflict: "owner" });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const d = json as Record<string, unknown>;
  return NextResponse.json({
    ok: true,
    imported: {
      projects: (d.projects as unknown[])?.length ?? 0,
      finance: (d.finance as unknown[])?.length ?? 0,
      tasks: (d.tasks as unknown[])?.length ?? 0,
    },
  });
}
