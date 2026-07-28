import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { PostHog } from "posthog-node";
import { config } from "./config/index.js";
import { requestLogger } from "./middleware/logger.js";
import { generalLimiter } from "./middleware/rateLimit.js";
import { errorHandler } from "./middleware/error.js";
import { trackingMiddleware } from "./modules/tracking/tracking.middleware.js";
import { sendSuccess } from "./utils/response.js";
import authRoutes from "./modules/auth/auth.routes.js";
import contactRoutes from "./modules/contact/contact.routes.js";
import serviceRoutes from "./modules/service/service.routes.js";
import projectRoutes from "./modules/project/project.routes.js";
import trackingRoutes from "./modules/tracking/tracking.routes.js";
import adminRoutes from "./modules/admin/admin.routes.js";
import uploadRoutes from "./modules/upload/upload.routes.js";

export const posthog = new PostHog(config.posthogKey || "dummy");

const app = express();

app.set("trust proxy", 1);

app.use(
  cors({
    origin: config.corsOrigins,
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json({ strict: false }));
app.use("/uploads", express.static(config.uploadDir));
app.use(requestLogger);
app.use(generalLimiter);
app.use(trackingMiddleware);

app.get("/api/health", (_req, res) => {
  sendSuccess(res, null, "OK");
});

app.use("/api/auth", authRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tracking", trackingRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/upload", uploadRoutes);

if (config.sentryDsn) {
  const { setupExpressErrorHandler } = await import("@sentry/node");
  setupExpressErrorHandler(app);
}
app.use(errorHandler);

export default app;
