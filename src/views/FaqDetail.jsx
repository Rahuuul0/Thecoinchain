"use client";

import { RoutesName } from "@/_common/app.constants";
import ContentDetail from "@/components/ContentDetail";

export default function FaqDetail() {
  return <ContentDetail parent={{ label: "Faq", href: RoutesName.Prediction_Dashboard }} current="Blog details" />;
}
