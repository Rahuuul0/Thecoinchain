import { atom } from 'jotai';

const homeAtom = atom([]);


const userErrorAtom = atom(false);

const marketTrendAtom = atom({});


const cryptoTraderAtom = atom([]);

const cryptoNewsAtom = atom([]);

// Hydrated from localStorage on the client by <StoreHydrator />.
const switchDarkModeAtom = atom(false);

const WorkListAtom = atom([]);

const headingListAtom = atom([]);


export { homeAtom, marketTrendAtom, cryptoTraderAtom, cryptoNewsAtom, switchDarkModeAtom, WorkListAtom, headingListAtom };