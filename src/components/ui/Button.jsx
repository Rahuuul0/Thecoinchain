import Link from "next/link";
import { forwardRef } from "react";
import { cn } from "./cn";
import { Spinner } from "./Spinner";

const VARIANTS = {
  primary: "bg-primary text-n8 hover:bg-primary-dark",
  secondary: "bg-fg text-inverse hover:opacity-90",
  outlined: "border-2 border-line text-fg hover:border-fg",
  dark: "bg-fg text-inverse hover:opacity-90",
  success: "bg-success text-white hover:opacity-90",
  danger: "bg-danger text-n8 hover:opacity-90",
  ghost: "text-fg hover:bg-subtle",
  link: "px-0! py-0! text-primary hover:underline",
};

const SIZES = {
  sm: "px-3 py-1 text-xs",
  md: "px-6 py-2.5 text-sm",
  lg: "px-6 py-4 text-base",
};

/**
 * Pill button used across the site (the old `.btn` classes).
 * Pass `href` to render a Next <Link>, `loading` to show a spinner.
 */
export const Button = forwardRef(function Button(
  { variant = "primary", size = "md", href, loading = false, disabled, className, children, type = "button", fullWidth, ...props },
  ref
) {
  const classes = cn(
    "inline-flex items-center justify-center gap-3 rounded-full font-display font-bold whitespace-nowrap transition-colors disabled:opacity-60",
    VARIANTS[variant],
    SIZES[size],
    fullWidth && "w-full",
    className
  );

  if (href) {
    return (
      <Link ref={ref} href={href} className={cn(classes, "no-underline")} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button ref={ref} type={type} disabled={disabled || loading} className={classes} {...props}>
      {loading && <Spinner size={16} className="text-current" />}
      {children}
    </button>
  );
});

export const IconButton = forwardRef(function IconButton({ className, type = "button", ...props }, ref) {
  return (
    <button
      ref={ref}
      type={type}
      className={cn("inline-flex shrink-0 items-center justify-center rounded-full p-2 text-muted transition-colors hover:bg-black/5 dark:hover:bg-white/10", className)}
      {...props}
    />
  );
});
