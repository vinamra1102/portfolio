"use client";

import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { skillCategories } from "@/lib/skills";
import Reveal from "./Reveal";

const tickerItems = [
  "React",
  "Node",
  "Postgres",
  "Python",
  "Django",
  "TypeScript",
  "Docker",
  "Next.js",
  "FastAPI",
  "Tailwind",
  "Firebase",
  "Wireshark",
  "Java",
  "Git",
  "Kubernetes",
];

export default function Skills() {
  const gridRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setInView(true);
            obs.disconnect();
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="skills" className="bg-canvas-dark py-24">
      <div className="mx-auto max-w-7xl px-12 max-md:px-6">
        <div className="mb-24 grid grid-cols-[40%_60%] gap-12 max-lg:grid-cols-1">
          <Reveal as="div" className="pr-12 max-lg:pr-0">
            <div className="text-[11px] font-semibold uppercase tracking-[1.1px] text-muted">
              Expertise
            </div>
            <h2 className="mt-4 font-display text-[40px] font-black uppercase leading-[0.95] tracking-[-1.2px] text-white md:text-[56px] md:tracking-[-1.4px]">
              Built for security.
            </h2>
            <p className="mt-6 max-w-[380px] text-sm leading-[1.7] text-body">
              A focused toolkit spanning full-stack development, cybersecurity, and digital
              forensics. Every skill earned through hands-on projects, internships, and
              hackathons.
            </p>
            <p className="mt-4 max-w-[380px] text-sm leading-[1.7] text-body">
              From building vulnerability scanners to recovering forensic evidence from
              SQLite databases, each tool in the stack has been battle-tested.
            </p>
            <a
              href="/resume.pdf"
              className="mt-8 inline-flex h-12 items-center justify-center whitespace-nowrap bg-primary px-8 text-sm font-bold uppercase leading-none tracking-[1.4px] text-white transition-colors hover:bg-primary-active"
            >
              Download CV
            </a>
          </Reveal>

          <div
            ref={gridRef}
            className="grid grid-cols-2 gap-px border border-hairline bg-hairline max-md:grid-cols-1"
          >
            {skillCategories.map((cat, ci) => (
              <Reveal
                key={cat.name}
                as="div"
                className="bg-[#1e1e1e] p-6"
                delay={ci * 0.05}
              >
                <div className="mb-4 text-[11px] font-semibold uppercase tracking-[1.1px] text-muted">
                  {cat.name}
                </div>
                {cat.items.map((s, i) => (
                  <div key={s.name} className="flex items-center gap-4 py-[6px]">
                    <span className="shrink-0 text-sm font-medium text-white">{s.name}</span>
                    <div className="relative h-[2px] flex-1 overflow-hidden bg-hairline">
                      <div
                        className={clsx(
                          "absolute top-0 h-[2px] w-1 origin-left bg-primary transition-transform duration-[400ms] ease-out",
                          inView ? "scale-x-100" : "scale-x-0"
                        )}
                        style={{
                          left: `${Math.max(0, Math.min(100, s.pct) - 3)}%`,
                          transitionDelay: `${ci * 0.05 + i * 0.06}s`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* ── scrolling tech ticker ── */}
      <div className="overflow-hidden border-y border-hairline bg-canvas-dark py-5">
        <div className="inline-flex animate-marquee whitespace-nowrap">
          {[...tickerItems, ...tickerItems].map((t, i) => (
            <span
              key={i}
              className="flex items-center px-5 font-display text-[14px] font-bold uppercase tracking-[1.6px] text-white"
            >
              {t}
              <span className="ml-10 inline-block h-[5px] w-[5px] rotate-45 bg-primary" />
            </span>
          ))}
        </div>
      </div>

      <div className="bg-primary px-16 py-12 max-lg:px-8 max-md:px-6">
        <div className="flex flex-wrap items-center justify-between gap-8 max-md:hidden">
          <div className="font-display text-[36px] font-black uppercase leading-[0.95] tracking-[-1px] text-white max-lg:text-[26px]">
            Available for internships &amp; full-time roles
          </div>
          <a
            href="#contact"
            className="inline-flex h-12 items-center justify-center whitespace-nowrap border border-white bg-transparent px-8 text-sm font-bold uppercase leading-none tracking-[1.4px] text-white transition-colors hover:bg-white/5"
          >
            Get In Touch &rarr;
          </a>
        </div>

        <div className="hidden max-md:block">
          <div className="overflow-hidden">
            <div className="inline-flex animate-marquee whitespace-nowrap font-display text-[26px] font-black uppercase tracking-[-0.26px] text-white">
              <span className="pr-8">
                Available for internships &amp; full-time roles &middot; Available for
                internships &amp; full-time roles &middot;{" "}
              </span>
              <span className="pr-8">
                Available for internships &amp; full-time roles &middot; Available for
                internships &amp; full-time roles &middot;{" "}
              </span>
            </div>
          </div>
          <a
            href="#contact"
            className="mt-6 inline-flex h-12 items-center justify-center whitespace-nowrap border border-white bg-transparent px-8 text-sm font-bold uppercase leading-none tracking-[1.4px] text-white transition-colors hover:bg-white/5"
          >
            Get In Touch &rarr;
          </a>
        </div>
      </div>
    </section>
  );
}
