import * as blogDao from "./blog.dao.js";
import { AppError } from "../../utils/AppError.js";

export async function getAll(options?: { page?: number; limit?: number; category?: string }) {
  if (!options?.page && !options?.limit && !options?.category) {
    return blogDao.findAllActive();
  }
  return blogDao.findPaginatedActive(options);
}

export async function getAllAdmin() {
  return blogDao.findAll();
}

export async function getBySlug(slug: string) {
  const blog = await blogDao.findBySlug(slug);
  if (!blog) throw new AppError("Blog post not found", 404);
  return blog;
}

export async function create(data: any) {
  return blogDao.create(data);
}

export async function update(id: string, data: any) {
  const blog = await blogDao.findByIdAndUpdate(id, data);
  if (!blog) throw new AppError("Blog post not found", 404);
  return blog;
}

export async function remove(id: string) {
  const blog = await blogDao.findByIdAndDelete(id);
  if (!blog) throw new AppError("Blog post not found", 404);
}
