"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useTheme } from "@/components/theme-provider";
import { blogPosts, type BlogPost } from "@/modules/blog-data";
import { createBlog, deleteBlog, listAdminBlogs, updateBlog } from "@/lib/api/cms";
import { queryKeys } from "@/lib/api/query-keys";
import type { BlogRecord } from "@/lib/types/cms";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AdminPageHeader } from "@/modules/admin/components/admin-page-header";

interface BlogFormState {
  title: string;
  slug: string;
  category: BlogPost["category"];
  readTime: string;
  excerpt: string;
  content: string;
  authorName: string;
  authorRole: string;
  active: boolean;
}

const emptyForm: BlogFormState = {
  title: "",
  slug: "",
  category: "Engineering",
  readTime: "5 min read",
  excerpt: "",
  content: "",
  authorName: "Aditya Kumar",
  authorRole: "Founder & Lead Architect",
  active: true,
};

export function AdminBlogsView() {
  const queryClient = useQueryClient();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<BlogFormState>(emptyForm);

  const query = useQuery({
    queryKey: queryKeys.admin.blogs,
    queryFn: listAdminBlogs,
    staleTime: 30_000,
  });

  const createMutation = useMutation({
    mutationFn: createBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.admin.blogs });
      queryClient.invalidateQueries({ queryKey: queryKeys.public.blogs });
      setOpen(false);
      setEditingId(null);
      setForm(emptyForm);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<BlogRecord> }) =>
      updateBlog(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.admin.blogs });
      queryClient.invalidateQueries({ queryKey: queryKeys.public.blogs });
      setOpen(false);
      setEditingId(null);
      setForm(emptyForm);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.admin.blogs });
      queryClient.invalidateQueries({ queryKey: queryKeys.public.blogs });
    },
  });

  // Map API records to local blog list with static fallback
  const postsList: (BlogRecord | BlogPost)[] =
    query.data && query.data.length > 0
      ? query.data
      : blogPosts.map((p, idx) => ({
          _id: `static-${idx}`,
          slug: p.slug,
          title: p.title,
          excerpt: p.excerpt,
          content: p.content,
          category: p.category,
          readTime: p.readTime,
          publishedAt: p.publishedAt,
          author: p.author,
          coverImage: p.coverImage,
          featured: p.featured ?? false,
          tags: p.tags,
          active: true,
          order: idx + 1,
        }));

  function openCreate() {
    setEditingId(null);
    setForm(emptyForm);
    setOpen(true);
  }

  function openEdit(post: BlogRecord | BlogPost) {
    const id = "_id" in post && post._id && !post._id.startsWith("static-") ? post._id : null;
    setEditingId(id);
    setForm({
      title: post.title,
      slug: post.slug,
      category: (post.category as BlogPost["category"]) || "Engineering",
      readTime: post.readTime || "5 min read",
      excerpt: post.excerpt,
      content: post.content,
      authorName: post.author.name,
      authorRole: post.author.role || "Architect",
      active: ("active" in post ? post.active : true) ?? true,
    });
    setOpen(true);
  }

  function handleSave() {
    if (!form.title || !form.slug || !form.content) return;

    const payload: Partial<BlogRecord> & { title: string; slug: string; excerpt: string; content: string } = {
      title: form.title,
      slug: form.slug,
      category: form.category,
      readTime: form.readTime,
      excerpt: form.excerpt,
      content: form.content,
      author: {
        name: form.authorName,
        role: form.authorRole,
        avatar: "https://github.com/Adityakbr01.png",
      },
      coverImage:
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop",
      tags: [form.category, "SEO", "Tech"],
      active: form.active,
    };

    if (editingId) {
      updateMutation.mutate({ id: editingId, payload });
    } else {
      createMutation.mutate(payload);
    }
  }

  function handleDelete(item: BlogRecord | BlogPost) {
    if ("_id" in item && item._id && !item._id.startsWith("static-")) {
      if (confirm(`Are you sure you want to delete "${item.title}"?`)) {
        deleteMutation.mutate(item._id);
      }
    }
  }

  const isSaving = createMutation.isPending || updateMutation.isPending;

  return (
    <div className="space-y-6 font-sans">
      <AdminPageHeader
        title="Blog Posts (CMS)"
        description="Create, edit, and manage articles published on the agency blog."
        actions={
          <Button
            className={`rounded-none font-bold text-xs transition-all cursor-pointer ${
              isDark
                ? "bg-white text-black hover:bg-slate-200"
                : "bg-black text-white hover:bg-slate-800"
            }`}
            onClick={openCreate}
          >
            Create New Article
          </Button>
        }
      />

      <div
        className={`overflow-hidden rounded-none border ${
          isDark ? "border-[#1f1f1f] bg-[#0a0a0a]" : "border-slate-200 bg-white shadow-sm"
        }`}
      >
        <Table>
          <TableHeader>
            <TableRow
              className={`border-b ${
                isDark ? "border-[#1f1f1f] hover:bg-transparent" : "border-slate-200 bg-slate-50"
              }`}
            >
              <TableHead className={isDark ? "text-[#a1a1a1]" : "text-slate-600 font-bold"}>
                Article Title
              </TableHead>
              <TableHead className={isDark ? "text-[#a1a1a1]" : "text-slate-600 font-bold"}>
                Category
              </TableHead>
              <TableHead className={isDark ? "text-[#a1a1a1]" : "text-slate-600 font-bold"}>
                Date
              </TableHead>
              <TableHead className={isDark ? "text-[#a1a1a1]" : "text-slate-600 font-bold"}>
                Author
              </TableHead>
              <TableHead
                className={`text-right ${isDark ? "text-[#a1a1a1]" : "text-slate-600 font-bold"}`}
              >
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {postsList.map((post) => (
              <TableRow
                key={post.slug}
                className={`border-b transition-colors ${
                  isDark
                    ? "border-[#1f1f1f] hover:bg-[#111111]"
                    : "border-slate-100 hover:bg-slate-50"
                }`}
              >
                <TableCell
                  className={`font-semibold ${isDark ? "text-[#ededed]" : "text-slate-900"}`}
                >
                  <div>
                    <p className="font-bold text-sm">{post.title}</p>
                    <p
                      className={`font-mono text-[11px] ${isDark ? "text-[#a1a1a1]" : "text-slate-500"}`}
                    >
                      /blog/{post.slug}
                    </p>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className="bg-primary/10 text-primary border-primary/20 rounded-none font-semibold text-[11px]"
                  >
                    {post.category}
                  </Badge>
                </TableCell>
                <TableCell className={`text-xs ${isDark ? "text-[#a1a1a1]" : "text-slate-600"}`}>
                  {post.publishedAt || "Recently"}
                </TableCell>
                <TableCell
                  className={`text-xs font-medium ${isDark ? "text-[#ededed]" : "text-slate-900"}`}
                >
                  {post.author.name}
                </TableCell>
                <TableCell className="space-x-2 text-right">
                  <Button
                    size="sm"
                    variant="ghost"
                    className={`text-xs font-semibold rounded-none ${
                      isDark
                        ? "text-[#ededed] hover:bg-[#1f1f1f]"
                        : "text-slate-700 hover:bg-slate-100"
                    }`}
                    onClick={() => openEdit(post)}
                  >
                    Edit
                  </Button>
                  {"_id" in post && post._id && !post._id.startsWith("static-") && (
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-xs font-semibold text-red-500 hover:bg-red-500/10 rounded-none"
                      onClick={() => handleDelete(post)}
                    >
                      Delete
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className={`border rounded-none max-w-2xl max-h-[90vh] overflow-y-auto ${
            isDark
              ? "border-[#1f1f1f] bg-[#0a0a0a] text-[#ededed]"
              : "border-slate-200 bg-white text-slate-900 shadow-xl"
          }`}
        >
          <DialogHeader>
            <DialogTitle
              className={`text-lg font-bold ${isDark ? "text-[#ededed]" : "text-slate-900"}`}
            >
              {editingId ? "Edit Article" : "Create New Article"}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-3 py-2 text-xs">
            <div className="grid grid-cols-2 gap-3">
              <label className="grid gap-1 font-semibold">
                <span className={isDark ? "text-[#a1a1a1]" : "text-slate-600"}>Article Title</span>
                <input
                  className={`rounded-none border px-3 py-2 text-xs transition focus:outline-none ${
                    isDark
                      ? "border-[#1f1f1f] bg-[#111111] text-[#ededed] focus:border-white"
                      : "border-slate-200 bg-slate-50 text-slate-900 focus:border-black"
                  }`}
                  value={form.title}
                  onChange={(e) => {
                    const title = e.target.value;
                    const slug = title
                      .toLowerCase()
                      .replace(/[^a-z0-9]+/g, "-")
                      .replace(/^-|-$/g, "");
                    setForm((prev) => ({ ...prev, title, slug: prev.slug || slug }));
                  }}
                />
              </label>
              <label className="grid gap-1 font-semibold">
                <span className={isDark ? "text-[#a1a1a1]" : "text-slate-600"}>Slug</span>
                <input
                  className={`rounded-none border px-3 py-2 text-xs transition focus:outline-none ${
                    isDark
                      ? "border-[#1f1f1f] bg-[#111111] text-[#ededed] focus:border-white"
                      : "border-slate-200 bg-slate-50 text-slate-900 focus:border-black"
                  }`}
                  value={form.slug}
                  onChange={(e) => setForm((prev) => ({ ...prev, slug: e.target.value }))}
                />
              </label>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <label className="grid gap-1 font-semibold">
                <span className={isDark ? "text-[#a1a1a1]" : "text-slate-600"}>Category</span>
                <select
                  className={`rounded-none border px-3 py-2 text-xs transition focus:outline-none ${
                    isDark
                      ? "border-[#1f1f1f] bg-[#111111] text-[#ededed] focus:border-white"
                      : "border-slate-200 bg-slate-50 text-slate-900 focus:border-black"
                  }`}
                  value={form.category}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      category: e.target.value as BlogPost["category"],
                    }))
                  }
                >
                  <option value="Engineering">Engineering</option>
                  <option value="Mobile">Mobile</option>
                  <option value="Design">Design</option>
                  <option value="AI & Automation">AI & Automation</option>
                  <option value="SaaS">SaaS</option>
                </select>
              </label>
              <label className="grid gap-1 font-semibold">
                <span className={isDark ? "text-[#a1a1a1]" : "text-slate-600"}>
                  Estimated Read Time
                </span>
                <input
                  className={`rounded-none border px-3 py-2 text-xs transition focus:outline-none ${
                    isDark
                      ? "border-[#1f1f1f] bg-[#111111] text-[#ededed] focus:border-white"
                      : "border-slate-200 bg-slate-50 text-slate-900 focus:border-black"
                  }`}
                  value={form.readTime}
                  onChange={(e) => setForm((prev) => ({ ...prev, readTime: e.target.value }))}
                />
              </label>
            </div>

            <label className="grid gap-1 font-semibold">
              <span className={isDark ? "text-[#a1a1a1]" : "text-slate-600"}>
                Excerpt / Meta Summary
              </span>
              <textarea
                rows={2}
                className={`rounded-none border px-3 py-2 text-xs transition focus:outline-none ${
                  isDark
                    ? "border-[#1f1f1f] bg-[#111111] text-[#ededed] focus:border-white"
                    : "border-slate-200 bg-slate-50 text-slate-900 focus:border-black"
                }`}
                value={form.excerpt}
                onChange={(e) => setForm((prev) => ({ ...prev, excerpt: e.target.value }))}
              />
            </label>

            <label className="grid gap-1 font-semibold">
              <span className={isDark ? "text-[#a1a1a1]" : "text-slate-600"}>
                Article Body Content (Markdown)
              </span>
              <textarea
                rows={8}
                className={`rounded-none border px-3 py-2 text-xs font-mono transition focus:outline-none ${
                  isDark
                    ? "border-[#1f1f1f] bg-[#111111] text-[#ededed] focus:border-white"
                    : "border-slate-200 bg-slate-50 text-slate-900 focus:border-black"
                }`}
                value={form.content}
                onChange={(e) => setForm((prev) => ({ ...prev, content: e.target.value }))}
              />
            </label>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              className={`rounded-none ${
                isDark
                  ? "border-[#1f1f1f] bg-[#111111] text-[#ededed]"
                  : "border-slate-200 bg-slate-100 text-slate-700"
              }`}
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button
              className={`rounded-none font-bold text-xs ${
                isDark
                  ? "bg-white text-black hover:bg-slate-200"
                  : "bg-black text-white hover:bg-slate-800"
              }`}
              disabled={!form.title || !form.slug || !form.content || isSaving}
              onClick={handleSave}
            >
              {isSaving ? "Saving..." : "Save Article"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
