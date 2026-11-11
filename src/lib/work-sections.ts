// Les deux sections de la page Work, par acheteur : un directeur marketing
// lit la première, un commissaire ou un programmateur de festival la seconde.
// Chaque projet porte sa section (projects.section, réglée dans l'admin).

export type SectionId = "brands" | "art";

export const SECTIONS: { id: SectionId; index: string; title: string; intro: string }[] = [
  {
    id: "brands",
    index: "01",
    title: "Brands & Institutions",
    intro: "Launches, brand activations, institutional commissions and digital work, delivered on a brief, a date and a budget.",
  },
  {
    id: "art",
    index: "02",
    title: "Art, Music & Live",
    intro: "Installations, live A/V and new media works for museums, festivals, artists and the night.",
  },
];

// Sans section saisie : un projet rattaché à un secteur d'entreprise ou
// institutionnel, et à aucun secteur artistique, va côté marques.
const BRAND_SECTORS = ["corporate", "telecom", "automotive", "tech", "institutional", "finance-insurance"];
const ART_SECTORS = ["art-galleries", "music", "festivals", "nightlife"];

export function sectionOf(p: { section?: string | null; industries?: string[] | null }): SectionId {
  if (p.section === "brands" || p.section === "art") return p.section;
  const ind = p.industries ?? [];
  return ind.some((i) => BRAND_SECTORS.includes(i)) && !ind.some((i) => ART_SECTORS.includes(i)) ? "brands" : "art";
}
