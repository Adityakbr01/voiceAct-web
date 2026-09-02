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
  /** Optional regional hint for areaServed. */
  regionName?: string;
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
      // Modest, realistic team size for a focused studio.
      minValue: 1,
      maxValue: 10,
    },
    // No verified physical address — omit PostalAddress entirely.
    areaServed: {
      "@type": "Country",
      name: "India",
    },
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
    // Only include verified sameAs profiles.
    sameAs: [company.socials.github.href, company.socials.developerGithub.href, company.socials.developerLinkedin.href].filter(
      Boolean,
    ),
    contactPoint: [
      {
        "@type": "ContactPoint",
        email: company.contact.email,
        contactType: "customer support",
        areaServed: "IN",
        availableLanguage: ["English", "Hindi"],
      },
      {
        "@type": "ContactPoint",
        email: company.contact.supportEmail,
        contactType: "technical support",
        areaServed: "IN",
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
      "@id": `${baseUrl}/#organization`,
      name: company.name,
      url: baseUrl,
    },
    serviceType: service.category || service.name,
    url: service.url,
    areaServed: {
      "@type": "Country",
      name: "India",
    },
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