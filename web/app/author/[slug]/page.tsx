import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { blogPosts } from "@/modules/blog-data";
import { company } from "@/modules/company-data";
import { JsonLd } from "@/components/seo/json-ld";

export const revalidate = 3600;

const AUTHOR_META: Record<
  string,
  {
    name: string;
    role: string;
    bio: string;
    avatar: string;
    linkedin: string;
    github: string;
  }
> = {
  "aditya-kumar": {
    name: "Aditya Kumar",
    role: "Lead Systems Architect",
    bio: "Lead Systems Architect at VoiceAct Solutions. I help Indian startups ship production-grade Next.js, React Native & AI applications — 0 to launch in 90 days.",
    avatar: "https://github.com/Adityakbr01.png",
    linkedin: "https://www.linkedin.com/in/aditya-kbr-3b833731b/",
    github: "https://github.com/Adityakbr01",
  },
};

interface PageProps {
  params: Promise<{ slug: string }> | { slug: string };
}

function getAuthor(slug: string) {
  const normalized = decodeURIComponent(slug).toLowerCase().trim().replace(/\s+/g, "-");
  return AUTHOR_META[normalized] || AUTHOR_META[slug];
}

export async function generateStaticParams() {
  return Object.keys(AUTHOR_META).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const author = getAuthor(slug);
  if (!author) return { title: "Author Not Found" };
  const normalizedSlug = decodeURIComponent(slug).toLowerCase().trim().replace(/\s+/g, "-");
  return {
    // Use the layout title template — do not append `${company.name}` here or
    // it gets duplicated by the root `%s | ${APP.name}` template.
    title: `${author.name} — ${author.role}`,
    description: author.bio.slice(0, 155),
    alternates: { canonical: `${company.website}/author/${normalizedSlug}` },
  };
}

export default async function AuthorPage({ params }: PageProps) {
  const { slug } = await params;
  const author = getAuthor(slug);
  if (!author) notFound();

  const authorPosts = blogPosts.filter(
    (p) => p.author.name.toLowerCase() === author.name.toLowerCase(),
  );

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: author.name,
    jobTitle: author.role,
    url: `${company.website}/author/${slug}`,
    image: author.avatar,
    description: author.bio,
    sameAs: [author.linkedin, author.github],
    worksFor: {
      "@type": "Organization",
      name: company.name,
      url: company.website,
    },
  };

  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <JsonLd data={personSchema} />
      <main className="mx-auto max-w-4xl px-6 pt-28 pb-20">
        {/* Author header */}
        <div className="flex items-center gap-6">
          <Image
            src={author.avatar}
            alt={author.name}
            width={96}
            height={96}
            priority
            className="size-24 rounded-full border border-border object-cover"
          />
          <div>
            <h1 className="text-3xl font-extrabold">{author.name}</h1>
            <p className="text-primary font-semibold">{author.role}</p>
            <div className="flex gap-4 mt-2 text-sm">
              <a
                href={author.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                LinkedIn
              </a>
              <a
                href={author.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>

        <p className="mt-6 text-muted-foreground leading-relaxed">{author.bio}</p>

        {/* Posts by author */}
        <h2 className="mt-10 text-xl font-bold">Articles by {author.name}</h2>
        <div className="mt-4 space-y-4">
          {authorPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block rounded-2xl border border-border/60 bg-card/40 p-5 hover:border-primary/40 transition group"
            >
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span className="font-semibold text-primary">{post.category}</span>
                <span>{post.publishedAt}</span>
              </div>
              <h3 className="mt-2 font-bold group-hover:text-primary transition-colors">
                {post.title}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{post.excerpt}</p>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
