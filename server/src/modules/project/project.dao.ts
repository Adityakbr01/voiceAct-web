import Project from "./project.model.js";

export async function findAll(options: { featured?: boolean; skip?: number; limit?: number } = {}) {
  const filter: Record<string, unknown> = {};
  if (options.featured !== undefined) filter.featured = options.featured;

  const query = Project.find(filter).sort({ order: 1 });
  if (options.skip) query.skip(options.skip);
  if (options.limit) query.limit(options.limit);
  return query;
}

export async function countAll(options: { featured?: boolean } = {}) {
  const filter: Record<string, unknown> = {};
  if (options.featured !== undefined) filter.featured = options.featured;
  return Project.countDocuments(filter);
}

export async function findBySlug(slug: string) {
  return Project.findOne({ slug });
}

export async function create(data: any) {
  return Project.create(data);
}

export async function findByIdAndUpdate(id: string, data: any) {
  return Project.findByIdAndUpdate(id, data, { new: true });
}

export async function findByIdAndDelete(id: string) {
  return Project.findByIdAndDelete(id);
}
