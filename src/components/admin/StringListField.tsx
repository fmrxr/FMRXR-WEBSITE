"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function StringListField({ value, onChange }: { value: string[]; onChange: (v: string[]) => void }) {
  return (
    <div className="flex flex-col gap-2">
      {value.map((item, i) => (
        <div key={i} className="flex gap-2">
          <Input value={item} onChange={(e) => onChange(value.map((v, j) => j === i ? e.target.value : v))} />
          <Button type="button" variant="outline" onClick={() => onChange(value.filter((_, j) => j !== i))}>×</Button>
        </div>
      ))}
      <Button type="button" variant="outline" onClick={() => onChange([...value, ""])}>+ Add</Button>
    </div>
  );
}
