import { Request, Response } from "express";
import * as adminService from "./admin.service.js";
import { sendSuccess } from "../../utils/response.js";

export async function stats(req: Request, res: Response) {
  const period = req.query.period as string | undefined;
  const data = await adminService.getDashboardStats(period);
  sendSuccess(res, data);
}
