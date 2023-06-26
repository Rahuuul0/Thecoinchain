import { atom } from "recoil";

const tutorialAtom = atom({
  key: "tutorialAtom",
  default: [],
});

const blogAtom = atom({
  key: "blogs",
  default: [],
});

export { tutorialAtom, blogAtom };
