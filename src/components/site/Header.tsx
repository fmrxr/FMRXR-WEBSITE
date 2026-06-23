"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const NAV: [string, string][] = [
  ["Work", "/projects"],
  ["Services", "/services"],
  ["Industries", "/industries"],
  ["Journal", "/journal"],
  ["About", "/about"],
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
        scrolled ? "border-fmborder bg-[#0d0c14]/85 backdrop-blur-md" : "border-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-[1200px] items-center justify-between px-5 py-4 md:px-8">
        <Link href="/" className="fm-display text-base tracking-[0.04em] text-fmfg">
          FMRXR<span className="text-fmaccent">//</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              className="fm-link text-[11px] uppercase tracking-[0.12em] text-fmmuted"
            >
              {label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="group text-[11px] uppercase tracking-[0.12em] text-fmfg"
          >
            Start a project{" "}
            <span className="text-fmaccent transition-transform group-hover:translate-x-0.5 inline-block">→</span>
          </Link>
        </nav>

        <button
          onClick={() => setOpen((o) => !o)}
          className="text-[11px] uppercase tracking-[0.12em] text-fmmuted md:hidden"
          aria-label="Toggle menu"
        >
          {open ? "Close ✕" : "Menu ≡"}
        </button>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-fmborder bg-[#0d0c14] px-5 py-4 md:hidden">
          {[...NAV, ["Contact", "/contact"] as [string, string]].map(([label, href]) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="py-2 text-[13px] uppercase tracking-[0.1em] text-fmmuted"
            >
              {label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
