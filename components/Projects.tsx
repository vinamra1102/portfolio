"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  projects,
  projectFilters,
  type Project,
  type ProjectCategory,
} from "@/lib/projects";

gsap.registerPlugin(ScrollTrigger);

type FilterValue = "all" | ProjectCategory;

/* ── AnimatePresence variants for filter transitions ── */
const cardFilterVariants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
      delay: i * 0.08,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.2, ease: "easeIn" },
  },
};

const featured = projects[0]; // #01
const rest = projects.slice(1);

export default function Projects() {
  const [filter, setFilter] = useState<FilterValue>("all");
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const featuredRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  const visible =
    filter === "all" ? rest : rest.filter((p) => p.category === filter);

  const showFeatured =
    filter === "all" || featured.category === filter;

  /* ── GSAP clip-path reveal on initial load ── */
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced || !gridRef.current || hasAnimated.current) return;

    const cards = gridRef.current.querySelectorAll("[data-project-card]");
    if (!cards.length) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cards,
        { clipPath: "inset(100% 0 0 0)" },
        {
          clipPath: "inset(0% 0 0 0)",
          duration: 0.85,
          ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 85%",
            once: true,
          },
          onComplete: () => {
            hasAnimated.current = true;
          },
        }
      );
    }, gridRef.current);

    return () => ctx.revert();
  }, []);

  /* ── Featured card reveal ── */
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced || !featuredRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        featuredRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: featuredRef.current,
            start: "top 85%",
            once: true,
          },
        }
      );
    }, featuredRef.current!);

    return () => ctx.revert();
  }, []);

  /* ── Header reveal ── */
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced || !headerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
            once: true,
          },
        }
      );
    }, headerRef.current!);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="work"
      className="relative overflow-hidden bg-canvas-dark py-24"
      ref={sectionRef}
    >
      <div className="section-watermark" aria-hidden="true">
        Work
      </div>
      <div className="relative z-[1] mx-auto max-w-7xl px-12 max-md:px-6">
        <header ref={headerRef} className="mb-12 flex flex-col gap-4">
          <div className="text-[11px] font-semibold uppercase tracking-[1.1px] text-muted">
            Selected Work
          </div>
          <h2 className="font-display text-[40px] font-semibold uppercase leading-[0.95] tracking-[-0.5px] text-white md:text-[56px]">
            Projects that ship.
          </h2>
        </header>

        {/* ── Featured project #01 — full-width hero card ── */}
        {showFeatured && (
          <div
            ref={featuredRef}
            className="group mb-12 grid grid-cols-[1fr_1fr] overflow-hidden border border-hairline bg-[#111111] transition-all duration-300 hover:bg-[#1a1a1a] max-lg:grid-cols-1"
            style={{
              borderLeft: "4px solid #da291c",
              boxShadow: "-8px 0 32px rgba(218,41,28,0.12)",
              opacity: 0,
            }}
          >
            {/* Left — visual */}
            <div
              className="relative flex min-h-[320px] items-center justify-center overflow-hidden max-lg:min-h-[240px]"
              style={{ background: featured.gradient }}
            >
              {/* Giant watermark number */}
              <div
                className="pointer-events-none select-none font-display font-bold leading-none tracking-[-4px]"
                style={{
                  fontSize: "clamp(120px, 14vw, 200px)",
                  color: "rgba(255,255,255,0.04)",
                }}
                aria-hidden="true"
              >
                {featured.num}
              </div>
              {/* Name ghost */}
              <div
                className="absolute inset-0 flex items-center justify-center font-display text-5xl font-bold uppercase tracking-[-1px] text-white opacity-[0.06] transition-opacity duration-300 group-hover:opacity-[0.14]"
                aria-hidden="true"
              >
                {featured.name}
              </div>
            </div>

            {/* Right — info */}
            <div className="flex flex-col justify-center p-10 max-lg:p-8">
              <div className="text-[11px] font-semibold uppercase tracking-[1.1px] text-muted">
                Featured Project &middot; {featured.num}
              </div>
              <h3 className="mt-3 font-display text-[28px] font-semibold tracking-[0.2px] text-white md:text-[32px]">
                {featured.name}
              </h3>
              <p className="mt-3 max-w-[440px] text-sm leading-relaxed text-body">
                {featured.desc}
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {featured.tech.map((t) => (
                  <span
                    key={t}
                    className="rounded-full bg-[#3a1a18] px-3 py-1 text-[11px] font-semibold uppercase tracking-[1.1px] text-primary"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <div className="mt-8 flex items-center justify-between border-t border-hairline pt-4">
                <span className="text-[11px] font-semibold uppercase tracking-[1.1px] text-muted">
                  {featured.year}
                </span>
                <div className="flex items-center gap-6">
                  {featured.live && (
                    <a
                      href={featured.live}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex items-center gap-[6px] text-[13px] font-bold uppercase tracking-[1.4px] text-primary transition-colors duration-200 hover:text-white"
                    >
                      Live <span aria-hidden="true">&#8599;</span>
                    </a>
                  )}
                  <a
                    href={featured.repo}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-[6px] text-[13px] font-bold uppercase tracking-[1.4px] text-white transition-transform duration-200 group-hover:translate-x-[6px]"
                  >
                    View Code <span aria-hidden="true">&rarr;</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        <div
          className="mb-12 flex gap-8 border-b border-hairline"
          role="tablist"
          aria-label="Project category filter"
        >
          {projectFilters.map((tab) => (
            <button
              key={tab.value}
              role="tab"
              aria-selected={filter === tab.value}
              className={clsx(
                "-mb-px border-b-2 py-4 text-[13px] font-semibold uppercase tracking-[0.65px] transition-colors",
                filter === tab.value
                  ? "border-primary text-white"
                  : "border-transparent text-[#666] hover:text-white"
              )}
              onClick={() => setFilter(tab.value)}
              type="button"
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Desktop grid */}
        <motion.div
          ref={gridRef}
          layout
          className="grid grid-cols-3 gap-px border border-hairline bg-hairline max-lg:grid-cols-2 max-md:hidden"
        >
          <AnimatePresence mode="popLayout">
            {visible.map((p, i) => (
              <ProjectCard
                key={p.slug}
                project={p}
                index={i}
                useClipReveal={!hasAnimated.current && filter === "all"}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Mobile horizontal scroll gallery */}
        <MobileScrollGallery projects={visible} />
      </div>
    </section>
  );
}

/* ── Project card with hover effects ── */
function ProjectCard({
  project: p,
  index,
  useClipReveal,
}: {
  project: Project;
  index: number;
  useClipReveal: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.article
      layout
      data-project-card
      variants={cardFilterVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      custom={index}
      className="project-card flex flex-col transition-all duration-[250ms]"
      style={{
        backgroundColor: hovered ? "#1e1e1e" : "#111111",
        borderLeft: hovered ? "4px solid #da291c" : "4px solid transparent",
        boxShadow: hovered
          ? "0 0 0 1px #303030, -4px 0 20px rgba(218,41,28,0.08)"
          : "none",
        clipPath: useClipReveal ? "inset(100% 0 0 0)" : "inset(0% 0 0 0)",
      }}
      data-category={p.category}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="relative flex h-60 items-center justify-center overflow-hidden"
        style={{ background: p.gradient }}
      >
        <div
          className="font-display text-5xl font-bold uppercase tracking-[-1px] text-white transition-opacity duration-300"
          style={{ opacity: hovered ? 0.14 : 0.06 }}
        >
          {p.name}
        </div>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="text-[11px] font-semibold uppercase tracking-[1.1px] text-muted">
          {p.num}
        </div>
        <h3 className="mt-2 font-display text-[20px] font-semibold tracking-[0.2px] text-white">
          {p.name}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-body">{p.desc}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {p.tech.map((t) => (
            <span
              key={t}
              className="rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[1.1px] transition-colors duration-200"
              style={{
                backgroundColor: hovered ? "#3a1a18" : "#303030",
                color: hovered ? "#da291c" : "#b8b8b8",
              }}
            >
              {t}
            </span>
          ))}
        </div>
        <div className="mt-auto flex items-center justify-between border-t border-hairline pt-4">
          <span className="text-[11px] font-semibold uppercase tracking-[1.1px] text-muted">
            {p.year}
          </span>
          <div className="flex items-center gap-5">
            {p.live && (
              <a
                href={p.live}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-[6px] text-[13px] font-bold uppercase tracking-[1.4px] text-primary transition-colors duration-200 hover:text-white"
              >
                Live <span aria-hidden="true">&#8599;</span>
              </a>
            )}
            <a
              href={p.repo}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-[6px] text-[13px] font-bold uppercase tracking-[1.4px] text-white transition-all duration-200"
              style={{
                transform: hovered ? "translateX(6px)" : "translateX(0px)",
              }}
            >
              View Code <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

/* ── Mobile horizontal scroll gallery ── */
function MobileScrollGallery({ projects }: { projects: Project[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  const onScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setProgress(max > 0 ? el.scrollLeft / max : 0);
  }, []);

  return (
    <div className="hidden max-md:block">
      {/* Scroll hint */}
      <div className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[1.1px] text-muted">
        <span>Scroll</span>
        <span aria-hidden="true">&rarr;</span>
      </div>

      <div
        ref={scrollRef}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4"
        onScroll={onScroll}
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {projects.map((p) => (
          <article
            key={p.slug}
            className="w-[85vw] flex-shrink-0 snap-start border border-hairline bg-[#111111]"
          >
            <div
              className="relative flex h-48 items-center justify-center overflow-hidden"
              style={{ background: p.gradient }}
            >
              <div className="font-display text-4xl font-bold uppercase tracking-[-1px] text-white opacity-[0.06]">
                {p.name}
              </div>
            </div>
            <div className="flex flex-col p-5">
              <div className="text-[11px] font-semibold uppercase tracking-[1.1px] text-muted">
                {p.num}
              </div>
              <h3 className="mt-2 font-display text-[18px] font-semibold tracking-[0.2px] text-white">
                {p.name}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-body">{p.desc}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {p.tech.map((t) => (
                  <span
                    key={t}
                    className="rounded-full bg-[#303030] px-3 py-1 text-[11px] font-semibold uppercase tracking-[1.1px] text-[#b8b8b8]"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <div className="mt-4 flex items-center justify-between border-t border-hairline pt-4">
                <span className="text-[11px] font-semibold uppercase tracking-[1.1px] text-muted">
                  {p.year}
                </span>
                <div className="flex items-center gap-5">
                  {p.live && (
                    <a
                      href={p.live}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="text-[13px] font-bold uppercase tracking-[1.4px] text-primary"
                    >
                      Live &#8599;
                    </a>
                  )}
                  <a
                    href={p.repo}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="text-[13px] font-bold uppercase tracking-[1.4px] text-white"
                  >
                    Code &rarr;
                  </a>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Progress bar */}
      <div className="mt-2 h-[2px] w-full overflow-hidden bg-hairline">
        <div
          className="h-full bg-primary transition-[width] duration-100"
          style={{ width: `${Math.max(5, progress * 100)}%` }}
        />
      </div>
    </div>
  );
}
