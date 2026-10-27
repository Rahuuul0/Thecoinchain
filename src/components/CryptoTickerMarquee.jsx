"use client";

import { useAtomValue } from "jotai";
import { useEffect, useMemo } from "react";
import { useCoinActions } from "@/_actions";
import { coinsAtom } from "@/_state";

const formatPrice = (price) => {
  const number = Number(price);
  if (!Number.isFinite(number)) return "$0";
  if (number < 0.01) return `$${number.toFixed(6)}`;
  return `$${number.toLocaleString("en-US", { maximumFractionDigits: 6 })}`;
};

/** Scrolling top-10 coin price strip. Loads coin data on its own if needed. */
export default function CryptoTickerMarquee({ data: propData } = {}) {
  const { latestListing } = useCoinActions();
  const coinsList = useAtomValue(coinsAtom);

  useEffect(() => {
    if (!Array.isArray(coinsList) || coinsList.length === 0) latestListing();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const tickerData = useMemo(() => {
    if (Array.isArray(propData) && propData.length > 0) return propData.slice(0, 10);
    if (!Array.isArray(coinsList)) return [];
    return [...coinsList]
      .filter((coin) => coin?.id)
      .sort((a, b) => (Number(a.cmc_rank) || 999) - (Number(b.cmc_rank) || 999))
      .slice(0, 10)
      .map((coin) => {
        const change = Number(coin.percent_change_24h ?? 0);
        return {
          id: coin.id,
          image: coin.image,
          symbol: coin.symbol?.toUpperCase() || "",
          price: formatPrice(coin.price),
          change: `${Math.abs(change).toFixed(2)}%`,
          direction: change >= 0 ? "up" : "down",
        };
      });
  }, [coinsList, propData]);

  // Repeat so the -50% loop never shows a gap.
  const items = [...tickerData, ...tickerData, ...tickerData, ...tickerData];

  return (
    <div className="relative z-[1] flex min-h-11 w-full items-center overflow-hidden border-y border-[#EDEDED] bg-white transition-colors dark:border-n2 dark:bg-n1">
      <div className="flex w-max flex-nowrap items-center whitespace-nowrap will-change-transform [--marquee-duration:80s] animate-marquee hover:[animation-play-state:paused]">
        {items.map((item, index) => (
          <span key={`${item.id || item.symbol}-${index}`} className="inline-flex shrink-0 items-center gap-1.5 px-5 text-sm">
            {item.image && (
              <img
                src={item.image}
                alt={item.symbol || "coin"}
                className="inline-block size-5 shrink-0 rounded-full object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            )}
            <span className="font-bold text-gray-900 dark:text-white">{item.symbol}</span>
            <span className="font-medium text-gray-900 dark:text-n6">{item.price}</span>
            <span
              className={
                item.direction === "down"
                  ? "inline-flex items-center gap-0.5 font-semibold text-red-600 dark:text-red-400"
                  : "inline-flex items-center gap-0.5 font-semibold text-green-600 dark:text-green-400"
              }
            >
              {item.direction === "down" ? "▼" : "▲"} {item.change}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
