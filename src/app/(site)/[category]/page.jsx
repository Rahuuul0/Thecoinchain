import { notFound } from "next/navigation";
import { NEWS_CATEGORIES } from "@/lib/newsCategories";
import MuiCryptoNewsSection from "@/views/MuiCryptoNewsSection";

// Only the known categories exist; anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(NEWS_CATEGORIES).map((category) => ({ category }));
}

export async function generateMetadata({ params }) {
  const { category } = await params;
  if (!NEWS_CATEGORIES[category]) return {};
  const { heading } = NEWS_CATEGORIES[category];
  return {
    title: `${heading} – Crypto News & Analysis`,
    description: `The latest ${heading.toLowerCase()} coverage from The Coin Chain: cryptocurrency news, market analysis and insights.`,
    alternates: { canonical: `/${category}` },
  };
}

export default async function CategoryPage({ params, searchParams }) {
  const { category } = await params;
  // Reading searchParams makes this route dynamic, so guard unknown slugs here too.
  if (!NEWS_CATEGORIES[category]) notFound();
  const { type } = await searchParams;
  // Old links use /latest-news?type=<category>; direct category routes ignore ?type.
  const contentKey = category === "latest-news" && typeof type === "string" && type.trim() ? type.toLowerCase().trim() : category;
  return <MuiCryptoNewsSection contentKey={contentKey} />;
}
