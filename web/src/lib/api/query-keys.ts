export const queryKeys = {
  public: {
    services: ["public", "services"] as const,
    projects: ["public", "projects"] as const,
    blogs: ["public", "blogs"] as const,
    blogBySlug: (slug: string) => ["public", "blogs", slug] as const,
  },
  admin: {
    contacts: (filter: string) => ["admin", "contacts", filter] as const,
    services: ["admin", "services"] as const,
    projects: ["admin", "projects"] as const,
    blogs: ["admin", "blogs"] as const,
    stats: (period: string) => ["admin", "stats", period] as const,
    analytics: (period: string) => ["admin", "analytics", period] as const,
  },
} as const;
