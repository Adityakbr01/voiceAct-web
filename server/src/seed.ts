import "dotenv/config";
import mongoose from "mongoose";
import { config } from "./config/index.js";
import Admin from "./modules/auth/admin.model.js";
import Service from "./modules/service/service.model.js";
import Project from "./modules/project/project.model.js";
import Contact from "./modules/contact/contact.model.js";

const services = [
  {
    title: "Web Development",
    slug: "web-development",
    description: "Custom web applications built with modern frameworks like React, Next.js, and Node.js.",
    icon: "🌐",
    active: true,
    order: 1,
  },
  {
    title: "Mobile Development",
    slug: "mobile-development",
    description: "Native iOS/Android apps and cross-platform solutions with React Native and Flutter.",
    icon: "📱",
    active: true,
    order: 2,
  },
  {
    title: "UI/UX Design",
    slug: "ui-ux-design",
    description: "User-centered design, prototyping, and design systems that convert visitors to customers.",
    icon: "🎨",
    active: true,
    order: 3,
  },
  {
    title: "Digital Marketing",
    slug: "digital-marketing",
    description: "SEO optimization, social media strategy, and content marketing to grow your audience.",
    icon: "📊",
    active: true,
    order: 4,
  },
  {
    title: "E-commerce Solutions",
    slug: "ecommerce-solutions",
    description: "Complete online stores with payment gateways, inventory management, and analytics.",
    icon: "🛒",
    active: true,
    order: 5,
  },
  {
    title: "Cloud Infrastructure",
    slug: "cloud-infrastructure",
    description: "Scalable AWS, Google Cloud, and Azure deployments with CI/CD and monitoring.",
    icon: "☁️",
    active: false, // Test inactive service
    order: 6,
  },
];

const projects = [
  {
    title: "TechFlow E-commerce Platform",
    slug: "techflow-ecommerce",
    description: "A complete e-commerce solution with advanced analytics, multi-vendor support, and real-time inventory management. Built with Next.js, Stripe payments, and AWS infrastructure.",
    client: "TechFlow Inc",
    services: ["web-development", "ui-ux-design", "ecommerce-solutions"],
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop",
    url: "https://demo.techflow-ecommerce.com",
    featured: true,
    order: 1,
  },
  {
    title: "FitLife Fitness Tracker",
    slug: "fitlife-fitness-tracker",
    description: "Cross-platform mobile app for fitness tracking with social features, workout plans, and nutrition logging. Used by over 50k active users.",
    client: "FitLife Wellness",
    services: ["mobile-development", "ui-ux-design"],
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop",
    url: "https://fitlife-app.com",
    featured: true,
    order: 2,
  },
  {
    title: "GreenSpace Property Portal",
    slug: "greenspace-property-portal",
    description: "Real estate platform connecting buyers, sellers, and agents with virtual tours, mortgage calculators, and market analytics.",
    client: "GreenSpace Realty",
    services: ["web-development", "ui-ux-design", "digital-marketing"],
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop",
    url: "https://greenspace-portal.com",
    featured: true,
    order: 3,
  },
  {
    title: "EduTech Learning Management System",
    slug: "edutech-lms",
    description: "Comprehensive LMS for online education with video streaming, progress tracking, quizzes, and certification management.",
    client: "EduTech Solutions",
    services: ["web-development", "mobile-development", "ui-ux-design"],
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=600&fit=crop",
    url: "https://edutech-lms.com",
    featured: false,
    order: 4,
  },
  {
    title: "RestoPOS Restaurant System",
    slug: "restopos-restaurant-system",
    description: "Point-of-sale system for restaurants with inventory management, staff scheduling, and customer loyalty programs.",
    client: "RestoPOS",
    services: ["web-development", "mobile-development", "ecommerce-solutions"],
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop",
    url: "https://restopos.com",
    featured: false,
    order: 5,
  },
  {
    title: "MedConnect Telemedicine Platform",
    slug: "medconnect-telemedicine",
    description: "HIPAA-compliant telemedicine platform enabling secure video consultations, prescription management, and patient records.",
    client: "MedConnect Health",
    services: ["web-development", "ui-ux-design", "cloud-infrastructure"],
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop",
    url: "https://medconnect.health",
    featured: true,
    order: 6,
  },
];

const sampleContacts = [
  {
    name: "Sarah Johnson",
    email: "sarah.johnson@techstartup.com",
    phone: "+1 (555) 123-4567",
    service: "web-development",
    message: "Hi! We're looking to build a SaaS platform for our B2B clients. We need a modern web app with user authentication, subscription management, and analytics dashboard. What would be your timeline and pricing for such a project?",
    status: "new",
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
  },
  {
    name: "Michael Chen",
    email: "m.chen@retailcorp.com",
    phone: "+1 (555) 987-6543",
    service: "ecommerce-solutions",
    message: "We want to modernize our e-commerce store. Currently on an old Magento setup but looking to migrate to something more performant. Need inventory sync, multiple payment options, and mobile optimization.",
    status: "read",
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
  },
  {
    name: "Emily Rodriguez",
    email: "emily@creativestudio.design",
    phone: "+1 (555) 456-7890",
    service: "ui-ux-design",
    message: "Love your portfolio! We have a fintech app that needs a complete UI overhaul. Looking for someone who understands both aesthetics and usability in financial products. Available for a call this week?",
    status: "replied",
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 1 week ago
  },
  {
    name: "David Park",
    email: "david@healthtechco.com",
    phone: "+1 (555) 321-9876",
    service: "mobile-development",
    message: "We need a healthcare mobile app developed for both iOS and Android. Features include appointment booking, medication reminders, and secure messaging with doctors. Looking for HIPAA compliance expertise.",
    status: "new",
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
  },
  {
    name: "Lisa Thompson",
    email: "lisa@localrestaurant.com",
    service: "digital-marketing",
    message: "Our restaurant needs help with online presence. We want to improve our Google rankings, set up social media marketing, and maybe create a loyalty program. What packages do you offer?",
    status: "read",
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
  },
  {
    name: "James Wilson",
    email: "james.wilson@nonprofitorg.org",
    phone: "+1 (555) 555-1234",
    service: "web-development",
    message: "Hi there! Our nonprofit needs a new website to better showcase our mission and make it easier for people to donate. We're working with a limited budget but want something professional and impactful.",
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
        email: "admin@voiceact.com",
        password: "admin123",
        name: "Admin User",
        role: "super_admin",
      });
      console.log("✅ Created admin: admin@voiceact.com / admin123");
    } else {
      console.log("ℹ️  Admin user already exists");
    }

    // Create services
    const serviceCount = await Service.countDocuments();
    if (!serviceCount) {
      await Service.insertMany(services);
      console.log(`✅ Created ${services.length} services (including 1 inactive for testing)`);
    } else {
      console.log("ℹ️  Services already exist");
    }

    // Create projects
    const projectCount = await Project.countDocuments();
    if (!projectCount) {
      await Project.insertMany(projects);
      console.log(`✅ Created ${projects.length} projects (${projects.filter(p => p.featured).length} featured)`);
    } else {
      console.log("ℹ️  Projects already exist");
    }

    // Create sample contacts
    const contactCount = await Contact.countDocuments();
    if (!contactCount) {
      await Contact.insertMany(sampleContacts);
      console.log(`✅ Created ${sampleContacts.length} sample contacts with different statuses`);
    } else {
      console.log("ℹ️  Contacts already exist");
    }

    console.log("\n🎉 Seed completed successfully!");
    console.log("📋 Test the following:");
    console.log("   • Admin login: http://localhost:3000/admin/login");
    console.log("   • Credentials: admin@voiceact.com / admin123");
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