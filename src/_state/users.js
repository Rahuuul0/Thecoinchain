import { atom } from "jotai";
const usersAtom = atom([]);

const userAtom = atom({ isSubscribed: true });

const userErrorAtom = atom(false);

const switchAtom = atom(true);

const forecastSubAtom = atom({ status: "expired" });

const homePageAtom = atom([]);

const loginDataAtom = atom({'email':'','phone':'','pass':'','otp':''});
export {
  usersAtom,
  userAtom,
  userErrorAtom,
  switchAtom,
  homePageAtom,
  forecastSubAtom,
  loginDataAtom
};
