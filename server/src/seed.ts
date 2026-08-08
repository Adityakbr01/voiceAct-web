import dns from "node:dns";
import "dotenv/config";
import mongoose from "mongoose";

// Force public DNS servers to resolve MongoDB Atlas SRV records reliably
dns.setServers(["8.8.8.8", "1.1.1.1"]);
import { config } from "./config/index.js";
import Admin from "./modules/auth/admin.model.js";
import Service from "./modules/service/service.model.js";
import Project from "./modules/project/project.model.js";
import Contact from "./modules/contact/contact.model.js";
import Blog from "./modules/blog/blog.model.js";

const services = [
  {
    title: "Web Development",
    slug: "web-development",
    description:
      "Custom web applications built with modern frameworks like React, Next.js, and Node.js.",
    icon: "🌐",
    active: true,
    order: 1,
  },
  {
    title: "Mobile Development",
    slug: "mobile-development",
    description:
      "Native iOS/Android apps and cross-platform solutions with React Native and Flutter.",
    icon: "📱",
    active: true,
    order: 2,
  },
  {
    title: "UI/UX Design",
    slug: "ui-ux-design",
    description:
      "User-centered design, prototyping, and design systems that convert visitors to customers.",
    icon: "🎨",
    active: true,
    order: 3,
  },
  {
    title: "Digital Marketing",
    slug: "digital-marketing",
    description:
      "SEO optimization, social media strategy, and content marketing to grow your audience.",
    icon: "📊",
    active: true,
    order: 4,
  },
  {
    title: "E-commerce Solutions",
    slug: "ecommerce-solutions",
    description:
      "Complete online stores with payment gateways, inventory management, and analytics.",
    icon: "🛒",
    active: true,
    order: 5,
  },
  {
    title: "Cloud Infrastructure",
    slug: "cloud-infrastructure",
    description:
      "Scalable AWS, Google Cloud, and Azure deployments with CI/CD and monitoring.",
    icon: "☁️",
    active: false, // Test inactive service
    order: 6,
  },
];

const projects = [
  {
    title: "TechFlow E-commerce Platform",
    slug: "techflow-ecommerce",
    description:
      "A complete e-commerce solution with advanced analytics, multi-vendor support, and real-time inventory management. Built with Next.js, Stripe payments, and AWS infrastructure.",
    client: "TechFlow Inc",
    services: ["web-development", "ui-ux-design", "ecommerce-solutions"],
    image:
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop",
    url: "https://demo.techflow-ecommerce.com",
    featured: true,
    order: 1,
  },
  {
    title: "FitLife Fitness Tracker",
    slug: "fitlife-fitness-tracker",
    description:
      "Cross-platform mobile app for fitness tracking with social features, workout plans, and nutrition logging. Used by over 50k active users.",
    client: "FitLife Wellness",
    services: ["mobile-development", "ui-ux-design"],
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop",
    url: "https://fitlife-app.com",
    featured: true,
    order: 2,
  },
  {
    title: "GreenSpace Property Portal",
    slug: "greenspace-property-portal",
    description:
      "Real estate platform connecting buyers, sellers, and agents with virtual tours, mortgage calculators, and market analytics.",
    client: "GreenSpace Realty",
    services: ["web-development", "ui-ux-design", "digital-marketing"],
    image:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop",
    url: "https://greenspace-portal.com",
    featured: true,
    order: 3,
  },
  {
    title: "EduTech Learning Management System",
    slug: "edutech-lms",
    description:
      "Comprehensive LMS for online education with video streaming, progress tracking, quizzes, and certification management.",
    client: "EduTech Solutions",
    services: ["web-development", "mobile-development", "ui-ux-design"],
    image:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=600&fit=crop",
    url: "https://edutech-lms.com",
    featured: false,
    order: 4,
  },
  {
    title: "RestoPOS Restaurant System",
    slug: "restopos-restaurant-system",
    description:
      "Point-of-sale system for restaurants with inventory management, staff scheduling, and customer loyalty programs.",
    client: "RestoPOS",
    services: ["web-development", "mobile-development", "ecommerce-solutions"],
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop",
    url: "https://restopos.com",
    featured: false,
    order: 5,
  },
  {
    title: "MedConnect Telemedicine Platform",
    slug: "medconnect-telemedicine",
    description:
      "HIPAA-compliant telemedicine platform enabling secure video consultations, prescription management, and patient records.",
    client: "MedConnect Health",
    services: ["web-development", "ui-ux-design", "cloud-infrastructure"],
    image:
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop",
    url: "https://medconnect.health",
    featured: true,
    order: 6,
  },
];

const sampleBlogs = [
  {
    slug: "building-high-performance-nextjs-apps-in-2026",
    title: "Engineering Sub-Second Next.js 16 Web Applications at Scale",
    excerpt:
      "A deep dive into server components, dynamic bundle splitting, font preloading, and caching strategies that keep web apps blazing fast.",
    content: `Building production-grade web applications requires a disciplined approach to performance. In Next.js 16, leveraging server-side compilation, streaming React server components, and aggressive resource hints can dramatically reduce time-to-interactive (TTI) and First Contentful Paint (FCP).

### Key Performance Pillars

1. **Server Components by Default**: Move non-interactive components to the server to minimize client-side JavaScript payloads.
2. **Dynamic Imports & Code Splitting**: Defer heavy components (like 3D canvas objects, dynamic graphs, and modal dialogs) until they enter the viewport.
3. **Optimized Asset Pipeline**: Use WebP/AVIF formats, inline SVG icons where appropriate, and preconnect to external font providers.
4. **Resilient Data Fetching**: Wrap asynchronous data providers in granular try-catch handlers to guarantee graceful fallback UI.

### Results in Production

By combining Turbopack, route handler caching, and localized state isolation, applications experience over 300% faster initial loads and zero layout shifts (CLS < 0.01).`,
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
    active: true,
    order: 1,
  },
  {
    slug: "react-native-vs-native-swift-kotlin",
    title: "Cross-Platform vs. Native Mobile Development: How to Choose for Your MVP",
    excerpt:
      "Should you build separate iOS and Android apps or adopt React Native? Here is how startup teams ship 40% faster without compromising native quality.",
    content: `When launching a mobile product, speed-to-market and budget efficiency are paramount. Cross-platform frameworks like React Native and Expo have evolved to deliver native 60 FPS performance while sharing up to 90% of business logic across platforms.

### When React Native Wins

- **Shared Design System**: Single component library matching both iOS and Android.
- **Fast Iteration Cadence**: Over-the-air updates (OTA) allow hotfixes without waiting for App Store review queues.
- **Single Engineering Pod**: Unified engineering team delivering both platforms in sync.

### When Native Modules Are Required

For complex hardware integrations, custom Bluetooth LE protocols, or intensive real-time video manipulation, writing dedicated Swift/Kotlin modules within a React Native app gives you the best of both worlds.`,
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
    active: true,
    order: 2,
  },
  {
    slug: "integrating-ai-llm-workflows-in-b2b-saas",
    title: "Architecting Practical AI & LLM Workflows into Existing SaaS Products",
    excerpt:
      "How to embed semantic search, automated document processing, and AI assistants into production software without incurring run-away API costs.",
    content: `Artificial intelligence is no longer just a gimmick — it is becoming a core feature of modern B2B SaaS software. Integrating LLMs, vector search databases, and automated agentic loops requires clear guardrails around latency, accuracy, and cost management.

### Architecture Patterns for Production AI

- **Retrieval-Augmented Generation (RAG)**: Index company docs using embedding models to provide accurate, hallucination-free answers.
- **Background Queue Processing**: Run heavy AI data transformations asynchronously off the main request thread.
- **Fallback & Token Caching**: Cache common AI responses and validate output schemas using Zod before rendering to users.`,
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
      "https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=1200&q=80",
    featured: false,
    tags: ["AI", "LLM", "OpenAI", "SaaS"],
    active: true,
    order: 3,
  },
  {
    slug: "design-systems-that-scale-from-figma-to-code",
    title: "Building Pixel-Perfect Design Systems: From Figma Tokens to React Components",
    excerpt:
      "Stop losing fidelity in developer handoff. Learn how to align design tokens, typography scales, and accessibility specs between design and code.",
    content: `A design system is not just a Figma UI kit — it is a living contract between product design and engineering. Aligning design tokens for colors, spacing, and typography ensures consistent user experiences across web and mobile surfaces.

### Essential Rules for Design Systems

1. **Tokenize Everything**: Define semantic color scales (\`bg-card\`, \`text-muted\`, \`border-border\`) rather than hardcoding hex values.
2. **Component Isolation**: Build components with single responsibilities and standard prop interfaces.
3. **Accessibility First**: Test contrast ratios, focus states, and keyboard navigation upfront.`,
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
    active: true,
    order: 4,
  },
];

const sampleContacts = [
  {
    name: "Sarah Johnson",
    email: "sarah.johnson@techstartup.com",
    phone: "+1 (555) 123-4567",
    service: "web-development",
    message:
      "Hi! We're looking to build a SaaS platform for our B2B clients. We need a modern web app with user authentication, subscription management, and analytics dashboard. What would be your timeline and pricing for such a project?",
    status: "new",
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
  },
  {
    name: "Michael Chen",
    email: "m.chen@retailcorp.com",
    phone: "+1 (555) 987-6543",
    service: "ecommerce-solutions",
    message:
      "We want to modernize our e-commerce store. Currently on an old Magento setup but looking to migrate to something more performant. Need inventory sync, multiple payment options, and mobile optimization.",
    status: "read",
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
  },
  {
    name: "Emily Rodriguez",
    email: "emily@creativestudio.design",
    phone: "+1 (555) 456-7890",
    service: "ui-ux-design",
    message:
      "Love your portfolio! We have a fintech app that needs a complete UI overhaul. Looking for someone who understands both aesthetics and usability in financial products. Available for a call this week?",
    status: "replied",
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 1 week ago
  },
  {
    name: "David Park",
    email: "david@healthtechco.com",
    phone: "+1 (555) 321-9876",
    service: "mobile-development",
    message:
      "We need a healthcare mobile app developed for both iOS and Android. Features include appointment booking, medication reminders, and secure messaging with doctors. Looking for HIPAA compliance expertise.",
    status: "new",
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
  },
  {
    name: "Lisa Thompson",
    email: "lisa@localrestaurant.com",
    service: "digital-marketing",
    message:
      "Our restaurant needs help with online presence. We want to improve our Google rankings, set up social media marketing, and maybe create a loyalty program. What packages do you offer?",
    status: "read",
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
  },
  {
    name: "James Wilson",
    email: "james.wilson@nonprofitorg.org",
    phone: "+1 (555) 555-1234",
    service: "web-development",
    message:
      "Hi there! Our nonprofit needs a new website to better showcase our mission and make it easier for people to donate. We're working with a limited budget but want something professional and impactful.",
    status: "new",
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
  },
];

async function seed() {
  try {
    await mongoose.connect(config.mongoUri);
    console.log("✅ Connected to MongoDB");

    // Create admin user
    const adminExists = await Admin.countDocuments();
    if (!adminExists) {
      await Admin.create({
        email: "admin@voiceact.tech",
        password: "admin123",
        name: "Admin User",
        role: "super_admin",
      });
      console.log("✅ Created admin: admin@voiceact.tech / admin123");
    } else {
      console.log("ℹ️  Admin user already exists");
    }

    // Create services
    const serviceCount = await Service.countDocuments();
    if (!serviceCount) {
      await Service.insertMany(services);
      console.log(
        `✅ Created ${services.length} services (including 1 inactive for testing)`,
      );
    } else {
      console.log("ℹ️  Services already exist");
    }

    // Create projects
    const projectCount = await Project.countDocuments();
    if (!projectCount) {
      await Project.insertMany(projects);
      console.log(
        `✅ Created ${projects.length} projects (${projects.filter((p) => p.featured).length} featured)`,
      );
    } else {
      console.log("ℹ️  Projects already exist");
    }

    // Create blogs
    const blogCount = await Blog.countDocuments();
    if (!blogCount) {
      await Blog.insertMany(sampleBlogs);
      console.log(
        `✅ Created ${sampleBlogs.length} blogs (${sampleBlogs.filter((b) => b.featured).length} featured)`,
      );
    } else {
      console.log("ℹ️  Blogs already exist");
    }

    // Create sample contacts
    const contactCount = await Contact.countDocuments();
    if (!contactCount) {
      await Contact.insertMany(sampleContacts);
      console.log(
        `✅ Created ${sampleContacts.length} sample contacts with different statuses`,
      );
    } else {
      console.log("ℹ️  Contacts already exist");
    }

    console.log("\n🎉 Seed completed successfully!");
    console.log("📋 Test the following:");
    console.log("   • Admin login: http://localhost:3000/admin/login");
    console.log("   • Credentials: admin@voiceact.tech / admin123");
    console.log("   • Public site: http://localhost:3000");
    console.log("   • API health: http://localhost:5000/api/health");
  } catch (error) {
    console.error("❌ Seed failed:", error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log("🔌 Disconnected from MongoDB");
    process.exit(0);
  }
}

seed();
