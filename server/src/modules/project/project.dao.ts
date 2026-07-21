import Project from "./project.model.js";

export async function findAll() {
  return Project.find().sort({ order: 1 });
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
