import { atom } from "recoil";

const tutorialAtom = atom({
  key: "tutorial",
  default: [],
});

export { tutorialAtom };
