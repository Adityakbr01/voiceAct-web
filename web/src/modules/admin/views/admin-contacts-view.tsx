"use client";

import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Download, Search, Mail, Phone, Calendar, Tag, Eye } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { listContacts, updateContactStatus, exportContacts } from "@/lib/api/contacts";
import { queryKeys } from "@/lib/api/query-keys";
import type { ContactInquiry, ContactStatus } from "@/lib/types/cms";
import { Badge } from "@/components/ui/badge";
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

const STATUS_OPTIONS: ContactStatus[] = ["new", "read", "replied"];
type ContactFilter = ContactStatus | "all";

export function AdminContactsView() {
  const queryClient = useQueryClient();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [filter, setFilter] = useState<ContactFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [exporting, setExporting] = useState(false);
  const [selectedInquiry, setSelectedInquiry] = useState<ContactInquiry | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: queryKeys.admin.contacts(filter),
    queryFn: () =>
      listContacts({
        status: filter === "all" ? undefined : filter,
        limit: 100,
      }),
  });

  const statusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: ContactStatus }) =>
      updateContactStatus(id, status),
    onSuccess: (updatedContact) => {
      queryClient.invalidateQueries({ queryKey: ["admin", "contacts"] });
      if (selectedInquiry && selectedInquiry._id === updatedContact._id) {
        setSelectedInquiry(updatedContact);
      }
    },
  });

  const filteredItems = (data?.items ?? []).filter((item) => {
    const q = searchQuery.toLowerCase();
    return (
      item.name.toLowerCase().includes(q) ||
      item.email.toLowerCase().includes(q) ||
      (item.service ?? "").toLowerCase().includes(q) ||
      item.message.toLowerCase().includes(q)
    );
  });

  async function handleExport() {
    setExporting(true);
    try {
      const blob = await exportContacts(filter === "all" ? undefined : filter);
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `contacts-${filter}-${new Date().toISOString().slice(0, 10)}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Export failed:", err);
    } finally {
      setExporting(false);
    }
  }

  function handleOpenInquiry(inquiry: ContactInquiry) {
    setSelectedInquiry(inquiry);
    if (inquiry.status === "new") {
      statusMutation.mutate({ id: inquiry._id, status: "read" });
    }
  }

  return (
    <div className="space-y-6 font-sans">
      <AdminPageHeader
        title="Contact Inquiries"
        description="View, manage, and respond to incoming inquiries submitted through your website."
        actions={
          <Button
            size="sm"
            variant="outline"
            className={`gap-2 border rounded-none transition cursor-pointer ${
              isDark
                ? "border-[#1f1f1f] bg-[#0a0a0a] text-[#ededed] hover:bg-[#1f1f1f]"
                : "border-slate-200 bg-white text-slate-800 hover:bg-slate-100"
            }`}
            onClick={handleExport}
            disabled={exporting}
          >
            <Download className="size-4" />
            {exporting ? "Exporting…" : "Export CSV"}
          </Button>
        }
      />

      {/* Filter Tabs & Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {(["all", ...STATUS_OPTIONS] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-3 py-1.5 rounded-none text-xs font-semibold capitalize transition-all cursor-pointer ${
                filter === status
                  ? isDark
                    ? "bg-white text-black font-bold"
                    : "bg-black text-white font-bold"
                  : isDark
                    ? "bg-[#111111] border border-[#1f1f1f] text-[#a1a1a1] hover:text-[#ededed] hover:bg-[#1f1f1f]"
                    : "bg-slate-100 border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-200"
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        <div className="relative">
          <Search
            className={`w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 ${isDark ? "text-[#a1a1a1]" : "text-slate-400"}`}
          />
          <input
            type="text"
            placeholder="Search inquiries..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`text-xs pl-9 pr-4 py-2 rounded-none border focus:outline-none transition w-full sm:w-64 ${
              isDark
                ? "bg-[#111111] border-[#1f1f1f] text-[#ededed] focus:border-white"
                : "bg-slate-50 border-slate-200 text-slate-900 focus:border-black"
            }`}
          />
        </div>
      </div>

      {/* Contacts Table */}
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
                Name
              </TableHead>
              <TableHead className={isDark ? "text-[#a1a1a1]" : "text-slate-600 font-bold"}>
                Email
              </TableHead>
              <TableHead className={isDark ? "text-[#a1a1a1]" : "text-slate-600 font-bold"}>
                Service
              </TableHead>
              <TableHead className={isDark ? "text-[#a1a1a1]" : "text-slate-600 font-bold"}>
                Status
              </TableHead>
              <TableHead className={isDark ? "text-[#a1a1a1]" : "text-slate-600 font-bold"}>
                Received
              </TableHead>
              <TableHead
                className={`text-right ${isDark ? "text-[#a1a1a1]" : "text-slate-600 font-bold"}`}
              >
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading && (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className={`py-10 text-center ${isDark ? "text-[#a1a1a1]" : "text-slate-500"}`}
                >
                  Loading inquiries…
                </TableCell>
              </TableRow>
            )}
            {!isLoading && !filteredItems.length && (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className={`py-10 text-center ${isDark ? "text-[#a1a1a1]" : "text-slate-500"}`}
                >
                  No inquiries found.
                </TableCell>
              </TableRow>
            )}
            {filteredItems.map((inquiry) => (
              <TableRow
                key={inquiry._id}
                onClick={() => handleOpenInquiry(inquiry)}
                className={`border-b cursor-pointer transition-colors ${
                  isDark
                    ? "border-[#1f1f1f] hover:bg-[#111111]"
                    : "border-slate-100 hover:bg-slate-50"
                }`}
              >
                <TableCell
                  className={`font-semibold ${isDark ? "text-[#ededed]" : "text-slate-900"}`}
                >
                  {inquiry.name}
                </TableCell>
                <TableCell className={`text-xs ${isDark ? "text-slate-300" : "text-slate-700"}`}>
                  {inquiry.email}
                </TableCell>
                <TableCell className={`text-xs ${isDark ? "text-[#a1a1a1]" : "text-slate-600"}`}>
                  {inquiry.service ?? "—"}
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={`capitalize font-semibold rounded-none border ${
                      inquiry.status === "new"
                        ? "bg-amber-500/10 text-amber-400 border-amber-500/30"
                        : inquiry.status === "replied"
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                          : "bg-blue-500/10 text-blue-400 border-blue-500/30"
                    }`}
                  >
                    {inquiry.status}
                  </Badge>
                </TableCell>
                <TableCell
                  className={`text-xs font-mono ${isDark ? "text-[#a1a1a1]" : "text-slate-500"}`}
                >
                  {new Date(inquiry.createdAt).toLocaleString()}
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    size="sm"
                    variant="ghost"
                    className={`gap-1.5 text-xs font-semibold rounded-none ${isDark ? "text-[#ededed] hover:bg-[#1f1f1f]" : "text-slate-700 hover:bg-slate-100"}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenInquiry(inquiry);
                    }}
                  >
                    <Eye className="w-3.5 h-3.5" /> View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Selected Inquiry Modal */}
      <Dialog open={!!selectedInquiry} onOpenChange={(open) => !open && setSelectedInquiry(null)}>
        {selectedInquiry && (
          <DialogContent
            className={`max-w-xl border rounded-none space-y-4 ${
              isDark
                ? "border-[#1f1f1f] bg-[#0a0a0a] text-[#ededed]"
                : "border-slate-200 bg-white text-slate-900 shadow-xl"
            }`}
          >
            <DialogHeader>
              <div className="flex items-center justify-between pr-6">
                <DialogTitle
                  className={`text-xl font-bold ${isDark ? "text-[#ededed]" : "text-slate-900"}`}
                >
                  {selectedInquiry.name}
                </DialogTitle>
                <Badge
                  variant="outline"
                  className={`capitalize font-bold rounded-none border ${
                    selectedInquiry.status === "new"
                      ? "bg-amber-500/10 text-amber-400 border-amber-500/30"
                      : selectedInquiry.status === "replied"
                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                        : "bg-blue-500/10 text-blue-400 border-blue-500/30"
                  }`}
                >
                  {selectedInquiry.status}
                </Badge>
              </div>
            </DialogHeader>

            <div className="space-y-4 py-2 text-xs">
              <div
                className={`grid grid-cols-2 gap-3 p-3 rounded-none border ${
                  isDark ? "bg-[#111111] border-[#1f1f1f]" : "bg-slate-50 border-slate-200"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Mail className={`w-4 h-4 ${isDark ? "text-[#a1a1a1]" : "text-slate-400"}`} />
                  <a
                    href={`mailto:${selectedInquiry.email}`}
                    className="hover:underline truncate font-mono"
                  >
                    {selectedInquiry.email}
                  </a>
                </div>
                {selectedInquiry.phone && (
                  <div className="flex items-center gap-2">
                    <Phone className={`w-4 h-4 ${isDark ? "text-[#a1a1a1]" : "text-slate-400"}`} />
                    <span className="font-mono">{selectedInquiry.phone}</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Tag className={`w-4 h-4 ${isDark ? "text-[#a1a1a1]" : "text-slate-400"}`} />
                  <span>Service: {selectedInquiry.service ?? "General"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className={`w-4 h-4 ${isDark ? "text-[#a1a1a1]" : "text-slate-400"}`} />
                  <span>{new Date(selectedInquiry.createdAt).toLocaleString()}</span>
                </div>
              </div>

              <div className="space-y-1.5">
                <span
                  className={`font-bold uppercase tracking-wider text-[10px] ${isDark ? "text-[#a1a1a1]" : "text-slate-500"}`}
                >
                  Message Body
                </span>
                <div
                  className={`p-4 rounded-none border whitespace-pre-wrap text-sm leading-relaxed ${
                    isDark
                      ? "bg-[#111111] border-[#1f1f1f] text-[#ededed]"
                      : "bg-slate-50 border-slate-200 text-slate-800"
                  }`}
                >
                  {selectedInquiry.message}
                </div>
              </div>

              {/* Quick Status Picker */}
              <div className="flex items-center justify-between pt-2">
                <span
                  className={`text-xs font-semibold ${isDark ? "text-[#a1a1a1]" : "text-slate-600"}`}
                >
                  Update Status:
                </span>
                <div className="flex items-center gap-2">
                  {STATUS_OPTIONS.map((st) => (
                    <button
                      key={st}
                      onClick={() => statusMutation.mutate({ id: selectedInquiry._id, status: st })}
                      disabled={statusMutation.isPending}
                      className={`px-3 py-1 rounded-none text-xs font-bold capitalize transition-all cursor-pointer border ${
                        selectedInquiry.status === st
                          ? isDark
                            ? "bg-white text-black border-white"
                            : "bg-black text-white border-black"
                          : isDark
                            ? "bg-[#111111] border-[#1f1f1f] text-[#a1a1a1] hover:text-[#ededed]"
                            : "bg-slate-100 border-slate-200 text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <DialogFooter>
              <a
                href={`mailto:${selectedInquiry.email}?subject=Re:%20${encodeURIComponent(
                  selectedInquiry.service ?? "Inquiry",
                )}`}
                className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 rounded-none font-bold text-xs transition ${
                  isDark
                    ? "bg-white text-black hover:bg-slate-200"
                    : "bg-black text-white hover:bg-slate-800"
                }`}
              >
                <Mail className="w-4 h-4" /> Reply via Email
              </a>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}
