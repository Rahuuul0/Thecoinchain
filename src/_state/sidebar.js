import { atom } from 'recoil';

const sidebarAtom = atom({
    key: 'sidebarAtom',
    default: "profile"
});

export { sidebarAtom };