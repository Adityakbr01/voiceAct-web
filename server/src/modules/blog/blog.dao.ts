import Blog from "./blog.model.js";

export async function findAll() {
  return Blog.find().sort({ createdAt: -1 });
}

export async function findAllActive() {
  return Blog.find({ active: true }).sort({ createdAt: -1 });
}

export async function findPaginatedActive({
  page = 1,
  limit = 6,
  category,
}: {
  page?: number;
  limit?: number;
  category?: string;
}) {
  const query: any = { active: true };
  if (category && category !== "All") {
    query.category = { $regex: new RegExp(`^${category}$`, "i") };
  }

  const skip = (page - 1) * limit;
  const [data, total] = await Promise.all([
    Blog.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit),
    Blog.countDocuments(query),
  ]);

  return {
    data,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit) || 1,
    },
  };
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
