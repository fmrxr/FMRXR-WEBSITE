"use client";
import { useState } from "react";

// Choix de la camera de la borne : webcam integree, webcam USB, ou iPhone
// branche comme webcam (Continuity Camera sur Mac, Camo ou iVCam sur Windows).
// Le choix est memorise sur cette borne (navigateur), par campagne.

export const cameraStorageKey = (slug: string) => `pb-camera:${slug}`;

export function readCamera(slug: string): string | null {
  try {
    return localStorage.getItem(cameraStorageKey(slug));
  } catch {
    return null;
  }
}

function saveCamera(slug: string, id: string | null) {
  try {
    if (id) localStorage.setItem(cameraStorageKey(slug), id);
    else localStorage.removeItem(cameraStorageKey(slug));
  } catch {
    // stockage indisponible : le choix vaut pour cette visite seulement
  }
}

// Image en miroir (comme une glace) ou reelle. Reelle par defaut : en miroir,
// textes et logos des vetements sortaient inverses (retour du 16/10/2026).
const mirrorKey = (slug: string) => `pb-mirror:${slug}`;
export function readMirror(slug: string): boolean {
  try {
    return localStorage.getItem(mirrorKey(slug)) === "1";
  } catch {
    return false;
  }
}
// Abonnement (useSyncExternalStore) : la borne relit l'option apres
// l'hydratation, et a chaque changement.
const mirrorListeners = new Set<() => void>();
export function subscribeMirror(cb: () => void) {
  mirrorListeners.add(cb);
  return () => { mirrorListeners.delete(cb); };
}
function saveMirror(slug: string, on: boolean) {
  try {
    localStorage.setItem(mirrorKey(slug), on ? "1" : "0");
  } catch {
    // stockage indisponible : le choix vaut pour cette visite
  }
  mirrorListeners.forEach((cb) => cb());
}

type Cam = { id: string; label: string };

export function CameraPicker({ slug, value, onChange, mirror, t, extra }: {
  slug: string; value: string | null; onChange: (id: string | null) => void;
  mirror: boolean; t: Record<string, string>;
  /** Option supplementaire en bas de la liste (ex. « iPhone par QR »). */
  extra?: { label: string; onSelect: () => void };
}) {
  const [open, setOpen] = useState(false);
  const [cams, setCams] = useState<Cam[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function list() {
    setOpen(true);
    setError(null);
    try {
      let devices = (await navigator.mediaDevices.enumerateDevices()).filter((d) => d.kind === "videoinput");
      // Sans autorisation camera, les noms sont vides : on la demande une fois.
      if (devices.length && devices.every((d) => !d.label)) {
        const s = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
        s.getTracks().forEach((tr) => tr.stop());
        devices = (await navigator.mediaDevices.enumerateDevices()).filter((d) => d.kind === "videoinput");
      }
      setCams(devices.map((d, i) => ({ id: d.deviceId, label: d.label || `${t.camPick} ${i + 1}` })));
    } catch {
      setError(t.camPickError);
    }
  }

  function choose(id: string | null) {
    saveCamera(slug, id);
    onChange(id);
    setOpen(false);
  }

  return (
    <>
      <button
        data-testid="camera-picker"
        onClick={list}
        className="me-2 rounded px-2.5 py-1.5 font-mono text-xs uppercase tracking-[0.14em] text-fmmuted hover:text-fmfg"
      >
        {t.camPick}
      </button>
      {open && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-6 backdrop-blur-sm" onClick={() => setOpen(false)}>
          <div onClick={(e) => e.stopPropagation()} className="flex w-full max-w-md flex-col gap-3 rounded-2xl border border-fmborder bg-fmcard p-6 text-start">
            <p className="text-sm font-semibold">{t.camPickTitle}</p>
            <p className="text-xs text-fmmuted">{t.camPickHelp}</p>
            {error && <p role="alert" className="text-xs text-red-300">{error}</p>}
            {!cams && !error && <p className="text-xs text-fmmuted">…</p>}
            <div className="flex max-h-72 flex-col gap-2 overflow-y-auto">
              <Option active={!value} onClick={() => choose(null)} label={t.camPickDefault} />
              {cams?.map((c) => <Option key={c.id} active={value === c.id} onClick={() => choose(c.id)} label={c.label} />)}
              {extra && <Option active={false} onClick={() => { setOpen(false); extra.onSelect(); }} label={extra.label} />}
            </div>
            <label className="mt-1 flex items-center gap-3 text-sm">
              <input
                type="checkbox"
                data-testid="camera-mirror"
                checked={mirror}
                onChange={(e) => saveMirror(slug, e.target.checked)}
                className="size-4 accent-[var(--color-fmaccent)]"
              />
              <span>
                {t.camMirror}
                <span className="block text-xs text-fmmuted">{t.camMirrorHelp}</span>
              </span>
            </label>
            <button onClick={() => setOpen(false)} className="mt-1 self-end rounded-full border border-fmborder px-5 py-2 text-sm text-fmfg/80">
              {t.galleryCancel}
            </button>
          </div>
        </div>
      )}
    </>
  );
}

function Option({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-lg border px-4 py-3 text-start text-sm ${active ? "border-fmaccent bg-fmaccent/15" : "border-fmborder hover:border-fmfg/40"}`}
    >
      {label}
    </button>
  );
}
