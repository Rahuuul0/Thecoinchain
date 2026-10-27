import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Fragment } from "react";
import { cn } from "./cn";

/** `items`: [{ label, href? }] — the last item renders as the current page. */
export function Breadcrumbs({ items, className }) {
  return (
    <nav aria-label="breadcrumb" className={cn("flex flex-wrap items-center gap-2 font-display text-sm font-bold", className)}>
      {items.map((item, i) => {
        const last = i === items.length - 1;
        return (
          <Fragment key={i}>
            {item.href && !last ? (
              <Link href={item.href} onClick={item.onClick} className="text-n4! no-underline hover:text-fg!">
                {item.label}
              </Link>
            ) : (
              <span className={last ? "text-fg" : "text-n4"} aria-current={last ? "page" : undefined}>
                {item.label}
              </span>
            )}
            {!last && <ChevronRight className="size-4 text-n4" />}
          </Fragment>
        );
      })}
    </nav>
  );
}
