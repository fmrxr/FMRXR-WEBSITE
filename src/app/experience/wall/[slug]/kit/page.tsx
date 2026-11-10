import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Kit } from "@/components/wall/Kit";
import { loadWall } from "@/lib/wall/server";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Live Wall · exports",
  robots: { index: false, follow: false },
  referrer: "no-referrer",
};

// /experience/wall/<slug>/kit?m=<cle equipe>&tab=print|images|mail
// Ce que la soiree laisse derriere elle, fabrique par le navigateur de
// l'equipe a partir des cartes publiees : la planche imprimable, les cartes
// en images et le kit emailing. Aucune intervention de FMRXR.
export default async function Page({ params, searchParams }: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ m?: string; tab?: string }>;
}) {
  const { slug } = await params;
  const { m, tab } = await searchParams;
  const loaded = await loadWall(slug, { m });
  if (!loaded.ok || loaded.wall.access !== "mod") notFound();
  const start = tab === "images" || tab === "mail" ? tab : "print";
  return <Kit slug={slug} m={m!} initialTab={start} />;
}
