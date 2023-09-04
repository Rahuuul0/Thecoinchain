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

const marketBlogListAtom = atom({
  key: "marketBlogListAtom",
  default: [],
});

const blogimgAtom = atom({
  key: "blogimgAtom",
  default: false,
});

const blogVideoAtom = atom({
  key: "blogVideoAtom",
  default: false,
});

export { tutorialAtom, blogAtom, blogListAtom, blogimgAtom, marketBlogListAtom, blogVideoAtom };
