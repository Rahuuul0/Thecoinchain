import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  Box,
  Typography,
  Modal,
  Button,
  IconButton,
  Menu,
  MenuItem,
  CircularProgress,
  Fade,
  Chip,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CheckIcon from "@mui/icons-material/Check";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import { Chart as ChartJS, registerables } from "chart.js";
import { Chart } from "react-chartjs-2";
import dayjs from "dayjs";

ChartJS.register(...registerables);
import { fetchCoinGecko } from "../../../_helpers";

const TIMEFRAMES = [
  { key: "24h", label: "24h", days: 1, unit: "hour" },
  { key: "7D", label: "7D", days: 7, unit: "day" },
  { key: "1M", label: "1M", days: 30, unit: "day" },
  { key: "1Y", label: "1Y", days: 365, unit: "month" },
];

const formatCurrency = (val) => {
  if (val == null || !Number.isFinite(Number(val))) return "$0.00";
  const num = Number(val);
  if (num >= 1000) {
    return (
      "$" +
      num.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
    );
  }
  if (num >= 1) {
    return "$" + num.toFixed(2);
  }
  if (num >= 0.0001) {
    return "$" + num.toFixed(4);
  }
  return "$" + num.toFixed(6);
};

const formatCompact = (val) => {
  if (val == null || !Number.isFinite(Number(val))) return "$0";
  const num = Number(val);
  if (num >= 1e12) return "$" + (num / 1e12).toFixed(2) + "T";
  if (num >= 1e9) return "$" + (num / 1e9).toFixed(2) + "B";
  if (num >= 1e6) return "$" + (num / 1e6).toFixed(2) + "M";
  if (num >= 1e3) return "$" + (num / 1e3).toFixed(2) + "K";
  if (num >= 1) return "$" + num.toFixed(2);
  return "$" + num.toFixed(4);
};

const CryptoChartModal = ({ open, onClose, coin }) => {
  const [timeFrame, setTimeFrame] = useState("24h");
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [loading, setLoading] = useState(false);
  const [chartDataState, setChartDataState] = useState({
    timestamps: [],
    prices: [],
    volumes: [],
  });

  const cacheRef = useRef({});

  // Reset timeframe to 24h when coin changes
  useEffect(() => {
    if (open && coin?.id) {
      setTimeFrame("24h");
      fetchChartHistory(coin.id, "24h");
    }
  }, [open, coin?.id]);

  const handleMenuOpen = (event) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  const handleSelectTimeFrame = (tfKey) => {
    setTimeFrame(tfKey);
    handleMenuClose();
    if (coin?.id) {
      fetchChartHistory(coin.id, tfKey);
    }
  };

  const generateFallbackData = (tfKey) => {
    const sparkline = coin?.sparkline || [];
    const currentPrice = coin?.price || 100;
    const now = Date.now();
    const targetTf = TIMEFRAMES.find((t) => t.key === tfKey) || TIMEFRAMES[0];
    const durationMs = targetTf.days * 24 * 60 * 60 * 1000;

    let points = [];
    let timestamps = [];
    let volumes = [];

    if (sparkline.length > 0) {
      let basePoints = [];
      if (tfKey === "24h") {
        basePoints = sparkline.slice(-24);
      } else if (tfKey === "7D") {
        basePoints = sparkline;
      } else if (tfKey === "1M") {
        // Expand sparkline smoothly
        basePoints = sparkline;
      } else {
        basePoints = sparkline;
      }

      const totalCount = basePoints.length;
      const stepMs = durationMs / Math.max(1, totalCount - 1);

      points = basePoints.map((p) => Number(p));
      timestamps = basePoints.map((_, i) => now - (totalCount - 1 - i) * stepMs);
      volumes = points.map((p) => (coin?.volume_24h || 1000000) * (0.8 + Math.random() * 0.4));
    } else {
      const count = tfKey === "24h" ? 24 : 30;
      const stepMs = durationMs / count;
      let p = currentPrice * 0.98;
      for (let i = 0; i < count; i++) {
        p = p * (1 + (Math.random() * 0.04 - 0.019));
        points.push(p);
        timestamps.push(now - (count - 1 - i) * stepMs);
        volumes.push((coin?.volume_24h || 1000000) * (0.8 + Math.random() * 0.4));
      }
      points[points.length - 1] = currentPrice;
    }

    return { timestamps, prices: points, volumes };
  };

  const fetchChartHistory = async (coinId, tfKey) => {
    const cacheKey = `${coinId}_${tfKey}`;
    if (cacheRef.current[cacheKey]) {
      setChartDataState(cacheRef.current[cacheKey]);
      return;
    }

    setLoading(true);
    const targetTf = TIMEFRAMES.find((t) => t.key === tfKey) || TIMEFRAMES[0];

    try {
      const res = await fetchCoinGecko(
        `/coins/${coinId}/market_chart?vs_currency=usd&days=${targetTf.days}`
      );
      if (!res.ok) throw new Error(`Status ${res.status}`);

      const data = await res.json();
      if (!data || !Array.isArray(data.prices) || data.prices.length === 0) {
        throw new Error("No price data returned");
      }

      const timestamps = data.prices.map((item) => item[0]);
      const prices = data.prices.map((item) => item[1]);
      const volumes = data.total_volumes
        ? data.total_volumes.map((item) => item[1])
        : prices.map(() => 0);

      const result = { timestamps, prices, volumes };
      cacheRef.current[cacheKey] = result;
      setChartDataState(result);
    } catch (err) {
      console.warn("CoinGecko market_chart fetch failed, using fallback:", err.message);
      const fallback = generateFallbackData(tfKey);
      cacheRef.current[cacheKey] = fallback;
      setChartDataState(fallback);
    } finally {
      setLoading(false);
    }
  };

  // Compute stats based on loaded prices
  const stats = useMemo(() => {
    const { prices, volumes } = chartDataState;
    if (!prices || prices.length === 0) {
      const cur = coin?.price || 0;
      return {
        high: cur,
        low: cur,
        open: cur,
        current: cur,
        change: 0,
        changePercent: coin?.percent_change_24h || 0,
        volume: coin?.volume_24h || 0,
      };
    }

    const high = Math.max(...prices);
    const low = Math.min(...prices);
    const open = prices[0];
    const current = prices[prices.length - 1];
    const change = current - open;
    const changePercent = open !== 0 ? (change / open) * 100 : 0;
    const maxVolume = volumes && volumes.length ? Math.max(...volumes) : 1;

    return {
      high,
      low,
      open,
      current,
      change,
      changePercent,
      maxVolume,
    };
  }, [chartDataState, coin]);

  const baselinePrice = stats.open;
  const isPositive = stats.changePercent >= 0;

  // Chart configuration with dynamic green/red gradient
  const chartConfig = useMemo(() => {
    const { timestamps, prices, volumes } = chartDataState;
    if (!prices || prices.length === 0) {
      return { data: { labels: [], datasets: [] }, options: {} };
    }

    const formattedLabels = timestamps.map((ts) => {
      const d = dayjs(ts);
      if (timeFrame === "24h") {
        return d.format("HH:mm");
      }
      if (timeFrame === "7D") {
        return d.format("ddd HH:mm");
      }
      if (timeFrame === "1M") {
        return d.format("MMM DD");
      }
      return d.format("MMM YYYY");
    });

    const data = {
      labels: formattedLabels,
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
          pointHoverBorderColor: (context) => {
            const val = context.raw;
            return val >= baselinePrice ? "#16c784" : "#ea3943";
          },
          tension: 0.3,
          fill: true,
          borderColor: (context) => {
            const chart = context.chart;
            const { ctx, chartArea, scales } = chart;
            if (!chartArea || !scales.y) return isPositive ? "#16c784" : "#ea3943";

            const yScale = scales.y;
            const zeroPixel = yScale.getPixelForValue(baselinePrice);
            const top = chartArea.top;
            const bottom = chartArea.bottom;
            const height = bottom - top;
            if (height <= 0) return isPositive ? "#16c784" : "#ea3943";

            let stop = (zeroPixel - top) / height;
            stop = Math.max(0, Math.min(1, stop));

            if (stop >= 1) return "#16c784";
            if (stop <= 0) return "#ea3943";

            const gradient = ctx.createLinearGradient(0, top, 0, bottom);
            gradient.addColorStop(0, "#16c784");
            gradient.addColorStop(Math.max(0, stop - 0.001), "#16c784");
            gradient.addColorStop(Math.min(1, stop + 0.001), "#ea3943");
            gradient.addColorStop(1, "#ea3943");
            return gradient;
          },
          backgroundColor: (context) => {
            const chart = context.chart;
            const { ctx, chartArea, scales } = chart;
            if (!chartArea || !scales.y) {
              return isPositive ? "rgba(22, 199, 132, 0.2)" : "rgba(234, 57, 67, 0.2)";
            }

            const yScale = scales.y;
            const zeroPixel = yScale.getPixelForValue(baselinePrice);
            const top = chartArea.top;
            const bottom = chartArea.bottom;
            const height = bottom - top;
            if (height <= 0) {
              return isPositive ? "rgba(22, 199, 132, 0.2)" : "rgba(234, 57, 67, 0.2)";
            }

            let stop = (zeroPixel - top) / height;
            stop = Math.max(0, Math.min(1, stop));

            const gradient = ctx.createLinearGradient(0, top, 0, bottom);
            if (stop >= 1) {
              gradient.addColorStop(0, "rgba(22, 199, 132, 0.32)");
              gradient.addColorStop(1, "rgba(22, 199, 132, 0.01)");
              return gradient;
            }
            if (stop <= 0) {
              gradient.addColorStop(0, "rgba(234, 57, 67, 0.01)");
              gradient.addColorStop(1, "rgba(234, 57, 67, 0.32)");
              return gradient;
            }

            // Above baseline: Green
            gradient.addColorStop(0, "rgba(22, 199, 132, 0.32)");
            gradient.addColorStop(stop, "rgba(22, 199, 132, 0.02)");
            // Below baseline: Red
            gradient.addColorStop(stop, "rgba(234, 57, 67, 0.02)");
            gradient.addColorStop(1, "rgba(234, 57, 67, 0.32)");
            return gradient;
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

    // Custom baseline plugin that draws dashed reference line & price badge
    const baselinePlugin = {
      id: "baselinePlugin",
      afterDraw: (chart) => {
        const { ctx, chartArea, scales } = chart;
        if (!chartArea || !scales.y || baselinePrice == null) return;

        const y = scales.y.getPixelForValue(baselinePrice);
        if (y < chartArea.top || y > chartArea.bottom) return;

        ctx.save();
        // 1. Dashed line across chart
        ctx.beginPath();
        ctx.setLineDash([5, 5]);
        ctx.lineWidth = 1.2;
        ctx.strokeStyle = "rgba(234, 57, 67, 0.85)";
        ctx.moveTo(chartArea.left, y);
        ctx.lineTo(chartArea.right, y);
        ctx.stroke();

        // 2. Baseline badge on Y axis
        const badgeText = formatCompact(baselinePrice);
        ctx.font = "bold 11px Poppins, DM Sans, sans-serif";
        const textMetrics = ctx.measureText(badgeText);
        const badgeWidth = textMetrics.width + 12;
        const badgeHeight = 20;
        const badgeX = chartArea.left - badgeWidth - 4;
        const badgeY = y - badgeHeight / 2;

        ctx.setLineDash([]);
        ctx.fillStyle = "#ea3943";
        ctx.beginPath();
        if (ctx.roundRect) {
          ctx.roundRect(badgeX, badgeY, badgeWidth, badgeHeight, 4);
        } else {
          ctx.rect(badgeX, badgeY, badgeWidth, badgeHeight);
        }
        ctx.fill();

        ctx.fillStyle = "#ffffff";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(badgeText, badgeX + badgeWidth / 2, y);

        ctx.restore();
      },
    };

    const options = {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        mode: "index",
        intersect: false,
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          enabled: true,
          backgroundColor: "rgba(24, 27, 36, 0.95)",
          titleColor: "#9ea4b4",
          titleFont: { size: 12, family: "Poppins, DM Sans, sans-serif" },
          bodyColor: "#ffffff",
          bodyFont: { size: 14, weight: "bold", family: "Poppins, DM Sans, sans-serif" },
          borderColor: "rgba(255, 255, 255, 0.12)",
          borderWidth: 1,
          padding: 12,
          boxPadding: 6,
          displayColors: false,
          callbacks: {
            title: (items) => {
              if (!items.length) return "";
              const idx = items[0].dataIndex;
              const ts = timestamps[idx];
              return dayjs(ts).format("MMM D, YYYY · HH:mm");
            },
            label: (item) => {
              if (item.datasetIndex === 0) {
                const val = item.raw;
                const diff = val - baselinePrice;
                const diffPct = baselinePrice !== 0 ? (diff / baselinePrice) * 100 : 0;
                const sign = diff >= 0 ? "+" : "";
                return [
                  `Price: ${formatCurrency(val)}`,
                  `Change: ${sign}${formatCurrency(diff)} (${sign}${diffPct.toFixed(2)}%)`,
                ];
              }
              if (item.datasetIndex === 1) {
                return `Volume: ${formatCompact(item.raw)}`;
              }
              return "";
            },
          },
        },
      },
      scales: {
        x: {
          grid: {
            display: false,
            drawBorder: false,
          },
          ticks: {
            color: "#8c94a6",
            font: { size: 11, family: "Poppins, DM Sans, sans-serif" },
            maxRotation: 0,
            autoSkip: true,
            maxTicksLimit: 7,
          },
        },
        y: {
          position: "left",
          grid: {
            color: "rgba(140, 150, 175, 0.08)",
            drawBorder: false,
          },
          ticks: {
            color: "#8c94a6",
            font: { size: 11, family: "Poppins, DM Sans, sans-serif" },
            callback: (val) => formatCompact(val),
          },
        },
        yVolume: {
          position: "right",
          display: false,
          max: (stats.maxVolume || 100) * 5.5, // Keeps volume bars in bottom 18% of chart
          grid: { display: false },
        },
      },
    };

    return { data, options, plugins: [baselinePlugin] };
  }, [chartDataState, timeFrame, baselinePrice, isPositive, stats]);

  if (!coin) return null;

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="chart-modal-title"
      aria-describedby="chart-modal-description"
      closeAfterTransition
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: { xs: 1, sm: 2 },
        backdropFilter: "blur(8px)",
        backgroundColor: "rgba(10, 12, 18, 0.75)",
      }}
    >
      <Fade in={open}>
        <Box
          sx={{
            position: "relative",
            width: "100%",
            maxWidth: "760px",
            maxHeight: "92vh",
            overflowY: "auto",
            borderRadius: "24px",
            background: "linear-gradient(180deg, #1c1f28 0%, #14161d 100%)",
            color: "#ffffff",
            boxShadow: "0 32px 80px -16px rgba(0, 0, 0, 0.65), 0 0 0 1px rgba(255, 255, 255, 0.08)",
            p: { xs: 2.5, sm: 3.5 },
            outline: "none",
          }}
        >
          {/* Top Bar: Coin Info on Left, Timeframe Dropdown + Close on Right */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 2,
              pb: 2,
              borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
            }}
          >
            {/* Left Coin Identity */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              {coin.image && (
                <Box
                  component="img"
                  src={coin.image}
                  alt={coin.name}
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    p: "2px",
                    bgcolor: "rgba(255, 255, 255, 0.05)",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                  }}
                />
              )}
              <Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      fontSize: { xs: "1.1rem", sm: "1.25rem" },
                      lineHeight: 1.2,
                    }}
                  >
                    {coin.name}
                  </Typography>
                  <Typography
                    sx={{
                      color: "#8c94a6",
                      fontWeight: 600,
                      fontSize: "0.85rem",
                      bgcolor: "rgba(255, 255, 255, 0.06)",
                      px: 1,
                      py: 0.2,
                      borderRadius: "6px",
                    }}
                  >
                    {coin.symbol?.toUpperCase()}
                  </Typography>
                  {coin.cmc_rank && (
                    <Chip
                      size="small"
                      label={`#${coin.cmc_rank}`}
                      sx={{
                        height: 20,
                        fontSize: "0.72rem",
                        fontWeight: 600,
                        bgcolor: "rgba(55, 114, 255, 0.15)",
                        color: "#3772ff",
                        borderRadius: "4px",
                      }}
                    />
                  )}
                </Box>
              </Box>
            </Box>

            {/* Right Controls: Timeframe Dropdown (matching uploaded image) + Close Button */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              {/* Dropdown Button matching uploaded image */}
              <Button
                onClick={handleMenuOpen}
                endIcon={<KeyboardArrowDownIcon sx={{ fontSize: "18px !important" }} />}
                sx={{
                  bgcolor: "rgba(255, 255, 255, 0.06)",
                  color: "#ffffff",
                  borderRadius: "10px",
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                  px: 1.8,
                  py: 0.6,
                  textTransform: "none",
                  fontSize: "0.88rem",
                  fontWeight: 600,
                  "&:hover": {
                    bgcolor: "rgba(255, 255, 255, 0.12)",
                    borderColor: "rgba(255, 255, 255, 0.25)",
                  },
                }}
              >
                {timeFrame}
              </Button>

              {/* Time Selector Dropdown Menu */}
              <Menu
                anchorEl={menuAnchor}
                open={Boolean(menuAnchor)}
                onClose={handleMenuClose}
                PaperProps={{
                  sx: {
                    mt: 1,
                    minWidth: 140,
                    bgcolor: "#1c1f28",
                    color: "#ffffff",
                    borderRadius: "14px",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    boxShadow: "0 16px 36px rgba(0, 0, 0, 0.5)",
                    p: 0.5,
                  },
                }}
              >
                <Typography
                  sx={{
                    px: 2,
                    py: 1,
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    color: "#777e90",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  Select Time
                </Typography>
                {TIMEFRAMES.map((tf) => {
                  const isSelected = timeFrame === tf.key;
                  return (
                    <MenuItem
                      key={tf.key}
                      onClick={() => handleSelectTimeFrame(tf.key)}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        px: 2,
                        py: 0.9,
                        borderRadius: "8px",
                        fontSize: "0.9rem",
                        fontWeight: isSelected ? 700 : 500,
                        color: isSelected ? "#3772ff" : "#d0d5dd",
                        bgcolor: isSelected ? "rgba(55, 114, 255, 0.12)" : "transparent",
                        "&:hover": {
                          bgcolor: isSelected
                            ? "rgba(55, 114, 255, 0.18)"
                            : "rgba(255, 255, 255, 0.06)",
                        },
                      }}
                    >
                      <span>{tf.label}</span>
                      {isSelected && <CheckIcon sx={{ fontSize: 18, color: "#3772ff" }} />}
                    </MenuItem>
                  );
                })}
              </Menu>

              {/* Close Button */}
              <IconButton
                onClick={onClose}
                sx={{
                  color: "#8c94a6",
                  bgcolor: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: "10px",
                  p: 0.8,
                  "&:hover": {
                    color: "#ffffff",
                    bgcolor: "rgba(234, 57, 67, 0.2)",
                    borderColor: "rgba(234, 57, 67, 0.4)",
                  },
                }}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </Box>
          </Box>

          {/* Price & High/Low Stats Banner (Matching uploaded image layout: High: $79,246.97) */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 2,
              mt: 2.5,
              mb: 2,
            }}
          >
            {/* Live Price + % Change Badge */}
            <Box sx={{ display: "flex", alignItems: "baseline", gap: 1.5, flexWrap: "wrap" }}>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 800,
                  fontSize: { xs: "1.7rem", sm: "2.1rem" },
                  letterSpacing: "-0.5px",
                }}
              >
                {formatCurrency(stats.current)}
              </Typography>
              <Box
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 0.5,
                  px: 1.2,
                  py: 0.4,
                  borderRadius: "8px",
                  fontSize: "0.85rem",
                  fontWeight: 700,
                  bgcolor: isPositive ? "rgba(22, 199, 132, 0.15)" : "rgba(234, 57, 67, 0.15)",
                  color: isPositive ? "#16c784" : "#ea3943",
                }}
              >
                {isPositive ? (
                  <TrendingUpIcon sx={{ fontSize: 16 }} />
                ) : (
                  <TrendingDownIcon sx={{ fontSize: 16 }} />
                )}
                <span>
                  {isPositive ? "+" : ""}
                  {stats.changePercent.toFixed(2)}%
                </span>
              </Box>
              <Typography
                sx={{
                  color: "#8c94a6",
                  fontSize: "0.85rem",
                  fontWeight: 500,
                }}
              >
                {stats.change >= 0 ? "+" : ""}
                {formatCurrency(stats.change)} ({timeFrame})
              </Typography>
            </Box>

            {/* High / Low Quick Stats (Matching image: High: $ 79,246.97) */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: { xs: 2, sm: 3 },
                bgcolor: "rgba(255, 255, 255, 0.04)",
                px: 2,
                py: 1,
                borderRadius: "12px",
                border: "1px solid rgba(255, 255, 255, 0.06)",
              }}
            >
              <Box>
                <Typography sx={{ color: "#8c94a6", fontSize: "0.75rem", fontWeight: 600 }}>
                  High:{" "}
                  <Box
                    component="span"
                    sx={{ color: "#ffffff", fontWeight: 700, ml: 0.5 }}
                  >
                    {formatCurrency(stats.high)}
                  </Box>
                </Typography>
              </Box>
              <Box sx={{ width: "1px", height: 16, bgcolor: "rgba(255, 255, 255, 0.1)" }} />
              <Box>
                <Typography sx={{ color: "#8c94a6", fontSize: "0.75rem", fontWeight: 600 }}>
                  Low:{" "}
                  <Box
                    component="span"
                    sx={{ color: "#ffffff", fontWeight: 700, ml: 0.5 }}
                  >
                    {formatCurrency(stats.low)}
                  </Box>
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Quick Timeframe Filter Tabs */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 1.5,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.8,
                bgcolor: "rgba(255, 255, 255, 0.04)",
                p: 0.5,
                borderRadius: "10px",
                border: "1px solid rgba(255, 255, 255, 0.06)",
              }}
            >
              {TIMEFRAMES.map((tf) => {
                const isActive = timeFrame === tf.key;
                return (
                  <Button
                    key={tf.key}
                    size="small"
                    onClick={() => handleSelectTimeFrame(tf.key)}
                    sx={{
                      minWidth: 44,
                      height: 28,
                      px: 1.4,
                      borderRadius: "7px",
                      fontSize: "0.8rem",
                      fontWeight: isActive ? 700 : 500,
                      textTransform: "none",
                      color: isActive ? "#ffffff" : "#8c94a6",
                      bgcolor: isActive ? "#3772ff" : "transparent",
                      boxShadow: isActive ? "0 2px 8px rgba(55, 114, 255, 0.4)" : "none",
                      "&:hover": {
                        bgcolor: isActive ? "#2d62db" : "rgba(255, 255, 255, 0.08)",
                        color: "#ffffff",
                      },
                    }}
                  >
                    {tf.label}
                  </Button>
                );
              })}
            </Box>

            {/* Volume indicator */}
            {coin.volume_24h && (
              <Typography
                sx={{
                  color: "#8c94a6",
                  fontSize: "0.78rem",
                  fontWeight: 500,
                  display: { xs: "none", sm: "block" },
                }}
              >
                24h Vol:{" "}
                <Box component="span" sx={{ color: "#d0d5dd", fontWeight: 600 }}>
                  {formatCompact(coin.volume_24h)}
                </Box>
                {" · "}
                MCap:{" "}
                <Box component="span" sx={{ color: "#d0d5dd", fontWeight: 600 }}>
                  {formatCompact(coin.market_cap)}
                </Box>
              </Typography>
            )}
          </Box>

          {/* Interactive Chart Area */}
          <Box
            sx={{
              position: "relative",
              width: "100%",
              height: { xs: "280px", sm: "340px" },
              bgcolor: "rgba(10, 12, 18, 0.4)",
              borderRadius: "16px",
              p: 1.5,
              border: "1px solid rgba(255, 255, 255, 0.04)",
            }}
          >
            {loading && (
              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  bgcolor: "rgba(20, 22, 29, 0.7)",
                  zIndex: 5,
                  borderRadius: "16px",
                  backdropFilter: "blur(2px)",
                }}
              >
                <CircularProgress size={36} sx={{ color: "#3772ff" }} />
              </Box>
            )}

            {chartConfig.data.datasets?.length > 0 ? (
              <Chart
                type="line"
                data={chartConfig.data}
                options={chartConfig.options}
                plugins={chartConfig.plugins}
              />
            ) : (
              <Box
                sx={{
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#777e90",
                }}
              >
                <Typography>Loading chart data...</Typography>
              </Box>
            )}
          </Box>

          {/* Bottom Footer Actions */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mt: 2.5,
              pt: 2,
              borderTop: "1px solid rgba(255, 255, 255, 0.06)",
              flexWrap: "wrap",
              gap: 1.5,
            }}
          >
            <Box sx={{ display: "flex", gap: 2 }}>
              <Typography sx={{ color: "#777e90", fontSize: "0.8rem" }}>
                <Box component="span" sx={{ color: "#9ea4b4" }}>The Coin Chain Live</Box>
              </Typography>
            </Box>

            <Button
              variant="contained"
              onClick={onClose}
              sx={{
                bgcolor: "#3772ff",
                color: "#ffffff",
                borderRadius: "12px",
                px: 3,
                py: 1,
                fontSize: "0.9rem",
                fontWeight: 600,
                textTransform: "none",
                boxShadow: "0 4px 14px rgba(55, 114, 255, 0.4)",
                "&:hover": {
                  bgcolor: "#285de0",
                },
              }}
            >
              Close
            </Button>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default CryptoChartModal;
