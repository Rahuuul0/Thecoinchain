"use client";

import { RoutesName } from "@/_common/app.constants";
import ContentDetail from "@/components/ContentDetail";

export default function ContactDetail() {
  return <ContentDetail parent={{ label: "Contacts", href: RoutesName.Contact_Us }} current="Blog details" />;
}
