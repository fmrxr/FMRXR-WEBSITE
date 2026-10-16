import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";
import { headers } from "next/headers";
import { findShared, isPreviewBot, logEvent } from "@/lib/photobooth/server";

export const dynamic = "force-dynamic";

const getShared = cache(findShared);

/** Apercu du lien de partage : le portrait lui-meme, avec son ambiance et la campagne. */
export async function generateMetadata({ params }: { params: Promise<{ token: string }> }): Promise<Metadata> {
  const { token } = await params;
  const base: Metadata = { robots: { index: false, follow: false }, referrer: "no-referrer" };
  const s = await getShared(token);
  if (!s.ok) return { ...base, title: "Votre portrait" };
  const mood = s.title?.en || s.title?.fr || "Portrait";
  const title = `${mood} · ${s.campaignName}`;
  const description = "My portrait from the FMRXR// AI photobooth. Link valid for 7 days.";
  const url = `/experience/photobooth/share/${token}`;
  const image = `/api/photobooth/share/${token}`;
  return {
    ...base,
    title: { absolute: `${title} · FMRXR//` },
    description,
    alternates: { canonical: url },
    openGraph: { type: "website", siteName: "FMRXR Studio", title, description, url, images: [{ url: image, alt: title }] },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}

// Page ouverte par le QR code de la borne, sur le telephone du visiteur.
export default async function SharePage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const s = await getShared(token);

  if (!s.ok && s.reason === "NOT_FOUND") notFound();
  // Vue comptee pour les statistiques de la galerie (les robots d'apercu non).
  if (s.ok && !isPreviewBot((await headers()).get("user-agent"))) logEvent(s.campaignId, "share_view", s.usageId);

  return (
    <main className="fm fm-canvas flex min-h-dvh flex-col items-center px-5 py-8">
      <p className="relative z-10 fm-display text-sm tracking-[0.06em]" dir="ltr">
        FMRXR<span className="text-fmaccent">{"//"}</span>
      </p>
      {!s.ok ? (
        <div className="relative z-10 m-auto max-w-sm text-center">
          <p className="fm-display text-3xl">Lien expiré</p>
          <p className="mt-3 text-sm text-fmmuted">
            Les portraits restent disponibles 7 jours. Expired: portraits are available for 7 days.
          </p>
        </div>
      ) : (
        <div className="relative z-10 mt-8 flex w-full max-w-md flex-col items-center gap-6 text-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`/api/photobooth/share/${token}`}
            alt={s.title?.fr ?? "Portrait"}
            className="w-full rounded-xl border border-fmborder shadow-2xl"
          />
          {s.title && (
            <div>
              <p className="fm-display text-3xl">{s.title.fr}</p>
              {s.title.en && s.title.en !== s.title.fr && <p className="mt-1 text-sm text-fmmuted">{s.title.en}</p>}
            </div>
          )}
          <a
            href={`/api/photobooth/share/${token}?dl=1`}
            className="w-full rounded-full bg-fmfg px-8 py-4 text-center font-semibold text-fmbg hover:bg-fmaccent"
          >
            Télécharger · Download · تحميل
          </a>
          <p className="text-xs text-fmmuted">
            {s.campaignName} · disponible jusqu’au {new Date(s.expiresAt).toLocaleDateString("fr-FR")}
          </p>
          {/* Transparence (AI Act, art. 50) : contenu genere, dit en clair. */}
          <p className="text-[11px] text-fmmuted">Image générée par IA · AI-generated image · صورة مولّدة بالذكاء الاصطناعي</p>
        </div>
      )}
    </main>
  );
}
