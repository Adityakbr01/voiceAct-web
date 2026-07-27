import { Request, Response } from "express";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import crypto from "crypto";
import { config } from "../../config/index.js";
import { AppError } from "../../utils/AppError.js";

const ALLOWED_MIMES: Record<string, string> = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
  "image/gif": ".gif",
};

export async function uploadImage(req: Request, res: Response) {
  const { filename, data, mimeType } = req.body;
  const ext = ALLOWED_MIMES[mimeType];
  if (!ext) throw new AppError("Unsupported file type", 400);

  const buffer = Buffer.from(data, "base64");
  if (buffer.length > config.uploadMaxBytes) {
    throw new AppError(`File exceeds ${config.uploadMaxBytes / (1024 * 1024)}MB limit`, 400);
  }

  await mkdir(config.uploadDir, { recursive: true });
  const safeBase = filename.replace(/[^a-zA-Z0-9-_]/g, "").slice(0, 40) || "image";
  const uniqueName = `${safeBase}-${crypto.randomBytes(6).toString("hex")}${ext}`;
  const filePath = path.join(config.uploadDir, uniqueName);
  await writeFile(filePath, buffer);

  const baseUrl = `${req.protocol}://${req.get("host")}`;
  res.status(201).json({
    success: true,
    data: { url: `${baseUrl}/uploads/${uniqueName}`, filename: uniqueName },
  });
}
