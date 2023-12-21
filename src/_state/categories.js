import { atom } from "recoil";

const tutorialCategoryAtom = atom({
  key: "tutorialCategory",
  default: [],
});

const blogCategoryAtom = atom({
  key: "blogCategory",
  default: [],
});

const breadCrumbAtom = atom({
  key: "breadCrumb",
  default: "",
});

export { tutorialCategoryAtom, blogCategoryAtom, breadCrumbAtom };
