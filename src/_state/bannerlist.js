import { atom } from 'recoil';

const bannerListAtom = atom({
    key: 'bannerList',
    default: {}
});

export { bannerListAtom };