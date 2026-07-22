import { redirect } from "next/navigation";
import { currentRoles } from "@/lib/auth";
import { OsProvider } from "@/lib/os/store";
import { DisplayCurrencyProvider } from "@/components/os/Money";
import { OsSidebar } from "@/components/os/OsSidebar";
import { OsTopbar } from "@/components/os/OsTopbar";

export const metadata = { title: "FMRXR OS", robots: { index: false, follow: false } };

// Espace privé (admin uniquement) — Command Center natif de FMRXR OS.
export default async function OsLayout({ children }: { children: React.ReactNode }) {
  const roles = await currentRoles();
  if (!roles.includes("admin")) redirect("/auth");

  return (
    <div className="fm fm-canvas relative min-h-screen">
      <OsProvider>
        <DisplayCurrencyProvider>
          <div className="relative z-10 flex min-h-screen">
            <OsSidebar />
            <div className="flex min-h-screen flex-1 flex-col">
              <OsTopbar />
              <main className="flex-1 overflow-y-auto p-8">{children}</main>
            </div>
          </div>
        </DisplayCurrencyProvider>
      </OsProvider>
    </div>
  );
}
