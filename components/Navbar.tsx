"use client";

import { useEffect, useRef, useState } from "react";
import clsx from "clsx";

const links = [
  { id: "work", label: "Work" },
  { id: "skills", label: "Skills" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");
  const [mobileOpen, setMobileOpen] = useState(false);

  /* ── Step 16: Scroll-aware background transition ── */
  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        setScrolled(window.scrollY > 80);
        frame = 0;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  /* ── Step 17: IntersectionObserver active section highlight ── */
  useEffect(() => {
    const sections = links
      .map((l) => document.getElementById(l.id))
      .filter(Boolean) as HTMLElement[];

    if (!sections.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      {
        rootMargin: "-25% 0px -60% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  return (
    <nav
      ref={navRef}
      className={clsx(
        "fixed inset-x-0 top-0 z-[100] h-16 border-b transition-all duration-300",
        scrolled
          ? "border-[rgba(218,41,28,0.2)] bg-[rgba(24,24,24,0.95)] backdrop-blur-[12px]"
          : "border-transparent bg-[rgba(24,24,24,0)]"
      )}
    >
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between gap-8 px-12 max-md:px-6">
        <a
          href="#hero"
          className="inline-flex items-baseline leading-none text-white"
        >
          <span className="font-display text-[15px] font-bold uppercase tracking-[2px] lg:text-[16px]">VINAMRA</span>
          <span className="ml-[5px] font-sans text-[15px] font-normal tracking-[2px] lg:text-[16px]">BHONSLE</span>
        </a>

        <ul className="flex items-center gap-8 max-md:hidden">
          {links.map((l) => (
            <li key={l.id} className="list-none">
              <a
                href={`#${l.id}`}
                className={clsx(
                  "nav-link py-2 text-[13px] font-semibold uppercase tracking-[0.65px] text-white transition-colors",
                  active === l.id && "active"
                )}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className="btn-red inline-flex h-12 items-center justify-center whitespace-nowrap bg-primary px-8 text-sm font-bold uppercase leading-none tracking-[1.4px] text-white transition-colors hover:bg-primary-active max-md:hidden"
        >
          Hire Me
        </a>

        <button
          type="button"
          className="hidden flex-col gap-[5px] p-[6px] max-md:flex"
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
        >
          <span className="block h-[1.5px] w-full bg-white" />
          <span className="block h-[1.5px] w-full bg-white" />
          <span className="block h-[1.5px] w-full bg-white" />
        </button>
      </div>

      {mobileOpen && (
        <div className="absolute inset-x-0 top-16 flex flex-col gap-4 border-b border-hairline bg-canvas p-6">
          {links.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className={clsx(
                "block border-b border-hairline py-4 text-sm font-semibold uppercase tracking-[0.65px] text-white",
                active === l.id && "text-primary"
              )}
              onClick={() => setMobileOpen(false)}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            className="btn-red inline-flex h-12 w-full items-center justify-center bg-primary text-sm font-bold uppercase tracking-[1.4px] text-white transition-colors hover:bg-primary-active"
            onClick={() => setMobileOpen(false)}
          >
            Hire Me
          </a>
        </div>
      )}
    </nav>
  );
}
