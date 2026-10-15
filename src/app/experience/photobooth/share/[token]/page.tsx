import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { findShared } from "@/lib/photobooth/server";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Votre portrait",
  robots: { index: false, follow: false },
  referrer: "no-referrer",
};

// Page ouverte par le QR code de la borne, sur le telephone du visiteur.
export default async function SharePage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const s = await findShared(token);

  if (!s.ok && s.reason === "NOT_FOUND") notFound();

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
        </div>
      )}
    </main>
  );
}
