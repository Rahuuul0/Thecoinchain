"use client";

import { useAtomValue } from "jotai";
import { analyticsActions, guidesAnalysisActions } from "@/_actions";
import { RoutesName } from "@/_common/app.constants";
import { analyticAtom, guidesAtom } from "@/_state";
import ContentHub from "@/components/ContentHub";

export default function GuidesAnalysis() {
  const guidesActions = guidesAnalysisActions();
  const analyticActions = analyticsActions();
  const guides = useAtomValue(guidesAtom);
  const analytics = useAtomValue(analyticAtom);

  return (
    <ContentHub
      title="Guides and Analytics"
      subtitle="Guides and Analytics for Trading Crypto"
      detailBase={RoutesName.GuidesandAnalyticsDetail}
      onLoad={() => {
        guidesActions.get();
        analyticActions.get();
      }}
      tabs={[
        { label: "Guides", heading: "Guides", categoryType: "Guide", entries: guides, crumb: "Guides", detailPage: "guides" },
        { label: "Analytics", heading: "Analytics", categoryType: "Analytics", entries: analytics, crumb: "Analytics", detailPage: "guideanalytics" },
      ]}
    />
  );
}
