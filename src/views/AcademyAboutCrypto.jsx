"use client";

import { useAtomValue } from "jotai";
import { academyActions } from "@/_actions";
import { academyAtom } from "@/_state";
import CourseList from "@/components/CourseList";

export default function AcademyAboutCrypto() {
  const actions = academyActions();
  const entries = useAtomValue(academyAtom);
  return <CourseList crumb="All About Crypto" entries={entries} load={actions.academyGetList} withTicker />;
}
