import { atom } from 'recoil';

const historyAtom = atom({
    key: 'historyAtom',
    default: {}
});


export { historyAtom };