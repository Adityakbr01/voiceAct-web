import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { Section, SectionHeader } from "@/modules/home/components/section";
import { testimonials } from "@/modules/services-data";

export function Testimonials() {
  return (
    <Section id="testimonials" className="cv-auto">
      <SectionHeader
        eyebrow="Testimonials"
        title={
          <>
            The teams we ship with,
            <span className="font-display italic tracking-tight text-primary">
              {" "}
              in their own words.
            </span>
          </>
        }
      />

      <div className="mt-16 grid grid-cols-1 gap-4 md:grid-cols-3">
        {testimonials.map((t, i) => (
          <motion.figure
            key={t.author}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-border/60 bg-[var(--gradient-card)] shadow-[var(--shadow-card)] p-6"
          >
            <Quote className="size-6 text-primary/60" />
            <blockquote className="mt-4 text-pretty text-base leading-relaxed text-foreground/90">
              "{t.quote}"
            </blockquote>
            <figcaption className="mt-6 border-t border-border/60 pt-4 text-sm">
              <div className="font-medium text-foreground">{t.author}</div>
              <div className="text-muted-foreground">
                {t.role} · {t.company}
              </div>
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </Section>
  );
}
