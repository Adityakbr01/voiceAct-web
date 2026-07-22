"use client";

export default function TestPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#09090b] px-6 py-12">
      <div className="flex flex-col items-center gap-8">
        <h1 className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500">
          Button Demo
        </h1>

        <div className="mt-6 flex justify-center">
          <a
            href="#contact"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-white/5 px-6 py-3 text-sm font-medium tracking-tight text-white ring-1 ring-white/10 shadow-[inset_0_-2px_0_rgba(255,255,255,0.15)] transition-all duration-200 hover:bg-white/10 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] font-sans"
          >
            {/* Glass overlay — fades in on hover */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-[20px] bg-white opacity-0 transition-opacity duration-300 group-hover:opacity-100"
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
            <span className="relative z-10">Contact Me</span>
          </a>
        </div>
      </div>
    </div>
  );
}
