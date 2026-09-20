import { NextResponse } from "next/server";
import { currentRoles } from "@/lib/auth";
import { spawn } from "node:child_process";
import fs from "node:fs";

// POST /api/os/khoj/launch — lance le serveur Khoj local (khoj/start-khoj.bat) dans sa propre
// fenêtre de console, détachée du serveur Next. Même pattern que content-factory/launch. Chemin
// fixe côté serveur (jamais fourni par le client) ; ne fonctionne que si l'app tourne sur le poste
// où vit ce script (npm run dev sur la machine de Haïfa) — sur un déploiement distant (Netlify),
// ce chemin n'existe pas et la requête échoue proprement en 404. Chemin surchargeable via env
// KHOJ_LAUNCH_BAT_PATH.

const KHOJ_LAUNCH_BAT_PATH = process.env.KHOJ_LAUNCH_BAT_PATH || "E:/FMRXR/CLAUDE PRO/khoj/start-khoj.bat";

export async function POST() {
  const roles = await currentRoles();
  if (!roles.includes("admin")) return NextResponse.json({ error: "forbidden" }, { status: 403 });

  if (!fs.existsSync(KHOJ_LAUNCH_BAT_PATH)) {
    return NextResponse.json({ error: "start-khoj.bat introuvable : " + KHOJ_LAUNCH_BAT_PATH }, { status: 404 });
  }

  try {
    const child = spawn("cmd.exe", ["/c", "start", "Khoj", KHOJ_LAUNCH_BAT_PATH], { detached: true, stdio: "ignore" });
    child.unref();
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
}
