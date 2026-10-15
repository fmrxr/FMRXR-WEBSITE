"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { createCampaign, updateCampaign, type CampaignRow } from "@/app/actions/photobooth";
import { DEFAULT_CONFIG, resolveConfig, type CampaignConfig } from "@/lib/photobooth/config";
import { ConfigEditor } from "./ConfigEditor";

// Datetime-local attend "AAAA-MM-JJTHH:MM" en heure locale.
const toLocal = (iso: string | null) => {
  if (!iso) return "";
  const d = new Date(iso);
  return new Date(d.getTime() - d.getTimezoneOffset() * 60_000).toISOString().slice(0, 16);
};

// Une configuration enregistree mais devenue invalide s'ouvre quand meme :
// l'editeur repart des valeurs par defaut, fusionnees avec ce qui est lisible.
function initialConfig(raw: unknown): CampaignConfig {
  const r = resolveConfig(raw ?? {});
  return r.ok ? r.config : { ...DEFAULT_CONFIG, ...(raw as object) } as CampaignConfig;
}

export function CampaignForm({ initial }: { initial?: CampaignRow }) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [f, setF] = useState({
    slug: initial?.slug ?? "",
    name: initial?.name ?? "",
    client_name: initial?.client_name ?? "",
    status: initial?.status ?? "draft",
    quota_limit: String(initial?.quota_limit ?? 100),
    daily_quota_limit: initial?.daily_quota_limit != null ? String(initial.daily_quota_limit) : "",
    max_concurrent: String(initial?.max_concurrent ?? 3),
    spending_limit_usd: initial?.spending_limit_musd != null ? String(initial.spending_limit_musd / 1000) : "",
    reserve_cost_usd: String((initial?.reserve_cost_musd ?? 250) / 1000),
    warning_threshold: String(initial?.warning_threshold ?? 70),
    critical_threshold: String(initial?.critical_threshold ?? 90),
    starts_at: toLocal(initial?.starts_at ?? null),
    expires_at: toLocal(initial?.expires_at ?? null),
  });
  const [config, setConfig] = useState<CampaignConfig>(() => initialConfig(initial?.config));
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setF((s) => ({ ...s, [k]: e.target.value }));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const payload = { ...f, config: JSON.stringify(config) };
    const r = initial ? await updateCampaign(initial.id, payload) : await createCampaign(payload);
    setSaving(false);
    if ("error" in r) return void toast.error(r.error);
    toast.success("Enregistré");
    router.push(initial ? `/admin/photobooth/${initial.id}` : `/admin/photobooth/${(r as { id: string }).id}`);
    router.refresh();
  }

  const field = (label: string, k: keyof typeof f, props: React.InputHTMLAttributes<HTMLInputElement> = {}, hint?: string) => (
    <div className="flex flex-col gap-2">
      <Label>{label}</Label>
      <Input value={f[k]} onChange={set(k)} {...props} />
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </div>
  );

  return (
    <form onSubmit={submit} className="flex max-w-3xl flex-col gap-6">
      <div className="grid gap-5 md:grid-cols-2">
        {field("Nom de la campagne", "name", { required: true })}
        {field("Client", "client_name")}
        {field("Slug (URL de la borne)", "slug", { required: true, pattern: "[a-z0-9][a-z0-9\\-]{1,60}" })}
        <div className="flex flex-col gap-2">
          <Label>Statut</Label>
          <select value={f.status} onChange={set("status")} className="h-9 rounded-md border bg-transparent px-3 text-sm">
            <option value="draft">Brouillon</option>
            <option value="active">Active</option>
            <option value="suspended">Suspendue</option>
            <option value="ended">Terminée</option>
          </select>
        </div>
      </div>

      <fieldset className="grid gap-5 rounded-lg border p-4 md:grid-cols-3">
        <legend className="px-1 text-sm font-medium">Forfait</legend>
        {field("Quota d’images", "quota_limit", { type: "number", min: 0, required: true }, "Images réussies autorisées")}
        {field("Limite par jour", "daily_quota_limit", { type: "number", min: 0 }, "Vide = sans limite")}
        {field("Générations simultanées", "max_concurrent", { type: "number", min: 1, max: 50 })}
        {field("Plafond budgétaire ($)", "spending_limit_usd", { type: "number", min: 0, step: "0.01" }, "Vide = sans plafond")}
        {field("Coût réservé par image ($)", "reserve_cost_usd", { type: "number", min: 0, step: "0.001" }, "Estimation prudente, retenue avant chaque appel")}
        <div />
        {field("Alerte à (%)", "warning_threshold", { type: "number", min: 1, max: 100 })}
        {field("Alerte critique à (%)", "critical_threshold", { type: "number", min: 1, max: 100 })}
      </fieldset>

      <div className="grid gap-5 md:grid-cols-2">
        {field("Début", "starts_at", { type: "datetime-local" })}
        {field("Fin (expiration automatique)", "expires_at", { type: "datetime-local" })}
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-semibold">Expérience</h2>
        <ConfigEditor value={config} onChange={setConfig} />
      </div>

      <div className="flex gap-3">
        <Button type="submit" disabled={saving}>{saving ? "Enregistrement…" : "Enregistrer"}</Button>
        <Button type="button" variant="ghost" onClick={() => router.back()}>Annuler</Button>
      </div>
    </form>
  );
}
