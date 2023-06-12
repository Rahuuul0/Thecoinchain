import { atom } from "recoil";
const coinsAtom = atom({
  key: "coinsAtom",
  default: [],
});

const coinsErrorAtom = atom({
  key: "coinsErrorAtom",
  default: false,
});

const selectedCategoryAtom = atom({
  key: "categoryName",
  default: 0 /* 0 for all */,
});

const coinCategoryAtom = atom({
  key: "categoryListAtom",
  default: [],
});

const cardCoinsAtom = atom({
  key: "cardCoinsAtom",
  default: [],
});

export {
  coinsAtom,
  coinsErrorAtom,
  coinCategoryAtom,
  selectedCategoryAtom,
  cardCoinsAtom,
};
