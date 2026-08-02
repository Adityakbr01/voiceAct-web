"use client";

import { memo, forwardRef, useRef, useImperativeHandle } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { services, NAV_ITEMS } from "@/config/services";
import { ArrowUpRight } from "lucide-react";

interface DesktopNavProps {
  activeHref: string;
  onSetActiveHref: (href: string) => void;
}

function ServiceGrid() {
  return (
    <ul className="grid w-150 grid-cols-3 gap-3 p-4">
      {services.map((category) => (
        <li key={category.category} className="col-span-1">
          <div className="flex flex-col gap-1">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground px-1 mb-1">
              {category.category}
            </p>
            {category.items.map((item) => (
              <li key={item.title}>
                <NavigationMenuLink asChild>
                  <Link
                    href={item.href}
                    className="group flex items-start gap-3 rounded-xl p-2.5 transition-all duration-200 hover:bg-muted/50 select-none"
                  >
                    <span className="relative flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-all duration-200 group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-110">
                      <item.icon className="size-4" aria-hidden="true" />
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium leading-none group-hover:text-primary transition-colors">
                        {item.title}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1 leading-snug">
                        {item.description}
                      </p>
                    </div>
                    <ArrowUpRight
                      className="size-3.5 mt-1 text-muted-foreground/50 group-hover:text-primary transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 opacity-0 group-hover:opacity-100"
                      aria-hidden="true"
                    />
                  </Link>
                </NavigationMenuLink>
              </li>
            ))}
          </div>
        </li>
      ))}
    </ul>
  );
}

export const DesktopNav = memo(
  forwardRef<HTMLDivElement, DesktopNavProps>(function DesktopNav(
    { activeHref, onSetActiveHref },
    ref,
  ) {
    const navRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(ref, () => navRef.current!, []);

    return (
      <nav
        ref={navRef}
        aria-label="Primary navigation"
        className="relative z-10 hidden items-center gap-0.5 md:flex"
      >
        <NavigationMenu>
          <NavigationMenuList className="gap-0.5">
            {NAV_ITEMS.map((item) => {
              const isActive = item.href === activeHref;
              const isServices = "hasDropdown" in item && item.hasDropdown;

              if (isServices) {
                return (
                  <NavigationMenuItem key={item.href}>
                    <NavigationMenuTrigger
                      className={cn(
                        "nav-pill-flip relative overflow-hidden rounded-full px-3.5 py-1.5 text-sm h-auto gap-1.5 !bg-transparent hover:!bg-transparent focus:!bg-transparent data-[state=open]:!bg-transparent",
                        isActive ? "font-medium text-foreground" : "text-muted-foreground",
                      )}
                    >
                      <span className="nav-pill-flip-inner relative block h-[1.2em] leading-[1.2em] whitespace-nowrap overflow-hidden">
                        <span className="nav-pill-flip-current relative block">{item.label}</span>
                        <span className="nav-pill-flip-next absolute inset-x-0 top-0 block">
                          {item.label}
                        </span>
                      </span>
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="w-150! max-w-none! rounded-2xl p-0 bg-popover shadow-2xl">
                      <ServiceGrid />
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                );
              }

              return (
                <NavigationMenuItem key={item.href}>
                  <NavigationMenuLink asChild>
                    <Link
                      href={item.href}
                      onClick={() => onSetActiveHref(item.href)}
                      className={cn(
                        "nav-pill-flip relative overflow-hidden rounded-full px-3.5 py-1.5 text-sm inline-flex h-auto focus-visible:outline-none !bg-transparent hover:!bg-transparent focus:!bg-transparent",
                        isActive ? "font-medium text-foreground" : "text-muted-foreground",
                      )}
                    >
                      <span className="nav-pill-flip-inner relative block h-[1.2em] leading-[1.2em] whitespace-nowrap overflow-hidden">
                        <span className="nav-pill-flip-current relative block">{item.label}</span>
                        <span className="nav-pill-flip-next absolute inset-x-0 top-0 block">
                          {item.label}
                        </span>
                      </span>
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              );
            })}
          </NavigationMenuList>
        </NavigationMenu>
      </nav>
    );
  }),
);

DesktopNav.displayName = "DesktopNav";
