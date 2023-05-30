import React from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { theme } from "../../_common/app.constants"
import { Box, Container, Grid, Typography, Button } from '@mui/material'
import { Link } from 'react-router-dom';
import LearnNEarn from './LearnNEarn';
import CryptoTable from './CryptoTable';
import MarketCard from './MarketCard';
import MarketHero from './MarketHero';
import { useEffect } from "react"

const Market = () => {

    useEffect(() => { window.scrollTo({ top: 0, left: 0, behavior: "smooth" }) });

    return (
        <>
            <ThemeProvider theme={theme}>
                <Box component="main" className='market-wrapper' sx={{ mt: 8 }}>
                    <MarketHero />
                    <MarketCard />
                    <Box className='market-inner'>
                        <Container maxWidth="lg">

                            <CryptoTable />

                            <Box className='price-prediction'>
                                <Typography component="h2" variant='h2'>
                                    Cryptocurrency Price Predictions
                                </Typography>
                                <Typography component="p" variant='body1' className='body-large' sx={{ color: '#3B3B3B' }}>
                                    Please <Link href="#" style={{ color: '#FFD166' }}>Subscribe</Link> now to gain complete access to the most precise short and long-term predictions of cryptocurrency prices.
                                </Typography>
                            </Box>

                            <LearnNEarn />

                        </Container>
                    </Box>
                </Box>
            </ThemeProvider>
        </>
    )
}

export default Market
