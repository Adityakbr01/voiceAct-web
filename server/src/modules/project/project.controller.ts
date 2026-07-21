import { Request, Response } from "express";
import * as projectService from "./project.service.js";

export async function list(_req: Request, res: Response) {
  const projects = await projectService.getAll();
  res.json({ success: true, data: projects });
}

export async function getBySlug(req: Request, res: Response) {
  const project = await projectService.getBySlug(req.params.slug);
  res.json({ success: true, data: project });
}

export async function create(req: Request, res: Response) {
  const project = await projectService.create(req.body);
  res.status(201).json({ success: true, data: project });
}

export async function update(req: Request, res: Response) {
  const project = await projectService.update(req.params.id, req.body);
  res.json({ success: true, data: project });
}

export async function remove(req: Request, res: Response) {
  await projectService.remove(req.params.id);
  res.json({ success: true, message: "Project deleted" });
}
