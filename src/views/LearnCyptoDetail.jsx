"use client";

import { RoutesName } from "@/_common/app.constants";
import ContentDetail from "@/components/ContentDetail";

export default function LearnCyptoDetail() {
  return <ContentDetail parent={{ label: "Learn crypto", href: RoutesName.Learn_Cypto, clearsItem: true }} fullWidth />;
}
