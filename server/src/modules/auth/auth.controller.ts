import { Request, Response } from "express";
import * as authService from "./auth.service.js";

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;
  const result = await authService.login(email, password);
  res.json({ success: true, data: result });
}

export async function me(req: Request, res: Response) {
  const admin = await authService.getMe((req as any).admin._id);
  res.json({ success: true, data: admin });
}
