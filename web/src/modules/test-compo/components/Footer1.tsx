import { OWNER } from "@/config/constants";
import { ContactCta } from "./contact-cta";
import { SocialLinks } from "./social-links";

export function Footer1() {
  return (
    <div className="sm:px-6 md:px-10 relative mx-auto w-full max-w-7xl px-4 pt-16 pb-16">
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
        <span className="font-sans font-light tracking-tighter text-foreground/80">
          Connected
        </span>
      </h2>

      {/* Copy */}
      <p className="mx-auto mt-4 max-w-xl text-center font-sans text-sm text-muted-foreground sm:text-base">
        Got questions or want to collaborate? Feel free to reach out — we&apos;re
        open to new projects or just a casual chat!
      </p>

      <ContactCta />
      <SocialLinks />

      {/* Email */}
      <p className="mt-6 text-center">
        <a
          href={`mailto:${OWNER.email}`}
          className="font-sans text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground"
        >
          {OWNER.email}
        </a>
      </p>

      {/* Bottom bar */}
      <div className="mt-12 h-px bg-border" />
      <div className="mt-6 flex items-center justify-between text-xs text-muted-foreground">
        <p className="font-sans">&copy; {new Date().getFullYear()} voiceAct</p>
      </div>
    </div>
  );
}
