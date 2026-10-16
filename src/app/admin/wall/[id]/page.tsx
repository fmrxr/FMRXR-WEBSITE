import { headers } from "next/headers";
import { notFound } from "next/navigation";
import QRCode from "qrcode";
import { currentRoles } from "@/lib/auth";
import { getWall } from "@/app/actions/wall";
import { resolveConfig } from "@/lib/wall/config";
import { guestPath, modPath, personalModPath, screenPath } from "@/lib/wall/keys";
import { Moderation } from "@/components/wall/Moderation";
import { LinkActions } from "../../photobooth/[id]/link-actions";
import { StatusBadge } from "../../photobooth/ui";
import { WallForm } from "../WallForm";
import { WallActions } from "./WallActions";
import { Moderators } from "./Moderators";

export const dynamic = "force-dynamic";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const roles = await currentRoles();
  if (!roles.includes("admin")) return <p className="text-muted-foreground">Réservé aux administrateurs.</p>;
  const { id } = await params;
  const w = await getWall(id);
  if (!w) notFound();
  const { campaign: c, counts: n } = w;
  const cfg = resolveConfig(c.config);
  const h = await headers();
  const host = h.get("x-forwarded-host") ?? h.get("host") ?? "fmrxr.com";
  const origin = process.env.WALL_PUBLIC_ORIGIN ?? `${h.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https")}://${host}`;
  const guest = guestPath(c.slug, c.access_key);
  const qr = await QRCode.toDataURL(`${origin}${guest}`, { margin: 1, width: 600 });
  const mod = modPath(c.slug, c.access_key);

  return (
    <div className="flex max-w-5xl flex-col gap-10">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">{c.name}</h1>
          <p className="text-sm text-muted-foreground">{c.client_name || "—"} · /{c.slug} · {n.approved} publiés · {n.pending} en attente · {n.comments} commentaires · {n.likes} likes</p>
        </div>
        <StatusBadge status={c.status} />
      </div>
      {c.status !== "active" && <p className="rounded-md border border-amber-500/40 p-3 text-sm">Le mur n’accepte des messages qu’en statut <b>Actif</b> (et entre ses dates).</p>}

      <section className="grid gap-6 md:grid-cols-[220px_1fr]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={qr} alt="QR invités" className="w-full rounded-lg bg-white" />
        <div className="flex flex-col gap-5">
          <div>
            <p className="font-semibold">Lien invités (le QR)</p>
            <p className="text-xs text-muted-foreground">À afficher dans la salle, sur les tables, sur l’écran (déjà intégré en bas à droite du mur).</p>
            <LinkActions path={guest} openLabel="Ouvrir comme invité" />
            <a href={qr} download={`live-wall-${c.slug}-qr.png`} className="mt-2 inline-block text-xs underline">Télécharger le QR (PNG)</a>
          </div>
          <div>
            <p className="font-semibold">Écran géant</p>
            <p className="text-xs text-muted-foreground">À ouvrir en plein écran sur le PC relié à l’écran. Avec l’option capteur, autoriser la caméra.</p>
            <LinkActions path={screenPath(c.slug, c.access_key)} openLabel="Ouvrir l’écran" />
          </div>
          <div>
            <p className="font-semibold">Modération, lien commun de l’équipe</p>
            <p className="text-xs text-muted-foreground">Les actions faites avec ce lien sont signées « Équipe ». Pour savoir qui a fait quoi, donnez plutôt à chacun son lien personnel (ci-dessous).</p>
            <LinkActions path={mod} openLabel="Ouvrir la modération" />
          </div>
          <WallActions id={c.id} name={c.name} />
        </div>
      </section>

      <section>
        <h2 className="mb-1 text-xl font-semibold">Modérateurs</h2>
        <p className="mb-4 text-sm text-muted-foreground">Jusqu’à 5 personnes, chacune avec son lien : modération depuis le téléphone, ou directement sur l’écran géant. Chaque action garde le nom de son auteur.</p>
        <Moderators
          wallId={c.id}
          list={(cfg.ok ? cfg.config.moderators : []).map((x) => ({
            id: x.id, name: x.name,
            phone: personalModPath(c.slug, x.key),
            screen: `/experience/wall/${c.slug}/ecran?m=${x.key}`,
          }))}
        />
      </section>

      <section>
        <h2 className="mb-4 text-xl font-semibold">Modération</h2>
        <Moderation slug={c.slug} m={mod.split("m=")[1]} stickers={cfg.ok ? cfg.config.stickers : []} />
      </section>

      <section>
        <h2 className="mb-4 text-xl font-semibold">Réglages</h2>
        <WallForm initial={c} />
      </section>
    </div>
  );
}
