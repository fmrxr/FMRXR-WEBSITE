// Filtre automatique des messages du Live Wall.
//
// Trois issues, decidees ici, appliquees par /api/wall/post et /comment :
//   ok    : rien a signaler, le message monte (en moderation automatique) ;
//   doubt : le filtre n'est pas sur, le message attend l'equipe ;
//   block : un mot de la base BLOCK est la, sans ambiguite. Le message
//           n'est pas publie : il part dans « Masqués », ou l'equipe peut
//           le repecher si c'est un faux positif.
//
// Le doute est large expres. Un faux positif coute une validation, un
// faux negatif coute un mot cru sur l'ecran d'une marque. Est un doute :
//   un mot a double sens (base DOUBT) ;
//   un mot interdit ecrit de travers : lettres doublees, masque (f*ck),
//     lettres separees (f.u.c.k) au moins en partie, une lettre de difference ;
//   un mot interdit cache dans un mot plus long ;
//   un lien, un numero de telephone, un @compte.
// La base de mots (francais, anglais, arabe, derja en arabizi et en
// lettres arabes) vit dans banned-words.ts.

import { BLOCK, DOUBT, SAFE } from "./banned-words";

export type Level = "ok" | "doubt" | "block";
export type Verdict = { level: Level; reason: string | null; word?: string };

// ---------- normalisation ----------

// Lettres d'autres alphabets qui ressemblent aux latines (а cyrillique...).
const HOMO: Record<string, string> = { "а": "a", "е": "e", "о": "o", "р": "p", "с": "c", "у": "y", "х": "x", "і": "i", "ѕ": "s", "ј": "j", "ԁ": "d", "ɡ": "g", "ⅼ": "l" };
// Chiffres et signes mis a la place des lettres. Pas applique sur la forme
// « arabizi », ou 3, 5, 7, 9 sont des lettres.
const LEET: Record<string, string> = { "0": "o", "1": "i", "3": "e", "4": "a", "5": "s", "7": "t", "8": "b", "@": "a", "$": "s", "!": "i", "|": "i", "€": "e" };

function base(s: string) {
  return s.toLowerCase()
    .normalize("NFD").replace(/[̀-ͯ]/g, "")
    .replace(/[аеорсухіѕјԁɡⅼ]/g, (c) => HOMO[c] ?? c)
    // arabe : diacritiques, tatweel, formes de l'alif, ta marbuta, alif maqsura
    .replace(/[ً-ٰٟـ]/g, "")
    .replace(/[أإآٱ]/g, "ا").replace(/ة/g, "ه").replace(/ى/g, "ي").replace(/ؤ/g, "و").replace(/ئ/g, "ي");
}
const leet = (s: string) => s.replace(/[0134578@$!|€]/g, (c) => LEET[c] ?? c);
const squeeze = (s: string, min: number) => s.replace(new RegExp(`(.)\\1{${min - 1},}`, "gu"), "$1");
const isArabic = (s: string) => /[؀-ۿ]/.test(s);
// Prefixes colles aux mots arabes : et, avec, de, l'article, o.
// Il doit rester au moins trois lettres : « بكس » ne devient pas « كس ».
const AR_PREFIX = /^(وال|بال|فال|كال|لل|ال|يا|و|ف|ب|ل|ك)(?=.{3,})/u;

type Term = { t: string; stem: boolean; phrase: boolean; level: "doubt" | "block" };
function compile(list: string[], level: "doubt" | "block"): Term[] {
  return list.map((w) => {
    const stem = w.endsWith("*");
    const t = base(stem ? w.slice(0, -1) : w).trim();
    return { t, stem, phrase: /\s/.test(t), level };
  });
}
const TERMS = [...compile(BLOCK, "block"), ...compile(DOUBT, "doubt")];
const SAFE_SET = new Set(SAFE.map(base));

function lev1(a: string, b: string) {
  // distance d'edition <= 1 (une lettre ajoutee, retiree, changee ou deux lettres inversees)
  if (Math.abs(a.length - b.length) > 1) return false;
  let i = 0;
  while (i < a.length && i < b.length && a[i] === b[i]) i++;
  if (i === a.length || i === b.length) return Math.abs(a.length - b.length) <= 1;
  return a.slice(i + 1) === b.slice(i + 1) || a.slice(i + 1) === b.slice(i) || a.slice(i) === b.slice(i + 1)
    || (a[i] === b[i + 1] && a[i + 1] === b[i] && a.slice(i + 2) === b.slice(i + 2));
}

// ---------- verdict ----------

export function assess(text: string, extra: string[] = []): Verdict {
  if (!text || !text.trim()) return { level: "ok", reason: null };
  let worst: Verdict = { level: "ok", reason: null };
  const raise = (level: "doubt" | "block", reason: string, word?: string) => {
    if (level === "block" || worst.level === "ok") worst = { level, reason, word };
  };
  const terms = [...TERMS, ...compile(extra.filter(Boolean), "block")];

  // Emoji : cherches dans le texte brut.
  for (const term of terms) if (/\p{Extended_Pictographic}/u.test(term.t) && text.includes(term.t)) raise(term.level, term.level === "block" ? "bloque" : "mot", term.t);

  if (/https?:\/\/|www\.|\b[a-z0-9-]+\.(com|net|org|tn|fr|io|me|co|ly|gg)\b/i.test(text)) raise("doubt", "lien");
  if (/(\+?\d[\d\s.-]{7,}\d)/.test(text)) raise("doubt", "numero");
  if (/(^|\s)@[a-z0-9_.]{3,}/i.test(text)) raise("doubt", "compte");

  const b = base(text);
  // Trois lectures du texte : telle quelle, chiffres lus comme des lettres,
  // et lettres repetees ramenees a une (« fuuuuck »).
  const readings = [b, leet(b)];
  const tokensOf = (s: string) => s.split(/[^\p{L}\p{N}]+/u).filter(Boolean);
  const exact = new Set<string>();
  for (const r of readings) for (const t of tokensOf(r)) {
    exact.add(t); exact.add(squeeze(t, 3));
    if (isArabic(t)) exact.add(t.replace(AR_PREFIX, ""));
  }
  const loose = new Set([...exact].map((t) => squeeze(t, 2))); // « fuuck », « connnard »
  // Lettres separees : « f u c k », « f.u.c.k », « p-u-t-e »
  for (const r of readings) {
    const singles = r.match(/(?:^|[^\p{L}\p{N}])((?:[\p{L}\p{N}][\s.\-_*·•]+){2,}[\p{L}\p{N}])(?=$|[^\p{L}\p{N}])/gu) ?? [];
    for (const m of singles) exact.add(m.replace(/[^\p{L}\p{N}]/gu, ""));
  }
  // Mots masques : « f*ck », « p#te », « s**t »
  const masked = (b.match(/[\p{L}\p{N}]*[*#]+[\p{L}\p{N}*#]*/gu) ?? []).filter((m) => /[\p{L}\p{N}]/u.test(m));
  const spaced = ` ${readings.map((r) => tokensOf(r).join(" ")).join(" | ")} `;

  for (const term of terms) {
    const { t } = term;
    if (!t || /\p{Extended_Pictographic}/u.test(t)) continue;
    if (term.phrase) {
      if (spaced.includes(` ${t} `) || spaced.includes(` ${squeeze(t, 2)} `)) raise(term.level, term.level === "block" ? "bloque" : "mot", t);
      continue;
    }
    const short = t.length < 4;
    // Premiere passe, sur toutes les lectures : le mot lui-meme ou une de ses
    // formes. Elle passe avant les ressemblances, sinon « conn4rd » s'arretait
    // au doute (« une lettre de difference ») avant que sa lecture « connard »
    // ne soit regardee.
    let hit = false;
    for (const tok of exact) {
      if (tok === t) { raise(term.level, term.level === "block" ? "bloque" : "mot", t); hit = true; break; }
      if (term.stem && tok.startsWith(t)) {
        // une forme proche (pluriel, feminin, conjugaison) a le niveau du mot ;
        // un mot bien plus long qui commence pareil n'est qu'un doute
        raise(tok.length - t.length <= 4 ? term.level : "doubt", tok.length - t.length <= 4 && term.level === "block" ? "bloque" : "mot", t);
        hit = true;
        break;
      }
    }
    if (worst.level === "block") return worst;
    // Seconde passe : les ressemblances, qui ne donnent jamais qu'un doute.
    if (!hit) for (const tok of exact) {
      if (SAFE_SET.has(tok)) continue; // mot courant : seule l'egalite exacte compte
      // cache dans un mot plus long (« Scunthorpe » reste un doute, pas un
      // blocage). Six lettres au moins : « pute » est dans « député » et
      // « réputé », « nique » dans « unique », « technique », « musique ».
      if (term.level === "block" && t.length >= 6 && tok.length > t.length && tok.includes(t)) { raise("doubt", "mot", t); break; }
      // une lettre de difference, seulement sur les mots interdits sans
      // ambiguite et assez longs : sinon « mère » passe pour « merde » et
      // « connu » pour « conne ».
      if (term.level === "block" && t.length >= 6 && tok.length >= 6 && !isArabic(t) && lev1(tok, t)) { raise("doubt", "mot", t); break; }
    }
    if (!short) for (const tok of loose) if (!SAFE_SET.has(tok) && (tok === squeeze(t, 2) || (term.stem && tok.startsWith(squeeze(t, 2))))) { raise("doubt", "mot", t); break; }
    for (const m of masked) {
      const re = new RegExp(`^${m.replace(/[*#]+/g, ".+").replace(/[.](?![+])/g, "\\.")}$`, "u");
      if (t.length >= 3 && re.test(t)) { raise("doubt", "mot", t); break; }
    }
  }
  return worst;
}

/** Raison du signalement, ou null si le texte est propre (compatibilite). */
export function flagText(text: string, extra: string[] = []): string | null {
  return assess(text, extra).reason;
}

/** Nettoie un texte libre : espaces, caracteres de controle, longueur. */
export function cleanText(s: unknown, max: number): string {
  if (typeof s !== "string") return "";
  return s
    // Caracteres de controle et marques de direction invisibles.
    .replace(/[\u0000-\u0008\u000b-\u001f\u007f​-‏‪-‮]/g, "")
    // U+FFFD, le losange noir a point d'interrogation. Il ne se tape pas :
    // il apparait quand des octets ont ete lus dans le mauvais encodage,
    // avant meme d'arriver ici. Un navigateur envoie toujours de l'UTF-8,
    // mais un envoi fabrique a la main peut en porter, et le mur l'
    // afficherait tel quel sur l'ecran geant, au milieu de la soiree du
    // client. On le retire plutot que de refuser le message entier.
    .replace(/�/g, "")
    .replace(/\n{3,}/g, "\n\n").replace(/[ \t]{2,}/g, " ").trim().slice(0, max);
}
