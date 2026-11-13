"use client";

import { useAtomValue } from "jotai";
import { useEffect, useMemo, useState } from "react";
import { useCoinActions } from "@/_actions";
import { coinsAtom, switchDarkModeAtom } from "@/_state";

// Badge styles for light and dark modes
const BADGE_STYLES_LIGHT = {
  USDT: { bg: "#D8FFEF", color: "#16A66A" },
  BTC: { bg: "#FFF1DE", color: "#F7931A" },
  XRP: { bg: "#EEEEEE", color: "#23292F" },
  SOL: { bg: "#FFE3E6", color: "#E5484D" },
  ETH: { bg: "#E6ECFF", color: "#4C6FFF" },
};
const DEFAULT_BADGE_LIGHT = { bg: "#D8FFEF", color: "#16A66A" };

const BADGE_STYLES_DARK = {
  USDT: { bg: "#064E3B", color: "#34D399" },
  BTC: { bg: "#451A03", color: "#FBBF24" },
  XRP: { bg: "#262626", color: "#E5E5E5" },
  SOL: { bg: "#4C0519", color: "#FB7185" },
  ETH: { bg: "#1E1B4B", color: "#818CF8" },
};
const DEFAULT_BADGE_DARK = { bg: "#064E3B", color: "#34D399" };

// ============================================================
// Price Formatter
// ============================================================
const formatPrice = (price) => {
  const number = Number(price);

  if (!Number.isFinite(number)) {
    return "$0";
  }

  // Very small coin prices
  if (number < 0.01) {
    return `$${number.toFixed(6)}`;
  }

  return `$${number.toLocaleString("en-US", {
    maximumFractionDigits: 6,
  })}`;
};

function Arrow({ direction }) {
  const down = direction === "down";
  return (
    <svg width="9" height="7" viewBox="0 0 9 7" fill="currentColor" aria-hidden="true" className="shrink-0">
      {down ? <path d="M4.5 7 0 0h9z" /> : <path d="M4.5 0 9 7H0z" />}
    </svg>
  );
}

function CoinBadge({ item, isDarkMode }) {
  const [imgFailed, setImgFailed] = useState(false);

  // Coin icon from API
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

  // Fallback letter badge
  const styles = isDarkMode ? BADGE_STYLES_DARK : BADGE_STYLES_LIGHT;
  const style = styles[item.symbol] || (isDarkMode ? DEFAULT_BADGE_DARK : DEFAULT_BADGE_LIGHT);

  return (
    <span
      className="flex size-6 shrink-0 items-center justify-center rounded-full font-[Manrope] text-[11.11px] font-extrabold leading-none"
      style={{ backgroundColor: style.bg, color: style.color }}
    >
      {item.symbol?.charAt(0) || ""}
    </span>
  );
}

/**
 * CryptoTickerMarquee
 * Supports both light (white) mode and dark (black) mode with seamless marquee animation.
 */
export default function CryptoTickerMarquee({ data: propData } = {}) {
  const { latestListing } = useCoinActions();

  // Atoms
  const coinsList = useAtomValue(coinsAtom);
  const isDarkMode = useAtomValue(switchDarkModeAtom);

  // ==========================================================
  // Load coin data on mount if not available
  // ==========================================================
  useEffect(() => {
    if (!Array.isArray(coinsList) || coinsList.length === 0) {
      latestListing();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ==========================================================
  // Convert coinsAtom data into ticker data
  // ==========================================================
  const cryptoTickerData = useMemo(() => {
    if (Array.isArray(propData) && propData.length > 0) {
      return propData.slice(0, 10);
    }

    if (!Array.isArray(coinsList)) {
      return [];
    }

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

  // ==========================================================
  // Repeat data enough times to avoid blank space in loop
  // ==========================================================
  const marqueeData = useMemo(() => {
    if (!cryptoTickerData.length) {
      return [];
    }

    return [
      ...cryptoTickerData,
      ...cryptoTickerData,
      // ...cryptoTickerData,
      // ...cryptoTickerData,
    ];
  }, [cryptoTickerData]);

  // ==========================================================
  // No data yet
  // ==========================================================
  if (!cryptoTickerData.length) {
    return null;
  }

  // ==========================================================
  // Render
  // ==========================================================
  return (
    <div className="website-all-crypto-ticker-marquee relative z-[1] flex w-full items-center overflow-hidden py-2.5 transition-colors">
      <div className="flex w-max flex-nowrap items-center whitespace-nowrap will-change-transform [--marquee-duration:80s] animate-marquee hover:[animation-play-state:paused]">
        {marqueeData.map((item, index) => {
          const down = item.direction === "down";
          const changeColor = down
            ? isDarkMode
              ? "#F87171"
              : "#DC2626"
            : isDarkMode
              ? "#4ADE80"
              : "#16A34A";

          return (
            <div
              key={`${item.id || item.symbol}-${index}`}
              className={`mr-4 flex min-w-[190px] shrink-0 items-center gap-3 rounded-[10px] border px-3 py-1.5 shadow-[0px_0px_10px_0px_#00000014] transition-colors ${isDarkMode
                ? "border-[#23262F] bg-[#141416] text-white"
                : "border-[#E5E7EB] bg-white text-black"
                } dark:border-[#23262F] dark:bg-[#141416]`}
            >
              <CoinBadge item={item} isDarkMode={isDarkMode} />

              {/* Symbol */}
              <span
                className={`font-[Manrope] text-[14px] font-extrabold ${isDarkMode ? "text-white" : "text-[#111827]"
                  } dark:text-white`}
              >
                {item.symbol}
              </span>

              {/* Price */}
              <span
                className={`font-[Manrope] text-[14px] font-bold ${isDarkMode ? "text-[#E6E8EC]" : "text-[#111827]"
                  } dark:text-[#E6E8EC]`}
              >
                {item.price}
              </span>

              {/* 24h Change */}
              <span
                className="inline-flex items-center gap-1 font-[Manrope] text-[14px] font-medium leading-[150%] align-middle"
                style={{ color: changeColor }}
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
