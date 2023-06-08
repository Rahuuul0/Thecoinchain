import { atom } from "recoil";

const faqAtom = atom({
  key: "faq",
  default: [],
});

export { faqAtom };