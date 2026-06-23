"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Dropzone } from "./Dropzone";
import { StringListField } from "./StringListField";
import { ParagraphsField } from "./ParagraphsField";
import { GalleryField } from "./GalleryField";
import { ENTITIES } from "@/lib/entities";
import { createEntity, updateEntity } from "@/app/actions/crud";

export function EntityForm({ entityKey, initial, id }: {
  entityKey: string; initial: Record<string, any>; id?: string;
}) {
  const config = ENTITIES[entityKey];
  const router = useRouter();
  const [data, setData] = useState<Record<string, any>>(initial);
  const set = (k: string, v: any) => setData((d) => ({ ...d, [k]: v }));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = config.schema.safeParse(data);
    if (!parsed.success) { toast.error(parsed.error.issues[0].message); return; }
    try {
      if (id) await updateEntity(config.key, id, parsed.data);
      else await createEntity(config.key, parsed.data);
      toast.success("Saved");
      router.push(`/admin/${config.key}`);
    } catch (err: any) { toast.error(err.message ?? "Save failed"); }
  }

  return (
    <form onSubmit={submit} className="flex max-w-2xl flex-col gap-5">
      {config.fields.map((f) => (
        <div key={f.name} className="flex flex-col gap-2">
          <Label>{f.label}</Label>
          {f.type === "text" || f.type === "slug" ? (
            <Input value={data[f.name] ?? ""} onChange={(e) => set(f.name, e.target.value)} />
          ) : f.type === "textarea" ? (
            <Textarea rows={4} value={data[f.name] ?? ""} onChange={(e) => set(f.name, e.target.value)} />
          ) : f.type === "string-list" ? (
            <StringListField value={data[f.name] ?? []} onChange={(v) => set(f.name, v)} />
          ) : f.type === "paragraphs" ? (
            <ParagraphsField value={data[f.name] ?? []} onChange={(v) => set(f.name, v)} />
          ) : f.type === "image" ? (
            <Dropzone value={data[f.name] ?? ""} onChange={(v) => set(f.name, v)} />
          ) : f.type === "gallery" ? (
            <GalleryField value={data[f.name] ?? []} onChange={(v) => set(f.name, v)} />
          ) : null}
        </div>
      ))}
      {config.publishable && (
        <div className="flex items-center gap-2">
          <Switch checked={!!data.published} onCheckedChange={(v) => set("published", v)} />
          <Label>Published</Label>
        </div>
      )}
      <Button type="submit">Save</Button>
    </form>
  );
}
