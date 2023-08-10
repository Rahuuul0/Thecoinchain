import { atom } from 'recoil';

const contact_AddAtom = atom({
    key: 'addTempAtom',
    default: {}
});

const contactListAtom = atom({
    key: "contactListAtom",
    default: [],
  });
export { contact_AddAtom, contactListAtom };