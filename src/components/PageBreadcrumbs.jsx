import { Breadcrumbs, cn } from "@/components/ui";

/**
 * Breadcrumb row used at the top of content pages: right-aligned on
 * desktop, left-aligned below 1025px.
 * `items`: [{ label, href? }] — usually starts with Home.
 */
export default function PageBreadcrumbs({ items, className }) {
  return (
    <div className={cn("flex justify-start pt-[68px] min-[1025px]:justify-end", className)}>
      <Breadcrumbs items={items} className="[&>span:last-of-type]:text-xs [&>span:last-of-type]:font-semibold [&>span:last-of-type]:text-n3 dark:[&>span:last-of-type]:text-n7" />
    </div>
  );
}
