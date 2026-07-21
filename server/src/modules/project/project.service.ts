import * as projectDao from "./project.dao.js";
import { AppError } from "../../utils/AppError.js";

export async function getAll() {
  return projectDao.findAll();
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
