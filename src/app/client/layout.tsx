import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { currentRoles, currentUser } from "@/lib/auth";
import { signOut } from "@/app/actions/auth";
import { campaignIdsFor } from "@/lib/photobooth/client";

export const metadata: Metadata = {
  title: "Espace client",
  robots: { index: false, follow: false },
};

// Espace client photobooth : ouvert aux membres d'au moins une campagne
// (et a l'admin, pour voir ce que voit le client).
export default async function ClientLayout({ children }: { children: React.ReactNode }) {
  const user = await currentUser();
  if (!user) redirect("/auth");
  const [ids, roles] = await Promise.all([campaignIdsFor(user.id), currentRoles()]);
  if (ids.length === 0 && !roles.includes("admin")) redirect("/collab");

  return (
    <div className="fm fm-canvas relative flex min-h-screen flex-col">
      <header className="sticky top-0 z-20 border-b border-fmborder bg-fmbg/85 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center gap-4 px-5 py-4 md:px-8">
          <Link href="/client" prefetch={false} className="fm-display text-sm tracking-[0.08em] text-fmfg">
            FMRXR<span className="text-fmaccent">{"//"}</span>
          </Link>
          <span className="text-[10px] uppercase tracking-[0.14em] text-fmmuted">Espace client</span>
          <div className="ml-auto flex items-center gap-4">
            <Link href="/account" prefetch={false} className="fm-link hidden text-xs text-fmmuted sm:inline">
              {user.email}
            </Link>
            <form action={signOut}>
              <button type="submit" className="fm-link text-xs uppercase tracking-[0.12em] text-fmmuted">Sortir</button>
            </form>
          </div>
        </div>
      </header>
      <main className="relative z-10 flex-1">{children}</main>
    </div>
  );
}
