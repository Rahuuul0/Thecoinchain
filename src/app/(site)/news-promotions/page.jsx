import NewsPromotions from "@/views/NewsPromotions";

export const metadata = {
  title: "News & Promotions",
  alternates: { canonical: "/news-promotions" },
};

export default function Page() {
  return <NewsPromotions />;
}
