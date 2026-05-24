"use client";

import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { skillCategories } from "@/lib/skills";

gsap.registerPlugin(ScrollTrigger);

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
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  /* ── Step 7: Heading enters from left ── */
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced || !headingRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { x: -60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );
    }, headingRef.current!);

    return () => ctx.revert();
  }, []);

  /* ── Step 8: Skill cards stagger in + Step 9: Red ticks animate ── */
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced || !gridRef.current) return;

    const cards = gridRef.current.querySelectorAll("[data-skill-card]");

    const ctx = gsap.context(() => {
      /* Card entry: scale + opacity */
      gsap.fromTo(
        cards,
        { scale: 0.95, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 80%",
            once: true,
          },
          onComplete: () => {
            /* Step 9: after cards are in, animate red ticks */
            cards.forEach((card, ci) => {
              const ticks = card.querySelectorAll("[data-tick]");
              gsap.fromTo(
                ticks,
                { scaleX: 0 },
                {
                  scaleX: 1,
                  duration: 0.4,
                  ease: "power2.out",
                  stagger: 0.05,
                  delay: ci * 0.05,
                }
              );
            });
          },
        }
      );
    }, gridRef.current);

    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" className="bg-canvas-dark py-24">
      <div className="mx-auto max-w-7xl px-12 max-md:px-6">
        <div className="mb-24 grid grid-cols-[40%_60%] gap-12 max-lg:grid-cols-1">
          {/* Left column — heading enters from left */}
          <div ref={headingRef} className="pr-12 max-lg:pr-0">
            <div className="text-[11px] font-semibold uppercase tracking-[1.1px] text-muted">
              Expertise
            </div>
            <h2 className="mt-4 font-display text-[40px] font-black uppercase leading-[0.95] tracking-[-1.2px] text-white md:text-[56px] md:tracking-[-1.4px]">
              Built for security.
            </h2>
            <p className="mt-6 max-w-[380px] text-sm leading-[1.7] text-body">
              A focused toolkit spanning full-stack development, cybersecurity,
              and digital forensics. Every skill earned through hands-on
              projects, internships, and hackathons.
            </p>
            <p className="mt-4 max-w-[380px] text-sm leading-[1.7] text-body">
              From building vulnerability scanners to recovering forensic
              evidence from SQLite databases, each tool in the stack has been
              battle-tested.
            </p>
            <a
              href="/resume.pdf"
              className="mt-8 inline-flex h-12 items-center justify-center whitespace-nowrap bg-primary px-8 text-sm font-bold uppercase leading-none tracking-[1.4px] text-white transition-colors hover:bg-primary-active"
            >
              Download CV
            </a>
          </div>

          {/* Right column — skill grid */}
          <div
            ref={gridRef}
            className="grid grid-cols-2 gap-px border border-hairline bg-hairline max-md:grid-cols-1"
          >
            {skillCategories.map((cat) => (
              <div
                key={cat.name}
                data-skill-card
                className="bg-[#1e1e1e] p-6"
                style={{ opacity: 0 }}
              >
                <div className="mb-4 text-[11px] font-semibold uppercase tracking-[1.1px] text-muted">
                  {cat.name}
                </div>
                {cat.items.map((s) => (
                  <div
                    key={s.name}
                    className="flex items-center gap-4 py-[6px]"
                  >
                    <span className="shrink-0 text-sm font-medium text-white">
                      {s.name}
                    </span>
                    <div className="relative h-[2px] flex-1 overflow-hidden bg-hairline">
                      <div
                        data-tick
                        className="absolute top-0 h-[2px] w-1 origin-left bg-primary"
                        style={{
                          left: `${Math.max(0, Math.min(100, s.pct) - 3)}%`,
                          transform: "scaleX(0)",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
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
                Available for internships &amp; full-time roles &middot;
                Available for internships &amp; full-time roles &middot;{" "}
              </span>
              <span className="pr-8">
                Available for internships &amp; full-time roles &middot;
                Available for internships &amp; full-time roles &middot;{" "}
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
