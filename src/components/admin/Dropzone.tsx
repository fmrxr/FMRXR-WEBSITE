"use client";
import { useState } from "react";
import { uploadImage } from "@/app/actions/media";
import { toast } from "sonner";

export function Dropzone({ value, onChange }: { value: string; onChange: (url: string) => void }) {
  const [busy, setBusy] = useState(false);
  async function handle(file: File) {
    setBusy(true);
    const fd = new FormData(); fd.set("file", file);
    const res = await uploadImage(fd);
    setBusy(false);
    if ("error" in res) { toast.error(res.error); return; }
    onChange(res.url); toast.success("Uploaded");
  }
  return (
    <div className="flex items-center gap-3">
      {value && <img src={value} alt="" className="h-16 w-16 rounded object-cover" />}
      <input type="file" accept="image/*" disabled={busy}
        onChange={(e) => e.target.files?.[0] && handle(e.target.files[0])} />
      {busy && <span className="text-sm text-muted-foreground">Uploading…</span>}
    </div>
  );
}
