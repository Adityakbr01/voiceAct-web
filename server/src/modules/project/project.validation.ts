import { z } from "zod";

export const projectSchema = z.object({
  title: z.string().min(1).max(100),
  slug: z.string().min(1).max(100),
  description: z.string().min(1).max(5000),
  client: z.string().max(100).optional(),
  services: z.array(z.string()).optional(),
  image: z.string().url().optional(),
  url: z.string().url().optional(),
  featured: z.boolean().optional(),
  order: z.number().int().optional(),
});
