import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";

import "./globals.css";
import { APP, SOCIALS } from "@/config/constants";
import { Providers } from "./providers";

import { JsonLd } from "@/components/seo/json-ld";
import { getOrganizationSchema, getLocalBusinessSchema } from "@/lib/seo/schema";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
  preload: true,
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || APP.url || "https://voiceact.tech"),
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL || APP.url || "https://voiceact.tech",
  },
  title: {
    default: APP.seoTitle,
    template: `%s | ${APP.name}`,
  },
  description: APP.seoDescription,
  authors: [{ name: APP.name }],
  openGraph: {
    title: APP.seoTitle,
    description: APP.seoDescription,
    type: "website",
    siteName: APP.name,
  },
  twitter: {
    card: "summary_large_image",
    site: SOCIALS.twitter.handle,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const gaId =
    process.env.NEXT_PUBLIC_GA_ID ||
    (process.env.NODE_ENV === "production" ? "G-D7ZC6EPVER" : undefined);

  const orgSchema = getOrganizationSchema();
  const localBizSchema = getLocalBusinessSchema();

  return (
    <html
      lang="en"
      className={`dark ${spaceGrotesk.variable} ${inter.variable}`}
      style={{ colorScheme: "dark" }}
      suppressHydrationWarning
    >
      <head>
        <script
          // ponytail: flash-free dark mode, kept as-is from TanStack version
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var k='voiceact-theme';var t=localStorage.getItem(k);if(!t){t=window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}var r=document.documentElement;if(t==='dark'){r.classList.add('dark');}r.style.colorScheme=t;}catch(e){}})();`,
          }}
        />
        <JsonLd data={[orgSchema, localBizSchema]} />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
      </head>
      <body suppressHydrationWarning>
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
