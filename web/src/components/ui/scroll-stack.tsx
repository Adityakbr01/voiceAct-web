"use client";

import { useRef, useCallback, useEffect, type ReactNode } from "react";
import "./scroll-stack.css";

interface ScrollStackProps {
  children: ReactNode;
  className?: string;
  itemDistance?: number;
  itemScale?: number;
  itemStackDistance?: number;
  stackPosition?: string;
  scaleEndPosition?: string;
  baseScale?: number;
  scaleDuration?: number;
  rotationAmount?: number;
  blurAmount?: number;
  useWindowScroll?: boolean;
  onStackComplete?: () => void;
}

export const ScrollStackItem = ({
  children,
  itemClassName = "",
}: {
  children: ReactNode;
  itemClassName?: string;
}) => (
  <div className="scroll-stack-card-wrapper w-full">
    <div className={`scroll-stack-card ${itemClassName}`.trim()}>{children}</div>
  </div>
);

const ScrollStack = ({
  children,
  className = "",
  itemDistance = 100,
  itemScale = 0.03,
  itemStackDistance = 50,
  stackPosition = "20%",
  scaleEndPosition = "10%",
  baseScale = 0.85,
  scaleDuration = 0.5,
  rotationAmount = 0,
  blurAmount = 0,
  useWindowScroll = false,
  onStackComplete,
}: ScrollStackProps) => {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const stackCompletedRef = useRef(false);
  const wrappersRef = useRef<HTMLElement[]>([]);
  const cardsRef = useRef<HTMLElement[]>([]);
  const wrapperOffsetsRef = useRef<number[]>([]);
  const endElementOffsetRef = useRef<number>(0);
  const lastTransformsRef = useRef<Map<number, any>>(new Map());
  const isUpdatingRef = useRef(false);
  const scrollRafIdRef = useRef<number | null>(null);

  const calculateProgress = useCallback((scrollTop: number, start: number, end: number) => {
    if (scrollTop < start) return 0;
    if (scrollTop > end) return 1;
    if (end === start) return 0;
    return (scrollTop - start) / (end - start);
  }, []);

  const parsePercentage = useCallback((value: string | number, containerHeight: number) => {
    if (typeof value === "string" && value.includes("%")) {
      return (parseFloat(value) / 100) * containerHeight;
    }
    return parseFloat(value as string);
  }, []);

  const getElementTop = useCallback((el: HTMLElement, isWin: boolean) => {
    if (isWin) {
      const rect = el.getBoundingClientRect();
      const scrollY = window.pageYOffset || document.documentElement.scrollTop;
      return rect.top + scrollY;
    }
    return el.offsetTop;
  }, []);

  const measureLayout = useCallback(() => {
    const isWin = useWindowScroll;

    const wrappers = isWin
      ? (Array.from(document.querySelectorAll(".scroll-stack-card-wrapper")) as HTMLElement[])
      : (Array.from(
          scrollerRef.current?.querySelectorAll(".scroll-stack-card-wrapper") ?? [],
        ) as HTMLElement[]);

    if (!wrappers.length) return;

    wrappers.forEach((wrapper, i) => {
      if (i < wrappers.length - 1) {
        wrapper.style.marginBottom = `${itemDistance}px`;
      }
    });

    wrappersRef.current = wrappers;
    cardsRef.current = wrappers.map((w) => w.querySelector(".scroll-stack-card") as HTMLElement);

    wrapperOffsetsRef.current = wrappers.map((w) => getElementTop(w, isWin));

    const endElement = isWin
      ? document.querySelector(".scroll-stack-end")
      : scrollerRef.current?.querySelector(".scroll-stack-end");

    if (endElement) {
      endElementOffsetRef.current = getElementTop(endElement as HTMLElement, isWin);
    }
  }, [useWindowScroll, getElementTop, itemDistance]);

  const updateCardTransforms = useCallback(() => {
    if (!cardsRef.current.length || !wrappersRef.current.length || isUpdatingRef.current) return;

    isUpdatingRef.current = true;

    try {
      const scrollTop = useWindowScroll
        ? window.pageYOffset || document.documentElement.scrollTop
        : (scrollerRef.current?.scrollTop ?? 0);
      const containerHeight = useWindowScroll
        ? window.innerHeight
        : (scrollerRef.current?.clientHeight ?? window.innerHeight);

      const stackPositionPx = parsePercentage(stackPosition, containerHeight);
      const scaleEndPositionPx = parsePercentage(scaleEndPosition, containerHeight);
      const endElementTop = endElementOffsetRef.current;

      const wrapperOffsets = wrapperOffsetsRef.current;

      cardsRef.current.forEach((card, i) => {
        const wrapper = wrappersRef.current[i];
        if (!card || !wrapper) return;

        const cardTop = wrapperOffsets[i] ?? 0;
        const triggerStart = cardTop - stackPositionPx - itemStackDistance * i;
        const triggerEnd = cardTop - scaleEndPositionPx;
        const pinStart = cardTop - stackPositionPx - itemStackDistance * i;
        const pinEnd = endElementTop - containerHeight / 2;

        const scaleProgress = calculateProgress(scrollTop, triggerStart, triggerEnd);
        const targetScale = baseScale + i * itemScale;
        const scale = 1 - scaleProgress * (1 - targetScale);
        const rotation = rotationAmount ? i * rotationAmount * scaleProgress : 0;

        let blur = 0;
        if (blurAmount) {
          let topCardIndex = 0;
          for (let j = 0; j < wrappersRef.current.length; j++) {
            const jCardTop = wrapperOffsets[j] ?? 0;
            const jTriggerStart = jCardTop - stackPositionPx - itemStackDistance * j;
            if (scrollTop >= jTriggerStart) {
              topCardIndex = j;
            }
          }

          if (i < topCardIndex) {
            const depthInStack = topCardIndex - i;
            blur = Math.max(0, depthInStack * blurAmount);
          }
        }

        let translateY = 0;
        const isPinned = scrollTop >= pinStart && scrollTop <= pinEnd;

        if (isPinned) {
          translateY = scrollTop - cardTop + stackPositionPx + itemStackDistance * i;
        } else if (scrollTop > pinEnd) {
          translateY = pinEnd - cardTop + stackPositionPx + itemStackDistance * i;
        }

        const newTransform = {
          translateY,
          scale,
          rotation,
          blur,
        };

        const lastTransform = lastTransformsRef.current.get(i);
        const hasChanged =
          !lastTransform ||
          Math.abs(lastTransform.translateY - newTransform.translateY) > 0.01 ||
          Math.abs(lastTransform.scale - newTransform.scale) > 0.0005 ||
          Math.abs(lastTransform.rotation - newTransform.rotation) > 0.01 ||
          Math.abs(lastTransform.blur - newTransform.blur) > 0.01;

        if (hasChanged) {
          const transform = `translate3d(0, ${translateY.toFixed(2)}px, 0) scale(${scale.toFixed(4)}) rotate(${rotation.toFixed(2)}deg)`;
          const filter = blur > 0 ? `blur(${blur.toFixed(1)}px)` : "";

          card.style.transform = transform;
          if (card.style.filter !== filter) {
            card.style.filter = filter;
          }

          lastTransformsRef.current.set(i, newTransform);
        }

        if (i === cardsRef.current.length - 1) {
          const isInView = scrollTop >= pinStart && scrollTop <= pinEnd;
          if (isInView && !stackCompletedRef.current) {
            stackCompletedRef.current = true;
            onStackComplete?.();
          } else if (!isInView && stackCompletedRef.current) {
            stackCompletedRef.current = false;
          }
        }
      });
    } finally {
      isUpdatingRef.current = false;
    }
  }, [
    useWindowScroll,
    stackPosition,
    scaleEndPosition,
    calculateProgress,
    parsePercentage,
    itemStackDistance,
    baseScale,
    itemScale,
    rotationAmount,
    blurAmount,
    onStackComplete,
  ]);

  const handleScroll = useCallback(() => {
    if (scrollRafIdRef.current !== null) return;
    scrollRafIdRef.current = requestAnimationFrame(() => {
      scrollRafIdRef.current = null;
      updateCardTransforms();
    });
  }, [updateCardTransforms]);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    let rafId: number | null = null;

    const measureAndUpdate = () => {
      measureLayout();
      updateCardTransforms();
    };

    // Initial measurement after layout pass
    rafId = requestAnimationFrame(() => {
      measureAndUpdate();
    });

    const wrappers = wrappersRef.current;
    const transformsCache = lastTransformsRef.current;

    wrappers.forEach((wrapper, i) => {
      if (i < wrappers.length - 1) {
        wrapper.style.marginBottom = `${itemDistance}px`;
      }
    });

    cardsRef.current.forEach((card) => {
      if (!card) return;
      card.style.willChange = "transform, filter";
      card.style.transformOrigin = "top center";
      card.style.backfaceVisibility = "hidden";
      card.style.transform = "translateZ(0)";
      card.style.webkitTransform = "translateZ(0)";
      card.style.perspective = "1000px";
      card.style.webkitPerspective = "1000px";
    });

    if (useWindowScroll) {
      window.addEventListener("scroll", handleScroll, { passive: true });
    } else {
      scroller.addEventListener("scroll", handleScroll, { passive: true });
    }

    const handleResize = () => {
      measureAndUpdate();
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("load", measureAndUpdate);

    // ResizeObserver to detect font/image loading height changes
    const resizeObserver = new ResizeObserver(() => {
      measureAndUpdate();
    });

    if (scroller) {
      resizeObserver.observe(scroller);
    }

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      if (useWindowScroll) {
        window.removeEventListener("scroll", handleScroll);
      } else {
        scroller.removeEventListener("scroll", handleScroll);
      }
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("load", measureAndUpdate);
      resizeObserver.disconnect();
      stackCompletedRef.current = false;
      wrappersRef.current = [];
      cardsRef.current = [];
      transformsCache.clear();
      isUpdatingRef.current = false;
    };
  }, [itemDistance, useWindowScroll, measureLayout, updateCardTransforms, handleScroll]);

  // Re-measure when children are added/removed (e.g. API data loads after mount)
  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const observer = new MutationObserver(() => {
      measureLayout();
      updateCardTransforms();
    });

    observer.observe(scroller, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [measureLayout, updateCardTransforms]);

  return (
    <div
      className={`scroll-stack-scroller ${useWindowScroll ? "use-window-scroll" : ""} ${className}`.trim()}
      ref={scrollerRef}
    >
      <div className="scroll-stack-inner">
        {children}
        <div className="scroll-stack-end" />
      </div>
    </div>
  );
};

export default ScrollStack;
