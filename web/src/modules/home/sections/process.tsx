import { motion } from "framer-motion";
import { Section, SectionHeader } from "@/modules/home/components/section";
import { process, type ProcessStep } from "@/modules/services-data";
import { illustrations } from "./process-illustrations";

/* ---------- small building blocks ---------- */

function StepBadge({ step, color }: { step: string; color: string }) {
  return (
    <span
      className="inline-flex size-9 items-center justify-center rounded-full font-display text-[11px] font-bold text-white shadow-sm"
      style={{ background: color }}
      aria-hidden
    >
      {step}
    </span>
  );
}

function ChapterLabel({ children, color }: { children: React.ReactNode; color: string }) {
  return (
    <p className="text-xs font-medium uppercase tracking-[0.18em]" style={{ color }}>
      {children}
    </p>
  );
}

function StepTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight md:text-[26px]">
      {children}
    </h3>
  );
}

function StepDescription({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-[15px]">{children}</p>
  );
}

function StepIllustration({ index, color }: { index: number; color: string }) {
  const Illus = illustrations[index];
  return (
    <div
      className="relative overflow-hidden rounded-xl border border-border/60 bg-card/60 p-4"
      style={{ color }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(120% 80% at 20% 0%, ${color}22, transparent 60%)`,
        }}
      />
      <Illus color={color} className="relative h-24 w-full" />
    </div>
  );
}

function StepCard({ item, index }: { item: ProcessStep; index: number }) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: "easeOut", delay: (index % 3) * 0.05 }}
      className="relative rounded-2xl border border-border/60 bg-card/60 p-5 shadow-[var(--shadow-card)] backdrop-blur-sm"
    >
      <div className="flex items-center gap-3">
        <StepBadge step={item.step} color={item.color} />
        <ChapterLabel color={item.color}>{item.chapter}</ChapterLabel>
      </div>
      <StepTitle>{item.title}</StepTitle>
      <StepDescription>{item.description}</StepDescription>
      <div className="mt-5">
        <StepIllustration index={index} color={item.color} />
      </div>
    </motion.li>
  );
}

/* ---------- section ---------- */

export function Process() {
  return (
    <Section id="process">
      <SectionHeader
        eyebrow="Process"
        title={
          <>
            A tight loop from
            <span className="font-display italic tracking-tight text-primary">
              {" "}
              idea to App Store.
            </span>
          </>
        }
        description="Five chapters, one product — how we turn an idea into a live, iterating app."
      />

      <ol className="mx-auto mt-12 grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {process.map((item, i) => (
          <StepCard key={item.step} item={item} index={i} />
        ))}
      </ol>
    </Section>
  );
}
