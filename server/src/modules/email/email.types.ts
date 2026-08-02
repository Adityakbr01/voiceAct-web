export interface EmailAttachment {
  filename: string;
  content?: string | Buffer;
  path?: string;
  contentType?: string;
}

export interface EmailTag {
  name: string;
  value: string;
}

export interface SendEmailOptions {
  to: string | string[];
  from?: string;
  cc?: string | string[];
  bcc?: string | string[];
  replyTo?: string | string[];
  subject: string;
  html?: string;
  text?: string;
  attachments?: EmailAttachment[];
  scheduledAt?: string;
  tags?: EmailTag[];
}

export interface EmailResult {
  success: boolean;
  messageId: string;
  duration: number;
  response?: Record<string, unknown>;
}

export interface WelcomeEmailPayload {
  to: string;
  name: string;
  loginUrl?: string;
}

export interface OTPEmailPayload {
  to: string;
  name: string;
  otpCode: string;
  expiresInMinutes?: number;
}

export interface PasswordResetEmailPayload {
  to: string;
  name: string;
  resetUrl: string;
  expiresInMinutes?: number;
}

export interface VerificationEmailPayload {
  to: string;
  name: string;
  verificationUrl: string;
}

export interface ContactNotificationPayload {
  name: string;
  email: string;
  phone?: string;
  service?: string;
  message: string;
}

export interface ContactConfirmationPayload {
  to: string;
  name: string;
}

export interface InviteEmailPayload {
  to: string;
  inviterName: string;
  inviteUrl: string;
  role?: string;
}

export interface MagicLinkEmailPayload {
  to: string;
  name: string;
  magicLinkUrl: string;
  expiresInMinutes?: number;
}

export interface NotificationEmailPayload {
  to: string;
  name: string;
  title: string;
  message: string;
  actionUrl?: string;
  actionText?: string;
}

export interface InvoiceEmailPayload {
  to: string;
  name: string;
  invoiceNumber: string;
  amount: string;
  dueDate: string;
  downloadUrl?: string;
}

// Typed Error Classes
export class BaseEmailError extends Error {
  public readonly statusCode: number;
  public readonly isRetryable: boolean;

  constructor(message: string, statusCode: number = 500, isRetryable: boolean = false) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.isRetryable = isRetryable;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class EmailValidationError extends BaseEmailError {
  constructor(message: string) {
    super(message, 400, false);
  }
}

export class EmailUnauthorizedError extends BaseEmailError {
  constructor(message: string = "Invalid Resend API Key or Unauthorized access") {
    super(message, 401, false);
  }
}

export class EmailForbiddenError extends BaseEmailError {
  constructor(message: string = "Domain or action forbidden by Resend provider") {
    super(message, 403, false);
  }
}

export class EmailRateLimitError extends BaseEmailError {
  constructor(message: string = "Resend rate limit exceeded (429)") {
    super(message, 429, true);
  }
}

export class EmailProviderError extends BaseEmailError {
  constructor(message: string, statusCode: number = 500, isRetryable: boolean = true) {
    super(message, statusCode, isRetryable);
  }
}

export class EmailSendError extends BaseEmailError {
  constructor(message: string, statusCode: number = 500, isRetryable: boolean = true) {
    super(message, statusCode, isRetryable);
  }
}
