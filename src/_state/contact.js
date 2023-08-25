import { atom } from 'recoil';

const contact_AddAtom = atom({
    key: 'addTempAtom',
    default: {}
});

const contactListAtom = atom({
    key: "contactListAtom",
    default: [],
  });

  const contactBlogListAtom = atom({
    key: "contactBlogListAtom",
    default: [],
  });
export { contact_AddAtom, contactListAtom, contactBlogListAtom };