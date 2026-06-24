import { getSiteSettings } from "@/lib/public-data";
import { PageHero } from "@/components/site/PageHero";

export const revalidate = 60;

export default async function Contact() {
  const s = await getSiteSettings();
  const socials = s.socials ?? {};
  return (
    <>
      <PageHero index="Contact" title="Let's create something that ships." intro="Brief to opening night. Tell us about the project, the venue, and the date." />
      <section className="mx-auto max-w-3xl px-5 pb-24 md:px-8">
        <div className="grid gap-px overflow-hidden rounded-xl border border-fmborder bg-fmborder sm:grid-cols-2">
          <a href={`mailto:${s.email}`} className="group bg-fmbg p-6 transition-colors hover:bg-fmmutedbg">
            <p className="text-[10px] uppercase tracking-[0.12em] text-fmmuted">Email</p>
            <p className="fm-grotesk mt-2 text-base text-fmfg group-hover:text-fmaccent">{s.email}</p>
          </a>
          <div className="bg-fmbg p-6">
            <p className="text-[10px] uppercase tracking-[0.12em] text-fmmuted">Phone</p>
            <p className="fm-grotesk mt-2 text-base text-fmfg">{s.phone}</p>
          </div>
          <div className="bg-fmbg p-6">
            <p className="text-[10px] uppercase tracking-[0.12em] text-fmmuted">Based</p>
            <p className="fm-grotesk mt-2 text-base text-fmfg">{s.location} · Miami 2027</p>
          </div>
          <div className="bg-fmbg p-6">
            <p className="text-[10px] uppercase tracking-[0.12em] text-fmmuted">Social</p>
            <p className="fm-grotesk mt-2 text-sm text-fmfg">
              {[socials.instagram, socials.tiktok, socials.linkedin].filter(Boolean).join("  ·  ")}
            </p>
          </div>
        </div>

        <a href={`mailto:${s.email}`} className="group mt-12 inline-block text-sm uppercase tracking-[0.14em] text-fmfg">
          Start a conversation{" "}
          <span className="inline-block text-fmaccent transition-transform group-hover:translate-x-1">↠</span>
        </a>
      </section>
    </>
  );
}
