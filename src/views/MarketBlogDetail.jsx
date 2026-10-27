"use client";

import { RoutesName } from "@/_common/app.constants";
import ContentDetail from "@/components/ContentDetail";

export default function MarketBlogDetail() {
  return <ContentDetail parent={{ label: "Market", href: RoutesName.Market }} current="Blog details" />;
}
