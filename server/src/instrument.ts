import { config } from "./config/index.js";

if (config.sentryDsn) {
  const Sentry = await import("@sentry/node");
  Sentry.init({
    dsn: config.sentryDsn,
    environment: config.nodeEnv,
    tracesSampleRate: config.isProduction ? 0.1 : 0,
    integrations: [Sentry.expressIntegration()],
    registerEsmLoaderHooks: false,
    disableInstrumentationWarnings: true,
  });
}
