import { NextResponse } from "next/server";
import { getSupabaseServer } from "@/lib/supabase/server";
import { currentUser, currentRoles } from "@/lib/auth";

// GET /api/os/vj/status — remote fallback for the VJ Studio status card when
// the browser can't reach the local engine directly (http://127.0.0.1:5099
// only resolves on the machine running it - see CfLocalInterfaceCard's own
// "accessible uniquement depuis ce poste" caveat, same limitation here).
// Reads the heartbeat the local Python server pushes to Supabase every
// 10-60s (vj_studio.py: sync_status_to_supabase()).

export async function GET() {
  const user = await currentUser();
  if (!user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const roles = await currentRoles();
  if (!roles.includes("admin")) return NextResponse.json({ error: "forbidden" }, { status: 403 });

  const supabase = await getSupabaseServer();
  const { data, error } = await supabase
    .from("vj_status")
    .select("online, project_count, jobs_running, jobs_queued, active, updated_at")
    .eq("id", "singleton")
    .maybeSingle();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  if (!data) return NextResponse.json({ online: false, remote: true, never_synced: true });

  return NextResponse.json(
    { ...data, remote: true },
    { headers: { "Cache-Control": "no-store" } },
  );
}
