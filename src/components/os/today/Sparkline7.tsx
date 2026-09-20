/**
 * Courbe courte d'activité. Rend `null` quand la série n'a pas pu être dérivée du journal :
 * une courbe inventée vaut moins que pas de courbe du tout.
 */
export function Sparkline7({ series, label }: { series: number[] | null; label: string }) {
  if (!series || series.length === 0) return null;
  const max = Math.max(...series, 1);

  return (
    <div className="mt-2.5 flex h-4 items-end gap-[3px]" role="img" aria-label={label}>
      {series.map((v, i) => (
        <span
          key={i}
          className={`block w-[5px] rounded-[1px] ${i === series.length - 1 ? "bg-fmaccent" : "bg-fmmutedbg"}`}
          style={{ height: `${Math.max(12, (v / max) * 100)}%` }}
        />
      ))}
    </div>
  );
}
