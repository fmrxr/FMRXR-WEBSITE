"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dropzone } from "./Dropzone";

type Item = { url: string; alt: string; caption: string };

export function GalleryField({ value, onChange }: { value: Item[]; onChange: (v: Item[]) => void }) {
  const set = (i: number, patch: Partial<Item>) =>
    onChange(value.map((it, j) => j === i ? { ...it, ...patch } : it));
  return (
    <div className="flex flex-col gap-3">
      {value.map((it, i) => (
        <div key={i} className="flex flex-col gap-2 rounded border p-3">
          <Dropzone value={it.url} onChange={(url) => set(i, { url })} />
          <Input placeholder="Alt text" value={it.alt} onChange={(e) => set(i, { alt: e.target.value })} />
          <Input placeholder="Caption" value={it.caption} onChange={(e) => set(i, { caption: e.target.value })} />
          <Button type="button" variant="outline" onClick={() => onChange(value.filter((_, j) => j !== i))}>Remove</Button>
        </div>
      ))}
      <Button type="button" variant="outline" onClick={() => onChange([...value, { url: "", alt: "", caption: "" }])}>+ Image</Button>
    </div>
  );
}
