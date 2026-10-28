"use client";

import parse from "html-react-parser";
import { useEffect } from "react";
import { Container } from "@/components/ui";
import PageBreadcrumbs from "./PageBreadcrumbs";

/** Simple CMS page: breadcrumb, then a heading + HTML body per entry. */
export default function CmsTextPage({ crumb, entries, load }) {
  useEffect(() => {
    load?.();
    window.scrollTo({ top: 1, left: 1, behavior: "smooth" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="mt-16 bg-page sm:mb-16">
      <Container>
        <PageBreadcrumbs items={[{ label: "Home", href: "/" }, { label: crumb }]} />
        {entries?.map((entry, i) => (
          <div key={entry.id ?? i}>
            <div className="flex items-center justify-between bg-page py-10 max-md:flex-wrap max-md:py-8">
              <h2 className="font-display max-[1025px]:text-[40px]! max-md:text-[32px]!">{entry.title}</h2>
            </div>
            <div className="html-content mb-10 [&_p]:mb-6">{parse(entry.description || "")}</div>
          </div>
        ))}
      </Container>
    </div>
  );
}
