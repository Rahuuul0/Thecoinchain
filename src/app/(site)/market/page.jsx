import Market from "@/views/Market";

export const metadata = {
  title: "Crypto Market",
  description: "Live cryptocurrency prices, market caps and market trends.",
  alternates: { canonical: "/market" },
};

export default function Page() {
  return <Market />;
}
