"use client";

import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Chart as ChartJS, registerables } from "chart.js";
import dayjs from "dayjs";
import { Check, ChevronDown, TrendingDown, TrendingUp, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Chart } from "react-chartjs-2";
import { fetchCoinGecko } from "@/_helpers";
import { cn, Modal, Spinner } from "@/components/ui";

ChartJS.register(...registerables);

const TIMEFRAMES = [
  { key: "24h", label: "24h", days: 1 },
  { key: "7D", label: "7D", days: 7 },
  { key: "1M", label: "1M", days: 30 },
  { key: "1Y", label: "1Y", days: 365 },
];

const LABEL_FORMATS = { "24h": "HH:mm", "7D": "ddd HH:mm", "1M": "MMM DD", "1Y": "MMM YYYY" };
const GREEN = "#16c784";
const RED = "#ea3943";
const FONT = "Poppins, DM Sans, sans-serif";

const formatCurrency = (val) => {
  if (val == null || !Number.isFinite(Number(val))) return "$0.00";
  const num = Number(val);
  if (num >= 1000) return `$${num.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  if (num >= 1) return `$${num.toFixed(2)}`;
  if (num >= 0.0001) return `$${num.toFixed(4)}`;
  return `$${num.toFixed(6)}`;
};

const formatCompact = (val) => {
  if (val == null || !Number.isFinite(Number(val))) return "$0";
  const num = Number(val);
  if (num >= 1e12) return `$${(num / 1e12).toFixed(2)}T`;
  if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
  if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
  if (num >= 1e3) return `$${(num / 1e3).toFixed(2)}K`;
  if (num >= 1) return `$${num.toFixed(2)}`;
  return `$${num.toFixed(4)}`;
};

/** Where the baseline price falls in the chart area, 0 (top) … 1 (bottom). */
const baselineStop = (chart, baseline) => {
  const { chartArea, scales } = chart;
  if (!chartArea || !scales.y) return null;
  const height = chartArea.bottom - chartArea.top;
  if (height <= 0) return null;
  return Math.max(0, Math.min(1, (scales.y.getPixelForValue(baseline) - chartArea.top) / height));
};

/** Synthetic history from the sparkline when CoinGecko is unavailable. */
function fallbackHistory(coin, tfKey) {
  const sparkline = coin?.sparkline || [];
  const now = Date.now();
  const tf = TIMEFRAMES.find((t) => t.key === tfKey) || TIMEFRAMES[0];
  const durationMs = tf.days * 24 * 60 * 60 * 1000;
  const volumeAt = () => (coin?.volume_24h || 1000000) * (0.8 + Math.random() * 0.4);

  if (sparkline.length > 0) {
    const base = tfKey === "24h" ? sparkline.slice(-24) : sparkline;
    const step = durationMs / Math.max(1, base.length - 1);
    const prices = base.map(Number);
    return { prices, timestamps: base.map((_, i) => now - (base.length - 1 - i) * step), volumes: prices.map(volumeAt) };
  }

  const count = tfKey === "24h" ? 24 : 30;
  const step = durationMs / count;
  const prices = [];
  const timestamps = [];
  let p = (coin?.price || 100) * 0.98;
  for (let i = 0; i < count; i++) {
    p *= 1 + (Math.random() * 0.04 - 0.019);
    prices.push(p);
    timestamps.push(now - (count - 1 - i) * step);
  }
  prices[prices.length - 1] = coin?.price || 100;
  return { prices, timestamps, volumes: prices.map(volumeAt) };
}

export default function CryptoChartModal({ open, onClose, coin }) {
  const [timeFrame, setTimeFrame] = useState("24h");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState({ timestamps: [], prices: [], volumes: [] });
  const cacheRef = useRef({});

  const loadHistory = async (coinId, tfKey) => {
    const cacheKey = `${coinId}_${tfKey}`;
    if (cacheRef.current[cacheKey]) {
      setHistory(cacheRef.current[cacheKey]);
      return;
    }
    setLoading(true);
    const tf = TIMEFRAMES.find((t) => t.key === tfKey) || TIMEFRAMES[0];
    try {
      const res = await fetchCoinGecko(`/coins/${coinId}/market_chart?vs_currency=usd&days=${tf.days}`);
      if (!res.ok) throw new Error(`Status ${res.status}`);
      const data = await res.json();
      if (!data?.prices?.length) throw new Error("No price data returned");
      const result = {
        timestamps: data.prices.map((p) => p[0]),
        prices: data.prices.map((p) => p[1]),
        volumes: data.total_volumes ? data.total_volumes.map((v) => v[1]) : data.prices.map(() => 0),
      };
      cacheRef.current[cacheKey] = result;
      setHistory(result);
    } catch (err) {
      console.warn("CoinGecko market_chart fetch failed, using fallback:", err.message);
      const result = fallbackHistory(coin, tfKey);
      cacheRef.current[cacheKey] = result;
      setHistory(result);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open && coin?.id) {
      setTimeFrame("24h");
      loadHistory(coin.id, "24h");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, coin?.id]);

  const selectTimeFrame = (key) => {
    setTimeFrame(key);
    if (coin?.id) loadHistory(coin.id, key);
  };

  const stats = useMemo(() => {
    const { prices, volumes } = history;
    if (!prices?.length) {
      const cur = coin?.price || 0;
      return { high: cur, low: cur, open: cur, current: cur, change: 0, changePercent: coin?.percent_change_24h || 0 };
    }
    const open = prices[0];
    const current = prices[prices.length - 1];
    const change = current - open;
    return {
      high: Math.max(...prices),
      low: Math.min(...prices),
      open,
      current,
      change,
      changePercent: open !== 0 ? (change / open) * 100 : 0,
      maxVolume: volumes?.length ? Math.max(...volumes) : 1,
    };
  }, [history, coin]);

  const baseline = stats.open;
  const isPositive = stats.changePercent >= 0;

  const chartConfig = useMemo(() => {
    const { timestamps, prices, volumes } = history;
    if (!prices?.length) return null;

    const data = {
      labels: timestamps.map((ts) => dayjs(ts).format(LABEL_FORMATS[timeFrame])),
      datasets: [
        {
          type: "line",
          label: "Price",
          data: prices,
          yAxisID: "y",
          borderWidth: 2.2,
          pointRadius: 0,
          pointHoverRadius: 6,
          pointHoverBackgroundColor: "#ffffff",
          pointHoverBorderWidth: 2,
          pointHoverBorderColor: (ctx) => (ctx.raw >= baseline ? GREEN : RED),
          tension: 0.3,
          fill: true,
          // Green above the opening price, red below it.
          borderColor: ({ chart }) => {
            const stop = baselineStop(chart, baseline);
            if (stop === null) return isPositive ? GREEN : RED;
            if (stop >= 1) return GREEN;
            if (stop <= 0) return RED;
            const g = chart.ctx.createLinearGradient(0, chart.chartArea.top, 0, chart.chartArea.bottom);
            g.addColorStop(0, GREEN);
            g.addColorStop(Math.max(0, stop - 0.001), GREEN);
            g.addColorStop(Math.min(1, stop + 0.001), RED);
            g.addColorStop(1, RED);
            return g;
          },
          backgroundColor: ({ chart }) => {
            const stop = baselineStop(chart, baseline);
            if (stop === null) return isPositive ? "rgba(22, 199, 132, 0.2)" : "rgba(234, 57, 67, 0.2)";
            const g = chart.ctx.createLinearGradient(0, chart.chartArea.top, 0, chart.chartArea.bottom);
            if (stop >= 1) {
              g.addColorStop(0, "rgba(22, 199, 132, 0.32)");
              g.addColorStop(1, "rgba(22, 199, 132, 0.01)");
            } else if (stop <= 0) {
              g.addColorStop(0, "rgba(234, 57, 67, 0.01)");
              g.addColorStop(1, "rgba(234, 57, 67, 0.32)");
            } else {
              g.addColorStop(0, "rgba(22, 199, 132, 0.32)");
              g.addColorStop(stop, "rgba(22, 199, 132, 0.02)");
              g.addColorStop(stop, "rgba(234, 57, 67, 0.02)");
              g.addColorStop(1, "rgba(234, 57, 67, 0.32)");
            }
            return g;
          },
        },
        {
          type: "bar",
          label: "Volume",
          data: volumes || [],
          yAxisID: "yVolume",
          backgroundColor: "rgba(140, 150, 175, 0.22)",
          hoverBackgroundColor: "rgba(140, 150, 175, 0.4)",
          barThickness: 2.5,
          borderRadius: 2,
        },
      ],
    };

    // Dashed line + price badge at the opening price.
    const baselinePlugin = {
      id: "baselinePlugin",
      afterDraw: (chart) => {
        const { ctx, chartArea, scales } = chart;
        if (!chartArea || !scales.y || baseline == null) return;
        const y = scales.y.getPixelForValue(baseline);
        if (y < chartArea.top || y > chartArea.bottom) return;

        ctx.save();
        ctx.beginPath();
        ctx.setLineDash([5, 5]);
        ctx.lineWidth = 1.2;
        ctx.strokeStyle = "rgba(234, 57, 67, 0.85)";
        ctx.moveTo(chartArea.left, y);
        ctx.lineTo(chartArea.right, y);
        ctx.stroke();

        const text = formatCompact(baseline);
        ctx.font = `bold 11px ${FONT}`;
        const w = ctx.measureText(text).width + 12;
        const x = chartArea.left - w - 4;
        ctx.setLineDash([]);
        ctx.fillStyle = RED;
        ctx.beginPath();
        if (ctx.roundRect) ctx.roundRect(x, y - 10, w, 20, 4);
        else ctx.rect(x, y - 10, w, 20);
        ctx.fill();
        ctx.fillStyle = "#ffffff";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(text, x + w / 2, y);
        ctx.restore();
      },
    };

    const tick = { color: "#8c94a6", font: { size: 11, family: FONT } };
    const options = {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: "index", intersect: false },
      plugins: {
        legend: { display: false },
        tooltip: {
          enabled: true,
          backgroundColor: "rgba(24, 27, 36, 0.95)",
          titleColor: "#9ea4b4",
          titleFont: { size: 12, family: FONT },
          bodyColor: "#ffffff",
          bodyFont: { size: 14, weight: "bold", family: FONT },
          borderColor: "rgba(255, 255, 255, 0.12)",
          borderWidth: 1,
          padding: 12,
          boxPadding: 6,
          displayColors: false,
          callbacks: {
            title: (items) => (items.length ? dayjs(timestamps[items[0].dataIndex]).format("MMM D, YYYY · HH:mm") : ""),
            label: (item) => {
              if (item.datasetIndex === 1) return `Volume: ${formatCompact(item.raw)}`;
              const diff = item.raw - baseline;
              const pct = baseline !== 0 ? (diff / baseline) * 100 : 0;
              const sign = diff >= 0 ? "+" : "";
              return [`Price: ${formatCurrency(item.raw)}`, `Change: ${sign}${formatCurrency(diff)} (${sign}${pct.toFixed(2)}%)`];
            },
          },
        },
      },
      scales: {
        x: { grid: { display: false }, border: { display: false }, ticks: { ...tick, maxRotation: 0, autoSkip: true, maxTicksLimit: 7 } },
        y: { position: "left", grid: { color: "rgba(140, 150, 175, 0.08)" }, border: { display: false }, ticks: { ...tick, callback: (v) => formatCompact(v) } },
        // Keeps the volume bars in the bottom ~18% of the chart.
        yVolume: { position: "right", display: false, max: (stats.maxVolume || 100) * 5.5, grid: { display: false } },
      },
    };

    return { data, options, plugins: [baselinePlugin] };
  }, [history, timeFrame, baseline, isPositive, stats]);

  if (!coin) return null;

  return (
    <Modal
      open={open}
      onClose={onClose}
      showClose={false}
      backdropClassName="bg-[rgba(10,12,18,0.75)] backdrop-blur-[8px]"
      className="max-h-[92vh] max-w-[760px] overflow-y-auto rounded-3xl bg-[linear-gradient(180deg,#1c1f28_0%,#14161d_100%)] p-5 text-white shadow-[0_32px_80px_-16px_rgba(0,0,0,0.65),0_0_0_1px_rgba(255,255,255,0.08)] sm:p-7"
    >
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/6 pb-4">
        <div className="flex items-center gap-3">
          {coin.image && <img src={coin.image} alt={coin.name} className="size-10 rounded-full bg-white/5 p-0.5 shadow-[0_4px_12px_rgba(0,0,0,0.2)]" />}
          <div className="flex items-center gap-2">
            <h6 className="text-[1.1rem] leading-[1.2] font-bold sm:text-xl">{coin.name}</h6>
            <span className="rounded-md bg-white/6 px-2 py-0.5 text-[0.85rem] font-semibold text-[#8c94a6]">{coin.symbol?.toUpperCase()}</span>
            {coin.cmc_rank && <span className="flex h-5 items-center rounded bg-primary/15 px-1.5 text-[0.72rem] font-semibold text-primary">#{coin.cmc_rank}</span>}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Menu>
            <MenuButton className="inline-flex items-center gap-1 rounded-[10px] border border-white/12 bg-white/6 px-3.5 py-1.5 text-[0.88rem] font-semibold text-white hover:border-white/25 hover:bg-white/12">
              {timeFrame}
              <ChevronDown className="size-[18px]" />
            </MenuButton>
            <MenuItems
              anchor="bottom end"
              className="z-[1400] min-w-[140px] rounded-[14px] border border-white/10 bg-[#1c1f28] p-1 text-white shadow-[0_16px_36px_rgba(0,0,0,0.5)] [--anchor-gap:8px] outline-none"
            >
              <p className="px-4 py-2 text-xs font-semibold tracking-[0.5px] text-n4 uppercase">Select Time</p>
              {TIMEFRAMES.map((tf) => {
                const selected = timeFrame === tf.key;
                return (
                  <MenuItem key={tf.key}>
                    <button
                      type="button"
                      onClick={() => selectTimeFrame(tf.key)}
                      className={cn(
                        "flex w-full items-center justify-between rounded-lg px-4 py-2 text-[0.9rem]",
                        selected ? "bg-primary/12 font-bold text-primary data-focus:bg-primary/18" : "font-medium text-[#d0d5dd] data-focus:bg-white/6"
                      )}
                    >
                      {tf.label}
                      {selected && <Check className="size-[18px] text-primary" />}
                    </button>
                  </MenuItem>
                );
              })}
            </MenuItems>
          </Menu>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="rounded-[10px] border border-white/8 bg-white/5 p-1.5 text-[#8c94a6] hover:border-[rgba(234,57,67,0.4)] hover:bg-[rgba(234,57,67,0.2)] hover:text-white"
          >
            <X className="size-5" />
          </button>
        </div>
      </div>

      {/* Price + high/low */}
      <div className="mt-5 mb-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-baseline gap-3">
          <h4 className="text-[1.7rem] font-extrabold tracking-[-0.5px] sm:text-[2.1rem]">{formatCurrency(stats.current)}</h4>
          <span
            className={cn(
              "inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-[0.85rem] font-bold",
              isPositive ? "bg-[rgba(22,199,132,0.15)] text-[#16c784]" : "bg-[rgba(234,57,67,0.15)] text-[#ea3943]"
            )}
          >
            {isPositive ? <TrendingUp className="size-4" /> : <TrendingDown className="size-4" />}
            {isPositive ? "+" : ""}
            {stats.changePercent.toFixed(2)}%
          </span>
          <p className="text-[0.85rem] font-medium text-[#8c94a6]">
            {stats.change >= 0 ? "+" : ""}
            {formatCurrency(stats.change)} ({timeFrame})
          </p>
        </div>

        <div className="flex items-center gap-4 rounded-xl border border-white/6 bg-white/4 px-4 py-2 text-xs font-semibold text-[#8c94a6] sm:gap-6">
          <span>
            High: <span className="ml-1 font-bold text-white">{formatCurrency(stats.high)}</span>
          </span>
          <span className="h-4 w-px bg-white/10" />
          <span>
            Low: <span className="ml-1 font-bold text-white">{formatCurrency(stats.low)}</span>
          </span>
        </div>
      </div>

      {/* Timeframe pills */}
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-1.5 rounded-[10px] border border-white/6 bg-white/4 p-1">
          {TIMEFRAMES.map((tf) => {
            const active = timeFrame === tf.key;
            return (
              <button
                key={tf.key}
                type="button"
                onClick={() => selectTimeFrame(tf.key)}
                className={cn(
                  "h-7 min-w-11 rounded-[7px] px-3 text-[0.8rem] hover:text-white",
                  active ? "bg-primary font-bold text-white shadow-[0_2px_8px_rgba(55,114,255,0.4)] hover:bg-[#2d62db]" : "font-medium text-[#8c94a6] hover:bg-white/8"
                )}
              >
                {tf.label}
              </button>
            );
          })}
        </div>
        {coin.volume_24h && (
          <p className="hidden text-[0.78rem] font-medium text-[#8c94a6] sm:block">
            24h Vol: <span className="font-semibold text-[#d0d5dd]">{formatCompact(coin.volume_24h)}</span>
            {" · "}
            MCap: <span className="font-semibold text-[#d0d5dd]">{formatCompact(coin.market_cap)}</span>
          </p>
        )}
      </div>

      {/* Chart */}
      <div className="relative h-[280px] w-full rounded-2xl border border-white/4 bg-[rgba(10,12,18,0.4)] p-3 sm:h-[340px]">
        {loading && (
          <div className="absolute inset-0 z-[5] flex items-center justify-center rounded-2xl bg-[rgba(20,22,29,0.7)] backdrop-blur-[2px]">
            <Spinner size={36} />
          </div>
        )}
        {chartConfig ? (
          <Chart type="line" data={chartConfig.data} options={chartConfig.options} plugins={chartConfig.plugins} />
        ) : (
          <div className="flex h-full items-center justify-center text-n4">
            <p>Loading chart data...</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-white/6 pt-4">
        <p className="text-[0.8rem] text-[#9ea4b4]">The Coin Chain Live</p>
        <button
          type="button"
          onClick={onClose}
          className="rounded-xl bg-primary px-6 py-2 text-[0.9rem] font-semibold text-white shadow-[0_4px_14px_rgba(55,114,255,0.4)] hover:bg-[#285de0]"
        >
          Close
        </button>
      </div>
    </Modal>
  );
}
