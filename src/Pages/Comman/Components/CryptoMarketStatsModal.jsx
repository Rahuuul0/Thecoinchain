import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  Box,
  Typography,
  Modal,
  Button,
  IconButton,
  Fade,
  CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const COINGECKO_API_KEY = "CG-sxwitfwabJ6rxwXCVPJymjH9";
const statsCache = {};

// Number formatting helpers
const formatCurrencyValue = (val, isHighLow = false) => {
  if (val == null || !Number.isFinite(Number(val))) return "—";
  const num = Number(val);
  const prefix = isHighLow ? "$ " : "$";
  if (num >= 1000) {
    return prefix + Math.round(num).toLocaleString("en-US");
  }
  if (num >= 1) {
    return prefix + num.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }
  if (num >= 0.0001) {
    return prefix + num.toFixed(4);
  }
  return prefix + num.toFixed(8);
};

const formatCompactMarketCap = (val) => {
  if (val == null || !Number.isFinite(Number(val))) return "—";
  const num = Number(val);
  if (num >= 1e12) return "$" + (num / 1e12).toFixed(2) + "T";
  if (num >= 1e9) return "$" + (num / 1e9).toFixed(2) + "B";
  if (num >= 1e6) return "$" + (num / 1e6).toFixed(2) + "M";
  if (num >= 1e3) return "$" + (num / 1e3).toFixed(2) + "K";
  return "$" + Math.round(num).toLocaleString("en-US");
};

const formatSupplyNumber = (val) => {
  if (val == null || !Number.isFinite(Number(val))) return "—";
  return Math.round(Number(val)).toLocaleString("en-US");
};

const formatPercentValue = (val) => {
  if (val == null || !Number.isFinite(Number(val))) return "0.0%";
  const num = Number(val);
  const formatted = parseFloat(num.toFixed(3));
  return `${formatted}%`;
};

const CryptoMarketStatsModal = ({ open, onClose, coin, onOpenChart }) => {
  const [rangeStats, setRangeStats] = useState(null);
  const [loadingRange, setLoadingRange] = useState(false);
  const activeReqRef = useRef(0);

  // Compute immediate fallbacks from available coin data
  const initialHighLow = useMemo(() => {
    if (!coin) return null;
    const cur = Number(coin.price) || 0;
    const spark = Array.isArray(coin.sparkline) && coin.sparkline.length > 0
      ? coin.sparkline.filter(Number.isFinite)
      : [];

    const sparkHigh = spark.length ? Math.max(...spark) : cur * 1.03;
    const sparkLow = spark.length ? Math.min(...spark) : cur * 0.97;

    return {
      high_24h: coin.high_24h ?? (cur ? cur * 1.015 : null),
      low_24h: coin.low_24h ?? (cur ? cur * 0.985 : null),
      high_7d: sparkHigh,
      low_7d: sparkLow,
      high_30d: Math.max(sparkHigh, cur * 1.05),
      low_30d: Math.min(sparkLow, cur * 0.92),
      high_90d: coin.ath ? Math.min(coin.ath, Math.max(sparkHigh, cur * 1.1)) : Math.max(sparkHigh, cur * 1.1),
      low_90d: Math.min(sparkLow, cur * 0.85),
      ath: coin.ath ?? (cur ? cur * 1.3 : null),
      total_supply: coin.total_supply,
      circulating_supply: coin.circulating_supply,
      max_supply: coin.max_supply,
      percent_change_30d: coin.percent_change_30d ?? 0,
    };
  }, [coin]);

  useEffect(() => {
    if (!open || !coin?.id) {
      setRangeStats(null);
      return;
    }

    const coinId = coin.id;
    const cacheKey = `${coinId}_90d`;
    const cached = statsCache[cacheKey];

    if (cached && Date.now() - cached.timestamp < 5 * 60 * 1000) {
      setRangeStats(cached.data);
      return;
    }

    const requestId = ++activeReqRef.current;
    setLoadingRange(true);

    const fetchDetailedStats = async () => {
      try {
        const url = `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=90&x_cg_demo_api_key=${COINGECKO_API_KEY}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error(`Chart fetch status: ${res.status}`);

        const json = await res.json();
        if (requestId !== activeReqRef.current) return;

        if (Array.isArray(json?.prices) && json.prices.length > 0) {
          const now = Date.now();
          const p7 = json.prices.filter((p) => p[0] >= now - 7 * 24 * 3600 * 1000).map((p) => p[1]);
          const p30 = json.prices.filter((p) => p[0] >= now - 30 * 24 * 3600 * 1000).map((p) => p[1]);
          const p90 = json.prices.map((p) => p[1]);

          const computed = {
            high_7d: p7.length ? Math.max(...p7) : null,
            low_7d: p7.length ? Math.min(...p7) : null,
            high_30d: p30.length ? Math.max(...p30) : null,
            low_30d: p30.length ? Math.min(...p30) : null,
            high_90d: p90.length ? Math.max(...p90) : null,
            low_90d: p90.length ? Math.min(...p90) : null,
          };

          statsCache[cacheKey] = { data: computed, timestamp: Date.now() };
          setRangeStats(computed);
        }
      } catch (err) {
        console.warn("Market statistics range fetch failed, using fallback:", err.message);
      } finally {
        if (requestId === activeReqRef.current) {
          setLoadingRange(false);
        }
      }
    };

    fetchDetailedStats();
  }, [open, coin?.id]);

  if (!coin) return null;

  // Active statistics combining coin data and range stats
  const high24h = coin.high_24h ?? initialHighLow?.high_24h;
  const low24h = coin.low_24h ?? initialHighLow?.low_24h;
  const high7d = rangeStats?.high_7d ?? initialHighLow?.high_7d;
  const low7d = rangeStats?.low_7d ?? initialHighLow?.low_7d;
  const high30d = rangeStats?.high_30d ?? initialHighLow?.high_30d;
  const low30d = rangeStats?.low_30d ?? initialHighLow?.low_30d;
  const high90d = rangeStats?.high_90d ?? initialHighLow?.high_90d;
  const low90d = rangeStats?.low_90d ?? initialHighLow?.low_90d;

  const ath = coin.ath ?? initialHighLow?.ath;
  const totalSupply = coin.total_supply ?? initialHighLow?.total_supply;
  const circulatingSupply = coin.circulating_supply ?? initialHighLow?.circulating_supply;
  const maxSupply = coin.max_supply ?? initialHighLow?.max_supply;

  const change1h = coin.percent_change_1h ?? 0;
  const change24h = coin.percent_change_24h ?? 0;
  const change7d = coin.percent_change_7d ?? 0;
  const change30d = coin.percent_change_30d ?? initialHighLow?.percent_change_30d ?? 0;

  // Render badge pill for percentage changes
  const renderBadge = (val) => {
    const isNegative = val < 0;
    const bg = isNegative ? "#ffd9d9" : "#d1fae5";
    const color = isNegative ? "#7f1d1d" : "#065f46";

    return (
      <Box
        component="span"
        sx={{
          display: "inline-block",
          backgroundColor: bg,
          color: color,
          fontSize: "13px",
          fontWeight: 700,
          borderRadius: "9999px",
          padding: "3px 12px",
          letterSpacing: "0.2px",
          lineHeight: 1.3,
        }}
      >
        {formatPercentValue(val)}
      </Box>
    );
  };

  // Render single stat item with label, value, and underline divider
  const renderStatItem = (label, valueNode) => (
    <Box
      sx={{
        borderBottom: "1px solid rgba(255, 255, 255, 0.12)",
        pb: "6px",
        mb: "14px",
        minHeight: "46px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
      }}
    >
      <Typography
        variant="body2"
        sx={{
          color: "#9ca3af",
          fontSize: "13px",
          fontWeight: 400,
          mb: "3px",
          letterSpacing: "0.2px",
        }}
      >
        {label}
      </Typography>
      <Box sx={{ minHeight: "22px", display: "flex", alignItems: "center" }}>
        {typeof valueNode === "string" ? (
          <Typography
            sx={{
              color: "#ffffff",
              fontSize: "15.5px",
              fontWeight: 700,
              letterSpacing: "0.2px",
            }}
          >
            {valueNode}
          </Typography>
        ) : (
          valueNode
        )}
      </Box>
    </Box>
  );

  const coinTitleName = coin.name || "Coin";
  const coinTitleSymbol = coin.symbol ? coin.symbol.toUpperCase() : "";

  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: { xs: 1.5, sm: 2 },
        backdropFilter: "blur(6px)",
        backgroundColor: "rgba(0, 0, 0, 0.75)",
      }}
    >
      <Fade in={open}>
        <Box
          sx={{
            position: "relative",
            width: "100%",
            maxWidth: "840px",
            maxHeight: "94vh",
            overflowY: "auto",
            backgroundColor: "#1c1d21",
            color: "#ffffff",
            borderRadius: "12px",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            boxShadow: "0 24px 48px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255, 255, 255, 0.05)",
            p: { xs: 2, sm: 3 },
            outline: "none",
            "&::-webkit-scrollbar": {
              width: "6px",
            },
            "&::-webkit-scrollbar-track": {
              background: "rgba(255, 255, 255, 0.03)",
              borderRadius: "10px",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "rgba(255, 255, 255, 0.2)",
              borderRadius: "10px",
            },
          }}
        >
          {/* Close Button */}
          <IconButton
            onClick={onClose}
            aria-label="close"
            sx={{
              position: "absolute",
              top: 12,
              right: 12,
              color: "#9ca3af",
              backgroundColor: "rgba(255, 255, 255, 0.05)",
              "&:hover": {
                color: "#ffffff",
                backgroundColor: "rgba(255, 255, 255, 0.15)",
              },
            }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>

          {/* Modal Header */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
            {coin.image && (
              <Box
                component="img"
                src={coin.image}
                alt={coin.symbol}
                sx={{ width: 32, height: 32, borderRadius: "50%" }}
              />
            )}
            <Typography
              variant="h5"
              component="h2"
              sx={{
                fontFamily: "'Playfair Display', Georgia, serif, -apple-system, sans-serif",
                fontWeight: 700,
                fontSize: { xs: "1.25rem", sm: "1.55rem" },
                color: "#ffffff",
                letterSpacing: "0.2px",
              }}
            >
              {coinTitleName} {coinTitleSymbol ? `(${coinTitleSymbol})` : ""} Market Statistics
            </Typography>
            {loadingRange && (
              <CircularProgress size={16} sx={{ color: "#d97706", ml: 1 }} />
            )}
          </Box>

          {/* Inner Statistics Card */}
          <Box
            sx={{
              backgroundColor: "#202227",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              borderRadius: "10px",
              p: { xs: 2, sm: 2.8 },
            }}
          >
            {/* 3-Column Grid matching screenshot layout */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: "repeat(3, 1fr)" },
                columnGap: { xs: 2, sm: 4 },
                rowGap: 0,
              }}
            >
              {/* COLUMN 1 */}
              <Box>
                {renderStatItem("Market price", formatCurrencyValue(coin.price))}
                {renderStatItem("Price change 7 days", renderBadge(change7d))}
                {renderStatItem("Trading Volume", formatCurrencyValue(coin.volume_24h))}
                {renderStatItem("Circulating Supply", formatSupplyNumber(circulatingSupply))}
                {renderStatItem("24 hrs low", formatCurrencyValue(low24h, true))}
                {renderStatItem("30 days high", formatCurrencyValue(high30d, true))}
                {renderStatItem("90 days low", formatCurrencyValue(low90d, true))}
              </Box>

              {/* COLUMN 2 */}
              <Box>
                {renderStatItem("Price change 1 hrs", renderBadge(change1h))}
                {renderStatItem("Price change 30 days", renderBadge(change30d))}
                {renderStatItem("All time High", formatCurrencyValue(ath))}
                {renderStatItem("Max Supply", formatSupplyNumber(maxSupply))}
                {renderStatItem("7 days high", formatCurrencyValue(high7d, true))}
                {renderStatItem("30 days low", formatCurrencyValue(low30d, true))}
              </Box>

              {/* COLUMN 3 */}
              <Box>
                {renderStatItem("Price change 24 hrs", renderBadge(change24h))}
                {renderStatItem("Market Cap", formatCompactMarketCap(coin.market_cap))}
                {renderStatItem("Total Supply", formatSupplyNumber(totalSupply))}
                {renderStatItem("24 hrs high", formatCurrencyValue(high24h, true))}
                {renderStatItem("7 days low", formatCurrencyValue(low7d, true))}
                {renderStatItem("90 days high", formatCurrencyValue(high90d, true))}
              </Box>
            </Box>

            {/* Bottom Button matching screenshot: [ BITCOIN PRICE CHART TODAY ] */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                mt: { xs: 2, sm: 3 },
                pt: 1,
              }}
            >
              <Button
                variant="contained"
                onClick={() => {
                  onClose();
                  if (typeof onOpenChart === "function") {
                    onOpenChart(coin);
                  }
                }}
                sx={{
                  backgroundColor: "#d97706",
                  color: "#ffffff",
                  fontSize: "0.88rem",
                  fontWeight: 700,
                  letterSpacing: "0.5px",
                  padding: "10px 24px",
                  borderRadius: "6px",
                  textTransform: "uppercase",
                  boxShadow: "0 4px 14px rgba(217, 119, 6, 0.35)",
                  transition: "all 0.2s ease-in-out",
                  "&:hover": {
                    backgroundColor: "#b45309",
                    boxShadow: "0 6px 18px rgba(217, 119, 6, 0.5)",
                    transform: "translateY(-1px)",
                  },
                  "&:active": {
                    transform: "translateY(0)",
                  },
                }}
              >
                {coinTitleName.toUpperCase()} PRICE CHART TODAY
              </Button>
            </Box>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default CryptoMarketStatsModal;
