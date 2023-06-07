import { atom } from 'recoil';


const selectAtom =atom({
    key: 'selectAtom',
    default: true,  
})

const notificationAtom = atom({
    key: 'notificationAtom',
    default: [
                    {
                        'id':1,
                        'tittle': 'BTC Price Alert',
                        'name':'BTC',
                        'create':'2023-05-30T05:13:00.000Z',
                        'category':'Crypto Prediction',
                                         
                    },
                    {
                        'id':2,
                        'tittle': 'ETC Price Alert',
                        'name':'ETC',
                        'create': '2023-05-30T05:13:00.000Z',
                        'category':'Community'
                                         
                    },
                    {
                        'id':3,
                        'tittle': 'USDT Price Alert',
                        'name':'USDT',
                        'create':'2023-05-30T05:13:00.000Z',
                         'category':'Academy'
                                    
                    },
                    {
                        'id':4,
                        'tittle': 'USD Price Alert',
                        'name':'USD',
                        'create':'2023-05-30T05:13:00.000Z',
                         'category':'News',
                                  
                    },
                    {
                        'id':5,
                        'tittle': 'XRP Price Alert',
                        'name':'XRP',
                        'create': '2023-05-30T05:13:00.000Z',
                        
                    },
                    {
                        'id':6,
                        'tittle': 'BTC Price Alert',
                        'name':'BTC',
                        'create':'2023-05-30T05:13:00.000Z',
                        'category':'Crypto Prediction',
                                         
                    },
                    {
                        'id':7,
                        'tittle': 'BTC Price Alert',
                        'name':'BTC',
                        'create':'2023-05-30T05:13:00.000Z',
                        'category':'Crypto Prediction',
                                         
                    },
                    {
                        'id':8,
                        'tittle': 'ETC Price Alert',
                        'name':'ETC',
                        'create': '2023-05-30T05:13:00.000Z',
                        'category':'Community'
                                         
                    },
                    {
                        'id':9,
                        'tittle': 'ETC Price Alert',
                        'name':'ETC',
                        'create': '2023-05-30T05:13:00.000Z',
                        'category':'Community'
                                         
                    },
                  
                        
            ]
        
});

export { notificationAtom };