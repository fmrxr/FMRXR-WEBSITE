import type { CSSProperties } from "react";

export const INK = { dark: "#1b1a22", light: "#f6f6f8" } as const;

/**
 * Encre, halo et voile d'un texte posé sur un papier : la même règle sert à
 * la carte du mur (Card.tsx) et à l'aperçu de cette page.
 */
export function inkStyle(sheet: { ink: "dark" | "light"; veil?: boolean } | null): CSSProperties {
  const light = sheet?.ink === "light";
  const color = light ? INK.light : INK.dark;
  if (!sheet) return { color };
  const halo = light ? "rgba(0,0,0,0.55)" : "rgba(255,255,255,0.6)";
  return {
    color,
    // Le halo de la couleur opposée détache chaque lettre du motif.
    textShadow: `0 0 0.18em ${halo}, 0 0 0.45em ${halo}`,
    background: sheet.veil ? (light ? "rgba(10,10,16,0.6)" : "rgba(255,255,255,0.66)") : undefined,
    backdropFilter: sheet.veil ? "blur(2px)" : undefined,
  };
}

