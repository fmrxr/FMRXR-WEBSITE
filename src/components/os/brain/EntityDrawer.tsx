"use client";

import Link from "next/link";
import { GRAPH_TYPE_LABELS } from "@/lib/os/compute";
import type { GraphEdge, GraphEntity, GraphEntityType } from "@/lib/os/compute";
import type { OsGraph } from "@/lib/os/types";

const MODULE_LINK: Partial<Record<GraphEntityType, { href: string; label: string }>> = {
  project: { href: "/os/projets", label: "Voir dans Projets" },
  person: { href: "/os/clients", label: "Voir dans Clients" },
  client: { href: "/os/clients", label: "Voir dans Clients" },
  invoice: { href: "/os/finance", label: "Voir dans Finance" },
  quote: { href: "/os/finance", label: "Voir dans Finance" },
  asset: { href: "/os/studio", label: "Voir dans Studio & Assets" },
  tool: { href: "/os/studio", label: "Voir dans Studio & Assets" },
};

function Field({ label, value }: { label: string; value?: string | number | null }) {
  if (value == null || value === "") return null;
  return (
    <div>
      <div className="font-grotesk text-[10px] uppercase tracking-[0.1em] text-fmmuted">{label}</div>
      <div className="mt-0.5 font-grotesk text-sm text-fmfg">{value}</div>
    </div>
  );
}

interface EntityDrawerProps {
  graph: OsGraph;
  entity: GraphEntity | null;
  onClose: () => void;
  /** F3 — déclenche une question au Brain à propos de cette entité (ouvre le panneau Ask). */
  onExplain?: (entity: GraphEntity) => void;
  /** F4 — roster + liens visibles, pour lister "Liens" avec leur type de relation. */
  entities?: GraphEntity[];
  edges?: GraphEdge[];
  onOpenEntity?: (id: string) => void;
}

/** Panneau latéral ouvert au clic sur un nœud — porte openEnt() de RENDER.graph, en condensé. */
export function EntityDrawer({ graph, entity, onClose, onExplain, entities, edges, onOpenEntity }: EntityDrawerProps) {
  if (!entity) return null;

  const isGhost = entity.state === "ghost";
  const typeLabel = GRAPH_TYPE_LABELS.find(([t]) => t === entity.type)?.[1] || entity.type;
  const link = MODULE_LINK[entity.type];
  const entityById = new Map((entities || []).map((e) => [e.id, e]));
  const links = (edges || [])
    .filter((e) => e.a === entity.id || e.b === entity.id)
    .map((e) => {
      const otherId = e.a === entity.id ? e.b : e.a;
      return { id: otherId, name: entityById.get(otherId)?.name ?? otherId, kind: e.kind, derived: e.derived };
    })
    .filter((l) => entityById.has(l.id));
  // Historique complet de l'entité — F1.2 : chaque logChange (création, modifications, suppression)
  // tapé sur son id, dans l'ordre où c'est arrivé. Aucune nouvelle donnée : `log` porte déjà tout ça.
  const history = (graph.log || [])
    .filter((e) => e.entity === entity.id)
    .slice()
    .sort((a, b) => a.ts.localeCompare(b.ts));

  let extra: React.ReactNode = null;
  if (entity.type === "project") {
    const p = graph.projects.find((x) => x.id === entity.id);
    const client = p?.client ? graph.clients?.find((c) => c.id === p.client) : undefined;
    extra = (
      <>
        <Field label="Statut" value={p?.status} />
        <Field label="Priorité" value={p?.priority} />
        <Field label="Client" value={client?.name} />
        <Field label="Catégorie" value={p?.category} />
      </>
    );
  } else if (entity.type === "client") {
    const c = graph.clients?.find((x) => x.id === entity.id);
    extra = (
      <>
        <Field label="Segment" value={c?.segment} />
        <Field label="Email" value={c?.email} />
        <Field label="Téléphone" value={c?.phone} />
      </>
    );
  } else if (entity.type === "person") {
    const p = graph.people?.find((x) => x.id === entity.id);
    const org = p?.org ? (graph.identities.find((i) => i.id === p.org)?.name ?? graph.clients?.find((c) => c.id === p.org)?.name) : undefined;
    extra = (
      <>
        <Field label="Rôle" value={p?.role} />
        <Field label="Organisation" value={org} />
        <Field label="Email" value={p?.email} />
      </>
    );
  } else if (entity.type === "invoice") {
    const f = graph.finance.find((x) => x.id === entity.id);
    extra = (
      <>
        <Field label="Montant" value={f?.amount != null ? `${f.amount.toLocaleString("fr-FR")} ${f.currency}` : "à compléter"} />
        <Field label="Statut" value={f?.status} />
        <Field label="Émise" value={f?.issued} />
      </>
    );
  } else if (entity.type === "quote") {
    const q = graph.quotes?.find((x) => x.id === entity.id);
    extra = (
      <>
        <Field label="Montant" value={q ? `${q.amount.toLocaleString("fr-FR")} ${q.currency}` : undefined} />
        <Field label="Statut" value={q?.status} />
        <Field label="Émis" value={q?.issued} />
      </>
    );
  } else if (entity.type === "asset") {
    const a = graph.assets?.find((x) => x.id === entity.id);
    extra = (
      <>
        <Field label="Type" value={a?.kind} />
        <Field label="Fichier / lien" value={a?.file || a?.url} />
      </>
    );
  } else if (entity.type === "tool") {
    const t = graph.tools?.find((x) => x.id === entity.id);
    extra = (
      <>
        <Field label="Nature" value={t?.kind} />
        <Field label="Usage" value={t?.purpose} />
      </>
    );
  } else if (entity.type === "identity") {
    const i = graph.identities.find((x) => x.id === entity.id);
    extra = (
      <>
        <Field label="Rôle" value={i?.role} />
        <Field label="Tagline" value={i?.tagline} />
      </>
    );
  }

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/60" onClick={onClose} aria-hidden="true" />
      <aside className="fm-glass-card fixed inset-y-0 right-0 z-50 flex w-80 max-w-[90vw] flex-col gap-3 overflow-y-auto rounded-none border-y-0 border-r-0 p-5">
        <div className="flex items-start justify-between gap-2">
          <span className="font-grotesk text-[10px] uppercase tracking-[0.14em] text-fmmuted">{typeLabel}</span>
          <button type="button" onClick={onClose} aria-label="Fermer" className="text-fmmuted hover:text-fmfg">
            ✕
          </button>
        </div>
        <h2 className="font-display text-lg text-fmfg">{entity.name}</h2>

        {onExplain && (
          <button
            type="button"
            onClick={() => onExplain(entity)}
            className="self-start rounded-full border border-fmborder px-3 py-1 font-grotesk text-xs text-fmmuted hover:border-fmaccent/40 hover:text-fmaccent"
          >
            ✦ Expliquer ce nœud
          </button>
        )}

        {isGhost && (
          <div className="rounded-lg border border-fmborder bg-fmmutedbg/60 px-3 py-2">
            <p className="font-grotesk text-xs text-fmmuted">
              Supprimée{entity.lastSeen ? ` le ${new Date(entity.lastSeen).toLocaleDateString("fr-FR")}` : ""} — reconstruite depuis son
              dernier état connu, plus dans les tables vivantes.
            </p>
          </div>
        )}

        <div className="flex flex-col gap-3">{extra}</div>
        {link && !isGhost && (
          <Link href={link.href} className="fm-link mt-2 font-grotesk text-sm text-fmaccent">
            {link.label} →
          </Link>
        )}

        {links.length > 0 && (
          <div>
            <h3 className="mb-2 font-grotesk text-[10px] uppercase tracking-[0.1em] text-fmmuted">Liens — {links.length}</h3>
            <div className="flex flex-col gap-1.5">
              {links.map((l) => (
                <button
                  key={l.id}
                  type="button"
                  onClick={() => onOpenEntity?.(l.id)}
                  disabled={!onOpenEntity}
                  className="flex items-baseline justify-between gap-2 text-left font-grotesk text-xs text-fmfg hover:text-fmaccent disabled:hover:text-fmfg"
                >
                  <span className="truncate">{l.name}</span>
                  <span className={`shrink-0 text-[10px] ${l.derived ? "italic text-fmmuted/70" : "text-fmmuted"}`}>{l.kind}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {history.length > 0 && (
          <div>
            <h3 className="mb-2.5 font-grotesk text-[10px] uppercase tracking-[0.1em] text-fmmuted">Historique — {history.length}</h3>
            <div className="flex flex-col gap-3 border-l border-fmborder pl-3">
              {history.map((entry, i) => (
                <div key={i}>
                  <div className="font-mono text-[10px] text-fmmuted">
                    {new Date(entry.ts).toLocaleDateString("fr-FR", { day: "2-digit", month: "short", year: "numeric" })}
                  </div>
                  <div className="font-grotesk text-xs text-fmfg">{entry.detail}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
