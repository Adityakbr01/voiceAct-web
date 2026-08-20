"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, AnimatePresence } from "framer-motion";

type CursorMode = "arrow" | "pointer" | "grab" | "grabbing" | "crosshair" | "text";

interface ClickRipple {
  id: number;
  x: number;
  y: number;
}

export function FigmaCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [cursorMode, setCursorMode] = useState<CursorMode>("arrow");
  const [isTouchDevice, setIsTouchDevice] = useState(true);
  const [clickRipples, setClickRipples] = useState<ClickRipple[]>([]);
  const nextRippleId = useRef(0);

  // Direct 1:1 hardware coordinates (0ms latency, zero lag)
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  useEffect(() => {
    // Check for touch / coarse pointer
    const isTouch =
      window.matchMedia("(pointer: coarse)").matches ||
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0;

    setIsTouchDevice(isTouch);
    if (isTouch) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseDown = (e: MouseEvent) => {
      setIsClicking(true);

      // Create subtle Figma click ripple
      const newRipple: ClickRipple = {
        id: nextRippleId.current++,
        x: e.clientX,
        y: e.clientY,
      };
      setClickRipples((prev) => [...prev.slice(-3), newRipple]);
    };

    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      // 1. Text input / textarea detection -> yield to native I-beam cursor
      const isInput =
        target.tagName.toLowerCase() === "input" &&
        !["button", "submit", "checkbox", "radio"].includes(
          (target as HTMLInputElement).type
        );
      const isTextarea = target.tagName.toLowerCase() === "textarea";
      const isContentEditable = target.isContentEditable;

      if (isInput || isTextarea || isContentEditable) {
        setCursorMode("text");
        return;
      }

      // 2. Draggable / Canvas pan elements
      const isDraggable = target.closest(
        "[data-grab], .embla, .embla__container, .overflow-x-auto, input[type='range']"
      );
      if (isDraggable) {
        setCursorMode(isClicking ? "grabbing" : "grab");
        return;
      }

      // 3. Crosshair / Frame inspection elements
      const isCrosshair = target.closest("[data-crosshair], .inspect-area");
      if (isCrosshair) {
        setCursorMode("crosshair");
        return;
      }

      // 4. Clickable / Pointer elements (links, buttons, interactive controls)
      const isClickable = target.closest(
        "a, button, [role='button'], input[type='submit'], input[type='button'], select, summary, .cursor-pointer, [data-pointer]"
      );
      if (isClickable) {
        setCursorMode("pointer");
        return;
      }

      // 5. Default selection arrow
      setCursorMode("arrow");
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    window.addEventListener("mouseover", handleMouseOver, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [mouseX, mouseY, isVisible, isClicking]);

  const removeRipple = (id: number) => {
    setClickRipples((prev) => prev.filter((r) => r.id !== id));
  };

  if (isTouchDevice) return null;

  return (
    <AnimatePresence>
      {isVisible && cursorMode !== "text" && (
        <div
          className="pointer-events-none fixed inset-0 z-[99999] overflow-hidden select-none"
          style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh" }}
          aria-hidden="true"
        >
          {/* Click Ping Ripples */}
          {clickRipples.map((ripple) => (
            <motion.span
              key={ripple.id}
              initial={{ scale: 0.1, opacity: 0.7 }}
              animate={{ scale: 2, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.38, ease: "easeOut" }}
              onAnimationComplete={() => removeRipple(ripple.id)}
              className="absolute rounded-full border border-[#0D99FF] pointer-events-none"
              style={{
                left: ripple.x - 10,
                top: ripple.y - 10,
                width: 20,
                height: 20,
                boxShadow: "0 0 8px rgba(13, 153, 255, 0.4)",
              }}
            />
          ))}

          {/* Main Figma Vector Cursor (Zero latency, exact hardware tip position) */}
          <motion.div
            className="absolute top-0 left-0"
            style={{
              x: mouseX,
              y: mouseY,
              willChange: "transform",
            }}
            animate={{
              scale: isClicking ? 0.86 : 1,
              rotate: isClicking ? -3 : 0,
            }}
            transition={{
              type: "spring",
              stiffness: 900,
              damping: 35,
            }}
          >
            {/* 1. Latest Figma UI3 Move / Selection Arrow */}
            {cursorMode === "arrow" && (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.45)]"
                style={{ transform: "translate(-3px, -2px)" }}
              >
                <path
                  d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 0 1 .35-.15h6.87c.45 0 .67-.54.35-.85L6.35 2.86a.5.5 0 0 0-.85.35Z"
                  fill="#1E1E1E"
                  stroke="#FFFFFF"
                  strokeWidth="1.35"
                  strokeLinejoin="round"
                />
              </svg>
            )}

            {/* 2. Latest Figma UI3 Pointing Hand (Hover on Links / Buttons) */}
            {cursorMode === "pointer" && (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="drop-shadow-[0_2px_5px_rgba(0,0,0,0.45)]"
                style={{ transform: "translate(-6px, -2px)" }}
              >
                <path
                  d="M8.5 2.5a1.5 1.5 0 0 0-1.5 1.5V11a.5.5 0 0 1-1 0V7a1.5 1.5 0 1 0-3 0v9.2c0 4.2 3.4 7.8 7.8 7.8s7.8-3.6 7.8-7.8V11a1.5 1.5 0 0 0-3 0V11.5a.5.5 0 0 1-1 0V9.5a1.5 1.5 0 0 0-3 0V11.5a.5.5 0 0 1-1 0V4a1.5 1.5 0 0 0-1.6-1.5Z"
                  fill="#1E1E1E"
                  stroke="#FFFFFF"
                  strokeWidth="1.35"
                  strokeLinejoin="round"
                />
              </svg>
            )}

            {/* 3. Latest Figma UI3 Pan / Open Hand (Draggable Canvas & Sliders) */}
            {cursorMode === "grab" && (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="drop-shadow-[0_2px_5px_rgba(0,0,0,0.45)]"
                style={{ transform: "translate(-9px, -6px)" }}
              >
                <path
                  d="M6.5 6a1.5 1.5 0 0 1 3 0v4a.5.5 0 0 0 1 0V4a1.5 1.5 0 0 1 3 0v6a.5.5 0 0 0 1 0V5a1.5 1.5 0 0 1 3 0v6a.5.5 0 0 0 1 0V7a1.5 1.5 0 0 1 3 0v7.5a7 7 0 0 1-14 0V9a1.5 1.5 0 0 1 1-1.4V6Z"
                  fill="#1E1E1E"
                  stroke="#FFFFFF"
                  strokeWidth="1.35"
                  strokeLinejoin="round"
                />
              </svg>
            )}

            {/* 4. Latest Figma UI3 Grabbing / Closed Fist (Active Panning) */}
            {cursorMode === "grabbing" && (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="drop-shadow-[0_2px_5px_rgba(0,0,0,0.45)]"
                style={{ transform: "translate(-9px, -6px)" }}
              >
                <path
                  d="M8.5 8a1.5 1.5 0 0 1 3 0v2a.5.5 0 0 0 1 0V7a1.5 1.5 0 0 1 3 0v3a.5.5 0 0 0 1 0V8a1.5 1.5 0 0 1 3 0v3a.5.5 0 0 0 1 0V9.5a1.5 1.5 0 0 1 3 0v3.5a6.5 6.5 0 0 1-13 0V10a1.5 1.5 0 0 1 1-1.4V8Z"
                  fill="#1E1E1E"
                  stroke="#FFFFFF"
                  strokeWidth="1.35"
                  strokeLinejoin="round"
                />
              </svg>
            )}

            {/* 5. Latest Figma UI3 Crosshair Frame / Inspect Tool */}
            {cursorMode === "crosshair" && (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.45)]"
                style={{ transform: "translate(-12px, -12px)" }}
              >
                <path
                  d="M12 2v7m0 6v7M2 12h7m6 0h7"
                  stroke="#1E1E1E"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M12 3v5m0 8v5M3 12h5m8 0h5"
                  stroke="#FFFFFF"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
                <circle cx="12" cy="12" r="1.5" fill="#FFFFFF" stroke="#1E1E1E" strokeWidth="1" />
              </svg>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
