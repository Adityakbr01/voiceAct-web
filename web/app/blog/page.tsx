import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  Clock,
  Calendar,
  ArrowRight,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Filter,
} from "lucide-react";
import { company } from "@/modules/company-data";
import { blogPosts, type BlogPost } from "@/modules/blog-data";
import { listBlogs } from "@/lib/api/cms";
import { mergeBlogsFromApi } from "@/lib/cms-presentations";
import { Footer } from "@/components/layouts/footer";
import { Cta } from "@/modules/home/sections/cta";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Engineering Blog & Software Insights",
  description:
    "Technical insights, web and mobile app architecture, design systems, and AI workflows from senior software engineers at VoiceAct.",
  openGraph: {
    title: "Engineering Blog & Software Insights",
    description:
      "Technical insights, web and mobile app architecture, design systems, and AI workflows from senior software engineers at VoiceAct.",
    type: "website",
    url: `${company.website}/blog`,
  },
  alternates: {
    canonical: `${company.website}/blog`,
  },
};

const CATEGORIES = ["All", "Engineering", "Mobile", "AI & Automation", "Design", "SaaS"];
const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80";

interface BlogPageProps {
  searchParams?:
    Promise<{ page?: string; category?: string }> | { page?: string; category?: string };
}

export default async function BlogIndexPage(props: BlogPageProps) {
  const resolvedParams = props.searchParams ? await props.searchParams : {};
  const currentPage = Math.max(1, Number(resolvedParams.page) || 1);
  const currentCategory = resolvedParams.category || "All";

  console.log(
    `[BLOG PAGE DEBUG] Rendering /blog (Page ${currentPage}, Category: "${currentCategory}")...`,
  );

  const filteredStatic =
    currentCategory !== "All"
      ? blogPosts.filter((p) => p.category.toLowerCase() === currentCategory.toLowerCase())
      : blogPosts;

  let posts: BlogPost[] = filteredStatic.slice((currentPage - 1) * 6, currentPage * 6);
  let pagination = {
    page: currentPage,
    limit: 6,
    total: filteredStatic.length,
    totalPages: Math.ceil(filteredStatic.length / 6) || 1,
  };

  try {
    const apiResult = await listBlogs({
      page: currentPage,
      limit: 6,
      category: currentCategory !== "All" ? currentCategory : undefined,
    });

    if (apiResult.data && apiResult.data.length > 0) {
      posts = mergeBlogsFromApi(apiResult.data);
      if (apiResult.pagination) {
        pagination = apiResult.pagination;
      }
      console.log(
        `[BLOG PAGE DEBUG] Successfully loaded ${posts.length} blogs from API (Total: ${pagination.total}).`,
      );
    } else {
      console.warn(
        `[BLOG PAGE DEBUG] API returned 0 posts for page ${currentPage}, category ${currentCategory}. Using static fallback (${posts.length} posts).`,
      );
    }
  } catch (error) {
    console.error("[BLOG PAGE DEBUG ERROR] Exception loading blog posts:", error);
  }

  const featuredPost = currentPage === 1 ? posts.find((p) => p.featured) || posts[0] : undefined;
  const regularPosts = featuredPost ? posts.filter((p) => p?.slug !== featuredPost.slug) : posts;

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
        <section className="px-6 md:px-10 pb-10 max-w-6xl mx-auto text-center space-y-4">
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

        {/* Category Filter Pills */}
        <section className="px-6 md:px-10 pb-12 max-w-6xl mx-auto">
          <div className="flex items-center justify-center gap-2 overflow-x-auto py-2 no-scrollbar">
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-muted-foreground pr-2">
              <Filter className="size-3.5 text-primary" /> Filter:
            </span>
            {CATEGORIES.map((cat) => {
              const isActive = currentCategory.toLowerCase() === cat.toLowerCase();
              const href = cat === "All" ? "/blog" : `/blog?category=${encodeURIComponent(cat)}`;
              return (
                <Link
                  key={cat}
                  href={href}
                  className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all whitespace-nowrap ${
                    isActive
                      ? "bg-primary text-primary-foreground shadow-md shadow-primary/20 scale-105"
                      : "border border-border/60 bg-card/50 text-muted-foreground hover:border-primary/40 hover:text-foreground"
                  }`}
                >
                  {cat}
                </Link>
              );
            })}
          </div>
        </section>

        {/* Featured Article Card */}
        {featuredPost && currentPage === 1 && (
          <section className="px-6 md:px-10 pb-16 max-w-6xl mx-auto">
            <Link
              href={`/blog/${featuredPost.slug}`}
              className="group relative block overflow-hidden rounded-3xl border border-border/70 bg-card/60 transition-all duration-500 hover:border-primary/50 hover:shadow-2xl md:grid md:grid-cols-12"
            >
              <div className="relative aspect-video md:aspect-auto md:col-span-7 overflow-hidden">
                <img
                  src={featuredPost.coverImage || FALLBACK_IMAGE}
                  alt={featuredPost.title}
                  width={800}
                  height={450}
                  loading="eager"
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
        <section className="px-6 md:px-10 pb-16 max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold tracking-tight">
              {currentCategory !== "All" ? `${currentCategory} Articles` : "Latest Articles"}
            </h2>
            <span className="text-xs text-muted-foreground font-medium">
              Showing {regularPosts.length} article{regularPosts.length === 1 ? "" : "s"}
            </span>
          </div>

          {regularPosts.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border/80 p-12 text-center space-y-3">
              <p className="text-muted-foreground text-sm">
                No articles found for this category or page.
              </p>
              <Link
                href="/blog"
                className="inline-block text-xs font-bold text-primary hover:underline"
              >
                View All Articles &rarr;
              </Link>
            </div>
          ) : (
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
                        src={post.coverImage || FALLBACK_IMAGE}
                        alt={post.title}
                        width={600}
                        height={338}
                        loading="lazy"
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
                        width={24}
                        height={24}
                        loading="lazy"
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
          )}
        </section>

        {/* Pagination Controls */}
        {pagination.totalPages > 1 && (
          <section className="px-6 md:px-10 pb-20 max-w-6xl mx-auto">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-border/60 pt-8">
              <span className="text-xs text-muted-foreground">
                Page <strong className="text-foreground">{pagination.page}</strong> of{" "}
                <strong className="text-foreground">{pagination.totalPages}</strong> (Total{" "}
                <strong className="text-foreground">{pagination.total}</strong> posts)
              </span>

              <div className="flex items-center gap-2">
                {/* Previous Page Link */}
                {pagination.page > 1 ? (
                  <Link
                    href={`/blog?page=${pagination.page - 1}${
                      currentCategory !== "All"
                        ? `&category=${encodeURIComponent(currentCategory)}`
                        : ""
                    }`}
                    className="inline-flex items-center gap-1 rounded-xl border border-border/60 bg-card/60 px-3.5 py-2 text-xs font-semibold transition hover:border-primary/40 hover:text-primary"
                  >
                    <ChevronLeft className="size-4" /> Previous
                  </Link>
                ) : (
                  <span className="inline-flex items-center gap-1 rounded-xl border border-border/30 bg-card/20 px-3.5 py-2 text-xs font-semibold text-muted-foreground/40 cursor-not-allowed">
                    <ChevronLeft className="size-4" /> Previous
                  </span>
                )}

                {/* Page Number Buttons */}
                {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((pageNum) => {
                  const isActive = pageNum === pagination.page;
                  const href = `/blog?page=${pageNum}${
                    currentCategory !== "All"
                      ? `&category=${encodeURIComponent(currentCategory)}`
                      : ""
                  }`;
                  return (
                    <Link
                      key={pageNum}
                      href={href}
                      className={`flex size-9 items-center justify-center rounded-xl text-xs font-bold transition ${
                        isActive
                          ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                          : "border border-border/60 bg-card/40 text-muted-foreground hover:border-primary/40 hover:text-foreground"
                      }`}
                    >
                      {pageNum}
                    </Link>
                  );
                })}

                {/* Next Page Link */}
                {pagination.page < pagination.totalPages ? (
                  <Link
                    href={`/blog?page=${pagination.page + 1}${
                      currentCategory !== "All"
                        ? `&category=${encodeURIComponent(currentCategory)}`
                        : ""
                    }`}
                    className="inline-flex items-center gap-1 rounded-xl border border-border/60 bg-card/60 px-3.5 py-2 text-xs font-semibold transition hover:border-primary/40 hover:text-primary"
                  >
                    Next <ChevronRight className="size-4" />
                  </Link>
                ) : (
                  <span className="inline-flex items-center gap-1 rounded-xl border border-border/30 bg-card/20 px-3.5 py-2 text-xs font-semibold text-muted-foreground/40 cursor-not-allowed">
                    Next <ChevronRight className="size-4" />
                  </span>
                )}
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
