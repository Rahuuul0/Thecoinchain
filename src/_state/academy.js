import { atom } from "recoil";

const academyAtom = atom({
  key: "academy",
  default: [],
});

const masterAtom = atom({
    key: "master",
    default: [],
  });
  

export { academyAtom, masterAtom };