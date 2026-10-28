"use client";

import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import Link from "next/link";
import { cn } from "./cn";

/**
 * Anchored dropdown menu (replaces MUI Menu/MenuItem).
 * `button` is the trigger content; children are <DropdownItem>s.
 */
export function Dropdown({ button, buttonClassName, anchor = "bottom end", className, children }) {
  return (
    <Menu>
      <MenuButton className={buttonClassName}>{button}</MenuButton>
      <MenuItems
        transition
        anchor={anchor}
        className={cn(
          "z-[1250] min-w-48 rounded-2xl border border-line bg-surface p-2 text-fg shadow-[0_16px_64px_-16px_rgba(31,47,70,0.25)] [--anchor-gap:8px] transition duration-150 outline-none data-closed:scale-95 data-closed:opacity-0",
          className
        )}
      >
        {children}
      </MenuItems>
    </Menu>
  );
}

export function DropdownItem({ href, onClick, className, children }) {
  const classes = cn(
    "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm font-medium text-fg! no-underline data-focus:bg-subtle",
    className
  );
  return (
    <MenuItem>
      {href ? (
        <Link href={href} className={classes} onClick={onClick}>
          {children}
        </Link>
      ) : (
        <button type="button" className={classes} onClick={onClick}>
          {children}
        </button>
      )}
    </MenuItem>
  );
}
