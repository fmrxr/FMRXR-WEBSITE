"use client";
import { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";
import type { CampaignConfig } from "@/lib/photobooth/config";
import type { GalleryItem } from "@/lib/photobooth/client";
import { PAGE_SIZE, usePrinter } from "@/app/experience/photobooth/[slug]/usePrinter";
import { DeletePortrait } from "@/components/photobooth/DeletePortrait";

// Image du portrait : connexion (espace client) ou cle de galerie d'equipe.
const imageUrl = (id: string, galleryKey: string | null, dl = false) => {
  const q = new URLSearchParams();
  if (galleryKey) q.set("g", galleryKey);
  if (dl) q.set("dl", "1");
  const s = q.toString();
  return `/api/photobooth/client-image/${id}${s ? `?${s}` : ""}`;
};

// Grille de la galerie client. Impression : agent local si la campagne en a
// un (detection d'imprimante), sinon boite d'impression du navigateur. Les
// reimpressions sont permises ici (demandes tardives).

type PrintCfg = CampaignConfig["print"];

const FALLBACK: PrintCfg = {
  enabled: true, mode: "browser", agentUrl: "http://127.0.0.1:7341", printer: "", paper: "10x15", fit: "cover", maxPrints: 1,
};

export function Gallery({ items: initial, print, galleryKey = null }: { items: GalleryItem[]; print: PrintCfg | null; galleryKey?: string | null }) {
  const [items, setItems] = useState(initial);
  const cfg: PrintCfg = print?.enabled ? { ...print, maxPrints: 9999 } : FALLBACK;
  const printer = usePrinter(cfg, cfg.mode === "agent");
  const [browserPrint, setBrowserPrint] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);
  // Identifiant d'impression unique a chaque demande : l'agent ignore un
  // doublon exact, mais une reimpression volontaire doit passer.
  const seq = useRef(0);

  async function doPrint(it: GalleryItem) {
    const url = imageUrl(it.id, galleryKey);
    if (cfg.mode === "agent" && printer.state.kind === "ready") {
      setBusyId(it.id);
      seq.current += 1;
      await printer.print(url, `${it.id}-late-${seq.current}-${Math.round(performance.timeOrigin)}`);
      setBusyId(null);
      return;
    }
    // Navigateur : l'image a imprimer est chargee, puis la boite s'ouvre.
    setBrowserPrint(url);
  }

  if (items.length === 0) {
    return <p className="mt-10 text-fmmuted">Aucun portrait sur les 7 derniers jours.</p>;
  }

  return (
    <>
      {cfg.mode === "agent" && (
        <p className="mt-4 text-xs text-fmmuted">
          Imprimante : {printer.state.kind === "ready" ? `prête (${printer.state.name})` : "non détectée, la boîte d’impression du navigateur sera utilisée"}
        </p>
      )}
      {printer.error && <p className="mt-2 text-xs text-red-400">L’impression n’a pas abouti ({printer.error}).</p>}
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((it) => (
          <Card
            key={it.id} item={it} galleryKey={galleryKey} onPrint={() => doPrint(it)} printing={busyId === it.id}
            onDeleted={() => setItems((l) => l.filter((x) => x.id !== it.id))}
          />
        ))}
      </div>

      {browserPrint && (
        <div id="pb-print" aria-hidden className="hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={browserPrint}
            alt=""
            onLoad={() => { window.print(); setBrowserPrint(null); }}
            onError={() => setBrowserPrint(null)}
          />
        </div>
      )}
      <style>{`
        @page { size: ${PAGE_SIZE[cfg.paper]}; margin: 0; }
        @media print {
          body * { visibility: hidden !important; }
          #pb-print, #pb-print * { visibility: visible !important; }
          #pb-print { display: block !important; position: fixed; inset: 0; }
          #pb-print img { width: 100%; height: 100%; object-fit: ${cfg.fit}; }
        }
      `}</style>
    </>
  );
}

function Card({ item, galleryKey, onPrint, printing, onDeleted }: {
  item: GalleryItem; galleryKey: string | null; onPrint: () => void; printing: boolean; onDeleted: () => void;
}) {
  const [qr, setQr] = useState<string | null>(null);
  useEffect(() => {
    if (!item.shareUrl) return;
    QRCode.toString(item.shareUrl, { type: "svg", margin: 1, errorCorrectionLevel: "M", color: { dark: "#0d0c14", light: "#f5f5f8" } })
      .then(setQr).catch(() => setQr(null));
  }, [item.shareUrl]);
  const img = imageUrl(item.id, galleryKey);
  return (
    <figure data-testid="gallery-item" className="overflow-hidden rounded-xl border border-fmborder bg-fmcard/70">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={img} alt={item.title} loading="lazy" className="aspect-[3/4] w-full bg-fmmutedbg object-contain" />
      <figcaption className="flex flex-col gap-3 p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-sm font-semibold">{item.title || "Portrait"}</p>
            <p className="text-xs text-fmmuted">{new Date(item.completedAt).toLocaleString("fr-FR")}</p>
          </div>
          {qr && (
            <div
              title="QR de partage (7 jours)"
              className="size-20 shrink-0 overflow-hidden rounded-md [&>svg]:h-full [&>svg]:w-full"
              dangerouslySetInnerHTML={{ __html: qr }}
            />
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          <a href={imageUrl(item.id, galleryKey, true)} className="rounded-full bg-fmfg px-4 py-2 text-xs font-semibold text-fmbg hover:bg-fmaccent">
            Télécharger
          </a>
          <button
            data-testid="gallery-print"
            onClick={onPrint}
            disabled={printing}
            className="rounded-full border border-fmborder px-4 py-2 text-xs text-fmfg/85 hover:border-fmfg/50 disabled:opacity-50"
          >
            {printing ? "Impression…" : "Imprimer"}
          </button>
          {item.shareUrl && (
            <a href={item.shareUrl} target="_blank" rel="noreferrer" className="rounded-full border border-fmborder px-4 py-2 text-xs text-fmfg/85 hover:border-fmfg/50">
              Lien de partage
            </a>
          )}
          <DeletePortrait
            id={item.id} galleryKey={galleryKey} onDeleted={onDeleted}
            className="rounded-full border border-red-500/40 px-4 py-2 text-xs text-red-300 hover:border-red-400 disabled:opacity-50"
          />
        </div>
      </figcaption>
    </figure>
  );
}
