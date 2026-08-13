import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, Calendar, ArrowRight, Share2, Tag } from "lucide-react";
import { getBlogPostBySlug, blogPosts, type BlogPost } from "@/modules/blog-data";
import { getBlogBySlug, listBlogs } from "@/lib/api/cms";
import { mergeBlogsFromApi } from "@/lib/cms-presentations";
import { MarkdownRenderer } from "@/components/blog/markdown-renderer";
import { company } from "@/modules/company-data";
import { Footer } from "@/components/layouts/footer";
import { Cta } from "@/modules/home/sections/cta";
import { JsonLd } from "@/components/seo/json-ld";
import { getBreadcrumbSchema } from "@/lib/seo/schema";

const authorProfiles: Record<string, { url: string; sameAs: string[] }> = {
  "Aditya Kumar": {
    url: "https://www.linkedin.com/in/aditya-kbr-3b833731b/",
    sameAs: ["https://www.linkedin.com/in/aditya-kbr-3b833731b/", company.socials.developer.href],
  },
};

interface PageProps {
  params: Promise<{ slug: string }> | { slug: string };
}

export const revalidate = 300;
export const dynamicParams = true;

export async function generateStaticParams() {
  try {
    const res = await listBlogs();
    if (res.data && res.data.length > 0) {
      return res.data.map((post) => ({ slug: post.slug }));
    }
  } catch (error) {
    // Fallback to static list
  }
  return blogPosts.map((post) => ({ slug: post.slug }));
}

async function fetchPost(slug: string): Promise<BlogPost | undefined> {
  try {
    const apiBlog = await getBlogBySlug(slug);
    if (apiBlog) {
      return mergeBlogsFromApi([apiBlog])[0];
    }
  } catch (error) {
    // Fallback to static blog list
  }
  return getBlogPostBySlug(slug);
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const post = await fetchPost(resolvedParams.slug);

  if (!post) {
    return { title: `Post Not Found — ${company.name}` };
  }

  const baseUrl = company.website.replace(/\/$/, "");
  const canonicalUrl = `${baseUrl}/blog/${resolvedParams.slug}`;

  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: canonicalUrl,
      images: [{ url: post.coverImage }],
    },
  };
}

export default async function BlogPostDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const post = await fetchPost(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  const baseUrl = company.website.replace(/\/$/, "");
  const postUrl = `${baseUrl}/blog/${post.slug}`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: post.coverImage,
    datePublished: post.publishedAt,
    author: {
      "@type": "Person",
      name: post.author.name,
      jobTitle: post.author.role,
      ...(authorProfiles[post.author.name] && {
        url: authorProfiles[post.author.name].url,
        sameAs: authorProfiles[post.author.name].sameAs,
      }),
    },
    publisher: {
      "@type": "Organization",
      name: company.name,
      url: baseUrl,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": postUrl,
    },
  };

  const breadcrumbsSchema = getBreadcrumbSchema([
    { name: "Home", url: baseUrl },
    { name: "Blog", url: `${baseUrl}/blog` },
    { name: post.title, url: postUrl },
  ]);

  const relatedPosts = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <div className="min-h-screen bg-background font-sans text-foreground selection:bg-primary selection:text-primary-foreground">
      <JsonLd data={[articleSchema, breadcrumbsSchema]} />
      <main className="pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-6 md:px-10 mb-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" /> Back to Blog
          </Link>
        </div>

        {/* Article Header */}
        <section className="max-w-7xl mx-auto px-6 md:px-10 pb-8 space-y-6">
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="rounded-full bg-primary/10 border border-primary/20 px-3 py-1 font-semibold text-primary uppercase tracking-wider">
              {post.category}
            </span>
            <span>·</span>
            <span className="inline-flex items-center gap-1">
              <Clock className="size-3.5" /> {post.readTime}
            </span>
            <span>·</span>
            <span className="inline-flex items-center gap-1">
              <Calendar className="size-3.5" /> {post.publishedAt}
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight">
            {post.title}
          </h1>

          <p className="text-muted-foreground text-lg md:text-xl leading-relaxed">{post.excerpt}</p>

          <div className="flex items-center justify-between border-y border-border/60 py-4">
            <div className="flex items-center gap-3">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                width={40}
                height={40}
                loading="eager"
                className="size-10 rounded-full object-cover border border-border"
              />
              <div>
                <Link
                  href="/about"
                  className="text-sm font-bold text-foreground hover:text-primary transition-colors"
                >
                  {post.author.name}
                </Link>
                <p className="text-xs text-muted-foreground">{post.author.role}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="hidden sm:inline-flex items-center gap-1 rounded-full border border-border/60 bg-card/50 px-2.5 py-0.5 text-xs text-muted-foreground"
                >
                  <Tag className="size-3" /> {tag}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Cover Image */}
        <section className="max-w-7xl mx-auto px-6 md:px-10 pb-12">
          <div className="overflow-hidden rounded-3xl border border-border/60 aspect-video">
            <img
              src={post.coverImage}
              alt={post.title}
              width={1200}
              height={675}
              loading="eager"
              className="h-full w-full object-cover"
            />
          </div>
        </section>

        {/* Article Body */}
        <article className="max-w-7xl mx-auto px-6 md:px-10 pb-16">
          <MarkdownRenderer content={post.content} />
        </article>

        {/* Related Articles */}
        {relatedPosts.length > 0 && (
          <section className="max-w-7xl mx-auto px-6 md:px-10 py-12 border-t border-border/60">
            <h3 className="text-xl font-bold tracking-tight mb-6">Related Articles</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedPosts.map((related) => (
                <Link
                  key={related.slug}
                  href={`/blog/${related.slug}`}
                  className="group p-5 rounded-2xl border border-border/60 bg-card/40 hover:border-primary/40 transition flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <span className="text-xs font-semibold text-primary">{related.category}</span>
                    <h4 className="font-bold text-base group-hover:text-primary transition-colors">
                      {related.title}
                    </h4>
                  </div>
                  <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-primary">
                    Read Post <ArrowRight className="size-3" />
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
