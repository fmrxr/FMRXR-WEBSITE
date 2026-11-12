"use client";

import Link from "next/link";
import { useEffect, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import type { Offer } from "@/lib/offers";
import { CREAM, NIGHT, RED } from "./SignalSurvey";

// La page cachée /fmr : les seuls prix du site. On y arrive en tapant « fmr »
// n'importe où, ou par appui long sur le // du logo. Même registre Signal que
// /services, en plein écran par-dessus le site (portail sur <body> : rendue
// dans <main>, qui est en z-10, elle passait sous l'en-tête et le pied de page).

const noop = () => () => {};
const dim = (a: string) => `${CREAM}${a}`;

export function SignalPrices({ offers }: { offers: Offer[] }) {
  const router = useRouter();
  const mounted = useSyncExternalStore(noop, () => true, () => false);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && router.push("/services");
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [router]);

  if (!mounted) return null;
  return createPortal(
    <div className="fixed inset-0 z-[60] overflow-y-auto" style={{ background: NIGHT, color: CREAM }}>
      <div className="mx-auto max-w-[1200px] px-5 pb-24 pt-8 md:px-8">
        <div className="flex items-baseline justify-between font-mono text-[10px] uppercase tracking-[0.18em]" style={{ color: dim("99") }}>
          <span>FMRXR// · Level fmr · Starting prices · Tunis</span>
          <Link href="/services" style={{ color: CREAM }}>Esc · exit</Link>
        </div>

        <h1 className="fm-display mt-10 text-[clamp(2.5rem,9vw,7.5rem)] uppercase leading-[0.9]">
          You found<br />the prices
        </h1>
        <p className="mt-5 max-w-xl font-mono text-[11px] leading-relaxed" style={{ color: dim("b3") }}>
          Five offers you can book as they are. Each price is a floor taken from a real 2026 quote. The final
          quote depends on the venue, the dates and the hardware, which is excluded unless listed under “We bring”.
        </p>

        <ol className="mt-14">
          {offers.map((o, i) => (
            <li key={o.slug} className="grid gap-6 border-t py-8 md:grid-cols-[2.5rem_1fr_1.3fr] md:gap-8" style={{ borderColor: dim("26") }}>
              <span className="font-mono text-[10px]" style={{ color: dim("66") }}>{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h2 className="fm-display text-2xl uppercase md:text-3xl">{o.title}</h2>
                <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.15em]" style={{ color: dim("80") }}>From</p>
                <p className="fm-display text-[clamp(2rem,5vw,3.5rem)] leading-none" style={{ color: RED }}>{o.from}</p>
                {o.fromNote && <p className="mt-2 font-mono text-[10px]" style={{ color: dim("99") }}>{o.fromNote}</p>}
                <p className="mt-4 max-w-sm font-mono text-[11px] leading-relaxed" style={{ color: dim("cc") }}>{o.pitch}</p>
              </div>
              <div className="flex flex-col">
                <dl className="grid gap-3 font-mono text-[11px] leading-relaxed">
                  {([["We bring", o.bring], ["You provide", o.provide], ["Options", o.options]] as const).map(([k, v]) =>
                    v.length ? (
                      <div key={k} className="grid grid-cols-[6.5rem_1fr] gap-3">
                        <dt className="uppercase tracking-[0.12em]" style={{ color: dim("66") }}>{k}</dt>
                        <dd>{v.join(" · ")}</dd>
                      </div>
                    ) : null,
                  )}
                </dl>
                <div className="mt-6 flex flex-wrap items-baseline gap-6 font-mono text-[10px] uppercase tracking-[0.15em]">
                  <Link href={o.demo.href} data-cta={`offer_demo_${o.slug}`} className="hover:underline" style={{ color: dim("b3") }}>{o.demo.label} ↗</Link>
                  <Link href={`/start?service=${o.services[0]}&ref=${o.slug}`} data-cta={`offer_book_${o.slug}`} style={{ color: RED }}>Book it →</Link>
                </div>
              </div>
            </li>
          ))}
        </ol>

        <p className="border-t pt-6 font-mono text-[10px] uppercase tracking-[0.15em]" style={{ borderColor: dim("26"), color: dim("66") }}>
          Everything else, from CGI to large installations, is built on a quote.{" "}
          <Link href="/start" style={{ color: RED }}>Brief us →</Link>
        </p>
      </div>
    </div>,
    document.body,
  );
}
