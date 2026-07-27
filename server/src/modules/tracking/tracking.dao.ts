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

export async function getDailyTimeSeries(since?: Date) {
  const match = since ? { createdAt: { $gte: since } } : {};
  const [sessions, visitors] = await Promise.all([
    Session.aggregate([
      { $match: match },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          sessions: { $sum: 1 },
          pageViews: { $sum: "$pagesViewed" },
        },
      },
      { $sort: { _id: 1 } },
    ]),
    Visitor.aggregate([
      { $match: match },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          visitors: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]),
  ]);

  const visitorMap = new Map(visitors.map((v: { _id: string; visitors: number }) => [v._id, v.visitors]));
  return sessions.map((row: { _id: string; sessions: number; pageViews: number }) => ({
    date: row._id,
    sessions: row.sessions,
    pageViews: row.pageViews,
    visitors: visitorMap.get(row._id) ?? 0,
    uniqueVisitors: visitorMap.get(row._id) ?? 0,
  }));
}

export async function getActiveSessionCount(minutes = 5) {
  const since = new Date(Date.now() - minutes * 60 * 1000);
  return Session.countDocuments({ lastVisit: { $gte: since } });
}

export async function getEngagedSessionCount(since?: Date) {
  const match: Record<string, unknown> = since ? { createdAt: { $gte: since } } : {};
  match.pagesViewed = { $gt: 1 };
  return Session.countDocuments(match);
}
