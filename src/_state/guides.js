import { atom } from "recoil";

const guidesAtom = atom({
  key: "guides",
  default: [],
});

const guideListSingleAtom = atom({
  key: "guideListSingle",
  default: [],
});

export { guidesAtom, guideListSingleAtom };