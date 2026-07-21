import Service from "./service.model.js";

export async function findAllActive() {
  return Service.find({ active: true }).sort({ order: 1 });
}

export async function findBySlug(slug: string) {
  return Service.findOne({ slug, active: true });
}

export async function create(data: any) {
  return Service.create(data);
}

export async function findByIdAndUpdate(id: string, data: any) {
  return Service.findByIdAndUpdate(id, data, { new: true });
}

export async function findByIdAndDelete(id: string) {
  return Service.findByIdAndDelete(id);
}
