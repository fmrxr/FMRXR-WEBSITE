import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { publicConfig } from "@/lib/wall/config";
import { loadWall } from "@/lib/wall/server";
import { Guest } from "./Guest";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Live Wall",
  robots: { index: false, follow: false },
  referrer: "no-referrer",
};

// /experience/wall/<slug>?k=<cle> — page invite, ouverte par le QR de la salle.
export default async function Page({ params, searchParams }: { params: Promise<{ slug: string }>; searchParams: Promise<{ k?: string }> }) {
  const { slug } = await params;
  const { k } = await searchParams;
  const loaded = await loadWall(slug, { k });
  if (!loaded.ok || loaded.wall.access !== "guest") notFound();
  return <Guest slug={slug} k={k!} initial={publicConfig(loaded.wall.config)} />;
}
