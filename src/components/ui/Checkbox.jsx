import { forwardRef } from "react";
import { cn } from "./cn";

export const Checkbox = forwardRef(function Checkbox({ label, className, ...props }, ref) {
  return (
    <label className={cn("inline-flex cursor-pointer items-center gap-3 text-sm text-fg", className)}>
      <input ref={ref} type="checkbox" className="size-5 shrink-0 cursor-pointer rounded accent-primary" {...props} />
      {label}
    </label>
  );
});
