"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SectionRevealOptions {
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
  trigger?: string;
  duration?: number;
  ease?: string;
  stagger?: number;
  childSelector?: string;
}

export function useSectionReveal<T extends HTMLElement>(
  options: SectionRevealOptions = {}
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced || !ref.current) return;

    const el = ref.current;
    const targets = options.childSelector
      ? el.querySelectorAll(options.childSelector)
      : el;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        {
          opacity: 0,
          y: 30,
          ...options.from,
        },
        {
          opacity: 1,
          y: 0,
          duration: options.duration ?? 0.7,
          ease: options.ease ?? "power3.out",
          stagger: options.stagger ?? 0,
          ...options.to,
          scrollTrigger: {
            trigger: el,
            start: options.trigger ?? "top 80%",
            once: true,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [
    options.from,
    options.to,
    options.trigger,
    options.duration,
    options.ease,
    options.stagger,
    options.childSelector,
  ]);

  return ref;
}
