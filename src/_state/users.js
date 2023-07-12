import { atom } from "recoil";
const usersAtom = atom({
  key: "users",
  default: [],
});

const userAtom = atom({
  key: "user",
  default: { isSubscribed: true },
});

const userErrorAtom = atom({
  key: "userError",
  default: false,
});

const switchAtom = atom({
  key: "switchAtom",
  default: true,
});

const forecastSubAtom = atom({
  key: "forecast",
  default: { status: "expired" },
});

const homePageAtom = atom({
  key: "homePageAtom",
  default: [],
});

const loginDataAtom = atom({
  key: "loginDataAtom",
  default: {'email':'','phone':'','pass':'','otp':''},
});
export {
  usersAtom,
  userAtom,
  userErrorAtom,
  switchAtom,
  homePageAtom,
  forecastSubAtom,
  loginDataAtom
};
