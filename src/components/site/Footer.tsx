import Link from "next/link";
import type { SiteSettings } from "@/lib/site-data";

const NAV: [string, string][] = [
  ["Work", "/projects"],
  ["Services", "/services"],
  ["Industries", "/industries"],
  ["Journal", "/journal"],
  ["About", "/about"],
  ["Contact", "/contact"],
];

export function Footer({ settings }: { settings: SiteSettings }) {
  const year = new Date().getFullYear();
  const socials = settings.socials ?? {};
  return (
    <footer className="relative z-10 border-t border-fmborder">
      <div className="mx-auto max-w-[1200px] px-5 py-16 md:px-8">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="fm-display text-3xl text-fmfg">
              FMRXR<span className="text-fmaccent">//</span>
            </div>
            <p className="fm-grotesk mt-4 max-w-xs text-sm text-fmmuted">
              {settings.description}
            </p>
            <p className="mt-6 text-[11px] uppercase tracking-[0.12em] text-fmmuted">
              <span className="text-fmaccent">●</span> Available for projects — {settings.location}
            </p>
          </div>

          <div>
            <p className="mb-4 text-[10px] uppercase tracking-[0.15em] text-fmmuted">Navigate</p>
            <ul className="flex flex-col gap-2">
              {NAV.map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="fm-link text-[13px] text-fmfg/80">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-4 text-[10px] uppercase tracking-[0.15em] text-fmmuted">Contact</p>
            <ul className="flex flex-col gap-2 text-[13px] text-fmfg/80">
              <li><a href={`mailto:${settings.email}`} className="fm-link">{settings.email}</a></li>
              {settings.phone && <li className="text-fmmuted">{settings.phone}</li>}
            </ul>
            <p className="mb-3 mt-6 text-[10px] uppercase tracking-[0.15em] text-fmmuted">Social</p>
            <ul className="flex flex-wrap gap-x-4 gap-y-2 text-[12px] text-fmfg/80">
              {socials.instagram && <li>{socials.instagram}</li>}
              {socials.tiktok && <li>{socials.tiktok}</li>}
              {socials.linkedin && <li>{socials.linkedin}</li>}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-fmborder pt-6 text-[11px] uppercase tracking-[0.08em] text-fmmuted md:flex-row md:items-center md:justify-between">
          <p>© {year} {settings.name} — {settings.tagline}</p>
          <p>{settings.founder} · Tunis, TN</p>
        </div>
      </div>
    </footer>
  );
}
