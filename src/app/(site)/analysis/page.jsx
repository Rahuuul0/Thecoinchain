import { getTrendingNewsServer } from "@/lib/api.server";
import MuiCryptoNewsSection from "@/views/MuiCryptoNewsSection";

const ALLOWED_ANALYSIS_TYPES = new Set([
  "price_prediction",
  "stock_price_prediction",
  "bitcoin_analysis",
  "ethereum_analysis",
  "memecoin_analysis",
]);

function filterAndSortAllAnalysis(rawList) {
  if (!Array.isArray(rawList)) return [];
  const filtered = rawList.filter((item) => {
    const t = (item?.type || "").toLowerCase().trim();
    return ALLOWED_ANALYSIS_TYPES.has(t);
  });
  return filtered.sort((a, b) => {
    const timeA = a?.created_at ? new Date(String(a.created_at).replace(/Z$/i, "")).getTime() : 0;
    const timeB = b?.created_at ? new Date(String(b.created_at).replace(/Z$/i, "")).getTime() : 0;
    return timeB - timeA;
  });
}

export const metadata = {
  title: { absolute: "Latest Crypto & Stock Price Analysis | Technical Outlook – The Coin Chain" },
  description:
    "Explore in-depth technical analysis, Bitcoin and Ethereum price updates, memecoin forecasts, and crypto stock price predictions on The Coin Chain.",
  alternates: { canonical: "/analysis" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: "/analysis",
    title: "Latest Crypto & Stock Price Analysis | Technical Outlook – The Coin Chain",
    description:
      "Explore in-depth technical analysis, Bitcoin and Ethereum price updates, memecoin forecasts, and crypto stock price predictions on The Coin Chain.",
    siteName: "The Coin Chain",
  },
  twitter: {
    card: "summary_large_image",
    title: "Latest Crypto & Stock Price Analysis | Technical Outlook – The Coin Chain",
    description:
      "Explore in-depth technical analysis, Bitcoin and Ethereum price updates, memecoin forecasts, and crypto stock price predictions on The Coin Chain.",
  },
};

export default async function AnalysisPage() {
  const rawTrending = await getTrendingNewsServer();
  const initialItems = filterAndSortAllAnalysis(rawTrending);

  return (
    <MuiCryptoNewsSection
      contentKey="analysis"
      initialItems={initialItems}
      customHeading="All Analysis"
      isAllAnalysis={true}
    />
  );
}

