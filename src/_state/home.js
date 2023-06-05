import { atom } from 'recoil';

const homeAtom = atom({
    key: 'homeAtom',
    default: []
});


const userErrorAtom = atom({
    key: 'userError',
    default: false,   
});

export { homeAtom };