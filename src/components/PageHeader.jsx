import { Breadcrumbs, cn } from "@/components/ui";

/** Page title on the left, breadcrumbs on the right (the old `.subscription-wrapper-head`). */
export default function PageHeader({ title, crumbs, className, titleClassName }) {
  return (
    <div className={cn("flex items-center justify-between bg-page py-10 max-md:flex-wrap max-md:py-8", className)}>
      <h2 className={cn("font-display max-[1025px]:text-[40px]! max-md:text-[32px]!", titleClassName)}>{title}</h2>
      {crumbs && (
        <Breadcrumbs items={crumbs} className="[&>span:last-of-type]:text-xs [&>span:last-of-type]:font-semibold [&>span:last-of-type]:text-n3 dark:[&>span:last-of-type]:text-n7" />
      )}
    </div>
  );
}
