"use client";

import { useEffect, useRef, useState } from "react";
import clsx from "clsx";

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const [isCta, setIsCta] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const dot = dotRef.current;
    if (!dot) return;

    let rafId = 0;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const onMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const onLeave = () => setIsVisible(false);
    const onEnter = () => setIsVisible(true);

    const tick = () => {
      currentX += (targetX - currentX) * 0.35;
      currentY += (targetY - currentY) * 0.35;
      dot.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;
      rafId = requestAnimationFrame(tick);
    };

    const isCtaTarget = (el: EventTarget | null) => {
      if (!(el instanceof Element)) return false;
      return Boolean(
        el.closest("a, button, .btn, [data-cursor='cta'], input, textarea, [role='button']")
      );
    };

    const onOver = (e: MouseEvent) => {
      setIsCta(isCtaTarget(e.target));
    };
    const onOut = (e: MouseEvent) => {
      if (!isCtaTarget(e.relatedTarget)) setIsCta(false);
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
  }, [isVisible]);

  return (
    <div
      ref={dotRef}
      className={clsx("cursor-dot", {
        "is-cta": isCta,
        "is-hidden": !isVisible,
      })}
      aria-hidden="true"
    />
  );
}
