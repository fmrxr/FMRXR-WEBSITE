import Link from "next/link";
import { notFound } from "next/navigation";
import { currentRoles } from "@/lib/auth";
import { getSupabaseServer } from "@/lib/supabase/server";
import { isShareActive } from "@/lib/photobooth/server";

export const dynamic = "force-dynamic";

// Galerie des portraits d'une campagne, pour controler la qualite pendant
// l'evenement. Les images restent chez Higgsfield (au moins 7 jours) et sont
// relayees par /api/photobooth/image, reserve a l'admin.

export default async function Gallery({ params }: { params: Promise<{ id: string }> }) {
  const roles = await currentRoles();
  if (!roles.includes("admin")) notFound();
  const { id } = await params;
  const sb = await getSupabaseServer();
  const [{ data: campaign }, { data: rows }] = await Promise.all([
    sb.from("photobooth_campaigns").select("name").eq("id", id).maybeSingle(),
    sb.from("photobooth_usage").select("id, model, completed_at, mood")
      .eq("campaign_id", id).eq("status", "succeeded").order("completed_at", { ascending: false }).limit(300),
  ]);
  if (!campaign) notFound();

  return (
    <div className="max-w-6xl">
      <Link href={`/admin/photobooth/${id}`} className="text-xs text-muted-foreground hover:underline">← {campaign.name}</Link>
      <div className="mt-2 mb-6 flex items-baseline justify-between">
        <h1 className="text-2xl font-bold">Galerie</h1>
        <span className="text-sm text-muted-foreground">{rows?.length ?? 0} portraits</span>
      </div>
      {(rows ?? []).length === 0 && <p className="text-muted-foreground">Aucun portrait réussi pour l’instant.</p>}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {(rows ?? []).map((r) => {
          const expired = !isShareActive(r.completed_at);
          const mood = r.mood as { id?: string; title?: { fr?: string } } | null;
          return (
            <figure key={r.id} className="overflow-hidden rounded-lg border">
              {expired ? (
                <div className="grid aspect-[3/4] place-items-center bg-muted p-4 text-center text-xs text-muted-foreground">
                  Plus de 7 jours : l’image n’est peut-être plus chez Higgsfield
                </div>
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={`/api/photobooth/image/${r.id}`} alt="" loading="lazy" className="aspect-[3/4] w-full bg-muted object-cover" />
              )}
              <figcaption className="flex items-center justify-between gap-2 p-2 text-xs">
                <span>
                  <span className="block font-medium">{mood?.title?.fr ?? mood?.id}</span>
                  <span className="text-muted-foreground">{r.completed_at ? new Date(r.completed_at).toLocaleString("fr-FR") : ""} · {r.model}</span>
                </span>
                {!expired && <a href={`/api/photobooth/image/${r.id}?dl=1`} className="shrink-0 underline">Télécharger</a>}
              </figcaption>
            </figure>
          );
        })}
      </div>
    </div>
  );
}
