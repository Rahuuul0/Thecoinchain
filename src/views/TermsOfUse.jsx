"use client";

import { useAtomValue } from "jotai";
import { useFooterActions } from "@/_actions";
import { TermsListAtom } from "@/_state";
import CmsTextPage from "@/components/CmsTextPage";

export default function TermsOfUse() {
  const footerActions = useFooterActions();
  const termsList = useAtomValue(TermsListAtom);
  return <CmsTextPage crumb="Terms of use" entries={termsList} load={footerActions.TermsList} />;
}
