import jwt from "jsonwebtoken";
import { config } from "../../config/index.js";
import * as adminDao from "./admin.dao.js";
import { AppError } from "../../utils/AppError.js";

export async function login(email: string, password: string) {
  const admin = await adminDao.findByEmail(email);
  if (!admin || !(await (admin as any).comparePassword(password))) {
    throw new AppError("Invalid email or password", 401);
  }

  const accessToken = jwt.sign({ id: admin._id, type: "access" }, config.jwtSecret, {
    expiresIn: "15m",
  });

  const refreshToken = jwt.sign({ id: admin._id, type: "refresh" }, config.jwtSecret + "_refresh", {
    expiresIn: config.jwtExpiresIn as any,
  });

  return {
    accessToken,
    refreshToken,
    token: accessToken,
    admin: { id: admin._id, email: admin.email, name: admin.name, role: admin.role },
  };
}

export async function refreshAuthToken(refreshTokenInput: string) {
  try {
    const decoded = jwt.verify(refreshTokenInput, config.jwtSecret + "_refresh") as {
      id: string;
      type: string;
    };

    if (decoded.type !== "refresh") {
      throw new AppError("Invalid token type", 401);
    }

    const admin = await adminDao.findById(decoded.id);
    if (!admin) throw new AppError("Admin not found", 401);

    const accessToken = jwt.sign({ id: admin._id, type: "access" }, config.jwtSecret, {
      expiresIn: "15m",
    });

    const newRefreshToken = jwt.sign({ id: admin._id, type: "refresh" }, config.jwtSecret + "_refresh", {
      expiresIn: config.jwtExpiresIn as any,
    });

    return {
      accessToken,
      refreshToken: newRefreshToken,
      token: accessToken,
      admin: { id: admin._id, email: admin.email, name: admin.name, role: admin.role },
    };
  } catch {
    throw new AppError("Invalid or expired refresh token", 401);
  }
}

export async function getMe(adminId: string) {
  const admin = await adminDao.findById(adminId);
  if (!admin) throw new AppError("Admin not found", 404);
  return { id: admin._id, email: admin.email, name: admin.name, role: admin.role };
}

import { emailService as defaultEmailService, EmailService } from "../email/index.js";
import type {
  OTPEmailPayload,
  PasswordResetEmailPayload,
  VerificationEmailPayload,
  MagicLinkEmailPayload,
  WelcomeEmailPayload,
} from "../email/index.js";

export async function sendAuthOTP(payload: OTPEmailPayload, emailSvc: EmailService = defaultEmailService) {
  return emailSvc.sendOTPEmail(payload);
}

export async function sendAuthPasswordReset(payload: PasswordResetEmailPayload, emailSvc: EmailService = defaultEmailService) {
  return emailSvc.sendPasswordResetEmail(payload);
}

export async function sendAuthVerification(payload: VerificationEmailPayload, emailSvc: EmailService = defaultEmailService) {
  return emailSvc.sendVerificationEmail(payload);
}

export async function sendAuthMagicLink(payload: MagicLinkEmailPayload, emailSvc: EmailService = defaultEmailService) {
  return emailSvc.sendMagicLinkEmail(payload);
}

export async function sendAuthWelcome(payload: WelcomeEmailPayload, emailSvc: EmailService = defaultEmailService) {
  return emailSvc.sendWelcomeEmail(payload);
}

