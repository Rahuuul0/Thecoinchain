"use client";

import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { X } from "lucide-react";
import { cn } from "./cn";

const WIDTHS = { xs: "max-w-[444px]", sm: "max-w-[600px]", md: "max-w-[900px]", lg: "max-w-[1200px]" };

/** Centered dialog (replaces MUI Modal/Dialog). */
export function Modal({ open, onClose, title, maxWidth = "sm", showClose = true, className, backdropClassName, children }) {
  return (
    <Dialog open={!!open} onClose={onClose} className="relative z-[1300]">
      <DialogBackdrop transition className={cn("fixed inset-0 bg-black/50 transition-opacity duration-200 data-closed:opacity-0", backdropClassName)} />
      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-3 sm:p-4">
          <DialogPanel
            transition
            className={cn(
              "relative w-full rounded-2xl bg-surface p-6 text-fg shadow-2xl transition duration-200 data-closed:scale-95 data-closed:opacity-0",
              WIDTHS[maxWidth],
              className
            )}
          >
            {title && <DialogTitle className="mb-4 pr-10 text-xl font-bold">{title}</DialogTitle>}
            {showClose && (
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="absolute top-4 right-4 flex size-10 items-center justify-center rounded-full border-2 border-line text-fg hover:border-fg"
              >
                <X className="size-5" />
              </button>
            )}
            {children}
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
