"use client";

import { useAtomValue } from "jotai";
import { newsListActions, promotionsActions, useHomeActions } from "@/_actions";
import { RoutesName } from "@/_common/app.constants";
import { newsListAtom, promotionAtom } from "@/_state";
import ContentHub from "@/components/ContentHub";

export default function NewsPromotions() {
  const newsActions = newsListActions();
  const promoActions = promotionsActions();
  const homeActions = useHomeActions();
  const news = useAtomValue(newsListAtom);
  const promotions = useAtomValue(promotionAtom);

  return (
    <ContentHub
      title="News and Promotions"
      subtitle="News and Promotions for Trading Crypto"
      detailBase={RoutesName.News_And_PromotionsDetail}
      onLoad={() => {
        newsActions.get();
        promoActions.get();
        homeActions.headingList();
      }}
      tabs={[
        { label: "News", heading: "News and Promotions", categoryType: "News", entries: news, crumb: "News", detailPage: "newsletter" },
        { label: "Promotion", heading: "Promotions", categoryType: "Promotions", entries: promotions, crumb: "Promotions", detailPage: "newspromotions" },
      ]}
    />
  );
}
