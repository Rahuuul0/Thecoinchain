import { Container, Typography, Box, Breadcrumbs, } from '@mui/material';
import React from 'react';
import { useEffect } from 'react';
import { Link } from "react-router-dom";
import { EmailOutlined, NavigateNext, VisibilityOutlined } from '@mui/icons-material/';

const Disclaimer = () => {

    const breadcrumbs = [
        <Link to="/" underline="hover" key="1" color="inherit" >
            Home
        </Link>,
        <Typography key="3" color="text.primary" sx={{ m: "0!important" }}>
            Disclaimer
        </Typography>,
    ];
    useEffect(() => { window.scrollTo({ top: 1, left: 1, behavior: "smooth" }) });
    return (
        <>
            <Box component="main" className='extra-wrapper subscription-wrapper bredcrum-div' sx={{ mt: 8, mb: { xs: 0, sm: 8, md: 8, lg: 8 } }}>
                <Container maxWidth="lg">
                    <Box className='subscription-wrapper-head'>
                        <Typography component="h2" variant='h2'>
                            Disclaimer
                        </Typography>

                        <Box className='' sx={{ color: '#777E90', fontWeight: '500', }}>
                            <Box >
                                <Breadcrumbs
                                    separator={<NavigateNext fontSize="small" />}
                                    aria-label="breadcrumb"
                                    className='center-breadcrum'
                                >
                                    {breadcrumbs}
                                </Breadcrumbs>

                            </Box>
                        </Box>
                    </Box>
                    <Typography variant='body2' component="p">
                        Coinguru.org makes no warranties whatsoever regarding reliability, accuracy or completeness of any text or graphical information available on the website. Any reference you place on this information remains strictly at your own risk. Price Predictions, Forecasts, Texts provided byCoinguru.org is for information purposes only.
                    </Typography>
                    <Typography variant='body2' component="p">
                        Coinguru.org bears no liability for any loss or damage arising from loss of data or profits in direct or indirect connection with the use of this website.
                    </Typography>
                    <Typography variant='body2' component="p">
                        Coinguru.org declines responsibility for the content of the site visitors’ reviews, commentaries, questions and other personal notes of any kind. Site visitors are made responsible for any content they publish on Coinguru.org.
                    </Typography>
                    <Typography variant='body2' component="p">
                        Coinguru.org provides an opportunity of linking to other websites which are not in any way related to Coinguru.org and are not subject to control by Coinguru.org. We bear no responsibility for nature and content of these sites. Provision of any third party links on Coinguru.org does not imply concurrence with the third party ideas, methods, strategies and all the other content.
                    </Typography>
                    <Typography variant='body2' component="p">
                        Coinguru.org undertakes every effort to keep the site running smoothly and with no interruptions. However, Coinguru.org bears no responsibility for the website being temporarily unavailable due to outer technical issues.
                    </Typography>
                    <Typography variant='body2' component="p">
                        You agree not to reproduce, retransmit, disseminate, sell, distribute, publish, broadcast, circulate or commercially exploit the information available on Coinguru.org in any manner without the express written consent of Coinguru.org, nor to use the information available on the site for any unlawful purpose.
                    </Typography>
                    <Typography variant='body2' component="p">
                        Full access to Predictions/Forecasts for all cryptocurrencies is offered through a paid subscription. By subscribing with the 10$ monthly charge, the user receives full access to the Predictions/Forecasts.
                    </Typography>
                    <Typography variant='body2' component="p">
                        By subscribing to Crypto Predictions + Trend-visor subscription with a 50$ monthly charge, the user receives full access to 100 Cryptocurrencies' Price Predictions, and 10 daily trading signals for 10 crypto-currency pairs of choice.
                    </Typography>
                    <Typography variant='body2' component="p">
                        By subscribing to the ICO Rating subscription with a 100$ monthly charge, the user receives participation in the ICO Rating for one project, and push notifications to inform our site visitors about the new ICO.
                    </Typography>
                    <Typography variant='body2' component="p">
                        By subscribing to the Crypto-Rating API with a 590$ monthly charge, the user receives unlimited access to high accuracy, professional cryptocurrency API, including cryptocurrency price predictions, and trading signals.
                    </Typography>
                    <Typography variant='body2' component="p">
                        The subscription can be canceled at any moment. The access to the paid content is terminated by the end of the paid subscription period. To regain full access to the content, a new subscription is required.
                    </Typography>
                    <Typography variant='body2' component="p">
                        Each account on our website can have only one active subscription at a time. Buying a new subscription while having an active one stops the active subscription. Each subscription requires its own user account.
                    </Typography>
                    <Typography variant='body2' component="p">
                        Information that is contained in the Predictions/Forecasts only reflects the point of view of the website, which is formed based on use of unique technologies with AI, developed by our team of professionals. The Predictions/Forecasts are not a call to action and are not guaranteed to come true, it is the website's take on the market. Coinguru.org does not bear any responsibility for how the information on the website is used or for the actions of the users. The payment is charged for access to the information. By giving access to the information, we do not promise and do not hold responsibility for the satisfaction/dissatisfaction with the information of the user. All payments are non-refundable. We only answer questions concerning website activity through the contact us form.
                    </Typography>
                    <Typography variant='body2' component="p">
                        You agree not to reproduce, retransmit, disseminate, sell, distribute, publish, broadcast, circulate or commercially exploit the information available on Coinguru.org in any manner without the express written consent of Coinguru.org, nor to use the information available on the site for any unlawful purpose.
                    </Typography>

                </Container>
            </Box >
        </>
    )
}

export default Disclaimer
