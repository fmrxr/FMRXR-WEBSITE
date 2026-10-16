"use client";
import { useEffect, useState } from "react";
import QRCode from "qrcode";
import type { RemoteStatus } from "./useRemoteCamera";

// Fenetre d'appairage de l'iPhone : QR a scanner avec l'appareil photo de
// l'iPhone, sur le meme Wi-Fi que la borne.
export function RemotePair({ slug, accessKey, pairId, status, onNew, onForget, onClose, t }: {
  slug: string; accessKey: string; pairId: string | null; status: RemoteStatus;
  onNew: () => void; onForget: () => void; onClose: () => void; t: Record<string, string>;
}) {
  const [qr, setQr] = useState<string | null>(null);
  // Toujours en attente apres 20 s : on affiche l'aide reseau.
  const [slow, setSlow] = useState(false);
  useEffect(() => {
    if (status === "connected") return;
    const id = window.setTimeout(() => setSlow(true), 20_000);
    return () => window.clearTimeout(id);
  }, [status, pairId]);
  const url = pairId ? `${location.origin}/experience/photobooth/${slug}/camera?k=${encodeURIComponent(accessKey)}&p=${pairId}` : null;

  useEffect(() => {
    if (!url) return;
    QRCode.toString(url, { type: "svg", margin: 1, errorCorrectionLevel: "M", color: { dark: "#0d0c14", light: "#f5f5f8" } })
      .then(setQr).catch(() => setQr(null));
  }, [url]);

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/75 p-6 backdrop-blur-sm" onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} className="flex max-h-[92dvh] w-full max-w-sm flex-col items-center gap-4 overflow-y-auto rounded-2xl border border-fmborder bg-fmcard p-6 text-center">
        <p className="text-lg font-semibold">{t.remoteTitle}</p>
        <p role="note" className="w-full rounded-xl border border-amber-400/60 bg-amber-400/10 px-4 py-3 text-sm font-semibold text-amber-200">
          {t.remoteWifi}
        </p>
        <p className="text-sm text-fmmuted">{t.remoteHelp}</p>
        {qr && <div className="size-56 overflow-hidden rounded-xl [&>svg]:h-full [&>svg]:w-full" dangerouslySetInnerHTML={{ __html: qr }} />}
        <p className="flex items-center gap-2 text-sm" role="status">
          <span className={`size-2.5 rounded-full ${status === "connected" ? "bg-fmaccent" : "animate-pulse bg-fmfg/60"}`} />
          {status === "connected" ? t.remoteConnected : t.remoteWaiting}
        </p>
        {slow && status !== "connected" && (
          <div role="alert" className="w-full rounded-xl border border-fmborder bg-fmbg/60 px-4 py-3 text-start text-xs leading-relaxed text-fmfg/85">
            <p className="font-semibold">{t.remoteSlowTitle}</p>
            <ul className="mt-1.5 list-disc space-y-1 ps-4">
              <li>{t.remoteSlow1}</li>
              <li>{t.remoteSlow2}</li>
              <li>{t.remoteSlow3}</li>
            </ul>
          </div>
        )}
        <div className="flex flex-wrap justify-center gap-2">
          <button onClick={onClose} className="rounded-full bg-fmfg px-6 py-2.5 text-sm font-semibold text-fmbg hover:bg-fmaccent">
            {status === "connected" ? t.remoteUse : t.galleryCancel}
          </button>
          <button onClick={onNew} className="rounded-full border border-fmborder px-5 py-2.5 text-sm text-fmfg/80">{t.remoteNew}</button>
          {pairId && <button onClick={onForget} className="rounded-full border border-fmborder px-5 py-2.5 text-sm text-fmfg/80">{t.remoteForget}</button>}
        </div>
      </div>
    </div>
  );
}
