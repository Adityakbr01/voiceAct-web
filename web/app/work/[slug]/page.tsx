import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProjectBySlug } from "@/lib/api/cms";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface PageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const baseUrl = "https://voiceact.tech";
  const canonicalUrl = `${baseUrl}/work/${params.slug}`;

  try {
    const project = await getProjectBySlug(params.slug);
    return {
      title: project.title,
      description: project.description,
      alternates: {
        canonical: canonicalUrl,
      },
      openGraph: {
        title: project.title,
        description: project.description,
        url: canonicalUrl,
        images: project.image ? [{ url: project.image }] : [],
      },
    };
  } catch {
    return {
      title: "Project Not Found",
    };
  }
}

export default async function ProjectPage({ params }: PageProps) {
  let project;
  try {
    project = await getProjectBySlug(params.slug);
  } catch {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background px-6 py-20 text-foreground">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/#work"
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Back to work
        </Link>

        <div className="space-y-6">
          {project.image && (
            <div className="overflow-hidden rounded-2xl border border-border/60">
              <img src={project.image} alt={project.title} className="h-auto w-full object-cover" />
            </div>
          )}

          <div>
            {project.client && (
              <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
                {project.client}
              </p>
            )}
            <h1 className="mt-2 text-4xl font-bold leading-tight md:text-5xl">{project.title}</h1>
          </div>

          <div className="prose prose-invert max-w-none">
            <p className="text-lg text-muted-foreground">{project.description}</p>
          </div>

          {project.url && (
            <div className="pt-4">
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Visit project
              </a>
            </div>
          )}

          {project.services && project.services.length > 0 && (
            <div className="border-t border-border/60 pt-6">
              <h2 className="mb-3 text-sm uppercase tracking-[0.2em] text-muted-foreground">
                Services
              </h2>
              <div className="flex flex-wrap gap-2">
                {project.services.map((service) => (
                  <span
                    key={service}
                    className="rounded-full border border-border/60 bg-card/40 px-3 py-1 text-sm capitalize"
                  >
                    {service.replace(/-/g, " ")}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
