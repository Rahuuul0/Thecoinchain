import { notFound } from "next/navigation";
import { getCategoryNews } from "@/lib/api.server";
import { contentConfigFor, NEWS_CATEGORIES } from "@/lib/newsCategories";
import MuiCryptoNewsSection from "@/views/MuiCryptoNewsSection";

// Only the known categories exist; anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(NEWS_CATEGORIES)
    .filter((category) => category !== "news")
    .map((category) => ({ category }));
}

const CATEGORY_SEO = {
  bitcoin: {
    title: "Bitcoin News – Latest BTC News, Analysis & Price Updates",
    description:
      "Stay updated with breaking Bitcoin news, BTC market trends, institutional adoption, and price movements on The Coin Chain.",
  },
  altcoin: {
    title: "Altcoin News – Top Crypto Altcoins & Market Developments",
    description:
      "Get the latest altcoin news, tokens, DeFi developments, and crypto market updates on The Coin Chain.",
  },
  ethereum: {
    title: "Ethereum News – Latest ETH News, Upgrades & Analysis",
    description:
      "Discover breaking Ethereum news, ETH 2.0 updates, smart contracts, network upgrades, and market insights on The Coin Chain.",
  },
  global_news: {
    title: "Global Crypto News – Worldwide Regulations & Market Events",
    description:
      "Read global cryptocurrency news, regulatory policies, financial developments, and worldwide blockchain updates on The Coin Chain.",
  },
  "global-news": {
    title: "Global Crypto News – Worldwide Regulations & Market Events",
    description:
      "Read global cryptocurrency news, regulatory policies, financial developments, and worldwide blockchain updates on The Coin Chain.",
  },
};

export async function generateMetadata({ params }) {
  const { category } = await params;
  if (!NEWS_CATEGORIES[category]) return {};
  const { heading } = NEWS_CATEGORIES[category];
  const custom = CATEGORY_SEO[category];

  const title = custom?.title || `${heading} – Crypto News & Analysis`;
  const description =
    custom?.description ||
    `The latest ${heading.toLowerCase()} coverage from The Coin Chain: cryptocurrency news, market analysis and insights.`;
  const canonicalUrl = `/${category}`;

  return {
    title: { absolute: `${title} | The Coin Chain` },
    description,
    alternates: { canonical: canonicalUrl },
    robots: { index: true, follow: true },
    openGraph: {
      type: "website",
      url: canonicalUrl,
      title: `${title} | The Coin Chain`,
      description,
      siteName: "The Coin Chain",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | The Coin Chain`,
      description,
    },
  };
}

export default async function CategoryPage({ params, searchParams }) {
  const { category } = await params;
  // Reading searchParams makes this route dynamic, so guard unknown slugs here too.
  if (!NEWS_CATEGORIES[category]) notFound();
  const { type } = await searchParams;
  // Old links use /latest-news?type=<category>; direct category routes ignore ?type.
  const contentKey =
    category === "latest-news" && typeof type === "string" && type.trim()
      ? type.toLowerCase().trim()
      : category;

  const config = contentConfigFor(contentKey);
  const initialItems = await getCategoryNews(config.type);

  return <MuiCryptoNewsSection contentKey={contentKey} initialItems={initialItems} />;
}
