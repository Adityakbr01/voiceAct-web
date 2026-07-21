import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
  phone: z.string().max(20).optional(),
  service: z.string().max(100).optional(),
  message: z.string().min(10).max(2000),
});
