import { motion } from "framer-motion";
import { Section, SectionHeader } from "@/modules/home/components/section";
import { stack } from "@/modules/services-data";
import { cn } from "@/lib/utils";

export default function Stack() {
  return (
    <Section id="stack" className="cv-auto">
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

      <div className="relative mt-16 grid grid-cols-2 border-x md:grid-cols-4">
        <div className="-translate-x-1/2 -top-px pointer-events-none absolute left-1/2 w-screen border-t" />

        {stack.map((s, i) => {
          const Icon = s.icon;
          const isLastRow = i >= stack.length - (stack.length % 4 || 4);
          const isLastCol = i % 4 === 3;
          return (
            <motion.div
              key={s.name}
              whileHover={{ y: -3 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className={cn(
                "flex items-center justify-center overflow-hidden bg-background px-4 py-8 md:p-8 transition-colors hover:bg-muted",
                !isLastRow && "border-b",
                !isLastCol && "border-r",
              )}
            >
              <div className="flex flex-col items-center gap-2">
                <Icon size={32} color={s.color} />
                <span className="text-xs font-medium text-muted-foreground">{s.name}</span>
              </div>
            </motion.div>
          );
        })}

        <div className="-translate-x-1/2 -bottom-px pointer-events-none absolute left-1/2 w-screen border-b" />
      </div>
    </Section>
  );
}
