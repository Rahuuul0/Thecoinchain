import { atom } from "recoil";

const newsListAtom = atom({
  key: "newsList",
  default: [],
});

export { newsListAtom };