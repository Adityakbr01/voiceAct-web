export function ContactCta() {
  return (
    <div className="mt-6 flex justify-center">
      <a
        href="#contact"
        className="btn-shine glass group relative inline-flex h-12 items-center gap-2 overflow-hidden rounded-full px-6 font-sans text-sm font-medium tracking-tight text-foreground transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]"
      >
        <span className="relative z-10">Contact Me</span>
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-full bg-background opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ willChange: "opacity" }}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="relative z-10 w-4 h-4"
          style={{ strokeWidth: 1.5 }}
        >
          <path d="M7 7h10v10" />
          <path d="M7 17 17 7" />
        </svg>
      </a>
    </div>
  );
}
