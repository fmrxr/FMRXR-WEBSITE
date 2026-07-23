"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import { OsProvider } from "@/lib/os/store";
import { DisplayCurrencyProvider } from "./Money";
import { OsSidebar } from "./OsSidebar";
import { OsTopbar } from "./OsTopbar";

/** Coquille client : porte l'état "menu mobile ouvert" que layout.tsx (serveur) ne peut pas tenir. */
export function OsShell({ children }: { children: ReactNode }) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <OsProvider>
      <DisplayCurrencyProvider>
        <div className="relative z-10 flex min-h-screen">
          <OsSidebar mobileOpen={mobileNavOpen} onClose={() => setMobileNavOpen(false)} />
          <div className="flex min-h-screen min-w-0 flex-1 flex-col">
            <OsTopbar onOpenNav={() => setMobileNavOpen(true)} />
            <main className="min-w-0 flex-1 overflow-x-hidden overflow-y-auto p-4 md:p-8">{children}</main>
          </div>
        </div>
      </DisplayCurrencyProvider>
    </OsProvider>
  );
}
