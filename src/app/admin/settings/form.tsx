"use client";
import { useState } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Dropzone } from "@/components/admin/Dropzone";
import { settingsSchema } from "@/lib/schemas";
import { saveSettings } from "@/app/actions/settings";

type Clip = { url: string; poster?: string };

const FIELDS = ["name","tagline","description","email","phone","location","founder","artist_alias"] as const;
const SOCIALS = ["instagram","tiktok","linkedin","x","web"] as const;

export function SettingsForm({ initial }: { initial: Record<string, any> }) {
  const [d, setD] = useState<Record<string, any>>({
    ...initial,
    socials: initial.socials ?? {},
    hero_media: initial.hero_media ?? [],
  });
  const set = (k: string, v: any) => setD((s) => ({ ...s, [k]: v }));
  const setSocial = (k: string, v: any) => setD((s) => ({ ...s, socials: { ...s.socials, [k]: v } }));
  const clips: Clip[] = d.hero_media ?? [];
  const setClips = (v: Clip[]) => set("hero_media", v);
  const setClip = (i: number, patch: Partial<Clip>) =>
    setClips(clips.map((c, j) => (j === i ? { ...c, ...patch } : c)));
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
      <h2 className="mt-4 font-semibold">Hero videos</h2>
      <p className="-mt-2 text-xs text-muted-foreground">
        Background clips for the homepage hero. Paste a direct video URL (mp4 / webm) and an optional
        poster image. Multiple clips crossfade as a slider. Leave empty for the plain dark hero.
      </p>
      {clips.map((c, i) => (
        <div key={i} className="flex flex-col gap-2 rounded-md border border-border p-3">
          <Label>Video URL #{i + 1}</Label>
          <Input
            type="url"
            placeholder="https://…/clip.mp4"
            value={c.url ?? ""}
            onChange={(e) => setClip(i, { url: e.target.value })}
          />
          <Label className="mt-1">Poster image (optional)</Label>
          <Dropzone value={c.poster ?? ""} onChange={(url) => setClip(i, { poster: url })} />
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="self-start"
            onClick={() => setClips(clips.filter((_, j) => j !== i))}
          >
            Remove clip
          </Button>
        </div>
      ))}
      <Button
        type="button"
        variant="outline"
        className="self-start"
        onClick={() => setClips([...clips, { url: "", poster: "" }])}
      >
        + Add hero video
      </Button>

      <Button type="submit" className="mt-2">Save</Button>
    </form>
  );
}
