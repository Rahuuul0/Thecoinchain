import { atom } from 'recoil';

const FooterAddAtom = atom({
    key: 'addTempAtomFooter',
    default: {}
});


const TermsListAtom = atom({
    key: 'TermsList',
    default: []
});

export { FooterAddAtom, TermsListAtom };