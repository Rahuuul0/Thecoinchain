"use client";

import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/react";
import { ChevronDown } from "lucide-react";
import { cn } from "./cn";

/**
 * Styled select (replaces MUI Select).
 * `options`: [{ value, label, icon? }]
 */
export function Select({ value, onChange, options, placeholder = "Select", className, buttonClassName }) {
  const selected = options.find((o) => o.value === value);
  return (
    <Listbox value={value} onChange={onChange}>
      <div className={cn("relative", className)}>
        <ListboxButton
          className={cn(
            "flex w-full items-center justify-between gap-2 rounded-card border-2 border-line bg-surface px-4 py-2.5 text-left text-sm font-medium text-fg",
            buttonClassName
          )}
        >
          <span className="flex min-w-0 items-center gap-2 truncate">
            {selected ? (
              <>
                {selected.icon}
                {selected.label}
              </>
            ) : (
              <span className="text-muted">{placeholder}</span>
            )}
          </span>
          <ChevronDown className="size-4 shrink-0 text-muted" />
        </ListboxButton>
        <ListboxOptions
          anchor="bottom start"
          transition
          className="z-[1250] max-h-72 w-(--button-width) overflow-y-auto rounded-card border border-line bg-surface p-1 shadow-xl [--anchor-gap:6px] transition duration-100 outline-none data-closed:opacity-0"
        >
          {options.map((option) => (
            <ListboxOption
              key={option.value}
              value={option.value}
              className="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm text-fg data-focus:bg-subtle data-selected:font-bold"
            >
              {option.icon}
              {option.label}
            </ListboxOption>
          ))}
        </ListboxOptions>
      </div>
    </Listbox>
  );
}
