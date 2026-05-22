"use client";

import { motion, Variants } from "framer-motion";

const container: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.15,
      staggerChildren: 0.03,
    },
  },
};

const word: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: 0.4 + i * 0.08,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const stats = [
  { num: "48+", label: "Projects Built" },
  { num: "3+", label: "Hackathons" },
  { num: "1", label: "Internship" },
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
        <motion.div
          className="mb-6 border-l-2 border-primary pl-4 text-[11px] font-semibold uppercase tracking-[1.1px] text-muted"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
        >
          Developer &amp; Cybersecurity Enthusiast
        </motion.div>

        <motion.h1
          className="font-display text-[40px] font-black uppercase leading-[0.9] tracking-[-1px] text-white md:text-[56px] md:tracking-[-2px] lg:text-[80px] lg:tracking-[-3px]"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          <span className="block overflow-hidden">
            {headlinePrimary.map((w, i) => (
              <motion.span key={`p-${i}`} className="mr-[0.25em] inline-block" variants={word}>
                {w}
              </motion.span>
            ))}
          </span>
          <span className="mt-4 block overflow-hidden text-[clamp(20px,4.5vw,56px)] leading-none tracking-[-1.4px] text-body">
            {headlineSecondary.map((w, i) => (
              <motion.span key={`s-${i}`} className="mr-[0.25em] inline-block" variants={word}>
                {w}
              </motion.span>
            ))}
          </span>
        </motion.h1>

        <motion.p
          className="mt-6 max-w-[480px] text-lg font-normal leading-relaxed text-body max-md:text-base"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
        >
          Building secure, robust software with a passion for digital forensics,
          application security, and full-stack development.
        </motion.p>

        <motion.div
          className="mt-12 flex flex-wrap gap-4"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1}
        >
          <a
            href="#work"
            className="inline-flex h-12 items-center justify-center whitespace-nowrap bg-primary px-8 text-sm font-bold uppercase leading-none tracking-[1.4px] text-white transition-colors hover:bg-primary-active"
          >
            View My Work
          </a>
          <a
            href="#contact"
            className="inline-flex h-12 items-center justify-center whitespace-nowrap border border-white bg-transparent px-8 text-sm font-bold uppercase leading-none tracking-[1.4px] text-white transition-colors hover:bg-white/5"
          >
            Get In Touch
          </a>
        </motion.div>
      </div>

      <motion.div
        className="mx-auto mt-24 grid w-full max-w-7xl grid-cols-3 border-t border-hairline max-md:grid-cols-1"
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={2}
      >
        {stats.map((s, i) => (
          <div
            key={i}
            className="border-hairline py-8 pr-8 max-md:border-b max-md:last:border-b-0 md:border-r md:last:border-r-0"
          >
            <div className="font-display text-[56px] font-black leading-none tracking-[-2px] text-white max-md:text-[40px]">
              {s.num}
            </div>
            <div className="mt-4 text-[11px] font-semibold uppercase tracking-[1.1px] text-muted">
              {s.label}
            </div>
          </div>
        ))}
      </motion.div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bob text-muted" aria-hidden="true">
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
