import * as projectDao from "./project.dao.js";
import { AppError } from "../../utils/AppError.js";

export async function getAll(options: { featured?: boolean; skip?: number; limit?: number } = {}) {
  return projectDao.findAll(options);
}

export async function listPaginated(options: {
  featured?: boolean;
  page?: number;
  limit?: number;
}) {
  const page = options.page ?? 1;
  const limit = options.limit ?? 20;
  const skip = (page - 1) * limit;
  const [data, total] = await Promise.all([
    projectDao.findAll({ featured: options.featured, skip, limit }),
    projectDao.countAll({ featured: options.featured }),
  ]);
  return { data, total, page, limit, pages: Math.ceil(total / limit) };
}

export async function getBySlug(slug: string) {
  const project = await projectDao.findBySlug(slug);
  if (!project) throw new AppError("Project not found", 404);
  return project;
}

export async function create(data: any) {
  return projectDao.create(data);
}

export async function update(id: string, data: any) {
  const project = await projectDao.findByIdAndUpdate(id, data);
  if (!project) throw new AppError("Project not found", 404);
  return project;
}

export async function remove(id: string) {
  const project = await projectDao.findByIdAndDelete(id);
  if (!project) throw new AppError("Project not found", 404);
}
