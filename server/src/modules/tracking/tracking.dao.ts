import Visitor from "./visitor.model.js";
import Session from "./session.model.js";
import LeadAttribution from "./lead-attribution.model.js";

// Visitor
export async function upsertVisitor(visitorId: string, data: any) {
  return Visitor.findOneAndUpdate(
    { visitorId },
    { $set: data, $min: { firstVisit: data.firstVisit ?? new Date() }, $setOnInsert: { visitorId } },
    { upsert: true, new: true }
  );
}

export async function getVisitor(visitorId: string) {
  return Visitor.findOne({ visitorId });
}

// Session
export async function upsertSession(sessionId: string, data: any) {
  return Session.findOneAndUpdate(
    { sessionId },
    { $set: data, $setOnInsert: { sessionId, visitorId: data.visitorId } },
    { upsert: true, new: true }
  );
}

export async function incrementPages(sessionId: string) {
  return Session.findOneAndUpdate(
    { sessionId },
    { $inc: { pagesViewed: 1 }, $set: { lastVisit: new Date(), bounce: false } },
    { new: true }
  );
}

export async function findSession(sessionId: string) {
  return Session.findOne({ sessionId });
}

export async function findSessionsByVisitor(visitorId: string) {
  return Session.find({ visitorId }).sort({ lastVisit: -1 });
}

// Lead Attribution
export async function createLeadAttribution(data: any) {
  return LeadAttribution.create(data);
}

export async function getLeadAttribution(leadId: string) {
  return LeadAttribution.findOne({ leadId });
}

// Analytics
export async function getTrafficSources(since?: Date) {
  const match = since ? { createdAt: { $gte: since } } : {};
  return Session.aggregate([
    { $match: match },
    { $group: { _id: "$trafficSource", count: { $sum: 1 } } },
    { $sort: { count: -1 } },
  ]);
}

export async function getTopCampaigns(since?: Date) {
  const match = since
    ? { utmCampaign: { $exists: true, $ne: null }, createdAt: { $gte: since } }
    : { utmCampaign: { $exists: true, $ne: null } };
  return Session.aggregate([
    { $match: match },
    {
      $group: {
        _id: { campaign: "$utmCampaign", source: "$utmSource", medium: "$utmMedium" },
        sessions: { $sum: 1 },
      },
    },
    { $sort: { sessions: -1 } },
    { $limit: 20 },
  ]);
}

export async function getVisitorStats(since?: Date) {
  const match = since ? { createdAt: { $gte: since } } : {};
  const [totalVisitors, totalSessions] = await Promise.all([
    Visitor.countDocuments(match),
    Session.countDocuments(match),
  ]);
  return { totalVisitors, totalSessions };
}

export async function getTopLandingPages(since?: Date) {
  const match = since
    ? { landingPage: { $exists: true, $ne: null }, createdAt: { $gte: since } }
    : { landingPage: { $exists: true, $ne: null } };
  return Session.aggregate([
    { $match: match },
    { $group: { _id: "$landingPage", count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: 10 },
  ]);
}

export async function getDeviceBreakdown(since?: Date) {
  const match = since ? { createdAt: { $gte: since } } : {};
  return Visitor.aggregate([
    { $match: match },
    { $group: { _id: "$device", count: { $sum: 1 } } },
    { $sort: { count: -1 } },
  ]);
}

export async function getBrowserBreakdown(since?: Date) {
  const match = since ? { createdAt: { $gte: since } } : {};
  return Visitor.aggregate([
    { $match: match },
    { $group: { _id: "$browser", count: { $sum: 1 } } },
    { $sort: { count: -1 } },
  ]);
}

export async function getCountryBreakdown(since?: Date) {
  const match = since
    ? { country: { $exists: true, $ne: null }, createdAt: { $gte: since } }
    : { country: { $exists: true, $ne: null } };
  return Visitor.aggregate([
    { $match: match },
    { $group: { _id: "$country", count: { $sum: 1 } } },
    { $sort: { count: -1 } },
  ]);
}
