"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { motion, AnimatePresence } from "framer-motion";

const PreloaderContext = createContext<{ ready: boolean }>({ ready: true });

/** True once the preloader has finished (or was skipped). Gates hero entrance. */
export function usePreloaderReady() {
  return useContext(PreloaderContext).ready;
}

const SESSION_KEY = "vb-preloaded";
const DURATION_MS = 800; // + 0.45s exit wipe stays well under the 1.5s ceiling

/*
 * Progress state lives here, NOT in the provider — per-frame counter
 * updates must not re-render the page subtree while it hydrates.
 */
function Overlay({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const start = performance.now();
    let raf = 0;

    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / DURATION_MS);
      /* ease-out so the counter sprints early and settles into 100 */
      setProgress(Math.round(100 * (1 - Math.pow(1 - p, 2.2))));
      if (p < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        onDone();
      }
    };
    raf = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(raf);
  }, [onDone]);

  return (
    <motion.div
      className="fixed inset-0 z-[300] flex flex-col items-center justify-center bg-[#0d0d0d]"
      exit={{
        clipPath: "inset(0 0 100% 0)",
        transition: { duration: 0.45, ease: [0.76, 0, 0.24, 1] },
      }}
      aria-hidden="true"
    >
      <div className="flex items-baseline leading-none text-white">
        <span className="font-display text-[18px] font-bold uppercase tracking-[3px]">
          VINAMRA
        </span>
        <span className="ml-2 font-sans text-[18px] font-light tracking-[3px]">
          BHONSLE
        </span>
      </div>
      <div className="mt-10 font-display text-[72px] font-light leading-none tracking-[-1px] text-white tabular-nums">
        {progress}
        <span className="ml-1 text-[24px] font-bold text-primary">%</span>
      </div>
      <div className="mt-8 h-[2px] w-[220px] overflow-hidden bg-[#242424]">
        <div className="h-full bg-primary" style={{ width: `${progress}%` }} />
      </div>
    </motion.div>
  );
}

export default function PreloaderProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [phase, setPhase] = useState<"pending" | "loading" | "done">(
    "pending"
  );

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let alreadyShown = false;
    try {
      alreadyShown = sessionStorage.getItem(SESSION_KEY) === "1";
    } catch {
      /* storage unavailable — treat as shown */
      alreadyShown = true;
    }

    if (prefersReduced || alreadyShown) {
      setPhase("done");
      return;
    }

    try {
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      /* ignore */
    }
    setPhase("loading");
  }, []);

  const finish = useCallback(() => setPhase("done"), []);
  const value = useMemo(() => ({ ready: phase === "done" }), [phase]);

  return (
    <PreloaderContext.Provider value={value}>
      <AnimatePresence>
        {phase === "loading" && <Overlay onDone={finish} />}
      </AnimatePresence>
      {children}
    </PreloaderContext.Provider>
  );
}
