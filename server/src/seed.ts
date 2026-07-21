import "dotenv/config";
import mongoose from "mongoose";
import { config } from "./config/index.js";
import Admin from "./modules/auth/admin.model.js";
import Service from "./modules/service/service.model.js";
import Project from "./modules/project/project.model.js";

const services = [
  { title: "Web Development", slug: "web-development", description: "Custom web applications built with modern frameworks.", order: 1 },
  { title: "Mobile Development", slug: "mobile-development", description: "Native and cross-platform mobile apps.", order: 2 },
  { title: "UI/UX Design", slug: "ui-ux-design", description: "User-centered design and prototyping.", order: 3 },
  { title: "Digital Marketing", slug: "digital-marketing", description: "SEO, social media, and content strategy.", order: 4 },
];

const projects = [
  { title: "E-commerce Platform", slug: "ecommerce-platform", description: "Full-stack e-commerce with payment integration.", client: "Acme Corp", services: ["web-development", "ui-ux-design"], featured: true, order: 1 },
  { title: "Fitness Tracker App", slug: "fitness-tracker-app", description: "Cross-platform mobile app for fitness tracking.", client: "FitLife", services: ["mobile-development", "ui-ux-design"], featured: true, order: 2 },
];

async function seed() {
  await mongoose.connect(config.mongoUri);
  console.log("Connected to MongoDB");

  const adminExists = await Admin.countDocuments();
  if (!adminExists) {
    await Admin.create({ email: "admin@voiceact.com", password: "admin123", name: "Admin" });
    console.log("Created admin: admin@voiceact.com / admin123");
  }

  const serviceCount = await Service.countDocuments();
  if (!serviceCount) {
    await Service.insertMany(services);
    console.log(`Created ${services.length} services`);
  }

  const projectCount = await Project.countDocuments();
  if (!projectCount) {
    await Project.insertMany(projects);
    console.log(`Created ${projects.length} projects`);
  }

  await mongoose.disconnect();
  console.log("Done");
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
