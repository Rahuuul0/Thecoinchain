import { cn } from "./cn";

/** Hover/focus tooltip in pure CSS (replaces MUI Tooltip). */
export function Tooltip({ title, placement = "top", className, tooltipClassName, children }) {
  if (!title) return children;
  return (
    <span className={cn("group/tooltip relative inline-flex", className)}>
      {children}
      <span
        role="tooltip"
        className={cn(
          "pointer-events-none absolute z-50 w-max max-w-64 rounded-md bg-n2 px-2.5 py-1.5 text-xs font-medium text-white opacity-0 shadow-lg transition-opacity group-hover/tooltip:opacity-100 group-focus-within/tooltip:opacity-100 dark:bg-n6 dark:text-n2",
          placement === "top" && "bottom-full left-1/2 mb-2 -translate-x-1/2",
          placement === "bottom" && "top-full left-1/2 mt-2 -translate-x-1/2",
          placement === "right" && "top-1/2 left-full ml-2 -translate-y-1/2",
          placement === "left" && "top-1/2 right-full mr-2 -translate-y-1/2",
          tooltipClassName
        )}
      >
        {title}
      </span>
    </span>
  );
}
