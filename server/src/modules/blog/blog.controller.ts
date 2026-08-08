import { Request, Response } from "express";
import * as blogService from "./blog.service.js";
import { sendSuccess, sendCreated } from "../../utils/response.js";

export async function list(_req: Request, res: Response) {
  const blogs = await blogService.getAll();
  sendSuccess(res, blogs);
}

export async function listAdmin(_req: Request, res: Response) {
  const blogs = await blogService.getAllAdmin();
  sendSuccess(res, blogs);
}

export async function getBySlug(req: Request, res: Response) {
  const blog = await blogService.getBySlug(req.params.slug as string);
  sendSuccess(res, blog);
}

export async function create(req: Request, res: Response) {
  const blog = await blogService.create(req.body);
  sendCreated(res, blog);
}

export async function update(req: Request, res: Response) {
  const blog = await blogService.update(req.params.id as string, req.body);
  sendSuccess(res, blog);
}

export async function remove(req: Request, res: Response) {
  await blogService.remove(req.params.id as string);
  sendSuccess(res, null, "Blog post deleted");
}
