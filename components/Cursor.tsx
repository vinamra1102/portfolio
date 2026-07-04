"use client";

import { useEffect, useRef, useCallback } from "react";

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  /* Mutable refs for RAF loop — avoids re-renders */
  const mouse = useRef({ x: 0, y: 0 });
  const dotPos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const visible = useRef(false);
  const hovering = useRef(false);

  const isCtaTarget = useCallback((el: EventTarget | null) => {
    if (!(el instanceof Element)) return false;
    return Boolean(
      el.closest(
        "a, button, .btn, [data-cursor='cta'], input, textarea, [role='button']"
      )
    );
  }, []);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    /* Respect reduced-motion */
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    /* Hide on touch devices */
    if (window.matchMedia("(hover: none)").matches) return;

    let rafId = 0;

    const onMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      if (!visible.current) {
        visible.current = true;
        dot.style.opacity = "1";
        ring.style.opacity = "1";
      }
    };

    const onLeave = () => {
      visible.current = false;
      dot.style.opacity = "0";
      ring.style.opacity = "0";
    };

    const onEnter = () => {
      visible.current = true;
      dot.style.opacity = "1";
      ring.style.opacity = "1";
    };

    const onOver = (e: MouseEvent) => {
      const isCta = isCtaTarget(e.target);
      if (isCta !== hovering.current) {
        hovering.current = isCta;
        ring.style.width = isCta ? "52px" : "36px";
        ring.style.height = isCta ? "52px" : "36px";
        ring.style.borderColor = isCta
          ? "rgba(220, 0, 0, 0.6)"
          : "rgba(220, 0, 0, 0.35)";
        dot.style.width = isCta ? "8px" : "6px";
        dot.style.height = isCta ? "8px" : "6px";
      }
    };

    const onOut = (e: MouseEvent) => {
      if (!isCtaTarget(e.relatedTarget) && hovering.current) {
        hovering.current = false;
        ring.style.width = "36px";
        ring.style.height = "36px";
        ring.style.borderColor = "rgba(220, 0, 0, 0.35)";
        dot.style.width = "6px";
        dot.style.height = "6px";
      }
    };

    const tick = () => {
      /* Dot follows mouse closely */
      dotPos.current.x += (mouse.current.x - dotPos.current.x) * 0.35;
      dotPos.current.y += (mouse.current.y - dotPos.current.y) * 0.35;

      /* Ring lags behind for organic feel */
      ringPos.current.x += (mouse.current.x - ringPos.current.x) * 0.15;
      ringPos.current.y += (mouse.current.y - ringPos.current.y) * 0.15;

      dot.style.transform = `translate3d(${dotPos.current.x}px, ${dotPos.current.y}px, 0) translate(-50%, -50%)`;
      ring.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%)`;

      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    window.addEventListener("mouseenter", onEnter);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("mouseenter", onEnter);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      cancelAnimationFrame(rafId);
    };
  }, [isCtaTarget]);

  return (
    <>
      {/* Red dot — 6px, follows closely */}
      <div
        ref={dotRef}
        className="cursor-dot"
        aria-hidden="true"
      />
      {/* Ring — 36px, lags behind, expands on CTA hover */}
      <div
        ref={ringRef}
        className="cursor-ring"
        aria-hidden="true"
      />
    </>
  );
}
