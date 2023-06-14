import { atom } from 'recoil';

const setUnsubscribeAtom = atom({
    key: 'Unsubscribe',
    default: {}
});

export { setUnsubscribeAtom };