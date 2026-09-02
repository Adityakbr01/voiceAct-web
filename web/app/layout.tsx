import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";

import "./globals.css";
import { APP } from "@/config/constants";
import { Providers } from "./providers";

import { JsonLd } from "@/components/seo/json-ld";
import {
  getOrganizationSchema,
  getWebSiteSchema,
  getWebPageSchema,
} from "@/lib/seo/schema";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
  preload: true,
  adjustFontFallback: true,
  fallback: ["system-ui", "sans-serif"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
  adjustFontFallback: true,
  fallback: ["system-ui", "sans-serif"],
  weight: ["400", "500", "600", "700"],
});

// JetBrains Mono is only used for tiny uppercase metadata labels — keep it
// off the critical path. `display: "optional"` avoids any layout shift after
// load and prevents the font fetch from competing with the LCP font.
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "optional",
  preload: false,
  fallback: ["ui-monospace", "Menlo", "monospace"],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || APP.url || "https://voiceact.tech";

// Next.js 13+ wants `viewport` exported separately from `metadata`. The
// inline <meta name="viewport"> was working but produced a Next.js warning
// in dev and is deprecated in Next.js 16.
export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: "#000000",
  colorScheme: "dark",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: "./",
    languages: {
      "en-IN": SITE_URL,
      en: SITE_URL,
    },
  },
  title: {
    default: APP.seoTitle,
    template: `%s | ${APP.name}`,
  },
  description: APP.seoDescription,
  keywords: [
    "web development company India",
    "Next.js development",
    "React Native mobile app development",
    "custom software development",
    "UI/UX design services",
    "web application development",
    "mobile app development India",
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
        alt: `${APP.name} — Web development, mobile apps, UI/UX design, and custom digital solutions`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
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
  const webSiteSchema = getWebSiteSchema();
  const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || APP.url || "https://voiceact.tech").replace(
    /\/$/,
    "",
  );
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
      <head>
        {/* Preconnect to third-party origins so the browser can warm up the
            TLS handshake before the JS actually requests the resource. */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="preconnect" href="https://us.i.posthog.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Hint the browser to fetch the OG image early so the first social
            share render is instant. */}
        <link rel="preload" as="image" href="/og-image.png" fetchPriority="low" />
        {/* PWA manifest — improves Lighthouse PWA score and gives mobile users
            an "Add to Home Screen" prompt. */}
        <link rel="manifest" href="/manifest.json" />
        {/* Disable iOS auto-linking of phone numbers — they're already
            clickable where appropriate via the <a href="tel:"> links. */}
        <meta name="format-detection" content="telephone=no" />
        {/* Web app capable — used by some mobile browsers instead of
            apple-mobile-web-app-capable for Android Chrome. */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="VoiceAct" />
        {/* Hint to AI search engines that the site is its canonical identity. */}
        <link rel="author" href="https://voiceact.tech/about" />
      </head>
      <body suppressHydrationWarning>
        <script
          // ponytail: flash-free theme — dark is the default
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var k='voiceact-theme';var t=localStorage.getItem(k);if(t!=='light'&&t!=='dark'){t='dark';}var r=document.documentElement;if(t==='dark'){r.classList.add('dark');}else{r.classList.remove('dark');}r.style.colorScheme=t;}catch(e){}})();`,
          }}
        />
        <JsonLd data={[orgSchema, webSiteSchema, webPageSchema]} />
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
