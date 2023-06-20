import React, { useState } from 'react'
import { ThemeProvider } from '@mui/material/styles';
import { theme } from "../../_common/app.constants"
import { Box, Container, Typography, Button, Link } from '@mui/material'
import CryptoTrader01 from '../../../public/assets/images/crypto-trader-01.svg'
import CryptoTrader02 from '../../../public/assets/images/crypto-trader-02.svg'
import CryptoTrader03 from '../../../public/assets/images/crypto-trader-03.svg'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useNavigate } from 'react-router-dom';
import CheckoutPayment from './Components/CheckoutPayment';

const Subscription = () => {
    const navigate = useNavigate();
    return (
        <>
            <ThemeProvider theme={theme}>
                <Box component="main" className='subscription-wrapper' sx={{ mt: 8 }}>
                    <Container maxWidth="lg">
                        <Box className='subscription-wrapper-head back-arrow'>
                            <Typography component="h2" variant='h2'>
                                Subscriptions
                            </Typography>

                            <Typography component="small" variant='body2' className='' sx={{ color: '#777E90', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                How to buy crypto on Bitcloud <Link sx={{ color: '#353945', display: 'flex', alignItems: 'center' }}>Learn now <KeyboardArrowRightIcon sx={{ width: '16px' }} /></Link>
                            </Typography>
                        </Box>
                    </Container>

                    <Box className='subscription-steps'>
                        <Container maxWidth="lg">
                            <CheckoutPayment />
                        </Container>
                    </Box>
                    <Box className='become-a-crypto-trader'>
                        <Container maxWidth="lg">
                            <Box className='crypto-trader-head'>
                                <Typography component="h2" variant='h2'>
                                    Become a crypto trader in seconds
                                </Typography>
                                <Typography component="p" variant='body1' sx={{ color: '#777E90' }}>
                                    We've got everything you need to start trading.
                                </Typography>
                            </Box>
                            <Box className='become-a-crypto-trader-cards'>
                                <Box className='become-a-crypto-trader-card'>
                                    <Box className='crypto-trader-img'>
                                        <img src={CryptoTrader01} alt='Crypto Trader' />
                                    </Box>
                                    <Typography component="p" variant='body1' sx={{ fontWeight: '500' }}>
                                        Buy & Sell Crypto
                                    </Typography>
                                    <Typography component="p" variant='body2' className='body-caption' sx={{ color: '#777E90', my: 2 }}>
                                        We realize ideas from simple to complex, everything becomes easy to use and reach the most potential customers.
                                    </Typography>

                                    <Button variant='outlined' className='btn btn-outlined-secondary'>Buy crypto</Button>
                                </Box>
                                <Box className='become-a-crypto-trader-card'>
                                    <Box className='crypto-trader-img'>
                                        <img src={CryptoTrader02} alt='Crypto Trader' />
                                    </Box>
                                    <Typography component="p" variant='body1' sx={{ fontWeight: '500' }}>
                                        Trade Assets
                                    </Typography>
                                    <Typography component="p" variant='body2' className='body-caption' sx={{ color: '#777E90', my: 2 }}>
                                        We realize ideas from simple to complex, everything becomes easy to use and reach the most potential customers.
                                    </Typography>

                                    <Button variant='outlined' className='btn btn-outlined-secondary'>Trade now</Button>
                                </Box>
                                <Box className='become-a-crypto-trader-card'>
                                    <Box className='crypto-trader-img'>
                                        <img src={CryptoTrader03} alt='Crypto Trader' />
                                    </Box>
                                    <Typography component="p" variant='body1' sx={{ fontWeight: '500' }}>
                                        Earn Rewards for Trading
                                    </Typography>
                                    <Typography component="p" variant='body2' className='body-caption' sx={{ color: '#777E90', my: 2 }}>
                                        We realize ideas from simple to complex, everything becomes easy to use and reach the most potential customers.
                                    </Typography>

                                    <Button variant='outlined' className='btn btn-outlined-secondary'>Learn now</Button>
                                </Box>
                            </Box>
                            <Button variant='contained' className='btn btn-primary' sx={{ mx: 'auto' }} onClick={() => { navigate("/contact") }}>Contact Us</Button>
                        </Container>
                    </Box>
                </Box >
            </ThemeProvider >
        </>
    )
}

export default Subscription
