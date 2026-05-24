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

/* ── AnimatePresence variants for filter transitions (step 6) ── */
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

export default function Projects() {
  const [filter, setFilter] = useState<FilterValue>("all");
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  const visible =
    filter === "all" ? projects : projects.filter((p) => p.category === filter);

  /* ── GSAP clip-path reveal on initial load (step 4) ── */
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
    <section id="work" className="py-24" ref={sectionRef}>
      <div className="mx-auto max-w-7xl px-12 max-md:px-6">
        <header ref={headerRef} className="mb-12 flex flex-col gap-4">
          <div className="text-[11px] font-semibold uppercase tracking-[1.1px] text-muted">
            Selected Work
          </div>
          <h2 className="font-display text-[40px] font-black uppercase leading-[0.95] tracking-[-1.2px] text-white md:text-[56px] md:tracking-[-1.4px]">
            Projects that ship.
          </h2>
        </header>

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
                  : "border-transparent text-muted hover:text-white"
              )}
              onClick={() => setFilter(tab.value)}
              type="button"
            >
              {tab.label}
            </button>
          ))}
        </div>

        <motion.div
          ref={gridRef}
          layout
          className="grid grid-cols-3 gap-px border border-hairline bg-hairline max-lg:grid-cols-2 max-md:grid-cols-1"
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
      </div>
    </section>
  );
}

/* ── Project card with hover effects (step 5) ── */
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
      className="project-card flex flex-col transition-colors duration-[250ms]"
      style={{
        backgroundColor: hovered ? "#1e1e1e" : "#181818",
        borderLeft: hovered
          ? "4px solid #da291c"
          : "4px solid transparent",
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
          className="font-display text-5xl font-black uppercase tracking-[-1px] text-white transition-opacity duration-300"
          style={{ opacity: hovered ? 0.14 : 0.06 }}
        >
          {p.name}
        </div>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="text-[11px] font-semibold uppercase tracking-[1.1px] text-muted">
          {p.num}
        </div>
        <h3 className="mt-2 text-lg font-bold tracking-[-0.2px] text-white">
          {p.name}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-body">{p.desc}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {p.tech.map((t) => (
            <span
              key={t}
              className="rounded-full bg-canvas-elevated px-3 py-1 text-[11px] font-semibold uppercase tracking-[1.1px] text-[#b8b8b8]"
            >
              {t}
            </span>
          ))}
        </div>
        <div className="mt-auto flex items-center justify-between border-t border-hairline pt-4">
          <span className="text-[11px] font-semibold uppercase tracking-[1.1px] text-muted">
            {p.year}
          </span>
          <a
            href={`#project-${p.slug}`}
            className="inline-flex items-center gap-[6px] text-[13px] font-bold uppercase tracking-[1.4px] text-white transition-all duration-200"
            style={{
              transform: hovered ? "translateX(6px)" : "translateX(0px)",
            }}
          >
            View Project <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </div>
    </motion.article>
  );
}
