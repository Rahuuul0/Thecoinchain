import { getCategoryNews } from "@/lib/api.server";
import MuiCryptoNewsSection from "@/views/MuiCryptoNewsSection";

export const metadata = {
  title: { absolute: "Market News – Crypto Market Trends, Insights & Analysis | The Coin Chain" },
  description:
    "Explore the latest crypto market news, market movements, trading volumes, and blockchain market developments on The Coin Chain.",
  alternates: { canonical: "/market-news" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: "/market-news",
    title: "Market News – Crypto Market Trends, Insights & Analysis | The Coin Chain",
    description:
      "Explore the latest crypto market news, market movements, trading volumes, and blockchain market developments on The Coin Chain.",
    siteName: "The Coin Chain",
  },
  twitter: {
    card: "summary_large_image",
    title: "Market News – Crypto Market Trends, Insights & Analysis | The Coin Chain",
    description:
      "Explore the latest crypto market news, market movements, trading volumes, and blockchain market developments on The Coin Chain.",
  },
};

export default async function MarketNewsPage() {
  const initialItems = await getCategoryNews("market").catch(() => []);

  // Sort newest first by created_at
  const sortedItems = Array.isArray(initialItems)
    ? [...initialItems].sort((a, b) => {
        const timeA = a?.created_at ? new Date(String(a.created_at).replace(/Z$/i, "")).getTime() : 0;
        const timeB = b?.created_at ? new Date(String(b.created_at).replace(/Z$/i, "")).getTime() : 0;
        return timeB - timeA;
      })
    : [];

  return (
    <MuiCryptoNewsSection
      contentKey="market-news"
      initialItems={sortedItems}
      customHeading="Market News"
    />
  );
}

