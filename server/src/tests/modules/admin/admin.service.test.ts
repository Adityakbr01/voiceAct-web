import { describe, test, expect, beforeEach } from "bun:test";
import "../../setup.js";
import { testUtils } from "../../setup.js";
import * as adminService from "../../../modules/admin/admin.service.js";

describe("Admin Service", () => {
  describe("getDashboardStats", () => {
    beforeEach(async () => {
      // Create test data for dashboard stats
      await testUtils.createTestContact({ status: "new" });
      await testUtils.createTestContact({ status: "read" });
      await testUtils.createTestContact({ status: "replied" });
      
      await testUtils.createTestService({ active: true });
      await testUtils.createTestService({ active: false });
      
      await testUtils.createTestProject({ featured: true });
      await testUtils.createTestProject({ featured: false });
    });

    test("should get dashboard statistics", async () => {
      const stats = await adminService.getDashboardStats();

      expect(stats).toBeDefined();
      expect(stats.contacts).toBeDefined();
      expect(stats.services).toBeDefined();
      expect(stats.projects).toBeDefined();
    });

    test("should count contacts by status", async () => {
      const stats = await adminService.getDashboardStats();

      expect(stats.contacts.total).toBe(3);
      expect(stats.contacts.new).toBe(1);
      expect(stats.contacts.read).toBe(1);
      expect(stats.contacts.replied).toBe(1);
    });

    test("should count services and projects", async () => {
      const stats = await adminService.getDashboardStats();

      expect(stats.services.total).toBe(2);
      expect(stats.services.active).toBe(1);
      expect(stats.projects.total).toBe(2);
      expect(stats.projects.featured).toBe(1);
    });

    test("should include recent contacts", async () => {
      const stats = await adminService.getDashboardStats();

      expect(stats.recentContacts).toBeInstanceOf(Array);
      expect(stats.recentContacts).toHaveLength(3);
    });

    test("should include analytics data", async () => {
      const stats = await adminService.getDashboardStats();

      expect(stats.analytics).toBeDefined();
      // Analytics might be empty for new setup, just check structure
      expect(stats.analytics.stats).toBeDefined();
      expect(stats.analytics.sources).toBeInstanceOf(Array);
    });

    test("should filter stats by period", async () => {
      const stats24h = await adminService.getDashboardStats("24h");
      const stats7d = await adminService.getDashboardStats("7d");
      const stats30d = await adminService.getDashboardStats("30d");

      expect(stats24h).toBeDefined();
      expect(stats7d).toBeDefined();
      expect(stats30d).toBeDefined();
      
      // All should have same structure
      expect(stats24h.contacts).toBeDefined();
      expect(stats7d.contacts).toBeDefined();
      expect(stats30d.contacts).toBeDefined();
    });

    test("should handle empty data gracefully", async () => {
      // Clear all test data
      const Contact = (await import("../../../modules/contact/contact.model.js")).default;
      const Service = (await import("../../../modules/service/service.model.js")).default;
      const Project = (await import("../../../modules/project/project.model.js")).default;
      
      await Contact.deleteMany({});
      await Service.deleteMany({});
      await Project.deleteMany({});

      const stats = await adminService.getDashboardStats();

      expect(stats.contacts.total).toBe(0);
      expect(stats.services.total).toBe(0);
      expect(stats.projects.total).toBe(0);
      expect(stats.recentContacts).toHaveLength(0);
    });
  });
});