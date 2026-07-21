import * as serviceDao from "./service.dao.js";
import { AppError } from "../../utils/AppError.js";

export async function getAll() {
  return serviceDao.findAllActive();
}

export async function getBySlug(slug: string) {
  const service = await serviceDao.findBySlug(slug);
  if (!service) throw new AppError("Service not found", 404);
  return service;
}

export async function create(data: any) {
  return serviceDao.create(data);
}

export async function update(id: string, data: any) {
  const service = await serviceDao.findByIdAndUpdate(id, data);
  if (!service) throw new AppError("Service not found", 404);
  return service;
}

export async function remove(id: string) {
  const service = await serviceDao.findByIdAndDelete(id);
  if (!service) throw new AppError("Service not found", 404);
}
