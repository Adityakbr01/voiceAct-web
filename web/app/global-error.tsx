"use client";

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html>
      <body>
        <div className="flex min-h-screen items-center justify-center">
          <div className="text-center">
            <h2 className="text-lg font-semibold">Something went wrong</h2>
            <button
              onClick={reset}
              className="mt-4 rounded bg-foreground px-4 py-2 text-background text-sm"
            >
              Try again
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
