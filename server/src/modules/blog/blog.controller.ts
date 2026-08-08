import { Request, Response } from "express";
import * as blogService from "./blog.service.js";
import { sendSuccess, sendCreated } from "../../utils/response.js";
import { triggerBlogRevalidation } from "../../utils/revalidate.js";

export async function list(req: Request, res: Response) {
  console.log("[SERVER DEBUG] GET /api/blogs called with query:", req.query);
  const page = req.query.page ? Number(req.query.page) : undefined;
  const limit = req.query.limit ? Number(req.query.limit) : undefined;
  const category = req.query.category ? String(req.query.category) : undefined;

  const result = await blogService.getAll({ page, limit, category });
  if (Array.isArray(result)) {
    console.log(`[SERVER DEBUG] Returning ${result.length} unpaginated active blogs`);
    sendSuccess(res, result);
  } else {
    console.log(
      `[SERVER DEBUG] Returning paginated ${result.data.length} blogs (Page ${result.pagination.page} of ${result.pagination.totalPages}, Total ${result.pagination.total})`,
    );
    sendSuccess(res, result.data, undefined, 200, { pagination: result.pagination });
  }
}

export async function listAdmin(_req: Request, res: Response) {
  const blogs = await blogService.getAllAdmin();
  sendSuccess(res, blogs);
}

export async function getBySlug(req: Request, res: Response) {
  console.log(`[SERVER DEBUG] GET /api/blogs/${req.params.slug} called by frontend`);
  const blog = await blogService.getBySlug(req.params.slug as string);
  console.log(`[SERVER DEBUG] Found blog "${blog?.title}" for slug "${req.params.slug}"`);
  sendSuccess(res, blog);
}

export async function create(req: Request, res: Response) {
  const blog = await blogService.create(req.body);
  triggerBlogRevalidation();
  sendCreated(res, blog);
}

export async function update(req: Request, res: Response) {
  const blog = await blogService.update(req.params.id as string, req.body);
  triggerBlogRevalidation();
  sendSuccess(res, blog);
}

export async function remove(req: Request, res: Response) {
  await blogService.remove(req.params.id as string);
  triggerBlogRevalidation();
  sendSuccess(res, null, "Blog post deleted");
}
