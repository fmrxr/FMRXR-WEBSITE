// FMRXR OS — types fidèles au contrat de données knowledge-graph (voir OS_REBUILD_PROMPT.md §3).
// Le doc réel (os_graph.data) ne contient pas encore `agents`/`workflows` : optionnels partout,
// à lire avec `?? []` côté consommateurs (voir compute.ts / store.tsx).

export type Currency = "TND" | "EUR";

export type IdentityId = "fmrxr-studio" | "effet-mere" | "haifa" | "explab" | (string & {});

export interface OsIdentity {
  id: IdentityId;
  name: string;
  type: "identity";
  role?: string;
  tagline?: string;
  logo?: string;
  web?: string;
  since?: number;
  kind?: "business" | "alias" | "personne" | "collectif";
  billed_through?: string;
  concept?: string;
  folder?: string;
  folder_local?: string;
  colors?: { primary?: string; secondary?: string; bg?: string };
}

export interface OsBusiness {
  id: string;
  name: string;
  fiscal?: {
    regime?: string;
    matricule_fiscal?: string;
    plafond_annuel?: number;
  };
}

export type ProjectStatus = "active" | "delivered" | "archived" | "paused" | (string & {});
export type Priority = "critical" | "high" | "medium" | "low" | (string & {});

export interface ProjectScope {
  objectifs?: string;
  perimetre?: string;
  livrables?: string[];
  ressources?: string;
  risques?: string;
  start?: string;
  end?: string;
  timeline?: string;
}

export interface OsProject {
  id: string;
  name: string;
  type: "project";
  status: ProjectStatus;
  identity?: IdentityId[];
  client?: string;
  category?: string;
  priority?: Priority;
  date?: string;
  notes?: string;
  scope?: ProjectScope;
  fiche_tech?: string;
  [k: string]: unknown;
}

export interface OsPerson {
  id: string;
  name: string;
  type: "person";
  role?: string;
  email?: string;
  phone?: string;
  notes?: string;
}

export interface OsClient {
  id: string;
  name: string;
  type: "client";
  segment?: string;
  email?: string;
  web?: string;
  notes?: string;
}

export type InvoiceStatus = "draft" | "sent" | "partial" | "paid" | "late" | "disputed";

export interface OsInvoice {
  id: string;
  ref?: string;
  type: "invoice";
  client?: string;
  project?: string;
  business_id?: string;
  label?: string;
  amount: number;
  currency: Currency;
  advance?: number;
  status: InvoiceStatus;
  issued?: string;
  paid_date?: string;
  notes?: string;
}

export type QuoteStatus = "draft" | "sent" | "accepted" | "rejected" | "expired";

export interface OsQuote {
  id: string;
  ref?: string;
  client?: string;
  amount: number;
  currency: Currency;
  status: QuoteStatus;
  issued?: string;
}

export interface OsExpense {
  id: string;
  label: string;
  amount: number;
  currency: Currency;
  date: string;
  category?: string;
  recurring?: boolean;
}

export interface OsTask {
  id: string;
  label: string;
  project?: string;
  owner?: string;
  due?: string;
  done: boolean;
}

export interface OsDeadline {
  id: string;
  date: string;
  label: string;
  project?: string;
  critical?: boolean;
  owner?: string;
  done?: boolean;
}

export interface OsAsset {
  id: string;
  [k: string]: unknown;
}

export interface OsTool {
  id: string;
  name: string;
  cat?: string;
  notes?: string;
}

export interface OsRelation {
  from: string;
  to: string;
  rel: string;
}

export type OpportunityType = "open-call" | "festival" | "brand" | "venue" | "grant" | (string & {});
export type OpportunityStatus = "lead" | "contact" | "proposal" | "won" | "lost" | "expired";

export interface OsOpportunity {
  id: string;
  name: string;
  type: OpportunityType;
  identity?: IdentityId;
  status: OpportunityStatus;
  deadline?: string;
  url?: string;
  found?: string;
  source?: string;
  notes?: string;
}

export interface OsKpi {
  id: string;
  name: string;
  unit?: string;
  target?: number;
  dir: "min" | "max";
  auto?: string;
  value?: number;
}

export interface OsOkrKeyResult {
  id: string;
  label: string;
  target: number;
  value: number;
  unit?: string;
  auto?: "ca_quarter" | (string & {});
}

export interface OsOkr {
  id: string;
  quarter: string;
  objective: string;
  identity?: IdentityId;
  krs: OsOkrKeyResult[];
}

export type CfStage = "attente" | "ingere" | "montage" | "decline" | "livre";

export interface OsCfBatch {
  id: string;
  name: string;
  project?: string;
  source?: string;
  stage: CfStage;
  note?: string;
}

export interface OsStackPrompt {
  id: string;
  [k: string]: unknown;
}
export interface OsStackPreset {
  id: string;
  [k: string]: unknown;
}
export interface OsStack {
  prompts: OsStackPrompt[];
  presets: OsStackPreset[];
  tools: OsTool[];
}

export interface OsLogEntry {
  ts: string;
  action: string;
  entity: string;
  detail: string;
  by: string;
  synced: boolean;
}

export interface OsMeta {
  seq?: Record<string, number>;
  eur_tnd?: number;
  updated?: string;
  updated_by?: string;
  cal_sync?: unknown;
  [k: string]: unknown;
}

// --- Objets ABOS (prévus dès Phase A, vides tant que les vagues B→D ne sont pas livrées) ---

export type AgentRole =
  | "ceo" | "coo" | "finance" | "studio" | "content" | "developer" | "bdm" | "marketing" | "assistant" | "research";

export interface OsAgentCapability {
  action: string;
  mode: "propose" | "act";
}

export interface OsAgent {
  id: string;
  role: AgentRole;
  name: string;
  mission: string;
  persona_ref?: string;
  tools: string[];
  scope: { businesses?: string[]; modules?: string[] };
  capabilities: OsAgentCapability[];
  memory_ref?: string;
  history?: { ts: string; action: string; result: string }[];
}

export interface OsWorkflowStep {
  id: string;
  type: string;
  params: Record<string, unknown>;
  requires_approval?: boolean;
}

export interface OsWorkflowTrigger {
  type: "event" | "schedule" | "manual";
  event?: string;
  cron?: string;
}

export interface OsWorkflowRun {
  ts: string;
  status: "ok" | "failed" | "awaiting_approval";
  detail?: string;
}

export interface OsWorkflow {
  id: string;
  name: string;
  trigger: OsWorkflowTrigger;
  conditions?: unknown[];
  steps: OsWorkflowStep[];
  enabled: boolean;
  runs?: OsWorkflowRun[];
}

// --- Le document racine ---

export interface OsGraph {
  identities: OsIdentity[];
  businesses?: OsBusiness[];
  projects: OsProject[];
  people?: OsPerson[];
  clients?: OsClient[];
  finance: OsInvoice[];
  quotes?: OsQuote[];
  expenses?: OsExpense[];
  tasks: OsTask[];
  deadlines: OsDeadline[];
  assets?: OsAsset[];
  tools?: OsTool[];
  relations?: OsRelation[];
  bdm?: { opportunities: OsOpportunity[] };
  kpis?: OsKpi[];
  okrs?: OsOkr[];
  cf_batches?: OsCfBatch[];
  stack?: OsStack;
  library?: unknown[];
  trash?: unknown[];
  log: OsLogEntry[];
  meta: OsMeta;
  /** ABOS — vide en Phase A, typé pour éviter toute repeinture (§0.b, §3). */
  agents?: OsAgent[];
  /** ABOS — vide en Phase A, typé pour éviter toute repeinture (§0.b, §3). */
  workflows?: OsWorkflow[];
}
