import rateLimit from "express-rate-limit";
import { config } from "../config/index.js";

export const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: config.rateLimits.contact,
  message: { success: false, message: "Too many requests, try again later" },
  standardHeaders: true,
  legacyHeaders: false,
});

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: config.rateLimits.auth,
  message: { success: false, message: "Too many login attempts, try again later" },
  standardHeaders: true,
  legacyHeaders: false,
});

export const generalLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: config.rateLimits.general,
  message: { success: false, message: "Rate limit exceeded" },
  standardHeaders: true,
  legacyHeaders: false,
});
