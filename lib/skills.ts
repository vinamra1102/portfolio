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
      { name: "Java", pct: 85 },
      { name: "JavaScript", pct: 80 },
      { name: "SQL", pct: 82 },
    ],
  },
  {
    name: "Frontend",
    items: [
      { name: "React", pct: 82 },
      { name: "HTML / CSS", pct: 88 },
      { name: "JavaFX", pct: 72 },
      { name: "Streamlit", pct: 75 },
    ],
  },
  {
    name: "Backend",
    items: [
      { name: "Node.js", pct: 78 },
      { name: "Flask", pct: 85 },
      { name: "Spring Boot", pct: 70 },
      { name: "REST APIs", pct: 80 },
    ],
  },
  {
    name: "Security",
    items: [
      { name: "OWASP Top 10", pct: 85 },
      { name: "Wireshark", pct: 80 },
      { name: "Nmap", pct: 78 },
      { name: "Metasploit", pct: 72 },
    ],
  },
  {
    name: "Databases",
    items: [
      { name: "MySQL", pct: 84 },
      { name: "SQLite", pct: 85 },
      { name: "Digital Forensics", pct: 78 },
      { name: "NIST CSF", pct: 70 },
    ],
  },
  {
    name: "Tools",
    items: [
      { name: "Git", pct: 90 },
      { name: "Docker", pct: 72 },
      { name: "VS Code", pct: 92 },
      { name: "IntelliJ", pct: 78 },
    ],
  },
];
