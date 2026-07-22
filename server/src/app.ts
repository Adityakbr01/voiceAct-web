import express from "express";
import cors from "cors";
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

const app = express();

app.use(cors());
app.use(express.json());
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

app.use(errorHandler);

export default app;
