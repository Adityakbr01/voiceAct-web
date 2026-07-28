import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  PORT: z.coerce.number().default(5000),
  MONGODB_URI: z.string().min(1, "MONGODB_URI is required"),
  JWT_SECRET: z.string().min(1),
  JWT_EXPIRES_IN: z.string().default("7d"),
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  CORS_ORIGINS: z.string().default("http://localhost:3000"),
  COOKIE_DOMAIN: z.string().optional(),
  COOKIE_SECURE: z.enum(["true", "false"]).default("false"),
  COOKIE_SAMESITE: z.enum(["lax", "strict", "none"]).default("lax"),
  SMTP_HOST: z.string().optional(),
  SMTP_PORT: z.coerce.number().optional(),
  SMTP_USER: z.string().optional(),
  SMTP_PASS: z.string().optional(),
  SMTP_FROM: z.string().optional(),
  ADMIN_NOTIFY_EMAIL: z.string().optional(),
  UPLOAD_DIR: z.string().default("uploads"),
  UPLOAD_MAX_MB: z.coerce.number().default(5),
  POSTHOG_KEY: z.string().optional(),
  SENTRY_DSN: z.string().optional(),
  RATE_LIMIT_GENERAL: z.coerce.number().default(60),
  RATE_LIMIT_CONTACT: z.coerce.number().default(10),
  RATE_LIMIT_AUTH: z.coerce.number().default(5),
});

const result = envSchema.safeParse(process.env);

if (!result.success) {
  console.error("\nInvalid environment variables:");
  for (const issue of result.error.issues) {
    console.error(`  ${issue.path.join(".")}: ${issue.message}`);
  }
  console.error("\nCheck your .env file or environment variables.\n");
  process.exit(1);
}

const env = result.data;
const isProduction = env.NODE_ENV === "production";

if (isProduction) {
  if (env.JWT_SECRET.length < 32) {
    console.error("\nProduction requires JWT_SECRET of at least 32 characters.\n");
    process.exit(1);
  }
  if (env.JWT_SECRET === "dev-secret-change-in-production" || env.JWT_SECRET === "change-this-to-a-real-secret") {
    console.error("\nProduction requires a non-default JWT_SECRET.\n");
    process.exit(1);
  }
} else if (env.JWT_SECRET === "dev-secret-change-in-production") {
  console.warn("\n⚠ Using default JWT_SECRET. Set JWT_SECRET in .env for production.\n");
}

export const config = {
  port: env.PORT,
  mongoUri: env.MONGODB_URI,
  jwtSecret: env.JWT_SECRET,
  jwtExpiresIn: env.JWT_EXPIRES_IN,
  nodeEnv: env.NODE_ENV,
  isDev: !isProduction,
  isProduction,
  corsOrigins: env.CORS_ORIGINS.split(",").map((o) => o.trim()).filter(Boolean),
  cookieDomain: env.COOKIE_DOMAIN,
  cookieSecure: env.COOKIE_SECURE === "true",
  cookieSameSite: env.COOKIE_SAMESITE as "lax" | "strict" | "none",
  smtp: {
    host: env.SMTP_HOST,
    port: env.SMTP_PORT ?? 587,
    user: env.SMTP_USER,
    pass: env.SMTP_PASS,
    from: env.SMTP_FROM ?? env.SMTP_USER,
  },
  adminNotifyEmail: env.ADMIN_NOTIFY_EMAIL,
  uploadDir: env.UPLOAD_DIR,
  uploadMaxBytes: env.UPLOAD_MAX_MB * 1024 * 1024,
  posthogKey: env.POSTHOG_KEY,
  sentryDsn: env.SENTRY_DSN,
  rateLimits: {
    general: env.RATE_LIMIT_GENERAL,
    contact: env.RATE_LIMIT_CONTACT,
    auth: env.RATE_LIMIT_AUTH,
  },
};
