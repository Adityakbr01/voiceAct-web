import { Response } from "express";

type Meta = Record<string, any>;

export function sendSuccess(res: Response, data: any, message?: string, statusCode = 200, meta?: Meta) {
  const body: any = { success: true, data };
  if (message) body.message = message;
  if (meta) body.meta = meta;
  return res.status(statusCode).json(body);
}

export function sendCreated(res: Response, data: any, message?: string) {
  return sendSuccess(res, data, message, 201);
}

export function sendPaginated(res: Response, data: any[], total: number, page: number, limit: number) {
  return sendSuccess(res, data, undefined, 200, {
    total,
    page,
    limit,
    pages: Math.ceil(total / limit),
  });
}
