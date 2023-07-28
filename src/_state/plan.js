import { atom } from "recoil";

const planAtom = atom({
  key: "paymentAtom",
  default:{},
});

const subplanAtom = atom({
  key: "subplanAtom",
  default:false,
});


export { planAtom, subplanAtom };