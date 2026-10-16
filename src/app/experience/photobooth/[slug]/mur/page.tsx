import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { resolveConfig } from "@/lib/photobooth/config";
import { isGalleryKey } from "@/lib/photobooth/gallery-access";
import { Wall } from "./Wall";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Mur en direct",
  robots: { index: false, follow: false },
  referrer: "no-referrer",
};

// /experience/photobooth/<slug>/mur?g=<cle de galerie> — mur en direct (option
// payante) : un grand ecran de la salle fait defiler les portraits a mesure
// qu'ils sont crees. Ouvert depuis la galerie d'equipe.
export default async function WallPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ g?: string }>;
}) {
  const { slug } = await params;
  const { g } = await searchParams;
  const { data: c } = await getSupabaseAdmin()
    .from("photobooth_campaigns").select("name, access_key, config").eq("slug", slug).maybeSingle();
  if (!c || !isGalleryKey(c.access_key, g)) notFound();
  const cfg = resolveConfig(c.config);
  if (!cfg.ok) notFound();
  if (!cfg.config.liveWall) {
    return (
      <main className="fm fm-canvas grid min-h-dvh place-items-center px-6 text-center">
        <div className="relative z-10 max-w-md">
          <p className="fm-display text-3xl">Mur en direct</p>
          <p className="mt-3 text-fmmuted">Cette option n’est pas activée pour la campagne. Contactez FMRXR pour l’ajouter à votre forfait.</p>
        </div>
      </main>
    );
  }
  const loc = cfg.config.defaultLocale;
  return <Wall slug={slug} galleryKey={g!} title={cfg.config.title[loc]} clientLogoUrl={cfg.config.clientLogoUrl} locale={loc} />;
}
