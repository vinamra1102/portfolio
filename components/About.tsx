import Reveal from "./Reveal";

const infoRows = [
  { lbl: "Currently at", val: "Manipal University Jaipur" },
  { lbl: "Open to", val: "Internships & Full-time roles" },
  { lbl: "Based in", val: "Jaipur, Rajasthan" },
  { lbl: "Interests", val: "Security & Development" },
];

export default function About() {
  return (
    <section id="about" className="py-24">
      <div className="mx-auto max-w-7xl px-12 max-md:px-6">
        <div className="grid grid-cols-[55%_45%] items-start gap-16 max-lg:grid-cols-1 max-lg:gap-12">
          <div>
            <Reveal>
              <div className="text-[11px] font-semibold uppercase tracking-[1.1px] text-muted">
                About
              </div>
              <h2 className="mt-4 font-display text-[44px] font-black uppercase leading-[0.95] tracking-[-1.4px] text-white md:text-[56px] lg:text-[80px] lg:tracking-[-2px]">
                Engineered for security.
              </h2>
            </Reveal>

            <div className="mt-8">
              <Reveal delay={0.05}>
                <p className="mb-6 max-w-[520px] text-sm leading-[1.7] text-body">
                  I&rsquo;m an Information Technology student with a deep interest in
                  cybersecurity, digital forensics, and full-stack development. My focus:
                  building secure applications, understanding vulnerabilities, and creating
                  tools that solve real problems.
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mb-6 max-w-[520px] text-sm leading-[1.7] text-body">
                  As a Cyber Forensics Intern at the State Forensic Science Laboratory,
                  I built tools for digital evidence validation, forensic data recovery,
                  and Android forensics &mdash; working hands-on with chain of custody
                  principles and evidence integrity.
                </p>
              </Reveal>
              <Reveal delay={0.15}>
                <p className="mb-6 max-w-[520px] text-sm leading-[1.7] text-body">
                  Outside coursework, I compete in hackathons, present on security topics
                  like SQL injection and web vulnerability analysis, and continuously
                  explore the cybersecurity landscape.
                </p>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="max-w-[520px] text-sm leading-[1.7] text-body">
                  Currently pursuing my B.Tech in Information Technology at Manipal
                  University Jaipur and actively seeking internship and full-time
                  opportunities in security and development.
                </p>
              </Reveal>
            </div>

            <Reveal delay={0.25}>
              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="/resume.pdf"
                  className="inline-flex h-12 items-center justify-center whitespace-nowrap border border-white bg-transparent px-8 text-sm font-bold uppercase leading-none tracking-[1.4px] text-white transition-colors hover:bg-white/5"
                >
                  View R&eacute;sum&eacute;
                </a>
                <a
                  href="https://www.linkedin.com/in/vinamra-bhonsle-b2b569219/"
                  className="inline-flex h-12 items-center justify-center whitespace-nowrap border border-white bg-transparent px-8 text-sm font-bold uppercase leading-none tracking-[1.4px] text-white transition-colors hover:bg-white/5"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  LinkedIn &rarr;
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal as="aside" className="border border-hairline bg-[#222] p-8" delay={0.1}>
            <div className="mb-6 flex aspect-[4/3] w-full items-center justify-center bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a]">
              <div className="font-display text-[80px] font-black leading-none tracking-[-1.6px] text-[#303030]">
                VB
              </div>
            </div>
            <div className="text-lg font-bold text-white">Vinamra Bhonsle</div>
            <div className="mt-1 text-[11px] font-semibold uppercase tracking-[1.1px] text-muted">
              IT Student &middot; Jaipur, Rajasthan
            </div>
            <div className="my-6 h-px bg-hairline" />
            {infoRows.map((r) => (
              <div
                key={r.lbl}
                className="flex items-center justify-between border-b border-hairline py-2 text-[13px] last:border-b-0"
              >
                <span className="text-muted">{r.lbl}</span>
                <span className="text-white">{r.val}</span>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
