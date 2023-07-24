import React from 'react'
import { useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from "../../_common/app.constants"
import { Box, Container, Typography, Breadcrumbs } from '@mui/material';
import { NavigateNext } from '@mui/icons-material/';
import { Link } from "react-router-dom";
import BTCIc from "../../../public/assets/images/icons/btc-ic.svg";


const Community = () => {

    const breadcrumbs = [
        <Link to="/" underline="hover" key="1" color="inherit" >
            Home
        </Link>,
        <Typography key="3" color="text.primary">
            Community
        </Typography>,
    ];
    useEffect(() => { window.scrollTo({ top: 0, left: 0, behavior: "smooth" }) });
    return (
        <>
            <ThemeProvider theme={theme}>
                <Box component="main" className='community-wrapper subscription-wrapper bredcrum-div'>
                    <Container maxWidth="lg">
                        <Box className='subscription-wrapper-head'>
                            <Typography component="h2" variant='h2'>
                                Top Crypto Experts Reviews for May 2023
                            </Typography>

                            <Box className='' sx={{ color: '#777E90', fontWeight: '500', }}>
                                <Box  >
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
                        <Box className="community-wrapper-inner">
                            <Box className="community-card">
                                <Box className="community-card-head">
                                    <Box className="community-ic">
                                        <img src={BTCIc} alt='' />
                                    </Box>
                                    <Box className="community-details">
                                        <Box className="community-details-head">
                                            <Typography component='small' variant='body2' className='small-caption community-category'> Cryptocurrencies </Typography>
                                            <Typography component='small' variant='body2' className='small-caption'>  May 25, 2023 </Typography>
                                        </Box>
                                        <Typography component='h5' variant='h5'> sAMuil </Typography>
                                    </Box>
                                </Box>
                                <Typography component='p' variant='p'> Bitcoin reached the 20-day exponential moving average (EMA) of $27,278 on May 23, but the bulls could not pierce this resistance. The failure to do that attracted aggressive selling by the bears on May 24. The bears are trying to sustain the price below the immediate support at $26,631. If they are successful, the BTC/USDT pair could plummet to the vital support at $25,250. This level may again witness a tough battle between the bulls and the bears. If the bears come out on top, the selling could intensify, and the pair may collapse to the psychologically important level of $20,000. The 20-day EMA remains the key resistance for the bulls to conquer if they want to start a sustained recovery. A short-term trend change is likely to be signaled after the bulls kick the price above the resistance line. </Typography>
                            </Box>
                            <Box className="community-card">
                                <Box className="community-card-head">
                                    <Box className="community-ic">
                                        <img src={BTCIc} alt='' />
                                    </Box>
                                    <Box className="community-details">
                                        <Box className="community-details-head">
                                            <Typography component='small' variant='body2' className='small-caption community-category'> Cryptocurrencies </Typography>
                                            <Typography component='small' variant='body2' className='small-caption'>  May 25, 2023 </Typography>
                                        </Box>
                                        <Typography component='h5' variant='h5'> sAMuil </Typography>
                                    </Box>
                                </Box>
                                <Typography component='p' variant='p'> Bitcoin reached the 20-day exponential moving average (EMA) of $27,278 on May 23, but the bulls could not pierce this resistance. The failure to do that attracted aggressive selling by the bears on May 24. The bears are trying to sustain the price below the immediate support at $26,631. If they are successful, the BTC/USDT pair could plummet to the vital support at $25,250. This level may again witness a tough battle between the bulls and the bears. If the bears come out on top, the selling could intensify, and the pair may collapse to the psychologically important level of $20,000. The 20-day EMA remains the key resistance for the bulls to conquer if they want to start a sustained recovery. A short-term trend change is likely to be signaled after the bulls kick the price above the resistance line. </Typography>
                            </Box>
                            <Box className="community-card">
                                <Box className="community-card-head">
                                    <Box className="community-ic">
                                        <img src={BTCIc} alt='' />
                                    </Box>
                                    <Box className="community-details">
                                        <Box className="community-details-head">
                                            <Typography component='small' variant='body2' className='small-caption community-category'> ICOs </Typography>
                                            <Typography component='small' variant='body2' className='small-caption'>  May 25, 2023 </Typography>
                                        </Box>
                                        <Typography component='h5' variant='h5'> sAMuil </Typography>
                                    </Box>
                                </Box>
                                <Typography component='p' variant='p'> Bitcoin reached the 20-day exponential moving average (EMA) of $27,278 on May 23, but the bulls could not pierce this resistance. The failure to do that attracted aggressive selling by the bears on May 24. The bears are trying to sustain the price below the immediate support at $26,631. If they are successful, the BTC/USDT pair could plummet to the vital support at $25,250. This level may again witness a tough battle between the bulls and the bears. If the bears come out on top, the selling could intensify, and the pair may collapse to the psychologically important level of $20,000. The 20-day EMA remains the key resistance for the bulls to conquer if they want to start a sustained recovery. A short-term trend change is likely to be signaled after the bulls kick the price above the resistance line. </Typography>
                            </Box>
                            <Box className="community-card">
                                <Box className="community-card-head">
                                    <Box className="community-ic">
                                        <img src={BTCIc} alt='' />
                                    </Box>
                                    <Box className="community-details">
                                        <Box className="community-details-head">
                                            <Typography component='small' variant='body2' className='small-caption community-category'> Brokers </Typography>
                                            <Typography component='small' variant='body2' className='small-caption'>  May 25, 2023 </Typography>
                                        </Box>
                                        <Typography component='h5' variant='h5'> sAMuil </Typography>
                                    </Box>
                                </Box>
                                <Typography component='p' variant='p'> Bitcoin reached the 20-day exponential moving average (EMA) of $27,278 on May 23, but the bulls could not pierce this resistance. The failure to do that attracted aggressive selling by the bears on May 24. The bears are trying to sustain the price below the immediate support at $26,631. If they are successful, the BTC/USDT pair could plummet to the vital support at $25,250. This level may again witness a tough battle between the bulls and the bears. If the bears come out on top, the selling could intensify, and the pair may collapse to the psychologically important level of $20,000. The 20-day EMA remains the key resistance for the bulls to conquer if they want to start a sustained recovery. A short-term trend change is likely to be signaled after the bulls kick the price above the resistance line. </Typography>
                            </Box>
                            <Box className="community-card">
                                <Box className="community-card-head">
                                    <Box className="community-ic">
                                        <img src={BTCIc} alt='' />
                                    </Box>
                                    <Box className="community-details">
                                        <Box className="community-details-head">
                                            <Typography component='small' variant='body2' className='small-caption community-category'> Exchanges </Typography>
                                            <Typography component='small' variant='body2' className='small-caption'>  May 25, 2023 </Typography>
                                        </Box>
                                        <Typography component='h5' variant='h5'> sAMuil </Typography>
                                    </Box>
                                </Box>
                                <Typography component='p' variant='p'> Bitcoin reached the 20-day exponential moving average (EMA) of $27,278 on May 23, but the bulls could not pierce this resistance. The failure to do that attracted aggressive selling by the bears on May 24. The bears are trying to sustain the price below the immediate support at $26,631. If they are successful, the BTC/USDT pair could plummet to the vital support at $25,250. This level may again witness a tough battle between the bulls and the bears. If the bears come out on top, the selling could intensify, and the pair may collapse to the psychologically important level of $20,000. The 20-day EMA remains the key resistance for the bulls to conquer if they want to start a sustained recovery. A short-term trend change is likely to be signaled after the bulls kick the price above the resistance line. </Typography>
                            </Box>
                        </Box>
                        <Typography component='p' variant='p' className='small-caption' sx={{ mt: 3 }}> * Coin Guru accepts no liability for content of the comments or reviews made by the site users. The entire responsibility for the contents rests with the authors.</Typography>
                    </Container>
                </Box >
            </ThemeProvider >
        </>
    )
}

export default Community
