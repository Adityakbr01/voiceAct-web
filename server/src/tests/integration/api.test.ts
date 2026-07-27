import { describe, test, expect, beforeAll, afterAll, beforeEach } from "bun:test";
import request from "supertest";
import app from "../../app.js";
import "../setup.js";
import { testUtils } from "../setup.js";

describe("API Integration Tests", () => {
  let authToken: string;

  beforeAll(async () => {
    // Create admin user and get auth token
    const admin = await testUtils.createTestAdmin();
    authToken = testUtils.createTestToken(admin._id.toString());
  });

  describe("Health Check", () => {
    test("GET /api/health should return 200", async () => {
      const response = await request(app).get("/api/health");

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe("OK");
    });
  });

  describe("Auth Endpoints", () => {
    test("POST /api/auth/login with valid credentials", async () => {
      const response = await request(app)
        .post("/api/auth/login")
        .send({
          email: "test@admin.com",
          password: "testpass123",
        });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.admin).toBeDefined();
      expect(response.body.data.admin.email).toBe("test@admin.com");
    });

    test("POST /api/auth/login with invalid credentials", async () => {
      const response = await request(app)
        .post("/api/auth/login")
        .send({
          email: "wrong@email.com",
          password: "wrongpassword",
        });

      expect(response.status).toBe(401);
      expect(response.body.success).toBe(false);
    });

    test("GET /api/auth/me with valid token", async () => {
      const response = await request(app)
        .get("/api/auth/me")
        .set("Authorization", `Bearer ${authToken}`);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.email).toBe("test@admin.com");
    });

    test("GET /api/auth/me without token", async () => {
      const response = await request(app).get("/api/auth/me");

      expect(response.status).toBe(401);
      expect(response.body.success).toBe(false);
    });
  });

  describe("Contact Endpoints", () => {
    test("POST /api/contact should create contact", async () => {
      const contactData = {
        name: "John Doe",
        email: "john@example.com",
        phone: "+1234567890",
        service: "web-development",
        message: "I need a website",
      };

      const response = await request(app)
        .post("/api/contact")
        .send(contactData);

      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.data.name).toBe("John Doe");
      expect(response.body.data.email).toBe("john@example.com");
    });

    test("POST /api/contact with invalid data", async () => {
      const response = await request(app)
        .post("/api/contact")
        .send({
          name: "",
          email: "invalid-email",
        });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });

    test("GET /api/contact requires auth", async () => {
      const response = await request(app).get("/api/contact");

      expect(response.status).toBe(401);
    });

    test("GET /api/contact with auth returns contacts", async () => {
      // Create test contact first
      await testUtils.createTestContact({ name: "Test Contact" });

      const response = await request(app)
        .get("/api/contact")
        .set("Authorization", `Bearer ${authToken}`);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toBeInstanceOf(Array);
      expect(response.body.meta).toBeDefined();
    });

    test("GET /api/contact/export returns CSV", async () => {
      await testUtils.createTestContact({ name: "Export Test" });

      const response = await request(app)
        .get("/api/contact/export")
        .set("Authorization", `Bearer ${authToken}`);

      expect(response.status).toBe(200);
      expect(response.headers["content-type"]).toContain("text/csv");
      expect(response.text).toContain("Export Test");
    });
  });

  describe("Services Endpoints", () => {
    beforeEach(async () => {
      await testUtils.createTestService({ 
        title: "Test Service", 
        slug: "test-service",
        active: true 
      });
      await testUtils.createTestService({ 
        title: "Inactive Service", 
        slug: "inactive-service",
        active: false 
      });
    });

    test("GET /api/services returns only active services", async () => {
      const response = await request(app).get("/api/services");

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toBeInstanceOf(Array);
      expect(response.body.data.every((s: any) => s.active)).toBe(true);
    });

    test("GET /api/services/admin/all requires auth", async () => {
      const response = await request(app).get("/api/services/admin/all");

      expect(response.status).toBe(401);
    });

    test("GET /api/services/admin/all returns all services with auth", async () => {
      const response = await request(app)
        .get("/api/services/admin/all")
        .set("Authorization", `Bearer ${authToken}`);

      expect(response.status).toBe(200);
      expect(response.body.data).toBeInstanceOf(Array);
      expect(response.body.data.some((s: any) => !s.active)).toBe(true);
    });

    test("GET /api/services/:slug returns service", async () => {
      const response = await request(app).get("/api/services/test-service");

      expect(response.status).toBe(200);
      expect(response.body.data.title).toBe("Test Service");
    });

    test("POST /api/services requires auth", async () => {
      const response = await request(app)
        .post("/api/services")
        .send({
          title: "New Service",
          slug: "new-service",
          description: "Test",
        });

      expect(response.status).toBe(401);
    });

    test("POST /api/services creates service with auth", async () => {
      const serviceData = {
        title: "New Service",
        slug: "new-service",
        description: "Test description",
      };

      const response = await request(app)
        .post("/api/services")
        .set("Authorization", `Bearer ${authToken}`)
        .send(serviceData);

      expect(response.status).toBe(201);
      expect(response.body.data.title).toBe("New Service");
    });
  });

  describe("Projects Endpoints", () => {
    beforeEach(async () => {
      await testUtils.createTestProject({ 
        title: "Test Project", 
        slug: "test-project",
        featured: true 
      });
      await testUtils.createTestProject({ 
        title: "Regular Project", 
        slug: "regular-project",
        featured: false 
      });
    });

    test("GET /api/projects returns all projects", async () => {
      const response = await request(app).get("/api/projects");

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toBeInstanceOf(Array);
      expect(response.body.data).toHaveLength(2);
    });

    test("GET /api/projects?featured=true filters featured", async () => {
      const response = await request(app).get("/api/projects?featured=true");

      expect(response.status).toBe(200);
      expect(response.body.data).toHaveLength(1);
      expect(response.body.data[0].title).toBe("Test Project");
    });

    test("GET /api/projects with pagination", async () => {
      const response = await request(app).get("/api/projects?page=1&limit=1");

      expect(response.status).toBe(200);
      expect(response.body.data).toHaveLength(1);
      expect(response.body.meta.total).toBe(2);
      expect(response.body.meta.pages).toBe(2);
    });

    test("GET /api/projects/:slug returns project", async () => {
      const response = await request(app).get("/api/projects/test-project");

      expect(response.status).toBe(200);
      expect(response.body.data.title).toBe("Test Project");
    });

    test("POST /api/projects requires auth", async () => {
      const response = await request(app)
        .post("/api/projects")
        .send({
          title: "New Project",
          slug: "new-project",
          description: "Test",
        });

      expect(response.status).toBe(401);
    });

    test("POST /api/projects creates project with auth", async () => {
      const projectData = {
        title: "New Project",
        slug: "new-project",
        description: "Test description",
      };

      const response = await request(app)
        .post("/api/projects")
        .set("Authorization", `Bearer ${authToken}`)
        .send(projectData);

      expect(response.status).toBe(201);
      expect(response.body.data.title).toBe("New Project");
    });
  });

  describe("Error Handling", () => {
    test("404 for unknown routes", async () => {
      const response = await request(app).get("/api/unknown-route");

      expect(response.status).toBe(404);
    });

    test("Validation errors return 400", async () => {
      const response = await request(app)
        .post("/api/contact")
        .send({
          name: "", // Empty name should fail validation
          email: "invalid-email",
        });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });

    test("Unauthorized requests return 401", async () => {
      const response = await request(app)
        .get("/api/contact")
        .set("Authorization", "Bearer invalid-token");

      expect(response.status).toBe(401);
    });
  });
});