"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import {
  createService,
  deleteService,
  listAdminServices,
  updateService,
} from "@/lib/api/cms";
import { queryKeys } from "@/lib/api/query-keys";
import type { ServiceRecord } from "@/lib/types/cms";
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

interface ServiceFormState {
  title: string;
  slug: string;
  description: string;
  order: number;
  active: boolean;
}

const emptyForm: ServiceFormState = {
  title: "",
  slug: "",
  description: "",
  order: 0,
  active: true,
};

function toForm(record: ServiceRecord): ServiceFormState {
  return {
    title: record.title,
    slug: record.slug,
    description: record.description,
    order: record.order,
    active: record.active,
  };
}

export function AdminServicesView() {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<ServiceFormState>(emptyForm);

  const { data: services = [], isLoading } = useQuery({
    queryKey: queryKeys.admin.services,
    queryFn: listAdminServices,
  });

  const saveMutation = useMutation({
    mutationFn: async () => {
      const payload = { ...form };
      if (editingId) {
        return updateService(editingId, payload);
      }
      return createService(payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.admin.services });
      queryClient.invalidateQueries({ queryKey: queryKeys.public.services });
      setOpen(false);
      setEditingId(null);
      setForm(emptyForm);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteService(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.admin.services });
      queryClient.invalidateQueries({ queryKey: queryKeys.public.services });
    },
  });

  function openCreate() {
    setEditingId(null);
    setForm(emptyForm);
    setOpen(true);
  }

  function openEdit(record: ServiceRecord) {
    setEditingId(record._id);
    setForm(toForm(record));
    setOpen(true);
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Services"
        description="Manage public service listings on the marketing site."
        actions={
          <Button className="rounded-xl bg-[#d6f14a] text-slate-950 hover:bg-[#c5e043]" onClick={openCreate}>
            Add service
          </Button>
        }
      />

      <div className="overflow-hidden rounded-2xl border border-[#2A2F38] bg-[#15181E]">
        <Table>
          <TableHeader>
            <TableRow className="border-[#2A2F38] hover:bg-transparent">
              <TableHead className="text-slate-400">Title</TableHead>
              <TableHead className="text-slate-400">Slug</TableHead>
              <TableHead className="text-slate-400">Order</TableHead>
              <TableHead className="text-slate-400">Active</TableHead>
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
            {!isLoading && !services.length && (
              <TableRow>
                <TableCell colSpan={5} className="py-10 text-center text-slate-400">
                  No services yet.
                </TableCell>
              </TableRow>
            )}
            {services.map((service) => (
              <TableRow key={service._id} className="border-[#2A2F38]">
                <TableCell className="font-medium text-[#F4F2F2]">{service.title}</TableCell>
                <TableCell className="text-slate-400">{service.slug}</TableCell>
                <TableCell className="text-slate-400">{service.order}</TableCell>
                <TableCell className="text-slate-300">{service.active ? "Yes" : "No"}</TableCell>
                <TableCell className="space-x-2 text-right">
                  <Button size="sm" variant="ghost" onClick={() => openEdit(service)}>
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-red-400"
                    disabled={deleteMutation.isPending}
                    onClick={() => deleteMutation.mutate(service._id)}
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
        <DialogContent className="border-[#2A2F38] bg-[#15181E] text-[#F4F2F2]">
          <DialogHeader>
            <DialogTitle>{editingId ? "Edit service" : "New service"}</DialogTitle>
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
              <span className="text-slate-400">Description</span>
              <textarea
                rows={4}
                className="rounded-lg border border-[#2A2F38] bg-[#0F1115] px-3 py-2"
                value={form.description}
                onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
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
                checked={form.active}
                onChange={(e) => setForm((prev) => ({ ...prev, active: e.target.checked }))}
              />
              <span className="text-slate-400">Active on website</span>
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
