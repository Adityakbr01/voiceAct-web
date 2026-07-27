import { describe, test, expect } from "bun:test";
import { parsePagination } from "../../utils/pagination.js";

describe("parsePagination", () => {
  test("should return default values when no query params", () => {
    const result = parsePagination({});
    
    expect(result.page).toBe(1);
    expect(result.limit).toBe(20);
    expect(result.skip).toBe(0);
  });

  test("should parse valid page and limit", () => {
    const query = { page: "2", limit: "10" };
    const result = parsePagination(query);
    
    expect(result.page).toBe(2);
    expect(result.limit).toBe(10);
    expect(result.skip).toBe(10); // (page - 1) * limit
  });

  test("should handle string numbers", () => {
    const query = { page: "5", limit: "25" };
    const result = parsePagination(query);
    
    expect(result.page).toBe(5);
    expect(result.limit).toBe(25);
    expect(result.skip).toBe(100);
  });

  test("should clamp to minimum values", () => {
    const query = { page: "-1", limit: "-1" };
    const result = parsePagination(query);
    
    expect(result.page).toBe(1);
    expect(result.limit).toBe(1); // When negative, it should clamp to 1
    expect(result.skip).toBe(0);
  });

  test("should clamp to maximum values", () => {
    const query = { page: "1000", limit: "200" };
    const result = parsePagination(query);
    
    expect(result.page).toBe(1000);
    expect(result.limit).toBe(100); // Max limit is 100
    expect(result.skip).toBe(99900);
  });

  test("should handle invalid inputs gracefully", () => {
    const query = { page: "invalid", limit: "also-invalid" };
    const result = parsePagination(query);
    
    expect(result.page).toBe(1);
    expect(result.limit).toBe(20);
    expect(result.skip).toBe(0);
  });

  test("should handle negative numbers", () => {
    const query = { page: "-5", limit: "-10" };
    const result = parsePagination(query);
    
    expect(result.page).toBe(1);
    expect(result.limit).toBe(1);
    expect(result.skip).toBe(0);
  });

  test("should handle floating point numbers", () => {
    const query = { page: "2.5", limit: "10.7" };
    const result = parsePagination(query);
    
    expect(result.page).toBe(2);
    expect(result.limit).toBe(10);
    expect(result.skip).toBe(10);
  });
});