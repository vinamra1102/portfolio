"use client";

import { useState } from "react";
import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";
import {
  projects,
  projectFilters,
  type Project,
  type ProjectCategory,
} from "@/lib/projects";
import Reveal from "./Reveal";

type FilterValue = "all" | ProjectCategory;

export default function Projects() {
  const [filter, setFilter] = useState<FilterValue>("all");

  const visible =
    filter === "all" ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="work" className="py-24">
      <div className="mx-auto max-w-7xl px-12 max-md:px-6">
        <Reveal as="header" className="mb-12 flex flex-col gap-4">
          <div className="text-[11px] font-semibold uppercase tracking-[1.1px] text-muted">
            Selected Work
          </div>
          <h2 className="font-display text-[40px] font-black uppercase leading-[0.95] tracking-[-1.2px] text-white md:text-[56px] md:tracking-[-1.4px]">
            Projects that ship.
          </h2>
        </Reveal>

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
          layout
          className="grid grid-cols-3 gap-px border border-hairline bg-hairline max-lg:grid-cols-2 max-md:grid-cols-1"
        >
          <AnimatePresence mode="popLayout">
            {visible.map((p, i) => (
              <ProjectCard key={p.slug} project={p} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

function ProjectCard({
  project: p,
  index,
}: {
  project: Project;
  index: number;
}) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{
        duration: 0.4,
        delay: index * 0.06,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="project-card flex flex-col bg-canvas transition-colors hover:bg-[#222]"
      data-category={p.category}
    >
      <div
        className="relative flex h-60 items-center justify-center overflow-hidden"
        style={{ background: p.gradient }}
      >
        <div className="font-display text-5xl font-black uppercase tracking-[-1px] text-white opacity-[0.06] transition-opacity duration-300 group-hover:opacity-[0.12]">
          {p.name}
        </div>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="text-[11px] font-semibold uppercase tracking-[1.1px] text-muted">
          {p.num}
        </div>
        <h3 className="mt-2 text-lg font-bold tracking-[-0.2px] text-white">{p.name}</h3>
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
            className="inline-flex items-center gap-[6px] text-[13px] font-bold uppercase tracking-[1.4px] text-white transition-[gap] duration-200 hover:gap-3"
          >
            View Project <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </div>
    </motion.article>
  );
}
