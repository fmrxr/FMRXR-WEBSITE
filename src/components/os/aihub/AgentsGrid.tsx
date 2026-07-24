import { Card } from "../Card";

const AGENTS = [
  { emoji: "☀️", name: "Briefing quotidien", badge: "08h00", desc: "Agenda, emails urgents, priorités projets, veille new media art → dashboard.", href: undefined },
  { emoji: "📅", name: "Sync Google Calendar", badge: "08h15", desc: "Deadlines et tâches à échéance → événements calendrier, cochées → ✓.", href: undefined },
  {
    emoji: "💼",
    name: "BDM — Business Development Manager",
    badge: "lundi 08h30",
    desc: "Veille opportunités, relances, pipeline → module Pipeline + session à la demande.",
    href: "/os/pipeline",
  },
  { emoji: "📥", name: "Watcher workspace", badge: "actif", desc: "Nouveau fichier → classification auto + projet deviné → ajout au graphe en 1 clic.", href: undefined },
];

/** Automatisations actives — porte le bloc "Agents actifs" de RENDER.aihub. */
export function AgentsGrid() {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {AGENTS.map((a) => (
        <Card key={a.name} href={a.href} className="flex-col items-start gap-1.5">
          <div className="flex w-full items-center gap-2">
            <span className="font-grotesk text-sm font-semibold text-fmfg">
              {a.emoji} {a.name}
            </span>
            <span className="ml-auto rounded-full border border-fmaccent/30 px-2 py-0.5 font-mono text-[10px] text-fmaccent">{a.badge}</span>
          </div>
          <p className="font-grotesk text-xs text-fmmuted">{a.desc}</p>
        </Card>
      ))}
    </div>
  );
}
