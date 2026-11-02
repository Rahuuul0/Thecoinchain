"use client";

import { useAtomValue } from "jotai";
import { useEffect, useMemo , useState } from "react";
import { useCoinActions } from "@/_actions";
import { coinsAtom } from "@/_state";

// true  -> API ki coin image dikhegi (letter badge sirf fallback)
// false -> screenshot jaisa letter badge hamesha dikhega
const SHOW_COIN_IMAGE = false;

const GREEN = "#16A66A";
const RED = "#E5484D";

// Letter badge colors (green = USDT wala style: bg #D8FFEF, text #16A66A)
const BADGE_STYLES = {
  USDT: { bg: "#D8FFEF", color: GREEN },
  BTC: { bg: "#FFF1DE", color: "#F7931A" },
  XRP: { bg: "#EEEEEE", color: "#23292F" },
  SOL: { bg: "#FFE3E6", color: RED },
  ETH: { bg: "#E6ECFF", color: "#4C6FFF" },
};
const DEFAULT_BADGE = { bg: "#D8FFEF", color: GREEN };

const formatPrice = (price) => {
  const number = Number(price);
  if (!Number.isFinite(number)) return "$0";
  if (number < 0.01) return `$${number.toFixed(6)}`;
  return `$${number.toLocaleString("en-US", { maximumFractionDigits: 6 })}`;
};

function Arrow({ direction }) {
  const down = direction === "down";
  return (
    <svg width="9" height="7" viewBox="0 0 9 7" fill="currentColor" aria-hidden="true" className="shrink-0">
      {down ? <path d="M4.5 7 0 0h9z" /> : <path d="M4.5 0 9 7H0z" />}
    </svg>
  );
}

function CoinBadge({ item }) {
  const [imgFailed, setImgFailed] = useState(false);

  // Old code wala coin icon (API image)
  if (item.image && !imgFailed) {
    return (
      <img
        src={item.image}
        alt={item.symbol || "coin"}
        className="size-6 shrink-0 rounded-full object-contain"
        onError={() => setImgFailed(true)}
      />
    );
  }

  // Image na ho ya load fail ho jaye to letter badge
  const style = BADGE_STYLES[item.symbol] || DEFAULT_BADGE;
  return (
    <span
      className="flex size-6 shrink-0 items-center justify-center rounded-full font-[Manrope] text-[11.11px] font-extrabold leading-none"
      style={{ backgroundColor: style.bg, color: style.color }}
    >
      {item.symbol?.charAt(0) || ""}
    </span>
  );
}

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
        const up = change >= 0;
        return {
          id: coin.id,
          image: coin.image,
          symbol: coin.symbol?.toUpperCase() || "",
          price: formatPrice(coin.price),
          change: `${up ? "+" : "-"}${Math.abs(change).toFixed(2)}%`,
          direction: up ? "up" : "down",
        };
      });
  }, [coinsList, propData]);

  // Repeat so the -50% loop never shows a gap.
  const items = [...tickerData, ...tickerData, ...tickerData, ...tickerData];

  return (
    <div className="relative z-[1] flex w-full items-center overflow-hidden py-2.5 transition-colors">
      <div className="flex w-max flex-nowrap items-center whitespace-nowrap will-change-transform [--marquee-duration:80s] animate-marquee hover:[animation-play-state:paused]">
        {items.map((item, index) => {
          const down = item.direction === "down";
          return (
            // mr (gap nahi) use kiya hai taaki marquee loop seamless rahe
            <div
              key={`${item.id || item.symbol}-${index}`}
              className="mr-4 flex min-w-[190px] shrink-0 items-center gap-3 rounded-[10px] border border-[#E5E7EB] bg-white px-3 py-1.5 shadow-[0px_0px_10px_0px_#00000014] dark:border-white/10"
            >
              <CoinBadge item={item} />

              <span className="font-[Manrope] text-[12px] font-extrabold text-black dark:text-white">{item.symbol}</span>

              <span className="font-[Manrope] text-[12px] font-bold text-black dark:text-white">{item.price}</span>

              <span
                className="inline-flex items-center gap-1 font-[Manrope] text-[12px] font-medium leading-[150%] align-middle"
                style={{ color: down ? RED : GREEN }}
              >
                <Arrow direction={item.direction} />
                {item.change}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}