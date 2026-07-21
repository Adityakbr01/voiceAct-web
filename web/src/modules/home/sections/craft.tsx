import { motion } from "framer-motion";
import { Keyboard } from "@/components/ui/keyboard";

export function Craft() {
  return (
    <section id="craft" className="relative overflow-hidden py-24 md:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-100"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 0%, oklch(0.62 0.24 0 / 0.08), transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(ellipse 70% 50% at 50% 0%, black 20%, transparent 80%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5 }}
            className="glass inline-flex items-center gap-2 rounded-full border border-border/60 px-3 py-1.5 text-xs font-medium tracking-wide text-muted-foreground"
          >
            <span className="size-1.5 rounded-full bg-primary" />
            Craft
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mt-6 text-balance text-4xl font-semibold leading-[1.05] md:text-5xl"
          >
            Built keystroke{" "}
            <span className="font-display italic tracking-tight text-primary">by keystroke.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-5 text-pretty text-base text-muted-foreground md:text-lg"
          >
            No templates, no drag-and-drop shortcuts. Every interface we ship is written by senior
            engineers who care about the details — try the keys.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-16 flex w-full items-center justify-center"
        >
          <Keyboard enableSound />
        </motion.div>
      </div>
    </section>
  );
}
