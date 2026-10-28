import { cn } from "./cn";

export function Spinner({ size = 40, className }) {
  return (
    <span
      role="progressbar"
      aria-label="Loading"
      className={cn("inline-block animate-spin rounded-full border-[3px] border-current border-r-transparent text-primary", className)}
      style={{ width: size, height: size }}
    />
  );
}

/** Full-screen dimmed overlay with a spinner (replaces MUI <Backdrop>). */
export function LoadingOverlay({ open, className }) {
  if (!open) return null;
  return (
    <div className={cn("fixed inset-0 z-[1300] flex items-center justify-center bg-black/50", className)}>
      <Spinner className="text-white" />
    </div>
  );
}
