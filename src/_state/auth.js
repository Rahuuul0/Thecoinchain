import { atom } from 'jotai';

// Hydrated from localStorage on the client by <StoreHydrator /> so that
// server and first client render agree.
const authAtom = atom(null);

// True once <StoreHydrator /> has read localStorage. Route guards wait on
// this so a logged-in user isn't bounced to /login on first render.
const storeHydratedAtom = atom(false);

export { authAtom, storeHydratedAtom };
