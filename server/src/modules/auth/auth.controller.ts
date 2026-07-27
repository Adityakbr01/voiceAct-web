import { Request, Response } from "express";
import { config } from "../../config/index.js";
import * as authService from "./auth.service.js";
import { sendSuccess } from "../../utils/response.js";

const cookieOptions = {
  httpOnly: true,
  secure: config.isProduction,
  sameSite: "lax" as const,
  maxAge: 7 * 24 * 60 * 60 * 1000,
  path: "/",
  ...(config.cookieDomain ? { domain: config.cookieDomain } : {}),
};

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;
  const result = await authService.login(email, password);
  res.cookie("token", result.token, cookieOptions);
  sendSuccess(res, { admin: result.admin }, "Login successful");
}

export async function logout(_req: Request, res: Response) {
  res.clearCookie("token", {
    path: "/",
    ...(config.cookieDomain ? { domain: config.cookieDomain } : {}),
  });
  sendSuccess(res, null, "Logged out");
}

export async function me(req: Request, res: Response) {
  const admin = await authService.getMe((req as any).admin._id);
  sendSuccess(res, admin);
}
