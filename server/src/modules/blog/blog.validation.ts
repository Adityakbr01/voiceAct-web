import { z } from "zod";

export const blogSchema = z.object({
  title: z.string().min(1).max(200),
  slug: z.string().min(1).max(200),
  excerpt: z.string().min(1).max(1000),
  content: z.string().min(1),
  category: z.string().min(1).optional(),
  readTime: z.string().optional(),
  publishedAt: z.string().optional(),
  author: z.object({
    name: z.string().min(1),
    role: z.string().optional(),
    avatar: z.string().optional(),
  }).optional(),
  coverImage: z.string().optional(),
  featured: z.boolean().optional(),
  tags: z.array(z.string()).optional(),
  active: z.boolean().optional(),
  order: z.number().int().optional(),
});
