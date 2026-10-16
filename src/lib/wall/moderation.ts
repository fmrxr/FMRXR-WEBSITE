// Filtre automatique des messages. Il ne publie jamais un message signale :
// il le met en attente pour l'equipe. Un faux positif coute une validation,
// un faux negatif coute un mot cru sur l'ecran d'une marque.

// Liste courte et volontairement prudente, completee par campagne (blockedWords).
const BASE: string[] = [
  // fr
  "connard", "connasse", "salope", "pute", "putain", "encule", "enculé", "nique", "niquer", "batard", "bâtard",
  "pd", "tapette", "merde", "fdp", "ntm", "bite", "chatte", "couille", "nazi",
  // en
  "fuck", "fucking", "shit", "bitch", "cunt", "dick", "pussy", "asshole", "slut", "whore", "nigger", "nigga", "faggot", "retard",
  // derja / ar (translitteration courante et arabe)
  "zebi", "zabi", "nayek", "nik", "miboun", "zok", "9a7ba", "kahba", "qahba", "كحبة", "قحبة", "زبي", "نيك", "زك", "ميبون",
];

const normalize = (s: string) =>
  s.toLowerCase()
    .normalize("NFD").replace(/[̀-ͯ]/g, "")
    .replace(/[0@]/g, "o").replace(/[1!|]/g, "i").replace(/3/g, "e").replace(/\$/g, "s");

/** Raison du signalement, ou null si le texte est propre. */
export function flagText(text: string, extra: string[] = []): string | null {
  if (!text.trim()) return null;
  if (/https?:\/\/|www\.|\.(com|net|org|tn|fr|io)\b/i.test(text)) return "lien";
  if (/(\+?\d[\d\s.-]{7,}\d)/.test(text)) return "numero";
  if (/@[a-z0-9_.]{3,}/i.test(text)) return "compte";
  const n = normalize(text);
  const words = new Set(n.split(/[^\p{L}\p{N}]+/u).filter(Boolean));
  for (const w of [...BASE, ...extra]) {
    const t = normalize(w);
    if (t.includes(" ") ? n.includes(t) : words.has(t)) return "mot";
  }
  return null;
}

/** Nettoie un texte libre : espaces, caracteres de controle, longueur. */
export function cleanText(s: unknown, max: number): string {
  if (typeof s !== "string") return "";
  return s.replace(/[\u0000-\u0008\u000b-\u001f\u007f​-‏‪-‮]/g, "")
    .replace(/\n{3,}/g, "\n\n").replace(/[ \t]{2,}/g, " ").trim().slice(0, max);
}
