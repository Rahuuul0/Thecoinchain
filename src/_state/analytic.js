import { atom } from "recoil";

const analyticAtom = atom({
  key: "analytic",
  default: [],
});

const analyticListSingleAtom = atom({
  key: "analyticListSingle",
  default: [],
});

export { analyticAtom, analyticListSingleAtom };