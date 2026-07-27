import Contact from "../contact/contact.model.js";
import Project from "../project/project.model.js";
import Service from "../service/service.model.js";
import * as trackingService from "../tracking/tracking.service.js";

export async function getDashboardStats(period?: string) {
  const [statusGroups, totalContacts, projectCount, serviceCount, activeServices, analytics] =
    await Promise.all([
      Contact.aggregate([{ $group: { _id: "$status", count: { $sum: 1 } } }]),
      Contact.countDocuments(),
      Project.countDocuments(),
      Service.countDocuments(),
      Service.countDocuments({ active: true }),
      trackingService.getAnalytics(period),
    ]);

  const contactsByStatus = { new: 0, read: 0, replied: 0 };
  for (const row of statusGroups) {
    const key = row._id as keyof typeof contactsByStatus;
    if (key in contactsByStatus) contactsByStatus[key] = row.count;
  }

  const recentContacts = await Contact.find()
    .sort({ createdAt: -1 })
    .limit(10)
    .select("_id name email service status createdAt")
    .lean();

  return {
    contacts: { total: totalContacts, ...contactsByStatus },
    projects: { total: projectCount },
    services: { total: serviceCount, active: activeServices },
    recentContacts,
    tracking: analytics,
  };
}
