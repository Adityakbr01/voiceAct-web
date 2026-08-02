"use client";

import { Section, SectionHeader } from "@/modules/home/components/section";
import { faqs } from "@/modules/services-data";
import { MotionAccordion, type MotionAccordionItem } from "@/components/ui/motion-accordion";

const items: MotionAccordionItem[] = faqs.map((f) => ({
  question: f.q,
  answer: f.a,
}));

export function Faq() {
  return (
    <Section id="faq" className="cv-auto">
      <div className="grid grid-cols-1 gap-14 md:grid-cols-12">
        <div className="md:col-span-5">
          <SectionHeader
            eyebrow="FAQ"
            title={
              <>
                Questions we hear
                <span className="font-display italic tracking-tight text-primary">
                  {" "}
                  before every kickoff.
                </span>
              </>
            }
            description="Something not covered? Drop us a line — we reply within a business day."
          />
        </div>
        <div className="md:col-span-7">
          <MotionAccordion items={items} gap={1} />
        </div>
      </div>
    </Section>
  );
}
