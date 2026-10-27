import { atom } from "jotai";
const coinsAtom = atom([]);

const coinsErrorAtom = atom(false);

const selectedCategoryAtom = atom(0 /* 0 for all */);

const coinCategoryAtom = atom([]);

const cardCoinsAtom = atom([]);

const predictionAtom = atom([]);

const categoryCoinsAtom = atom([]);

export {
  coinsAtom,
  coinsErrorAtom,
  coinCategoryAtom,
  selectedCategoryAtom,
  cardCoinsAtom,
  predictionAtom,
  categoryCoinsAtom,
};
