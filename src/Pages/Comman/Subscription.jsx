import React, { useEffect, useState } from 'react'
import { ThemeProvider } from '@mui/material/styles';
import { theme } from "../../_common/app.constants"
import { Box, Container, Typography, Button, Link, Grid } from '@mui/material'
import CryptoTrader01 from '../../../public/assets/images/crypto-trader-01.svg'
import CryptoTrader02 from '../../../public/assets/images/crypto-trader-02.svg'
import CryptoTrader03 from '../../../public/assets/images/crypto-trader-03.svg'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useNavigate, Link as Links } from 'react-router-dom';
import CheckoutPayment from './Components/CheckoutPayment';
import { authAtom, cryptoTraderAtom } from '../../_state';
import { useRecoilValue } from 'recoil';
import { useAlertActions } from '../../_actions/alert.actions';
import { useHomeActions } from '../../_actions/';
import { Labels, RoutesName } from '../../_common/app.constants';
import ReactHtmlParser from 'react-html-parser';

const Subscription = () => {
    const navigate = useNavigate();
    const alertActions = useAlertActions();
    const homeActions = useHomeActions();
    const auth = useRecoilValue(authAtom);
    const crypotTraderList = useRecoilValue(cryptoTraderAtom);
    useEffect(()=> {
        if(!auth){navigate(RoutesName.login)
        alertActions.error(Labels.Un_Subscribed_User);
    }
    })
    useEffect(() =>{
        homeActions.cryptoTrader()
    },[])

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
                                How to buy crypto on Coinguru <Links to={'/learn-cypto'} className='v-center' sx={{ color: '#353945', display: 'flex', alignItems: 'center' }}>Learn now <KeyboardArrowRightIcon sx={{ width: '16px' }} /></Links>
                            </Typography>
                        </Box>
                    </Container>

                    <Box className='subscription-steps'>
                        <Container maxWidth="lg">
                            <CheckoutPayment />
                        </Container>
                    </Box>
                 
                    <Box className="become-crypto">
                        <Container>
                        <Box>
                            <Typography
                            variant="h2"
                            component="h2"
                            className="secondary-font font-40"
                            textAlign="center"
                            sx={{ fontWeight: "700", maxWidth: "500px", margin: "auto" }}
                            >
                            Become a crypto trader in seconds
                            </Typography>
                            <Typography
                            className="secondary-color"
                            sx={{ textAlign: { xs: "left", md: "center" } }}
                            paddingTop={2}
                            >
                            We've got everything you need to start trading.
                            </Typography>
                            <Box paddingY={{ xs: 6, sm: 8 }}>
                            <Grid
                                container
                                rowSpacing={1}
                                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                            >
                                {crypotTraderList?.map((item) => {
                                let title = item.title;
                                let description = item.description;
                                let image = item.image ? `${process.env.REACT_APP_IMAGE_URL}/${item.image}` : item.image_link;
                                let link = item.link;
                                return (
                                    <Grid item xs={12} sm={4}>
                                    <Box textAlign="center" className="grid-cypto-trade">
                                        {image == null || image == '' ? " " : <img src={image} paddingBottom={3} alt='' />}
                                        <Typography variant="h6" paddingBottom={3}>
                                        {title}
                                        </Typography>
                                        <Typography
                                        className="body-caption secondary-color"
                                        paddingBottom={3}
                                        >
                                        {ReactHtmlParser(description)}
                                        </Typography>
                                        <Links to={link}>
                                        <Button
                                            className="btn btn-outlined-secondary"
                                            sx={{ margin: "0 auto" }}
                                        >
                                            Coming Soon
                                        </Button>
                                        </Links>
                                    </Box>
                                    </Grid>
                                )
                                })}
                            </Grid>
                            </Box>
                            <Button
                            sx={{ margin: "0 auto" }}
                            variant="contained"
                            className="btn btn-primary m-width-100"
                            onClick={() => {
                                navigate("/contact");
                            }}
                            >
                            Contact Us
                            </Button>
                        </Box>
                        </Container>
                    </Box>
                </Box>
            </ThemeProvider>            
        </>
    )
}

export default Subscription
