"use client";

import { useEffect, useRef, useCallback } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import clsx from "clsx";

interface MagneticProps {
  children: React.ReactNode;
  /** Max translation in px when the cursor reaches the element's edge. */
  strength?: number;
  className?: string;
}

/**
 * Magnetic hover for CTAs: the element leans toward the cursor by up to
 * `strength` px and springs back on leave. Inert on touch devices and
 * under prefers-reduced-motion.
 */
export default function Magnetic({
  children,
  strength = 8,
  className,
}: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const enabled = useRef(false);
  const prefersReduced = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 260, damping: 18, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 260, damping: 18, mass: 0.5 });

  useEffect(() => {
    enabled.current = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    ).matches;
  }, []);

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!enabled.current || prefersReduced || !ref.current) return;
      const r = ref.current.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      x.set((dx / (r.width / 2)) * strength);
      y.set((dy / (r.height / 2)) * strength);
    },
    [prefersReduced, strength, x, y]
  );

  const reset = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <motion.div
      ref={ref}
      className={clsx("inline-block", className)}
      style={{ x: springX, y: springY }}
      onMouseMove={onMouseMove}
      onMouseLeave={reset}
    >
      {children}
    </motion.div>
  );
}
