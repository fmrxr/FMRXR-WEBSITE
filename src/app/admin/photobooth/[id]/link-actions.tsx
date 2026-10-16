"use client";
import { toast } from "sonner";
import { Button, buttonVariants } from "@/components/ui/button";

// Copier / ouvrir un lien de campagne (galerie d'equipe...).
export function LinkActions({ path, openLabel }: { path: string; openLabel: string }) {
  return (
    <div className="mt-3 flex flex-wrap gap-2">
      <Button size="sm" variant="outline" onClick={() => { navigator.clipboard.writeText(`${location.origin}${path}`); toast.success("Lien copié"); }}>
        Copier le lien
      </Button>
      <a href={path} target="_blank" rel="noreferrer" className={buttonVariants({ size: "sm", variant: "outline" })}>{openLabel}</a>
    </div>
  );
}
