import Service from "./service.model.js";

export async function findAll() {
  return Service.find().sort({ order: 1 });
}

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

export async function bulkUpdateOrder(items: { id: string; order: number }[]) {
  const ops = items.map((item) => ({
    updateOne: { filter: { _id: item.id }, update: { $set: { order: item.order } } },
  }));
  if (!ops.length) return;
  await Service.bulkWrite(ops);
}
