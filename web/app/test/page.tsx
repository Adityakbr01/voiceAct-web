"use client";

import BillingPeriodToggle from "@/modules/test-compo/components/Billing-Period-Toggle";
import { Footer1 } from "@/modules/test-compo/components/Footer1";
import ProgressPillBarChartCard from "@/modules/test-compo/components/Progress-Pill-Bar-Chart-Card";
import UpcomingMeetings from "@/modules/test-compo/components/Upcoming-Meetings";

export default function TestPage() {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-background px-6 py-80">
      <div className="flex flex-col items-center gap-8">
        <h1 className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          Footer Demo
        </h1>
      </div>
      <Footer1 />
      <UpcomingMeetings />
      <ProgressPillBarChartCard />
      <BillingPeriodToggle />
    </div>
  );
}
