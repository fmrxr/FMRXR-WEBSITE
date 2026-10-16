"use client";
import { useState } from "react";

// Bouton « Supprimer » des galeries (admin, client, equipe). Confirmation,
// puis le portrait est masque partout et son lien de partage coupe.
export function DeletePortrait({ id, galleryKey, className, onDeleted }: {
  id: string; galleryKey?: string | null; className?: string; onDeleted?: () => void;
}) {
  const [busy, setBusy] = useState(false);
  return (
    <button
      type="button"
      data-testid="gallery-delete"
      disabled={busy}
      className={className}
      onClick={async () => {
        if (!confirm("Supprimer ce portrait ? Il disparaîtra de la galerie, et son QR et son lien de partage ne fonctionneront plus.")) return;
        setBusy(true);
        const r = await fetch(`/api/photobooth/portrait/${id}/delete`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ g: galleryKey ?? null }),
        }).catch(() => null);
        setBusy(false);
        if (!r?.ok) return alert("La suppression n’a pas abouti. Réessayez.");
        onDeleted?.();
      }}
    >
      {busy ? "Suppression…" : "Supprimer"}
    </button>
  );
}
