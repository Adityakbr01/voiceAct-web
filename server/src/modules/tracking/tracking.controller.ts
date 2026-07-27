import { Request, Response } from "express";
import * as trackingService from "./tracking.service.js";
import { sendSuccess } from "../../utils/response.js";
import { AppError } from "../../utils/AppError.js";

export async function pageview(req: Request, res: Response) {
  if (!req.tracking) {
    throw new AppError("No tracking data available", 400);
  }
  const result = await trackingService.processPageView(req.tracking);
  sendSuccess(res, result);
}

export async function analytics(req: Request, res: Response) {
  const period = req.query.period as string | undefined;
  const data = await trackingService.getAnalytics(period);
  sendSuccess(res, data);
}
