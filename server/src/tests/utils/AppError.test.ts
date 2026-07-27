import { describe, test, expect } from "bun:test";
import { AppError } from "../../utils/AppError.js";

describe("AppError", () => {
  test("should create AppError instance with message and status code", () => {
    const error = new AppError("Test error", 404);
    
    expect(error).toBeInstanceOf(AppError);
    expect(error).toBeInstanceOf(Error);
    expect(error.message).toBe("Test error");
    expect(error.statusCode).toBe(404);
    expect(error.isOperational).toBe(true);
  });

  test("should have proper prototype chain", () => {
    const error = new AppError("Test error", 500);
    
    expect(error.name).toBe("Error");
    expect(error.stack).toBeDefined();
  });

  test("should work with different status codes", () => {
    const badRequest = new AppError("Bad request", 400);
    const unauthorized = new AppError("Unauthorized", 401);
    const forbidden = new AppError("Forbidden", 403);
    const notFound = new AppError("Not found", 404);
    const serverError = new AppError("Server error", 500);

    expect(badRequest.statusCode).toBe(400);
    expect(unauthorized.statusCode).toBe(401);
    expect(forbidden.statusCode).toBe(403);
    expect(notFound.statusCode).toBe(404);
    expect(serverError.statusCode).toBe(500);
  });

  test("should be throwable", () => {
    expect(() => {
      throw new AppError("Test throw", 400);
    }).toThrow("Test throw");
  });
});