import { atom } from "recoil";

const tutorialCategoryAtom = atom({
  key: "tutorialCategory",
  default: [],
});

const blogCategoryAtom = atom({
  key: "blogCategory",
  default: [],
});

export { tutorialCategoryAtom, blogCategoryAtom };
