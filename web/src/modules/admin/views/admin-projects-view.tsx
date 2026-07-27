"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import {
  createProject,
  deleteProject,
  listProjects,
  updateProject,
} from "@/lib/api/cms";
import { queryKeys } from "@/lib/api/query-keys";
import type { ProjectRecord } from "@/lib/types/cms";
import { Button } from "@/components/ui/button";
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
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<ProjectFormState>(emptyForm);

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
    <div className="space-y-6">
      <AdminPageHeader
        title="Projects"
        description="Portfolio entries shown in the work section on the homepage."
        actions={
          <Button className="rounded-xl bg-[#d6f14a] text-slate-950 hover:bg-[#c5e043]" onClick={openCreate}>
            Add project
          </Button>
        }
      />

      <div className="overflow-hidden rounded-2xl border border-[#2A2F38] bg-[#15181E]">
        <Table>
          <TableHeader>
            <TableRow className="border-[#2A2F38] hover:bg-transparent">
              <TableHead className="text-slate-400">Title</TableHead>
              <TableHead className="text-slate-400">Client</TableHead>
              <TableHead className="text-slate-400">Featured</TableHead>
              <TableHead className="text-slate-400">Order</TableHead>
              <TableHead className="text-right text-slate-400">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading && (
              <TableRow>
                <TableCell colSpan={5} className="py-10 text-center text-slate-400">
                  Loading…
                </TableCell>
              </TableRow>
            )}
            {!isLoading && !projects.length && (
              <TableRow>
                <TableCell colSpan={5} className="py-10 text-center text-slate-400">
                  No projects yet.
                </TableCell>
              </TableRow>
            )}
            {projects.map((project) => (
              <TableRow key={project._id} className="border-[#2A2F38]">
                <TableCell className="font-medium text-[#F4F2F2]">{project.title}</TableCell>
                <TableCell className="text-slate-400">{project.client ?? "—"}</TableCell>
                <TableCell className="text-slate-300">{project.featured ? "Yes" : "No"}</TableCell>
                <TableCell className="text-slate-400">{project.order}</TableCell>
                <TableCell className="space-x-2 text-right">
                  <Button size="sm" variant="ghost" onClick={() => openEdit(project)}>
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-red-400"
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
        <DialogContent className="max-h-[90vh] overflow-y-auto border-[#2A2F38] bg-[#15181E] text-[#F4F2F2]">
          <DialogHeader>
            <DialogTitle>{editingId ? "Edit project" : "New project"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-3 py-2">
            <label className="grid gap-1 text-sm">
              <span className="text-slate-400">Title</span>
              <input
                className="rounded-lg border border-[#2A2F38] bg-[#0F1115] px-3 py-2"
                value={form.title}
                onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
              />
            </label>
            <label className="grid gap-1 text-sm">
              <span className="text-slate-400">Slug</span>
              <input
                className="rounded-lg border border-[#2A2F38] bg-[#0F1115] px-3 py-2"
                value={form.slug}
                onChange={(e) => setForm((prev) => ({ ...prev, slug: e.target.value }))}
              />
            </label>
            <label className="grid gap-1 text-sm">
              <span className="text-slate-400">Client</span>
              <input
                className="rounded-lg border border-[#2A2F38] bg-[#0F1115] px-3 py-2"
                value={form.client}
                onChange={(e) => setForm((prev) => ({ ...prev, client: e.target.value }))}
              />
            </label>
            <label className="grid gap-1 text-sm">
              <span className="text-slate-400">Description</span>
              <textarea
                rows={4}
                className="rounded-lg border border-[#2A2F38] bg-[#0F1115] px-3 py-2"
                value={form.description}
                onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
              />
            </label>
            <label className="grid gap-1 text-sm">
              <span className="text-slate-400">Image URL</span>
              <input
                className="rounded-lg border border-[#2A2F38] bg-[#0F1115] px-3 py-2"
                value={form.image}
                onChange={(e) => setForm((prev) => ({ ...prev, image: e.target.value }))}
              />
            </label>
            <label className="grid gap-1 text-sm">
              <span className="text-slate-400">Project URL</span>
              <input
                className="rounded-lg border border-[#2A2F38] bg-[#0F1115] px-3 py-2"
                value={form.url}
                onChange={(e) => setForm((prev) => ({ ...prev, url: e.target.value }))}
              />
            </label>
            <label className="grid gap-1 text-sm">
              <span className="text-slate-400">Order</span>
              <input
                type="number"
                className="rounded-lg border border-[#2A2F38] bg-[#0F1115] px-3 py-2"
                value={form.order}
                onChange={(e) => setForm((prev) => ({ ...prev, order: Number(e.target.value) }))}
              />
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) => setForm((prev) => ({ ...prev, featured: e.target.checked }))}
              />
              <span className="text-slate-400">Featured on homepage</span>
            </label>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              className="bg-[#d6f14a] text-slate-950 hover:bg-[#c5e043]"
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
