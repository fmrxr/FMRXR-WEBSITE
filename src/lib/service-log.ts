// Journal de bord d'un service : lignes « AAAA-MM-JJ · texte » ou « AAAA-MM · texte »
// (colonne services.log, migration 0025). Une ligne sans date valide est ignorée
// plutôt qu'affichée sans repère. Tri du plus récent au plus ancien.

export type LogEntry = { date: string; label: string; text: string };

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function parseLog(lines: readonly string[] | null | undefined): LogEntry[] {
  const out: LogEntry[] = [];
  for (const raw of lines ?? []) {
    const m = /^\s*(\d{4})-(\d{2})(?:-(\d{2}))?\s*[·:\-–]\s*(.+)$/.exec(raw);
    if (!m) continue;
    const [, y, mo, d, text] = m;
    const month = MONTHS[Number(mo) - 1];
    if (!month) continue;
    out.push({
      date: `${y}-${mo}-${d ?? "00"}`,
      label: d ? `${Number(d)} ${month} ${y}` : `${month} ${y}`,
      text: text.trim(),
    });
  }
  return out.sort((a, b) => b.date.localeCompare(a.date));
}
