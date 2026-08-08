import mongoose from "mongoose";

const authorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    role: { type: String },
    avatar: { type: String },
  },
  { _id: false }
);

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    category: { type: String, required: true, default: "Engineering" },
    readTime: { type: String, default: "5 min read" },
    publishedAt: { type: String },
    author: { type: authorSchema, required: true },
    coverImage: { type: String },
    featured: { type: Boolean, default: false },
    tags: [{ type: String }],
    active: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("Blog", blogSchema);
