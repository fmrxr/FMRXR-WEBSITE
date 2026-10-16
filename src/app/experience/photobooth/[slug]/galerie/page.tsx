import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { campaignContacts, campaignStats, clientGallery } from "@/lib/photobooth/client";
import { resolveConfig } from "@/lib/photobooth/config";
import { purgeExpired } from "@/lib/photobooth/purge";
import { GalleryContacts, GalleryStats } from "./GalleryStats";
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
    .from("photobooth_campaigns").select("id, name, client_name, access_key, timezone, config").eq("slug", slug).maybeSingle();
  if (!c || !isGalleryKey(c.access_key, g)) notFound();
  const cfg = resolveConfig(c.config);
  // Fin de conservation : copies, coordonnees et photo source effacees (en tache de fond).
  if (cfg.ok) void purgeExpired(c.id, cfg.config.retentionDays).catch(() => undefined);
  const lead = cfg.ok && cfg.config.leadCapture.enabled;
  const wall = cfg.ok && cfg.config.liveWall;
  const [gallery, stats, contacts] = await Promise.all([
    clientGallery(c.id),
    campaignStats(c.id, c.timezone || "Africa/Tunis"),
    lead ? campaignContacts(c.id) : Promise.resolve([]),
  ]);
  if (!gallery) notFound();

  return (
    <main className="fm fm-canvas relative min-h-dvh">
      <div className="mx-auto max-w-6xl px-5 py-10 md:px-8">
        <div className="flex items-center justify-between gap-4">
          <p className="fm-display text-sm tracking-[0.08em]" dir="ltr">
            FMRXR<span className="text-fmaccent">{"//"}</span>
          </p>
          {/* Retour a la borne : l'equipe ouvre la galerie depuis la premiere page. */}
          <div className="flex flex-wrap justify-end gap-2">
          {wall && (
            <a href={`/experience/photobooth/${slug}/mur?g=${encodeURIComponent(g!)}`} target="_blank" rel="noreferrer" className="rounded-full border border-fmaccent/60 px-5 py-2 text-sm text-fmfg hover:border-fmaccent">
              Mur en direct
            </a>
          )}
          <a
            href={`/experience/photobooth/${slug}?k=${encodeURIComponent(c.access_key)}`}
            className="rounded-full border border-fmborder px-5 py-2 text-sm text-fmfg/85 hover:border-fmfg/50"
          >
            ← Retour à la borne
          </a>
          </div>
        </div>
        <h1 className="fm-display mt-8 text-3xl md:text-5xl">{gallery.name}</h1>
        <p className="mt-3 max-w-2xl text-sm text-fmmuted">
          {gallery.items.length} portrait{gallery.items.length > 1 ? "s" : ""} des 7 derniers jours{c.client_name ? `, ${c.client_name}` : ""}.
          Faites scanner le QR, téléchargez, imprimez, ou supprimez un portrait : il disparaît alors de la galerie et son lien de partage ne fonctionne plus.
          Ce lien donne accès à tous les portraits : ne le partagez qu’avec l’équipe.
        </p>
        <GalleryStats stats={stats} lead={lead} />
        {lead && <GalleryContacts rows={contacts} csvUrl={`/api/photobooth/contacts?slug=${encodeURIComponent(slug)}&g=${encodeURIComponent(g!)}`} />}
        <Gallery items={gallery.items} print={gallery.print} galleryKey={g!} />
      </div>
    </main>
  );
}
