import { motion } from "framer-motion";
import { Section, SectionHeader } from "@/modules/home/components/section";
import { stack } from "@/modules/services-data";

export function Stack() {
  return (
    <Section id="stack">
      <SectionHeader
        eyebrow="Tech"
        title={
          <>
            The stack we build on,
            <span className="font-display italic tracking-tight text-primary">
              {" "}
              chosen for the long run.
            </span>
          </>
        }
        description="Boring, proven, well-loved tools. We pick the right primitive for your product — not the loudest one on Twitter."
      />

      <div className="mt-16 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
        {stack.map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.035 }}
              whileHover={{ y: -5, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="glass group relative overflow-hidden rounded-2xl p-5 transition-all duration-300 hover:-translate-y-0.5 hover:bg-foreground/[0.06] hover:shadow-[0_8px_30px_-10px_oklch(0.66_0.19_42/0.35)]"
            >
              <div className="flex items-start justify-between gap-3">
                <span className="glass inline-flex size-10 items-center justify-center rounded-full transition-all duration-300 group-hover:scale-115 group-hover:bg-foreground/[0.06]">
                  <Icon size={20} color={s.color} />
                </span>
                <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground transition-colors group-hover:text-white/80">
                  {s.category}
                </span>
              </div>
              <div className="mt-4 font-display text-lg font-semibold transition-colors group-hover:text-white">
                {s.name}
              </div>
              <div
                aria-hidden
                className="pointer-events-none absolute -right-10 -top-10 size-32 rounded-full bg-[var(--color-primary)]/10 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              />
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}
