"use client";

import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { cn } from "./cn";

/** Slide-in side panel (replaces MUI Drawer). */
export function Drawer({ open, onClose, side = "left", className, children }) {
  return (
    <Dialog open={!!open} onClose={onClose} className="relative z-[1200]">
      <DialogBackdrop transition className="fixed inset-0 bg-black/50 transition-opacity duration-300 data-closed:opacity-0" />
      <DialogPanel
        transition
        className={cn(
          "fixed inset-y-0 flex w-[85vw] max-w-sm flex-col overflow-y-auto bg-surface text-fg shadow-2xl transition-transform duration-300",
          side === "left" ? "left-0 data-closed:-translate-x-full" : "right-0 data-closed:translate-x-full",
          className
        )}
      >
        {children}
      </DialogPanel>
    </Dialog>
  );
}
