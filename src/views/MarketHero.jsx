"use client";

import parse from "html-react-parser";
import { useAtomValue } from "jotai";
import { useEffect } from "react";
import { bannerListActions } from "@/_actions";
import { MarketBannerAtom } from "@/_state";
import { Container } from "@/components/ui";
import { itemImage } from "@/lib/content";

/** Banner at the top of the market pages (content from the CMS). */
export default function MarketHero() {
  const bannerActions = bannerListActions();
  const banners = useAtomValue(MarketBannerAtom);

  useEffect(() => {
    bannerActions.marketBannerList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="relative z-[1] flex min-h-[490px] items-center overflow-hidden bg-[#DECBE9] max-md:min-h-0 max-md:py-16 dark:bg-ink">
      {banners?.map((banner, i) => (
        <Container key={i} className="flex min-h-[690px] items-center max-[1025px]:min-h-[571px] max-md:min-h-0">
          <div className="w-full">
            <div className="relative z-[2] sm:w-2/3 lg:w-1/2">
              <h1 className="mb-8 font-display font-bold max-md:mb-4">{banner.title}</h1>
              <div className="text-2xl text-n3 max-md:text-base dark:text-[#B1B5C3]">{parse(banner.decription || "")}</div>
            </div>
            <div className="absolute top-1/2 right-0 -translate-y-1/2 max-[1025px]:-right-[24%] max-[992px]:-right-1/2 max-md:static max-md:translate-y-0">
              <img src={itemImage(banner)} alt="Market" className="w-full min-w-[500px] max-md:hidden" />
              <img src="/assets/images/market-hero-mobile.svg" alt="Market" className="hidden w-full max-md:block" />
            </div>
          </div>
        </Container>
      ))}
    </div>
  );
}
