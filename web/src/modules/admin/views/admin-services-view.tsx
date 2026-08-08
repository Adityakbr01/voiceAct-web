"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useTheme } from "@/components/theme-provider";
import { createService, deleteService, listAdminServices, updateService } from "@/lib/api/cms";
import { queryKeys } from "@/lib/api/query-keys";
import type { ServiceRecord } from "@/lib/types/cms";
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
  const { theme } = useTheme();
  const isDark = theme === "dark";

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
    <div className="space-y-6 font-sans">
      <AdminPageHeader
        title="Services"
        description="Manage public service listings on the marketing site."
        actions={
          <Button
            className={`rounded-none font-bold text-xs transition-all cursor-pointer ${
              isDark
                ? "bg-white text-black hover:bg-slate-200"
                : "bg-black text-white hover:bg-slate-800"
            }`}
            onClick={openCreate}
          >
            Add service
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
                Slug
              </TableHead>
              <TableHead className={isDark ? "text-[#a1a1a1]" : "text-slate-600 font-bold"}>
                Order
              </TableHead>
              <TableHead className={isDark ? "text-[#a1a1a1]" : "text-slate-600 font-bold"}>
                Active
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
                  Loading services…
                </TableCell>
              </TableRow>
            )}
            {!isLoading && !services.length && (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className={`py-10 text-center ${isDark ? "text-[#a1a1a1]" : "text-slate-500"}`}
                >
                  No services yet.
                </TableCell>
              </TableRow>
            )}
            {services.map((service) => (
              <TableRow
                key={service._id}
                className={`border-b transition-colors ${
                  isDark
                    ? "border-[#1f1f1f] hover:bg-[#111111]"
                    : "border-slate-100 hover:bg-slate-50"
                }`}
              >
                <TableCell
                  className={`font-semibold ${isDark ? "text-[#ededed]" : "text-slate-900"}`}
                >
                  {service.title}
                </TableCell>
                <TableCell
                  className={`font-mono text-xs ${isDark ? "text-[#a1a1a1]" : "text-slate-600"}`}
                >
                  {service.slug}
                </TableCell>
                <TableCell
                  className={`font-mono text-xs ${isDark ? "text-[#a1a1a1]" : "text-slate-600"}`}
                >
                  {service.order}
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={`capitalize font-semibold rounded-none border ${
                      service.active
                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                        : isDark
                          ? "bg-[#1f1f1f] text-[#a1a1a1] border-[#333333]"
                          : "bg-slate-100 text-slate-500 border-slate-300"
                    }`}
                  >
                    {service.active ? "Active" : "Inactive"}
                  </Badge>
                </TableCell>
                <TableCell className="space-x-2 text-right">
                  <Button
                    size="sm"
                    variant="ghost"
                    className={`text-xs font-semibold rounded-none ${isDark ? "text-[#ededed] hover:bg-[#1f1f1f]" : "text-slate-700 hover:bg-slate-100"}`}
                    onClick={() => openEdit(service)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-xs font-semibold text-red-500 hover:bg-red-500/10 rounded-none"
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
        <DialogContent
          className={`border rounded-none ${
            isDark
              ? "border-[#1f1f1f] bg-[#0a0a0a] text-[#ededed]"
              : "border-slate-200 bg-white text-slate-900 shadow-xl"
          }`}
        >
          <DialogHeader>
            <DialogTitle
              className={`text-lg font-bold ${isDark ? "text-[#ededed]" : "text-slate-900"}`}
            >
              {editingId ? "Edit Service" : "New Service"}
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
                checked={form.active}
                onChange={(e) => setForm((prev) => ({ ...prev, active: e.target.checked }))}
                className="w-4 h-4 rounded-none"
              />
              <span className={isDark ? "text-[#ededed]" : "text-slate-800"}>
                Active on website
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
