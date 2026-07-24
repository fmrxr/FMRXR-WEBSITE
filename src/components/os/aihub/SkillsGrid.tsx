import type { OsTool } from "@/lib/os/types";

interface SkillsGridProps {
  tools: OsTool[];
}

/** Skills Claude opérationnels — porte le filtre kind==='claude-skill' de RENDER.aihub. */
export function SkillsGrid({ tools }: SkillsGridProps) {
  const skills = tools.filter((t) => t.kind === "claude-skill");
  if (skills.length === 0) return <p className="font-grotesk text-sm text-fmmuted">Aucun skill enregistré.</p>;
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {skills.map((s) => (
        <div key={s.id} className="fm-glass-card rounded-2xl p-4">
          <span className="mb-2 inline-block rounded bg-fmaccent/15 px-1.5 py-0.5 font-mono text-[10px] text-fmaccent">skill</span>
          <div className="font-grotesk text-sm font-semibold text-fmfg">{s.name.replace(/^Skill /, "")}</div>
          <div className="mt-1 font-grotesk text-xs text-fmmuted">{s.purpose}</div>
        </div>
      ))}
    </div>
  );
}
