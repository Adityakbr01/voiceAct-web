import { describe, test, expect, beforeAll } from "bun:test";
import request from "supertest";
import express from "express";
import "../setup.js";
import { testUtils } from "../setup.js";
import { protect, requireRole } from "../../middleware/auth.js";
import { errorHandler } from "../../middleware/error.js";

describe("Auth Middleware", () => {
  let app: express.Application;
  let admin: any;
  let token: string;

  beforeAll(async () => {
    // Create test app
    app = express();
    app.use(express.json());

    // Create test admin and token
    admin = await testUtils.createTestAdmin();
    token = testUtils.createTestToken(admin._id.toString());

    // Test routes
    app.get("/protected", protect, (req, res) => {
      res.json({ success: true, admin: (req as any).admin });
    });

    app.get("/super-admin-only", protect, requireRole("super_admin"), (req, res) => {
      res.json({ success: true, message: "Super admin access granted" });
    });

    app.get("/editor-only", protect, requireRole("editor"), (req, res) => {
      res.json({ success: true, message: "Editor access granted" });
    });

    app.use(errorHandler);
  });

  describe("protect middleware", () => {
    test("should allow access with valid Bearer token", async () => {
      const response = await request(app)
        .get("/protected")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.admin).toBeDefined();
      expect(response.body.admin.email).toBe("test@admin.com");
    });

    test("should deny access without token", async () => {
      const response = await request(app).get("/protected");

      expect(response.status).toBe(401);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe("Not authenticated");
    });

    test("should deny access with invalid token", async () => {
      const response = await request(app)
        .get("/protected")
        .set("Authorization", "Bearer invalid-token");

      expect(response.status).toBe(401);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe("Invalid token");
    });

    test("should deny access with malformed Authorization header", async () => {
      const response = await request(app)
        .get("/protected")
        .set("Authorization", "InvalidFormat");

      expect(response.status).toBe(401);
      expect(response.body.success).toBe(false);
    });

    test("should work with cookie-based authentication", async () => {
      const response = await request(app)
        .get("/protected")
        .set("Cookie", `token=${token}`);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
    });
  });

  describe("requireRole middleware", () => {
    test("should allow super_admin access to super_admin route", async () => {
      const response = await request(app)
        .get("/super-admin-only")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
    });

    test("should deny super_admin access to editor-only route", async () => {
      const response = await request(app)
        .get("/editor-only")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(403);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe("Insufficient permissions");
    });

    test("should deny access without authentication", async () => {
      const response = await request(app).get("/super-admin-only");

      expect(response.status).toBe(401);
    });
  });

  describe("token expiration", () => {
    test("should deny access with expired token", async () => {
      const jwt = require("jsonwebtoken");
      const { config } = require("../../config/index.js");
      
      // Create expired token (expired 1 hour ago)
      const expiredToken = jwt.sign(
        { id: admin._id.toString() },
        config.jwtSecret,
        { expiresIn: "-1h" }
      );

      const response = await request(app)
        .get("/protected")
        .set("Authorization", `Bearer ${expiredToken}`);

      expect(response.status).toBe(401);
      expect(response.body.success).toBe(false);
    });
  });
});