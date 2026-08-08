import { company } from "@/modules/company-data";

export interface FAQItem {
  question: string;
  answer: string;
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export interface ServiceSchemaInput {
  name: string;
  description: string;
  url: string;
  category?: string;
  image?: string;
}

export const getOrganizationSchema = () => {
  const baseUrl = company.website.replace(/\/$/, "");

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${baseUrl}/#organization`,
    name: company.name,
    legalName: company.name,
    url: baseUrl,
    logo: `${baseUrl}/icon.png`,
    description: company.description,
    email: company.contact.email,
    telephone: company.contact.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: company.address.street,
      addressLocality: company.address.city,
      addressRegion: company.address.state,
      postalCode: company.address.pincode,
      addressCountry: "IN",
    },
    sameAs: [
      company.socials.linkedin.href,
      company.socials.twitter.href,
      company.socials.github.href,
    ],
  };
};

export const getLocalBusinessSchema = (cityName?: string) => {
  const baseUrl = company.website.replace(/\/$/, "");
  const city = cityName || company.address.city;

  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${baseUrl}/#localbusiness-${city.toLowerCase()}`,
    name: `${company.name} - ${city}`,
    url: baseUrl,
    telephone: company.contact.phone,
    email: company.contact.email,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: company.address.street,
      addressLocality: city,
      addressRegion: company.address.state,
      postalCode: company.address.pincode,
      addressCountry: "IN",
    },
    areaServed: [city, "Bengaluru", "Hyderabad", "Pune", "Mumbai", "Delhi NCR", "India"],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "10:00",
        closes: "14:00",
      },
    ],
  };
};

export const getServiceSchema = (service: ServiceSchemaInput) => {
  const baseUrl = company.website.replace(/\/$/, "");

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.description,
    provider: {
      "@type": "Organization",
      name: company.name,
      url: baseUrl,
    },
    serviceType: service.category || service.name,
    url: service.url,
    ...(service.image && { image: service.image }),
  };
};

export const getFAQSchema = (faqs: FAQItem[]) => {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
};

export const getBreadcrumbSchema = (items: BreadcrumbItem[]) => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
};
