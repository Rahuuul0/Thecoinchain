import { atom } from 'recoil';

const FooterAddAtom = atom({
    key: 'addTempAtomFooter',
    default: {}
});

const TermsListAtom = atom({
    key: 'TermsList',
    default: []
});

const DisclaimersListAtom = atom({
    key: 'DisclaimersList',
    default: []
});

export { FooterAddAtom, TermsListAtom, DisclaimersListAtom };