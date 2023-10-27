import { atom } from 'recoil';

const bannerListAtom = atom({
    key: 'bannerList',
    default: []
});

const homeBannerAtom = atom({
    key: 'marketBanner',
    default: []
});

export { bannerListAtom, homeBannerAtom };