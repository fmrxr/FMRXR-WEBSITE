"use client";
import { useState } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { settingsSchema } from "@/lib/schemas";
import { saveSettings } from "@/app/actions/settings";

const FIELDS = ["name","tagline","description","email","phone","location","founder","artist_alias"] as const;
const SOCIALS = ["instagram","tiktok","linkedin","x","web"] as const;

export function SettingsForm({ initial }: { initial: Record<string, any> }) {
  const [d, setD] = useState<Record<string, any>>({ ...initial, socials: initial.socials ?? {} });
  const set = (k: string, v: any) => setD((s) => ({ ...s, [k]: v }));
  const setSocial = (k: string, v: any) => setD((s) => ({ ...s, socials: { ...s.socials, [k]: v } }));
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = settingsSchema.safeParse(d);
    if (!parsed.success) { toast.error(parsed.error.issues[0].message); return; }
    try { await saveSettings(parsed.data); toast.success("Saved"); }
    catch (err: any) { toast.error(err.message); }
  }
  return (
    <form onSubmit={submit} className="flex max-w-2xl flex-col gap-4">
      <h1 className="text-2xl font-bold">Site settings</h1>
      {FIELDS.map((f) => (
        <div key={f} className="flex flex-col gap-1">
          <Label>{f}</Label>
          {f === "description" ? <Textarea value={d[f] ?? ""} onChange={(e) => set(f, e.target.value)} />
            : <Input value={d[f] ?? ""} onChange={(e) => set(f, e.target.value)} />}
        </div>
      ))}
      <h2 className="mt-4 font-semibold">Socials</h2>
      {SOCIALS.map((s) => (
        <div key={s} className="flex flex-col gap-1">
          <Label>{s}</Label>
          <Input value={d.socials?.[s] ?? ""} onChange={(e) => setSocial(s, e.target.value)} />
        </div>
      ))}
      <Button type="submit">Save</Button>
    </form>
  );
}
