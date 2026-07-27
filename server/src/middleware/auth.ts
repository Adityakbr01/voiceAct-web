import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config/index.js";
import { AppError } from "../utils/AppError.js";
import Admin from "../modules/auth/admin.model.js";

export type AdminRole = "super_admin" | "editor";

function extractToken(req: Request): string | null {
  if (req.cookies?.token) return req.cookies.token as string;
  const header = req.headers.authorization;
  if (header?.startsWith("Bearer ")) return header.split(" ")[1];
  return null;
}

export const protect = async (req: Request, res: Response, next: NextFunction) => {
  const token = extractToken(req);
  if (!token) return next(new AppError("Not authenticated", 401));

  try {
    const decoded = jwt.verify(token, config.jwtSecret) as { id: string };
    const admin = await Admin.findById(decoded.id).select("-password");
    if (!admin) return next(new AppError("Admin not found", 401));
    (req as any).admin = admin;
    next();
  } catch {
    next(new AppError("Invalid token", 401));
  }
};

export function requireRole(...roles: AdminRole[]) {
  return (req: Request, _res: Response, next: NextFunction) => {
    const admin = (req as any).admin;
    if (!admin) return next(new AppError("Not authenticated", 401));
    if (!roles.includes(admin.role)) {
      return next(new AppError("Insufficient permissions", 403));
    }
    next();
  };
}
