import { describe, test, expect, beforeEach } from "bun:test";
import "../../setup.js";
import { testUtils } from "../../setup.js";
import * as projectService from "../../../modules/project/project.service.js";

describe("Project Service", () => {
  describe("create", () => {
    test("should create a new project", async () => {
      const projectData = {
        title: "New Project",
        slug: "new-project",
        description: "A new project description",
        client: "Test Client",
        services: ["web-development"],
        featured: true,
      };

      const project = await projectService.create(projectData);

      expect(project).toBeDefined();
      expect(project.title).toBe("New Project");
      expect(project.slug).toBe("new-project");
      expect(project.featured).toBe(true);
    });

    test("should create project with optional fields", async () => {
      const projectData = {
        title: "Minimal Project",
        slug: "minimal-project",
        description: "Basic project",
      };

      const project = await projectService.create(projectData);

      expect(project).toBeDefined();
      expect(project.title).toBe("Minimal Project");
      expect(project.client).toBeUndefined();
      expect(project.featured).toBe(false); // Default value
    });
  });

  describe("getAll", () => {
    beforeEach(async () => {
      await testUtils.createTestProject({ title: "Project 1", order: 1 });
      await testUtils.createTestProject({ title: "Project 2", order: 2 });
      await testUtils.createTestProject({ title: "Project 3", order: 3 });
    });

    test("should get all projects ordered by order field", async () => {
      const projects = await projectService.getAll();

      expect(projects).toHaveLength(3);
      expect(projects[0].title).toBe("Project 1");
      expect(projects[1].title).toBe("Project 2");
      expect(projects[2].title).toBe("Project 3");
    });

    test("should handle empty projects collection", async () => {
      // Clear all projects
      const Project = (await import("../../../modules/project/project.model.js")).default;
      await Project.deleteMany({});

      const projects = await projectService.getAll();
      expect(projects).toHaveLength(0);
    });
  });

  describe("getBySlug", () => {
    test("should get project by slug", async () => {
      const created = await testUtils.createTestProject({ 
        title: "Find Me", 
        slug: "find-me" 
      });
      
      const found = await projectService.getBySlug("find-me");

      expect(found).toBeDefined();
      expect(found.title).toBe("Find Me");
      expect(found.slug).toBe("find-me");
    });

    test("should throw error for non-existent slug", async () => {
      expect(async () => {
        await projectService.getBySlug("non-existent");
      }).toThrow("Project not found");
    });
  });

  describe("listPaginated", () => {
    beforeEach(async () => {
      await testUtils.createTestProject({ title: "Featured 1", featured: true, order: 1 });
      await testUtils.createTestProject({ title: "Featured 2", featured: true, order: 2 });
      await testUtils.createTestProject({ title: "Regular 1", featured: false, order: 3 });
      await testUtils.createTestProject({ title: "Regular 2", featured: false, order: 4 });
      await testUtils.createTestProject({ title: "Regular 3", featured: false, order: 5 });
    });

    test("should paginate all projects", async () => {
      const result = await projectService.listPaginated({ page: 1, limit: 3 });

      expect(result.data).toHaveLength(3);
      expect(result.total).toBe(5);
      expect(result.page).toBe(1);
      expect(result.limit).toBe(3);
      expect(result.pages).toBe(2);
    });

    test("should filter by featured", async () => {
      const featured = await projectService.listPaginated({ 
        featured: true, 
        page: 1, 
        limit: 10 
      });

      expect(featured.data).toHaveLength(2);
      expect(featured.total).toBe(2);
      expect(featured.data.every(p => p.featured)).toBe(true);
    });

    test("should filter by non-featured", async () => {
      const nonFeatured = await projectService.listPaginated({ 
        featured: false, 
        page: 1, 
        limit: 10 
      });

      expect(nonFeatured.data).toHaveLength(3);
      expect(nonFeatured.total).toBe(3);
      expect(nonFeatured.data.every(p => !p.featured)).toBe(true);
    });

    test("should handle second page", async () => {
      const page2 = await projectService.listPaginated({ page: 2, limit: 3 });

      expect(page2.data).toHaveLength(2); // Remaining 2 items
      expect(page2.total).toBe(5);
      expect(page2.page).toBe(2);
      expect(page2.pages).toBe(2);
    });
  });

  describe("update", () => {
    test("should update project", async () => {
      const project = await testUtils.createTestProject({ title: "Original Title" });
      
      const updated = await projectService.update(project._id.toString(), {
        title: "Updated Title",
        description: "Updated description"
      });

      expect(updated.title).toBe("Updated Title");
      expect(updated.description).toBe("Updated description");
    });

    test("should throw error for non-existent project", async () => {
      const fakeId = "507f1f77bcf86cd799439011";
      
      expect(async () => {
        await projectService.update(fakeId, { title: "New Title" });
      }).toThrow("Project not found");
    });

    test("should update only provided fields", async () => {
      const project = await testUtils.createTestProject({ 
        title: "Original",
        description: "Original description"
      });
      
      const updated = await projectService.update(project._id.toString(), {
        title: "Updated Title"
      });

      expect(updated.title).toBe("Updated Title");
      expect(updated.description).toBe("Original description"); // Unchanged
    });
  });

  describe("remove", () => {
    test("should remove project", async () => {
      const project = await testUtils.createTestProject();
      
      await projectService.remove(project._id.toString());
      
      expect(async () => {
        await projectService.getBySlug(project.slug);
      }).toThrow("Project not found");
    });

    test("should throw error for non-existent project", async () => {
      const fakeId = "507f1f77bcf86cd799439011";
      
      expect(async () => {
        await projectService.remove(fakeId);
      }).toThrow("Project not found");
    });
  });
});