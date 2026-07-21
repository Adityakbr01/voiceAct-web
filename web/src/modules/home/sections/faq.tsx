import { Section, SectionHeader } from "@/modules/home/components/section";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs } from "@/modules/services-data";

export function Faq() {
  return (
    <Section id="faq">
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
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((f, i) => (
              <AccordionItem key={f.q} value={`item-${i}`} className="border-border/60">
                <AccordionTrigger className="text-left text-base font-medium">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </Section>
  );
}
