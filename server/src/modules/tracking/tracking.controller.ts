import { Request, Response } from "express";
import * as trackingService from "./tracking.service.js";

export async function pageview(req: Request, res: Response) {
  if (!req.tracking) {
    return res.status(400).json({ success: false, message: "No tracking data" });
  }
  const result = await trackingService.processPageView(req.tracking);
  res.json({ success: true, data: result });
}

export async function analytics(req: Request, res: Response) {
  const period = req.query.period as string | undefined;
  const data = await trackingService.getAnalytics(period);
  res.json({ success: true, data });
}
