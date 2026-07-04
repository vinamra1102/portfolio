"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const infoRows = [
  { lbl: "Currently at", val: "Manipal University Jaipur" },
  { lbl: "Open to", val: "Internships & Full-time roles" },
  { lbl: "Based in", val: "Jaipur, Rajasthan" },
  { lbl: "Focus", val: "Cybersecurity · Forensics · Web" },
];

export default function About() {
  const leftRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLElement>(null);

  /* ── Step 10: Left paragraphs enter from left ── */
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced || !leftRef.current) return;

    const paragraphs = leftRef.current.querySelectorAll("[data-para]");

    const ctx = gsap.context(() => {
      gsap.fromTo(
        paragraphs,
        { x: -40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: leftRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );
    }, leftRef.current);

    return () => ctx.revert();
  }, []);

  /* ── Step 11: Right card scale-up + info rows stagger ── */
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced || !cardRef.current) return;

    const infoItems = cardRef.current.querySelectorAll("[data-info-row]");

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        { scale: 0.92, opacity: 0, y: 30 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 80%",
            once: true,
          },
          onComplete: () => {
            gsap.fromTo(
              infoItems,
              { x: 20, opacity: 0 },
              {
                x: 0,
                opacity: 1,
                duration: 0.5,
                stagger: 0.08,
                ease: "power3.out",
              }
            );
          },
        }
      );
    }, cardRef.current!);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" className="relative bg-canvas-dark py-24 overflow-hidden">
      <div className="section-watermark" aria-hidden="true">About</div>
      <div className="relative z-[1] mx-auto max-w-7xl px-12 max-md:px-6">
        <div className="grid grid-cols-[55%_45%] items-start gap-16 max-lg:grid-cols-1 max-lg:gap-12">
          {/* Left column */}
          <div ref={leftRef}>
            <div data-para>
              <div className="text-[11px] font-semibold uppercase tracking-[1.1px] text-muted">
                About
              </div>
              <h2 className="mt-4 font-display text-[44px] uppercase leading-[0.95] tracking-[-0.5px] text-white md:text-[56px] lg:text-[80px]">
                <span className="font-light">Engineered for</span>{" "}
                <span className="font-bold">security.</span>
              </h2>
            </div>

            <div className="mt-8">
              <p
                data-para
                className="mb-6 max-w-[520px] text-sm leading-[1.7] text-body"
              >
                I&rsquo;m an Information Technology student with a deep interest
                in cybersecurity, digital forensics, and full-stack development.
                My focus: building secure applications, understanding
                vulnerabilities, and creating tools that solve real problems.
              </p>
              <p
                data-para
                className="mb-6 max-w-[520px] text-sm leading-[1.7] text-body"
              >
                As a Cyber Forensics Intern at the State Forensic Science
                Laboratory, I built tools for digital evidence validation,
                forensic data recovery, and Android forensics &mdash; working
                hands-on with chain of custody principles and evidence integrity.
              </p>
              <p
                data-para
                className="mb-6 max-w-[520px] text-sm leading-[1.7] text-body"
              >
                Outside coursework, I compete in hackathons, present on security
                topics like SQL injection and web vulnerability analysis, and
                continuously explore the cybersecurity landscape.
              </p>
              <p
                data-para
                className="max-w-[520px] text-sm leading-[1.7] text-body"
              >
                Currently pursuing my B.Tech in Information Technology at
                Manipal University Jaipur and actively seeking internship and
                full-time opportunities in security and development.
              </p>
            </div>

            <div data-para className="mt-8 flex flex-wrap gap-4">
              <a
                href="/resume.pdf"
                className="inline-flex h-12 items-center justify-center whitespace-nowrap border border-[#969696] bg-transparent px-8 text-sm font-bold uppercase leading-none tracking-[1.4px] text-[#969696] transition-all duration-200 hover:border-white hover:bg-white/[0.04] hover:text-white"
              >
                View R&eacute;sum&eacute;
              </a>
              <a
                href="https://www.linkedin.com/in/vinamra-bhonsle-b2b569219/"
                className="inline-flex h-12 items-center justify-center whitespace-nowrap border border-[#969696] bg-transparent px-8 text-sm font-bold uppercase leading-none tracking-[1.4px] text-[#969696] transition-all duration-200 hover:border-white hover:bg-white/[0.04] hover:text-white"
                target="_blank"
                rel="noreferrer noopener"
              >
                LinkedIn &rarr;
              </a>
            </div>
          </div>

          {/* Right card */}
          <aside
            ref={cardRef}
            className="border border-hairline border-t-2 border-t-primary bg-[#1a1a1a] p-8"
            style={{ opacity: 0 }}
          >
            <div
              className="mb-6 flex aspect-[4/3] w-full items-center justify-center"
              style={{
                background:
                  "radial-gradient(ellipse at center, rgba(220,0,0,0.06) 0%, #1e1e1e 60%)",
              }}
            >
              <div
                className="font-display text-[80px] font-bold leading-none tracking-[-1px]"
                style={{ color: "#dc0000", opacity: 0.12 }}
              >
                VB
              </div>
            </div>
            <div className="font-display text-lg font-semibold text-white">Vinamra Bhonsle</div>
            <div className="mt-1 text-[11px] font-semibold uppercase tracking-[1.1px] text-muted">
              IT Student &middot; Jaipur, Rajasthan
            </div>
            <div className="my-6 h-px bg-hairline" />
            {infoRows.map((r) => (
              <div
                key={r.lbl}
                data-info-row
                className="flex items-center justify-between border-b border-hairline py-2 text-[13px] last:border-b-0"
                style={{ opacity: 0 }}
              >
                <span className="text-muted">{r.lbl}</span>
                <span className="text-white">{r.val}</span>
              </div>
            ))}
          </aside>
        </div>
      </div>
    </section>
  );
}
