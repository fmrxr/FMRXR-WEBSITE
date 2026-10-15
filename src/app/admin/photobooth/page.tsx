import Link from "next/link";
import { currentRoles } from "@/lib/auth";
import { listCampaigns } from "@/app/actions/photobooth";
import { quotaState, usd } from "@/lib/photobooth/quota";
import { QuotaBar, StatusBadge } from "./ui";

export const dynamic = "force-dynamic";

export default async function Page() {
  const roles = await currentRoles();
  if (!roles.includes("admin")) {
    return <p className="text-muted-foreground">Les campagnes photobooth sont réservées aux administrateurs.</p>;
  }
  const { campaigns, error } = await listCampaigns();

  return (
    <div className="max-w-5xl">
      <div className="mb-6 flex items-baseline justify-between">
        <div>
          <h1 className="text-2xl font-bold">Photobooth</h1>
          <p className="text-sm text-muted-foreground">Campagnes, quotas d’images et budget de génération.</p>
        </div>
        <Link href="/admin/photobooth/new" className="rounded-md bg-primary px-3.5 py-2 text-sm font-medium text-primary-foreground">
          Nouvelle campagne
        </Link>
      </div>

      {error && (
        <p className="mb-4 rounded-md border border-destructive/50 p-3 text-sm">
          Tables introuvables : la migration <code>0017_photobooth.sql</code> n’est pas encore appliquée ({error}).
        </p>
      )}
      {!error && campaigns.length === 0 && <p className="text-muted-foreground">Aucune campagne.</p>}

      <div className="flex flex-col gap-3">
        {campaigns.map(({ campaign: c, usage: u }) => {
          const q = quotaState({ quota: c.quota_limit, succeeded: u.succeeded, active: u.active, warning: c.warning_threshold, critical: c.critical_threshold });
          return (
            <Link key={c.id} href={`/admin/photobooth/${c.id}`} className="rounded-lg border p-4 transition hover:border-foreground/30">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-semibold">{c.name} <span className="font-normal text-muted-foreground">· {c.client_name || "—"}</span></p>
                  <p className="mt-0.5 font-mono text-xs text-muted-foreground">/{c.slug}</p>
                </div>
                <StatusBadge status={c.status} />
              </div>
              <QuotaBar q={q} quota={c.quota_limit} />
              <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-xs text-muted-foreground">
                <span>{u.succeeded} réussies</span>
                <span>{u.active} en cours</span>
                {u.unknown > 0 && <span className="text-amber-400">{u.unknown} à vérifier</span>}
                <span>{u.failed} échecs (non facturés)</span>
                <span>aujourd’hui {u.today}{c.daily_quota_limit !== null ? ` / ${c.daily_quota_limit}` : ""}</span>
                <span>dépensé {usd(u.spent_musd)}{c.spending_limit_musd !== null ? ` / ${usd(c.spending_limit_musd)}` : ""}</span>
                {c.expires_at && <span>fin {new Date(c.expires_at).toLocaleDateString("fr-FR")}</span>}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
