"use client";

import { useAtomValue } from "jotai";
import { academyActions } from "@/_actions";
import { masterAtom } from "@/_state";
import CourseList from "@/components/CourseList";

export default function MasterCourse() {
  const actions = academyActions();
  const entries = useAtomValue(masterAtom);
  // The master-course API spells the field "decription".
  return <CourseList crumb="Master Course" entries={entries} load={actions.masterCourseGetList} descriptionKey="decription" />;
}
