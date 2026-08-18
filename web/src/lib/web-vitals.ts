import { onCLS, onFCP, onINP, onLCP, onTTFB, type Metric } from "web-vitals";

type MetricHandler = (metric: Metric) => void;

let isInitialized = false;

export function initWebVitals(onReport?: MetricHandler) {
  if (typeof window === "undefined") return;
  if (isInitialized) return;
  isInitialized = true;

  const report: MetricHandler = (metric) => {
    if (onReport) {
      try {
        onReport(metric);
      } catch {
        // ignore callback error
      }
    }

    // Dev logging for quick diagnostics
    if (process.env.NODE_ENV === "development") {
      // eslint-disable-next-line no-console
      console.log(`[Web Vitals] ${metric.name}:`, {
        value: metric.value,
        rating: metric.rating,
        delta: metric.delta,
        id: metric.id,
      });
    }

    // Send to Google Analytics 4 if gtag is present
    if (typeof window !== "undefined" && typeof (window as any).gtag === "function") {
      (window as any).gtag("event", metric.name, {
        value: Math.round(metric.name === "CLS" ? metric.value * 1000 : metric.value),
        metric_id: metric.id,
        metric_value: metric.value,
        metric_delta: metric.delta,
        metric_rating: metric.rating,
        event_category: "Web Vitals",
        non_interaction: true,
      });
    }
  };

  try {
    onCLS(report);
    onFCP(report);
    onINP(report);
    onLCP(report);
    onTTFB(report);
  } catch (err) {
    if (process.env.NODE_ENV === "development") {
      console.warn("[Web Vitals] Failed to attach performance observers:", err);
    }
  }
}
