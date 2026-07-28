"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { site, nav } from "@/modules/site";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import { ThemeToggle } from "@/modules/home/components/theme-toggle";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

type MenuState = "closed" | "opening" | "open" | "closing";

export function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuState, setMenuState] = useState<MenuState>("closed");
  const [activeHref, setActiveHref] = useState<string>(nav[0]?.href ?? "");

  const headerRef = useRef<HTMLElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const scrimRef = useRef<HTMLDivElement>(null);
  const burgerTopRef = useRef<HTMLSpanElement>(null);
  const burgerBotRef = useRef<HTMLSpanElement>(null);
  const burgerBtnRef = useRef<HTMLButtonElement>(null);
  const lastYRef = useRef(0);
  const hiddenRef = useRef(false);

  const drawerOpen = menuState === "opening" || menuState === "open";

  // Intro animation
  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
      tl.from(pillRef.current, { y: -40, opacity: 0, duration: 0.9 })
        .from(logoRef.current, { x: -12, opacity: 0, duration: 0.6 }, "-=0.55")
        .from(
          linksRef.current?.querySelectorAll("[data-pill-item]") ?? [],
          { y: -10, opacity: 0, duration: 0.5, stagger: 0.06 },
          "-=0.5",
        )
        .from(ctaRef.current, { scale: 0.85, opacity: 0, duration: 0.5 }, "-=0.4");
    },
    { scope: headerRef },
  );

  // Scroll: dock, hide-on-scroll
  useEffect(() => {
    let raf = 0;
    const update = () => {
      const y = window.scrollY;
      setScrolled(y > 12);

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
    };
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        update();
      });
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [menuState]);

  // Dock tween
  useGSAP(
    () => {
      gsap.to(pillRef.current, {
        scale: scrolled ? 0.97 : 1,
        duration: 0.5,
        ease: "power3.out",
      });
    },
    { dependencies: [scrolled] },
  );

  // Active section tracking
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

  // Drawer open/close
  useGSAP(
    () => {
      const drawer = drawerRef.current;
      const scrim = scrimRef.current;
      if (!drawer || !scrim) return;

      if (menuState === "opening") {
        gsap.set(scrim, { opacity: 0, backdropFilter: "blur(0px)" });
        gsap.set(drawer, {
          opacity: 0,
          y: -16,
          scale: 0.98,
          backdropFilter: "blur(0px)",
        });
        const tl = gsap.timeline({
          defaults: { ease: "expo.out" },
          onComplete: () => setMenuState("open"),
        });
        tl.to(scrim, { opacity: 1, backdropFilter: "blur(10px)", duration: 0.5 }, 0)
          .to(
            drawer,
            { opacity: 1, y: 0, scale: 1, backdropFilter: "blur(24px)", duration: 0.6 },
            0,
          )
          .fromTo(
            drawer.querySelectorAll("[data-mobile-item]"),
            { y: 14, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.45, stagger: 0.05, ease: "power3.out" },
            0.1,
          );
      } else if (menuState === "closing") {
        const tl = gsap.timeline({
          defaults: { ease: "power3.in" },
          onComplete: () => setMenuState("closed"),
        });
        tl.to(
          drawer.querySelectorAll("[data-mobile-item]"),
          { y: 8, opacity: 0, duration: 0.2, stagger: 0.02 },
          0,
        )
          .to(
            drawer,
            { opacity: 0, y: -12, scale: 0.98, backdropFilter: "blur(0px)", duration: 0.35 },
            0.05,
          )
          .to(scrim, { opacity: 0, backdropFilter: "blur(0px)", duration: 0.35 }, 0.05);
      }
    },
    { dependencies: [menuState] },
  );

  // Hamburger morph
  useGSAP(
    () => {
      const t = burgerTopRef.current;
      const b = burgerBotRef.current;
      if (!t || !b) return;
      if (drawerOpen) {
        gsap.to(t, { y: 3, rotate: 45, duration: 0.4, ease: "expo.out" });
        gsap.to(b, { y: -3, rotate: -45, duration: 0.4, ease: "expo.out" });
      } else {
        gsap.to(t, { y: 0, rotate: 0, duration: 0.4, ease: "expo.out" });
        gsap.to(b, { y: 0, rotate: 0, duration: 0.4, ease: "expo.out" });
      }
    },
    { dependencies: [drawerOpen] },
  );

  // Escape + body scroll lock
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

  const toggleMenu = () => {
    setMenuState((s) => (s === "closed" || s === "closing" ? "opening" : "closing"));
  };
  const closeMenu = () => {
    setMenuState((s) => (s === "open" || s === "opening" ? "closing" : s));
  };

  return (
    <header
      ref={headerRef}
      role="banner"
      className={cn("fixed inset-x-0 top-6 z-50 transition-[padding] duration-500")}
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 md:px-10">
        <div
          ref={pillRef}
          className={cn(
            "relative flex flex-1 items-center justify-between gap-8 rounded-full px-4 py-2 transition-[background-color,border-color,box-shadow] duration-500 md:px-6",
            scrolled && "glass-strong",
          )}
        >
          <span
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 w-24 rounded-l-full bg-[radial-gradient(ellipse_at_left,var(--gradient-accent)_0%,transparent_70%)] opacity-20"
          />
          <a
            ref={logoRef}
            href="#"
            className="group relative z-10 flex items-center gap-2 rounded-full font-display text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
          >
            <span className="tracking-tight">{site.shortName}</span>
          </a>

          <nav
            aria-label="Primary"
            ref={linksRef}
            className="relative z-10 hidden items-center gap-0.5 md:flex"
          >
            {nav.map((item) => {
              const isActive = item.href === activeHref;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  data-href={item.href}
                  data-pill-item
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "nav-pill-flip group relative overflow-hidden rounded-full px-3.5 py-1.5 text-sm focus-visible:outline-none",
                    isActive ? "font-medium text-foreground" : "text-muted-foreground",
                  )}
                >
                  <span className="nav-pill-flip-inner relative block h-[1.2em] leading-[1.2em] whitespace-nowrap overflow-hidden">
                    <span className="nav-pill-flip-current relative block transition-transform duration-300 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:-translate-y-full">
                      {item.label}
                    </span>
                    <span className="nav-pill-flip-next absolute inset-x-0 top-0 block translate-y-full transition-transform duration-300 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:translate-y-0">
                      {item.label}
                    </span>
                  </span>
                </a>
              );
            })}
          </nav>

          <div ref={ctaRef} className="relative z-10 flex items-center gap-2">
            <ThemeToggle />
            <Button asChild size="sm" variant="glow" className="group hidden md:inline-flex">
              <a href="#contact" className="flex items-center gap-1.5">
                <span>Book a call</span>
                <span className="relative inline-flex size-3.5 items-center justify-center overflow-hidden">
                  <ArrowUpRight className="size-3.5 transition-transform duration-300 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:-translate-y-[120%] group-hover:translate-x-[120%]" />
                  <ArrowUpRight className="absolute size-3.5 -translate-x-[120%] translate-y-[120%] transition-transform duration-300 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:translate-x-0 group-hover:translate-y-0" />
                </span>
              </a>
            </Button>
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

      {menuState !== "closed" ? (
        <>
          <div
            ref={scrimRef}
            aria-hidden
            onClick={closeMenu}
            style={{ opacity: 0 }}
            className="fixed inset-0 -z-[1] bg-background/50 md:hidden"
          />
          <div
            id="mobile-nav"
            ref={drawerRef}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            style={{ opacity: 0 }}
            className="mx-6 mt-3 md:hidden"
          >
            <div className="glass-strong flex flex-col gap-1 rounded-3xl p-3">
              {nav.map((item) => {
                const isActive = item.href === activeHref;
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    data-mobile-item
                    aria-current={isActive ? "page" : undefined}
                    onClick={closeMenu}
                    className={cn(
                      "flex items-center justify-between rounded-2xl px-4 py-3 text-sm transition-colors",
                      isActive
                        ? "bg-foreground/[0.06] text-foreground"
                        : "text-muted-foreground hover:bg-foreground/[0.04] hover:text-foreground",
                    )}
                  >
                    <span>{item.label}</span>
                    <ArrowUpRight className="size-3.5 opacity-40" />
                  </a>
                );
              })}
              <Button asChild size="sm" variant="glow" className="mt-2" data-mobile-item>
                <a href="#contact" onClick={closeMenu}>
                  Book a call
                </a>
              </Button>
            </div>
          </div>
        </>
      ) : null}
    </header>
  );
}
