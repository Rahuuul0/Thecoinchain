import { atom } from 'recoil';

const usersAtom = atom({
    key: 'users',
    default: []
});

const userAtom = atom({
    key: 'user',
    default: {},   
});

const userErrorAtom = atom({
    key: 'userError',
    default: false,   
});

const switchAtom = atom({
    key: 'switchAtom',
    default: true,   
});

export { 
    usersAtom,
    userAtom,
    userErrorAtom,
    switchAtom
};