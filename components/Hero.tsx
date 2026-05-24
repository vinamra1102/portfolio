"use client";

import { motion, Variants } from "framer-motion";
import CountUp from "./ui/CountUp";

/* ── reduced-motion guard (static render) ── */
const usePrefersReduced = () => {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

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
  { to: 48, suffix: "+", label: "Projects Built" },
  { to: 3, suffix: "+", label: "Hackathons" },
  { to: 1, suffix: "", label: "Internship" },
];

const headlinePrimary = "Vinamra Bhonsle".split(" ");
const headlineSecondary = "Developer & cybersecurity enthusiast.".split(" ");

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col justify-between overflow-hidden bg-[radial-gradient(ellipse_at_60%_50%,#222_0%,#111_100%)] px-12 pb-12 pt-32 max-md:px-6 max-md:pt-24"
    >
      <div className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center pt-16">
        {/* Eyebrow */}
        <motion.div
          className="mb-6 border-l-2 border-primary pl-4 text-[11px] font-semibold uppercase tracking-[1.1px] text-muted"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
        >
          Developer &amp; Cybersecurity Enthusiast
        </motion.div>

        {/* Headline — word-by-word blur reveal */}
        <motion.h1
          className="font-display text-[40px] font-black uppercase leading-[0.9] tracking-[-1px] text-white md:text-[56px] md:tracking-[-2px] lg:text-[80px] lg:tracking-[-3px]"
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
            className="mt-4 block overflow-hidden text-[clamp(20px,4.5vw,56px)] leading-none tracking-[-1.4px] text-body"
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
          Building secure, robust software with a passion for digital forensics,
          application security, and full-stack development.
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
            className="inline-flex h-12 items-center justify-center whitespace-nowrap bg-primary px-8 text-sm font-bold uppercase leading-none tracking-[1.4px] text-white transition-colors hover:bg-primary-active"
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
      </div>

      {/* ── Stat counters with CountUp ── */}
      <motion.div
        className="mx-auto mt-24 grid w-full max-w-7xl grid-cols-3 border-t border-hairline max-md:grid-cols-1"
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
            className="border-hairline py-8 pr-8 max-md:border-b max-md:last:border-b-0 md:border-r md:last:border-r-0"
          >
            <div className="font-display text-[56px] font-black leading-none tracking-[-2px] text-white max-md:text-[40px]">
              <CountUp to={s.to} suffix={s.suffix} duration={1.5} />
            </div>
            <div className="mt-4 text-[11px] font-semibold uppercase tracking-[1.1px] text-muted">
              {s.label}
            </div>
          </div>
        ))}
      </motion.div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bob text-muted"
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
