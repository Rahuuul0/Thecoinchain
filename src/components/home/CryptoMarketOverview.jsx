"use client";

import { useAtomValue } from "jotai";
import { useEffect, useMemo } from "react";
import { useCoinActions } from "@/_actions";
import { cardCoinsAtom, coinsAtom } from "@/_state";
import { cn, Container } from "@/components/ui";

const DEFAULT_COIN_NAMES = {
  BTC: "Bitcoin",
  ETH: "Ethereum",
  USDT: "Tether",
  BNB: "BNB",
  SOL: "Solana",
  XRP: "XRP",
  ADA: "Cardano",
  DOGE: "Dogecoin",
  AVAX: "Avalanche",
  DOT: "Polkadot",
  MATIC: "Polygon",
  POL: "Polygon",
  TRX: "TRON",
  LINK: "Chainlink",
  SHIB: "Shiba Inu",
  LTC: "Litecoin",
};

// Shown until live prices arrive.
const PLACEHOLDER_COINS = [
  { id: "bitcoin", name: "Bitcoin", symbol: "BTC", price: 82714.0, percent_change_24h: 1.33, volume_24h: 23305068601, image: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png" },
  { id: "ethereum", name: "Ethereum", symbol: "ETH", price: 2427.47, percent_change_24h: 0.77, volume_24h: 9100346918, image: "https://assets.coingecko.com/coins/images/279/large/ethereum.png" },
  { id: "tether", name: "Tether", symbol: "USDT", price: 1.0, percent_change_24h: 0.03, volume_24h: 42968670971, image: "https://assets.coingecko.com/coins/images/325/large/Tether.png" },
  { id: "binancecoin", name: "BNB", symbol: "BNB", price: 726.85, percent_change_24h: 0.97, volume_24h: 6414084401, image: "https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png" },
];

const formatPrice = (price) => {
  if (price === undefined || price === null || price === "") return "$0.00";
  const num = Number(price);
  if (isNaN(num)) return `$${price}`;
  const [min, max] = num >= 1 ? [2, 2] : num >= 0.1 ? [2, 4] : num >= 0.01 ? [4, 6] : [6, 8];
  return `$${num.toLocaleString("en-US", { minimumFractionDigits: min, maximumFractionDigits: max })}`;
};

const formatVolume = (vol) => {
  if (vol === undefined || vol === null || vol === "") return "$0.00";
  const num = Number(vol);
  if (isNaN(num)) return `$${vol}`;
  return `$${num.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

const UP_SHAPE = [10, 11, 9, 13, 12, 14, 13, 16, 15, 18, 17, 21, 19, 23, 21, 24, 23, 26];
const DOWN_SHAPE = [26, 24, 25, 22, 23, 19, 21, 17, 18, 15, 16, 13, 14, 11, 12, 9, 10, 8];

/** Area sparkline; falls back to a representative shape when history is missing. */
function AreaSparkline({ prices, isPositive, coinId }) {
  const raw = Array.isArray(prices) ? prices.filter(Number.isFinite) : [];
  const values = raw.length >= 8 ? raw.slice(-28) : isPositive ? UP_SHAPE : DOWN_SHAPE;
  const min = Math.min(...values);
  const range = Math.max(...values) - min || 1;
  const [width, height, padY] = [240, 52, 5];

  const line = values
    .map((v, i) => `${i === 0 ? "M" : "L"} ${((i / (values.length - 1)) * width).toFixed(1)},${(height - padY - ((v - min) / range) * (height - padY * 2)).toFixed(1)}`)
    .join(" ");
  const color = isPositive ? "#00C076" : "#FF6838";
  const gradId = `sparkGrad-${coinId}`;

  return (
    <div className="my-3 h-[52px] w-full overflow-hidden">
      <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" className="block size-full">
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.25" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={`${line} L ${width},${height} L 0,${height} Z`} fill={`url(#${gradId})`} />
        <path d={line} fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

export default function CryptoMarketOverview() {
  const cardCoins = useAtomValue(cardCoinsAtom);
  const coins = useAtomValue(coinsAtom);
  const coinActions = useCoinActions();

  useEffect(() => {
    if (!cardCoins?.length && !coins?.length) coinActions.latestListing("?limit=10");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const displayCoins = useMemo(() => {
    if (cardCoins?.length >= 4) return cardCoins.slice(0, 4);
    if (coins?.length >= 4) return coins.slice(0, 4);
    if (cardCoins?.length > 0) return cardCoins.slice(0, 4);
    return PLACEHOLDER_COINS;
  }, [cardCoins, coins]);

  return (
    <section className="relative w-full py-8 sm:py-10 md:py-12">
      <Container>
        <div className="mb-7 flex items-center">
          <div>
            <h5 className="font-display leading-[1.2] font-extrabold tracking-[0.5px] text-n1 uppercase dark:text-white">
              <span className="mr-2 text-[#F5AC00]">CRYPTO</span>
              MARKET
            </h5>
            <p className="mt-1 font-medium tracking-[0.2px] text-n4!">Live prices • Market movement</p>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[20px] border border-[rgb(86_98_255/14%)] bg-n7 p-5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] sm:rounded-[32px] sm:p-6 md:p-7 dark:border-white/8 dark:bg-n2 dark:shadow-[0_8px_32px_rgba(15,15,15,0.3)]">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 md:grid-cols-4">
            {displayCoins.map((item, index) => {
              const isPositive = (item?.percent_change_24h ?? 0) >= 0;
              const symbol = (item?.symbol || "").toUpperCase();
              const change = item?.percent_change_24h != null ? Number(item.percent_change_24h).toFixed(2) : "0.00";

              return (
                <div
                  key={item.id || item.symbol || index}
                  className="flex h-full flex-col justify-between rounded-3xl border border-n6 bg-white p-4 shadow-[0_8px_20px_rgba(15,15,15,0.05)] transition-all duration-300 hover:-translate-y-[5px] hover:border-[#D1D5DB] hover:shadow-[0_18px_30px_rgba(15,15,15,0.12)] sm:p-5 dark:border-white/6 dark:bg-n3 dark:shadow-[0_8px_20px_rgba(15,15,15,0.2)] dark:hover:border-white/18 dark:hover:bg-[#3D4250] dark:hover:shadow-[0_18px_30px_rgba(15,15,15,0.4)]"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <img src={item?.image} alt={symbol} className="size-[38px] shrink-0 rounded-full object-contain" />
                      <div>
                        <p className="leading-[1.2] font-bold text-n1! dark:text-white!">{item?.name || DEFAULT_COIN_NAMES[symbol] || symbol}</p>
                        <p className="mt-0.5 leading-none font-medium text-[#848E9C]! uppercase dark:text-n4!">{symbol}</p>
                      </div>
                    </div>
                    <span className={cn("inline-flex items-center gap-[3px] rounded-full px-2.5 py-[3px] text-xs font-semibold text-white", isPositive ? "bg-success" : "bg-danger")}>
                      <span className="text-[9px]">{isPositive ? "▲" : "▼"}</span>
                      <span>
                        {isPositive ? "+" : ""}
                        {change}%
                      </span>
                    </span>
                  </div>

                  <p className="mt-4 mb-1 font-bold tracking-[-0.5px] text-n1! dark:text-white!">{formatPrice(item?.price)}</p>

                  <AreaSparkline prices={item?.sparkline} isPositive={isPositive} coinId={item?.id || item?.symbol || index} />

                  <div className="mt-1">
                    <p className="mb-0.5 leading-none font-medium text-[#848E9C]! dark:text-n4!">24h Volume</p>
                    <p className="font-semibold text-n2! dark:text-n6!">{formatVolume(item?.volume_24h)}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
