"use client";
import { useState } from "react";
import type { Locale, Sticker } from "@/lib/wall/config";
import { Moderation } from "./Moderation";
import { Brand } from "./Brand";
import { Exports } from "./Exports";
import { ModWall } from "./ModWall";

// La page de controle de l'equipe du client : moderer pendant la soiree,
// poser sa charte avant, recuperer ce qu'il en reste apres. Trois moments
// d'un meme evenement, donc trois volets d'une meme page et un seul lien.

type Tab = "moderation" | "wall" | "brand" | "exports";

export function Control({ slug, m, stickers, locale, pending, eventName, eventDate }: {
  slug: string; m: string; stickers: Sticker[]; locale: Locale; pending: number;
  eventName: string; eventDate: string;
}) {
  const [tab, setTab] = useState<Tab>("moderation");
  const tabs: [Tab, string][] = [["moderation", "Modération"], ["wall", "Mur"], ["brand", "Charte"], ["exports", "Exports"]];
  return (
    <>
      <nav className="mb-5 flex gap-2 border-b border-fmborder">
        {tabs.map(([id, label]) => (
          <button key={id} onClick={() => setTab(id)}
            className={`relative -mb-px min-h-12 px-4 text-sm transition ${
              tab === id ? "border-b-2 border-fmaccent font-semibold text-fmfg" : "text-fmmuted hover:text-fmfg"}`}>
            {label}
            {id === "moderation" && pending > 0 && tab !== "moderation" && (
              <span className="ml-2 rounded-full bg-fmaccent px-1.5 py-0.5 text-[10px] font-semibold text-black">{pending}</span>
            )}
          </button>
        ))}
      </nav>
      {tab === "moderation" && <Moderation slug={slug} m={m} stickers={stickers} locale={locale} />}
      {tab === "wall" && <ModWall slug={slug} m={m} locale={locale} />}
      {tab === "brand" && <Brand slug={slug} m={m} />}
      {tab === "exports" && <Exports slug={slug} m={m} eventName={eventName} eventDate={eventDate} />}
    </>
  );
}
