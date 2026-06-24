import Link from "next/link";
import { PageHero } from "@/components/site/PageHero";

export default function Press() {
  return (
    <>
      <PageHero index="Press" title="Press & media" intro="Logos, founder bio, project stills and fact sheet — available on request." />
      <section className="mx-auto max-w-3xl px-5 pb-24 md:px-8">
        <div className="fm-glass-card rounded-xl p-8">
          <p className="fm-grotesk text-fmmuted">
            For press enquiries, interviews, or the full media kit, get in touch and we&apos;ll send it over.
          </p>
          <Link href="/contact" className="group mt-6 inline-block text-sm uppercase tracking-[0.12em] text-fmfg">
            Request media kit{" "}
            <span className="inline-block text-fmaccent transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </section>
    </>
  );
}
