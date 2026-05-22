"use client";

import { useEffect, useRef, useState, ReactNode } from "react";
import clsx from "clsx";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  threshold?: number;
  once?: boolean;
}

export default function Reveal({
  children,
  delay = 0,
  as = "div",
  className,
  threshold = 0.15,
  once = true,
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShown(true);
            if (once) obs.disconnect();
          } else if (!once) {
            setShown(false);
          }
        });
      },
      { threshold, rootMargin: "0px 0px -10% 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold, once]);

  const Tag = as as React.ElementType;
  return (
    <Tag
      ref={ref}
      className={clsx("reveal", shown && "in", className)}
      style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </Tag>
  );
}
