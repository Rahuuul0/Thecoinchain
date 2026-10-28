import React from "react";

const LiveSparkline = ({ prices = [], change = 0 }) => {
  const values = prices.filter(Number.isFinite).slice(-40);
  const color = change < 0 ? "#ff6838" : "#00c076";

  if (values.length < 2) {
    return <span style={{ color }}>—</span>;
  }

  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const points = values
    .map((price, index) => {
      const x = (index / (values.length - 1)) * 96;
      const y = 32 - ((price - min) / range) * 28;
      return `${x.toFixed(2)},${y.toFixed(2)}`;
    })
    .join(" ");

  return (
    <svg width="96" height="36" viewBox="0 0 96 36" role="img" aria-label="Live seven-day price chart">
      <polyline fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" points={points} />
    </svg>
  );
};

export default LiveSparkline;
