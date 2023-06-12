import { atom } from "recoil";

const promotionAtom = atom({
  key: "promotion",
  default: [],
});

export { promotionAtom };