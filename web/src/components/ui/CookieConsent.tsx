"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useCookieConsent } from "@/components/cookie-consent/provider";

export default function CookieConsent() {
  const { showBanner, acceptAll, consent, setConsent } = useCookieConsent();
  const [visible, setVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [analytics, setAnalytics] = useState(consent.analytics);
  const [preferences, setPreferences] = useState(consent.preferences);

  useEffect(() => {
    if (showBanner) requestAnimationFrame(() => setVisible(true));
  }, [showBanner]);

  useEffect(() => {
    if (showPreferences) {
      setAnalytics(consent.analytics);
      setPreferences(consent.preferences);
    }
  }, [showPreferences, consent]);

  if (!showBanner) return null;

  return (
    <>
      {/* Banner */}
      <div
        className={`bg-background fixed bottom-5 right-5 z-50 max-w-md rounded-2xl border p-4 shadow-lg transition-all duration-300 ${
          visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
      >
        <h4 className="font-semibold">🍪 Cookie Notice</h4>
        <p className="text-muted-foreground mt-4 text-sm">
          We use cookies to ensure that we give you the best experience on our website.{" "}
          <a href="/cookie-policy" className="text-blue-500 hover:underline">
            Read cookies policies
          </a>
          .
        </p>
        <div className="mt-4 flex shrink-0 items-center justify-between gap-x-4">
          <Button
            variant="link"
            size="sm"
            className="px-0 text-xs underline"
            onClick={() => setShowPreferences(true)}
          >
            Manage your preferences
          </Button>
          <Button
            size="sm"
            onClick={() => {
              setVisible(false);
              setTimeout(acceptAll, 300);
            }}
          >
            Accept
          </Button>
        </div>
      </div>

      {/* Preferences panel */}
      {showPreferences && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50">
          <div className="mx-4 w-full max-w-lg rounded-xl border border-border bg-card p-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold">Cookie Preferences</h3>
              <Button variant="ghost" size="sm" onClick={() => setShowPreferences(false)}>
                ✕
              </Button>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between rounded-lg border border-border p-4">
                <div className="space-y-0.5">
                  <Label className="text-base">Essential</Label>
                  <p className="text-sm text-muted-foreground">
                    Authentication, security, and site functionality. Always enabled.
                  </p>
                </div>
                <Switch checked disabled />
              </div>
              <div className="flex items-center justify-between rounded-lg border border-border p-4">
                <div className="space-y-0.5">
                  <Label className="text-base">Analytics</Label>
                  <p className="text-sm text-muted-foreground">
                    Help us understand how visitors interact with the site (PostHog).
                  </p>
                </div>
                <Switch checked={analytics} onCheckedChange={setAnalytics} />
              </div>
              <div className="flex items-center justify-between rounded-lg border border-border p-4">
                <div className="space-y-0.5">
                  <Label className="text-base">Preferences</Label>
                  <p className="text-sm text-muted-foreground">
                    Remember your theme and language settings.
                  </p>
                </div>
                <Switch checked={preferences} onCheckedChange={setPreferences} />
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowPreferences(false)}>
                Cancel
              </Button>
              <Button
                onClick={() => {
                  setConsent({ analytics, preferences });
                  setShowPreferences(false);
                }}
              >
                Save Preferences
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
