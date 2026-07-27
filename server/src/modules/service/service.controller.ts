import { Request, Response } from "express";
import * as serviceService from "./service.service.js";
import { sendSuccess, sendCreated } from "../../utils/response.js";

export async function list(_req: Request, res: Response) {
  const services = await serviceService.getAll();
  sendSuccess(res, services);
}

export async function listAdmin(_req: Request, res: Response) {
  const services = await serviceService.getAllAdmin();
  sendSuccess(res, services);
}

export async function getBySlug(req: Request, res: Response) {
  const service = await serviceService.getBySlug(req.params.slug);
  sendSuccess(res, service);
}

export async function create(req: Request, res: Response) {
  const service = await serviceService.create(req.body);
  sendCreated(res, service);
}

export async function update(req: Request, res: Response) {
  const service = await serviceService.update(req.params.id, req.body);
  sendSuccess(res, service);
}

export async function reorder(req: Request, res: Response) {
  await serviceService.reorder(req.body.items);
  sendSuccess(res, null, "Order updated");
}

export async function remove(req: Request, res: Response) {
  await serviceService.remove(req.params.id);
  sendSuccess(res, null, "Service deleted");
}
