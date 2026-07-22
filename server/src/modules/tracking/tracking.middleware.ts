import { Request, Response, NextFunction } from "express";
import crypto from "crypto";
import { parseUA } from "./ua.helper.js";

declare global {
  namespace Express {
    interface Request {
      tracking?: TrackingData;
    }
  }
}

export interface TrackingData {
  visitorId: string;
  sessionId: string;
  ip: string;
  userAgent: string;
  device: string;
  browser: string;
  os: string;
  language?: string;
  timezone?: string;
  referrer?: string;
  landingPage?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
  gclid?: string;
  fbclid?: string;
  msclkid?: string;
  ttclid?: string;
  liFatId?: string;
  campaignId?: string;
  adId?: string;
  creativeId?: string;
  keyword?: string;
}

function hash(str: string): string {
  return crypto.createHash("sha256").update(str).digest("hex").slice(0, 16);
}

function getIp(req: Request): string {
  const fwd = req.headers["x-forwarded-for"];
  if (typeof fwd === "string") return fwd.split(",")[0].trim();
  return req.socket.remoteAddress ?? "unknown";
}

function detectTrafficSource(params: TrackingData): string {
  if (params.gclid) return "Google Ads";
  if (params.fbclid) return "Facebook";
  if (params.msclkid) return "Microsoft Ads";
  if (params.ttclid) return "TikTok Ads";
  if (params.liFatId) return "LinkedIn";
  if (params.utmSource) {
    const src = params.utmSource.toLowerCase();
    if (src.includes("google")) return params.utmMedium === "cpc" ? "Paid Search" : "Organic Search";
    if (src.includes("facebook") || src.includes("fb")) return "Facebook";
    if (src.includes("instagram")) return "Instagram";
    if (src.includes("linkedin")) return "LinkedIn";
    if (src.includes("twitter") || src.includes("x")) return "Twitter/X";
    if (src.includes("youtube")) return "YouTube";
    if (src.includes("email") || params.utmMedium === "email") return "Email";
    if (src.includes("whatsapp")) return "WhatsApp";
    if (src.includes("telegram")) return "Telegram";
    return params.utmSource;
  }
  if (params.referrer) return "Referral";
  return "Direct";
}

export function trackingMiddleware(req: Request, _res: Response, next: NextFunction) {
  const ua = req.headers["user-agent"] ?? "";
  const parsed = parseUA(ua);
  const ip = getIp(req);
  const referrer = req.headers.referer ?? undefined;

  const visitorId = hash(`${ip}-${ua}`);
  const sessionId = req.headers["x-session-id"] as string ?? hash(`${visitorId}-${Date.now()}`);

  const q = req.query as Record<string, string | undefined>;

  const tracking: TrackingData = {
    visitorId,
    sessionId,
    ip,
    userAgent: ua,
    device: parsed.device,
    browser: parsed.browser,
    os: parsed.os,
    language: req.headers["accept-language"]?.split(",")[0]?.split(";")[0],
    timezone: q.tz,
    referrer,
    landingPage: q.lp ?? req.originalUrl,
    utmSource: q.utm_source,
    utmMedium: q.utm_medium,
    utmCampaign: q.utm_campaign,
    utmTerm: q.utm_term,
    utmContent: q.utm_content,
    gclid: q.gclid,
    fbclid: q.fbclid,
    msclkid: q.msclkid,
    ttclid: q.ttclid,
    liFatId: q.li_fat_id,
    campaignId: q.campaign_id,
    adId: q.ad_id,
    creativeId: q.creative_id,
    keyword: q.keyword,
  };

  (tracking as any).trafficSource = detectTrafficSource(tracking);

  req.tracking = tracking;
  next();
}
