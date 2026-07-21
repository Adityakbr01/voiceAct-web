import * as contactDao from "./contact.dao.js";
import { AppError } from "../../utils/AppError.js";

export async function submitContact(data: any) {
  return contactDao.create(data);
}

export async function getContacts({ status, skip = 0, limit = 20 }: { status?: string; skip?: number; limit?: number } = {}) {
  const filter = status ? { status } : {};
  const [data, total] = await Promise.all([
    contactDao.find(filter, skip, limit),
    contactDao.count(filter),
  ]);
  return { data, total };
}

export async function updateContactStatus(id: string, status: string) {
  const contact = await contactDao.findByIdAndUpdate(id, { status });
  if (!contact) throw new AppError("Inquiry not found", 404);
  return contact;
}
