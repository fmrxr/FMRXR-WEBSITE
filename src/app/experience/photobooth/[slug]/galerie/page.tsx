import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { clientGallery } from "@/lib/photobooth/client";
import { isGalleryKey } from "@/lib/photobooth/gallery-access";
import { Gallery } from "@/app/client/galerie/[campaignId]/gallery";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Galerie de la campagne",
  robots: { index: false, follow: false },
  referrer: "no-referrer",
};

// /experience/photobooth/<slug>/galerie?g=<cle de galerie> — galerie de l'equipe
// sur place, sans compte : QR, telechargement, impression et suppression.
// Cle distincte de celle de la borne (le lien de la borne circule).
export default async function TeamGallery({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ g?: string }>;
}) {
  const { slug } = await params;
  const { g } = await searchParams;
  const { data: c } = await getSupabaseAdmin()
    .from("photobooth_campaigns").select("id, name, client_name, access_key").eq("slug", slug).maybeSingle();
  if (!c || !isGalleryKey(c.access_key, g)) notFound();
  const gallery = await clientGallery(c.id);
  if (!gallery) notFound();

  return (
    <main className="fm fm-canvas relative min-h-dvh">
      <div className="mx-auto max-w-6xl px-5 py-10 md:px-8">
        <p className="fm-display text-sm tracking-[0.08em]" dir="ltr">
          FMRXR<span className="text-fmaccent">{"//"}</span>
        </p>
        <h1 className="fm-display mt-8 text-3xl md:text-5xl">{gallery.name}</h1>
        <p className="mt-3 max-w-2xl text-sm text-fmmuted">
          {gallery.items.length} portrait{gallery.items.length > 1 ? "s" : ""} des 7 derniers jours{c.client_name ? `, ${c.client_name}` : ""}.
          Faites scanner le QR, téléchargez, imprimez, ou supprimez un portrait : il disparaît alors de la galerie et son lien de partage ne fonctionne plus.
          Ce lien donne accès à tous les portraits : ne le partagez qu’avec l’équipe.
        </p>
        <Gallery items={gallery.items} print={gallery.print} galleryKey={g!} />
      </div>
    </main>
  );
}
