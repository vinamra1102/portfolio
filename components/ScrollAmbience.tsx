"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/*
 * Barely-perceptible accent temperature per section — all stay within
 * a whisker of Rosso Corsa #DC0000 so the shift adds life, not a theme.
 */
const SECTION_ACCENTS: Record<string, string> = {
  hero: "#dc0000",
  work: "#d40404",
  skills: "#e30b0b",
  about: "#cf0202",
  contact: "#dc0000",
};

/**
 * Scroll-linked ambience: shifts the --red accent per section and
 * sharpens the diagonal dividers into place as they enter the viewport.
 * Renders nothing; effects only.
 */
export default function ScrollAmbience() {
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      Object.entries(SECTION_ACCENTS).forEach(([id, color]) => {
        const el = document.getElementById(id);
        if (!el) return;
        ScrollTrigger.create({
          trigger: el,
          start: "top 55%",
          end: "bottom 55%",
          onToggle: (self) => {
            if (self.isActive) {
              gsap.to(document.documentElement, {
                "--red": color,
                duration: 0.6,
                ease: "power1.out",
                overwrite: "auto",
              });
            }
          },
        });
      });

      gsap.utils.toArray<HTMLElement>(".section-divider").forEach((el) => {
        gsap.fromTo(
          el,
          { "--divider-rise": "45%" },
          {
            "--divider-rise": "0%",
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "top 35%",
              scrub: true,
            },
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return null;
}
