"use client";
import { useRef, useState } from "react";
import { uploadImage } from "@/app/actions/media";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const MAX_MB = 10;

export function Dropzone({ value, onChange }: { value: string; onChange: (url: string) => void }) {
  const [busy, setBusy] = useState(false);
  const [drag, setDrag] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  async function upload(file: File) {
    if (!file.type.startsWith("image/")) {
      toast.error("Please choose an image file");
      return;
    }
    if (file.size > MAX_MB * 1024 * 1024) {
      toast.error(`Image must be under ${MAX_MB} MB`);
      return;
    }
    setBusy(true);
    const fd = new FormData();
    fd.set("file", file);
    const res = await uploadImage(fd);
    setBusy(false);
    if ("error" in res) {
      toast.error(res.error);
      return;
    }
    onChange(res.url);
    toast.success("Image uploaded");
  }

  return (
    <div className="flex flex-col gap-2">
      {value ? (
        <div className="relative w-fit">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={value}
            alt="Cover preview"
            className="h-40 w-auto max-w-full rounded-md border border-border object-cover"
          />
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={() => onChange("")}
            className="absolute right-2 top-2"
          >
            Remove
          </Button>
        </div>
      ) : (
        <div
          role="button"
          tabIndex={0}
          onClick={() => inputRef.current?.click()}
          onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && inputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setDrag(true);
          }}
          onDragLeave={() => setDrag(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDrag(false);
            const f = e.dataTransfer.files?.[0];
            if (f) upload(f);
          }}
          className={`flex cursor-pointer flex-col items-center justify-center gap-1 rounded-md border border-dashed p-8 text-center transition-colors ${
            drag ? "border-primary bg-muted" : "border-input hover:bg-muted/50"
          }`}
        >
          <span className="text-sm text-muted-foreground">
            {busy ? "Uploading…" : "Drop an image here, or click to upload"}
          </span>
          <span className="text-xs text-muted-foreground">PNG · JPG · WebP · AVIF — max {MAX_MB} MB</span>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        disabled={busy}
        onChange={(e) => e.target.files?.[0] && upload(e.target.files[0])}
      />

      <Input
        type="url"
        value={value}
        placeholder="…or paste an image URL"
        onChange={(e) => onChange(e.target.value)}
        className="text-xs"
      />
    </div>
  );
}
