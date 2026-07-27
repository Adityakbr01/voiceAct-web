import { describe, test, expect, beforeEach } from "bun:test";
import "../../setup.js";
import { testUtils } from "../../setup.js";
import * as trackingService from "../../../modules/tracking/tracking.service.js";

describe("Tracking Service", () => {
  describe("processPageView", () => {
    test("should process page view with tracking data", async () => {
      const trackingData = {
        visitorId: "visitor123",
        sessionId: "session456",
        userAgent: "Test Browser",
        ip: "127.0.0.1",
        page: "/test-page",
        referrer: "https://google.com",
        utmSource: "google",
        utmMedium: "cpc",
      };

      const result = await trackingService.processPageView(trackingData);

      expect(result).toBeDefined();
      expect(result.visitor).toBeDefined();
      expect(result.session).toBeDefined();
    });

    test("should handle tracking data without UTM parameters", async () => {
      const trackingData = {
        visitorId: "visitor789",
        sessionId: "session101",
        userAgent: "Simple Browser",
        ip: "192.168.1.1",
        page: "/home",
      };

      const result = await trackingService.processPageView(trackingData);

      expect(result).toBeDefined();
      expect(result.visitor.visitorId).toBe("visitor789");
    });

    test("should detect traffic source from referrer", async () => {
      const googleTraffic = {
        visitorId: "visitor_google",
        sessionId: "session_google", 
        userAgent: "Test Browser",
        ip: "127.0.0.1",
        page: "/",
        referrer: "https://www.google.com/search",
      };

      const result = await trackingService.processPageView(googleTraffic);

      expect(result.session.trafficSource).toBe("Organic Search");
    });
  });

  describe("saveLeadAttribution", () => {
    test("should save lead attribution data", async () => {
      const trackingData = {
        visitorId: "visitor123",
        sessionId: "session456",
        utmSource: "facebook",
        utmMedium: "social",
        utmCampaign: "test-campaign",
        referrer: "https://facebook.com",
        ip: "127.0.0.1",
        device: "desktop",
        browser: "chrome",
        os: "windows",
      };

      const leadAttribution = await trackingService.saveLeadAttribution(
        trackingData,
        "contact",
        "lead123"
      );

      expect(leadAttribution).toBeDefined();
      expect(leadAttribution.visitorId).toBe("visitor123");
      expect(leadAttribution.leadType).toBe("contact");
      expect(leadAttribution.leadId).toBe("lead123");
      expect(leadAttribution.utmSource).toBe("facebook");
    });
  });

  describe("getAnalytics", () => {
    beforeEach(async () => {
      // Create test tracking data
      await trackingService.processPageView({
        visitorId: "visitor1",
        sessionId: "session1",
        userAgent: "Chrome/91.0",
        ip: "127.0.0.1",
        page: "/",
        utmSource: "google",
        utmMedium: "cpc",
      });

      await trackingService.processPageView({
        visitorId: "visitor2", 
        sessionId: "session2",
        userAgent: "Firefox/89.0",
        ip: "192.168.1.1",
        page: "/about",
        referrer: "https://facebook.com",
      });

      // Create test contact for conversion tracking
      await testUtils.createTestContact({ name: "Analytics Test" });
    });

    test("should get analytics data", async () => {
      const analytics = await trackingService.getAnalytics();

      expect(analytics).toBeDefined();
      expect(analytics.stats).toBeDefined();
      expect(analytics.sources).toBeInstanceOf(Array);
      expect(analytics.funnel).toBeInstanceOf(Array);
    });

    test("should get analytics for specific period", async () => {
      const analytics24h = await trackingService.getAnalytics("24h");
      const analytics7d = await trackingService.getAnalytics("7d");

      expect(analytics24h).toBeDefined();
      expect(analytics7d).toBeDefined();
      expect(analytics24h.stats).toBeDefined();
      expect(analytics7d.stats).toBeDefined();
    });

    test("should include conversion funnel", async () => {
      const analytics = await trackingService.getAnalytics();

      expect(analytics.funnel).toBeInstanceOf(Array);
      expect(analytics.funnel).toHaveLength(3);
      expect(analytics.funnel[0].step).toBe("Sessions");
      expect(analytics.funnel[1].step).toBe("Engaged (2+ pages)");
      expect(analytics.funnel[2].step).toBe("Contact submitted");
    });

    test("should include realtime data", async () => {
      const analytics = await trackingService.getAnalytics();

      expect(analytics.realtime).toBeDefined();
      expect(analytics.realtime.activeSessions).toBeDefined();
      expect(typeof analytics.realtime.activeSessions).toBe("number");
    });

    test("should include time series data", async () => {
      const analytics = await trackingService.getAnalytics();

      expect(analytics.timeSeries).toBeInstanceOf(Array);
    });
  });
});