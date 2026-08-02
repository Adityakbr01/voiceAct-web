"use client";

import { useEffect, useRef } from "react";
import { memo } from "react";
import { cn } from "@/lib/utils";
import { services, type ServiceCategory, type ServiceItem } from "@/config/services";
import gsap from "gsap";
import { ArrowUpRight } from "lucide-react";

interface ServiceDropdownProps {
  id: string;
  onClose: () => void;
}

function ServiceCategoryColumn({ category }: { category: ServiceCategory }) {
  return (
    <div className="flex flex-col gap-3">
      <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {category.category}
      </h4>
      {category.items.map((item) => (
        <a
          key={item.title}
          href={item.href}
          className="group flex items-start gap-3 rounded-xl p-3 transition-all duration-300 hover:bg-foreground/[0.04] hover:translate-x-1"
        >
          <span className="relative flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-background group-hover:scale-110">
            <item.icon className="size-4" aria-hidden="true" />
          </span>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
              {item.title}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">{item.description}</p>
          </div>
          <ArrowUpRight
            className="size-3.5 text-muted-foreground/50 group-hover:text-primary transition-all duration-300 group-hover:translate-x-1"
            aria-hidden="true"
          />
        </a>
      ))}
    </div>
  );
}

export const ServiceDropdown = memo(function ServiceDropdown({
  id,
  onClose,
}: ServiceDropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dropdown = dropdownRef.current;
    const items = itemsRef.current;
    if (!dropdown || !items) return;

    gsap.set(dropdown, { opacity: 0, y: 20, scale: 0.96 });
    gsap.set(items.querySelectorAll("[data-service-item]"), { opacity: 0, y: 10 });

    const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
    tl.to(dropdown, { opacity: 1, y: 0, scale: 1, duration: 0.4 }, 0)
      .to(
        items.querySelectorAll("[data-service-item]"),
        { opacity: 1, y: 0, duration: 0.35, stagger: 0.05, ease: "power3.out" },
        0.1,
      );

    return () => {
      gsap.killTweensOf(dropdown);
      gsap.killTweensOf(items.querySelectorAll("[data-service-item]"));
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div
      ref={dropdownRef}
      id={id}
      role="menu"
      aria-label="Services"
      className="absolute left-1/2 -translate-x-1/2 top-full mt-3 z-50 w-full max-w-5xl md:max-w-6xl"
    >
      <div
        ref={itemsRef}
        className="glass-strong rounded-3xl p-4 md:p-6 shadow-2xl border border-white/10"
        data-service-items
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {services.map((category) => (
            <ServiceCategoryColumn key={category.category} category={category} />
          ))}
        </div>
      </div>
    </div>
  );
});

ServiceDropdown.displayName = "ServiceDropdown";