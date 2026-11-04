import LearnCypto from "@/views/LearnCypto";

export const metadata = {
  title: { absolute: "Learn Crypto – Video Tutorials & Blockchain Guides | The Coin Chain" },
  description:
    "Learn the fundamentals of crypto, blockchain, Bitcoin, Ethereum, and technical analysis with free video tutorials and guides on The Coin Chain.",
  alternates: { canonical: "/learn-cypto" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: "/learn-cypto",
    title: "Learn Crypto – Video Tutorials & Blockchain Guides | The Coin Chain",
    description:
      "Learn the fundamentals of crypto, blockchain, Bitcoin, Ethereum, and technical analysis with free video tutorials and guides on The Coin Chain.",
    siteName: "The Coin Chain",
  },
  twitter: {
    card: "summary_large_image",
    title: "Learn Crypto – Video Tutorials & Blockchain Guides | The Coin Chain",
    description:
      "Learn the fundamentals of crypto, blockchain, Bitcoin, Ethereum, and technical analysis with free video tutorials and guides on The Coin Chain.",
  },
};

export default function Page() {
  return <LearnCypto />;
}
