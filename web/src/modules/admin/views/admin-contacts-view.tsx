"use client";

import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Download } from "lucide-react";
import { listContacts, updateContactStatus, exportContacts } from "@/lib/api/contacts";
import { queryKeys } from "@/lib/api/query-keys";
import type { ContactStatus } from "@/lib/types/cms";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
  const [filter, setFilter] = useState<ContactFilter>("all");
  const [exporting, setExporting] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: queryKeys.admin.contacts(filter),
    queryFn: () =>
      listContacts({
        status: filter === "all" ? undefined : filter,
        limit: 50,
      }),
  });

  const statusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: ContactStatus }) =>
      updateContactStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "contacts"] });
    },
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

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Contact inquiries"
        description="Submissions from the website contact form."
        actions={
          <Button
            size="sm"
            variant="outline"
            className="gap-2"
            onClick={handleExport}
            disabled={exporting}
          >
            <Download className="size-4" />
            {exporting ? "Exporting…" : "Export CSV"}
          </Button>
        }
      />

      <div className="flex flex-wrap gap-2">
        {(["all", ...STATUS_OPTIONS] as const).map((status) => (
          <Button
            key={status}
            size="sm"
            variant={filter === status ? "default" : "outline"}
            className="rounded-full capitalize"
            onClick={() => setFilter(status)}
          >
            {status}
          </Button>
        ))}
      </div>

      <div className="overflow-hidden rounded-2xl border border-[#2A2F38] bg-[#15181E]">
        <Table>
          <TableHeader>
            <TableRow className="border-[#2A2F38] hover:bg-transparent">
              <TableHead className="text-slate-400">Name</TableHead>
              <TableHead className="text-slate-400">Email</TableHead>
              <TableHead className="text-slate-400">Service</TableHead>
              <TableHead className="text-slate-400">Status</TableHead>
              <TableHead className="text-slate-400">Received</TableHead>
              <TableHead className="text-right text-slate-400">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading && (
              <TableRow>
                <TableCell colSpan={6} className="py-10 text-center text-slate-400">
                  Loading…
                </TableCell>
              </TableRow>
            )}
            {!isLoading && !data?.items.length && (
              <TableRow>
                <TableCell colSpan={6} className="py-10 text-center text-slate-400">
                  No inquiries yet.
                </TableCell>
              </TableRow>
            )}
            {data?.items.map((inquiry) => (
              <TableRow key={inquiry._id} className="border-[#2A2F38]">
                <TableCell className="font-medium text-[#F4F2F2]">{inquiry.name}</TableCell>
                <TableCell className="text-slate-300">{inquiry.email}</TableCell>
                <TableCell className="text-slate-400">{inquiry.service ?? "—"}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="border-[#2A2F38] capitalize">
                    {inquiry.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-xs text-slate-400">
                  {new Date(inquiry.createdAt).toLocaleString()}
                </TableCell>
                <TableCell className="space-x-1 text-right">
                  {STATUS_OPTIONS.filter((status) => status !== inquiry.status).map((status) => (
                    <Button
                      key={status}
                      size="sm"
                      variant="ghost"
                      className="text-xs capitalize"
                      disabled={statusMutation.isPending}
                      onClick={() => statusMutation.mutate({ id: inquiry._id, status })}
                    >
                      Mark {status}
                    </Button>
                  ))}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {data?.items.map((inquiry) => (
        <details
          key={`message-${inquiry._id}`}
          className="rounded-xl border border-[#2A2F38] bg-[#15181E] p-4 text-sm"
        >
          <summary className="cursor-pointer font-medium text-[#F4F2F2]">
            {inquiry.name} — message
          </summary>
          <p className="mt-3 whitespace-pre-wrap text-slate-300">{inquiry.message}</p>
        </details>
      ))}
    </div>
  );
}
