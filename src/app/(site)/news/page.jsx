import { getTrendingNewsServer } from "@/lib/api.server";
import MuiCryptoNewsSection from "@/views/MuiCryptoNewsSection";

const ALLOWED_TYPES = new Set(["bitcoin", "ethereum", "altcoin", "global_news"]);

function filterAndSortAllNews(rawList) {
  if (!Array.isArray(rawList)) return [];
  const filtered = rawList.filter((item) => {
    const t = (item?.type || "").toLowerCase().trim();
    const normalized = t === "global-news" ? "global_news" : t;
    return ALLOWED_TYPES.has(normalized);
  });
  return filtered.sort((a, b) => {
    const timeA = a?.created_at ? new Date(String(a.created_at).replace(/Z$/i, "")).getTime() : 0;
    const timeB = b?.created_at ? new Date(String(b.created_at).replace(/Z$/i, "")).getTime() : 0;
    return timeB - timeA;
  });
}

export const metadata = {
  title: { absolute: "Latest Crypto News | All Breaking News & Updates – The Coin Chain" },
  description:
    "Explore all breaking cryptocurrency news, Bitcoin updates, Ethereum developments, Altcoins, and global market events on The Coin Chain.",
  alternates: { canonical: "/news" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: "/news",
    title: "Latest Crypto News | All Breaking News & Updates – The Coin Chain",
    description:
      "Explore all breaking cryptocurrency news, Bitcoin updates, Ethereum developments, Altcoins, and global market events on The Coin Chain.",
    siteName: "The Coin Chain",
  },
  twitter: {
    card: "summary_large_image",
    title: "Latest Crypto News | All Breaking News & Updates – The Coin Chain",
    description:
      "Explore all breaking cryptocurrency news, Bitcoin updates, Ethereum developments, Altcoins, and global market events on The Coin Chain.",
  },
};

export default async function NewsPage() {
  const rawTrending = await getTrendingNewsServer();
  const initialItems = filterAndSortAllNews(rawTrending);

  return (
    <MuiCryptoNewsSection
      contentKey="news"
      initialItems={initialItems}
      customHeading="All News"
      isAllNews={true}
    />
  );
}

