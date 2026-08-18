import { getFAQSchema } from "@/lib/seo/schema";
import { JsonLd } from "@/components/seo/json-ld";

interface FAQItem {
  question: string;
  answer: string;
}

export function FAQSchema({ faqs }: { faqs: FAQItem[] }) {
  return <JsonLd data={getFAQSchema(faqs)} />;
}
