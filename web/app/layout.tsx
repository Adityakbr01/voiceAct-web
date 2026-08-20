import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";

import "./globals.css";
import { APP, SOCIALS } from "@/config/constants";
import { Providers } from "./providers";

import { JsonLd } from "@/components/seo/json-ld";
import { getOrganizationSchema, getLocalBusinessSchema, getWebSiteSchema, getWebPageSchema } from "@/lib/seo/schema";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
  preload: true,
  fallback: ["system-ui", "sans-serif"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
  fallback: ["system-ui", "sans-serif"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
  preload: false,
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || APP.url || "https://voiceact.tech";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: "./",
    languages: {
      "en-IN": SITE_URL,
      "en": SITE_URL,
    },
  },
  title: {
    default: APP.seoTitle,
    template: `%s | ${APP.name}`,
  },
  description: APP.seoDescription,
  keywords: [
    "software development agency India",
    "Next.js development company",
    "React Native mobile app development",
    "custom CRM development India",
    "SaaS development Bangalore",
    "MVP development company",
    "web application development India",
  ],
  authors: [{ name: APP.name, url: APP.url }],
  creator: APP.name,
  publisher: APP.name,
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [{ url: "/icon.png", sizes: "512x512" }],
  },
  openGraph: {
    title: APP.seoTitle,
    description: APP.seoDescription,
    type: "website",
    siteName: APP.name,
    url: APP.url,
    locale: "en_IN",
    countryName: "India",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: `${APP.name} — Custom Next.js, React Native & CRM development studio in Bengaluru, India`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: SOCIALS.twitter.handle,
    creator: SOCIALS.twitter.handle,
    title: APP.seoTitle,
    description: APP.seoDescription,
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "technology",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const gaId =
    process.env.NEXT_PUBLIC_GA_ID ||
    (process.env.NODE_ENV === "production" ? "G-D7ZC6EPVER" : undefined);

  const orgSchema = getOrganizationSchema();
  const localBizSchema = getLocalBusinessSchema();
  const webSiteSchema = getWebSiteSchema();
  const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || APP.url || "https://voiceact.tech").replace(/\/$/, "");
  const webPageSchema = getWebPageSchema({
    name: APP.seoTitle,
    description: APP.seoDescription,
    url: baseUrl,
    speakableSelectors: ["h1", "h2", ".hero-description"],
  });

  return (
    <html
      lang="en-IN"
      className={`dark ${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
      style={{ colorScheme: "dark" }}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning>
        <script
          // ponytail: flash-free dark mode
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var k='voiceact-theme';var t=localStorage.getItem(k);if(!t){t=window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}var r=document.documentElement;if(t==='dark'){r.classList.add('dark');}r.style.colorScheme=t;}catch(e){}})();`,
          }}
        />
        <JsonLd data={[orgSchema, localBizSchema, webSiteSchema, webPageSchema]} />
        <Providers>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-primary-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          >
            Skip to content
          </a>
          {children}
        </Providers>
        {gaId && <GoogleAnalytics gaId={gaId} />}
      </body>
    </html>
  );
}
