import { JsonLd } from "@/components/seo/json-ld";
import { listProjects } from "@/lib/api/cms";
import { getBreadcrumbSchema, getServiceSchema } from "@/lib/seo/schema";
import { company } from "@/modules/company-data";
import { Cta } from "@/modules/home/sections/cta";
import { ArrowLeft, ArrowRight, Briefcase, ExternalLink, FolderGit2 } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Client Portfolio & Case Studies",
  description:
    "Production apps shipped by VoiceAct Solutions: SaaS platforms, mobile apps, custom CRMs, and high-performance web products.",
  alternates: {
    canonical: `${company.website}/work`,
  },
  openGraph: {
    // OG title is used independently by social cards (not the browser
    // <title>), so the explicit `| VoiceAct Solutions` here is intentional.
    title: `Client Portfolio & Case Studies | ${company.name}`,
    description:
      "Production apps shipped by VoiceAct Solutions: SaaS, mobile apps, custom CRMs, and web products.",
    url: `${company.website}/work`,
  },
};

export default async function WorkPage() {
  const baseUrl = company.website.replace(/\/$/, "");
  let projects: any[] = [];

  try {
    const res = await listProjects();
    if (Array.isArray(res)) {
      projects = res;
    }
  } catch {
    projects = [];
  }

  const serviceSchema = getServiceSchema({
    name: "Software Development Portfolio",
    description: "Client case studies and software applications built by VoiceAct Solutions.",
    url: `${baseUrl}/work`,
  });

  const breadcrumbsSchema = getBreadcrumbSchema([
    { name: "Home", url: baseUrl },
    { name: "Work", url: `${baseUrl}/work` },
  ]);

  return (
    <div className="min-h-screen bg-background font-sans text-foreground selection:bg-primary selection:text-primary-foreground">
      <JsonLd data={[serviceSchema, breadcrumbsSchema]} />
      <main className="pt-24 pb-20">
        <div className="max-w-6xl mx-auto px-6 md:px-10 mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" /> Back to Home
          </Link>
        </div>

        {/* Hero Section */}
        <section className="max-w-6xl mx-auto px-6 md:px-10 pb-16 space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            <Briefcase className="size-3.5" aria-hidden />
            Production Case Studies
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight max-w-4xl">
            Shipped Software & Client Case Studies
          </h1>

          <p className="text-muted-foreground text-lg md:text-xl leading-relaxed max-w-3xl">
            Explore software platforms, mobile applications, and custom CRMs engineered and launched
            for startups, founders, and enterprise scaleups.
          </p>
        </section>

        {/* Projects Grid */}
        <section className="max-w-6xl mx-auto px-6 md:px-10 py-8">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-8">Featured Projects</h2>

          {projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {projects.map((project) => (
                <div
                  key={project._id || project.slug}
                  className="group rounded-3xl border border-border/60 bg-card/40 overflow-hidden flex flex-col justify-between hover:border-primary/50 transition-all"
                >
                  {project.image && (
                    <div className="aspect-video w-full overflow-hidden bg-muted">
                      <img
                        src={project.image}
                        alt={project.title}
                        width={600}
                        height={338}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  )}

                  <div className="p-8 space-y-4">
                    {project.client && (
                      <span className="text-xs font-bold uppercase tracking-wider text-primary">
                        {project.client}
                      </span>
                    )}

                    <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>

                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {project.description}
                    </p>

                    {project.services && project.services.length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-2">
                        {project.services.map((srv: string) => (
                          <span
                            key={srv}
                            className="px-2.5 py-1 rounded-lg bg-secondary/80 text-[11px] font-medium text-foreground/80 capitalize"
                          >
                            {srv.replace(/-/g, " ")}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="p-8 pt-0 flex items-center justify-between">
                    <Link
                      href={`/work/${project.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
                    >
                      Read Case Study <ArrowRight className="size-3.5" />
                    </Link>

                    {project.url && (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground"
                      >
                        Live Link <ExternalLink className="size-3" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-12 rounded-3xl border border-dashed border-border text-center space-y-4">
              <FolderGit2 className="size-10 text-muted-foreground mx-auto" />
              <h3 className="text-xl font-bold">Featured Portfolio Case Studies</h3>
              <p className="text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
                We've built over 120+ applications for startups and scaleups across web, mobile, and
                cloud. Contact us for custom client references.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-xs font-semibold text-primary-foreground"
              >
                Request Case Study Decks <ArrowRight className="size-3.5" />
              </Link>
            </div>
          )}
        </section>

        <Cta />
      </main>
    </div>
  );
}
