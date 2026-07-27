import nodemailer from "nodemailer";
import { config } from "../config/index.js";

function createTransport() {
  if (!config.smtp.host || !config.smtp.user || !config.smtp.pass) return null;
  return nodemailer.createTransport({
    host: config.smtp.host,
    port: config.smtp.port,
    secure: config.smtp.port === 465,
    auth: { user: config.smtp.user, pass: config.smtp.pass },
  });
}

export async function sendContactNotification(payload: {
  name: string;
  email: string;
  phone?: string;
  service?: string;
  message: string;
}) {
  const transport = createTransport();
  const to = config.adminNotifyEmail;
  if (!transport || !to) return;

  await transport.sendMail({
    from: config.smtp.from,
    to,
    subject: `New inquiry from ${payload.name}`,
    text: [
      `Name: ${payload.name}`,
      `Email: ${payload.email}`,
      payload.phone ? `Phone: ${payload.phone}` : "",
      payload.service ? `Service: ${payload.service}` : "",
      "",
      payload.message,
    ]
      .filter(Boolean)
      .join("\n"),
  });
}
