import Link from "next/link";
import { currentRoles } from "@/lib/auth";
import { listWalls } from "@/app/actions/wall";
import { StatusBadge } from "../photobooth/ui";

export const dynamic = "force-dynamic";

export default async function Page() {
  const roles = await currentRoles();
  if (!roles.includes("admin")) return <p className="text-muted-foreground">Les Live Walls sont réservés aux administrateurs.</p>;
  const { walls, error } = await listWalls();
  return (
    <div className="max-w-5xl">
      <div className="mb-6 flex items-baseline justify-between">
        <div>
          <h1 className="text-2xl font-bold">Live Wall</h1>
          <p className="text-sm text-muted-foreground">Murs de messages en direct : mots doux, dessins, signatures, photos et stickers envoyés depuis les téléphones.</p>
        </div>
        <Link href="/admin/wall/new" className="rounded-md bg-primary px-3.5 py-2 text-sm font-medium text-primary-foreground">Nouveau mur</Link>
      </div>
      {error && <p className="mb-4 rounded-md border border-destructive/50 p-3 text-sm">Tables introuvables : la migration <code>0020_live_wall.sql</code> n’est pas encore appliquée ({error}).</p>}
      {!error && walls.length === 0 && <p className="text-muted-foreground">Aucun mur.</p>}
      <div className="flex flex-col gap-3">
        {walls.map(({ campaign: c, counts: n }) => (
          <Link key={c.id} href={`/admin/wall/${c.id}`} className="rounded-lg border p-4 transition hover:border-foreground/30">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-semibold">{c.name} <span className="font-normal text-muted-foreground">· {c.client_name || "—"}</span></p>
                <p className="mt-0.5 font-mono text-xs text-muted-foreground">/{c.slug}</p>
              </div>
              <StatusBadge status={c.status} />
            </div>
            <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-xs text-muted-foreground">
              <span>{n.approved} publiés</span>
              {n.pending > 0 && <span className="text-amber-400">{n.pending} en attente</span>}
              <span>{n.hidden} masqués</span>
              <span>{n.comments} commentaires</span>
              <span>{n.likes} likes</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
