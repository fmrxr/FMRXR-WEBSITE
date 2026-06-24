import Link from "next/link";
import { getPublished } from "@/lib/public-data";
import { PageHero } from "@/components/site/PageHero";

export const revalidate = 60;

const pad = (n: number) => String(n).padStart(2, "0");

export default async function Services() {
  const services = await getPublished("services");
  return (
    <>
      <PageHero index="Services" title="One studio, fullstack brand activation." intro="From creative direction to opening night — XR, projection mapping, generative art, live A/V and AI workflows, delivered as one system." />
      <section className="mx-auto max-w-[1200px] px-5 pb-24 md:px-8">
        <div className="grid gap-px overflow-hidden rounded-xl border border-fmborder bg-fmborder md:grid-cols-2">
          {services.map((s: any, i: number) => (
            <Link key={s.id} href={`/services/${s.slug}`} className="group bg-fmbg p-6 transition-colors hover:bg-fmmutedbg md:p-8">
              <span className="text-[10px] uppercase tracking-[0.15em] text-fmmuted">S/{pad(i + 1)}</span>
              <h2 className="fm-display mt-3 text-xl text-fmfg md:text-2xl">{s.title}</h2>
              <p className="fm-grotesk mt-2 text-[13px] leading-relaxed text-fmmuted">{s.short}</p>
              <span className="fm-arrow mt-4 inline-block text-fmmuted transition-transform group-hover:translate-x-1 group-hover:text-fmaccent">→</span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
