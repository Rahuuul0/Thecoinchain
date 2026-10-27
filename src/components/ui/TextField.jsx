import { forwardRef, useId } from "react";
import { cn } from "./cn";

/** The bordered input box used by every form on the site. */
export const inputBox =
  "flex w-full items-center gap-2 rounded-xl border-2 border-n6 bg-n8 py-[11.5px] pr-[5px] pl-4 text-n2 transition-colors focus-within:border-primary dark:border-n3 dark:bg-n2 dark:text-n8";

export const fieldLabel = "text-xs font-bold text-n5 uppercase transition-colors group-focus-within/field:text-primary";

/**
 * Labelled input with optional adornments and error text.
 * Forwards its ref so react-hook-form's `register()` works unchanged.
 */
export const TextField = forwardRef(function TextField(
  { label, error, helperText, startAdornment, endAdornment, multiline, rows = 4, className, boxClassName, inputClassName, id, ...props },
  ref
) {
  const autoId = useId();
  const inputId = id || autoId;
  const Field = multiline ? "textarea" : "input";

  return (
    <div className={cn("group/field flex w-full flex-col gap-1.5", className)}>
      {label && (
        <label htmlFor={inputId} className={fieldLabel}>
          {label}
        </label>
      )}
      <div className={cn(inputBox, error && "border-danger focus-within:border-danger", boxClassName)}>
        {startAdornment}
        <Field
          ref={ref}
          id={inputId}
          rows={multiline ? rows : undefined}
          aria-invalid={!!error || undefined}
          className={cn("min-w-0 flex-1 bg-transparent text-sm font-medium text-inherit outline-none placeholder:text-n4", multiline && "resize-y", inputClassName)}
          {...props}
        />
        {endAdornment}
      </div>
      {helperText && <p className={cn("text-xs!", error ? "text-danger!" : "text-muted!")}>{helperText}</p>}
    </div>
  );
});

/** Red validation message under a field (the old `.frm-message`). */
export function FieldError({ children, className }) {
  if (!children) return null;
  return <div className={cn("text-[13px] leading-[1.5] text-red-600", className)}>{children}</div>;
}
