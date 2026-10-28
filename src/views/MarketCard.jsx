"use client";

import { useAtomValue, useSetAtom } from "jotai";
import { useEffect, useState } from "react";
import { subscriptionActions, useCoinActions } from "@/_actions";
import { authAtom, cardCoinsAtom, coinCategoryAtom, forecastSubAtom, loaderAtom } from "@/_state";
import LiveSparkline from "@/components/LiveSparkline";
import { Button, Container, Select } from "@/components/ui";

const displayPrice = (price) => {
  if (price > 1) return Math.round(price * 100) / 100;
  if (price < 1 && price >= 0.1) return (Math.round(price * 10000) / 10000).toFixed(2);
  if (price < 0.1 && price > 0.01) return (Math.round(price * 1000000) / 1000000).toFixed(6);
  if (price < 0.01) return (Math.round(price * 100000000) / 100000000).toFixed(8);
  return price;
};

/** Top-3 coin cards overlapping the market hero, plus the category filter. */
export default function MarketCard() {
  const coinActions = useCoinActions();
  const subscriptionAction = subscriptionActions();
  const categories = useAtomValue(coinCategoryAtom);
  const cardCoins = useAtomValue(cardCoinsAtom);
  const userDetail = useAtomValue(authAtom);
  const subscriptionDetails = useAtomValue(forecastSubAtom);
  const setLoader = useSetAtom(loaderAtom);
  const [category, setCategory] = useState("all");

  useEffect(() => {
    coinActions.latestListing("limit=10");
    if (userDetail && !subscriptionDetails.id) subscriptionAction.subscribedUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const changeCategory = (value) => {
    setCategory(value);
    if (value === "all") {
      coinActions.latestListing("?limit=10");
    } else {
      setLoader(true);
      coinActions.coinListbByCategoty(value);
    }
  };

  return (
    <div className="relative z-[1] bg-page pb-[65px] after:absolute after:top-0 after:left-0 after:-z-[1] after:h-[40%] after:w-full after:bg-[#DECBE9] max-[1025px]:after:h-[45%] max-md:pb-4 dark:after:bg-ink">
      <Container>
        <div className="relative z-[1] rounded-3xl border border-n7 bg-page shadow-[0_64px_64px_-48px_#0f0f0f1a] dark:border-n2">
          <div className="grid grid-cols-3 gap-5 p-6 max-md:overflow-x-auto">
            {cardCoins?.slice(0, 3).map((coin) => (
              <div key={coin.id ?? coin.symbol} className="flex gap-5">
                <img src={coin.image} alt={coin.symbol} width={33} className="min-w-10 self-start" />
                <div>
                  <small className="text-xs font-semibold whitespace-nowrap text-n4 uppercase">
                    {coin.symbol}/USDT{" "}
                    <span className={`ml-2.5 rounded-3xl px-2 py-0.5 text-n8 ${coin.percent_change_24h < 0 ? "bg-danger" : "bg-success"}`}>
                      {coin.percent_change_24h?.toFixed(2)}%
                    </span>
                  </small>
                  <h5 className="text-2xl! font-semibold">{displayPrice(coin.price)?.toLocaleString(undefined, { minimumFractionDigits: 2 })}</h5>
                  <small className="text-xs">{coin.volume_24h?.toFixed(2)}</small>
                </div>
                <div>
                  <LiveSparkline prices={coin.sparkline} change={coin.percent_change_24h} />
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between border-t border-line p-6 max-md:hidden">
            <Button variant="outlined" href="/prediction-dashboard" className="px-[15px] py-[9px]">
              Predict
            </Button>
          </div>
          <div className="hidden border-t border-line p-6 max-md:block">
            <Select
              className="w-full"
              value={category}
              onChange={changeCategory}
              options={[{ value: "all", label: "All" }, ...(categories || []).map((c) => ({ value: c, label: c }))]}
            />
          </div>
        </div>
      </Container>
    </div>
  );
}
