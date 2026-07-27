import Contact from "./contact.model.js";

export async function findById(id: string) {
  return Contact.findById(id);
}

export async function create(data: any) {
  return Contact.create(data);
}

export async function findAll(filter: any = {}) {
  return Contact.find(filter).sort({ createdAt: -1 });
}

export async function find(filter: any, skip: number, limit: number) {
  return Contact.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit);
}

export async function count(filter: any) {
  return Contact.countDocuments(filter);
}

export async function findByIdAndUpdate(id: string, update: any) {
  return Contact.findByIdAndUpdate(id, update, { new: true });
}
