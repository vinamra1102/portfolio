"use client";

import { useEffect, useRef, useState } from "react";

const STORAGE_KEY = "vb-sound";

/* ── Web Audio synthesis — no audio files shipped ── */
let audioCtx: AudioContext | null = null;

function ensureCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    try {
      audioCtx = new AudioContext();
    } catch {
      return null;
    }
  }
  if (audioCtx.state === "suspended") void audioCtx.resume();
  return audioCtx;
}

/** Soft tick for button hover: a 60ms sine blip. */
function playTick() {
  const ac = ensureCtx();
  if (!ac) return;
  const osc = ac.createOscillator();
  const gain = ac.createGain();
  osc.type = "sine";
  osc.frequency.value = 1800;
  gain.gain.setValueAtTime(0.03, ac.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + 0.06);
  osc.connect(gain).connect(ac.destination);
  osc.start();
  osc.stop(ac.currentTime + 0.07);
}

/** Subtle whoosh for section transitions: 350ms of band-swept noise. */
function playWhoosh() {
  const ac = ensureCtx();
  if (!ac) return;
  const dur = 0.35;
  const buffer = ac.createBuffer(1, Math.round(ac.sampleRate * dur), ac.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < data.length; i++) {
    data[i] = (Math.random() * 2 - 1) * (1 - i / data.length);
  }
  const src = ac.createBufferSource();
  src.buffer = buffer;
  const filter = ac.createBiquadFilter();
  filter.type = "bandpass";
  filter.Q.value = 0.8;
  filter.frequency.setValueAtTime(280, ac.currentTime);
  filter.frequency.exponentialRampToValueAtTime(1100, ac.currentTime + dur * 0.6);
  const gain = ac.createGain();
  gain.gain.setValueAtTime(0.045, ac.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + dur);
  src.connect(filter).connect(gain).connect(ac.destination);
  src.start();
}

const HOVER_TARGETS =
  ".btn-red, .btn-outline-shine, .submit-btn, .nav-link, [role='tab']";

/**
 * Nav sound toggle — off by default, persisted in localStorage. When on:
 * soft tick on CTA/nav hover, subtle whoosh when a new section scrolls in.
 */
export default function SoundToggle() {
  const [on, setOn] = useState(false);
  const onRef = useRef(false);

  useEffect(() => {
    let stored = false;
    try {
      stored = localStorage.getItem(STORAGE_KEY) === "1";
    } catch {
      /* ignore */
    }
    setOn(stored);
    onRef.current = stored;
  }, []);

  /* hover ticks — delegated, throttled */
  useEffect(() => {
    let last = 0;
    const onOver = (e: MouseEvent) => {
      if (!onRef.current) return;
      const target = e.target as Element | null;
      if (!target?.closest?.(HOVER_TARGETS)) return;
      const now = performance.now();
      if (now - last < 120) return;
      last = now;
      playTick();
    };
    document.addEventListener("mouseover", onOver, { passive: true });
    return () => document.removeEventListener("mouseover", onOver);
  }, []);

  /* section-transition whooshes */
  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("section[id]")
    );
    if (!sections.length) return;

    let current = "";
    let armed = false; // skip the initial section resolution on load
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const id = visible.target.id;
        if (id === current) return;
        current = id;
        if (armed && onRef.current) playWhoosh();
        armed = true;
      },
      { rootMargin: "-30% 0px -50% 0px", threshold: [0, 0.3] }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  const toggle = () => {
    const next = !on;
    setOn(next);
    onRef.current = next;
    try {
      localStorage.setItem(STORAGE_KEY, next ? "1" : "0");
    } catch {
      /* ignore */
    }
    if (next) playTick();
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={on}
      aria-label={on ? "Disable sound effects" : "Enable sound effects"}
      title={on ? "Sound on" : "Sound off"}
      className="inline-flex h-9 w-9 items-center justify-center text-muted transition-colors hover:text-white"
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
        {on ? (
          <>
            <path d="M15.5 8.5a5 5 0 0 1 0 7" />
            <path d="M18.5 5.5a9 9 0 0 1 0 13" />
          </>
        ) : (
          <>
            <line x1="16" y1="9" x2="22" y2="15" />
            <line x1="22" y1="9" x2="16" y2="15" />
          </>
        )}
      </svg>
    </button>
  );
}
