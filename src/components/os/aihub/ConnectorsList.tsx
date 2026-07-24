interface ConnectorsListProps {
  connectors: string[];
}

/** Connecteurs Cowork actifs — porte le bloc "Connecteurs actifs" de RENDER.aihub. */
export function ConnectorsList({ connectors }: ConnectorsListProps) {
  if (connectors.length === 0) return <p className="font-grotesk text-sm text-fmmuted">Aucun connecteur enregistré.</p>;
  return (
    <div className="flex flex-wrap gap-1.5">
      {connectors.map((c) => (
        <span key={c} className="rounded-full border border-fmborder px-3 py-1 font-grotesk text-xs text-fmmuted">
          {c}
        </span>
      ))}
    </div>
  );
}
