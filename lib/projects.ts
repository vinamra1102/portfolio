export type ProjectCategory = "frontend" | "backend" | "fullstack";

export interface Project {
  num: string;
  slug: string;
  name: string;
  desc: string;
  tech: string[];
  year: string;
  category: ProjectCategory;
  gradient: string;
}

export const projects: Project[] = [
  {
    num: "01",
    slug: "apex-trade-engine",
    name: "Apex Trade Engine",
    desc: "Low-latency matching engine processing 80k orders/sec with sub-millisecond p99 tail. Rust core, gRPC transport.",
    tech: ["Rust", "gRPC", "Redis", "Kafka"],
    year: "2025",
    category: "backend",
    gradient: "linear-gradient(135deg, #1a1a2e, #16213e)",
  },
  {
    num: "02",
    slug: "helix-studio",
    name: "Helix Studio",
    desc: "Collaborative design tool with operational-transform sync. Built the canvas runtime and conflict resolution layer.",
    tech: ["TypeScript", "WebGL", "CRDT"],
    year: "2024",
    category: "frontend",
    gradient: "linear-gradient(135deg, #0d1117, #1c2128)",
  },
  {
    num: "03",
    slug: "northbound-logistics",
    name: "Northbound Logistics",
    desc: "Cross-border freight platform. Designed the routing service, shipper dashboard, and carrier mobile app end-to-end.",
    tech: ["Go", "Next.js", "Postgres", "AWS"],
    year: "2024",
    category: "fullstack",
    gradient: "linear-gradient(135deg, #1a0a00, #2d1000)",
  },
  {
    num: "04",
    slug: "meridian-health",
    name: "Meridian Health",
    desc: "HIPAA-compliant patient intake suite for 14 clinics. Reduced average check-in time from 11 minutes to 90 seconds.",
    tech: ["React", "Node", "Postgres", "HL7"],
    year: "2023",
    category: "fullstack",
    gradient: "linear-gradient(135deg, #0a1f1a, #14302a)",
  },
  {
    num: "05",
    slug: "forge-compiler",
    name: "Forge Compiler",
    desc: "Open-source DSL for declarative game-mechanic prototyping. Lexer, parser, type system from scratch.",
    tech: ["Rust", "WASM", "LLVM"],
    year: "2023",
    category: "backend",
    gradient: "linear-gradient(135deg, #1f1a0a, #302a14)",
  },
  {
    num: "06",
    slug: "cinder-analytics",
    name: "Cinder Analytics",
    desc: "Real-time dashboard suite for a streaming-media studio. Custom virtualized chart library; 60fps across 200k data points.",
    tech: ["TypeScript", "D3", "Canvas", "WebSocket"],
    year: "2022",
    category: "frontend",
    gradient: "linear-gradient(135deg, #2e1a1a, #3e2121)",
  },
];

export const projectFilters: {
  label: string;
  value: "all" | ProjectCategory;
}[] = [
  { label: "All", value: "all" },
  { label: "Frontend", value: "frontend" },
  { label: "Backend", value: "backend" },
  { label: "Full-Stack", value: "fullstack" },
];
