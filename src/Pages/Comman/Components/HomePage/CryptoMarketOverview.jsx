import React, { useEffect, useMemo } from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import { useRecoilValue } from "recoil";
import { cardCoinsAtom, coinsAtom, switchDarkModeAtom } from "../../../../_state";
import { useCoinActions } from "../../../../_actions";

// Default coins metadata for fallback / display
const defaultCoinNames = {
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

// Fallback top 4 coins in case data is loading or empty
const initialPlaceholderCoins = [
  {
    id: "bitcoin",
    name: "Bitcoin",
    symbol: "BTC",
    price: 82714.0,
    percent_change_24h: 1.33,
    volume_24h: 23305068601,
    image: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png",
  },
  {
    id: "ethereum",
    name: "Ethereum",
    symbol: "ETH",
    price: 2427.47,
    percent_change_24h: 0.77,
    volume_24h: 9100346918,
    image: "https://assets.coingecko.com/coins/images/279/large/ethereum.png",
  },
  {
    id: "tether",
    name: "Tether",
    symbol: "USDT",
    price: 1.0,
    percent_change_24h: 0.03,
    volume_24h: 42968670971,
    image: "https://assets.coingecko.com/coins/images/325/large/Tether.png",
  },
  {
    id: "binancecoin",
    name: "BNB",
    symbol: "BNB",
    price: 726.85,
    percent_change_24h: 0.97,
    volume_24h: 6414084401,
    image: "https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png",
  },
];

// Helper: Format Price
const formatPrice = (price) => {
  if (price === undefined || price === null || price === "") return "$0.00";
  const num = Number(price);
  if (isNaN(num)) return `$${price}`;
  if (num >= 1) {
    return `$${num.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  } else if (num >= 0.1) {
    return `$${num.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 4,
    })}`;
  } else if (num >= 0.01) {
    return `$${num.toLocaleString("en-US", {
      minimumFractionDigits: 4,
      maximumFractionDigits: 6,
    })}`;
  } else {
    return `$${num.toLocaleString("en-US", {
      minimumFractionDigits: 6,
      maximumFractionDigits: 8,
    })}`;
  }
};

// Helper: Format Volume
const formatVolume = (vol) => {
  if (vol === undefined || vol === null || vol === "") return "$0.00";
  const num = Number(vol);
  if (isNaN(num)) return `$${vol}`;
  return `$${num.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

// Component: Sparkline Area Chart with Gradient
const AreaSparkline = ({ prices, isPositive, coinId }) => {
  const rawValues = Array.isArray(prices) ? prices.filter(Number.isFinite) : [];

  // Generate smooth trending points if sparkline array is missing or small
  const values =
    rawValues.length >= 8
      ? rawValues.slice(-28)
      : isPositive
        ? [10, 11, 9, 13, 12, 14, 13, 16, 15, 18, 17, 21, 19, 23, 21, 24, 23, 26]
        : [26, 24, 25, 22, 23, 19, 21, 17, 18, 15, 16, 13, 14, 11, 12, 9, 10, 8];

  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const width = 240;
  const height = 52;
  const paddingY = 5;

  const points = values.map((val, idx) => {
    const x = (idx / (values.length - 1)) * width;
    const y = height - paddingY - ((val - min) / range) * (height - paddingY * 2);
    return { x, y };
  });

  const linePath = points.reduce((acc, pt, idx) => {
    return `${acc} ${idx === 0 ? "M" : "L"} ${pt.x.toFixed(1)},${pt.y.toFixed(1)}`;
  }, "");

  const areaPath = `${linePath} L ${width},${height} L 0,${height} Z`;

  const strokeColor = isPositive ? "#00C076" : "#FF6838";
  const gradId = `sparkGrad-${coinId || Math.random().toString(36).substring(7)}`;

  return (
    <Box sx={{ width: "100%", height: "52px", my: 1.5, overflow: "hidden" }}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="none"
        style={{ width: "100%", height: "100%", display: "block" }}
      >
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={strokeColor} stopOpacity="0.25" />
            <stop offset="100%" stopColor={strokeColor} stopOpacity="0.0" />
          </linearGradient>
        </defs>
        <path d={areaPath} fill={`url(#${gradId})`} />
        <path
          d={linePath}
          fill="none"
          stroke={strokeColor}
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Box>
  );
};

const CryptoMarketOverview = () => {
  const isDarkMode = useRecoilValue(switchDarkModeAtom);
  const cardCoinsList = useRecoilValue(cardCoinsAtom);
  const coinsList = useRecoilValue(coinsAtom);
  const coinActions = useCoinActions();

  // Load coins if not yet present
  useEffect(() => {
    if (
      (!Array.isArray(cardCoinsList) || cardCoinsList.length === 0) &&
      (!Array.isArray(coinsList) || coinsList.length === 0)
    ) {
      coinActions.latestListing("?limit=10");
    }
  }, []);

  // Determine top 4 coins to display
  const displayCoins = useMemo(() => {
    if (Array.isArray(cardCoinsList) && cardCoinsList.length >= 4) {
      return cardCoinsList.slice(0, 4);
    }
    if (Array.isArray(coinsList) && coinsList.length >= 4) {
      return coinsList.slice(0, 4);
    }
    if (Array.isArray(cardCoinsList) && cardCoinsList.length > 0) {
      return cardCoinsList.slice(0, 4);
    }
    return initialPlaceholderCoins;
  }, [cardCoinsList, coinsList]);

  return (
    <Box
      component="section"
      sx={{
        py: { xs: 4, sm: 5, md: 6 },
        width: "100%",
        position: "relative",
      }}
    >
      <Container maxWidth="lg">
        {/* Section Header */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mb: 3.5,
          }}
        >
          {/* Vertical Yellow Accent Bar */}
          <Box
            sx={{
              width: "4px",
              height: "28px",
              backgroundColor: "#F5AC00",
              borderRadius: "4px",
              mr: 1.5,
              flexShrink: 0,
            }}
          />

          {/* Heading and Subtitle */}
          <Box>
            <Typography
              variant="h3"
              component="h2"
              sx={{
                fontFamily: "var(--secondary-font), sans-serif",
                fontWeight: 800,
                fontSize: { xs: "22px", sm: "26px" },
                lineHeight: 1.2,
                letterSpacing: "0.5px",
                color: isDarkMode ? "#FFFFFF" : "#141416",
                textTransform: "uppercase",
              }}
            >
              <Box component="span" sx={{ color: "#F5AC00", mr: 1 }}>
                CRYPTO
              </Box>
              MARKET
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontSize: "13px",
                fontWeight: 500,
                color: isDarkMode ? "#777E90" : "#777E90",
                mt: 0.4,
                letterSpacing: "0.2px",
              }}
            >
              Live prices • Market movement
            </Typography>
          </Box>
        </Box>

        {/* Single Main Card Container (matching old design in Image) */}
        <Box
          sx={{
            backgroundColor: isDarkMode ? "#23262F" : "#F4F5F6",
            border: isDarkMode
              ? "1px solid rgba(255, 255, 255, 0.08)"
              : "1px solid rgb(86 98 255 / 14%)",
            borderRadius: { xs: "20px", sm: "32px" },
            p: { xs: 2.5, sm: 3, md: 3.5 },
            boxShadow: isDarkMode
              ? "0 8px 32px rgba(15, 15, 15, 0.3)"
              : "0 4px 20px rgba(0, 0, 0, 0.03)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <Grid container spacing={{ xs: 2, sm: 2.5, md: 2.5 }}>
            {displayCoins.map((item, index) => {
              const isPositive = (item?.percent_change_24h ?? 0) >= 0;
              const coinSymbol = (item?.symbol || "").toUpperCase();
              const coinName =
                item?.name || defaultCoinNames[coinSymbol] || coinSymbol;

              return (
                <Grid item xs={12} sm={6} md={3} key={item.id || item.symbol || index}>
                  <Box
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      backgroundColor: isDarkMode ? "#353945" : "#FFFFFF",
                      border: isDarkMode
                        ? "1px solid rgba(255, 255, 255, 0.06)"
                        : "1px solid #E6E8EC",
                      borderRadius: "24px",
                      p: { xs: 2, sm: 2.5 },
                      boxShadow: isDarkMode
                        ? "0px 8px 20px rgba(15, 15, 15, 0.2)"
                        : "0px 8px 20px rgba(15, 15, 15, 0.05)",
                      // cursor: "pointer",
                      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                      "&:hover": {
                        transform: "translateY(-5px)",
                        backgroundColor: isDarkMode
                          ? "#3D4250 !important"
                          : "#FFFFFF !important",
                        boxShadow: isDarkMode
                          ? "0px 18px 30px rgba(15, 15, 15, 0.4)"
                          : "0px 18px 30px rgba(15, 15, 15, 0.12)",
                        borderColor: isDarkMode
                          ? "rgba(255, 255, 255, 0.18)"
                          : "#D1D5DB",
                      },
                    }}
                  >
                    {/* Column Header: Icon, Name, Symbol & Change Badge */}
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      {/* Left: Icon & Coin Name / Symbol */}
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1.25 }}>
                        <Box
                          component="img"
                          src={item?.image}
                          alt={coinSymbol}
                          sx={{
                            width: 38,
                            height: 38,
                            borderRadius: "50%",
                            objectFit: "contain",
                            flexShrink: 0,
                          }}
                        />
                        <Box>
                          <Typography
                            sx={{
                              fontSize: "15px",
                              fontWeight: 700,
                              color: isDarkMode ? "#FFFFFF" : "#141416",
                              lineHeight: 1.2,
                              fontFamily: "var(--secondary-font), sans-serif",
                            }}
                          >
                            {coinName}
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: "12px",
                              fontWeight: 500,
                              color: isDarkMode ? "#777E90" : "#848E9C",
                              textTransform: "uppercase",
                              mt: 0.3,
                              lineHeight: 1,
                            }}
                          >
                            {coinSymbol}
                          </Typography>
                        </Box>
                      </Box>

                      {/* Right: 24h Change Pill Badge */}
                      <Box
                        sx={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "3px",
                          px: 1.2,
                          py: "3px",
                          borderRadius: "90px",
                          fontSize: "12px",
                          fontWeight: 600,
                          backgroundColor: isPositive ? "#58BD7D" : "#FF6838",
                          color: "#FFFFFF",
                        }}
                      >
                        <span style={{ fontSize: "9px" }}>
                          {isPositive ? "▲" : "▼"}
                        </span>
                        <span>
                          {isPositive ? "+" : ""}
                          {item?.percent_change_24h !== undefined &&
                            item?.percent_change_24h !== null
                            ? Number(item.percent_change_24h).toFixed(2)
                            : "0.00"}
                          %
                        </span>
                      </Box>
                    </Box>

                    {/* Price */}
                    <Typography
                      sx={{
                        fontSize: { xs: "24px", sm: "26px" },
                        fontWeight: 700,
                        color: isDarkMode ? "#FFFFFF" : "#141416",
                        mt: 2,
                        mb: 0.5,
                        letterSpacing: "-0.5px",
                        fontFamily: "var(--secondary-font), sans-serif",
                      }}
                    >
                      {formatPrice(item?.price)}
                    </Typography>

                    {/* Sparkline Chart */}
                    <AreaSparkline
                      prices={item?.sparkline}
                      isPositive={isPositive}
                      coinId={item?.id || item?.symbol || index}
                    />

                    {/* 24h Volume */}
                    <Box sx={{ mt: 0.5 }}>
                      <Typography
                        sx={{
                          fontSize: "11px",
                          fontWeight: 500,
                          color: isDarkMode ? "#777E90" : "#848E9C",
                          mb: 0.3,
                          lineHeight: 1,
                        }}
                      >
                        24h Volume
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "13.5px",
                          fontWeight: 600,
                          color: isDarkMode ? "#E6E8EC" : "#23262F",
                          fontFamily: "var(--secondary-font), sans-serif",
                        }}
                      >
                        {formatVolume(item?.volume_24h)}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default CryptoMarketOverview;
