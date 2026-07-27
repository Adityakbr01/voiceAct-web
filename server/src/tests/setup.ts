import { beforeAll, afterAll, beforeEach } from "bun:test";
import mongoose from "mongoose";

// Test database configuration
const TEST_DB_URI = process.env.TEST_MONGODB_URI || "mongodb://localhost:27017/voiceact-test";

beforeAll(async () => {
  // Connect to test database
  await mongoose.connect(TEST_DB_URI);
});

beforeEach(async () => {
  // Clean database before each test
  const collections = await mongoose.connection.db.collections();
  for (const collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  // Clean up and close connection
  await mongoose.connection.dropDatabase();
  await mongoose.disconnect();
});

// Test utilities
export const testUtils = {
  /**
   * Create a test admin user
   */
  async createTestAdmin() {
    const Admin = (await import("../modules/auth/admin.model.js")).default;
    return Admin.create({
      email: "test@admin.com",
      password: "testpass123",
      name: "Test Admin",
      role: "super_admin",
    });
  },

  /**
   * Create test JWT token for admin
   */
  createTestToken(adminId: string) {
    const jwt = require("jsonwebtoken");
    const { config } = require("../config/index.js");
    return jwt.sign({ id: adminId }, config.jwtSecret, { expiresIn: "1h" });
  },

  /**
   * Create test contact
   */
  async createTestContact(data: any = {}) {
    const Contact = (await import("../modules/contact/contact.model.js")).default;
    return Contact.create({
      name: "Test User",
      email: `test-${Date.now()}@example.com`, // Unique email
      message: "Test message",
      status: "new",
      ...data,
    });
  },

  /**
   * Create test service
   */
  async createTestService(data: any = {}) {
    const Service = (await import("../modules/service/service.model.js")).default;
    return Service.create({
      title: "Test Service",
      slug: `test-service-${Date.now()}`, // Unique slug
      description: "Test description",
      active: true,
      order: 1,
      ...data,
    });
  },

  /**
   * Create test project
   */
  async createTestProject(data: any = {}) {
    const Project = (await import("../modules/project/project.model.js")).default;
    return Project.create({
      title: "Test Project",
      slug: `test-project-${Date.now()}`, // Unique slug
      description: "Test description",
      client: "Test Client",
      services: ["test-service"],
      featured: false,
      order: 1,
      ...data,
    });
  },
};