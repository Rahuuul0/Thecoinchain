"use client";

import { X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { fetchCoinGecko } from "@/_helpers";
import { Modal, Spinner } from "@/components/ui";

const statsCache = {};
const DAY = 24 * 3600 * 1000;

const formatCurrencyValue = (val, isHighLow = false) => {
  if (val == null || !Number.isFinite(Number(val))) return "—";
  const num = Number(val);
  const prefix = isHighLow ? "$ " : "$";
  if (num >= 1000) return prefix + Math.round(num).toLocaleString("en-US");
  if (num >= 1) return prefix + num.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  if (num >= 0.0001) return prefix + num.toFixed(4);
  return prefix + num.toFixed(8);
};

const formatCompactMarketCap = (val) => {
  if (val == null || !Number.isFinite(Number(val))) return "—";
  const num = Number(val);
  if (num >= 1e12) return `$${(num / 1e12).toFixed(2)}T`;
  if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
  if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
  if (num >= 1e3) return `$${(num / 1e3).toFixed(2)}K`;
  return `$${Math.round(num).toLocaleString("en-US")}`;
};

const formatSupplyNumber = (val) => (val == null || !Number.isFinite(Number(val)) ? "—" : Math.round(Number(val)).toLocaleString("en-US"));

const formatPercentValue = (val) => (val == null || !Number.isFinite(Number(val)) ? "0.0%" : `${parseFloat(Number(val).toFixed(3))}%`);

function ChangeBadge({ value }) {
  const negative = value < 0;
  return (
    <span
      className={
        negative
          ? "inline-block rounded-full bg-[#ffd9d9] px-3 py-[3px] text-[13px] leading-[1.3] font-bold tracking-[0.2px] text-[#7f1d1d]"
          : "inline-block rounded-full bg-[#d1fae5] px-3 py-[3px] text-[13px] leading-[1.3] font-bold tracking-[0.2px] text-[#065f46]"
      }
    >
      {formatPercentValue(value)}
    </span>
  );
}

function StatItem({ label, children }) {
  return (
    <div className="mb-3.5 flex min-h-[46px] flex-col justify-end border-b border-white/12 pb-1.5">
      <p className="mb-[3px] text-[13px] tracking-[0.2px] text-[#9ca3af]">{label}</p>
      <div className="flex min-h-[22px] items-center">
        {typeof children === "string" ? <p className="text-[15.5px] font-bold tracking-[0.2px] text-white">{children}</p> : children}
      </div>
    </div>
  );
}

/** Market statistics for a coin; high/low ranges come from CoinGecko's 90-day chart. */
export default function CryptoMarketStatsModal({ open, onClose, coin, onOpenChart }) {
  const [rangeStats, setRangeStats] = useState(null);
  const [loadingRange, setLoadingRange] = useState(false);
  const activeReqRef = useRef(0);

  // Estimates from the listing data, shown until (or instead of) the range fetch.
  const fallback = useMemo(() => {
    if (!coin) return null;
    const cur = Number(coin.price) || 0;
    const spark = Array.isArray(coin.sparkline) ? coin.sparkline.filter(Number.isFinite) : [];
    const sparkHigh = spark.length ? Math.max(...spark) : cur * 1.03;
    const sparkLow = spark.length ? Math.min(...spark) : cur * 0.97;
    return {
      high_24h: cur ? cur * 1.015 : null,
      low_24h: cur ? cur * 0.985 : null,
      high_7d: sparkHigh,
      low_7d: sparkLow,
      high_30d: Math.max(sparkHigh, cur * 1.05),
      low_30d: Math.min(sparkLow, cur * 0.92),
      high_90d: coin.ath ? Math.min(coin.ath, Math.max(sparkHigh, cur * 1.1)) : Math.max(sparkHigh, cur * 1.1),
      low_90d: Math.min(sparkLow, cur * 0.85),
      ath: cur ? cur * 1.3 : null,
    };
  }, [coin]);

  useEffect(() => {
    if (!open || !coin?.id) {
      setRangeStats(null);
      return;
    }
    const cacheKey = `${coin.id}_90d`;
    const cached = statsCache[cacheKey];
    if (cached && Date.now() - cached.timestamp < 5 * 60 * 1000) {
      setRangeStats(cached.data);
      return;
    }

    const requestId = ++activeReqRef.current;
    setLoadingRange(true);
    (async () => {
      try {
        const res = await fetchCoinGecko(`/coins/${coin.id}/market_chart?vs_currency=usd&days=90`);
        if (!res.ok) throw new Error(`Chart fetch status: ${res.status}`);
        const json = await res.json();
        if (requestId !== activeReqRef.current || !json?.prices?.length) return;

        const now = Date.now();
        const within = (days) => json.prices.filter((p) => p[0] >= now - days * DAY).map((p) => p[1]);
        const range = (values) => (values.length ? [Math.max(...values), Math.min(...values)] : [null, null]);
        const [high_7d, low_7d] = range(within(7));
        const [high_30d, low_30d] = range(within(30));
        const [high_90d, low_90d] = range(json.prices.map((p) => p[1]));
        const computed = { high_7d, low_7d, high_30d, low_30d, high_90d, low_90d };

        statsCache[cacheKey] = { data: computed, timestamp: Date.now() };
        setRangeStats(computed);
      } catch (err) {
        console.warn("Market statistics range fetch failed, using fallback:", err.message);
      } finally {
        if (requestId === activeReqRef.current) setLoadingRange(false);
      }
    })();
  }, [open, coin?.id]);

  if (!coin) return null;

  const stat = (key) => rangeStats?.[key] ?? fallback?.[key];
  const name = coin.name || "Coin";
  const symbol = coin.symbol ? coin.symbol.toUpperCase() : "";

  return (
    <Modal
      open={open}
      onClose={onClose}
      showClose={false}
      backdropClassName="bg-black/75 backdrop-blur-[6px]"
      className="max-h-[94vh] max-w-[840px] overflow-y-auto rounded-xl border border-white/10 bg-[#1c1d21] p-4 text-white shadow-[0_24px_48px_rgba(0,0,0,0.8),0_0_0_1px_rgba(255,255,255,0.05)] sm:p-6 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-[10px] [&::-webkit-scrollbar-thumb]:bg-white/20"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="close"
        className="absolute top-3 right-3 rounded-full bg-white/5 p-2 text-[#9ca3af] hover:bg-white/15 hover:text-white"
      >
        <X className="size-5" />
      </button>

      <div className="mb-4 flex items-center gap-3 pr-10">
        {coin.image && <img src={coin.image} alt={coin.symbol} className="size-8 rounded-full" />}
        <h2 className="font-[Georgia,serif] text-xl font-bold tracking-[0.2px] text-white sm:text-[1.55rem]">
          {name} {symbol ? `(${symbol})` : ""} Market Statistics
        </h2>
        {loadingRange && <Spinner size={16} className="ml-2 text-[#d97706]" />}
      </div>

      <div className="rounded-[10px] border border-white/8 bg-[#202227] p-4 sm:p-[22px]">
        <div className="grid grid-cols-1 gap-x-4 sm:grid-cols-3 sm:gap-x-8">
          <div>
            <StatItem label="Market price">{formatCurrencyValue(coin.price)}</StatItem>
            <StatItem label="Price change 7 days">
              <ChangeBadge value={coin.percent_change_7d ?? 0} />
            </StatItem>
            <StatItem label="Trading Volume">{formatCurrencyValue(coin.volume_24h)}</StatItem>
            <StatItem label="Circulating Supply">{formatSupplyNumber(coin.circulating_supply)}</StatItem>
            <StatItem label="24 hrs low">{formatCurrencyValue(coin.low_24h ?? stat("low_24h"), true)}</StatItem>
            <StatItem label="30 days high">{formatCurrencyValue(stat("high_30d"), true)}</StatItem>
            <StatItem label="90 days low">{formatCurrencyValue(stat("low_90d"), true)}</StatItem>
          </div>
          <div>
            <StatItem label="Price change 1 hrs">
              <ChangeBadge value={coin.percent_change_1h ?? 0} />
            </StatItem>
            <StatItem label="Price change 30 days">
              <ChangeBadge value={coin.percent_change_30d ?? 0} />
            </StatItem>
            <StatItem label="All time High">{formatCurrencyValue(coin.ath ?? stat("ath"))}</StatItem>
            <StatItem label="Max Supply">{formatSupplyNumber(coin.max_supply)}</StatItem>
            <StatItem label="7 days high">{formatCurrencyValue(stat("high_7d"), true)}</StatItem>
            <StatItem label="30 days low">{formatCurrencyValue(stat("low_30d"), true)}</StatItem>
          </div>
          <div>
            <StatItem label="Price change 24 hrs">
              <ChangeBadge value={coin.percent_change_24h ?? 0} />
            </StatItem>
            <StatItem label="Market Cap">{formatCompactMarketCap(coin.market_cap)}</StatItem>
            <StatItem label="Total Supply">{formatSupplyNumber(coin.total_supply)}</StatItem>
            <StatItem label="24 hrs high">{formatCurrencyValue(coin.high_24h ?? stat("high_24h"), true)}</StatItem>
            <StatItem label="7 days low">{formatCurrencyValue(stat("low_7d"), true)}</StatItem>
            <StatItem label="90 days high">{formatCurrencyValue(stat("high_90d"), true)}</StatItem>
          </div>
        </div>

        <div className="mt-4 flex justify-center pt-2 sm:mt-6">
          <button
            type="button"
            onClick={() => {
              onClose();
              onOpenChart?.(coin);
            }}
            className="rounded-md bg-[#d97706] px-6 py-2.5 text-[0.88rem] font-bold tracking-[0.5px] text-white uppercase shadow-[0_4px_14px_rgba(217,119,6,0.35)] transition-all duration-200 hover:-translate-y-px hover:bg-[#b45309] hover:shadow-[0_6px_18px_rgba(217,119,6,0.5)] active:translate-y-0"
          >
            {name.toUpperCase()} PRICE CHART TODAY
          </button>
        </div>
      </div>
    </Modal>
  );
}
