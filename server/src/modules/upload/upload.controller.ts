import { Request, Response } from "express";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import crypto from "crypto";
import { config } from "../../config/index.js";
import { AppError } from "../../utils/AppError.js";

import ImageKit from "imagekit";

const ALLOWED_MIMES: Record<string, string> = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
  "image/gif": ".gif",
};

const imagekit =
  config.imagekitPublicKey && config.imagekitPrivateKey && config.imagekitUrlEndpoint
    ? new ImageKit({
        publicKey: config.imagekitPublicKey,
        privateKey: config.imagekitPrivateKey,
        urlEndpoint: config.imagekitUrlEndpoint,
      })
    : null;

export async function uploadImage(req: Request, res: Response) {
  const { filename, data, mimeType } = req.body;
  const ext = ALLOWED_MIMES[mimeType];
  if (!ext) throw new AppError("Unsupported file type", 400);

  const buffer = Buffer.from(data, "base64");
  if (buffer.length > config.uploadMaxBytes) {
    throw new AppError(`File exceeds ${config.uploadMaxBytes / (1024 * 1024)}MB limit`, 400);
  }

  const safeBase = filename.replace(/[^a-zA-Z0-9-_]/g, "").slice(0, 40) || "image";
  const uniqueName = `${safeBase}-${crypto.randomBytes(6).toString("hex")}${ext}`;

  // 1. Try ImageKit Cloud CDN Upload first
  if (imagekit) {
    try {
      console.log(`[UPLOAD DEBUG] Uploading ${uniqueName} to ImageKit CDN...`);
      const ikResult = await imagekit.upload({
        file: buffer,
        fileName: uniqueName,
        folder: "/voiceact",
      });
      console.log(`[UPLOAD DEBUG] ImageKit upload success: ${ikResult.url}`);
      return res.status(201).json({
        success: true,
        data: {
          url: ikResult.url,
          fileId: ikResult.fileId,
          filename: ikResult.name,
          thumbnailUrl: ikResult.thumbnailUrl,
        },
      });
    } catch (ikError: any) {
      console.error(
        "[UPLOAD DEBUG ERROR] ImageKit upload failed, falling back to local disk:",
        ikError?.message || ikError,
      );
    }
  }

  // 2. Fallback to Local Disk Storage
  await mkdir(config.uploadDir, { recursive: true });
  const filePath = path.join(config.uploadDir, uniqueName);
  await writeFile(filePath, buffer);

  const baseUrl = `${req.protocol}://${req.get("host")}`;
  return res.status(201).json({
    success: true,
    data: { url: `${baseUrl}/uploads/${uniqueName}`, filename: uniqueName },
  });
}
