"use client";

import { ChevronFirst, ChevronLast, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "./cn";

function pageList(count, page) {
  if (count <= 7) return Array.from({ length: count }, (_, i) => i + 1);
  const pages = [1];
  const start = Math.max(2, page - 1);
  const end = Math.min(count - 1, page + 1);
  if (start > 2) pages.push("…");
  for (let p = start; p <= end; p++) pages.push(p);
  if (end < count - 1) pages.push("…");
  pages.push(count);
  return pages;
}

/** 1-based pagination (replaces MUI Pagination). */
export function Pagination({ count, page, onChange, showFirstLast = false, className, itemClassName, activeClassName }) {
  if (!count || count < 2) return null;
  const item = cn(
    "flex size-9 items-center justify-center rounded-full text-sm font-bold text-fg transition-colors hover:bg-subtle disabled:pointer-events-none disabled:opacity-40",
    itemClassName
  );
  const go = (p) => p !== page && onChange(p);

  return (
    <nav aria-label="pagination" className={cn("flex flex-wrap items-center justify-center gap-1", className)}>
      {showFirstLast && (
        <button type="button" className={item} disabled={page <= 1} onClick={() => go(1)} aria-label="First page">
          <ChevronFirst className="size-4" />
        </button>
      )}
      <button type="button" className={item} disabled={page <= 1} onClick={() => go(page - 1)} aria-label="Previous page">
        <ChevronLeft className="size-4" />
      </button>
      {pageList(count, page).map((p, i) =>
        p === "…" ? (
          <span key={`gap-${i}`} className="px-1 text-muted">
            …
          </span>
        ) : (
          <button
            key={p}
            type="button"
            onClick={() => go(p)}
            aria-current={p === page ? "page" : undefined}
            className={cn(item, p === page && (activeClassName || "bg-primary text-white hover:bg-primary"))}
          >
            {p}
          </button>
        )
      )}
      <button type="button" className={item} disabled={page >= count} onClick={() => go(page + 1)} aria-label="Next page">
        <ChevronRight className="size-4" />
      </button>
      {showFirstLast && (
        <button type="button" className={item} disabled={page >= count} onClick={() => go(count)} aria-label="Last page">
          <ChevronLast className="size-4" />
        </button>
      )}
    </nav>
  );
}
