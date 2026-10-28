"use client";

import MarketPage from "@/components/MarketPage";

export default function Market() {
  return <MarketPage subscribeHref="/subscription" tableProps={{ isIt: true }} />;
}
