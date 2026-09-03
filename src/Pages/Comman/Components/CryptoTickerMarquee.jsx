import React, { useEffect, useMemo } from 'react';
import { Box, Typography } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import { useRecoilValue } from 'recoil';

import { coinsAtom, switchDarkModeAtom } from '../../../_state';
import { useCoinActions } from '../../../_actions';

// ============================================================
// Marquee Animation
// ============================================================

const scrollLeft = keyframes`
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(-50%);
  }
`;

// ============================================================
// Marquee Outer
// ============================================================

const MarqueeOuter = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isDark',
})(({ isDark }) => ({
  width: '100%',
  minHeight: '44px',
  overflow: 'hidden',
  position: 'relative',
  zIndex: 1,
  background: isDark ? '#141416' : '#FFFFFF',
  borderTop: isDark ? '1px solid #23262F' : '1px solid #EDEDED',
  borderBottom: isDark ? '1px solid #23262F' : '1px solid #EDEDED',
  display: 'flex',
  alignItems: 'center',
  transition: 'background-color 0.2s ease, border-color 0.2s ease',
}));

// ============================================================
// Marquee Track
// ============================================================

const MarqueeTrack = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'nowrap',
  whiteSpace: 'nowrap',
  width: 'max-content',
  animation: `${scrollLeft} 80s linear infinite`,
  willChange: 'transform',
  '&:hover': {
    animationPlayState: 'paused',
  },
});

// ============================================================
// Ticker Item
// ============================================================

const TickerItem = styled(Box)({
  display: 'inline-flex',
  alignItems: 'center',
  flexShrink: 0,
  gap: '6px',
  padding: '0 20px',
});

// ============================================================
// Price Formatter
// ============================================================

const formatPrice = (price) => {
  const number = Number(price);

  if (!Number.isFinite(number)) {
    return '$0';
  }

  // Very small coin prices
  if (number < 0.01) {
    return `$${number.toFixed(6)}`;
  }

  return `$${number.toLocaleString('en-US', {
    maximumFractionDigits: 6,
  })}`;
};

// ============================================================
// Crypto Ticker Marquee
// ============================================================

const CryptoTickerMarquee = ({ data: propData } = {}) => {
  // Existing Coin Actions
  const { latestListing } = useCoinActions();

  // Existing Recoil Atoms
  const coinsList = useRecoilValue(coinsAtom);
  const isDarkMode = useRecoilValue(switchDarkModeAtom);

  // ==========================================================
  // Load CoinGecko data through existing action
  // ==========================================================

  useEffect(() => {
    if (!Array.isArray(coinsList) || coinsList.length === 0) {
      latestListing();
    }
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
        const change = Number(
          coin.percent_change_24h ?? 0
        );

        return {
          id: coin.id,
          image: coin.image,
          symbol: coin.symbol?.toUpperCase() || '',
          price: formatPrice(coin.price),
          change: `${Math.abs(change).toFixed(2)}%`,
          direction: change >= 0 ? 'up' : 'down',
        };
      });
  }, [coinsList, propData]);

  // ==========================================================
  // Repeat data enough times to avoid blank space
  // ==========================================================

  const marqueeData = useMemo(() => {
    if (!cryptoTickerData.length) {
      return [];
    }

    return [
      ...cryptoTickerData,
      ...cryptoTickerData,
      ...cryptoTickerData,
      ...cryptoTickerData,
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
    <MarqueeOuter
      isDark={isDarkMode}
      className="website-all-crypto-ticker-marquee"
    >
      <MarqueeTrack>
        {marqueeData.map((item, index) => (
          <TickerItem key={`${item.id || item.symbol}-${index}`}>
            {/* ==================================================
                Coin Icon / Logo
            ================================================== */}
            {item.image && (
              <Box
                component="img"
                src={item.image}
                alt={item.symbol || 'coin'}
                sx={{
                  width: 20,
                  height: 20,
                  borderRadius: '50%',
                  objectFit: 'contain',
                  flexShrink: 0,
                  display: 'inline-block',
                }}
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            )}

            {/* ==================================================
                Coin Symbol
            ================================================== */}
            <Typography
              component="span"
              sx={{
                fontWeight: 700,
                fontSize: '14px',
                color: isDarkMode ? '#FFFFFF' : '#111827',
              }}
            >
              {item.symbol}
            </Typography>

            {/* ==================================================
                Coin Price
            ================================================== */}
            <Typography
              component="span"
              sx={{
                fontSize: '14px',
                fontWeight: 500,
                color: isDarkMode ? '#E6E8EC' : '#111827',
              }}
            >
              {item.price}
            </Typography>

            {/* ==================================================
                24h Price Change
            ================================================== */}
            <Box
              component="span"
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '2px',
                color:
                  item.direction === 'down'
                    ? (isDarkMode ? '#F87171' : '#DC2626')
                    : (isDarkMode ? '#4ADE80' : '#16A34A'),
                fontSize: '14px',
                fontWeight: 600,
              }}
            >
              {item.direction === 'down' ? '▼' : '▲'} {item.change}
            </Box>
          </TickerItem>
        ))}
      </MarqueeTrack>
    </MarqueeOuter>
  );
};

export default CryptoTickerMarquee;