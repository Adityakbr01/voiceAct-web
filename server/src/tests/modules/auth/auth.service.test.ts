import { describe, test, expect, beforeEach } from "bun:test";
import "../../setup.js";
import { testUtils } from "../../setup.js";
import * as authService from "../../../modules/auth/auth.service.js";

describe("Auth Service", () => {
  describe("login", () => {
    beforeEach(async () => {
      await testUtils.createTestAdmin();
    });

    test("should login with valid credentials", async () => {
      const result = await authService.login("test@admin.com", "testpass123");

      expect(result).toBeDefined();
      expect(result.admin).toBeDefined();
      expect(result.admin.email).toBe("test@admin.com");
      expect(result.token).toBeDefined();
      expect(typeof result.token).toBe("string");
    });

    test("should not return password in admin object", async () => {
      const result = await authService.login("test@admin.com", "testpass123");

      expect(result.admin.password).toBeUndefined();
    });

    test("should throw error for invalid email", async () => {
      expect(async () => {
        await authService.login("wrong@email.com", "testpass123");
      }).toThrow("Invalid email or password");
    });

    test("should throw error for invalid password", async () => {
      expect(async () => {
        await authService.login("test@admin.com", "wrongpassword");
      }).toThrow("Invalid email or password");
    });

    test("should throw error for empty credentials", async () => {
      expect(async () => {
        await authService.login("", "");
      }).toThrow("Invalid email or password");
    });

    test("should generate valid JWT token", async () => {
      const jwt = require("jsonwebtoken");
      const { config } = require("../../../config/index.js");
      
      const result = await authService.login("test@admin.com", "testpass123");
      const decoded = jwt.verify(result.token, config.jwtSecret);

      expect(decoded).toBeDefined();
      expect(decoded.id).toBeDefined();
      expect(typeof decoded.id).toBe("string");
    });
  });

  describe("getMe", () => {
    test("should get admin by ID", async () => {
      const admin = await testUtils.createTestAdmin();
      const result = await authService.getMe(admin._id.toString());

      expect(result).toBeDefined();
      expect(result.email).toBe("test@admin.com");
      expect(result.name).toBe("Test Admin");
      expect(result.password).toBeUndefined(); // Should not include password
    });

    test("should throw error for non-existent admin", async () => {
      const fakeId = "507f1f77bcf86cd799439011";
      
      expect(async () => {
        await authService.getMe(fakeId);
      }).toThrow("Admin not found");
    });

    test("should throw error for invalid ID format", async () => {
      expect(async () => {
        await authService.getMe("invalid-id");
      }).toThrow();
    });
  });

  describe("token validation", () => {
    test("should create token that can be verified", async () => {
      const jwt = require("jsonwebtoken");
      const { config } = require("../../../config/index.js");
      
      const admin = await testUtils.createTestAdmin();
      const result = await authService.login("test@admin.com", "testpass123");
      
      const decoded = jwt.verify(result.token, config.jwtSecret);
      expect(decoded.id).toBe(admin._id.toString());
    });

    test("should include expiration in token", async () => {
      const jwt = require("jsonwebtoken");
      const { config } = require("../../../config/index.js");
      
      const result = await authService.login("test@admin.com", "testpass123");
      const decoded = jwt.verify(result.token, config.jwtSecret);
      
      expect(decoded.exp).toBeDefined();
      expect(decoded.iat).toBeDefined();
      expect(decoded.exp > decoded.iat).toBe(true);
    });
  });
});