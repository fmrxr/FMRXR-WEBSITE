"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

// Écoute « fmr » tapé n'importe où sur le site, sauf dans un champ de saisie,
// et ouvre la page cachée des prix. Fichier à part : la mise en page publique
// l'importe partout, il ne doit rien embarquer des prix.
export function SecretLevelListener() {
  const router = useRouter();
  useEffect(() => {
    let buf = "";
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))) return;
      if (e.key.length !== 1 || e.ctrlKey || e.metaKey || e.altKey) return;
      buf = (buf + e.key.toLowerCase()).slice(-3);
      if (buf === "fmr" && window.location.pathname !== "/fmr") {
        buf = "";
        router.push("/fmr");
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [router]);
  return null;
}
