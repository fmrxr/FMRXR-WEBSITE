"use client";
import { useState } from "react";

export function CopyLink({ url }: { url: string }) {
  const [done, setDone] = useState(false);
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(url);
        setDone(true);
        window.setTimeout(() => setDone(false), 1800);
      }}
      className="rounded-full border border-fmborder px-5 py-2.5 text-sm text-fmfg/80 hover:border-fmfg/50"
    >
      {done ? "Lien copié" : "Copier le lien de la borne"}
    </button>
  );
}
