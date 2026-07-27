import { describe, test, expect, beforeEach } from "bun:test";
import "../../setup.js";
import { testUtils } from "../../setup.js";
import * as serviceService from "../../../modules/service/service.service.js";

describe("Service Service", () => {
  describe("create", () => {
    test("should create a new service", async () => {
      const serviceData = {
        title: "New Service",
        slug: "new-service",
        description: "A new service description",
        icon: "🎨",
        active: true,
        order: 1,
      };

      const service = await serviceService.create(serviceData);

      expect(service).toBeDefined();
      expect(service.title).toBe("New Service");
      expect(service.slug).toBe("new-service");
      expect(service.active).toBe(true);
    });

    test("should create service with default values", async () => {
      const serviceData = {
        title: "Minimal Service",
        slug: "minimal-service",
        description: "Basic service",
      };

      const service = await serviceService.create(serviceData);

      expect(service).toBeDefined();
      expect(service.active).toBe(true); // Default value
      expect(service.order).toBe(0); // Default value
    });
  });

  describe("getAll", () => {
    beforeEach(async () => {
      await testUtils.createTestService({ title: "Service 1", active: true, order: 1 });
      await testUtils.createTestService({ title: "Service 2", active: true, order: 2 });
      await testUtils.createTestService({ title: "Inactive Service", active: false, order: 3 });
    });

    test("should get only active services", async () => {
      const services = await serviceService.getAll();

      expect(services).toHaveLength(2);
      expect(services.every(s => s.active)).toBe(true);
      expect(services[0].title).toBe("Service 1");
      expect(services[1].title).toBe("Service 2");
    });

    test("should order by order field", async () => {
      // Create services with different orders
      await testUtils.createTestService({ title: "Last", active: true, order: 10 });
      await testUtils.createTestService({ title: "First", active: true, order: 0 });

      const services = await serviceService.getAll();

      expect(services[0].title).toBe("First");
      expect(services[services.length - 1].title).toBe("Last");
    });
  });

  describe("getAllAdmin", () => {
    beforeEach(async () => {
      await testUtils.createTestService({ title: "Active Service", active: true });
      await testUtils.createTestService({ title: "Inactive Service", active: false });
    });

    test("should get all services including inactive", async () => {
      const services = await serviceService.getAllAdmin();

      expect(services).toHaveLength(2);
      expect(services.some(s => s.active)).toBe(true);
      expect(services.some(s => !s.active)).toBe(true);
    });

    test("should order by order field", async () => {
      await testUtils.createTestService({ title: "Third", order: 3 });
      await testUtils.createTestService({ title: "First", order: 1 });

      const services = await serviceService.getAllAdmin();

      expect(services[0].order).toBeLessThanOrEqual(services[1].order);
    });
  });

  describe("getBySlug", () => {
    test("should get service by slug", async () => {
      const created = await testUtils.createTestService({ 
        title: "Find Me", 
        slug: "find-me" 
      });
      
      const found = await serviceService.getBySlug("find-me");

      expect(found).toBeDefined();
      expect(found.title).toBe("Find Me");
      expect(found.slug).toBe("find-me");
    });

    test("should throw error for non-existent slug", async () => {
      expect(async () => {
        await serviceService.getBySlug("non-existent");
      }).toThrow("Service not found");
    });

    test("should find inactive services by slug", async () => {
      const created = await testUtils.createTestService({ 
        title: "Inactive Service", 
        slug: "inactive-service",
        active: false
      });
      
      const found = await serviceService.getBySlug("inactive-service");

      expect(found).toBeDefined();
      expect(found.active).toBe(false);
    });
  });

  describe("update", () => {
    test("should update service", async () => {
      const service = await testUtils.createTestService({ title: "Original Title" });
      
      const updated = await serviceService.update(service._id.toString(), {
        title: "Updated Title",
        description: "Updated description"
      });

      expect(updated.title).toBe("Updated Title");
      expect(updated.description).toBe("Updated description");
    });

    test("should throw error for non-existent service", async () => {
      const fakeId = "507f1f77bcf86cd799439011";
      
      expect(async () => {
        await serviceService.update(fakeId, { title: "New Title" });
      }).toThrow("Service not found");
    });

    test("should toggle active status", async () => {
      const service = await testUtils.createTestService({ active: true });
      
      const updated = await serviceService.update(service._id.toString(), {
        active: false
      });

      expect(updated.active).toBe(false);
    });
  });

  describe("reorder", () => {
    let service1: any, service2: any, service3: any;

    beforeEach(async () => {
      service1 = await testUtils.createTestService({ title: "Service 1", order: 1 });
      service2 = await testUtils.createTestService({ title: "Service 2", order: 2 });
      service3 = await testUtils.createTestService({ title: "Service 3", order: 3 });
    });

    test("should reorder services", async () => {
      const reorderItems = [
        { id: service3._id.toString(), order: 1 },
        { id: service1._id.toString(), order: 2 },
        { id: service2._id.toString(), order: 3 },
      ];

      await serviceService.reorder(reorderItems);

      const services = await serviceService.getAllAdmin();
      
      expect(services.find(s => s._id.toString() === service3._id.toString()).order).toBe(1);
      expect(services.find(s => s._id.toString() === service1._id.toString()).order).toBe(2);
      expect(services.find(s => s._id.toString() === service2._id.toString()).order).toBe(3);
    });

    test("should ignore invalid IDs in reorder", async () => {
      const reorderItems = [
        { id: service1._id.toString(), order: 1 },
        { id: "invalid-id", order: 2 },
        { id: service2._id.toString(), order: 3 },
      ];

      // Should not throw error
      await serviceService.reorder(reorderItems);

      const services = await serviceService.getAllAdmin();
      expect(services).toHaveLength(3); // All services still exist
    });
  });

  describe("remove", () => {
    test("should remove service", async () => {
      const service = await testUtils.createTestService();
      
      await serviceService.remove(service._id.toString());
      
      expect(async () => {
        await serviceService.getBySlug(service.slug);
      }).toThrow("Service not found");
    });

    test("should throw error for non-existent service", async () => {
      const fakeId = "507f1f77bcf86cd799439011";
      
      expect(async () => {
        await serviceService.remove(fakeId);
      }).toThrow("Service not found");
    });
  });
});