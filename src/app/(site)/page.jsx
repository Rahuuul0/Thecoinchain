import HomePage from "@/components/home/HomePage";

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

export default function Page() {
  return <HomePage />;
}
