// News listing routes rendered by MuiCryptoNewsSection.
//
// `type` is the backend content type. Routes without one fall back to
// latest_news, as they always have.
export const NEWS_CATEGORIES = {
  "latest-news": { type: "latest_news", heading: "Latest News" },
  "press-release": { type: "press_release", heading: "Press Release" },
  "crypto-regulation": { type: "crypto_regulation", heading: "Crypto Regulation" },
  "price-prediction": { type: "price_prediction", heading: "Price Analysis" },
  "crypto-stock-price-prediction": { type: "stock_price_prediction", heading: "Stock Price Analysis" },
  "market-news": { type: "market", heading: "Market" },
  finance: { type: "finance", heading: "Finance" },
  "trending-news": { type: "trending_news", heading: "Trending News" },
  "search": { type: "trending_news", heading: "Search" },
  bitcoin: { type: "bitcoin", heading: "Bitcoin" },
  ethereum: { type: "ethereum", heading: "Ethereum" },
  altcoin: { type: "altcoin", heading: "Altcoin" },
  "global-news": { type: "global_news", heading: "Global News" },
  "global_news": { type: "global_news", heading: "Global News" },
  news: { type: "trending_news", heading: "All News" },
  analysis: { type: "trending_news", heading: "All Analysis" },
  "memecoin-analysis": { type: "memecoin_analysis", heading: "Memecoin Analysis" },
  "ethereum-analysis": { type: "ethereum_analysis", heading: "Ethereum Analysis" },
  "bitcoin-analysis": { type: "bitcoin_analysis", heading: "Bitcoin Analysis" },
  explain: { type: "explain", heading: "Explain" },
  // Listed in the router but not configured: show latest news.
  information: { heading: "Information" },
  "research-report": { heading: "Research Report" },
  // "guest-post": { heading: "Guest Post" },
  sponsored: { heading: "Sponsored" },
  "price-analysis": { heading: "Price Analysis" },
  "stock-price-prediction": { heading: "Stock Price Prediction" },
  // policy: { heading: "Policy" },
  // tech: { heading: "Tech" },
};

export const DEFAULT_CATEGORY = NEWS_CATEGORIES["latest-news"];

/** Config used to load content for a route slug (unconfigured slugs → latest news). */
export function contentConfigFor(slug) {
  const config = NEWS_CATEGORIES[slug];
  return config?.type ? { ...config, label: config.heading } : { ...DEFAULT_CATEGORY, label: DEFAULT_CATEGORY.heading };
}

/** Label for an item's backend type, e.g. on the mixed trending feed. */
export function labelForType(type) {
  if (!type) return null;
  const t = type.toLowerCase().trim();
  const normalized = t.replace(/-/g, "_");

  const TYPE_MAPPINGS = {
    latest_news: "Latest News",
    press_release: "Press Release",
    crypto_regulation: "Crypto Regulation",
    price_prediction: "Price Analysis",
    stock_price_prediction: "Stock Price Analysis",
    market: "Market",
    finance: "Finance",
    trending_news: "Trending News",
    bitcoin: "Bitcoin",
    ethereum: "Ethereum",
    altcoin: "Altcoin",
    global_news: "Global News",
    memecoin_analysis: "Memecoin Analysis",
    ethereum_analysis: "Ethereum Analysis",
    bitcoin_analysis: "Bitcoin Analysis",
    explain: "Explain",
  };

  if (TYPE_MAPPINGS[normalized]) {
    return TYPE_MAPPINGS[normalized];
  }

  const found = Object.entries(NEWS_CATEGORIES).find(
    ([key, c]) =>
      !["search", "news", "analysis"].includes(key) &&
      c.type &&
      (c.type === t || c.type.replace(/-/g, "_") === normalized)
  );

  if (found) {
    return found[1].heading;
  }

  return normalized
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}
