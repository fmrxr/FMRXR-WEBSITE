"use client";

import { useEffect, useState } from "react";
import type { OsAsset } from "@/lib/os/types";

const IMAGE_EXTS = new Set(["png", "jpg", "jpeg", "gif", "webp", "svg"]);
const FRAME_EXTS = new Set(["pdf", "html", "htm", "md", "txt"]);

function fileExt(path: string): string {
  const m = path.split(".").pop();
  return m && m.length <= 5 ? m.toLowerCase() : "";
}

function assetFileUrl(file: string): string {
  return `/api/os/asset-file?path=${encodeURIComponent(file)}`;
}

interface AssetCardProps {
  asset: OsAsset;
  projectName?: string;
  onEdit: (asset: OsAsset) => void;
  onDelete: (id: string) => void;
}

/**
 * Carte asset — Figma en aperçu live via embed ; fichiers locaux en aperçu réel (image/pdf/html/md)
 * servis par /api/os/asset-file. Pour les iframes (pdf/html/md/txt), un HTTP status non-2xx charge
 * quand même "avec succès" côté iframe (le corps JSON d'erreur devient le contenu affiché) — on
 * vérifie donc l'accessibilité au montage avant de rendre l'iframe, plutôt que d'afficher l'erreur
 * brute comme si c'était le fichier. Repli en badge de type si le fichier est introuvable (app
 * hébergée hors du poste, fichier déplacé/renommé…) ; porte le rendu de RENDER.studio.
 */
export function AssetCard({ asset, projectName, onEdit, onDelete }: AssetCardProps) {
  const [previewing, setPreviewing] = useState(false);
  const [imgFailed, setImgFailed] = useState(false);
  const [frameOk, setFrameOk] = useState<boolean | null>(null);
  const isFigma = asset.kind === "figma";
  const ext = !isFigma ? fileExt(asset.file || asset.url || "") : "";
  const fileUrl = !isFigma && asset.file ? assetFileUrl(asset.file) : null;
  const isFrame = !!fileUrl && FRAME_EXTS.has(ext);

  useEffect(() => {
    if (!fileUrl || !isFrame) return;
    let cancelled = false;
    fetch(fileUrl)
      .then((r) => {
        if (!cancelled) setFrameOk(r.ok);
      })
      .catch(() => {
        if (!cancelled) setFrameOk(false);
      });
    return () => {
      cancelled = true;
    };
  }, [fileUrl, isFrame]);

  const fileBroken = (isFrame && frameOk === false) || (fileUrl && IMAGE_EXTS.has(ext) && imgFailed);

  return (
    <div className="fm-glass-card flex flex-col gap-2.5 rounded-2xl p-4">
      {isFigma ? (
        previewing ? (
          <div className="aspect-video overflow-hidden rounded-lg border border-fmborder bg-black">
            <iframe src={asset.embed} className="h-full w-full" title={asset.name} />
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setPreviewing(true)}
            className="flex aspect-video items-center justify-center rounded-lg border border-fmborder bg-gradient-to-br from-[#181818] to-[#0d0d0d] font-grotesk text-sm tracking-[0.3em] text-fmmuted hover:text-fmfg"
          >
            ◈ FIGMA
          </button>
        )
      ) : fileUrl && IMAGE_EXTS.has(ext) && !imgFailed ? (
        <a href={fileUrl} target="_blank" rel="noopener noreferrer" className="block overflow-hidden rounded-lg border border-fmborder bg-black">
          {/* eslint-disable-next-line @next/next/no-img-element -- fichier local servi par notre API, pas un asset Next optimisable */}
          <img src={fileUrl} alt={asset.name} loading="lazy" className="max-h-40 w-full object-contain" onError={() => setImgFailed(true)} />
        </a>
      ) : isFrame && frameOk === true ? (
        <div className="h-40 overflow-hidden rounded-lg border border-fmborder bg-white/[.02]">
          <iframe src={fileUrl!} loading="lazy" title={asset.name} className="h-full w-full" />
        </div>
      ) : isFrame && frameOk === null ? (
        <div className="flex h-40 items-center justify-center rounded-lg border border-fmborder bg-white/[.02] font-grotesk text-xs text-fmmuted">
          Vérification…
        </div>
      ) : (
        ext && <span className="w-fit rounded bg-fmmutedbg px-1.5 py-0.5 font-mono text-[10px] uppercase text-fmmuted">{ext}</span>
      )}

      {fileBroken && <p className="font-grotesk text-[10px] text-[#ff4d5e]">fichier introuvable sur ce poste (déplacé ou renommé ?)</p>}

      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <div className="truncate font-grotesk text-sm font-medium text-fmfg">{asset.name}</div>
          <div className="mt-0.5 truncate font-mono text-[10px] text-fmmuted">{asset.file || asset.url || ""}</div>
        </div>
        <div className="flex shrink-0 items-center gap-1.5">
          <button type="button" onClick={() => onEdit(asset)} title="Modifier" className="text-fmmuted hover:text-fmfg">
            ✎
          </button>
          <button type="button" onClick={() => onDelete(asset.id)} title="Supprimer" className="text-fmmuted hover:text-[#ff4d5e]">
            ✕
          </button>
        </div>
      </div>

      {(projectName || asset.status || asset.updated) && (
        <div className="flex flex-wrap items-center gap-1.5">
          {projectName && <span className="rounded-full border border-fmborder px-2 py-0.5 font-grotesk text-[10px] text-fmmuted">{projectName}</span>}
          {asset.status && <span className="rounded-full border border-fmaccent/30 px-2 py-0.5 font-grotesk text-[10px] text-fmaccent">{asset.status}</span>}
          {asset.updated && <span className="font-mono text-[10px] text-fmmuted">{asset.updated}</span>}
        </div>
      )}

      {asset.notes && <p className="font-grotesk text-xs text-fmmuted">{asset.notes}</p>}

      {isFigma && (
        <a href={asset.url} target="_blank" rel="noopener noreferrer" className="fm-link font-grotesk text-xs text-fmaccent">
          Ouvrir dans Figma ↗
        </a>
      )}
      {fileUrl && !fileBroken && (
        <a href={fileUrl} target="_blank" rel="noopener noreferrer" className="fm-link font-grotesk text-xs text-fmaccent">
          Ouvrir le fichier ↗
        </a>
      )}
    </div>
  );
}
