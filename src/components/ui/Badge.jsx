import { cn } from "./cn";

/** Dot/count badge pinned to the top-right of its child (replaces MUI Badge). */
export function Badge({ content, dot, invisible, className, children }) {
  return (
    <span className="relative inline-flex">
      {children}
      {!invisible && (dot || content) ? (
        <span
          className={cn(
            "absolute -top-0.5 -right-0.5 flex items-center justify-center rounded-full bg-success text-[10px] font-bold text-white",
            dot ? "size-2.5" : "h-4.5 min-w-4.5 px-1",
            className
          )}
        >
          {!dot && content}
        </span>
      ) : null}
    </span>
  );
}

export function Chip({ className, children, ...props }) {
  return (
    <span className={cn("inline-flex items-center gap-1 rounded-full bg-subtle px-3 py-1 text-xs font-semibold text-fg", className)} {...props}>
      {children}
    </span>
  );
}

export function Avatar({ src, alt = "", className, children }) {
  return (
    <span className={cn("inline-flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-subtle font-bold text-fg", className)}>
      {src ? <img src={src} alt={alt} className="size-full object-cover" /> : children}
    </span>
  );
}
