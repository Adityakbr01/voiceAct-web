import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  PORT: z.coerce.number().default(5000),
  MONGODB_URI: z.string().default("mongodb://localhost:27017/voiceact"),
  JWT_SECRET: z.string().default("dev-secret-change-in-production"),
  JWT_EXPIRES_IN: z.string().default("7d"),
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
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

if (env.JWT_SECRET === "dev-secret-change-in-production") {
  console.warn("\n⚠ Using default JWT_SECRET. Set JWT_SECRET in .env for production.\n");
}

export const config = {
  port: env.PORT,
  mongoUri: env.MONGODB_URI,
  jwtSecret: env.JWT_SECRET,
  jwtExpiresIn: env.JWT_EXPIRES_IN,
  isDev: env.NODE_ENV !== "production",
};
