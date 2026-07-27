import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { AppError } from "../utils/AppError.js";
import { config } from "../config/index.js";

export function errorHandler(err: unknown, _req: Request, res: Response, _next: NextFunction) {
  // Zod validation errors → 400
  if (err instanceof ZodError) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: err.errors.map((e) => ({
        path: e.path.join("."),
        message: e.message,
      })),
    });
  }

  // Known operational errors (thrown via new AppError())
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  // Unknown errors — log full details, hide from client in production
  console.error(err);

  const statusCode = (err as any)?.statusCode ?? 500;
  const message = config.isDev && err instanceof Error ? err.message : "Internal server error";

  res.status(statusCode).json({
    success: false,
    message,
    ...(config.isDev && err instanceof Error ? { stack: err.stack } : {}),
  });
}
