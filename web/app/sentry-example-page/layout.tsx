import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sentry Integration Diagnostic",
  robots: {
    index: false,
    follow: false,
  },
};

export default function SentryLayout({ children }: { children: React.ReactNode }) {
  return children;
}
