export type ContactStatus = "new" | "read" | "replied";

export interface ContactInquiry {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  service?: string;
  message: string;
  status: ContactStatus;
  createdAt: string;
  updatedAt: string;
}

export interface ServiceRecord {
  _id: string;
  title: string;
  slug: string;
  description: string;
  icon?: string;
  order: number;
  active: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProjectRecord {
  _id: string;
  title: string;
  slug: string;
  description: string;
  client?: string;
  services?: string[];
  image?: string;
  url?: string;
  featured: boolean;
  order: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface BlogRecord {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  readTime?: string;
  publishedAt?: string;
  author: {
    name: string;
    role?: string;
    avatar?: string;
  };
  coverImage?: string;
  featured?: boolean;
  tags?: string[];
  active?: boolean;
  order?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface AdminUser {
  id: string;
  email: string;
  name: string;
}

export interface ApiListMeta {
  total: number;
  page: number;
  limit: number;
  pages: number;
}

export interface TrafficSourceRow {
  _id: string;
  count: number;
}

export interface AnalyticsStats {
  totalVisitors: number;
  totalSessions: number;
}

export interface DashboardStats {
  contacts: { total: number; new: number; read: number; replied: number };
  projects: { total: number };
  services: { total: number; active: number };
  recentContacts: Pick<
    ContactInquiry,
    "_id" | "name" | "email" | "service" | "status" | "createdAt"
  >[];
  tracking: {
    sources: TrafficSourceRow[];
    campaigns: unknown[];
    stats: AnalyticsStats;
    landingPages: { _id: string; count: number }[];
    devices: { _id: string; count: number }[];
    browsers: { _id: string; count: number }[];
    countries: { _id: string; count: number }[];
    timeSeries?: { _id: string; count: number }[];
    realtime?: { activeSessions: number };
    funnel?: { step: string; count: number; percentage: number }[];
  };
}

export interface BlogPagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ApiSuccess<T> {
  success: boolean;
  data: T;
  message?: string;
  meta?: ApiListMeta;
  pagination?: BlogPagination;
}
