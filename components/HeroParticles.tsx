"use client";

import { useEffect, useRef } from "react";
import { usePreloaderReady } from "./Preloader";

interface Streak {
  x: number;
  y: number;
  v: number;
  len: number;
  opacity: number;
  red: boolean;
}

/**
 * Lightweight canvas 2D speed-line field for the hero. Streaks drift
 * right-to-left in red/white at low opacity. Pauses when the hero is
 * off-screen; skipped entirely under prefers-reduced-motion.
 */
export default function HeroParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  /* don't compete for the main thread while the page loads in */
  const ready = usePreloaderReady();

  useEffect(() => {
    if (!ready) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(2, window.devicePixelRatio || 1);
    let width = 0;
    let height = 0;

    const resize = () => {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const COUNT = window.innerWidth < 768 ? 60 : 140;
    const streaks: Streak[] = Array.from({ length: COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      v: 0.4 + Math.random() * 2.4,
      len: 0,
      opacity: 0.03 + Math.random() * 0.09,
      red: Math.random() < 0.22,
    }));
    streaks.forEach((s) => {
      s.len = 6 + s.v * 7;
    });

    let raf = 0;
    let inView = true;

    const frame = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.lineWidth = 1;
      for (const s of streaks) {
        ctx.strokeStyle = s.red
          ? `rgba(220, 0, 0, ${s.opacity * 1.4})`
          : `rgba(255, 255, 255, ${s.opacity})`;
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x + s.len, s.y);
        ctx.stroke();
        s.x -= s.v;
        if (s.x + s.len < 0) {
          s.x = width + Math.random() * 80;
          s.y = Math.random() * height;
        }
      }
      raf = requestAnimationFrame(frame);
    };

    const start = () => {
      if (!raf && inView) raf = requestAnimationFrame(frame);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        if (inView) start();
        else stop();
      },
      { threshold: 0 }
    );
    io.observe(canvas);

    window.addEventListener("resize", resize);
    start();

    return () => {
      stop();
      io.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, [ready]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
    />
  );
}
