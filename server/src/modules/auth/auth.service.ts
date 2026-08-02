import jwt from "jsonwebtoken";
import { config } from "../../config/index.js";
import * as adminDao from "./admin.dao.js";
import { AppError } from "../../utils/AppError.js";

export async function login(email: string, password: string) {
  const admin = await adminDao.findByEmail(email);
  if (!admin || !(await (admin as any).comparePassword(password))) {
    throw new AppError("Invalid email or password", 401);
  }

  const token = jwt.sign({ id: admin._id }, config.jwtSecret, {
    expiresIn: config.jwtExpiresIn as any,
  });

  return {
    token,
    admin: { id: admin._id, email: admin.email, name: admin.name, role: admin.role },
  };
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

