import { Request, Response } from "express";
import * as projectService from "./project.service.js";
import { parsePagination } from "../../utils/pagination.js";
import { sendSuccess, sendCreated, sendPaginated } from "../../utils/response.js";

export async function list(req: Request, res: Response) {
  const featured =
    req.query.featured === "true" ? true
    : req.query.featured === "false" ? false
    : undefined;

  const { page, limit, skip } = parsePagination(req.query as Record<string, string>);

  if (req.query.page || req.query.limit || featured !== undefined) {
    const result = await projectService.listPaginated({ featured, page, limit });
    sendPaginated(res, result.data as any[], result.total, result.page, result.limit);
    return;
  }

  const projects = await projectService.getAll();
  sendSuccess(res, projects);
}

export async function getBySlug(req: Request, res: Response) {
  const project = await projectService.getBySlug(req.params.slug as string);
  sendSuccess(res, project);
}

export async function create(req: Request, res: Response) {
  const project = await projectService.create(req.body);
  sendCreated(res, project);
}

export async function update(req: Request, res: Response) {
  const project = await projectService.update(req.params.id as string, req.body);
  sendSuccess(res, project);
}

export async function remove(req: Request, res: Response) {
  await projectService.remove(req.params.id as string);
  sendSuccess(res, null, "Project deleted");
}
