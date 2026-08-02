import type {
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

interface BaseLayoutOptions {
  title: string;
  previewText?: string;
  bodyContent: string;
}

/**
 * Common, responsive, dark-mode compatible HTML wrapper for all VoiceAct emails.
 */
export function renderBaseLayout({ title, previewText, bodyContent }: BaseLayoutOptions): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>${title}</title>
  <style>
    :root {
      color-scheme: light dark;
      supported-color-schemes: light dark;
    }
    body {
      margin: 0;
      padding: 0;
      width: 100% !important;
      background-color: #0f172a;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
      color: #e2e8f0;
    }
    .wrapper {
      width: 100%;
      background-color: #0f172a;
      padding: 40px 16px;
      box-sizing: border-box;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #1e293b;
      border: 1px solid #334155;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3);
    }
    .header {
      padding: 32px 32px 24px 32px;
      text-align: center;
      background: linear-gradient(135deg, #1e1b4b 0%, #0f172a 100%);
      border-bottom: 1px solid #334155;
    }
    .brand-logo {
      font-size: 26px;
      font-weight: 800;
      letter-spacing: -0.5px;
      color: #6366f1;
      text-decoration: none;
    }
    .brand-logo span {
      color: #38bdf8;
    }
    .content {
      padding: 32px;
      color: #cbd5e1;
      font-size: 16px;
      line-height: 1.6;
    }
    .content h1 {
      color: #f8fafc;
      font-size: 22px;
      font-weight: 700;
      margin-top: 0;
      margin-bottom: 16px;
    }
    .btn {
      display: inline-block;
      padding: 14px 28px;
      background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
      color: #ffffff !important;
      text-decoration: none;
      font-weight: 600;
      font-size: 15px;
      border-radius: 8px;
      margin: 20px 0;
      text-align: center;
      box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
    }
    .badge {
      display: inline-block;
      background-color: #0f172a;
      border: 1px solid #3b82f6;
      color: #38bdf8;
      font-family: monospace;
      font-size: 28px;
      font-weight: 700;
      letter-spacing: 6px;
      padding: 12px 24px;
      border-radius: 8px;
      margin: 16px 0;
    }
    .footer {
      padding: 24px 32px;
      background-color: #0f172a;
      border-top: 1px solid #334155;
      text-align: center;
      font-size: 13px;
      color: #64748b;
    }
    .social-links a {
      color: #94a3b8;
      text-decoration: none;
      margin: 0 10px;
      font-size: 13px;
    }
    .divider {
      height: 1px;
      background-color: #334155;
      margin: 24px 0;
    }
    @media only screen and (max-width: 600px) {
      .content { padding: 24px 20px !important; }
      .header { padding: 24px 20px !important; }
      .footer { padding: 20px !important; }
      .btn { display: block !important; width: 100% !important; box-sizing: border-box; }
    }
  </style>
</head>
<body>
  ${previewText ? `<div style="display:none;font-size:1px;color:#0f172a;line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden;">${previewText}</div>` : ""}
  <div class="wrapper">
    <div class="container">
      <div class="header">
        <a href="https://voiceact.tech" class="brand-logo">Voice<span>Act</span></a>
      </div>
      <div class="content">
        ${bodyContent}
      </div>
      <div class="footer">
        <p style="margin: 0 0 12px 0;">&copy; ${new Date().getFullYear()} VoiceAct Tech. All rights reserved.</p>
        <div class="social-links" style="margin-bottom: 12px;">
          <a href="https://voiceact.tech">Website</a> &bull;
          <a href="mailto:support@voiceact.tech">Support</a> &bull;
          <a href="https://voiceact.tech/privacy">Privacy Policy</a>
        </div>
        <p style="margin: 0; font-size: 12px;">You received this email from voiceact.tech</p>
      </div>
    </div>
  </div>
</body>
</html>`;
}

export function welcomeTemplate(payload: WelcomeEmailPayload): { subject: string; html: string; text: string } {
  const subject = `Welcome to VoiceAct, ${payload.name}!`;
  const loginUrl = payload.loginUrl || "https://voiceact.tech/login";
  const bodyContent = `
    <h1>Welcome aboard, ${payload.name}! 🎉</h1>
    <p>Thank you for joining VoiceAct. We are thrilled to have you with us as we transform digital voice and interactive experiences.</p>
    <p>Get started by accessing your dashboard below:</p>
    <div style="text-align: center;">
      <a href="${loginUrl}" class="btn">Go to Dashboard</a>
    </div>
    <p>If you have any questions or need assistance, feel free to reach out to our team at any time.</p>
    <p>Best regards,<br><strong>The VoiceAct Team</strong></p>
  `;
  const text = `Welcome to VoiceAct, ${payload.name}!\n\nThank you for joining VoiceAct. Access your dashboard here: ${loginUrl}\n\nBest regards,\nThe VoiceAct Team`;
  return { subject, html: renderBaseLayout({ title: subject, previewText: `Welcome to VoiceAct, ${payload.name}!`, bodyContent }), text };
}

export function otpTemplate(payload: OTPEmailPayload): { subject: string; html: string; text: string } {
  const subject = `${payload.otpCode} is your VoiceAct verification code`;
  const expiresIn = payload.expiresInMinutes || 10;
  const bodyContent = `
    <h1>Verification Code</h1>
    <p>Hello ${payload.name},</p>
    <p>Use the verification code below to complete your authentication request:</p>
    <div style="text-align: center;">
      <div class="badge">${payload.otpCode}</div>
    </div>
    <p style="font-size: 14px; color: #94a3b8;">This code will expire in ${expiresIn} minutes. If you did not request this code, please ignore this email.</p>
  `;
  const text = `Hello ${payload.name},\n\nYour VoiceAct verification code is: ${payload.otpCode}\nThis code expires in ${expiresIn} minutes.`;
  return { subject, html: renderBaseLayout({ title: subject, previewText: `Your verification code is ${payload.otpCode}`, bodyContent }), text };
}

export function passwordResetTemplate(payload: PasswordResetEmailPayload): { subject: string; html: string; text: string } {
  const subject = "Reset your VoiceAct password";
  const expiresIn = payload.expiresInMinutes || 60;
  const bodyContent = `
    <h1>Password Reset Request</h1>
    <p>Hello ${payload.name},</p>
    <p>We received a request to reset your password for your VoiceAct account. Click the button below to choose a new password:</p>
    <div style="text-align: center;">
      <a href="${payload.resetUrl}" class="btn">Reset Password</a>
    </div>
    <p style="font-size: 14px; color: #94a3b8;">This reset link will expire in ${expiresIn} minutes. If you didn't request a password reset, you can safely ignore this email.</p>
  `;
  const text = `Hello ${payload.name},\n\nReset your VoiceAct password here: ${payload.resetUrl}\nLink expires in ${expiresIn} minutes.`;
  return { subject, html: renderBaseLayout({ title: subject, previewText: "Reset your VoiceAct password", bodyContent }), text };
}

export function verificationTemplate(payload: VerificationEmailPayload): { subject: string; html: string; text: string } {
  const subject = "Verify your VoiceAct email address";
  const bodyContent = `
    <h1>Verify Your Email Address</h1>
    <p>Hello ${payload.name},</p>
    <p>Please confirm your email address by clicking the button below:</p>
    <div style="text-align: center;">
      <a href="${payload.verificationUrl}" class="btn">Verify Email Address</a>
    </div>
    <p style="font-size: 14px; color: #94a3b8;">If you did not create a VoiceAct account, no further action is required.</p>
  `;
  const text = `Hello ${payload.name},\n\nPlease verify your email address for VoiceAct using this link: ${payload.verificationUrl}`;
  return { subject, html: renderBaseLayout({ title: subject, previewText: "Verify your email address", bodyContent }), text };
}

export function contactNotificationTemplate(payload: ContactNotificationPayload): { subject: string; html: string; text: string } {
  const subject = `New Contact Form Inquiry from ${payload.name}`;
  const bodyContent = `
    <h1>New Contact Form Submission</h1>
    <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
      <tr><td style="padding: 8px 0; color: #94a3b8; width: 120px;"><strong>Name:</strong></td><td style="color: #f8fafc;">${payload.name}</td></tr>
      <tr><td style="padding: 8px 0; color: #94a3b8;"><strong>Email:</strong></td><td style="color: #f8fafc;"><a href="mailto:${payload.email}" style="color: #38bdf8;">${payload.email}</a></td></tr>
      ${payload.phone ? `<tr><td style="padding: 8px 0; color: #94a3b8;"><strong>Phone:</strong></td><td style="color: #f8fafc;">${payload.phone}</td></tr>` : ""}
      ${payload.service ? `<tr><td style="padding: 8px 0; color: #94a3b8;"><strong>Service:</strong></td><td style="color: #f8fafc;">${payload.service}</td></tr>` : ""}
    </table>
    <div class="divider"></div>
    <h3 style="color: #f8fafc; margin-bottom: 8px;">Message:</h3>
    <div style="background-color: #0f172a; padding: 16px; border-radius: 8px; border: 1px solid #334155; white-space: pre-wrap; color: #e2e8f0;">${payload.message}</div>
  `;
  const text = `New Contact Inquiry\n\nName: ${payload.name}\nEmail: ${payload.email}\nPhone: ${payload.phone || "N/A"}\nService: ${payload.service || "N/A"}\n\nMessage:\n${payload.message}`;
  return { subject, html: renderBaseLayout({ title: subject, previewText: `New inquiry from ${payload.name}`, bodyContent }), text };
}

export function contactConfirmationTemplate(payload: ContactConfirmationPayload): { subject: string; html: string; text: string } {
  const subject = "We received your message - VoiceAct";
  const bodyContent = `
    <h1>Thank you for contacting us, ${payload.name}!</h1>
    <p>We have successfully received your inquiry. A member of our team will review your message and get back to you shortly.</p>
    <p>In the meantime, feel free to explore our website or view our previous client work.</p>
    <div style="text-align: center;">
      <a href="https://voiceact.tech" class="btn">Visit VoiceAct</a>
    </div>
    <p>Best regards,<br><strong>The VoiceAct Team</strong></p>
  `;
  const text = `Hello ${payload.name},\n\nThank you for reaching out to VoiceAct. We received your message and will respond shortly.\n\nBest regards,\nThe VoiceAct Team`;
  return { subject, html: renderBaseLayout({ title: subject, previewText: "We received your message", bodyContent }), text };
}

export function inviteTemplate(payload: InviteEmailPayload): { subject: string; html: string; text: string } {
  const subject = `${payload.inviterName} invited you to join VoiceAct`;
  const roleText = payload.role ? ` as ${payload.role}` : "";
  const bodyContent = `
    <h1>You're Invited!</h1>
    <p>${payload.inviterName} has invited you to join VoiceAct${roleText}.</p>
    <p>Click the link below to accept your invitation and complete your setup:</p>
    <div style="text-align: center;">
      <a href="${payload.inviteUrl}" class="btn">Accept Invitation</a>
    </div>
  `;
  const text = `${payload.inviterName} invited you to join VoiceAct${roleText}.\n\nAccept invitation link: ${payload.inviteUrl}`;
  return { subject, html: renderBaseLayout({ title: subject, previewText: `${payload.inviterName} invited you to VoiceAct`, bodyContent }), text };
}

export function magicLinkTemplate(payload: MagicLinkEmailPayload): { subject: string; html: string; text: string } {
  const subject = "Your VoiceAct Magic Login Link";
  const expiresIn = payload.expiresInMinutes || 15;
  const bodyContent = `
    <h1>Magic Login Link</h1>
    <p>Hello ${payload.name},</p>
    <p>Click the button below to instantly sign in to your VoiceAct account:</p>
    <div style="text-align: center;">
      <a href="${payload.magicLinkUrl}" class="btn">Sign In to VoiceAct</a>
    </div>
    <p style="font-size: 14px; color: #94a3b8;">This magic link is valid for ${expiresIn} minutes. If you did not request this login link, you can safely ignore this email.</p>
  `;
  const text = `Hello ${payload.name},\n\nUse this magic link to sign in to VoiceAct: ${payload.magicLinkUrl}\nExpires in ${expiresIn} minutes.`;
  return { subject, html: renderBaseLayout({ title: subject, previewText: "Your magic login link", bodyContent }), text };
}

export function notificationTemplate(payload: NotificationEmailPayload): { subject: string; html: string; text: string } {
  const subject = payload.title;
  const actionButton = payload.actionUrl && payload.actionText ? `
    <div style="text-align: center;">
      <a href="${payload.actionUrl}" class="btn">${payload.actionText}</a>
    </div>
  ` : "";
  const bodyContent = `
    <h1>${payload.title}</h1>
    <p>Hello ${payload.name},</p>
    <p>${payload.message}</p>
    ${actionButton}
  `;
  const text = `Hello ${payload.name},\n\n${payload.title}\n\n${payload.message}${payload.actionUrl ? `\n\nLink: ${payload.actionUrl}` : ""}`;
  return { subject, html: renderBaseLayout({ title: subject, previewText: payload.title, bodyContent }), text };
}

export function invoiceTemplate(payload: InvoiceEmailPayload): { subject: string; html: string; text: string } {
  const subject = `Invoice ${payload.invoiceNumber} from VoiceAct`;
  const downloadBtn = payload.downloadUrl ? `
    <div style="text-align: center;">
      <a href="${payload.downloadUrl}" class="btn">View / Download Invoice</a>
    </div>
  ` : "";
  const bodyContent = `
    <h1>Invoice Details</h1>
    <p>Hello ${payload.name},</p>
    <p>Please find below the summary of your invoice from VoiceAct:</p>
    <table style="width: 100%; border-collapse: collapse; margin: 20px 0; background-color: #0f172a; border-radius: 8px; overflow: hidden;">
      <tr style="border-bottom: 1px solid #334155;"><td style="padding: 12px 16px; color: #94a3b8;"><strong>Invoice Number:</strong></td><td style="padding: 12px 16px; color: #f8fafc;">${payload.invoiceNumber}</td></tr>
      <tr style="border-bottom: 1px solid #334155;"><td style="padding: 12px 16px; color: #94a3b8;"><strong>Amount:</strong></td><td style="padding: 12px 16px; color: #38bdf8; font-weight: 700; font-size: 18px;">${payload.amount}</td></tr>
      <tr><td style="padding: 12px 16px; color: #94a3b8;"><strong>Due Date:</strong></td><td style="padding: 12px 16px; color: #f8fafc;">${payload.dueDate}</td></tr>
    </table>
    ${downloadBtn}
    <p>Thank you for your business!</p>
  `;
  const text = `Hello ${payload.name},\n\nInvoice: ${payload.invoiceNumber}\nAmount: ${payload.amount}\nDue Date: ${payload.dueDate}${payload.downloadUrl ? `\nDownload: ${payload.downloadUrl}` : ""}`;
  return { subject, html: renderBaseLayout({ title: subject, previewText: `Invoice ${payload.invoiceNumber} - ${payload.amount}`, bodyContent }), text };
}
