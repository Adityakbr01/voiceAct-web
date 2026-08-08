"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useTheme } from "@/components/theme-provider";
import {
  createProject,
  deleteProject,
  listProjects,
  updateProject,
  uploadImage,
} from "@/lib/api/cms";
import { queryKeys } from "@/lib/api/query-keys";
import type { ProjectRecord } from "@/lib/types/cms";
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

interface ProjectFormState {
  title: string;
  slug: string;
  description: string;
  client: string;
  featured: boolean;
  order: number;
  image: string;
  url: string;
}

const emptyForm: ProjectFormState = {
  title: "",
  slug: "",
  description: "",
  client: "",
  featured: false,
  order: 0,
  image: "",
  url: "",
};

function toForm(record: ProjectRecord): ProjectFormState {
  return {
    title: record.title,
    slug: record.slug,
    description: record.description,
    client: record.client ?? "",
    featured: record.featured,
    order: record.order,
    image: record.image ?? "",
    url: record.url ?? "",
  };
}

function toPayload(form: ProjectFormState) {
  return {
    title: form.title,
    slug: form.slug,
    description: form.description,
    client: form.client || undefined,
    featured: form.featured,
    order: form.order,
    image: form.image || undefined,
    url: form.url || undefined,
  };
}

export function AdminProjectsView() {
  const queryClient = useQueryClient();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<ProjectFormState>(emptyForm);
  const [uploading, setUploading] = useState(false);

  const { data: projects = [], isLoading } = useQuery({
    queryKey: queryKeys.admin.projects,
    queryFn: listProjects,
  });

  const saveMutation = useMutation({
    mutationFn: async () => {
      const payload = toPayload(form);
      if (editingId) {
        return updateProject(editingId, payload);
      }
      return createProject(payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.admin.projects });
      queryClient.invalidateQueries({ queryKey: queryKeys.public.projects });
      setOpen(false);
      setEditingId(null);
      setForm(emptyForm);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteProject(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.admin.projects });
      queryClient.invalidateQueries({ queryKey: queryKeys.public.projects });
    },
  });

  async function handleFileUpload(file: File) {
    setUploading(true);
    try {
      const result = await uploadImage(file);
      setForm((prev) => ({ ...prev, image: result.url }));
    } catch (err) {
      console.error("Upload failed:", err);
    } finally {
      setUploading(false);
    }
  }

  function openCreate() {
    setEditingId(null);
    setForm(emptyForm);
    setOpen(true);
  }

  function openEdit(record: ProjectRecord) {
    setEditingId(record._id);
    setForm(toForm(record));
    setOpen(true);
  }

  return (
    <div className="space-y-6 font-sans">
      <AdminPageHeader
        title="Projects"
        description="Portfolio entries shown in the work section on the homepage."
        actions={
          <Button
            className={`rounded-none font-bold text-xs transition-all cursor-pointer ${
              isDark
                ? "bg-white text-black hover:bg-slate-200"
                : "bg-black text-white hover:bg-slate-800"
            }`}
            onClick={openCreate}
          >
            Add project
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
              className={`border-b ${isDark ? "border-[#1f1f1f] hover:bg-transparent" : "border-slate-200 bg-slate-50"}`}
            >
              <TableHead className={isDark ? "text-[#a1a1a1]" : "text-slate-600 font-bold"}>
                Title
              </TableHead>
              <TableHead className={isDark ? "text-[#a1a1a1]" : "text-slate-600 font-bold"}>
                Client
              </TableHead>
              <TableHead className={isDark ? "text-[#a1a1a1]" : "text-slate-600 font-bold"}>
                Featured
              </TableHead>
              <TableHead className={isDark ? "text-[#a1a1a1]" : "text-slate-600 font-bold"}>
                Order
              </TableHead>
              <TableHead
                className={`text-right ${isDark ? "text-[#a1a1a1]" : "text-slate-600 font-bold"}`}
              >
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading && (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className={`py-10 text-center ${isDark ? "text-[#a1a1a1]" : "text-slate-500"}`}
                >
                  Loading projects…
                </TableCell>
              </TableRow>
            )}
            {!isLoading && !projects.length && (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className={`py-10 text-center ${isDark ? "text-[#a1a1a1]" : "text-slate-500"}`}
                >
                  No projects yet.
                </TableCell>
              </TableRow>
            )}
            {projects.map((project) => (
              <TableRow
                key={project._id}
                className={`border-b transition-colors ${
                  isDark
                    ? "border-[#1f1f1f] hover:bg-[#111111]"
                    : "border-slate-100 hover:bg-slate-50"
                }`}
              >
                <TableCell
                  className={`font-semibold ${isDark ? "text-[#ededed]" : "text-slate-900"}`}
                >
                  {project.title}
                </TableCell>
                <TableCell className={`text-xs ${isDark ? "text-[#a1a1a1]" : "text-slate-600"}`}>
                  {project.client ?? "—"}
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={`capitalize font-semibold rounded-none border ${
                      project.featured
                        ? "bg-amber-500/10 text-amber-400 border-amber-500/30"
                        : isDark
                          ? "bg-[#1f1f1f] text-[#a1a1a1] border-[#333333]"
                          : "bg-slate-100 text-slate-500 border-slate-300"
                    }`}
                  >
                    {project.featured ? "Featured" : "Standard"}
                  </Badge>
                </TableCell>
                <TableCell
                  className={`font-mono text-xs ${isDark ? "text-[#a1a1a1]" : "text-slate-600"}`}
                >
                  {project.order}
                </TableCell>
                <TableCell className="space-x-2 text-right">
                  <Button
                    size="sm"
                    variant="ghost"
                    className={`text-xs font-semibold rounded-none ${isDark ? "text-[#ededed] hover:bg-[#1f1f1f]" : "text-slate-700 hover:bg-slate-100"}`}
                    onClick={() => openEdit(project)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-xs font-semibold text-red-500 hover:bg-red-500/10 rounded-none"
                    disabled={deleteMutation.isPending}
                    onClick={() => deleteMutation.mutate(project._id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className={`max-h-[90vh] overflow-y-auto border rounded-none ${
            isDark
              ? "border-[#1f1f1f] bg-[#0a0a0a] text-[#ededed]"
              : "border-slate-200 bg-white text-slate-900 shadow-xl"
          }`}
        >
          <DialogHeader>
            <DialogTitle
              className={`text-lg font-bold ${isDark ? "text-[#ededed]" : "text-slate-900"}`}
            >
              {editingId ? "Edit Project" : "New Project"}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-3 py-2 text-xs">
            <label className="grid gap-1 font-semibold">
              <span className={isDark ? "text-[#a1a1a1]" : "text-slate-600"}>Title</span>
              <input
                className={`rounded-none border px-3 py-2 text-xs transition focus:outline-none ${
                  isDark
                    ? "border-[#1f1f1f] bg-[#111111] text-[#ededed] focus:border-white"
                    : "border-slate-200 bg-slate-50 text-slate-900 focus:border-black"
                }`}
                value={form.title}
                onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
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
            <label className="grid gap-1 font-semibold">
              <span className={isDark ? "text-[#a1a1a1]" : "text-slate-600"}>Client</span>
              <input
                className={`rounded-none border px-3 py-2 text-xs transition focus:outline-none ${
                  isDark
                    ? "border-[#1f1f1f] bg-[#111111] text-[#ededed] focus:border-white"
                    : "border-slate-200 bg-slate-50 text-slate-900 focus:border-black"
                }`}
                value={form.client}
                onChange={(e) => setForm((prev) => ({ ...prev, client: e.target.value }))}
              />
            </label>
            <label className="grid gap-1 font-semibold">
              <span className={isDark ? "text-[#a1a1a1]" : "text-slate-600"}>Description</span>
              <textarea
                rows={4}
                className={`rounded-none border px-3 py-2 text-xs transition focus:outline-none ${
                  isDark
                    ? "border-[#1f1f1f] bg-[#111111] text-[#ededed] focus:border-white"
                    : "border-slate-200 bg-slate-50 text-slate-900 focus:border-black"
                }`}
                value={form.description}
                onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
              />
            </label>
            <div className="grid gap-1 font-semibold">
              <span className={isDark ? "text-[#a1a1a1]" : "text-slate-600"}>Project Image</span>
              <div className="flex items-center gap-2">
                <input
                  className={`flex-1 rounded-none border px-3 py-2 text-xs transition focus:outline-none ${
                    isDark
                      ? "border-[#1f1f1f] bg-[#111111] text-[#ededed] focus:border-white"
                      : "border-slate-200 bg-slate-50 text-slate-900 focus:border-black"
                  }`}
                  value={form.image}
                  onChange={(e) => setForm((prev) => ({ ...prev, image: e.target.value }))}
                  placeholder="URL or upload an image file"
                />
                <label
                  className={`cursor-pointer rounded-none px-3 py-2 text-xs font-semibold border transition ${
                    isDark
                      ? "bg-[#1f1f1f] border-[#333333] text-[#ededed] hover:bg-[#2a2a2a]"
                      : "bg-slate-100 border-slate-300 text-slate-800 hover:bg-slate-200"
                  }`}
                >
                  {uploading ? "Uploading…" : "Upload"}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFileUpload(file);
                    }}
                  />
                </label>
              </div>
            </div>
            <label className="grid gap-1 font-semibold">
              <span className={isDark ? "text-[#a1a1a1]" : "text-slate-600"}>Project URL</span>
              <input
                className={`rounded-none border px-3 py-2 text-xs transition focus:outline-none ${
                  isDark
                    ? "border-[#1f1f1f] bg-[#111111] text-[#ededed] focus:border-white"
                    : "border-slate-200 bg-slate-50 text-slate-900 focus:border-black"
                }`}
                value={form.url}
                onChange={(e) => setForm((prev) => ({ ...prev, url: e.target.value }))}
              />
            </label>
            <label className="grid gap-1 font-semibold">
              <span className={isDark ? "text-[#a1a1a1]" : "text-slate-600"}>Order</span>
              <input
                type="number"
                className={`rounded-none border px-3 py-2 text-xs transition focus:outline-none ${
                  isDark
                    ? "border-[#1f1f1f] bg-[#111111] text-[#ededed] focus:border-white"
                    : "border-slate-200 bg-slate-50 text-slate-900 focus:border-black"
                }`}
                value={form.order}
                onChange={(e) => setForm((prev) => ({ ...prev, order: Number(e.target.value) }))}
              />
            </label>
            <label className="flex items-center gap-2 font-semibold cursor-pointer pt-1">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) => setForm((prev) => ({ ...prev, featured: e.target.checked }))}
                className="w-4 h-4 rounded-none"
              />
              <span className={isDark ? "text-[#ededed]" : "text-slate-800"}>
                Featured on homepage
              </span>
            </label>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              className={`rounded-none ${isDark ? "border-[#1f1f1f] bg-[#111111] text-[#ededed]" : "border-slate-200 bg-slate-100 text-slate-700"}`}
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
              disabled={saveMutation.isPending || !form.title || !form.slug || !form.description}
              onClick={() => saveMutation.mutate()}
            >
              {saveMutation.isPending ? "Saving…" : "Save"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
