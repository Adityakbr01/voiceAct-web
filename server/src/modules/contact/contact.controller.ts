import { Request, Response } from "express";
import * as contactService from "./contact.service.js";
import { parsePagination } from "../../utils/pagination.js";
import { sendSuccess, sendCreated, sendPaginated } from "../../utils/response.js";

export async function submit(req: Request, res: Response) {
  const contact = await contactService.submitContact(req.body, req.tracking);
  sendCreated(res, contact, "Inquiry submitted");
}

export async function list(req: Request, res: Response) {
  const { status } = req.query;
  const { page, limit, skip } = parsePagination(req.query as Record<string, string>);
  const { data, total } = await contactService.getContacts({
    status: status as string | undefined,
    skip,
    limit,
  });
  sendPaginated(res, data, total, page, limit);
}

export async function getById(req: Request, res: Response) {
  const contact = await contactService.getContactById(req.params.id as string);
  sendSuccess(res, contact);
}

export async function exportCsv(req: Request, res: Response) {
  const { status } = req.query;
  const contacts = await contactService.exportContacts(status as string | undefined);

  const header = "id,name,email,phone,service,status,message,createdAt\n";
  const rows = contacts
    .map((c) =>
      [
        c._id,
        `"${c.name.replace(/"/g, '""')}"`,
        c.email,
        c.phone ?? "",
        c.service ?? "",
        c.status,
        `"${c.message.replace(/"/g, '""')}"`,
        c.createdAt.toISOString(),
      ].join(",")
    )
    .join("\n");

  res.setHeader("Content-Type", "text/csv");
  res.setHeader("Content-Disposition", 'attachment; filename="contacts.csv"');
  res.send(header + rows);
}

export async function updateStatus(req: Request, res: Response) {
  const contact = await contactService.updateContactStatus(req.params.id as string, req.body.status);
  sendSuccess(res, contact);
}
