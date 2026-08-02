import { Resend } from "resend";

export class ResendClientError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ResendClientError";
    Object.setPrototypeOf(this, ResendClientError.prototype);
  }
}

let instance: Resend | null = null;

/**
 * Lazy initialized singleton Resend client.
 * Throws a startup/runtime error if process.env.RESEND_API_KEY is missing.
 */
export function getResendClient(overrideApiKey?: string): Resend {
  if (instance && !overrideApiKey) {
    return instance;
  }

  const apiKey = overrideApiKey || process.env.RESEND_API_KEY;

  if (!apiKey || apiKey.trim() === "") {
    throw new ResendClientError(
      "Missing RESEND_API_KEY environment variable. Resend SDK cannot be initialized."
    );
  }

  const client = new Resend(apiKey);
  if (!overrideApiKey) {
    instance = client;
  }
  return client;
}

/**
 * Resets the Resend singleton client instance (primarily used for testing).
 */
export function resetResendClient(): void {
  instance = null;
}
