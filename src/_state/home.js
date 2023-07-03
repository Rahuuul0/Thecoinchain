import { atom } from 'recoil';

const homeAtom = atom({
    key: 'homeAtom',
    default: []
});


const userErrorAtom = atom({
    key: 'userErrorHome',
    default: false,   
});

export { homeAtom };