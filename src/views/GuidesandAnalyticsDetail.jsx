"use client";

import { useAtomValue } from "jotai";
import { RoutesName } from "@/_common/app.constants";
import { breadCrumbAtom } from "@/_state";
import ContentDetail from "@/components/ContentDetail";

export default function GuidesandAnalyticsDetail() {
  const breadCrumb = useAtomValue(breadCrumbAtom);
  return <ContentDetail parent={{ label: breadCrumb, href: RoutesName.Guides_Analysis }} current="Blog details" withTicker compact />;
}
