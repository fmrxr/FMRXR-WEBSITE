import Link from "next/link";
import { notFound } from "next/navigation";
import { currentRoles, currentUser } from "@/lib/auth";
import { canSeeCampaign, clientGallery } from "@/lib/photobooth/client";
import { Gallery } from "./gallery";

export const dynamic = "force-dynamic";

// Galerie des portraits d'une campagne pour le client : QR de partage,
// telechargement et impression des demandes tardives. 7 derniers jours.
export default async function ClientGalleryPage({ params }: { params: Promise<{ campaignId: string }> }) {
  const { campaignId } = await params;
  const user = await currentUser();
  if (!user || !/^[0-9a-f-]{36}$/i.test(campaignId)) notFound();
  const roles = await currentRoles();
  if (!(await canSeeCampaign(user.id, campaignId, roles.includes("admin")))) notFound();
  const g = await clientGallery(campaignId);
  if (!g) notFound();

  return (
    <div className="mx-auto max-w-6xl px-5 py-10 md:px-8">
      <Link href="/client" className="text-xs text-fmmuted hover:text-fmfg">← Vos campagnes</Link>
      <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.2em] text-fmaccent">Galerie</p>
      <h1 className="fm-display mt-2 text-3xl md:text-5xl">{g.name}</h1>
      <p className="mt-3 max-w-2xl text-sm text-fmmuted">
        {g.items.length} portrait{g.items.length > 1 ? "s" : ""} des 7 derniers jours. Au-delà, les images ne sont plus conservées.
        Pour une demande tardive : faites scanner le QR, téléchargez ou imprimez.
      </p>
      <Gallery items={g.items} print={g.print} />
    </div>
  );
}
