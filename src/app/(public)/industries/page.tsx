import Link from "next/link";
import { getPublished } from "@/lib/public-data";
import { PageHero } from "@/components/site/PageHero";

export const revalidate = 60;

export default async function Industries() {
  const rows = await getPublished("industries");
  return (
    <>
      <PageHero index="Industries" title="Where we operate" intro="Institutional, telecom, automotive, finance, art & galleries, festivals, nightlife and corporate brands." />
      <section className="mx-auto max-w-[1200px] px-5 pb-24 md:px-8">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {rows.map((r: any) => (
            <Link key={r.id} href={`/industries/${r.slug}`} className="fm-glass-card group rounded-lg p-6">
              <h2 className="fm-display text-lg text-fmfg">{r.name}</h2>
              {r.note && <p className="fm-grotesk mt-2 text-[13px] leading-relaxed text-fmmuted">{r.note}</p>}
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
