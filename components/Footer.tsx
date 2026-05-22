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
    <footer className="bg-canvas-dark px-12 py-16 max-md:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-12 max-lg:grid-cols-3 max-md:grid-cols-2">
          <div className="max-lg:col-span-full">
            <a href="#hero" className="inline-flex items-baseline gap-1">
              <span className="font-display text-[28px] font-black leading-none tracking-[-0.5px] text-white">
                VINAMRA
              </span>
              <span className="text-base font-bold uppercase tracking-[1.4px] text-white">
                B
              </span>
              <span className="text-primary">·</span>
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
                      className="text-[13px] font-semibold uppercase tracking-[0.65px] text-muted transition-colors hover:text-white"
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

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-hairline pt-6">
          <div className="text-[13px] text-muted">
            &copy; {new Date().getFullYear()} Vinamra Bhonsle. All rights reserved.
          </div>
          <div className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[1.1px] text-muted">
            Built with precision{" "}
            <span
              className="inline-block h-[6px] w-[6px] rounded-full bg-primary"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
