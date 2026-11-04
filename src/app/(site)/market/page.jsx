import Market from "@/views/Market";

export const metadata = {
  title: { absolute: "Crypto Market Cap, Live Prices & Charts | The Coin Chain" },
  description: "Live cryptocurrency prices, market caps, 24h volume, price charts and real-time market trends on The Coin Chain.",
  alternates: { canonical: "/market" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: "/market",
    title: "Crypto Market Cap, Live Prices & Charts | The Coin Chain",
    description: "Live cryptocurrency prices, market caps, 24h volume, price charts and real-time market trends on The Coin Chain.",
    siteName: "The Coin Chain",
  },
  twitter: {
    card: "summary_large_image",
    title: "Crypto Market Cap, Live Prices & Charts | The Coin Chain",
    description: "Live cryptocurrency prices, market caps, 24h volume, price charts and real-time market trends on The Coin Chain.",
  },
};

export default function Page() {
  return <Market />;
}
