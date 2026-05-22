export interface Skill {
  name: string;
  pct: number;
}

export interface SkillCategory {
  name: string;
  items: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    name: "Languages",
    items: [
      { name: "Python", pct: 90 },
      { name: "JavaScript", pct: 85 },
      { name: "TypeScript", pct: 82 },
      { name: "Java", pct: 78 },
    ],
  },
  {
    name: "Frontend",
    items: [
      { name: "React / Next.js", pct: 88 },
      { name: "Tailwind CSS", pct: 85 },
      { name: "HTML / CSS", pct: 90 },
      { name: "Figma", pct: 72 },
    ],
  },
  {
    name: "Backend",
    items: [
      { name: "Django", pct: 82 },
      { name: "Flask / FastAPI", pct: 85 },
      { name: "Node.js", pct: 80 },
      { name: "Spring Boot", pct: 68 },
    ],
  },
  {
    name: "Security",
    items: [
      { name: "OWASP Top 10", pct: 85 },
      { name: "Wireshark", pct: 78 },
      { name: "Nmap", pct: 75 },
      { name: "Metasploit", pct: 70 },
    ],
  },
  {
    name: "Databases",
    items: [
      { name: "PostgreSQL", pct: 82 },
      { name: "MySQL", pct: 84 },
      { name: "Firebase", pct: 78 },
      { name: "Supabase", pct: 75 },
    ],
  },
  {
    name: "DevOps & Tools",
    items: [
      { name: "Git / GitHub", pct: 92 },
      { name: "Docker", pct: 75 },
      { name: "Kubernetes", pct: 68 },
      { name: "Vercel", pct: 80 },
    ],
  },
];
