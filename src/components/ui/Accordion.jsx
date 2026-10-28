"use client";

import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { ChevronDown } from "lucide-react";
import { cn } from "./cn";

/** Collapsible section (replaces MUI Accordion). */
export function Accordion({ title, children, defaultOpen = false, className, buttonClassName, panelClassName }) {
  return (
    <Disclosure as="div" defaultOpen={defaultOpen} className={cn("border-b border-line", className)}>
      <DisclosureButton className={cn("group flex w-full items-center justify-between gap-4 py-4 text-left font-medium text-fg", buttonClassName)}>
        {title}
        <ChevronDown className="size-5 shrink-0 text-muted transition-transform group-data-open:rotate-180" />
      </DisclosureButton>
      <DisclosurePanel className={cn("pb-4", panelClassName)}>{children}</DisclosurePanel>
    </Disclosure>
  );
}
