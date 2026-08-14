import React, { useEffect, useMemo } from 'react';
import { Box, Typography } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import { useRecoilValue } from 'recoil';

import { coinsAtom } from '../../../_state';
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

const MarqueeOuter = styled(Box)({
  width: '100%',
  minHeight: '44px',

  overflow: 'hidden',

  position: 'relative',

  zIndex: 1,

  background: '#FFFFFF',

  borderTop: '1px solid #EDEDED',
  borderBottom: '1px solid #EDEDED',

  display: 'flex',
  alignItems: 'center',
});

// ============================================================
// Marquee Track
// ============================================================

const MarqueeTrack = styled(Box)({
  display: 'flex',

  alignItems: 'center',

  flexWrap: 'nowrap',

  whiteSpace: 'nowrap',

  width: 'max-content',

  animation: `${scrollLeft} 45s linear infinite`,

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

  padding: '0 24px',
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

const CryptoTickerMarquee = () => {
  // Existing Coin Actions
  const { latestListing } = useCoinActions();

  // Existing Recoil Atom
  const coinsList = useRecoilValue(coinsAtom);

  // ==========================================================
  // Load CoinGecko data through existing action
  // ==========================================================

  useEffect(() => {
    latestListing();
  }, []);

  // ==========================================================
  // Convert coinsAtom data into ticker data
  // ==========================================================

  const cryptoTickerData = useMemo(() => {
    if (!Array.isArray(coinsList)) {
      return [];
    }

    return coinsList
      .slice(0, 10)
      .filter((coin) => coin?.id)
      .map((coin) => {
        const change = Number(
          coin.percent_change_24h ?? 0
        );

        return {
          id: coin.id,

          symbol:
            coin.symbol?.toUpperCase() || '',

          price: formatPrice(
            coin.price
          ),

          change: `${Math.abs(change).toFixed(2)}%`,

          direction:
            change >= 0
              ? 'up'
              : 'down',
        };
      });
  }, [coinsList]);

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
      className="website-all-crypto-ticker-marquee"
    >
      <MarqueeTrack>
        {marqueeData.map(
          (item, index) => (
            <TickerItem
              key={`${item.id}-${index}`}
            >
              {/* ==================================================
                  Coin Symbol
              ================================================== */}

              <Typography
                component="span"
                sx={{
                  fontWeight: 700,

                  fontSize: '14px',

                  color: '#111827',
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

                  color: '#111827',
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
                      ? '#DC2626'
                      : '#16A34A',

                  fontSize: '14px',

                  fontWeight: 600,
                }}
              >
                {item.direction === 'down'
                  ? '▼'
                  : '▲'}

                {' '}

                {item.change}
              </Box>
            </TickerItem>
          )
        )}
      </MarqueeTrack>
    </MarqueeOuter>
  );
};

export default CryptoTickerMarquee;