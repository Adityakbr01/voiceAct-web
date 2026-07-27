import { describe, test, expect, beforeEach } from "bun:test";
import { sendSuccess, sendCreated, sendPaginated } from "../../utils/response.js";

// Mock Express response object
class MockResponse {
  statusCode: number = 200;
  body: any = null;

  status(code: number) {
    this.statusCode = code;
    return this;
  }

  json(data: any) {
    this.body = data;
    return this;
  }
}

describe("Response Utils", () => {
  let mockRes: MockResponse;

  beforeEach(() => {
    mockRes = new MockResponse();
  });

  describe("sendSuccess", () => {
    test("should send success response with data", () => {
      const testData = { id: 1, name: "Test" };
      
      sendSuccess(mockRes as any, testData);

      expect(mockRes.statusCode).toBe(200);
      expect(mockRes.body).toEqual({
        success: true,
        data: testData,
      });
    });

    test("should send success response with message", () => {
      const testData = { id: 1 };
      const message = "Operation successful";
      
      sendSuccess(mockRes as any, testData, message);

      expect(mockRes.body).toEqual({
        success: true,
        data: testData,
        message: message,
      });
    });

    test("should send success response with null data", () => {
      sendSuccess(mockRes as any, null, "No data");

      expect(mockRes.body).toEqual({
        success: true,
        data: null,
        message: "No data",
      });
    });

    test("should send success response without message", () => {
      const testData = { test: "value" };
      
      sendSuccess(mockRes as any, testData);

      expect(mockRes.body).toEqual({
        success: true,
        data: testData,
      });
    });
  });

  describe("sendCreated", () => {
    test("should send created response with 201 status", () => {
      const testData = { id: 1, name: "Created Item" };
      
      sendCreated(mockRes as any, testData);

      expect(mockRes.statusCode).toBe(201);
      expect(mockRes.body).toEqual({
        success: true,
        data: testData,
      });
    });

    test("should send created response with message", () => {
      const testData = { id: 2 };
      const message = "Item created successfully";
      
      sendCreated(mockRes as any, testData, message);

      expect(mockRes.statusCode).toBe(201);
      expect(mockRes.body).toEqual({
        success: true,
        data: testData,
        message: message,
      });
    });
  });

  describe("sendPaginated", () => {
    test("should send paginated response with meta", () => {
      const testData = [
        { id: 1, name: "Item 1" },
        { id: 2, name: "Item 2" },
      ];
      
      sendPaginated(mockRes as any, testData, 10, 1, 2);

      expect(mockRes.statusCode).toBe(200);
      expect(mockRes.body).toEqual({
        success: true,
        data: testData,
        meta: {
          total: 10,
          page: 1,
          limit: 2,
          pages: 5, // Math.ceil(10 / 2)
        },
      });
    });

    test("should calculate pages correctly", () => {
      const testData = [{ id: 1 }];
      
      // Test edge cases for page calculation
      sendPaginated(mockRes as any, testData, 7, 2, 3);

      expect(mockRes.body.meta.pages).toBe(3); // Math.ceil(7 / 3)
    });

    test("should handle zero total", () => {
      sendPaginated(mockRes as any, [], 0, 1, 10);

      expect(mockRes.body).toEqual({
        success: true,
        data: [],
        meta: {
          total: 0,
          page: 1,
          limit: 10,
          pages: 0,
        },
      });
    });

    test("should handle single page", () => {
      const testData = [{ id: 1 }, { id: 2 }];
      
      sendPaginated(mockRes as any, testData, 2, 1, 10);

      expect(mockRes.body.meta.pages).toBe(1); // Math.ceil(2 / 10)
    });
  });
});