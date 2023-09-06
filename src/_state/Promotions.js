import { atom } from "recoil";

const promotionAtom = atom({
  key: "promotion",
  default: [],
});

const promotionAtomSingle = atom({
  key: "promotionSingle",
  default: [],
});


export { promotionAtom, promotionAtomSingle };