"use client";

import { useAtomValue } from "jotai";
import Link from "next/link";
import { useEffect } from "react";
import { selectedCategoryAtom } from "@/_state";
import { Container } from "@/components/ui";
import CryptoTable from "@/views/CryptoTable";
import LearnNEarn from "@/views/LearnNEarn";
import MarketCard from "@/views/MarketCard";
import MarketHero from "@/views/MarketHero";

/** Shared layout for /market and the predict-market pages. */
export default function MarketPage({ subscribeHref, tableProps }) {
  const selectedCat = useAtomValue(selectedCategoryAtom);

  useEffect(() => {
    window.scrollTo({ top: 1, left: 1, behavior: "smooth" });
  }, []);

  return (
    <div className="mt-16">
      <MarketHero />
      <MarketCard />
      <div className="bg-page">
        <Container>
          <CryptoTable selectedCat={selectedCat} {...tableProps} />

          {subscribeHref && (
            <div className="pt-20 max-md:pt-16">
              <h2 className="mb-5 font-display text-[#3B3B3B] max-[1025px]:text-[40px]! max-md:text-2xl! max-md:font-semibold dark:text-n8">Cryptocurrency Price Predictions</h2>
              <p className="text-2xl! text-[#3B3B3B]! max-md:text-sm! dark:text-n8!">
                Please{" "}
                <Link href={subscribeHref} className="text-[#FFD166]!">
                  <u>Subscribe</u>
                </Link>{" "}
                now to gain complete access to the most precise short and long-term predictions of cryptocurrency prices.
              </p>
            </div>
          )}

          <LearnNEarn className="py-20" />
        </Container>
      </div>
    </div>
  );
}
