"use client";

import { useState } from "react";
import { useOs } from "@/lib/os/store";
import { ClientSegmentList } from "@/components/os/clients/ClientSegmentList";
import { PeopleGrid } from "@/components/os/clients/PeopleGrid";
import { ClientDrawer } from "@/components/os/clients/ClientDrawer";
import { Section } from "@/components/os/Section";

function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40);
}

export default function ClientsPage() {
  const { graph, loading, error, mutate, logChange } = useOs();
  const [creating, setCreating] = useState(false);
  const [name, setName] = useState("");
  const [segment, setSegment] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [openClientId, setOpenClientId] = useState<string | null>(null);

  if (loading) return <p className="fm-rise font-grotesk text-sm text-fmmuted">Chargement du graphe…</p>;
  if (error && !graph) return <p className="fm-rise font-grotesk text-sm text-[#ff4d5e]">{error}</p>;
  if (!graph) return null;

  const clients = graph.clients || [];
  const people = graph.people || [];
  const segments = Array.from(new Set(clients.map((c) => c.segment).filter((s): s is string => !!s)));

  function createClient() {
    if (!name.trim()) return;
    let id = slugify(name);
    let i = 2;
    while (clients.find((c) => c.id === id)) id = `${slugify(name)}-${i++}`;
    const created = {
      id,
      name: name.trim(),
      type: "client" as const,
      ...(segment ? { segment } : {}),
      ...(email.trim() ? { email: email.trim() } : {}),
      ...(phone.trim() ? { phone: phone.trim() } : {}),
    };
    mutate((draft) => {
      draft.clients = draft.clients || [];
      draft.clients.push(created);
    });
    logChange("create", id, `nouveau client : ${name.trim()}${segment ? ` (${segment})` : ""}`, { entityType: "client", snapshot: created });
    setName("");
    setSegment("");
    setEmail("");
    setPhone("");
    setCreating(false);
  }

  return (
    <div className="fm-rise flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="font-grotesk text-xs uppercase tracking-[0.16em] text-fmmuted">Clients & partenaires — {clients.length}</h1>
        <button
          type="button"
          onClick={() => setCreating((c) => !c)}
          className="rounded-lg border border-fmborder px-3 py-1.5 font-grotesk text-sm text-fmfg hover:border-fmaccent/40"
        >
          + Nouveau client
        </button>
      </div>

      {creating && (
        <div className="fm-glass-card flex flex-wrap items-center gap-2 rounded-2xl p-4">
          <input
            className="min-w-[200px] flex-1 rounded border border-fmborder bg-fmmutedbg px-3 py-1.5 font-grotesk text-sm text-fmfg"
            placeholder="Nom de l'entreprise ou de la personne"
            value={name}
            autoFocus
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="w-44 rounded border border-fmborder bg-fmmutedbg px-3 py-1.5 font-grotesk text-sm text-fmfg"
            placeholder="Segment"
            list="client-segments"
            value={segment}
            onChange={(e) => setSegment(e.target.value)}
          />
          <datalist id="client-segments">
            {segments.map((s) => (
              <option key={s} value={s} />
            ))}
          </datalist>
          <input
            className="w-44 rounded border border-fmborder bg-fmmutedbg px-3 py-1.5 font-grotesk text-sm text-fmfg"
            placeholder="Email (optionnel)"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="w-36 rounded border border-fmborder bg-fmmutedbg px-3 py-1.5 font-grotesk text-sm text-fmfg"
            placeholder="Téléphone (optionnel)"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <button type="button" className="fm-link font-grotesk text-sm text-fmaccent" onClick={createClient}>
            Ajouter
          </button>
          <button type="button" className="fm-link font-grotesk text-sm text-fmmuted" onClick={() => setCreating(false)}>
            Annuler
          </button>
        </div>
      )}

      <ClientSegmentList clients={clients} onOpenClient={setOpenClientId} />

      <Section id="clients-people" title={`Personnes clés — ${people.length}`}>
        <PeopleGrid people={people} />
      </Section>

      <ClientDrawer client={clients.find((c) => c.id === openClientId) ?? null} graph={graph} onClose={() => setOpenClientId(null)} />
    </div>
  );
}
