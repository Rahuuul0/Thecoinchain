"use client";

import { cn } from "./cn";

/**
 * Controlled tab strip (replaces MUI Tabs/TabList).
 * `items`: [{ value, label, icon? }]
 */
export function Tabs({ items, value, onChange, className, tabClassName, activeClassName, variant = "pill" }) {
  return (
    <div role="tablist" className={cn("flex gap-2 overflow-x-auto scrollbar-none", className)}>
      {items.map((item) => {
        const active = item.value === value;
        return (
          <button
            key={item.value}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange?.(item.value)}
            className={cn(
              "inline-flex shrink-0 items-center gap-2 font-display text-sm font-bold whitespace-nowrap transition-colors",
              variant === "pill" && "rounded-full px-4 py-1.5",
              variant === "pill" && (active ? "bg-n3 text-n8" : "text-n4 hover:text-fg"),
              variant === "underline" && "border-b-2 px-1 pb-2",
              variant === "underline" && (active ? "border-primary text-fg" : "border-transparent text-n4 hover:text-fg"),
              tabClassName,
              active && activeClassName
            )}
          >
            {item.icon}
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
