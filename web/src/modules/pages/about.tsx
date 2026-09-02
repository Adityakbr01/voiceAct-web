"use client";

import { motion } from "framer-motion";
import { ArrowRight, Mail, Phone, Globe } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { company } from "@/modules/company-data";
import { services, stack } from "@/modules/services-data";

export function AboutPage() {
  return (
    <main
      id="main-content"
      className="relative min-h-screen overflow-x-clip bg-background text-foreground"
    >
      <div className="mx-auto max-w-7xl px-6 py-24 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link
            href="/"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground mb-8 inline-block"
          >
            ← Back to home
          </Link>

          <h1 className="font-display text-4xl font-semibold tracking-tight md:text-6xl">
            About {company.name}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">{company.description}</p>
        </motion.div>

        {/* Mission & Vision */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-20 grid gap-8 md:grid-cols-2"
        >
          <div className="rounded-xl border bg-card p-8">
            <h2 className="font-display text-2xl font-semibold">Our Mission</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">{company.mission}</p>
          </div>
          <div className="rounded-xl border bg-card p-8">
            <h2 className="font-display text-2xl font-semibold">Our Vision</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">{company.vision}</p>
          </div>
        </motion.section>

        {/* Honest stats — modest, realistic numbers for a focused studio */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-20"
        >
          <h2 className="font-display text-2xl font-semibold mb-8">By the Numbers</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {[
              { value: company.founded, label: "Founded" },
              { value: company.employees, label: "Team Size" },
              { value: company.clients, label: "Clients Served" },
              { value: company.projects, label: "Projects Delivered" },
            ].map((stat) => (
              <div key={stat.label} className="rounded-xl border bg-card p-6 text-center">
                <div className="font-display text-3xl font-semibold text-primary">{stat.value}</div>
                <div className="mt-2 text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Services */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-20"
        >
          <h2 className="font-display text-2xl font-semibold mb-8">Our Services</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <div
                key={service.title}
                className="rounded-xl border bg-card p-6 transition-colors hover:bg-card/80"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="flex size-10 items-center justify-center rounded-lg"
                    style={{ backgroundColor: `${service.color}15` }}
                  >
                    <service.icon className="size-5" style={{ color: service.color }} />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">{service.tag}</div>
                    <div className="font-medium">{service.title}</div>
                  </div>
                </div>
                <p className="mt-4 text-sm text-muted-foreground">{service.description}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Tech Stack */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20"
        >
          <h2 className="font-display text-2xl font-semibold mb-8">Technology Stack</h2>
          <div className="grid grid-cols-3 gap-4 md:grid-cols-4 lg:grid-cols-6">
            {stack.map((item) => (
              <div
                key={item.name}
                className="flex flex-col items-center gap-2 rounded-xl border bg-card p-4 text-center transition-colors hover:bg-card/80"
              >
                <item.icon className="size-8" style={{ color: item.color }} />
                <span className="text-sm font-medium">{item.name}</span>
                <span className="text-xs text-muted-foreground">{item.category}</span>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Contact & Business Info */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-20"
        >
          <h2 className="font-display text-2xl font-semibold mb-8">
            Contact & Business Information
          </h2>
          <div className="grid gap-8 md:grid-cols-2">
            {/* Contact Details */}
            <div className="rounded-xl border bg-card p-8">
              <h3 className="font-display text-lg font-semibold mb-6">Get in Touch</h3>
              <div className="space-y-4">
                <a
                  href={`mailto:${company.contact.email}`}
                  className="flex items-center gap-3 text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Mail className="size-5 text-primary" />
                  <span>{company.contact.email}</span>
                </a>
                <a
                  href={`tel:${company.contact.phone.replace(/\s/g, "")}`}
                  className="flex items-center gap-3 text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Phone className="size-5 text-primary" />
                  <span>{company.contact.phone}</span>
                </a>
                <div className="flex items-start gap-3 text-muted-foreground">
                  <Globe className="size-5 text-primary shrink-0 mt-0.5" />
                  <a
                    href={company.website}
                    className="hover:text-foreground transition-colors"
                  >
                    {company.website.replace(/^https?:\/\//, "")}
                  </a>
                </div>
              </div>
              <Button asChild className="mt-8" variant="glow">
                <a href="/#contact">
                  Start a Project
                  <ArrowRight className="ml-1 size-4" />
                </a>
              </Button>
            </div>

            {/* Business Registrations */}
            <div className="rounded-xl border bg-card p-8">
              <h3 className="font-display text-lg font-semibold mb-6">Business Information</h3>
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-muted-foreground">Company Name</div>
                  <div className="font-medium">{company.name}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Business Type</div>
                  <div className="font-medium">{company.industry}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Service Area</div>
                  <div className="font-medium">India · Remote engagements worldwide</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Support Email</div>
                  <div className="font-medium">{company.contact.supportEmail}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Administrative Email</div>
                  <div className="font-medium">{company.contact.adminEmail}</div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>
      </div>
    </main>
  );
}