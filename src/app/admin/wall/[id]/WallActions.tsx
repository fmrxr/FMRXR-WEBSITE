"use client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { deleteWall, rotateWallKey } from "@/app/actions/wall";

export function WallActions({ id, name }: { id: string; name: string }) {
  const router = useRouter();
  return (
    <div className="flex flex-wrap gap-2">
      <Button size="sm" variant="outline" onClick={async () => {
        if (!confirm("Nouvelle clé : les anciens QR, liens d’écran et de modération (y compris ceux des modérateurs) ne marcheront plus. Continuer ?")) return;
        const r = await rotateWallKey(id);
        if ("error" in r) toast.error(r.error); else { toast.success("Nouvelle clé"); router.refresh(); }
      }}>Changer la clé</Button>
      <Button size="sm" variant="outline" className="text-destructive" onClick={async () => {
        if (prompt(`Supprimer définitivement « ${name} », ses messages et ses photos ? Tapez SUPPRIMER`) !== "SUPPRIMER") return;
        const r = await deleteWall(id);
        if ("error" in r) toast.error(r.error); else { toast.success("Supprimé"); router.push("/admin/wall"); }
      }}>Supprimer</Button>
    </div>
  );
}
