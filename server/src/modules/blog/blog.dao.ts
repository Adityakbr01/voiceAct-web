import Blog from "./blog.model.js";

export async function findAll() {
  return Blog.find().sort({ createdAt: -1 });
}

export async function findAllActive() {
  return Blog.find({ active: true }).sort({ createdAt: -1 });
}

export async function findBySlug(slug: string) {
  return Blog.findOne({ slug, active: true });
}

export async function create(data: any) {
  return Blog.create(data);
}

export async function findByIdAndUpdate(id: string, data: any) {
  return Blog.findByIdAndUpdate(id, data, { new: true });
}

export async function findByIdAndDelete(id: string) {
  return Blog.findByIdAndDelete(id);
}
