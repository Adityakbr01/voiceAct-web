export interface BlogPost {
  _id?: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: "Engineering" | "Mobile" | "Design" | "AI & Automation" | "SaaS";
  readTime: string;
  publishedAt: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  coverImage: string;
  featured?: boolean;
  tags: string[];
  active?: boolean;
  order?: number;
  createdAt?: string;
  updatedAt?: string;
}
