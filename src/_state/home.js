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


const cryptoTraderAtom = atom({
    key: 'cryptoTraderAtom',
    default: []
});

const cryptoNewsAtom = atom({
    key: 'cryptoNewsAtom',
    default: []
});

const switchDarkModeAtom = atom({
    key: "darkMode",
    default: false,
  });

export { homeAtom, marketTrendAtom, cryptoTraderAtom, cryptoNewsAtom, switchDarkModeAtom };