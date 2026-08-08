import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar, ArrowRight, BookOpen } from "lucide-react";
import { company } from "@/modules/company-data";
import { blogPosts } from "@/modules/blog-data";
import { listBlogs } from "@/lib/api/cms";
import { mergeBlogsFromApi } from "@/hooks/use-public-cms";
import { Footer } from "@/components/layouts/footer";
import { Cta } from "@/modules/home/sections/cta";

export const revalidate = 300;

export const metadata: Metadata = {
  title: `Blog & Insights — ${company.name}`,
  description:
    "Engineering insights, web & mobile app architecture, design systems, and AI workflows from senior developers at VoiceAct Solutions.",
  openGraph: {
    title: `Blog & Insights — ${company.name}`,
    description:
      "Engineering insights, web & mobile app architecture, design systems, and AI workflows from senior developers at VoiceAct Solutions.",
    type: "website",
    url: `${company.website}/blog`,
  },
  alternates: {
    canonical: `${company.website}/blog`,
  },
};

export default async function BlogIndexPage() {
  let posts = blogPosts;
  try {
    const apiBlogs = await listBlogs();
    if (apiBlogs && apiBlogs.length > 0) {
      posts = mergeBlogsFromApi(apiBlogs);
    }
  } catch (error) {
    // Graceful fallback to static blog data
  }

  const featuredPost = posts.find((p) => p.featured) || posts[0];
  const regularPosts = posts.filter((p) => p?.slug !== featuredPost?.slug);

  return (
    <div className="min-h-screen bg-background font-sans text-foreground selection:bg-primary selection:text-primary-foreground">
      <main className="pt-24 pb-20">
        <div className="max-w-6xl mx-auto px-6 md:px-10 mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" /> Back to Home
          </Link>
        </div>

        {/* Blog Hero Section */}
        <section className="px-6 md:px-10 pb-12 max-w-6xl mx-auto text-center space-y-4">
          <span className="glass inline-flex items-center gap-2 rounded-full border border-border/60 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
            <BookOpen className="size-3.5 text-primary" aria-hidden />
            Insights & Engineering
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-balance">
            Thoughts on building{" "}
            <span className="text-primary italic font-display">exceptional</span> software.
          </h1>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto leading-relaxed text-pretty">
            Technical guides, product design systems, cross-platform mobile strategies, and AI
            workflows written by our senior studio engineers.
          </p>
        </section>

        {/* Featured Article Card */}
        {featuredPost && (
          <section className="px-6 md:px-10 pb-16 max-w-6xl mx-auto">
            <Link
              href={`/blog/${featuredPost.slug}`}
              className="group relative block overflow-hidden rounded-3xl border border-border/70 bg-card/60 transition-all duration-500 hover:border-primary/50 hover:shadow-2xl md:grid md:grid-cols-12"
            >
              <div className="relative aspect-video md:aspect-auto md:col-span-7 overflow-hidden">
                <img
                  src={featuredPost.coverImage}
                  alt={featuredPost.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 rounded-full bg-primary/90 backdrop-blur-md px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-primary-foreground">
                  Featured Article
                </div>
              </div>
              <div className="p-6 md:p-10 md:col-span-5 flex flex-col justify-between space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="font-semibold text-primary">{featuredPost.category}</span>
                    <span>·</span>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="size-3" /> {featuredPost.readTime}
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold leading-tight transition-colors group-hover:text-primary">
                    {featuredPost.title}
                  </h2>
                  <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                    {featuredPost.excerpt}
                  </p>
                </div>

                <div className="flex items-center justify-between border-t border-border/50 pt-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={featuredPost.author.avatar}
                      alt={featuredPost.author.name}
                      className="size-8 rounded-full object-cover border border-border"
                    />
                    <div>
                      <p className="text-xs font-semibold text-foreground">
                        {featuredPost.author.name}
                      </p>
                      <p className="text-[10px] text-muted-foreground">
                        {featuredPost.publishedAt}
                      </p>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-primary group-hover:translate-x-1 transition-transform">
                    Read Article <ArrowRight className="size-3.5" />
                  </span>
                </div>
              </div>
            </Link>
          </section>
        )}

        {/* Regular Articles Grid */}
        <section className="px-6 md:px-10 pb-20 max-w-6xl mx-auto">
          <h2 className="text-xl font-bold tracking-tight mb-8">All Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border/60 bg-card/40 p-5 transition-all duration-300 hover:border-primary/40 hover:-translate-y-1"
              >
                <div className="space-y-4">
                  <div className="aspect-video w-full overflow-hidden rounded-xl bg-muted">
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span className="font-semibold text-primary">{post.category}</span>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="size-3" /> {post.readTime}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold leading-snug transition-colors group-hover:text-primary">
                    {post.title}
                  </h3>

                  <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                    {post.excerpt}
                  </p>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-border/40 pt-4 text-xs">
                  <div className="flex items-center gap-2">
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="size-6 rounded-full object-cover"
                    />
                    <span className="text-muted-foreground text-[11px]">{post.author.name}</span>
                  </div>
                  <span className="font-semibold text-primary inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                    Read <ArrowRight className="size-3" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
