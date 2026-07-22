import { Request, Response } from "express";
import * as contactService from "./contact.service.js";
import { parsePagination } from "../../utils/pagination.js";

export async function submit(req: Request, res: Response) {
  const contact = await contactService.submitContact(req.body, req.tracking);
  res.status(201).json({ success: true, message: "Inquiry submitted", data: contact });
}

export async function list(req: Request, res: Response) {
  const { status } = req.query;
  const { page, limit, skip } = parsePagination(req.query as any);
  const { data, total } = await contactService.getContacts({ status: status as string, skip, limit });
  res.json({ success: true, data, meta: { total, page, limit, pages: Math.ceil(total / limit) } });
}

export async function updateStatus(req: Request, res: Response) {
  const contact = await contactService.updateContactStatus(req.params.id, req.body.status);
  res.json({ success: true, data: contact });
}
