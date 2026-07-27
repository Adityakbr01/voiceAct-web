import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";

/**
 * Returns an Express middleware that validates req.body against the given Zod
 * schema and replaces req.body with the parsed (coerced + stripped) result.
 * Zod errors are forwarded to the global error handler which returns 400.
 */
export function validate(schema: ZodSchema) {
  return (req: Request, _res: Response, next: NextFunction) => {
    req.body = schema.parse(req.body);
    next();
  };
}
