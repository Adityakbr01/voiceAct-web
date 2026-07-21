import { Request, Response } from "express";
import * as serviceService from "./service.service.js";

export async function list(_req: Request, res: Response) {
  const services = await serviceService.getAll();
  res.json({ success: true, data: services });
}

export async function getBySlug(req: Request, res: Response) {
  const service = await serviceService.getBySlug(req.params.slug);
  res.json({ success: true, data: service });
}

export async function create(req: Request, res: Response) {
  const service = await serviceService.create(req.body);
  res.status(201).json({ success: true, data: service });
}

export async function update(req: Request, res: Response) {
  const service = await serviceService.update(req.params.id, req.body);
  res.json({ success: true, data: service });
}

export async function remove(req: Request, res: Response) {
  await serviceService.remove(req.params.id);
  res.json({ success: true, message: "Service deleted" });
}
