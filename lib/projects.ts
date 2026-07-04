export type ProjectCategory = "frontend" | "fullstack" | "security";

export interface Project {
  num: string;
  slug: string;
  name: string;
  desc: string;
  tech: string[];
  year: string;
  category: ProjectCategory;
  gradient: string;
  repo: string;
  live?: string;
  /** Screenshot under /public — cards without one render a branded placeholder. */
  image?: string;
}

export const projects: Project[] = [
  {
    num: "01",
    slug: "certwatch",
    name: "CertWatch",
    desc: "SaaS dashboard that watches your SSL certificates so you don't have to — expiry tracking, health monitoring, and proactive alerts that stop downtime before it starts.",
    tech: ["Next.js", "TypeScript", "Supabase", "Tailwind"],
    year: "2026",
    category: "fullstack",
    gradient: "linear-gradient(135deg, #1a1a2e, #16213e)",
    repo: "https://github.com/vinamra1102/CertWatch-certificate_checker-Frontend-",
    live: "https://cert-watch-certificate-checker-fron.vercel.app",
    image: "/projects/certwatch.png",
  },
  {
    num: "02",
    slug: "web-vulnerability-scanner",
    name: "Web Vulnerability Scanner",
    desc: "Python-powered scanner that hunts SQL injection, XSS, and insecure HTTP headers across web apps — actionable findings, not noise.",
    tech: ["Python", "TypeScript", "Security"],
    year: "2025",
    category: "security",
    gradient: "linear-gradient(135deg, #2e1a1a, #3e2121)",
    repo: "https://github.com/vinamra1102/webVulnerabilityScanner",
  },
  {
    num: "03",
    slug: "her-ecom",
    name: "Her-Ecom",
    desc: "Modern e-commerce experience in Next.js — dynamic product pages, instant cart state with Zustand, and a shopping flow that feels effortless on any screen.",
    tech: ["Next.js", "TypeScript", "Zustand"],
    year: "2026",
    category: "frontend",
    gradient: "linear-gradient(135deg, #1a0a00, #2d1000)",
    repo: "https://github.com/vinamra1102/Her-Ecom",
  },
  {
    num: "04",
    slug: "hydrolock",
    name: "HydroLock",
    desc: "Rule-based app locker that makes habits the key — real-world tasks like hydration events become unlock conditions for your apps.",
    tech: ["React", "TypeScript", "Supabase", "Vite"],
    year: "2026",
    category: "fullstack",
    gradient: "linear-gradient(135deg, #0a1420, #12293c)",
    repo: "https://github.com/vinamra1102/HydroLock",
  },
  {
    num: "05",
    slug: "orbit",
    name: "Orbit",
    desc: "My tech stack rendered as an interactive 3D constellation — a navigable node graph of skills and real project history.",
    tech: ["React Three Fiber", "Three.js", "TypeScript"],
    year: "2026",
    category: "frontend",
    gradient: "linear-gradient(135deg, #140f26, #221a3a)",
    repo: "https://github.com/vinamra1102/orbit",
    live: "https://orbit-amber-six.vercel.app/",
    image: "/projects/orbit.png",
  },
  {
    num: "06",
    slug: "sqlite-forensic-recovery",
    name: "SQLite Forensic Recovery",
    desc: "Forensics utility that recovers deleted records straight from SQLite database files — evidence extraction built on real lab experience.",
    tech: ["Python", "SQLite", "Forensics"],
    year: "2025",
    category: "security",
    gradient: "linear-gradient(135deg, #1f1a0a, #302a14)",
    repo: "https://github.com/vinamra1102/sqlite-forensic-recovery-tool",
  },
  {
    num: "07",
    slug: "mintslot",
    name: "MintSlot",
    desc: "Appointment booking platform shipped for a real client — React web app plus Expo Android app, powered by Setmore scheduling.",
    tech: ["React", "Vite", "Expo", "Setmore"],
    year: "2026",
    category: "fullstack",
    gradient: "linear-gradient(135deg, #0a1f1a, #14302a)",
    repo: "https://github.com/vinamra1102/mintSlot",
    live: "https://mintslot-weld.vercel.app/",
    image: "/projects/mintslot.png",
  },
];

export const projectFilters: {
  label: string;
  value: "all" | ProjectCategory;
}[] = [
  { label: "All", value: "all" },
  { label: "Security", value: "security" },
  { label: "Frontend", value: "frontend" },
  { label: "Full-Stack", value: "fullstack" },
];
