import { describe, test, expect, beforeAll } from "bun:test";
import request from "supertest";
import express from "express";
import { z } from "zod";
import "../setup.js";
import { validate } from "../../utils/validate.js";
import { errorHandler } from "../../middleware/error.js";

describe("Validation Middleware", () => {
  let app: express.Application;

  beforeAll(() => {
    // Create test app
    app = express();
    app.use(express.json());

    // Test schemas
    const contactSchema = z.object({
      name: z.string().min(1, "Name is required"),
      email: z.string().email("Invalid email format"),
      phone: z.string().optional(),
      message: z.string().min(1, "Message is required"),
    });

    const serviceSchema = z.object({
      title: z.string().min(1, "Title is required"),
      slug: z.string().min(1, "Slug is required"),
      description: z.string().min(1, "Description is required"),
      active: z.boolean().default(true),
      order: z.number().int().min(0).default(0),
    });

    // Test routes with validation
    app.post("/contact", validate(contactSchema), (req, res) => {
      res.json({ success: true, data: req.body });
    });

    app.post("/service", validate(serviceSchema), (req, res) => {
      res.json({ success: true, data: req.body });
    });

    // Partial validation test
    app.put("/service/:id", validate(serviceSchema.partial()), (req, res) => {
      res.json({ success: true, data: req.body });
    });

    app.use(errorHandler);
  });

  describe("contact validation", () => {
    test("should accept valid contact data", async () => {
      const validContact = {
        name: "John Doe",
        email: "john@example.com",
        phone: "+1234567890",
        message: "Hello, I need help with my website.",
      };

      const response = await request(app)
        .post("/contact")
        .send(validContact);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toEqual(validContact);
    });

    test("should reject contact with missing required fields", async () => {
      const invalidContact = {
        name: "",
        email: "invalid-email",
      };

      const response = await request(app)
        .post("/contact")
        .send(invalidContact);

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe("Validation failed");
      expect(response.body.errors).toBeInstanceOf(Array);
      expect(response.body.errors.length).toBeGreaterThan(0);
    });

    test("should reject contact with invalid email", async () => {
      const invalidContact = {
        name: "John Doe",
        email: "not-an-email",
        message: "Test message",
      };

      const response = await request(app)
        .post("/contact")
        .send(invalidContact);

      expect(response.status).toBe(400);
      expect(response.body.errors.some((e: any) => e.path === "email")).toBe(true);
    });

    test("should accept contact without optional phone", async () => {
      const validContact = {
        name: "Jane Doe", 
        email: "jane@example.com",
        message: "Test message without phone",
      };

      const response = await request(app)
        .post("/contact")
        .send(validContact);

      expect(response.status).toBe(200);
      expect(response.body.data.phone).toBeUndefined();
    });
  });

  describe("service validation", () => {
    test("should accept valid service data", async () => {
      const validService = {
        title: "Web Development",
        slug: "web-development",
        description: "Custom web applications",
        active: true,
        order: 1,
      };

      const response = await request(app)
        .post("/service")
        .send(validService);

      expect(response.status).toBe(200);
      expect(response.body.data).toEqual(validService);
    });

    test("should apply default values", async () => {
      const minimalService = {
        title: "Minimal Service",
        slug: "minimal-service", 
        description: "Basic service",
      };

      const response = await request(app)
        .post("/service")
        .send(minimalService);

      expect(response.status).toBe(200);
      expect(response.body.data.active).toBe(true); // Default value
      expect(response.body.data.order).toBe(0); // Default value
    });

    test("should reject service with missing required fields", async () => {
      const invalidService = {
        title: "",
        slug: "",
      };

      const response = await request(app)
        .post("/service")
        .send(invalidService);

      expect(response.status).toBe(400);
      expect(response.body.errors.length).toBeGreaterThan(0);
    });

    test("should reject service with invalid types", async () => {
      const invalidService = {
        title: "Valid Title",
        slug: "valid-slug",
        description: "Valid description",
        active: "not-a-boolean",
        order: "not-a-number",
      };

      const response = await request(app)
        .post("/service")
        .send(invalidService);

      expect(response.status).toBe(400);
      expect(response.body.errors.some((e: any) => e.path === "active")).toBe(true);
      expect(response.body.errors.some((e: any) => e.path === "order")).toBe(true);
    });
  });

  describe("partial validation", () => {
    test("should allow partial updates", async () => {
      const partialUpdate = {
        title: "Updated Title",
      };

      const response = await request(app)
        .put("/service/123")
        .send(partialUpdate);

      expect(response.status).toBe(200);
      expect(response.body.data.title).toBe("Updated Title");
    });

    test("should still validate provided fields", async () => {
      const invalidPartialUpdate = {
        title: "", // Invalid: empty string
        order: "invalid-number", // Invalid: not a number
      };

      const response = await request(app)
        .put("/service/123")
        .send(invalidPartialUpdate);

      expect(response.status).toBe(400);
      expect(response.body.errors.length).toBeGreaterThan(0);
    });
  });

  describe("error format", () => {
    test("should return structured error response", async () => {
      const response = await request(app)
        .post("/contact")
        .send({});

      expect(response.status).toBe(400);
      expect(response.body).toMatchObject({
        success: false,
        message: "Validation failed",
        errors: expect.arrayContaining([
          expect.objectContaining({
            path: expect.any(String),
            message: expect.any(String),
          }),
        ]),
      });
    });

    test("should include field path in error", async () => {
      const response = await request(app)
        .post("/contact")
        .send({ email: "invalid" });

      const emailError = response.body.errors.find((e: any) => e.path === "email");
      expect(emailError).toBeDefined();
      expect(emailError.message).toContain("email");
    });
  });
});