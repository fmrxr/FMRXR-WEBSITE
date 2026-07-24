"use client";

import { useOs } from "@/lib/os/store";
import { ImprovementPromptCard } from "@/components/os/aihub/ImprovementPromptCard";
import { CommandChips } from "@/components/os/aihub/CommandChips";
import { AgentsGrid } from "@/components/os/aihub/AgentsGrid";
import { SkillsGrid } from "@/components/os/aihub/SkillsGrid";
import { ConnectorsList } from "@/components/os/aihub/ConnectorsList";
import { Section } from "@/components/os/Section";

export default function AiWorkforcePage() {
  const { graph, loading, error } = useOs();

  if (loading) return <p className="fm-rise font-grotesk text-sm text-fmmuted">Chargement du graphe…</p>;
  if (error && !graph) return <p className="fm-rise font-grotesk text-sm text-[#ff4d5e]">{error}</p>;
  if (!graph) return null;

  return (
    <div className="fm-rise flex flex-col gap-6">
      <ImprovementPromptCard graph={graph} />

      <Section id="aihub-commands" title="Commandes à dire à Claude — clic = copier">
        <CommandChips />
      </Section>

      <Section id="aihub-agents" title="Agents actifs — automatisations">
        <AgentsGrid />
      </Section>

      <Section id="aihub-skills" title="Skills Claude opérationnels">
        <SkillsGrid tools={graph.tools || []} />
      </Section>

      <Section id="aihub-connectors" title="Connecteurs actifs">
        <ConnectorsList connectors={graph.connectors || []} />
      </Section>
    </div>
  );
}
