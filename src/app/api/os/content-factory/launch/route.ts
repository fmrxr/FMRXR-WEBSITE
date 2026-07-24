import { NextResponse } from "next/server";
import { currentRoles } from "@/lib/auth";
import { spawn } from "node:child_process";
import fs from "node:fs";

// POST /api/os/content-factory/launch — lance le pipeline vidéo local (CONTENT_FACTORY/launch.bat)
// dans sa propre fenêtre de console, détachée du serveur Next. Chemin fixe côté serveur (jamais
// fourni par le client) ; ne fonctionne que si l'app tourne sur le poste où vit ce script. Chemin
// surchargeable via env CF_LAUNCH_BAT_PATH.

const CF_LAUNCH_BAT_PATH = process.env.CF_LAUNCH_BAT_PATH || "E:/FMRXR/CLAUDE PRO/CONTENT_FACTORY/launch.bat";

export async function POST() {
  const roles = await currentRoles();
  if (!roles.includes("admin")) return NextResponse.json({ error: "forbidden" }, { status: 403 });

  if (!fs.existsSync(CF_LAUNCH_BAT_PATH)) {
    return NextResponse.json({ error: "launch.bat introuvable : " + CF_LAUNCH_BAT_PATH }, { status: 404 });
  }

  try {
    // `cmd /c start "" "<bat>"` ouvre une nouvelle fenêtre de console (comme un double-clic dans
    // l'explorateur) ; le titre "" vide évite que Windows interprète le chemin cité comme titre.
    const child = spawn("cmd.exe", ["/c", "start", "", CF_LAUNCH_BAT_PATH], { detached: true, stdio: "ignore" });
    child.unref();
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
}
