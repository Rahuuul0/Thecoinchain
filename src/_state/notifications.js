import { atom } from "jotai";

const notificationAtom = atom([]);
const notificationCountAtom = atom(0);
const notificationViewAtom = atom([]);

export { notificationAtom, notificationCountAtom, notificationViewAtom };
