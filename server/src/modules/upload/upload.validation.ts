import { z } from "zod";

export const uploadSchema = z.object({
  filename: z.string().min(1).max(120),
  data: z.string().min(1),
  mimeType: z.enum(["image/jpeg", "image/png", "image/webp", "image/gif"]),
});
