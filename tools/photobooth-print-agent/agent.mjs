#!/usr/bin/env node
// Agent d'impression local de la borne photobooth FMRXR.
//
// Une page web ne peut ni lister les imprimantes ni imprimer sans boite de
// dialogue. Cet agent tourne sur le PC de la borne, ecoute uniquement
// 127.0.0.1, et donne a la page :
//   GET  /status  -> imprimantes detectees, celle par defaut, pretes ou non
//   POST /print   -> imprime le portrait (JSON : image en data URL, copies...)
//
// Aucune dependance : node agent.mjs  (Node 18+). Windows, macOS, Linux (CUPS).
// Variables : PORT (7341), ALLOWED_ORIGINS (origines autorisees, separees par
// des virgules), PRINT_TO_DIR (test : imprimantes "Print to PDF" -> fichier).

import http from "node:http";
import os from "node:os";
import fs from "node:fs";
import path from "node:path";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

const run = promisify(execFile);
const PORT = Number(process.env.PORT || 7341);
const ALLOWED = (process.env.ALLOWED_ORIGINS || "https://fmrxr.com,https://www.fmrxr.com,http://localhost:3000")
  .split(",").map((s) => s.trim()).filter(Boolean);
const MAX_BODY = 15 * 1024 * 1024;
const WIN = process.platform === "win32";

// Formats en centiemes de pouce (Windows) et noms CUPS.
const PAPERS = {
  "10x15": { w: 400, h: 600, cups: "4x6" },
  "13x18": { w: 500, h: 700, cups: "5x7" },
  A6: { w: 413, h: 583, cups: "A6" },
  A5: { w: 583, h: 827, cups: "A5" },
  A4: { w: 827, h: 1169, cups: "A4" },
};

// ---------- detection ----------
// Win32_Printer.PrinterStatus : 1 autre, 2 inconnu, 3 pret, 4 impression, 5 chauffe, 6 arrete, 7 hors ligne.
async function listPrinters() {
  if (WIN) {
    const { stdout } = await run("powershell.exe", ["-NoProfile", "-NonInteractive", "-Command",
      "Get-CimInstance Win32_Printer | Select-Object Name,Default,PrinterStatus,WorkOffline,DetectedErrorState | ConvertTo-Json -Compress"],
      { timeout: 15000, windowsHide: true });
    const raw = JSON.parse(stdout || "[]");
    return (Array.isArray(raw) ? raw : [raw]).map((p) => {
      const offline = Boolean(p.WorkOffline) || p.PrinterStatus === 7 || p.PrinterStatus === 6;
      const error = [3, 4, 5, 6, 7, 8, 9, 10, 11].includes(p.DetectedErrorState); // papier, encre, bourrage, porte...
      return {
        name: p.Name, default: Boolean(p.Default),
        ready: !offline && !error,
        status: offline ? "offline" : error ? "error" : p.PrinterStatus === 4 ? "printing" : "idle",
        virtual: /pdf|xps|onenote|fax/i.test(p.Name),
      };
    });
  }
  const [{ stdout: list }, def] = await Promise.all([
    run("lpstat", ["-p"], { timeout: 10000 }).catch(() => ({ stdout: "" })),
    run("lpstat", ["-d"], { timeout: 10000 }).catch(() => ({ stdout: "" })),
  ]);
  const defName = /:\s*(\S+)/.exec(def.stdout || "")?.[1];
  return list.split("\n").filter((l) => l.startsWith("printer ")).map((l) => {
    const name = l.split(" ")[1];
    const disabled = /disabled/.test(l);
    return { name, default: name === defName, ready: !disabled, status: disabled ? "offline" : /printing/.test(l) ? "printing" : "idle", virtual: /pdf/i.test(name) };
  });
}

// ---------- impression ----------
function psQuote(s) { return `'${String(s).replace(/'/g, "''")}'`; }

async function printWindows({ file, printer, copies, paper, fit, outFile }) {
  const p = PAPERS[paper];
  // System.Drawing (Windows PowerShell 5.1) : pas de boite de dialogue, marges a 0,
  // image recadree (cover) ou entiere (contain) dans la page, orientation selon l'image.
  const script = `
Add-Type -AssemblyName System.Drawing
$img = [System.Drawing.Image]::FromFile(${psQuote(file)})
$doc = New-Object System.Drawing.Printing.PrintDocument
if (${psQuote(printer)} -ne '') { $doc.PrinterSettings.PrinterName = ${psQuote(printer)} }
if (-not $doc.PrinterSettings.IsValid) { throw 'PRINTER_NOT_FOUND' }
$doc.PrinterSettings.Copies = ${copies}
$size = $null
foreach ($s in $doc.PrinterSettings.PaperSizes) { if ([math]::Abs($s.Width - ${p.w}) -le 8 -and [math]::Abs($s.Height - ${p.h}) -le 8) { $size = $s; break } }
if ($size -eq $null) { $size = New-Object System.Drawing.Printing.PaperSize('${paper}', ${p.w}, ${p.h}) }
$doc.DefaultPageSettings.PaperSize = $size
$doc.DefaultPageSettings.Landscape = ($img.Width -gt $img.Height)
$doc.DefaultPageSettings.Margins = New-Object System.Drawing.Printing.Margins(0,0,0,0)
$doc.OriginAtMargins = $false
${outFile ? `$doc.PrinterSettings.PrintToFile = $true; $doc.PrinterSettings.PrintFileName = ${psQuote(outFile)}` : ""}
$doc.DocumentName = 'FMRXR portrait'
$doc.add_PrintPage({
  param($sender, $e)
  $b = $e.PageBounds
  $ir = $img.Width / $img.Height; $pr = $b.Width / $b.Height
  ${fit === "cover"
    ? "if ($ir -gt $pr) { $h = $b.Height; $w = $h * $ir } else { $w = $b.Width; $h = $w / $ir }"
    : "if ($ir -gt $pr) { $w = $b.Width; $h = $w / $ir } else { $h = $b.Height; $w = $h * $ir }"}
  $x = $b.X + ($b.Width - $w) / 2; $y = $b.Y + ($b.Height - $h) / 2
  $e.Graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $e.Graphics.DrawImage($img, [single]$x, [single]$y, [single]$w, [single]$h)
  $e.HasMorePages = $false
})
$doc.Print()
$img.Dispose()
`;
  await run("powershell.exe", ["-NoProfile", "-NonInteractive", "-Command", script], { timeout: 120000, windowsHide: true });
}

async function printCups({ file, printer, copies, paper, fit }) {
  const args = ["-n", String(copies), "-o", `media=${PAPERS[paper].cups}`, "-o", fit === "cover" ? "print-scaling=fill" : "print-scaling=fit"];
  if (printer) args.unshift("-d", printer);
  await run("lp", [...args, file], { timeout: 60000 });
}

const done = new Map(); // jobId -> date : un meme portrait n'est pas imprime deux fois par erreur
async function handlePrint(body) {
  const { image, printer = "", copies = 1, paper = "10x15", fit = "cover", jobId } = body;
  if (!jobId || typeof jobId !== "string" || jobId.length > 120) return [400, { ok: false, error: "JOB_ID" }];
  if (done.has(jobId)) return [200, { ok: true, duplicate: true }];
  if (!PAPERS[paper]) return [400, { ok: false, error: "PAPER" }];
  const n = Math.min(10, Math.max(1, Number(copies) || 1));
  const m = /^data:image\/(jpeg|png|webp);base64,(.+)$/.exec(String(image || ""));
  if (!m) return [400, { ok: false, error: "IMAGE" }];
  const bytes = Buffer.from(m[2], "base64");
  const ext = m[1] === "jpeg" ? "jpg" : m[1];
  const file = path.join(os.tmpdir(), `fmrxr-print-${Date.now()}.${ext}`);
  fs.writeFileSync(file, bytes);

  const printers = await listPrinters();
  const target = printer ? printers.find((p) => p.name === printer) : printers.find((p) => p.default);
  if (!target) return [409, { ok: false, error: "NO_PRINTER" }];
  if (!target.ready) return [409, { ok: false, error: "PRINTER_NOT_READY", status: target.status }];

  const outFile = process.env.PRINT_TO_DIR && target.virtual
    ? path.join(process.env.PRINT_TO_DIR, `${jobId.replace(/[^\w-]/g, "_")}.pdf`) : null;
  try {
    if (WIN) await printWindows({ file, printer: target.name, copies: n, paper, fit, outFile });
    else await printCups({ file, printer: target.name, copies: n, paper, fit });
  } catch (e) {
    return [500, { ok: false, error: String(e.stderr || e.message).includes("PRINTER_NOT_FOUND") ? "NO_PRINTER" : "PRINT_FAILED" }];
  } finally {
    fs.rm(file, () => {});
  }
  done.set(jobId, Date.now());
  for (const [k, t] of done) if (Date.now() - t > 3600_000) done.delete(k);
  console.log(new Date().toISOString(), "imprime", jobId, "->", target.name, `x${n}`, paper, outFile ?? "");
  return [200, { ok: true, printer: target.name, file: outFile }];
}

// ---------- serveur ----------
function cors(req, res) {
  const origin = req.headers.origin;
  if (origin && ALLOWED.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Vary", "Origin");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    // Chrome : une page publique (https://fmrxr.com) qui appelle 127.0.0.1
    // doit y etre autorisee explicitement (Private / Local Network Access).
    res.setHeader("Access-Control-Allow-Private-Network", "true");
    return true;
  }
  return !origin; // appel local sans origine (curl) : autorise
}

const send = (res, code, obj) => {
  res.writeHead(code, { "Content-Type": "application/json", "Cache-Control": "no-store" });
  res.end(JSON.stringify(obj));
};

const server = http.createServer(async (req, res) => {
  if (!cors(req, res)) return send(res, 403, { ok: false, error: "ORIGIN" });
  if (req.method === "OPTIONS") { res.writeHead(204); return res.end(); }
  try {
    if (req.method === "GET" && req.url === "/status") {
      const printers = await listPrinters();
      const def = printers.find((p) => p.default) ?? null;
      return send(res, 200, { ok: true, agent: "fmrxr-print-agent/1", platform: process.platform, printers, default: def?.name ?? null, ready: Boolean(def?.ready) });
    }
    if (req.method === "POST" && req.url === "/print") {
      let size = 0;
      const chunks = [];
      for await (const c of req) {
        size += c.length;
        if (size > MAX_BODY) return send(res, 413, { ok: false, error: "TOO_LARGE" });
        chunks.push(c);
      }
      const [code, body] = await handlePrint(JSON.parse(Buffer.concat(chunks).toString("utf8")));
      return send(res, code, body);
    }
    send(res, 404, { ok: false, error: "NOT_FOUND" });
  } catch (e) {
    console.error(e);
    send(res, 500, { ok: false, error: "AGENT_ERROR" });
  }
});

server.listen(PORT, "127.0.0.1", () => {
  console.log(`fmrxr-print-agent sur http://127.0.0.1:${PORT}  (origines : ${ALLOWED.join(", ")})`);
});
