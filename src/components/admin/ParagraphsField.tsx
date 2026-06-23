"use client";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export function ParagraphsField({ value, onChange }: { value: string[]; onChange: (v: string[]) => void }) {
  return (
    <div className="flex flex-col gap-2">
      {value.map((p, i) => (
        <div key={i} className="flex gap-2">
          <Textarea value={p} rows={3} onChange={(e) => onChange(value.map((v, j) => j === i ? e.target.value : v))} />
          <Button type="button" variant="outline" onClick={() => onChange(value.filter((_, j) => j !== i))}>×</Button>
        </div>
      ))}
      <Button type="button" variant="outline" onClick={() => onChange([...value, ""])}>+ Paragraph</Button>
    </div>
  );
}
