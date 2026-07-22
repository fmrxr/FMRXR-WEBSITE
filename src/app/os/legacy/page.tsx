"use client";

import { useEffect, useState } from "react";

// Ancienne version (monolithe) — cohabitation le temps de porter chaque module natif (§5).
// L'auth admin est déjà vérifiée par le layout parent (/os/layout.tsx). Metadata (title/robots
// noindex) héritée du layout parent.
//
// L'iframe n'est montée qu'une fois le hash de la page (#<moduleId>) lu côté client : si on la
// montait tout de suite avec src="/os/app" puis changeait le src pour ajouter le hash, le
// navigateur traite ça comme une navigation same-document (seul le hash change) et ne recharge
// pas le document — le pont injecté (boot()/applyHash() dans /os/app/route.ts) ne s'exécute
// alors jamais avec le hash présent, et le deep-link est silencieusement ignoré.
export default function OsLegacyPage() {
  const [src, setSrc] = useState<string | null>(null);

  useEffect(() => {
    // One-time read of the browser-only hash on mount; no SSR value to derive it from.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSrc(window.location.hash ? `/os/app${window.location.hash}` : "/os/app");
  }, []);

  if (!src) return null;
  return <iframe src={src} title="FMRXR OS — ancienne version" className="fixed inset-0 z-50 h-screen w-screen border-0" />;
}
