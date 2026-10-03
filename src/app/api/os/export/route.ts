import { NextResponse } from "next/server";
import { getSupabaseServer } from "@/lib/supabase/server";
import { currentUser, currentRoles } from "@/lib/auth";
import fs from "node:fs";
import path from "node:path";

// POST /api/os/export — pont Supabase → fichier local.
// Tire os_graph (source de vérité) et réécrit knowledge-graph.json pour que les
// automatisations Cowork (sync os, briefing matinal, agent BDM, sync Calendar) qui
// lisent le fichier local restent alimentées en données fraîches.
//
// ⚠️ Sens unique : Supabase gagne. Le fichier local devient un MIROIR EN LECTURE.
// Les écritures se font dans l'OS natif (Supabase), pas dans le fichier.
// Chemin surchargeable via env OS_KG_PATH.
//
// Le miroir n'existe que sur la machine de Haïfa. Sur l'app déployée (Hostinger,
// Linux) le dossier cible est absent : la route répond alors `skipped` en 200 au
// lieu d'un 500. `persist` l'appelle en fire-and-forget, donc un 500 ici passait
// totalement inaperçu et le miroir est resté figé du 23/09 au 02/10 sans le moindre
// signal. Un vrai échec d'écriture (droits, disque plein) reste un 500 : on ne
// confond pas « pas la bonne machine » et « écriture cassée ».
// Pour rafraîchir le miroir sans lancer l'app : `python scripts/refresh_os_mirror.py`.

const KG_PATH = process.env.OS_KG_PATH || "E:/FMRXR/CLAUDE PRO/FMRXR_OS/data/knowledge-graph.json";

export async function POST() {
  const user = await currentUser();
  if (!user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const roles = await currentRoles();
  if (!roles.includes("admin")) return NextResponse.json({ error: "forbidden" }, { status: 403 });

  const supabase = await getSupabaseServer();
  const { data, error } = await supabase
    .from("os_graph")
    .select("data, updated_at")
    .eq("owner", user.id)
    .maybeSingle();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  if (!data?.data) return NextResponse.json({ error: "os_graph vide pour cet utilisateur" }, { status: 404 });

  const graph = data.data as Record<string, unknown>;
  if (!graph.projects) return NextResponse.json({ error: "structure invalide (projects manquant)" }, { status: 400 });

  // Pas de dossier cible = cette instance n'héberge pas le miroir (app déployée).
  // Rien à exporter, et ce n'est pas une erreur.
  if (!fs.existsSync(path.dirname(KG_PATH))) {
    return NextResponse.json({
      ok: true,
      skipped: true,
      reason: `dossier absent sur cette instance (${path.dirname(KG_PATH)}) — miroir local non géré ici`,
      supabase_updated_at: data.updated_at,
    });
  }

  try {
    // sauvegarde de sécurité de l'ancien fichier avant écrasement
    if (fs.existsSync(KG_PATH)) {
      fs.copyFileSync(KG_PATH, KG_PATH.replace(/\.json$/, `-preExport-${Date.now()}.json`));
    }
    fs.writeFileSync(KG_PATH, JSON.stringify(graph, null, 1), "utf8");
  } catch (e) {
    return NextResponse.json({ error: "écriture impossible: " + (e as Error).message }, { status: 500 });
  }

  return NextResponse.json({
    ok: true,
    skipped: false,
    exported_to: KG_PATH,
    supabase_updated_at: data.updated_at,
    counts: {
      projects: (graph.projects as unknown[])?.length ?? 0,
      finance: (graph.finance as unknown[])?.length ?? 0,
      tasks: (graph.tasks as unknown[])?.length ?? 0,
    },
  });
}
