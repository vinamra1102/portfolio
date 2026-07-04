"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
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

/* ── card visual: real screenshot, or branded gradient placeholder ── */
function ProjectVisual({
  project: p,
  className,
  ghostClassName = "text-5xl",
  sizes = "(max-width: 768px) 85vw, (max-width: 1024px) 50vw, 33vw",
  watermark,
}: {
  project: Project;
  className?: string;
  ghostClassName?: string;
  sizes?: string;
  watermark?: string;
}) {
  return (
    <div data-visual className={clsx("relative overflow-hidden", className)}>
      <div data-reveal-scale className="absolute inset-0">
        {p.image ? (
          <>
            <div className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-105">
              <Image
                src={p.image}
                alt={`${p.name} interface screenshot`}
                fill
                sizes={sizes}
                className="object-cover object-top"
              />
            </div>
            {/* scrim keeps screenshots sitting inside the dark card language */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, rgba(17,17,17,0.15) 0%, rgba(17,17,17,0.05) 45%, rgba(17,17,17,0.45) 100%)",
              }}
              aria-hidden="true"
            />
          </>
        ) : (
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ background: p.gradient }}
          >
            <div className="card-texture absolute inset-0" aria-hidden="true" />
            <div
              className={clsx(
                "px-4 text-center font-display font-bold uppercase tracking-[-1px] text-white opacity-[0.06] transition-opacity duration-300 group-hover:opacity-[0.14]",
                ghostClassName
              )}
              aria-hidden="true"
            >
              {p.name}
            </div>
          </div>
        )}
      </div>
      {watermark && (
        <div
          className="pointer-events-none absolute inset-0 flex select-none items-center justify-center font-display font-bold leading-none tracking-[-4px]"
          style={{
            fontSize: "clamp(120px, 14vw, 200px)",
            color: "rgba(255,255,255,0.06)",
          }}
          aria-hidden="true"
        >
          {watermark}
        </div>
      )}
    </div>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState<FilterValue>("all");
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const featuredRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  const visible =
    filter === "all" ? rest : rest.filter((p) => p.category === filter);

  const showFeatured =
    filter === "all" || featured.category === filter;

  /* ── Pinned horizontal gallery (desktop): vertical scroll drives x ── */
  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add(
      "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
      () => {
        const wrap = galleryRef.current;
        const track = trackRef.current;
        if (!wrap || !track) return;

        const distance = () =>
          Math.max(0, track.scrollWidth - window.innerWidth);

        const tween = gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: wrap,
            start: "center center",
            end: () => "+=" + distance(),
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        return () => {
          tween.scrollTrigger?.kill();
          tween.kill();
        };
      }
    );

    return () => mm.revert();
  }, []);

  /* pin distance depends on how many cards the active filter shows */
  useEffect(() => {
    const t = setTimeout(() => ScrollTrigger.refresh(), 400);
    return () => clearTimeout(t);
  }, [visible.length]);

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

      /* card imagery settles from an overscaled state as the clip opens */
      gsap.fromTo(
        gridRef.current!.querySelectorAll("[data-reveal-scale]"),
        { scale: 1.15 },
        {
          scale: 1,
          duration: 1.2,
          ease: "power2.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 85%",
            once: true,
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

      /* screenshot wipes in left-to-right behind the card entrance */
      const visual = featuredRef.current!.querySelector("[data-visual]");
      if (visual) {
        gsap.fromTo(
          visual,
          { clipPath: "inset(0 100% 0 0)" },
          {
            clipPath: "inset(0 0% 0 0)",
            duration: 1,
            delay: 0.15,
            ease: "power3.inOut",
            scrollTrigger: {
              trigger: featuredRef.current,
              start: "top 85%",
              once: true,
            },
          }
        );
      }
    }, featuredRef.current!);

    return () => ctx.revert();
  }, []);

  /* ── Ghost watermark parallax — drifts slower than content ── */
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const section = sectionRef.current;
    if (prefersReduced || !section) return;
    const mark = section.querySelector(".section-watermark");
    if (!mark) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        mark,
        { yPercent: -62 },
        {
          yPercent: -38,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }, section);

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
          <h2 className="font-display text-[40px] uppercase leading-[0.95] tracking-[-0.5px] text-white md:text-[56px]">
            <span className="font-light">Projects that</span>{" "}
            <span className="font-bold">ship.</span>
          </h2>
        </header>

        {/* ── Featured project #01 — full-width hero card ── */}
        {showFeatured && (
          <div
            ref={featuredRef}
            className="group mb-12 grid grid-cols-[1fr_1fr] overflow-hidden border border-hairline bg-[#111111] transition-all duration-300 hover:bg-[#1a1a1a] max-lg:grid-cols-1"
            style={{
              borderLeft: "4px solid #dc0000",
              boxShadow: "-8px 0 32px rgba(220,0,0,0.12)",
              opacity: 0,
            }}
          >
            {/* Left — visual */}
            <ProjectVisual
              project={featured}
              className="min-h-[320px] max-lg:min-h-[240px]"
              sizes="(max-width: 1024px) 100vw, 50vw"
              watermark={featured.num}
            />

            {/* Right — info */}
            <div className="flex flex-col justify-center p-10 max-lg:p-8">
              <div className="text-[11px] font-semibold uppercase tracking-[1.1px] text-accent">
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
                    className="rounded-full bg-[rgba(255,215,0,0.08)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[1.1px] text-accent"
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
                      className="inline-flex items-center gap-[6px] text-[13px] font-bold uppercase tracking-[1.4px] text-primary transition-colors duration-200 hover:text-accent"
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

      </div>

      {/* ── Pinned horizontal gallery wrapper ── */}
      <div ref={galleryRef} className="relative z-[1] bg-canvas-dark py-2">
        <div className="mx-auto max-w-7xl px-12 max-md:px-6">
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
        </div>

        {/* Desktop: full-bleed horizontal track, pinned + scrubbed */}
        <div className="h-gallery max-md:hidden">
          <div
            ref={trackRef}
            className="flex w-max pb-2 pl-[max(3rem,calc((100vw-1280px)/2+3rem))] pr-12"
          >
            <motion.div
              ref={gridRef}
              className="flex gap-px border border-hairline bg-hairline"
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
        </div>

        {/* Mobile horizontal scroll gallery */}
        <div className="mx-auto max-w-7xl px-12 max-md:px-6">
          <MobileScrollGallery projects={visible} />
        </div>
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
  const tiltRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const tiltEnabled = useRef(false);

  useEffect(() => {
    tiltEnabled.current =
      window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  /* 3D tilt (±6deg) + specular highlight following the cursor */
  const handleTilt = useCallback((e: React.MouseEvent<HTMLElement>) => {
    if (!tiltEnabled.current || !tiltRef.current) return;
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    const ry = (px - 0.5) * 12;
    const rx = (0.5 - py) * 12;
    tiltRef.current.style.transform = `perspective(900px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg)`;
    if (glowRef.current) {
      glowRef.current.style.background = `radial-gradient(320px circle at ${(px * 100).toFixed(1)}% ${(py * 100).toFixed(1)}%, rgba(255,255,255,0.08), transparent 65%)`;
    }
  }, []);

  const resetTilt = useCallback(() => {
    if (tiltRef.current) {
      tiltRef.current.style.transform =
        "perspective(900px) rotateX(0deg) rotateY(0deg)";
    }
  }, []);

  return (
    <motion.article
      layout
      data-project-card
      variants={cardFilterVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      custom={index}
      className="project-card group flex w-[420px] flex-shrink-0 flex-col transition-all duration-[250ms] max-lg:w-[380px]"
      style={{
        backgroundColor: hovered ? "#1e1e1e" : "#111111",
        borderLeft: hovered ? "4px solid #dc0000" : "4px solid transparent",
        boxShadow: hovered
          ? "0 0 0 1px #303030, -4px 0 20px rgba(220,0,0,0.08)"
          : "none",
        clipPath: useClipReveal ? "inset(100% 0 0 0)" : "inset(0% 0 0 0)",
        zIndex: hovered ? 5 : "auto",
      }}
      data-category={p.category}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        resetTilt();
      }}
      onMouseMove={handleTilt}
    >
      <div
        ref={tiltRef}
        className="relative flex h-full flex-col"
        style={{
          transition: "transform 0.18s ease-out",
          willChange: "transform",
        }}
      >
        <div
          ref={glowRef}
          className="pointer-events-none absolute inset-0 z-[2] transition-opacity duration-300"
          style={{ opacity: hovered ? 1 : 0 }}
          aria-hidden="true"
        />
        <ProjectVisual project={p} className="h-60" />
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
                backgroundColor: hovered ? "#3a0c0a" : "#303030",
                color: hovered ? "#dc0000" : "#b8b8b8",
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
                className="inline-flex items-center gap-[6px] text-[13px] font-bold uppercase tracking-[1.4px] text-primary transition-colors duration-200 hover:text-accent"
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
            className="group w-[85vw] flex-shrink-0 snap-start border border-hairline bg-[#111111]"
          >
            <ProjectVisual
              project={p}
              className="h-48"
              ghostClassName="text-4xl"
              sizes="85vw"
            />
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
