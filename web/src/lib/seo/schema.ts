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
  /** City or region this service is being offered */
  cityName?: string;
}

export interface WebPageSchemaInput {
  name: string;
  description: string;
  url: string;
  /** CSS selectors or xpaths for speakable content */
  speakableSelectors?: string[];
  datePublished?: string;
  dateModified?: string;
  breadcrumbs?: BreadcrumbItem[];
}

const SERVICES_AREA = ["Bengaluru", "Hyderabad", "Pune", "Mumbai", "Delhi NCR", "Chennai", "India"];

export const getOrganizationSchema = () => {
  const baseUrl = company.website.replace(/\/$/, "");

  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "ProfessionalService"],
    "@id": `${baseUrl}/#organization`,
    name: company.name,
    legalName: company.name,
    url: baseUrl,
    logo: {
      "@type": "ImageObject",
      url: `${baseUrl}/icon.png`,
      width: 512,
      height: 512,
    },
    image: `${baseUrl}/og-image.png`,
    description: company.description,
    email: company.contact.email,
    telephone: company.contact.phone,
    foundingDate: company.founded,
    numberOfEmployees: {
      "@type": "QuantitativeValue",
      minValue: 10,
      maxValue: 50,
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: company.address.street,
      addressLocality: company.address.city,
      addressRegion: company.address.state,
      postalCode: company.address.pincode,
      addressCountry: "IN",
    },
    areaServed: SERVICES_AREA.map((city) => ({
      "@type": "City",
      name: city,
    })),
    knowsAbout: [
      "Web Application Development",
      "Mobile App Development",
      "React Native",
      "Next.js",
      "Custom CRM Development",
      "SaaS Development",
      "UI/UX Design",
      "AI Solutions",
      "Cloud Infrastructure",
      "Software Architecture",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Software Development Services",
      itemListElement: company.services.map((svc) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: svc,
        },
      })),
    },
    sameAs: [
      company.socials.linkedin.href,
      company.socials.twitter.href,
      company.socials.instagram?.href,
      company.socials.github.href,
    ].filter(Boolean),
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
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: company.contact.phone,
        contactType: "sales",
        email: company.contact.salesEmail,
        areaServed: "IN",
        availableLanguage: ["English", "Hindi"],
      },
      {
        "@type": "ContactPoint",
        email: company.contact.supportEmail,
        contactType: "customer support",
        areaServed: "IN",
      },
    ],
  };
};

export const getLocalBusinessSchema = (cityName?: string) => {
  const baseUrl = company.website.replace(/\/$/, "");
  const city = cityName || company.address.city;

  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${baseUrl}/#localbusiness-${city.toLowerCase().replace(/\s+/g, "-")}`,
    name: `${company.name} — ${city}`,
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
    areaServed: SERVICES_AREA.map((c) => ({ "@type": "City", name: c })),
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
    servesCuisine: undefined, // not a restaurant
    parentOrganization: {
      "@id": `${baseUrl}/#organization`,
    },
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
      "@id": `${baseUrl}/#organization`,
      name: company.name,
      url: baseUrl,
    },
    serviceType: service.category || service.name,
    url: service.url,
    areaServed: SERVICES_AREA.map((city) => ({ "@type": "City", name: city })),
    ...(service.image && { image: service.image }),
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceCurrency: "INR",
      seller: {
        "@type": "Organization",
        "@id": `${baseUrl}/#organization`,
      },
    },
  };
};

/**
 * QAPage — use for genuine Q&A pages.
 * NOTE: FAQPage rich results were retired by Google on May 7, 2026.
 * This generates QAPage which is the correct modern replacement.
 */
export const getQAPageSchema = (faqs: FAQItem[]) => {
  return {
    "@context": "https://schema.org",
    "@type": "QAPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
      answerCount: 1,
    })),
  };
};

/**
 * @deprecated FAQPage rich results retired by Google May 7, 2026.
 * Use getQAPageSchema() instead.
 */
export const getFAQSchema = (faqs: FAQItem[]) => {
  return getQAPageSchema(faqs);
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

export const getWebSiteSchema = () => {
  const baseUrl = company.website.replace(/\/$/, "");

  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${baseUrl}/#website`,
    url: baseUrl,
    name: company.name,
    description: company.description,
    publisher: {
      "@id": `${baseUrl}/#organization`,
    },
    inLanguage: "en-IN",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${baseUrl}/blog?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
};

export const getWebPageSchema = (input: WebPageSchemaInput) => {
  const baseUrl = company.website.replace(/\/$/, "");
  const speakable = input.speakableSelectors ?? ["h1", "h2", "p"];

  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${input.url}#webpage`,
    url: input.url,
    name: input.name,
    description: input.description,
    inLanguage: "en-IN",
    isPartOf: { "@id": `${baseUrl}/#website` },
    publisher: { "@id": `${baseUrl}/#organization` },
    ...(input.datePublished && { datePublished: input.datePublished }),
    ...(input.dateModified && { dateModified: input.dateModified }),
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: speakable,
    },
    ...(input.breadcrumbs && {
      breadcrumb: getBreadcrumbSchema(input.breadcrumbs),
    }),
  };
};

export const getPersonSchema = (person: {
  name: string;
  jobTitle?: string;
  url?: string;
  image?: string;
  sameAs?: string[];
}) => {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: person.name,
    ...(person.jobTitle && { jobTitle: person.jobTitle }),
    ...(person.url && { url: person.url }),
    ...(person.image && { image: person.image }),
    worksFor: {
      "@type": "Organization",
      name: company.name,
      url: company.website,
    },
    ...(person.sameAs && { sameAs: person.sameAs }),
  };
};

export const getArticleSchema = (article: {
  headline: string;
  description: string;
  url: string;
  image?: string;
  datePublished: string;
  dateModified?: string;
  authorName: string;
  authorUrl?: string;
}) => {
  const baseUrl = company.website.replace(/\/$/, "");

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.headline,
    description: article.description,
    url: article.url,
    datePublished: article.datePublished,
    dateModified: article.dateModified ?? article.datePublished,
    ...(article.image && { image: article.image }),
    author: {
      "@type": "Person",
      name: article.authorName,
      ...(article.authorUrl && { url: article.authorUrl }),
    },
    publisher: {
      "@id": `${baseUrl}/#organization`,
      "@type": "Organization",
      name: company.name,
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/icon.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": article.url,
    },
    inLanguage: "en-IN",
  };
};
