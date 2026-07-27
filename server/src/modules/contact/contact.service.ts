import * as contactDao from "./contact.dao.js";
import { AppError } from "../../utils/AppError.js";
import { saveLeadAttribution } from "../tracking/tracking.service.js";

import { sendContactNotification } from "../../utils/mailer.js";

export async function submitContact(data: any, tracking?: any) {
  const contact = await contactDao.create(data);
  if (tracking) {
    await saveLeadAttribution(tracking, "contact", String(contact._id)).catch(() => {});
  }
  sendContactNotification(data).catch(() => {});
  return contact;
}

export async function getContacts({ status, skip = 0, limit = 20 }: { status?: string; skip?: number; limit?: number } = {}) {
  const filter = status ? { status } : {};
  const [data, total] = await Promise.all([
    contactDao.find(filter, skip, limit),
    contactDao.count(filter),
  ]);
  return { data, total };
}

export async function getContactById(id: string) {
  const contact = await contactDao.findById(id);
  if (!contact) throw new AppError("Inquiry not found", 404);
  return contact;
}

export async function exportContacts(status?: string) {
  const filter = status ? { status } : {};
  return contactDao.findAll(filter);
}

export async function updateContactStatus(id: string, status: string) {
  const contact = await contactDao.findByIdAndUpdate(id, { status });
  if (!contact) throw new AppError("Inquiry not found", 404);
  return contact;
}
