import { cn } from "@/lib/utils";
import { BlurReveal } from "@/components/blur-reveal";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function Section({
  id,
  className,
  children,
}: {
  id?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className={cn(
        "relative mx-auto w-full max-w-7xl px-6 py-24 md:px-10 md:py-32",
        className,
      )}
    >
      {children}
    </section>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  eyebrowDelay = 0,
  titleDelay = 0.12,
  descriptionDelay = 0.24,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  align?: "left" | "center";
  eyebrowDelay?: number;
  titleDelay?: number;
  descriptionDelay?: number;
}) {
  return (
    <div
      className={cn(
        "flex max-w-3xl flex-col gap-4",
        align === "center" && "mx-auto items-center text-center",
      )}
    >
      {eyebrow ? (
        <BlurReveal
          y={8}
          duration={0.5}
          delay={eyebrowDelay}
          amount={0.6}
          className={cn(
            "inline-flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.24em] text-muted-foreground",
            align === "center" && "justify-center",
          )}
        >
          <motion.span
            aria-hidden
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: eyebrowDelay + 0.05 }}
            style={{ transformOrigin: "left" }}
            className="h-px w-8 bg-foreground/30"
          />
          <span className="text-foreground/70">{eyebrow}</span>
        </BlurReveal>
      ) : null}
      <BlurReveal
        as="h2"
        y={14}
        duration={0.6}
        delay={titleDelay}
        amount={0.4}
        className="text-balance text-3xl font-semibold leading-[1.05] md:text-5xl"
      >
        {title}
      </BlurReveal>
      {description ? (
        <BlurReveal
          y={10}
          duration={0.6}
          delay={descriptionDelay}
          amount={0.4}
          className="text-pretty text-base text-muted-foreground md:text-lg"
        >
          {description}
        </BlurReveal>
      ) : null}
    </div>
  );
}