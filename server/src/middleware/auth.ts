import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config/index.js";
import { AppError } from "../utils/AppError.js";
import Admin from "../modules/auth/admin.model.js";

export const protect = async (req: Request, res: Response, next: NextFunction) => {
  const header = req.headers.authorization;
  if (!header || !header.startsWith("Bearer ")) {
    return next(new AppError("Not authenticated", 401));
  }

  try {
    const decoded = jwt.verify(header.split(" ")[1], config.jwtSecret) as { id: string };
    const admin = await Admin.findById(decoded.id).select("-password");
    if (!admin) return next(new AppError("Admin not found", 401));
    (req as any).admin = admin;
    next();
  } catch {
    next(new AppError("Invalid token", 401));
  }
};
