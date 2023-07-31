import { atom } from "recoil";

const tutorialAtom = atom({
  key: "tutorialAtom",
  default: [],
});

const blogAtom = atom({
  key: "blogs",
  default: [],
});

const blogListAtom = atom({
  key: "blogListAtom",
  default: [],
});

const blogimgAtom = atom({
  key: "blogimgAtom",
  default: false,
});

export { tutorialAtom, blogAtom, blogListAtom, blogimgAtom };
