import Link from "next/link";
import { notFound } from "next/navigation";
import { getCampaign, listClientAccess } from "@/app/actions/photobooth";
import { quotaState, usd } from "@/lib/photobooth/quota";
import { CampaignForm } from "../CampaignForm";
import { QuotaBar, StatusBadge } from "../ui";
import { CampaignActions, ReleaseButton } from "./actions";
import { ClientAccess } from "./client-access";
import { LinkActions } from "./link-actions";
import { galleryPath, galleryPin } from "@/lib/photobooth/gallery-access";

export const dynamic = "force-dynamic";

const STATUS_FR: Record<string, string> = {
  reserved: "réservée", processing: "en cours", succeeded: "réussie",
  failed: "échec", cancelled: "annulée", unknown: "à vérifier",
};

export default async function Page({ params, searchParams }: {
  params: Promise<{ id: string }>; searchParams: Promise<{ edit?: string }>;
}) {
  const { id } = await params;
  const { edit } = await searchParams;
  const [d, members] = await Promise.all([getCampaign(id), listClientAccess(id)]);
  if (!d) notFound();
  const { campaign: c, usage: u, history, audit } = d;
  const q = quotaState({ quota: c.quota_limit, succeeded: u.succeeded, active: u.active, warning: c.warning_threshold, critical: c.critical_threshold });
  const boothPath = `/experience/photobooth/${c.slug}?k=${c.access_key}`;
  const teamGalleryPath = galleryPath(c.slug, c.access_key);

  if (edit) {
    return (
      <div>
        <h1 className="mb-6 text-2xl font-bold">Modifier · {c.name}</h1>
        <CampaignForm initial={c} />
      </div>
    );
  }

  return (
    <div className="max-w-5xl">
      <Link href="/admin/photobooth" className="text-xs text-muted-foreground hover:underline">← Campagnes</Link>
      <div className="mt-2 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">{c.name}</h1>
          <p className="text-sm text-muted-foreground">{c.client_name || "—"} · /{c.slug}</p>
        </div>
        <StatusBadge status={c.status} />
      </div>

      <section className="mt-6 rounded-lg border p-4">
        <QuotaBar q={q} quota={c.quota_limit} />
        <dl className="mt-4 grid grid-cols-2 gap-4 text-sm md:grid-cols-4">
          <div><dt className="text-muted-foreground">Réussies</dt><dd className="text-xl font-semibold">{u.succeeded}</dd></div>
          <div><dt className="text-muted-foreground">Réservées</dt><dd className="text-xl font-semibold">{u.active}</dd></div>
          <div><dt className="text-muted-foreground">Restantes</dt><dd className="text-xl font-semibold">{q.remaining}</dd></div>
          <div><dt className="text-muted-foreground">Échecs (non facturés)</dt><dd className="text-xl font-semibold">{u.failed}</dd></div>
          <div><dt className="text-muted-foreground">Aujourd’hui</dt><dd>{u.today}{c.daily_quota_limit !== null ? ` / ${c.daily_quota_limit}` : ""}</dd></div>
          <div><dt className="text-muted-foreground">Dépensé (estimé)</dt><dd>{usd(u.spent_musd)}{c.spending_limit_musd !== null ? ` / ${usd(c.spending_limit_musd)}` : ""}</dd></div>
          <div><dt className="text-muted-foreground">Réservé</dt><dd>{usd(u.reserved_musd)}</dd></div>
          <div><dt className="text-muted-foreground">Période</dt><dd>{c.starts_at ? new Date(c.starts_at).toLocaleDateString("fr-FR") : "—"} → {c.expires_at ? new Date(c.expires_at).toLocaleDateString("fr-FR") : "—"}</dd></div>
        </dl>
        <p className="mt-3 text-xs text-muted-foreground">
          Les montants sont des estimations (coût réservé par image). Le coût réel est dans la console Higgsfield.
        </p>
      </section>

      <section className="mt-4 rounded-lg border p-4">
        <p className="text-sm font-medium">Lien de la borne</p>
        <p className="mt-1 break-all font-mono text-xs text-muted-foreground">https://fmrxr.com{boothPath}</p>
        <CampaignActions id={c.id} status={c.status} boothPath={boothPath} hasUnknown={u.unknown > 0 || u.active > 0} />
        <p className="mt-5 text-sm font-medium">Lien de la galerie (équipe sur place)</p>
        <p className="mt-1 text-xs text-muted-foreground">
          Sans compte : QR, téléchargement, impression et suppression des portraits. À ne partager qu’avec l’équipe.
          Régénérer la clé de la campagne coupe aussi ce lien.
        </p>
        <p className="mt-1 break-all font-mono text-xs text-muted-foreground">https://fmrxr.com{teamGalleryPath}</p>
        <p className="mt-2 text-sm">
          Code équipe, à saisir sur la première page de la borne (bouton « Galerie ») :{" "}
          <span className="rounded bg-muted px-2 py-0.5 font-mono font-semibold tracking-[0.2em]">{galleryPin(c.access_key)}</span>
        </p>
        <LinkActions path={teamGalleryPath} openLabel="Ouvrir la galerie équipe" />
      </section>

      <ClientAccess campaignId={c.id} members={members} />

      <section className="mt-6">
        <h2 className="mb-2 text-lg font-semibold">Historique des générations</h2>
        {history.length === 0 ? (
          <p className="text-sm text-muted-foreground">Aucune génération.</p>
        ) : (
          <div className="overflow-x-auto rounded-lg border">
            <table className="w-full text-sm">
              <thead className="text-left text-xs text-muted-foreground">
                <tr className="border-b">
                  <th className="p-2">Date</th><th className="p-2">État</th><th className="p-2">Modèle</th>
                  <th className="p-2">Ambiance</th><th className="p-2">Job Higgsfield</th><th className="p-2">Erreur</th><th className="p-2" />
                </tr>
              </thead>
              <tbody>
                {history.map((h) => (
                  <tr key={h.id} className="border-b last:border-0">
                    <td className="p-2 whitespace-nowrap">{new Date(h.created_at).toLocaleString("fr-FR")}</td>
                    <td className={`p-2 ${h.status === "unknown" ? "text-amber-400" : ""}`}>{STATUS_FR[h.status] ?? h.status}</td>
                    <td className="p-2">{h.model}</td>
                    <td className="p-2 font-mono text-xs">{h.mood_id}</td>
                    <td className="p-2 font-mono text-xs">{h.provider_job_id?.slice(0, 13) ?? "—"}</td>
                    <td className="p-2 text-xs">{h.error_code ?? ""}</td>
                    <td className="p-2">{h.status === "unknown" && <ReleaseButton campaignId={c.id} usageId={h.id} />}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section className="mt-6">
        <h2 className="mb-2 text-lg font-semibold">Journal des modifications</h2>
        <ul className="flex flex-col gap-1 text-xs text-muted-foreground [overflow-wrap:anywhere]">
          {audit.map((a) => {
            const before = (a.before ?? {}) as Record<string, unknown>;
            const after = (a.after ?? {}) as Record<string, unknown>;
            const changed = Object.keys(after).filter((k) => k !== "updated_at" && JSON.stringify(before[k]) !== JSON.stringify(after[k]));
            return (
              <li key={a.id}>
                {new Date(a.created_at).toLocaleString("fr-FR")} · {
                  a.action === "create" ? "création"
                  : a.action === "update" ? `modifié : ${changed.map((k) => `${k} ${JSON.stringify(before[k])} → ${JSON.stringify(after[k])}`).join(", ") || "clé d’accès"}`
                  : a.action === "client_access_granted" ? `accès client donné à ${String(after.email ?? "")}`
                  : a.action === "client_access_revoked" ? "accès client retiré"
                  : a.action === "portrait_deleted" ? `portrait supprimé (${after.via === "gallery_link" ? "lien galerie équipe" : after.via === "client" ? "espace client" : "admin"})`
                  : a.action === "nsfw_retry" ? "relance après un faux refus nsfw"
                  : a.action
                }
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
