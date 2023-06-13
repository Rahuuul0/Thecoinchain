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

export { notificationAtom };