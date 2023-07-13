import { atom } from 'recoil';

const homeAtom = atom({
    key: 'homeAtom',
    default: []
});


const userErrorAtom = atom({
    key: 'userErrorHome',
    default: false,   
});

const marketTrendAtom = atom({
    key: 'marketTrendAtom',
    default: {}
});


export { homeAtom, marketTrendAtom };