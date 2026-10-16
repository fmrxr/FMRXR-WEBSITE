import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Moderation } from "@/components/wall/Moderation";
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
  return (
    <main className="fm fm-canvas min-h-dvh px-4 py-5">
      <div className="relative z-10 mx-auto max-w-5xl">
        <p className="fm-display text-2xl">{campaign.name}</p>
        <p className="mb-5 text-sm text-fmmuted">Modération · {config.moderation === "auto" ? "automatique, les messages signalés attendent ici" : "manuelle, tout attend ici"}</p>
        <Moderation slug={slug} m={m!} stickers={config.stickers} />
      </div>
    </main>
  );
}
