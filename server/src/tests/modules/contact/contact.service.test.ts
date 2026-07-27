import { describe, test, expect, beforeEach } from "bun:test";
import "../../setup.js";
import { testUtils } from "../../setup.js";
import * as contactService from "../../../modules/contact/contact.service.js";

describe("Contact Service", () => {
  describe("submitContact", () => {
    test("should create a new contact", async () => {
      const contactData = {
        name: "John Doe",
        email: "john@example.com",
        phone: "+1234567890",
        service: "web-development",
        message: "I need a website",
      };

      const contact = await contactService.submitContact(contactData);

      expect(contact).toBeDefined();
      expect(contact.name).toBe("John Doe");
      expect(contact.email).toBe("john@example.com");
      expect(contact.status).toBe("new");
    });

    test("should create contact without optional fields", async () => {
      const contactData = {
        name: "Jane Smith",
        email: "jane@example.com",
        message: "Hello there",
      };

      const contact = await contactService.submitContact(contactData);

      expect(contact).toBeDefined();
      expect(contact.name).toBe("Jane Smith");
      expect(contact.phone).toBeUndefined();
      expect(contact.service).toBeUndefined();
    });

    test("should handle tracking data", async () => {
      const contactData = {
        name: "Track User",
        email: "track@example.com",
        message: "Tracked contact",
      };

      const trackingData = {
        visitorId: "visitor123",
        sessionId: "session456",
        utmSource: "google",
        utmMedium: "cpc",
      };

      const contact = await contactService.submitContact(contactData, trackingData);
      expect(contact).toBeDefined();
      expect(contact.name).toBe("Track User");
    });
  });

  describe("getContacts", () => {
    beforeEach(async () => {
      // Create test contacts with different statuses
      await testUtils.createTestContact({ name: "Contact 1", status: "new" });
      await testUtils.createTestContact({ name: "Contact 2", status: "read" });
      await testUtils.createTestContact({ name: "Contact 3", status: "replied" });
      await testUtils.createTestContact({ name: "Contact 4", status: "new" });
    });

    test("should get all contacts", async () => {
      const result = await contactService.getContacts();

      expect(result.data).toHaveLength(4);
      expect(result.total).toBe(4);
    });

    test("should filter by status", async () => {
      const newContacts = await contactService.getContacts({ status: "new" });
      const readContacts = await contactService.getContacts({ status: "read" });
      const repliedContacts = await contactService.getContacts({ status: "replied" });

      expect(newContacts.data).toHaveLength(2);
      expect(readContacts.data).toHaveLength(1);
      expect(repliedContacts.data).toHaveLength(1);
    });

    test("should handle pagination", async () => {
      const page1 = await contactService.getContacts({ limit: 2, skip: 0 });
      const page2 = await contactService.getContacts({ limit: 2, skip: 2 });

      expect(page1.data).toHaveLength(2);
      expect(page2.data).toHaveLength(2);
      expect(page1.total).toBe(4);
      expect(page2.total).toBe(4);
    });

    test("should handle empty results", async () => {
      const result = await contactService.getContacts({ status: "nonexistent" });

      expect(result.data).toHaveLength(0);
      expect(result.total).toBe(0);
    });
  });

  describe("getContactById", () => {
    test("should get contact by ID", async () => {
      const created = await testUtils.createTestContact({ name: "Find Me" });
      const found = await contactService.getContactById(created._id.toString());

      expect(found).toBeDefined();
      expect(found.name).toBe("Find Me");
      expect(found._id.toString()).toBe(created._id.toString());
    });

    test("should throw error for non-existent contact", async () => {
      const fakeId = "507f1f77bcf86cd799439011";
      
      expect(async () => {
        await contactService.getContactById(fakeId);
      }).toThrow("Inquiry not found");
    });

    test("should throw error for invalid ID format", async () => {
      expect(async () => {
        await contactService.getContactById("invalid-id");
      }).toThrow();
    });
  });

  describe("updateContactStatus", () => {
    test("should update contact status", async () => {
      const contact = await testUtils.createTestContact({ status: "new" });
      const updated = await contactService.updateContactStatus(
        contact._id.toString(),
        "read"
      );

      expect(updated.status).toBe("read");
    });

    test("should throw error for non-existent contact", async () => {
      const fakeId = "507f1f77bcf86cd799439011";
      
      expect(async () => {
        await contactService.updateContactStatus(fakeId, "read");
      }).toThrow("Inquiry not found");
    });
  });

  describe("exportContacts", () => {
    beforeEach(async () => {
      await testUtils.createTestContact({ name: "Export 1", status: "new" });
      await testUtils.createTestContact({ name: "Export 2", status: "read" });
      await testUtils.createTestContact({ name: "Export 3", status: "replied" });
    });

    test("should export all contacts", async () => {
      const contacts = await contactService.exportContacts();

      expect(contacts).toHaveLength(3);
      expect(contacts[0].name).toContain("Export");
    });

    test("should export contacts by status", async () => {
      const newContacts = await contactService.exportContacts("new");
      const readContacts = await contactService.exportContacts("read");

      expect(newContacts).toHaveLength(1);
      expect(readContacts).toHaveLength(1);
    });
  });
});