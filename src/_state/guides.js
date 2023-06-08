import { atom } from "recoil";

const guidesAtom = atom({
  key: "guides",
  default: [],
});

export { guidesAtom };