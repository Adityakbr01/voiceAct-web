import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { hero } from "@/modules/home-data";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-36 md:pt-44">
      {/* Aurora ambient background */}
      <AuroraBackground aria-hidden className="pointer-events-none absolute inset-0 z-0" />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center px-6 pb-12 text-center md:px-10 md:pb-16">
        <motion.span
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass inline-flex items-center gap-2 rounded-full border border-border/60 px-3 py-1.5 text-xs font-medium tracking-wide text-muted-foreground"
        >
          <span className="relative flex size-1.5">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-60" />
            <span className="relative inline-flex size-1.5 rounded-full bg-primary" />
          </span>
          {hero.eyebrow}
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.05 }}
          className="mt-8 max-w-4xl text-balance text-5xl font-semibold leading-[1.02] md:text-7xl"
        >
          <span className="block">{hero.title[0]}</span>
          <span className="block text-muted-foreground/80">{hero.title[1]}</span>
          <span className="block font-display italic tracking-tight text-primary">
            {hero.title[2]}
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-8 max-w-2xl text-pretty text-base text-muted-foreground md:text-lg"
        >
          {hero.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-10 flex flex-col items-center gap-3 sm:flex-row"
        >
          <Button asChild size="lg" variant="glow">
            <a href={hero.primaryCta.href}>
              {hero.primaryCta.label}
              <ArrowRight className="ml-1 size-4" />
            </a>
          </Button>
          <Button asChild size="lg" variant="glass">
            <a href={hero.secondaryCta.href}>
              <Play className="size-4" />
              {hero.secondaryCta.label}
            </a>
          </Button>
        </motion.div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="glass mt-12 grid w-full max-w-5xl grid-cols-2 gap-px overflow-hidden rounded-3xl border border-border/60 md:grid-cols-4"
        >
          {hero.stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.45 + i * 0.07 }}
              whileHover={{ y: -3 }}
              className="group relative bg-card/40 p-6 text-left transition-colors hover:bg-card/70"
            >
              <div className="font-display text-3xl font-semibold tracking-tight text-foreground transition-colors duration-500 group-hover:text-primary md:text-4xl">
                {s.value}
              </div>
              <div className="mt-1 text-xs text-muted-foreground md:text-sm">{s.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Trusted by — dual-direction marquee */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-12 flex w-full flex-col items-center gap-8"
        >
          <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">
            Trusted by teams shipping in production
          </p>
          <div className="trusted-wrap relative w-full overflow-hidden">
            {/* Edge fades */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 md:w-40"
              style={{
                background:
                  "linear-gradient(to right, var(--color-background) 0%, transparent 100%)",
              }}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 md:w-40"
              style={{
                background:
                  "linear-gradient(to left, var(--color-background) 0%, transparent 100%)",
              }}
            />

            {/* Row 1 — scrolls left */}
            <div className="flex overflow-hidden py-2 [--gap:3rem]">
              <div className="trusted-row flex shrink-0 items-center gap-[var(--gap)] pr-[var(--gap)]">
                {[...hero.trustedBy, ...hero.trustedBy].map((brand, i) => (
                  <span
                    key={`a-${brand}-${i}`}
                    className="trusted-item font-display cursor-default text-sm font-semibold tracking-[0.18em] text-muted-foreground/80 transition-all duration-300 md:text-base"
                    tabIndex={0}
                  >
                    {brand}
                  </span>
                ))}
              </div>
            </div>

            {/* Row 2 — scrolls right */}
            <div className="flex overflow-hidden py-2 [--gap:3rem]">
              <div className="trusted-row-reverse flex shrink-0 items-center gap-[var(--gap)] pr-[var(--gap)]">
                {[...hero.trustedBy, ...hero.trustedBy].reverse().map((brand, i) => (
                  <span
                    key={`b-${brand}-${i}`}
                    className="trusted-item font-display cursor-default text-sm font-semibold tracking-[0.18em] text-muted-foreground/70 transition-all duration-300 md:text-base"
                    tabIndex={0}
                  >
                    {brand}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
