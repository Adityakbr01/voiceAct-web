"use client";

import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { company } from "@/modules/company-data";

interface PolicyLayoutProps {
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
}

export function PolicyLayout({ title, lastUpdated, children }: PolicyLayoutProps) {
  return (
    <main
      id="main-content"
      className="relative min-h-screen overflow-x-clip bg-background text-foreground"
    >
      <div className="mx-auto max-w-4xl px-6 py-24 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground mb-8"
          >
            <ArrowLeft className="size-4" />
            Back to home
          </Link>

          <h1 className="font-display text-4xl font-semibold tracking-tight md:text-5xl">
            {title}
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">
            Last updated: {lastUpdated}
          </p>

          <div className="prose prose-neutral dark:prose-invert mt-12 max-w-none space-y-8">
            {children}
          </div>

          <div className="mt-16 rounded-xl border bg-card p-6 text-sm text-muted-foreground">
            <p className="font-medium text-foreground">Questions about this policy?</p>
            <p className="mt-2">
              Contact us at{" "}
              <a href={`mailto:${company.contact.email}`} className="text-primary hover:underline">
                {company.contact.email}
              </a>{" "}
              or call{" "}
              <a href={`tel:${company.contact.phone}`} className="text-primary hover:underline">
                {company.contact.phone}
              </a>
            </p>
            <p className="mt-1">{company.address.full}</p>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
