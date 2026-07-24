import { NextRequest, NextResponse } from "next/server";
import { currentRoles } from "@/lib/auth";
import fs from "node:fs";
import path from "node:path";

// GET /api/os/asset-file?path=... — sert un fichier local du workspace pour aperçu dans Studio &
// Assets (image/pdf/html/md inline). Ne fonctionne que si le serveur Next tourne sur le poste où
// vivent ces fichiers (usage local, comme /os/app et /api/os/import). Chemin racine surchargeable
// via env OS_ASSETS_ROOT.

const OS_ASSETS_ROOT = process.env.OS_ASSETS_ROOT || "E:/FMRXR/CLAUDE PRO";

const MIME: Record<string, string> = {
  png: "image/png",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  gif: "image/gif",
  webp: "image/webp",
  svg: "image/svg+xml",
  pdf: "application/pdf",
  html: "text/html; charset=utf-8",
  htm: "text/html; charset=utf-8",
  md: "text/plain; charset=utf-8",
  txt: "text/plain; charset=utf-8",
  json: "application/json; charset=utf-8",
};

export async function GET(req: NextRequest) {
  const roles = await currentRoles();
  if (!roles.includes("admin")) return NextResponse.json({ error: "forbidden" }, { status: 403 });

  const rel = req.nextUrl.searchParams.get("path");
  if (!rel) return NextResponse.json({ error: "paramètre path manquant" }, { status: 400 });

  const root = path.resolve(OS_ASSETS_ROOT);
  const resolved = path.resolve(root, rel);
  if (resolved !== root && !resolved.startsWith(root + path.sep)) {
    return NextResponse.json({ error: "chemin invalide" }, { status: 400 });
  }

  let buf: Buffer;
  try {
    buf = fs.readFileSync(resolved);
  } catch (e) {
    return NextResponse.json({ error: "fichier introuvable : " + (e as Error).message }, { status: 404 });
  }

  const ext = (resolved.split(".").pop() || "").toLowerCase();
  return new NextResponse(new Uint8Array(buf), {
    headers: {
      "Content-Type": MIME[ext] || "application/octet-stream",
      "Content-Disposition": `inline; filename="${path.basename(resolved).replace(/"/g, "")}"`,
      "Cache-Control": "private, max-age=60",
    },
  });
}
