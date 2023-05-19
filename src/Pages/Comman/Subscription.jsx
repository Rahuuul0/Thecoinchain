import React from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { theme } from "../../_common/app.constants"
import { Box, Container, Grid, Typography, Button, Modal, Link } from '@mui/material'
import CryptoTrader01 from '../../../public/assets/images/crypto-trader-01.svg'
import CryptoTrader02 from '../../../public/assets/images/crypto-trader-02.svg'
import CryptoTrader03 from '../../../public/assets/images/crypto-trader-03.svg'
import BtcImg from '../../../public/assets/images/icons/btc-ic.svg'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

const plans = [
    {
        title: '7 days Plan',
        price: '$15 ',
        days: '7 days',
        extra: 'Get all crypto price predictions & Trade with Machine Learning',
    },
    {
        title: '1 month Plan',
        price: '$40 ',
        days: '1 month',
        extra: 'Get all crypto price predictions & Trade with Machine Learning',
    },
    {
        title: '1 year Plan',
        price: '$250 ',
        days: '1 year',
        extra: 'Get all crypto price predictions & Trade with Machine Learning',
    }
]

const Subscription = () => {
    return (
        <>
            <ThemeProvider theme={theme}>
                <Box component="main" className='subscription-wrapper' sx={{ mt: 8 }}>
                    <Container maxWidth="lg">
                        <Box className='subscription-wrapper-head'>
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
                            <Box className='subscription-steps-inner'>
                                <Box className='subscription-steps-col'>
                                    <Box className='subscription-step completed-step'>
                                        <Box component="span" className='number-circle'>
                                            1
                                        </Box>
                                        <Typography component="p" variant='body2'>
                                            Select Package
                                        </Typography>
                                    </Box>
                                    <Box className='subscription-step current-step'>
                                        <Box component="span" className='number-circle'>
                                            2
                                        </Box>
                                        <Typography component="p" variant='body2'>
                                            Payment info
                                        </Typography>
                                    </Box>
                                    <Box className='subscription-step'>
                                        <Box component="span" className='number-circle'>
                                            3
                                        </Box>
                                        <Typography component="p" variant='body2'>
                                            Confirm order
                                        </Typography>
                                    </Box>
                                </Box>
                                <Box className='subscription-steps-col-details'>
                                    <Box className="step-one">
                                        <Box className="card-inner-head">
                                            <Typography component="h5" variant='body1' className='large-caption'>
                                                Select Package
                                            </Typography>
                                        </Box>
                                        <Box className='subscription-plan'>
                                            {plans.map((plan) => (
                                                <Box className="subscription-plan-card">
                                                    <Typography component="h4" variant='h4' className='plan-title'>
                                                        {plan.title}
                                                    </Typography>
                                                    <Box className="subscription-plan-body">
                                                        <Typography component="h4" variant='h4' className='plan-price'>
                                                            {plan.price} <span className='plan-days'>/ {plan.days}</span>
                                                        </Typography>

                                                        <Typography component="p" variant='body2' sx={{ fontSize: '14px' }}>
                                                            {plan.extra}
                                                        </Typography>
                                                    </Box>
                                                    <Box className="subscription-plan-cta">
                                                        <Button variant='contained' className='btn btn-primary' sx={{ mx: 'auto' }}>Continue</Button>
                                                    </Box>
                                                </Box>
                                            ))}
                                        </Box>
                                        <Typography component="p" variant='body2' className='small-caption' sx={{ color: '#6C757D' }}>
                                            The subscription can be canceled at any moment through the payment system or by using the "unsubscribe" button in the Subscription section. In the case of technical issues, you can submit your inquiries
                                        </Typography>
                                        <Typography component="p" variant='body2' className='small-caption' sx={{ color: '#6C757D' }}>
                                            using the contact us form. By subscribing you accept our Disclaimer.
                                        </Typography>
                                        <Typography component="p" variant='body2' className='small-caption' sx={{ color: '#6C757D', mt: '32px' }}>
                                            Each account on our website can have only one active subscription at a time. Buying a new subscription while having an active one stops the active subscription. Each subscription requires its own user.
                                        </Typography>
                                    </Box>
                                    <Box className="step-two">
                                        <Typography component="h5" variant='body1' className='large-caption'>
                                            Select Package
                                        </Typography>
                                        <Box className='subscription-plan'>
                                            {plans.map((plan) => (
                                                <Box className="subscription-plan-card">
                                                    <Typography component="h4" variant='h4' className='plan-title'>
                                                        {plan.title}
                                                    </Typography>
                                                    <Box className="subscription-plan-body">
                                                        <Typography component="h4" variant='h4' className='plan-price'>
                                                            {plan.price} <span className='plan-days'>/ {plan.days}</span>
                                                        </Typography>

                                                        <Typography component="p" variant='body2' sx={{ fontSize: '14px' }}>
                                                            {plan.extra}
                                                        </Typography>
                                                    </Box>
                                                    <Box className="subscription-plan-cta">
                                                        <Button variant='contained' className='btn btn-primary' sx={{ mx: 'auto' }}>Continue</Button>
                                                    </Box>
                                                </Box>
                                            ))}
                                        </Box>
                                        <Typography component="p" variant='body2' className='small-caption' sx={{ color: '#6C757D' }}>
                                            The subscription can be canceled at any moment through the payment system or by using the "unsubscribe" button in the Subscription section. In the case of technical issues, you can submit your inquiries
                                        </Typography>
                                        <Typography component="p" variant='body2' className='small-caption' sx={{ color: '#6C757D' }}>
                                            using the contact us form. By subscribing you accept our Disclaimer.
                                        </Typography>
                                        <Typography component="p" variant='body2' className='small-caption' sx={{ color: '#6C757D', mt: '32px' }}>
                                            Each account on our website can have only one active subscription at a time. Buying a new subscription while having an active one stops the active subscription. Each subscription requires its own user.
                                        </Typography>
                                    </Box>
                                    <Box className="step-three">
                                        <Box className="card-inner-head">
                                            <Typography component="h5" variant='body1' className='large-caption'>
                                                <KeyboardBackspaceIcon /> Payment info
                                            </Typography>
                                            <Typography component="h5" variant='body1' className='large-caption invest-smarter'>
                                                Invest smarter, not harder. <img src={BtcImg} alt='BTC' />
                                            </Typography>

                                        </Box>
                                        <Box className='payment-info'>
                                            <Box className='amount-for'>
                                                <Box className='payment-amount'>
                                                    amount
                                                </Box>
                                                <Box className='payment-for'>
                                                    for
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
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
                                    <Typography component="p" variant='body2' className='small-caption' sx={{ color: '#777E90', my: 2 }}>
                                        We realize ideas from simple to complex, everything becomes easy to use and reach the most potential customers.
                                    </Typography>

                                    <Button variant='outlined' className='btn- btn-outlined-secondary'>Buy crypto</Button>
                                </Box>
                                <Box className='become-a-crypto-trader-card'>
                                    <Box className='crypto-trader-img'>
                                        <img src={CryptoTrader02} alt='Crypto Trader' />
                                    </Box>
                                    <Typography component="p" variant='body1' sx={{ fontWeight: '500' }}>
                                        Trade Assets
                                    </Typography>
                                    <Typography component="p" variant='body2' className='small-caption' sx={{ color: '#777E90', my: 2 }}>
                                        We realize ideas from simple to complex, everything becomes easy to use and reach the most potential customers.
                                    </Typography>

                                    <Button variant='outlined' className='btn- btn-outlined-secondary'>Trade now</Button>
                                </Box>
                                <Box className='become-a-crypto-trader-card'>
                                    <Box className='crypto-trader-img'>
                                        <img src={CryptoTrader03} alt='Crypto Trader' />
                                    </Box>
                                    <Typography component="p" variant='body1' sx={{ fontWeight: '500' }}>
                                        Earn Rewards for Trading
                                    </Typography>
                                    <Typography component="p" variant='body2' className='small-caption' sx={{ color: '#777E90', my: 2 }}>
                                        We realize ideas from simple to complex, everything becomes easy to use and reach the most potential customers.
                                    </Typography>

                                    <Button variant='outlined' className='btn- btn-outlined-secondary'>Learn now</Button>
                                </Box>
                            </Box>
                            <Button variant='contained' className='btn btn-primary' sx={{ mx: 'auto' }}>Contact Us</Button>
                        </Container>
                    </Box>
                </Box >
            </ThemeProvider>
        </>
    )
}

export default Subscription
