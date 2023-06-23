import { atom } from "recoil";

const historicalAtom = atom({
  key: "historical",
  default: {},
});

export { historicalAtom };