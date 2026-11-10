import type { Metadata } from "next";
import { headers } from "next/headers";
import QRCode from "qrcode";
import { guestPath } from "@/lib/wall/keys";
import { WallState } from "@/components/wall/WallState";
import { notFound } from "next/navigation";
import { Control } from "@/components/wall/Control";
import { loadWall } from "@/lib/wall/server";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Live Wall · modération",
  robots: { index: false, follow: false },
  referrer: "no-referrer",
};

// /experience/wall/<slug>/moderation?m=<cle equipe> — valider et masquer depuis un telephone.
export default async function Page({ params, searchParams }: { params: Promise<{ slug: string }>; searchParams: Promise<{ m?: string }> }) {
  const { slug } = await params;
  const { m } = await searchParams;
  const loaded = await loadWall(slug, { m });
  if (!loaded.ok || loaded.wall.access !== "mod") notFound();
  const { campaign, config } = loaded.wall;

  // Le QR est fabrique ici, du cote serveur : la cle d'acces des invites
  // ne doit pas transiter par la page de controle.
  const h = await headers();
  const host = h.get("x-forwarded-host") ?? h.get("host") ?? "fmrxr.com";
  const proto = h.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const origin = process.env.WALL_PUBLIC_ORIGIN ?? `${proto}://${host}`;
  const guestUrl = `${origin}${guestPath(slug, campaign.access_key)}`;
  const qrSvg = await QRCode.toString(guestUrl, { type: "svg", margin: 0, errorCorrectionLevel: "M" });

  return (
    <main className="fm fm-canvas min-h-dvh px-4 py-5">
      <div className="relative z-10 mx-auto max-w-5xl">
        <p className="fm-display text-2xl">{campaign.name}</p>
        <p className="mb-5 text-sm text-fmmuted">
          Contrôle du mur · modération {config.moderation === "auto" ? "automatique, les messages signalés attendent ici" : "manuelle, tout attend ici"}
        </p>
        <WallState slug={slug} m={m!} status={campaign.status} guestUrl={guestUrl} qrSvg={qrSvg} />
        <Control
          slug={slug} m={m!} stickers={config.stickers} locale={config.defaultLocale} pending={0}
          eventName={campaign.name}
          eventDate={campaign.starts_at
            ? new Date(campaign.starts_at).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" }).toUpperCase()
            : ""}
        />
      </div>
    </main>
  );
}
