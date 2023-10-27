import { atom } from 'recoil';

const bannerListAtom = atom({
    key: 'bannerList',
    default: []
});

const homeBannerAtom = atom({
    key: 'marketBanner',
    default: []
});

const MarketBannerAtom = atom({
    key: 'MarketBanner',
    default: []
});

export { bannerListAtom, homeBannerAtom, MarketBannerAtom };