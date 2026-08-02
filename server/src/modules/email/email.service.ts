import { z } from "zod";
import type { Resend } from "resend";
import { config } from "../../config/index.js";
import { getResendClient, ResendClientError } from "./resend.client.js";
import type {
  SendEmailOptions,
  EmailResult,
  WelcomeEmailPayload,
  OTPEmailPayload,
  PasswordResetEmailPayload,
  VerificationEmailPayload,
  ContactNotificationPayload,
  ContactConfirmationPayload,
  InviteEmailPayload,
  MagicLinkEmailPayload,
  NotificationEmailPayload,
  InvoiceEmailPayload,
} from "./email.types.js";
import {
  EmailValidationError,
  EmailUnauthorizedError,
  EmailForbiddenError,
  EmailRateLimitError,
  EmailProviderError,
  EmailSendError,
} from "./email.types.js";
import {
  welcomeTemplate,
  otpTemplate,
  passwordResetTemplate,
  verificationTemplate,
  contactNotificationTemplate,
  contactConfirmationTemplate,
  inviteTemplate,
  magicLinkTemplate,
  notificationTemplate,
  invoiceTemplate,
} from "./email.templates.js";

// Validation Schemas
const singleEmailSchema = z.string().trim().email("Invalid email address");
const emailListSchema = z.union([
  singleEmailSchema,
  z.array(singleEmailSchema).min(1, "Email array cannot be empty"),
]);

export class EmailService {
  private resendClientSupplier: () => Resend;
  private maxRetries: number;
  private initialRetryDelayMs: number;

  constructor(
    resendClientSupplier: () => Resend = () => getResendClient(),
    maxRetries: number = 3,
    initialRetryDelayMs: number = 200
  ) {
    this.resendClientSupplier = resendClientSupplier;
    this.maxRetries = maxRetries;
    this.initialRetryDelayMs = initialRetryDelayMs;
  }

  /**
   * Helper to normalize string or string array to array
   */
  private normalizeEmailList(emails?: string | string[]): string[] | undefined {
    if (!emails) return undefined;
    return Array.isArray(emails) ? emails : [emails];
  }

  /**
   * Core sendEmail method supporting to, cc, bcc, replyTo, subject, html, text, attachments, scheduledAt, tags
   */
  public async sendEmail(options: SendEmailOptions): Promise<EmailResult> {
    const startTime = Date.now();

    // 1. Validation
    if (!options.subject || options.subject.trim() === "") {
      throw new EmailValidationError("Subject is required for sending email");
    }

    if ((!options.html || options.html.trim() === "") && (!options.text || options.text.trim() === "")) {
      throw new EmailValidationError("Either HTML or plain text body is required");
    }

    const toParse = emailListSchema.safeParse(options.to);
    if (!toParse.success) {
      throw new EmailValidationError(`Invalid 'to' email recipient: ${toParse.error.issues[0]?.message}`);
    }

    if (options.cc) {
      const ccParse = emailListSchema.safeParse(options.cc);
      if (!ccParse.success) {
        throw new EmailValidationError(`Invalid 'cc' recipient: ${ccParse.error.issues[0]?.message}`);
      }
    }

    if (options.bcc) {
      const bccParse = emailListSchema.safeParse(options.bcc);
      if (!bccParse.success) {
        throw new EmailValidationError(`Invalid 'bcc' recipient: ${bccParse.error.issues[0]?.message}`);
      }
    }

    if (options.replyTo) {
      const replyToParse = emailListSchema.safeParse(options.replyTo);
      if (!replyToParse.success) {
        throw new EmailValidationError(`Invalid 'replyTo' email: ${replyToParse.error.issues[0]?.message}`);
      }
    }

    const from = options.from || config.emailFrom;
    const toEmails = this.normalizeEmailList(options.to)!;
    const ccEmails = this.normalizeEmailList(options.cc);
    const bccEmails = this.normalizeEmailList(options.bcc);
    const replyToEmails = this.normalizeEmailList(options.replyTo || config.emailReplyTo);

    let resend: Resend;
    try {
      resend = this.resendClientSupplier();
    } catch (err: unknown) {
      if (err instanceof ResendClientError) {
        throw new EmailUnauthorizedError(err.message);
      }
      throw err;
    }

    const basePayload = {
      from,
      to: toEmails,
      subject: options.subject,
      ...(ccEmails ? { cc: ccEmails } : {}),
      ...(bccEmails ? { bcc: bccEmails } : {}),
      ...(replyToEmails ? { reply_to: replyToEmails } : {}),
      ...(options.scheduledAt ? { scheduled_at: options.scheduledAt } : {}),
      ...(options.tags ? { tags: options.tags } : {}),
      ...(options.attachments
        ? {
            attachments: options.attachments.map((att) => ({
              filename: att.filename,
              content: att.content,
              path: att.path,
              content_type: att.contentType,
            })),
          }
        : {}),
    };

    const payload = (
      options.html
        ? { ...basePayload, html: options.html, ...(options.text ? { text: options.text } : {}) }
        : { ...basePayload, text: options.text! }
    ) as Parameters<typeof resend.emails.send>[0];

    let attempt = 0;
    let lastError: unknown = null;

    while (attempt <= this.maxRetries) {
      try {
        const response = await resend.emails.send(payload);

        if (response.error) {
          const { name, message, statusCode } = response.error as { name?: string; message?: string; statusCode?: number };
          const code = statusCode || 500;

          if (code === 401 || name === "unauthorized") {
            throw new EmailUnauthorizedError(message || "Resend API unauthorized");
          }
          if (code === 403 || name === "forbidden") {
            throw new EmailForbiddenError(message || "Resend domain/action forbidden");
          }
          if (code === 429 || name === "rate_limit_exceeded") {
            throw new EmailRateLimitError(message || "Resend rate limit exceeded");
          }

          throw new EmailProviderError(message || "Resend email delivery failed", code, code >= 500 || code === 429);
        }

        const duration = Date.now() - startTime;
        const messageId = response.data?.id || "unknown_id";

        // Structured non-sensitive logging
        console.log(`[EmailService] Email sent successfully | MessageID: ${messageId} | To: ${toEmails.join(", ")} | Duration: ${duration}ms`);

        return {
          success: true,
          messageId,
          duration,
          response: (response.data as unknown as Record<string, unknown>) || {},
        };
      } catch (err: unknown) {
        lastError = err;
        const duration = Date.now() - startTime;

        // Determine if retryable
        const isRetryable =
          (err instanceof EmailRateLimitError) ||
          (err instanceof EmailProviderError && err.isRetryable) ||
          (err instanceof Error && (err.name === "FetchError" || err.message.includes("network") || err.message.includes("timeout")));

        if (isRetryable && attempt < this.maxRetries) {
          attempt++;
          const delay = this.initialRetryDelayMs * Math.pow(2, attempt - 1);
          console.warn(`[EmailService] Email send attempt ${attempt}/${this.maxRetries} failed (${(err as Error).message}). Retrying in ${delay}ms...`);
          await new Promise((resolve) => setTimeout(resolve, delay));
          continue;
        }

        console.error(`[EmailService] Email send failed permanently | To: ${toEmails.join(", ")} | Duration: ${duration}ms | Error: ${(err as Error).message}`);

        if (
          err instanceof EmailValidationError ||
          err instanceof EmailUnauthorizedError ||
          err instanceof EmailForbiddenError ||
          err instanceof EmailRateLimitError ||
          err instanceof EmailProviderError
        ) {
          throw err;
        }

        throw new EmailSendError((err as Error).message || "Failed to send email", 500, false);
      }
    }

    throw new EmailSendError(
      (lastError as Error)?.message || "Failed to send email after max retries",
      500,
      false
    );
  }

  // --- Template Convenience Methods ---

  public async sendWelcomeEmail(payload: WelcomeEmailPayload): Promise<EmailResult> {
    const template = welcomeTemplate(payload);
    return this.sendEmail({
      to: payload.to,
      subject: template.subject,
      html: template.html,
      text: template.text,
    });
  }

  public async sendOTPEmail(payload: OTPEmailPayload): Promise<EmailResult> {
    const template = otpTemplate(payload);
    return this.sendEmail({
      to: payload.to,
      subject: template.subject,
      html: template.html,
      text: template.text,
    });
  }

  public async sendPasswordResetEmail(payload: PasswordResetEmailPayload): Promise<EmailResult> {
    const template = passwordResetTemplate(payload);
    return this.sendEmail({
      to: payload.to,
      subject: template.subject,
      html: template.html,
      text: template.text,
    });
  }

  public async sendVerificationEmail(payload: VerificationEmailPayload): Promise<EmailResult> {
    const template = verificationTemplate(payload);
    return this.sendEmail({
      to: payload.to,
      subject: template.subject,
      html: template.html,
      text: template.text,
    });
  }

  /**
   * Contact email integration: Sends notification email to hello@voiceact.tech (with Reply-To set to user's email)
   * and sends an automatic confirmation email to the user.
   */
  public async sendContactEmail(payload: ContactNotificationPayload): Promise<{
    notification: EmailResult;
    confirmation: EmailResult;
  }> {
    const notifTemplate = contactNotificationTemplate(payload);
    const notification = await this.sendEmail({
      to: config.emailContact,
      replyTo: payload.email,
      subject: notifTemplate.subject,
      html: notifTemplate.html,
      text: notifTemplate.text,
    });

    const confirmPayload: ContactConfirmationPayload = { to: payload.email, name: payload.name };
    const confirmTemplate = contactConfirmationTemplate(confirmPayload);
    const confirmation = await this.sendEmail({
      to: payload.email,
      subject: confirmTemplate.subject,
      html: confirmTemplate.html,
      text: confirmTemplate.text,
    });

    return { notification, confirmation };
  }

  public async sendInviteEmail(payload: InviteEmailPayload): Promise<EmailResult> {
    const template = inviteTemplate(payload);
    return this.sendEmail({
      to: payload.to,
      subject: template.subject,
      html: template.html,
      text: template.text,
    });
  }

  public async sendMagicLinkEmail(payload: MagicLinkEmailPayload): Promise<EmailResult> {
    const template = magicLinkTemplate(payload);
    return this.sendEmail({
      to: payload.to,
      subject: template.subject,
      html: template.html,
      text: template.text,
    });
  }

  public async sendNotificationEmail(payload: NotificationEmailPayload): Promise<EmailResult> {
    const template = notificationTemplate(payload);
    return this.sendEmail({
      to: payload.to,
      subject: template.subject,
      html: template.html,
      text: template.text,
    });
  }

  public async sendInvoiceEmail(payload: InvoiceEmailPayload): Promise<EmailResult> {
    const template = invoiceTemplate(payload);
    return this.sendEmail({
      to: payload.to,
      subject: template.subject,
      html: template.html,
      text: template.text,
    });
  }
}

// Export a default singleton instance of EmailService
export const emailService = new EmailService();
