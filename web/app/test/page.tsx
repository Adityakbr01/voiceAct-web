"use client";

import BillingPeriodToggle from "@/modules/test-compo/components/Billing-Period-Toggle";
import { Footer1 } from "@/modules/test-compo/components/Footer1";
import ProgressPillBarChartCard from "@/modules/test-compo/components/Progress-Pill-Bar-Chart-Card";
import UpcomingMeetings from "@/modules/test-compo/components/Upcoming-Meetings";

export default function TestPage() {
  return (
    <div className="flex min-h-screen flex-col items-center bg-background px-6 py-20 gap-20">
      <Footer1 />
      <UpcomingMeetings />
      <ProgressPillBarChartCard />
      <BillingPeriodToggle />
    </div>
  );
}
