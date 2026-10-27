"use client";

import parse from "html-react-parser";
import { useEffect } from "react";
import CryptoTickerMarquee from "@/components/CryptoTickerMarquee";
import PageBreadcrumbs from "@/components/PageBreadcrumbs";
import { Container } from "@/components/ui";
import { itemImage } from "@/lib/content";

/** Academy course pages: a list of titled sections with an image and HTML body. */
export default function CourseList({ crumb, entries, load, descriptionKey = "description", withTicker = false }) {
  useEffect(() => {
    load?.();
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {withTicker && (
        <div className="relative z-[1] mt-14 sm:mt-16">
          <CryptoTickerMarquee />
        </div>
      )}
      <div className="bg-page">
        <Container>
          <PageBreadcrumbs items={[{ label: "Home", href: "/" }, { label: crumb }]} />
          {entries?.map((entry, i) => {
            const image = itemImage(entry);
            return (
              <div key={entry.id ?? i}>
                <div className="mt-[29px] flex items-center justify-between bg-page pb-[21px] max-md:flex-wrap">
                  <h2 className="mt-[30px] font-display max-[1025px]:text-[40px]! max-md:text-[32px]!">{entry.title}</h2>
                </div>
                <div>
                  {image && <img src={image} alt="" />}
                  <div className="html-content [&_p]:text-base! [&_p]:leading-[1.43] [&_p]:tracking-[1.1px]">{parse(entry[descriptionKey] || "")}</div>
                </div>
              </div>
            );
          })}
        </Container>
      </div>
    </>
  );
}
