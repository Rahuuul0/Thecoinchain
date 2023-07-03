import { atom } from "recoil";

const selectAtom = atom({
  key: "selectAtom",
  default: true,
});

const notificationAtom = atom({
  key: "notificationAtom",
  default: [],
});
const notificationCountAtom = atom({
  key: "notificationCountAtom",
  default: 0,
});
const notificationViewAtom = atom({
  key: "notificationViewAtom",
  default: [],
});

export { notificationAtom, notificationCountAtom, notificationViewAtom };
