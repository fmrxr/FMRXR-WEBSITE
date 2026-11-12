// L'année la plus récente d'un champ « year » libre : « 2026 », « 2021–2022 »,
// « 2026–present ». Sert à trier les projets du plus récent au plus ancien.
export function lastYear(year: string | null | undefined): number {
  if (!year) return 0;
  if (/present/i.test(year)) return new Date().getFullYear();
  const all = year.match(/\d{4}/g);
  return all ? Math.max(...all.map(Number)) : 0;
}
