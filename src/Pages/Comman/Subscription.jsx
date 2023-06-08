import React, { useState ,useEffect} from 'react'
import { ThemeProvider } from '@mui/material/styles';
import { theme } from "../../_common/app.constants"
import { Box, Container, Typography, Button, Modal, Link} from '@mui/material'
import CryptoTrader01 from '../../../public/assets/images/crypto-trader-01.svg'
import CryptoTrader02 from '../../../public/assets/images/crypto-trader-02.svg'
import CryptoTrader03 from '../../../public/assets/images/crypto-trader-03.svg'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import CloseIcon from '@mui/icons-material/Close';
import {subscriptionActions} from '../../_actions/subscription.actions';
import { useNavigate } from 'react-router-dom';
import CheckoutPayment from './Components/CheckoutPayment';

const Subscription = () => {
    const navigate = useNavigate();
    
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);    
   
    const toggleAcordion = () => {
      setExpand((prev) => true);
      setExpandFirst((prev) => false);
    };
    const confirmAcordion = () => {
      setExpand((prev) => false);
      setconfirm((prev) => true);
      };
        
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
                                        <Button >1</Button>
                                        </Box>
                                        <Typography component="p" variant='body2'>
                                            Select Package
                                        </Typography>
                                    </Box>
                                    <Box className='subscription-step current-step'>
                                        <Box component="span" className='number-circle'>
                                        <Button onClick={() =>{toggleAcordion()}}>2</Button>
                                        </Box>
                                        <Typography component="p" variant='body2'>
                                            Payment info
                                        </Typography>
                                    </Box>
                                    <Box className='subscription-step'>
                                        <Box component="span" className='number-circle'>
                                        <Button onClick={confirmAcordion}>3</Button>
                                        </Box>
                                        <Typography component="p" variant='body2'>
                                            Confirm order
                                        </Typography>
                                    </Box>
                                </Box>
                                <Box className='subscription-steps-col-details'>                                                                    
                                    <CheckoutPayment />                                       
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
                            <Button variant='contained' className='btn btn-primary' sx={{ mx: 'auto' }} onClick={() => { navigate("./contact") }}>Contact Us</Button>
                        </Container>
                    </Box>
                </Box >
            </ThemeProvider >
            {/* Modal */}
            < Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
            >
                <Box className="modal-dialog modal-subscribed">
                    <Button onClick={handleClose} variant='outlined' className='btn btn-outlined-secondary btn-round btn-close'><CloseIcon /></Button>

                    <Box className="modal-modal-description" sx={{ mt: 2, p: 2 }}>
                        <Typography className="modal-modal-title" variant="h2" component="h2">
                            Yay! 🎉
                        </Typography>
                        <Typography className="crypto-fullname" variant="body1" component="p">
                            You successfully subscribed.<br />
                            Crypto prediction made easy - our algorithms do the work for you!
                        </Typography>

                    </Box>
                    <Box className="modal-subscribed-cta">
                        <Button
                            fullWidth
                            variant="outlined"
                            className='btn btn-outlined-secondary'
                            onClick={()=>{
                                navigate("/")
                            }}
                        >
                            Home
                        </Button>
                        <Button
                            fullWidth
                            variant="contained"
                            className='btn btn-primary'
                            onClick={()=>{
                                navigate("/prediction-dashboard")
                            }}
                        >
                            Dashboard
                        </Button>
                    </Box>
                </Box>
            </Modal >
        </>
    )
}

export default Subscription
