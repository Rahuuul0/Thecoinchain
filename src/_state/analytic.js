import { atom } from "recoil";

const analyticAtom = atom({
  key: "analytic",
  default: [],
});

export { analyticAtom };