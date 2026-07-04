"use client";

import { useRef } from "react";
import {
  motion,
  Variants,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import CountUp from "./ui/CountUp";

/* ── word-by-word blur reveal ── */
const wordContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
    },
  },
};

const wordChild: Variants = {
  hidden: { y: 80, opacity: 0, filter: "blur(4px)" },
  visible: {
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

/* ── subtitle fade ── */
const subtitleVariant: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

/* ── CTA buttons ── */
const ctaContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.8,
      staggerChildren: 0.1,
    },
  },
};

const ctaChild: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const stats = [
  { to: 37, suffix: "", label: "Public Repos" },
  { to: 8, suffix: "", label: "Live Deployments" },
  { to: 1, suffix: "", label: "Forensics Internship" },
];

const headlinePrimary = "Vinamra Bhonsle".split(" ");
const headlineSecondary = "Cybersecurity, forensics & web development.".split(" ");

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReduced = useReducedMotion();

  /* ── Parallax + fade-out on scroll ── */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], prefersReduced ? ["0%", "0%"] : ["0%", "30%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], prefersReduced ? ["0%", "0%"] : ["0%", "15%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], prefersReduced ? [1, 1] : [1, 0]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen overflow-hidden"
    >
      {/* Parallax background layer */}
      <motion.div
        className="absolute inset-0"
        style={{
          y: bgY,
          background:
            "radial-gradient(ellipse at 60% 50%, #222 0%, #111 100%)",
        }}
        aria-hidden="true"
      />

      {/* Red ambient glow — bottom left */}
      <motion.div
        className="pointer-events-none absolute bottom-0 left-0 h-[400px] w-[700px]"
        style={{
          y: bgY,
          background:
            "radial-gradient(ellipse at 0% 100%, rgba(218,41,28,0.08) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* Content layer with parallax + fade */}
      <motion.div
        className="relative flex min-h-screen flex-col justify-end px-12 pb-16 pt-32 max-md:px-6 max-md:pt-24"
        style={{ y: contentY, opacity: heroOpacity }}
      >
        <div className="mx-auto w-full max-w-7xl">
          {/* Vertical red accent line */}
          <div
            className="absolute left-12 top-32 hidden h-[80px] w-[2px] bg-primary lg:block"
            aria-hidden="true"
          />

          {/* Eyebrow */}
          <motion.div
            className="mb-6 border-l-2 border-primary pl-4 text-[11px] font-semibold uppercase tracking-[1.1px] text-muted"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
          >
            B.Tech IT &middot; Manipal University Jaipur
          </motion.div>

          {/* Headline — word-by-word blur reveal */}
          <motion.h1
            className="font-display text-[clamp(52px,8vw,96px)] font-bold uppercase leading-[0.9] tracking-[-1px] text-white"
            variants={wordContainer}
            initial="hidden"
            animate="visible"
          >
            <span className="block overflow-hidden">
              {headlinePrimary.map((w, i) => (
                <motion.span
                  key={`p-${i}`}
                  className="mr-[0.25em] inline-block"
                  variants={wordChild}
                >
                  {w}
                </motion.span>
              ))}
            </span>
            <motion.span
              className="mt-4 block overflow-hidden text-[clamp(20px,4.5vw,56px)] font-normal leading-none tracking-[-0.5px] text-body"
              variants={subtitleVariant}
            >
              {headlineSecondary.map((w, i) => (
                <span key={`s-${i}`} className="mr-[0.25em] inline-block">
                  {w}
                </span>
              ))}
            </motion.span>
          </motion.h1>

          {/* Description */}
          <motion.p
            className="mt-6 max-w-[480px] text-lg font-normal leading-relaxed text-body max-md:text-base"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              delay: 0.5,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            B.Tech IT student at Manipal University Jaipur, building secure
            software &mdash; from vulnerability scanners and forensic tools to
            full-stack products.
          </motion.p>

          {/* CTA Buttons — staggered entry */}
          <motion.div
            className="mt-12 flex flex-wrap gap-4"
            variants={ctaContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.a
              href="#work"
              className="btn-red inline-flex h-12 items-center justify-center whitespace-nowrap bg-primary px-8 text-sm font-bold uppercase leading-none tracking-[1.4px] text-white transition-colors hover:bg-primary-active"
              variants={ctaChild}
            >
              View My Work
            </motion.a>
            <motion.a
              href="#contact"
              className="inline-flex h-12 items-center justify-center whitespace-nowrap border border-white bg-transparent px-8 text-sm font-bold uppercase leading-none tracking-[1.4px] text-white transition-colors hover:bg-white/5"
              variants={ctaChild}
            >
              Get In Touch
            </motion.a>
          </motion.div>

          {/* ── Stat counters with CountUp ── */}
          <motion.div
            className="mt-24 grid w-full grid-cols-3 border-t border-hairline max-md:grid-cols-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              delay: 1.0,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {stats.map((s, i) => (
              <div
                key={i}
                className="relative py-8 pr-8 max-md:border-b max-md:border-hairline max-md:last:border-b-0"
              >
                {/* Gradient fade divider between stats (desktop only) */}
                {i < stats.length - 1 && (
                  <div
                    className="absolute right-0 top-1/2 hidden h-[80px] w-px -translate-y-1/2 md:block"
                    style={{
                      background:
                        "linear-gradient(180deg, transparent 0%, #303030 30%, #303030 70%, transparent 100%)",
                    }}
                    aria-hidden="true"
                  />
                )}
                <div className="font-display text-[56px] font-bold leading-none tracking-[-1px] text-white max-md:text-[40px]">
                  <CountUp to={s.to} suffix={s.suffix} duration={1.5} />
                </div>
                <div className="mt-4 text-[11px] font-semibold uppercase tracking-[1.1px] text-muted">
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 animate-bob text-muted"
        aria-hidden="true"
      >
        <svg
          width="18"
          height="10"
          viewBox="0 0 18 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M1 1L9 9L17 1" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </div>
    </section>
  );
}
