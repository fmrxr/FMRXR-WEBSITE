"use client";
import { useState } from "react";
import { Download, Pause, Play, Square } from "lucide-react";

// L'etat du mur et le QR, en tete de la page de controle.
//
// Ces deux choses doivent etre a portee de main quelle que soit la page
// ouverte : le QR parce qu'on le redemande toute la soiree, l'etat parce
// qu'une equipe qui veut arreter le mur ne doit pas avoir a chercher.

type Status = "draft" | "active" | "suspended" | "ended";

const LABEL: Record<Status, string> = {
  draft: "en préparation", active: "ouvert", suspended: "en pause", ended: "clos",
};

export function WallState({ slug, m, status, guestUrl, qrSvg }: {
  slug: string; m: string; status: Status; guestUrl: string; qrSvg: string;
}) {
  const [s, setS] = useState<Status>(status);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [qr, setQr] = useState(false);

  const set = async (next: Status) => {
    setBusy(true); setErr(null);
    const r = await fetch("/api/wall/state", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug, m, status: next }),
    }).then((x) => x.json()).catch(() => null);
    setBusy(false);
    if (r?.ok) setS(next); else setErr("Changement impossible.");
  };

  // Le QR part en PNG : c'est ce qu'attend un imprimeur, et ca se glisse
  // dans un document sans se poser de question.
  const png = async () => {
    const img = new Image();
    img.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(qrSvg);
    await new Promise((r) => { img.onload = img.onerror = r; });
    const size = 1200;
    const cv = document.createElement("canvas");
    cv.width = cv.height = size;
    const g = cv.getContext("2d")!;
    g.fillStyle = "#fff"; g.fillRect(0, 0, size, size);
    const pad = size * 0.08;
    g.drawImage(img, pad, pad, size - pad * 2, size - pad * 2);
    const a = document.createElement("a");
    a.href = cv.toDataURL("image/png");
    a.download = `${slug}-qr.png`;
    a.click();
  };

  const dot = s === "active" ? "bg-fmaccent" : s === "suspended" ? "bg-amber-400" : "bg-fmmuted";

  return (
    <div className="mb-4 rounded-xl border border-fmborder bg-fmcard p-3">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <span className="flex items-center gap-2 text-sm">
          <span className={`inline-block h-2 w-2 rounded-full ${dot} ${s === "active" ? "animate-pulse" : ""}`} />
          Le mur est <span className="font-semibold text-fmfg">{LABEL[s]}</span>
        </span>

        <span className="flex gap-2">
          {s !== "active" && (
            <Btn onClick={() => set("active")} busy={busy} icon={<Play className="h-4 w-4" />} label="Ouvrir" primary />
          )}
          {s === "active" && (
            <Btn onClick={() => set("suspended")} busy={busy} icon={<Pause className="h-4 w-4" />} label="Mettre en pause" />
          )}
          {s !== "ended" && (
            <Btn onClick={() => set("ended")} busy={busy} icon={<Square className="h-4 w-4" />} label="Clore" />
          )}
        </span>

        <button onClick={() => setQr((v) => !v)}
          className="ml-auto min-h-11 rounded-full border border-fmborder px-4 text-sm text-fmfg">
          {qr ? "Masquer le QR" : "Le QR des tables"}
        </button>
      </div>

      {err && <p className="mt-2 text-xs text-red-400">{err}</p>}
      {s !== "active" && (
        <p className="mt-2 text-xs text-fmmuted">
          {s === "suspended"
            ? "Les invités voient le mur mais ne peuvent plus écrire."
            : "Le mur est fermé aux invités. Vos exports restent disponibles."}
        </p>
      )}

      {qr && (
        <div className="mt-4 flex flex-wrap items-center gap-5 border-t border-fmborder pt-4">
          <div className="h-32 w-32 bg-white p-2 [&_svg]:h-full [&_svg]:w-full"
            dangerouslySetInnerHTML={{ __html: qrSvg }} />
          <div className="flex flex-col gap-2">
            <p className="text-xs text-fmmuted">À poser sur les tables. Chaque invité le scanne pour écrire.</p>
            <code className="max-w-full overflow-hidden text-ellipsis text-[11px] text-fmfg/70">{guestUrl}</code>
            <button onClick={png} className="flex min-h-11 w-fit items-center gap-2 rounded-full bg-fmaccent px-4 text-sm font-semibold text-black">
              <Download className="h-4 w-4" /> Télécharger le QR
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function Btn({ onClick, icon, label, primary, busy }: {
  onClick: () => void; icon: React.ReactNode; label: string; primary?: boolean; busy?: boolean;
}) {
  return (
    <button onClick={onClick} disabled={busy}
      className={`flex min-h-11 items-center gap-1.5 rounded-full px-4 text-xs font-medium disabled:opacity-50 ${
        primary ? "bg-fmaccent font-semibold text-black" : "border border-fmborder text-fmfg"}`}>
      {icon}{label}
    </button>
  );
}
