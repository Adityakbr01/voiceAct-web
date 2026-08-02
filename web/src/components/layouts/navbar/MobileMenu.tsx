"use client";

import { useState, memo } from "react";
import { cn } from "@/lib/utils";
import { X, ChevronDown } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from "@/components/ui/sheet";
import { NAV_ITEMS, services } from "@/config/services";
import { company } from "@/modules/company-data";
import { Logo } from "./Logo";
import { CTA } from "./CTA";
import { motion } from "framer-motion";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  activeHref: string;
  onSetActiveHref: (href: string) => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3 },
  },
};

function MobileServiceAccordion() {
  const [openCategory, setOpenCategory] = useState<string | null>(null);

  const toggleCategory = (category: string) => {
    setOpenCategory((prev) => (prev === category ? null : category));
  };

  return (
    <div className="space-y-1" role="region" aria-label="Services">
      {services.map((category) => {
        const isOpen = openCategory === category.category;
        return (
          <div key={category.category}>
            <button
              type="button"
              onClick={() => toggleCategory(category.category)}
              className={cn(
                "flex items-center justify-between w-full py-2 text-xl font-black uppercase tracking-wider transition-colors",
                isOpen
                  ? "text-primary"
                  : "text-foreground hover:text-primary",
              )}
              aria-expanded={isOpen}
              aria-controls={`mobile-services-${category.category}`}
            >
              <span>{category.category}</span>
              <ChevronDown
                className={cn(
                  "size-5 flex-shrink-0 transition-transform duration-300 ease-out",
                  isOpen && "rotate-180",
                )}
                aria-hidden="true"
              />
            </button>
            {isOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                id={`mobile-services-${category.category}`}
                role="region"
                aria-label={`${category.category} services`}
                className="overflow-hidden pl-4 space-y-1"
              >
                {category.items.map((item) => (
                  <a
                    key={item.title}
                    href={item.href}
                    onClick={() => setOpenCategory(null)}
                    className="flex items-center gap-3 py-1.5 text-sm font-bold uppercase tracking-wide text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <item.icon className="size-4 text-primary" aria-hidden="true" />
                    <span>{item.title}</span>
                  </a>
                ))}
              </motion.div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export const MobileMenu = memo(function MobileMenu({
  isOpen,
  onClose,
  activeHref,
  onSetActiveHref,
}: MobileMenuProps) {
  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent
        side="left"
        className="w-[85%] max-w-xs sm:max-w-sm bg-background text-foreground border-r border-border p-6 flex flex-col justify-between overflow-y-auto [&>button]:hidden"
      >
        <div className="flex flex-col min-h-full">
          {/* Header with Logo and Circular Close Button */}
          <SheetHeader className="p-0 text-left">
            <div className="flex items-center justify-between pb-6">
              <Logo />
              <SheetClose className="flex items-center justify-center size-10 rounded-full border-2 border-foreground/30 text-foreground hover:border-foreground hover:bg-foreground/5 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                <X className="size-5 stroke-[2.5]" />
                <span className="sr-only">Close menu</span>
              </SheetClose>
            </div>
            <SheetTitle className="sr-only">Mobile Navigation Menu</SheetTitle>
            <SheetDescription className="sr-only">
              Navigation menu with links and company contact details
            </SheetDescription>
          </SheetHeader>

          {/* Navigation Links with Framer Motion Stagger Animation */}
          <motion.nav
            variants={containerVariants}
            initial="hidden"
            animate={isOpen ? "show" : "hidden"}
            className="flex-1 py-4"
            aria-label="Mobile navigation"
          >
            <ul className="flex flex-col gap-3">
              {NAV_ITEMS.map((item) => {
                const isActive = item.href === activeHref;

                if ("hasDropdown" in item && item.hasDropdown) {
                  return (
                    <motion.li key={item.href} variants={itemVariants}>
                      <MobileServiceAccordion />
                    </motion.li>
                  );
                }

                return (
                  <motion.li key={item.href} variants={itemVariants}>
                    <a
                      href={item.href}
                      aria-current={isActive ? "page" : undefined}
                      onClick={() => {
                        onSetActiveHref(item.href);
                        onClose();
                      }}
                      className={cn(
                        "block text-2xl font-black uppercase tracking-wider transition-colors",
                        isActive
                          ? "text-primary font-black"
                          : "text-foreground hover:text-primary",
                      )}
                    >
                      {item.label}
                    </a>
                  </motion.li>
                );
              })}
            </ul>

            {/* CTA Button in Drawer */}
            <motion.div variants={itemVariants} className="pt-4 pb-2">
              <CTA className="w-full justify-center py-2.5 text-sm" />
            </motion.div>

            {/* Divider Line with Stagger */}
            <motion.div variants={itemVariants} className="my-5">
              <hr className="border-t-2 border-foreground/80 dark:border-foreground/60 w-full" />
            </motion.div>

            {/* Address & Contact Block with Stagger */}
            <motion.div variants={itemVariants} className="space-y-4">
              <div className="text-sm font-black uppercase tracking-wider text-foreground/90 leading-relaxed">
                <p>{company.address.street},</p>
                <p>{company.address.city}, {company.address.state},</p>
                <p>{company.address.pincode}</p>
              </div>
              <div className="text-xs font-bold uppercase tracking-wider space-y-1 text-muted-foreground">
                <a
                  href={`tel:${company.contact.phone}`}
                  className="block hover:text-primary transition-colors"
                >
                  {company.contact.phone}
                </a>
                <a
                  href={`mailto:${company.contact.email}`}
                  className="block hover:text-primary transition-colors"
                >
                  {company.contact.email}
                </a>
              </div>
            </motion.div>
          </motion.nav>
        </div>
      </SheetContent>
    </Sheet>
  );
});

MobileMenu.displayName = "MobileMenu";