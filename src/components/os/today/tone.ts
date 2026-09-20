import type { Tone } from "@/lib/os/today";

/**
 * Un ton ne se traduit jamais par la seule couleur : chaque entrée porte aussi un mot, repris en
 * `title`/`aria-label` par les composants, pour rester lisible sans perception des couleurs.
 */
export const TONE_STYLE: Record<Tone, { dot: string; text: string; word: string }> = {
  win: { dot: "bg-fmaccent", text: "text-fmaccent", word: "avancée" },
  risk: { dot: "bg-[#ff4d5e]", text: "text-[#ff4d5e]", word: "critique" },
  watch: { dot: "bg-[#d9a441]", text: "text-[#d9a441]", word: "à surveiller" },
  info: { dot: "bg-fmprimary", text: "text-fmprimary", word: "information" },
};
