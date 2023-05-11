import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import TickUp from "../../../../../public/assets/images/icons/tick-up.svg";
import TickDown from "../../../../../public/assets/images/icons/tick-down.svg";

const arr = [
    {
        CurrencyName: 'Bitcoin',
        StateImage: TickUp,
        Price: "$27,470.51 +3.93%",
    },
    {
        CurrencyName: 'Crypto.com',
        StateImage: TickDown,
        Price: "$0.07273288 -2.92%",
    },
    {
        CurrencyName: 'Ethereum',
        StateImage: TickUp,
        Price: "$1,818.10 +5.11%",
    },
    {
        CurrencyName: 'Binance Coin',
        StateImage: TickUp,
        Price: "$343.73 +2.65%",
    },
    {
        CurrencyName: 'XRP',
        StateImage: TickUp,
        Price: "$0.38195132 +2.81%",
    },
    {
        CurrencyName: 'Aptos',
        StateImage: TickUp,
        Price: "$13.91 +5.97%",
    },
]
const PriceTicker = () => {
    return (
        <>
            <Box component="div" className='price-ticker'>
                <Box component="div" className='price-ticker-inner'>
                    {arr.map((v, i) => {
                        return (
                            <Box component="span" className='price-ticker-itm'>
                                <Typography component="small" variant="small">
                                    {v.CurrencyName}
                                </Typography>
                                <Box component="span" className='price-ticker-tick'>
                                    <img src={v.StateImage} alt='tick up' />
                                </Box>
                                <Typography component="small" variant="small" className='price-ticker-ammount amount-up'>
                                    {v.Price}
                                </Typography>
                            </Box>
                        )
                    })}
                </Box>
            </Box>
        </>
    )
}

export default PriceTicker
