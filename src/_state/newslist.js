import { atom } from "recoil";

const newsListAtom = atom({
  key: "newsList",
  default: [],
});

const newsListAtomSingle = atom({
  key: "newsListSingle",
  default: [],
});

const latestNewsAtom = atom({
  key: "latestNewsAtom",
  default: [],
});

const TrendingNewsAtom = atom({
  key: "TrendingNewsAtom",
  default: [],
});


export { newsListAtom, newsListAtomSingle, latestNewsAtom, TrendingNewsAtom };