import * as trackingDao from "./tracking.dao.js";
import type { TrackingData } from "./tracking.middleware.js";

export async function processPageView(tracking: TrackingData) {
  const now = new Date();

  await trackingDao.upsertVisitor(tracking.visitorId, {
    ip: tracking.ip,
    userAgent: tracking.userAgent,
    device: tracking.device,
    browser: tracking.browser,
    os: tracking.os,
    language: tracking.language,
    timezone: tracking.timezone,
    lastVisit: now,
  });

  const existing = await trackingDao.findSession(tracking.sessionId);

  if (existing) {
    await trackingDao.incrementPages(tracking.sessionId);
  } else {
    await trackingDao.upsertSession(tracking.sessionId, {
      visitorId: tracking.visitorId,
      firstVisit: now,
      lastVisit: now,
      pagesViewed: 1,
      landingPage: tracking.landingPage,
      exitPage: tracking.landingPage,
      sessionDuration: 0,
      bounce: true,
      utmSource: tracking.utmSource,
      utmMedium: tracking.utmMedium,
      utmCampaign: tracking.utmCampaign,
      utmTerm: tracking.utmTerm,
      utmContent: tracking.utmContent,
      referrer: tracking.referrer,
      trafficSource: (tracking as any).trafficSource,
    });
  }

  return { visitorId: tracking.visitorId, sessionId: tracking.sessionId };
}

export async function saveLeadAttribution(
  tracking: TrackingData,
  leadType: string,
  leadId: string
) {
  return trackingDao.createLeadAttribution({
    visitorId: tracking.visitorId,
    sessionId: tracking.sessionId,
    leadType,
    leadId,
    utmSource: tracking.utmSource,
    utmMedium: tracking.utmMedium,
    utmCampaign: tracking.utmCampaign,
    utmTerm: tracking.utmTerm,
    utmContent: tracking.utmContent,
    gclid: tracking.gclid,
    fbclid: tracking.fbclid,
    msclkid: tracking.msclkid,
    ttclid: tracking.ttclid,
    liFatId: tracking.liFatId,
    campaignId: tracking.campaignId,
    adId: tracking.adId,
    creativeId: tracking.creativeId,
    keyword: tracking.keyword,
    referrer: tracking.referrer,
    landingPage: tracking.landingPage,
    trafficSource: (tracking as any).trafficSource,
    device: tracking.device,
    browser: tracking.browser,
    os: tracking.os,
    ip: tracking.ip,
  });
}

function parseSince(period?: string): Date | undefined {
  if (!period) return undefined;
  const now = new Date();
  switch (period) {
    case "24h": return new Date(now.getTime() - 86400000);
    case "7d": return new Date(now.getTime() - 604800000);
    case "30d": return new Date(now.getTime() - 2592000000);
    case "90d": return new Date(now.getTime() - 7776000000);
    default: return undefined;
  }
}

export async function getAnalytics(period?: string) {
  const since = parseSince(period);

  const [sources, campaigns, stats, landingPages, devices, browsers, countries] =
    await Promise.all([
      trackingDao.getTrafficSources(since),
      trackingDao.getTopCampaigns(since),
      trackingDao.getVisitorStats(since),
      trackingDao.getTopLandingPages(since),
      trackingDao.getDeviceBreakdown(since),
      trackingDao.getBrowserBreakdown(since),
      trackingDao.getCountryBreakdown(since),
    ]);

  return { sources, campaigns, stats, landingPages, devices, browsers, countries };
}
