"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button, buttonVariants } from "@/components/ui/button";
import { reconcileCampaign, releaseUsage, rotateAccessKey, setCampaignStatus, type CampaignRow } from "@/app/actions/photobooth";

export function CampaignActions({ id, status, boothPath, hasUnknown }: {
  id: string; status: CampaignRow["status"]; boothPath: string; hasUnknown: boolean;
}) {
  const router = useRouter();
  const run = async (p: Promise<{ error?: string } & Record<string, unknown>>, ok: string) => {
    const r = await p;
    if (r.error) toast.error(r.error);
    else toast.success(ok);
    router.refresh();
  };

  return (
    <div className="mt-3 flex flex-wrap gap-2">
      <Button size="sm" variant="outline" onClick={() => { navigator.clipboard.writeText(`${location.origin}${boothPath}`); toast.success("Lien copié"); }}>
        Copier le lien
      </Button>
      <a href={boothPath} target="_blank" rel="noreferrer" className={buttonVariants({ size: "sm", variant: "outline" })}>Ouvrir la borne</a>
      <Link href="?edit=1" className={buttonVariants({ size: "sm", variant: "outline" })}>Modifier</Link>
      <Link href={`/admin/photobooth/${id}/galerie`} className={buttonVariants({ size: "sm", variant: "outline" })}>Galerie</Link>
      {status === "active" ? (
        <Button size="sm" variant="outline" onClick={() => run(setCampaignStatus(id, "suspended"), "Campagne suspendue")}>Suspendre</Button>
      ) : (
        <Button size="sm" variant="outline" onClick={() => run(setCampaignStatus(id, "active"), "Campagne activée")}>Activer</Button>
      )}
      {hasUnknown && (
        <Button size="sm" variant="outline" onClick={() => run(reconcileCampaign(id), "Générations vérifiées auprès de Higgsfield")}>
          Vérifier les générations en cours
        </Button>
      )}
      <Button
        size="sm" variant="ghost"
        onClick={() => confirm("L’ancien lien de la borne cessera de fonctionner. Continuer ?") && run(rotateAccessKey(id), "Nouvelle clé générée")}
      >
        Régénérer la clé
      </Button>
    </div>
  );
}

export function ReleaseButton({ campaignId, usageId }: { campaignId: string; usageId: string }) {
  const router = useRouter();
  return (
    <Button
      size="sm" variant="ghost"
      onClick={async () => {
        if (!confirm("Libérer cette réservation ? À faire seulement après avoir vérifié dans la console Higgsfield qu’aucune image n’a été facturée.")) return;
        const r = await releaseUsage(campaignId, usageId);
        if ("error" in r) toast.error(String(r.error)); else toast.success("Réservation libérée");
        router.refresh();
      }}
    >
      Libérer
    </Button>
  );
}
