"use client";
import { useState } from "react";

// Acces a la galerie depuis la premiere page de la borne, reserve a l'equipe :
// le code a 6 chiffres est affiche dans l'admin de la campagne. Sans lui,
// un invite (ou quiconque a le lien de la borne) ne voit pas les portraits.
export function TeamGallery({ slug, accessKey, t }: { slug: string; accessKey: string; t: Record<string, string> }) {
  const [open, setOpen] = useState(false);
  const [pin, setPin] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const r = await fetch("/api/photobooth/gallery-access", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug, k: accessKey, pin }),
    }).catch(() => null);
    const j = (await r?.json().catch(() => null)) as { ok?: boolean; path?: string; error?: string } | null;
    setBusy(false);
    if (j?.ok && j.path) {
      window.location.href = j.path;
      return;
    }
    setPin("");
    setError(j?.error === "RATE_LIMITED" ? t.galleryWait : t.galleryWrong);
  }

  return (
    <>
      <button
        data-testid="team-gallery"
        onClick={() => setOpen(true)}
        className="ms-auto me-2 rounded px-2.5 py-1.5 font-mono text-xs uppercase tracking-[0.14em] text-fmmuted hover:text-fmfg"
      >
        {t.gallery}
      </button>
      {open && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-6 backdrop-blur-sm" onClick={() => setOpen(false)}>
          <form
            onSubmit={submit}
            onClick={(e) => e.stopPropagation()}
            className="flex w-full max-w-xs flex-col gap-4 rounded-2xl border border-fmborder bg-fmcard p-6 text-start"
          >
            <label htmlFor="team-pin" className="text-sm font-semibold">{t.galleryCode}</label>
            <input
              id="team-pin"
              autoFocus
              inputMode="numeric"
              autoComplete="off"
              maxLength={6}
              value={pin}
              onChange={(e) => setPin(e.target.value.replace(/\D/g, ""))}
              className="rounded-lg border border-fmborder bg-fmbg px-4 py-3 text-center font-mono text-2xl tracking-[0.4em] text-fmfg outline-none focus:border-fmaccent"
            />
            {error && <p role="alert" className="text-xs text-red-300">{error}</p>}
            <div className="flex gap-2">
              <button
                type="submit"
                disabled={pin.length !== 6 || busy}
                className="flex-1 rounded-full bg-fmfg px-5 py-3 text-sm font-semibold text-fmbg transition hover:bg-fmaccent disabled:opacity-40"
              >
                {t.galleryOpen}
              </button>
              <button type="button" onClick={() => setOpen(false)} className="rounded-full border border-fmborder px-5 py-3 text-sm text-fmfg/80">
                {t.galleryCancel}
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
