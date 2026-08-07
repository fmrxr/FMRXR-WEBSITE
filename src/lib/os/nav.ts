// FMRXR OS — navigation orientée flux (§6 du brief). Les `id` sont identiques à ceux du
// monolithe (`const MODULES` dans FMRXR_OS.html) pour que les deep-links /os/legacy#<id>
// retombent sur le bon écran. Les `href`/labels suivent les renommages §6 (Clients, Pipeline,
// Brain, Knowledge, AI Workforce) et le plan de fichiers cible (§1.b) — folders déjà renommés.

export type OsNavGroup = "Command Center" | "Work" | "Business" | "Creation" | "Knowledge" | "AI Workforce";

export const NAV_GROUPS: OsNavGroup[] = ["Command Center", "Work", "Business", "Creation", "Knowledge", "AI Workforce"];

export interface OsNavModule {
  /** id technique du monolithe — sert de hash pour /os/legacy#<id> */
  id: string;
  label: string;
  group: OsNavGroup;
  phase: "A" | "B" | "C" | "D";
  /** true une fois la page native /os/<slug> livrée */
  native: boolean;
  /** route Next à utiliser dans la sidebar */
  href: string;
}

export const OS_MODULES: OsNavModule[] = [
  { id: "today", label: "Today", group: "Command Center", phase: "A", native: true, href: "/os/today" },
  { id: "dashboard", label: "Dashboard", group: "Command Center", phase: "B", native: true, href: "/os/dashboard" },
  { id: "okr", label: "OKR", group: "Command Center", phase: "B", native: true, href: "/os/okr" },
  { id: "projets", label: "Projets", group: "Work", phase: "B", native: true, href: "/os/projets" },
  { id: "taches", label: "Tâches", group: "Work", phase: "B", native: true, href: "/os/taches" },
  { id: "agenda", label: "Agenda", group: "Work", phase: "B", native: true, href: "/os/agenda" },
  { id: "crm", label: "Clients", group: "Business", phase: "C", native: true, href: "/os/clients" },
  { id: "bdm", label: "Pipeline", group: "Business", phase: "C", native: true, href: "/os/pipeline" },
  { id: "finance", label: "Finance", group: "Business", phase: "C", native: true, href: "/os/finance" },
  { id: "studio", label: "Studio & Assets", group: "Creation", phase: "D", native: true, href: "/os/studio" },
  { id: "content-factory", label: "Content Factory", group: "Creation", phase: "D", native: true, href: "/os/content-factory" },
  { id: "vj-studio", label: "VJ Studio", group: "Creation", phase: "D", native: true, href: "/os/vj-studio" },
  { id: "graph", label: "Brain", group: "Knowledge", phase: "D", native: true, href: "/os/brain" },
  { id: "stack", label: "Knowledge", group: "Knowledge", phase: "D", native: true, href: "/os/knowledge" },
  { id: "aihub", label: "AI Workforce", group: "AI Workforce", phase: "D", native: true, href: "/os/ai-workforce" },
];

export function modulesByGroup(): Array<{ group: OsNavGroup; modules: OsNavModule[] }> {
  return NAV_GROUPS.map((group) => ({ group, modules: OS_MODULES.filter((m) => m.group === group) }));
}

export function moduleByHref(pathname: string): OsNavModule | undefined {
  return OS_MODULES.find((m) => pathname === m.href || pathname.startsWith(m.href + "/"));
}

/** Lien vers l'ancienne version (monolithe), positionné sur le bon module via hash. */
export function legacyHref(moduleId: string): string {
  return `/os/legacy#${moduleId}`;
}
