const groups = [
  {
    title: "Work",
    items: [
      { label: "Projects", href: "#work" },
      { label: "Case Studies", href: "#work" },
      { label: "Stack", href: "#skills" },
    ],
  },
  {
    title: "Connect",
    items: [
      { label: "GitHub", href: "https://github.com/vinamra1102" },
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/vinamra-bhonsle-b2b569219/",
      },
      { label: "Email", href: "mailto:vinamrabhonsle@gmail.com" },
    ],
  },
  {
    title: "Legal",
    items: [
      { label: "Privacy", href: "/privacy" },
      { label: "Imprint", href: "/imprint" },
    ],
  },
  {
    title: "More",
    items: [
      { label: "Writing", href: "/writing" },
      { label: "Talks", href: "/talks" },
      { label: "Now", href: "/now" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-[#1a1a1a] bg-[#0d0d0d] px-12 py-16 max-md:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-12 max-lg:grid-cols-3 max-md:grid-cols-2">
          <div className="max-lg:col-span-full">
            <a href="#hero" className="font-display text-[22px] font-black uppercase leading-none tracking-[0.5px] text-white">
              VINAMRA BHONSLE
            </a>
            <p className="mt-4 max-w-[280px] text-[13px] leading-relaxed text-muted">
              Developer and cybersecurity enthusiast building secure, robust
              software.
            </p>
          </div>

          {groups.map((g) => (
            <div key={g.title} className="flex flex-col">
              <h4 className="mb-4 text-[11px] font-semibold uppercase tracking-[1.1px] text-white">
                {g.title}
              </h4>
              <ul className="flex list-none flex-col gap-2">
                {g.items.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="text-[13px] font-semibold uppercase tracking-[0.65px] text-muted transition-colors duration-200 hover:text-white"
                      {...(item.href.startsWith("http")
                        ? { target: "_blank", rel: "noreferrer noopener" }
                        : {})}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-[#1a1a1a] pt-6">
          <div className="text-[13px] text-muted">
            &copy; {new Date().getFullYear()} Vinamra Bhonsle. All rights reserved.
          </div>
          <div className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[1.1px] text-muted">
            Built with precision{" "}
            <span
              className="inline-block h-[6px] w-[6px] rounded-full bg-primary"
              style={{ boxShadow: "0 0 8px rgba(218,41,28,0.6)" }}
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
