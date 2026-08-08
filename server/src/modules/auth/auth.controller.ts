import { Request, Response } from "express";
import { config } from "../../config/index.js";
import * as authService from "./auth.service.js";
import { sendSuccess } from "../../utils/response.js";

const accessTokenCookieOptions = {
  httpOnly: true,
  secure: config.cookieSecure,
  sameSite: config.cookieSameSite,
  maxAge: 15 * 60 * 1000, // 15 mins
  path: "/",
  ...(config.cookieDomain ? { domain: config.cookieDomain } : {}),
};

const refreshTokenCookieOptions = {
  httpOnly: true,
  secure: config.cookieSecure,
  sameSite: config.cookieSameSite,
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  path: "/",
  ...(config.cookieDomain ? { domain: config.cookieDomain } : {}),
};

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;
  const result = await authService.login(email, password);
  res.cookie("token", result.accessToken, accessTokenCookieOptions);
  res.cookie("refreshToken", result.refreshToken, refreshTokenCookieOptions);
  sendSuccess(res, { admin: result.admin, accessToken: result.accessToken, refreshToken: result.refreshToken }, "Login successful");
}

export async function refresh(req: Request, res: Response) {
  const refreshTokenInput = req.cookies?.refreshToken || req.body?.refreshToken;
  if (!refreshTokenInput) {
    return res.status(401).json({ success: false, error: "Refresh token required" });
  }

  const result = await authService.refreshAuthToken(refreshTokenInput);
  res.cookie("token", result.accessToken, accessTokenCookieOptions);
  res.cookie("refreshToken", result.refreshToken, refreshTokenCookieOptions);
  sendSuccess(res, { admin: result.admin, accessToken: result.accessToken, refreshToken: result.refreshToken }, "Token refreshed successfully");
}

export async function logout(_req: Request, res: Response) {
  res.clearCookie("token", {
    path: "/",
    ...(config.cookieDomain ? { domain: config.cookieDomain } : {}),
  });
  res.clearCookie("refreshToken", {
    path: "/",
    ...(config.cookieDomain ? { domain: config.cookieDomain } : {}),
  });
  sendSuccess(res, null, "Logged out");
}

export async function me(req: Request, res: Response) {
  const admin = await authService.getMe((req as any).admin._id);
  sendSuccess(res, admin);
}
