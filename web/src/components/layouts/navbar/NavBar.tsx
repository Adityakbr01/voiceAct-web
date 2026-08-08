"use client";

import { cn } from "@/lib/utils";
import { nav } from "@/modules/site";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useCallback, useEffect, useRef, useState } from "react";
import { CTA } from "./CTA";
import { DesktopNav } from "./DesktopNav";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";

gsap.registerPlugin(useGSAP);

type MenuState = "closed" | "opening" | "open" | "closing";

export function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuState, setMenuState] = useState<MenuState>("closed");
  const [activeHref, setActiveHref] = useState<string>("/#hero");

  const headerRef = useRef<HTMLElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const burgerTopRef = useRef<HTMLSpanElement>(null);
  const burgerBotRef = useRef<HTMLSpanElement>(null);
  const burgerBtnRef = useRef<HTMLButtonElement>(null);
  const lastYRef = useRef(0);
  const hiddenRef = useRef(false);
  const scrolledRef = useRef(false);

  const drawerOpen = menuState === "opening" || menuState === "open";

  const setActiveHrefCallback = useCallback((href: string) => {
    setActiveHref(href);
  }, []);

  const handleScroll = useCallback(() => {
    const y = window.scrollY;

    if (y > 12 !== scrolledRef.current) {
      scrolledRef.current = y > 12;
      setScrolled(y > 12);
    }

    const dy = y - lastYRef.current;

    if (menuState === "closed") {
      if (y < 40) {
        if (hiddenRef.current) {
          hiddenRef.current = false;
          gsap.to(headerRef.current, { y: 0, duration: 0.5, ease: "expo.out" });
        }
      } else if (dy > 6 && y > 120 && !hiddenRef.current) {
        hiddenRef.current = true;
        gsap.to(headerRef.current, { y: -140, duration: 0.5, ease: "expo.inOut" });
      } else if (dy < -6 && hiddenRef.current) {
        hiddenRef.current = false;
        gsap.to(headerRef.current, { y: 0, duration: 0.5, ease: "expo.out" });
      }
    }

    lastYRef.current = y;
  }, [menuState]);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        handleScroll();
      });
    };
    handleScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [handleScroll]);

  useEffect(() => {
    const ids = nav.map((n) => n.href.replace(/^#/, ""));
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActiveHref(`#${visible[0].target.id}`);
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!drawerOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuState("closing");
        burgerBtnRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [drawerOpen]);

  const toggleMenu = useCallback(() => {
    setMenuState((s) => (s === "closed" || s === "closing" ? "opening" : "closing"));
  }, []);

  const closeMenu = useCallback(() => {
    setMenuState((s) => (s === "open" || s === "opening" ? "closing" : s));
  }, []);

  return (
    <header
      ref={headerRef}
      role="banner"
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled ? "bg-background/80 backdrop-blur-xl border-none shadow-none" : "bg-transparent",
      )}
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-0 md:px-10">
        <div
          ref={pillRef}
          className="relative flex flex-1 items-center justify-between gap-8 px-4 py-3 md:px-6"
        >
          <span
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 w-24 rounded-l-full bg-[radial-gradient(ellipse_at_left,var(--gradient-accent)_0%,transparent_70%)] opacity-20"
          />
          <Logo ref={logoRef} />
          <DesktopNav activeHref={activeHref} onSetActiveHref={setActiveHrefCallback} />
          <div ref={ctaRef} className="relative z-10 flex items-center gap-2">
            <div className="hidden md:block">
              <CTA />
            </div>
            <button
              ref={burgerBtnRef}
              type="button"
              aria-label={drawerOpen ? "Close menu" : "Open menu"}
              aria-expanded={drawerOpen}
              aria-controls="mobile-nav"
              onClick={toggleMenu}
              className="glass relative inline-flex size-9 items-center justify-center rounded-full text-foreground transition-colors hover:bg-foreground/[0.06] md:hidden"
            >
              <span className="relative block h-3 w-4">
                <span
                  ref={burgerTopRef}
                  className="absolute left-0 top-0 h-[1.5px] w-4 origin-center rounded-full bg-foreground"
                />
                <span
                  ref={burgerBotRef}
                  className="absolute bottom-0 left-0 h-[1.5px] w-4 origin-center rounded-full bg-foreground"
                />
              </span>
            </button>
          </div>
        </div>
      </div>

      <MobileMenu
        isOpen={drawerOpen}
        onClose={closeMenu}
        activeHref={activeHref}
        onSetActiveHref={setActiveHrefCallback}
      />
    </header>
  );
}
