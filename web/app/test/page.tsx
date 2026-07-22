"use client";

export default function TestPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6 py-12">
      <div className="flex flex-col items-center gap-8">
        <h1 className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          Footer Demo
        </h1>
      </div>

      {/* Footer */}
      <div className="sm:px-6 md:px-10 relative max-w-7xl mx-auto w-full pt-16 pr-4 pb-16 pl-4">
        {/* Soft radial glow */}
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute left-0 bottom-0 h-[80%] w-[60%] rounded-[40%] bg-gradient-to-tr from-foreground/5 to-transparent blur-3xl" />
        </div>

        {/* Eyebrow */}
        <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
          <span className="h-px w-12 bg-border" />
          <span className="font-sans italic">Reach out anytime</span>
          <span className="h-px w-12 bg-border" />
        </div>

        {/* Heading */}
        <h2 className="mt-4 text-center font-sans text-4xl font-light tracking-tighter text-foreground sm:text-6xl">
          Let&apos;s Stay{" "}
          <span className="font-sans text-foreground/80 font-light tracking-tighter">
            Connected
          </span>
        </h2>

        {/* Copy */}
        <p className="mx-auto mt-4 max-w-xl text-center font-sans text-sm text-muted-foreground sm:text-base">
          Got questions or want to collaborate? Feel free to reach out — we&apos;re
          open to new projects or just a casual chat!
        </p>

        {/* CTA */}
        <div className="mt-6 flex justify-center">
          <a
            href="#contact"
            className="btn-shine glass group relative inline-flex h-12 items-center gap-2 overflow-hidden rounded-full px-6 font-sans text-sm font-medium tracking-tight text-foreground transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]"
          >
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
            <span className="relative z-10">Contact Me</span>
          </a>
        </div>

        {/* Socials */}
        <div className="mt-8 flex items-center justify-center gap-6 text-muted-foreground">
          {/* Twitter / X */}
          <a
            href="https://twitter.com/voiceActin"
            aria-label="X (Twitter)"
            className="rounded p-2 transition hover:bg-foreground/[0.06] hover:text-foreground"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5"
            >
              <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
            </svg>
          </a>
          <span className="h-6 w-px bg-border" />
          {/* LinkedIn */}
          <a
            href="https://linkedin.com/company/voiceact"
            aria-label="LinkedIn"
            className="rounded p-2 transition hover:bg-foreground/[0.06] hover:text-foreground"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5"
            >
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect width="4" height="12" x="2" y="9" />
              <circle cx="4" cy="4" r="2" />
            </svg>
          </a>
          <span className="h-6 w-px bg-border" />
          {/* GitHub */}
          <a
            href="https://github.com/voiceact"
            aria-label="GitHub"
            className="rounded p-2 transition hover:bg-foreground/[0.06] hover:text-foreground"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5"
            >
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
              <path d="M9 18c-4.51 2-5-2-7-2" />
            </svg>
          </a>
          <span className="h-6 w-px bg-border" />
          {/* Instagram */}
          <a
            href="https://instagram.com/voiceact.in"
            aria-label="Instagram"
            className="rounded p-2 transition hover:bg-foreground/[0.06] hover:text-foreground"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5"
            >
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
            </svg>
          </a>
        </div>

        {/* Email */}
        <p className="mt-6 text-center">
          <a
            href="mailto:hello@voiceact.in"
            className="font-sans text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground"
          >
            hello@voiceact.in
          </a>
        </p>

        {/* Bottom bar */}
        <div className="mt-12 h-px bg-border" />
        <div className="mt-6 flex items-center justify-between text-xs text-muted-foreground">
          <p className="font-sans">&copy; {new Date().getFullYear()} voiceAct</p>
          <div className="hidden text-muted-foreground sm:block" />
        </div>
      </div>
    </div>
  );
}
