import { describe, test, expect, beforeEach, mock } from "bun:test";
import "../setup.js";
import type { Resend } from "resend";
import { EmailService } from "../../modules/email/email.service.js";
import {
  EmailValidationError,
  EmailUnauthorizedError,
  EmailForbiddenError,
  EmailRateLimitError,
  EmailProviderError,
} from "../../modules/email/email.types.js";
import { getResendClient, resetResendClient, ResendClientError } from "../../modules/email/resend.client.js";

describe("EmailService & Resend Integration", () => {
  beforeEach(() => {
    resetResendClient();
  });

  describe("Resend Client Singleton", () => {
    test("should throw ResendClientError if RESEND_API_KEY is missing", () => {
      const originalKey = process.env.RESEND_API_KEY;
      delete process.env.RESEND_API_KEY;

      expect(() => getResendClient()).toThrow(ResendClientError);

      process.env.RESEND_API_KEY = originalKey || "re_test_123456";
    });

    test("should return lazy initialized singleton when API key is present", () => {
      process.env.RESEND_API_KEY = "re_test_key_123";
      const client1 = getResendClient();
      const client2 = getResendClient();

      expect(client1).toBeDefined();
      expect(client1).toBe(client2);
    });
  });

  describe("Email Validation", () => {
    const mockResend = {
      emails: {
        send: mock(async () => ({ data: { id: "msg_123" }, error: null })),
      },
    } as unknown as Resend;

    const emailService = new EmailService(() => mockResend, 0, 10);

    test("should throw EmailValidationError if subject is missing", async () => {
      expect(
        emailService.sendEmail({
          to: "user@example.com",
          subject: "   ",
          html: "<p>Hello</p>",
        })
      ).rejects.toThrow(EmailValidationError);
    });

    test("should throw EmailValidationError if both html and text are missing", async () => {
      expect(
        emailService.sendEmail({
          to: "user@example.com",
          subject: "Welcome",
        })
      ).rejects.toThrow(EmailValidationError);
    });

    test("should throw EmailValidationError if recipient email format is invalid", async () => {
      expect(
        emailService.sendEmail({
          to: "invalid-email-address",
          subject: "Test",
          html: "<p>Test</p>",
        })
      ).rejects.toThrow(EmailValidationError);
    });

    test("should throw EmailValidationError if replyTo email format is invalid", async () => {
      expect(
        emailService.sendEmail({
          to: "user@example.com",
          replyTo: "not-an-email",
          subject: "Test",
          html: "<p>Test</p>",
        })
      ).rejects.toThrow(EmailValidationError);
    });
  });

  describe("Successful Email Sending", () => {
    test("should successfully send email with full options", async () => {
      const mockSend = mock(async () => ({
        data: { id: "msg_success_999" },
        error: null,
      }));

      const mockResend = { emails: { send: mockSend } } as unknown as Resend;
      const emailService = new EmailService(() => mockResend, 0, 10);

      const result = await emailService.sendEmail({
        to: "client@example.com",
        cc: ["manager@example.com"],
        bcc: ["audit@example.com"],
        replyTo: "support@voiceact.tech",
        subject: "Invoice Ready",
        html: "<p>Your invoice</p>",
        text: "Your invoice",
        tags: [{ name: "category", value: "billing" }],
        scheduledAt: "2026-09-01T10:00:00Z",
      });

      expect(result.success).toBe(true);
      expect(result.messageId).toBe("msg_success_999");
      expect(result.duration).toBeGreaterThanOrEqual(0);
      expect(mockSend).toHaveBeenCalledTimes(1);
    });
  });

  describe("Email Templates Methods", () => {
    let mockSend: ReturnType<typeof mock>;
    let emailService: EmailService;

    beforeEach(() => {
      mockSend = mock(async () => ({
        data: { id: "msg_template_123" },
        error: null,
      }));
      const mockResend = { emails: { send: mockSend } } as unknown as Resend;
      emailService = new EmailService(() => mockResend, 0, 10);
    });

    test("should send Welcome Email", async () => {
      const res = await emailService.sendWelcomeEmail({
        to: "newuser@example.com",
        name: "Alice",
      });
      expect(res.success).toBe(true);
      expect(mockSend).toHaveBeenCalledTimes(1);
    });

    test("should send OTP Email", async () => {
      const res = await emailService.sendOTPEmail({
        to: "user@example.com",
        name: "Bob",
        otpCode: "849201",
      });
      expect(res.success).toBe(true);
    });

    test("should send Password Reset Email", async () => {
      const res = await emailService.sendPasswordResetEmail({
        to: "user@example.com",
        name: "Charlie",
        resetUrl: "https://voiceact.tech/reset?token=xyz",
      });
      expect(res.success).toBe(true);
    });

    test("should send Email Verification Email", async () => {
      const res = await emailService.sendVerificationEmail({
        to: "user@example.com",
        name: "Dave",
        verificationUrl: "https://voiceact.tech/verify?token=abc",
      });
      expect(res.success).toBe(true);
    });

    test("should send Contact Form Notification and Confirmation emails", async () => {
      const res = await emailService.sendContactEmail({
        name: "Eva",
        email: "eva@example.com",
        phone: "+1999888777",
        service: "voice-over",
        message: "Need voiceover services",
      });
      expect(res.notification.success).toBe(true);
      expect(res.confirmation.success).toBe(true);
      expect(mockSend).toHaveBeenCalledTimes(2);
    });

    test("should send Invite Email", async () => {
      const res = await emailService.sendInviteEmail({
        to: "colleague@example.com",
        inviterName: "Frank",
        inviteUrl: "https://voiceact.tech/invite/123",
        role: "Editor",
      });
      expect(res.success).toBe(true);
    });

    test("should send Magic Link Email", async () => {
      const res = await emailService.sendMagicLinkEmail({
        to: "user@example.com",
        name: "Grace",
        magicLinkUrl: "https://voiceact.tech/magic?token=999",
      });
      expect(res.success).toBe(true);
    });

    test("should send Notification Email", async () => {
      const res = await emailService.sendNotificationEmail({
        to: "user@example.com",
        name: "Hank",
        title: "Account Security Update",
        message: "Your password was updated successfully.",
      });
      expect(res.success).toBe(true);
    });

    test("should send Invoice Email", async () => {
      const res = await emailService.sendInvoiceEmail({
        to: "client@example.com",
        name: "Ivy",
        invoiceNumber: "INV-2026-001",
        amount: "$1,500.00",
        dueDate: "2026-08-15",
      });
      expect(res.success).toBe(true);
    });
  });

  describe("Error Handling & Retries", () => {
    test("should handle 401 Unauthorized provider error", async () => {
      const mockResend = {
        emails: {
          send: mock(async () => ({
            data: null,
            error: { statusCode: 401, message: "Invalid API key" },
          })),
        },
      } as unknown as Resend;

      const emailService = new EmailService(() => mockResend, 2, 5);

      expect(
        emailService.sendEmail({
          to: "test@example.com",
          subject: "Test",
          html: "<p>Test</p>",
        })
      ).rejects.toThrow(EmailUnauthorizedError);
    });

    test("should handle 403 Forbidden provider error", async () => {
      const mockResend = {
        emails: {
          send: mock(async () => ({
            data: null,
            error: { statusCode: 403, message: "Domain not verified" },
          })),
        },
      } as unknown as Resend;

      const emailService = new EmailService(() => mockResend, 2, 5);

      expect(
        emailService.sendEmail({
          to: "test@example.com",
          subject: "Test",
          html: "<p>Test</p>",
        })
      ).rejects.toThrow(EmailForbiddenError);
    });

    test("should retry on 429 Rate Limit error and throw EmailRateLimitError if retries exhausted", async () => {
      let attempts = 0;
      const mockResend = {
        emails: {
          send: mock(async () => {
            attempts++;
            return {
              data: null,
              error: { statusCode: 429, message: "Rate limit exceeded" },
            };
          }),
        },
      } as unknown as Resend;

      const emailService = new EmailService(() => mockResend, 2, 5);

      expect(
        emailService.sendEmail({
          to: "test@example.com",
          subject: "Test",
          html: "<p>Test</p>",
        })
      ).rejects.toThrow(EmailRateLimitError);

      // Initial call + 2 retries = 3 attempts total
      expect(attempts).toBe(3);
    });

    test("should retry transient server errors and succeed on subsequent attempt", async () => {
      let attempts = 0;
      const mockResend = {
        emails: {
          send: mock(async () => {
            attempts++;
            if (attempts === 1) {
              return {
                data: null,
                error: { statusCode: 503, message: "Service Unavailable" },
              };
            }
            return { data: { id: "msg_retry_success" }, error: null };
          }),
        },
      } as unknown as Resend;

      const emailService = new EmailService(() => mockResend, 2, 5);

      const result = await emailService.sendEmail({
        to: "test@example.com",
        subject: "Test",
        html: "<p>Test</p>",
      });

      expect(result.success).toBe(true);
      expect(result.messageId).toBe("msg_retry_success");
      expect(attempts).toBe(2);
    });
  });
});
