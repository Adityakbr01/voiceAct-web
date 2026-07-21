import { z } from "zod";

export const serviceSchema = z.object({
  title: z.string().min(1).max(100),
  slug: z.string().min(1).max(100),
  description: z.string().min(1).max(2000),
  icon: z.string().optional(),
  order: z.number().int().optional(),
  active: z.boolean().optional(),
});
