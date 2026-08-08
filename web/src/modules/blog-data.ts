export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: "Engineering" | "Mobile" | "Design" | "AI & Automation" | "SaaS";
  readTime: string;
  publishedAt: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  coverImage: string;
  featured?: boolean;
  tags: string[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: "building-high-performance-nextjs-apps-in-2026",
    title: "Engineering Sub-Second Next.js 16 Web Applications at Scale",
    excerpt:
      "A deep dive into server components, dynamic bundle splitting, font preloading, and caching strategies that keep web apps blazing fast.",
    content: `
Building production-grade web applications requires a disciplined approach to performance. In Next.js 16, leveraging server-side compilation, streaming React server components, and aggressive resource hints can dramatically reduce time-to-interactive (TTI) and First Contentful Paint (FCP).

### Key Performance Pillars

1. **Server Components by Default**: Move non-interactive components to the server to minimize client-side JavaScript payloads.
2. **Dynamic Imports & Code Splitting**: Defer heavy components (like 3D canvas objects, dynamic graphs, and modal dialogs) until they enter the viewport.
3. **Optimized Asset Pipeline**: Use WebP/AVIF formats, inline SVG icons where appropriate, and preconnect to external font providers.
4. **Resilient Data Fetching**: Wrap asynchronous data providers in granular try-catch handlers to guarantee graceful fallback UI.

### Results in Production

By combining Turbopack, route handler caching, and localized state isolation, applications experience over 300% faster initial loads and zero layout shifts (CLS < 0.01).
`,
    category: "Engineering",
    readTime: "5 min read",
    publishedAt: "August 1, 2026",
    author: {
      name: "Aditya Kumar",
      role: "Lead Systems Architect",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    },
    coverImage:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
    featured: true,
    tags: ["Next.js", "React", "Performance", "WebDev"],
  },
  {
    slug: "react-native-vs-native-swift-kotlin",
    title: "Cross-Platform vs. Native Mobile Development: How to Choose for Your MVP",
    excerpt:
      "Should you build separate iOS and Android apps or adopt React Native? Here is how startup teams ship 40% faster without compromising native quality.",
    content: `
When launching a mobile product, speed-to-market and budget efficiency are paramount. Cross-platform frameworks like React Native and Expo have evolved to deliver native 60 FPS performance while sharing up to 90% of business logic across platforms.

### When React Native Wins

- **Shared Design System**: Single component library matching both iOS and Android.
- **Fast Iteration Cadence**: Over-the-air updates (OTA) allow hotfixes without waiting for App Store review queues.
- **Single Engineering Pod**: Unified engineering team delivering both platforms in sync.

### When Native Modules Are Required

For complex hardware integrations, custom Bluetooth LE protocols, or intensive real-time video manipulation, writing dedicated Swift/Kotlin modules within a React Native app gives you the best of both worlds.
`,
    category: "Mobile",
    readTime: "7 min read",
    publishedAt: "July 26, 2026",
    author: {
      name: "Sarah Chen",
      role: "Senior Mobile Engineer",
      avatar:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80",
    },
    coverImage:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=80",
    featured: false,
    tags: ["React Native", "iOS", "Android", "Mobile"],
  },
  {
    slug: "integrating-ai-llm-workflows-in-b2b-saas",
    title: "Architecting Practical AI & LLM Workflows into Existing SaaS Products",
    excerpt:
      "How to embed semantic search, automated document processing, and AI assistants into production software without incurring run-away API costs.",
    content: `
Artificial intelligence is no longer just a gimmick — it is becoming a core feature of modern B2B SaaS software. Integrating LLMs, vector search databases, and automated agentic loops requires clear guardrails around latency, accuracy, and cost management.

### Architecture Patterns for Production AI

- **Retrieval-Augmented Generation (RAG)**: Index company docs using embedding models to provide accurate, hallucination-free answers.
- **Background Queue Processing**: Run heavy AI data transformations asynchronously off the main request thread.
- **Fallback & Token Caching**: Cache common AI responses and validate output schemas using Zod before rendering to users.
`,
    category: "AI & Automation",
    readTime: "6 min read",
    publishedAt: "July 18, 2026",
    author: {
      name: "Marcus Vance",
      role: "AI & Cloud Specialist",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    },
    coverImage:
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1200&q=80",
    featured: false,
    tags: ["AI", "LLM", "OpenAI", "SaaS"],
  },
  {
    slug: "design-systems-that-scale-from-figma-to-code",
    title: "Building Pixel-Perfect Design Systems: From Figma Tokens to React Components",
    excerpt:
      "Stop losing fidelity in developer handoff. Learn how to align design tokens, typography scales, and accessibility specs between design and code.",
    content: `
A design system is not just a Figma UI kit — it is a living contract between product design and engineering. Aligning design tokens for colors, spacing, and typography ensures consistent user experiences across web and mobile surfaces.

### Essential Rules for Design Systems

1. **Tokenize Everything**: Define semantic color scales (\`bg-card\`, \`text-muted\`, \`border-border\`) rather than hardcoding hex values.
2. **Component Isolation**: Build components with single responsibilities and standard prop interfaces.
3. **Accessibility First**: Test contrast ratios, focus states, and keyboard navigation upfront.
`,
    category: "Design",
    readTime: "4 min read",
    publishedAt: "July 10, 2026",
    author: {
      name: "Elena Rostova",
      role: "Head of Product Design",
      avatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
    },
    coverImage:
      "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=1200&q=80",
    featured: false,
    tags: ["UI/UX", "Design Systems", "Figma", "Frontend"],
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}
