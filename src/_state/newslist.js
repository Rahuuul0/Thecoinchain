import { atom } from "recoil";

const newsListAtom = atom({
  key: "newsList",
  default: [],
});

const newsListAtomSingle = atom({
  key: "newsListSingle",
  default: [],
});

export { newsListAtom, newsListAtomSingle };