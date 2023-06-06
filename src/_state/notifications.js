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
                        'crypto_Prediction':
                                            [
                                                {
                                                    'id':1,
                                                    'tittle': 'crypto_Prediction Alert',
                                                    'name':'BTC',
                                                    'create':'2023-05-30T05:13:00.000Z',
                                                },
                                                {
                                                    'id':2,
                                                    'tittle': 'crypto_Prediction Alert',
                                                    'name':'ETC',
                                                    'create': '2023-05-30T05:13:00.000Z',
                                                },
                                                {
                                                    'id':3,
                                                    'tittle': 'crypto_Prediction Alert',
                                                    'name':'USDT',
                                                    'create':'2023-05-30T05:13:00.000Z',
                                                },

                                            ],

                    },
                    {
                        'id':2,
                        'tittle': 'ETC Price Alert',
                        'name':'ETC',
                        'create': '2023-05-30T05:13:00.000Z',
                        'community':
                                            [
                                                {
                                                    'id':1,
                                                    'tittle': 'community Price Alert',
                                                    'name':'BTC',
                                                    'create':'2023-05-30T05:13:00.000Z',
                                                },
                                                {
                                                    'id':2,
                                                    'tittle': 'community Price Alert',
                                                    'name':'ETC',
                                                    'create': '2023-05-30T05:13:00.000Z',
                                                },
                                                {
                                                    'id':3,
                                                    'tittle': 'community Price Alert',
                                                    'name':'USDT',
                                                    'create':'2023-05-30T05:13:00.000Z',
                                                },

                                            ],
                    },
                    {
                        'id':3,
                        'tittle': 'USDT Price Alert',
                        'name':'USDT',
                        'create':'2023-05-30T05:13:00.000Z',
                        'Academy':
                                    [
                                        {
                                            'id':1,
                                            'tittle': 'Academy Price Alert',
                                            'name':'BTC',
                                            'create':'2023-05-30T05:13:00.000Z',
                                        },
                                        {
                                            'id':2,
                                            'tittle': 'Academy Price Alert',
                                            'name':'ETC',
                                            'create': '2023-05-30T05:13:00.000Z',
                                        },
                                        {
                                            'id':3,
                                            'tittle': 'Academy Price Alert',
                                            'name':'USDT',
                                            'create':'2023-05-30T05:13:00.000Z',
                                        },

                                    ],
                    },
                    {
                        'id':4,
                        'tittle': 'USD Price Alert',
                        'name':'USD',
                        'create':'2023-05-30T05:13:00.000Z',
                        'News':
                                    [
                                        {
                                            'id':1,
                                            'tittle': 'News Price Alert',
                                            'name':'BTC',
                                            'create':'2023-05-30T05:13:00.000Z',
                                        },
                                        {
                                            'id':2,
                                            'tittle': 'News Price Alert',
                                            'name':'ETC',
                                            'create': '2023-05-30T05:13:00.000Z',
                                        },
                                        {
                                            'id':3,
                                            'tittle': 'News Price Alert',
                                            'name':'USDT',
                                            'create':'2023-05-30T05:13:00.000Z',
                                        },

                                    ],
                    },
                    {
                        'id':5,
                        'tittle': 'XRP Price Alert',
                        'name':'XRP',
                        'create': '2023-05-30T05:13:00.000Z',
                      
                    },
                  
                        
            ]
        
});

export { notificationAtom };