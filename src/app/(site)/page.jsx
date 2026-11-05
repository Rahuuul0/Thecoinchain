import HomePage from "@/components/home/HomePage";
import {
  getAnalysisCategoriesParallel,
  getBreakingNewsCategoriesParallel,
  getBusinessCategoriesParallel,
  getCategoryNews,
  getTrendingNewsServer,
  getTutorialList,
} from "@/lib/api.server";

export const metadata = {
  title: { absolute: "TheCoinChain | Latest Crypto News, Market Analysis & Price Predictions" },
  description:
    "Stay updated with the latest cryptocurrency news, Bitcoin updates, market analysis, research reports, press releases and price predictions on TheCoinChain.",
  keywords: ["crypto news", "bitcoin news", "ethereum news", "blockchain", "cryptocurrency", "price prediction", "market analysis"],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    title: "TheCoinChain | Latest Crypto News, Market Analysis & Price Predictions",
    description: "Read the latest cryptocurrency news, research reports, press releases and market insights on TheCoinChain.",
  },
};

export default async function Page() {
  const [
    initialBreakingNews,
    initialAnalysisData,
    initialMarketNews,
    initialTutorials,
    initialTrendingNews,
    initialBusinessNews,
  ] = await Promise.all([
    getBreakingNewsCategoriesParallel(),
    getAnalysisCategoriesParallel(),
    getCategoryNews("market").catch(() => []),
    getTutorialList().catch(() => []),
    getTrendingNewsServer().catch(() => []),
    getBusinessCategoriesParallel().catch(() => ({ latest_news: [], finance: [] })),
  ]);
  return (
    <HomePage
      initialBreakingNews={initialBreakingNews}
      initialAnalysisData={initialAnalysisData}
      initialMarketNews={initialMarketNews}
      initialTutorials={initialTutorials}
      initialTrendingNews={initialTrendingNews}
      initialBusinessNews={initialBusinessNews}
    />
  );
}
