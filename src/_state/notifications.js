import { atom } from 'recoil';


const selectAtom =atom({
    key: 'selectAtom',
    default: true,  
})

const notificationAtom = atom({
    key: 'notificationAtom',
    default: [
                 
                  
                        
            ]
        
});
const notificationCountAtom = atom({
    key: 'notificationCountAtom',
    default: 0
    
});

export { notificationAtom, notificationCountAtom };