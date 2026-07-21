import { atom } from "recoil";

const allContentAtom = atom({
  key: "allContent",
  default: [],
});

export { allContentAtom };