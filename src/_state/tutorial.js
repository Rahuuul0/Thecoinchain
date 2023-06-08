import { atom } from "recoil";

const tutorialAtom = atom({
  key: "tutorial",
  default: [],
});

const blogAtom = atom({
  key: "blogs",
  default: [],
});

export { tutorialAtom, blogAtom };
