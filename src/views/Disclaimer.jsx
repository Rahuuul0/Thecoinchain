"use client";

import { useAtomValue } from "jotai";
import { useFooterActions } from "@/_actions";
import { DisclaimersListAtom } from "@/_state";
import CmsTextPage from "@/components/CmsTextPage";

export default function Disclaimer() {
  const footerActions = useFooterActions();
  const disclaimers = useAtomValue(DisclaimersListAtom);
  return <CmsTextPage crumb="Disclaimer" entries={disclaimers} load={footerActions.DisclaimersList} />;
}
