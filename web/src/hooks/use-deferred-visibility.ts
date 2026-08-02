"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Marks an element ready shortly before it enters the viewport. This keeps
 * non-visual work (data requests, WebGL setup) out of the initial load while
 * leaving the rendered page structure available to users and search engines.
 */
export function useDeferredVisibility<T extends Element>(rootMargin = "600px 0px") {
  const ref = useRef<T>(null);
  const [isNearViewport, setIsNearViewport] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || isNearViewport) return;

    if (!("IntersectionObserver" in window)) {
      setIsNearViewport(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setIsNearViewport(true);
        observer.disconnect();
      },
      { rootMargin },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [isNearViewport, rootMargin]);

  return { ref, isNearViewport };
}
