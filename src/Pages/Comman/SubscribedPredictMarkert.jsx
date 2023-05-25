import React from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { theme } from "../../_common/app.constants"
import { Box, Container, Grid, Typography, Button } from '@mui/material'
import { Link } from 'react-router-dom';
import LearnNEarn from './LearnNEarn';
import CryptoTable from './CryptoTable';
import MarketCard from './MarketCard';
import MarketHero from './MarketHero';

const SubscribedPredictMarkert = () => {
    return (
        <>
            <ThemeProvider theme={theme}>
                <Box component="main" className='market-wrapper' sx={{ mt: 8 }}>
                    <MarketHero />
                    <MarketCard />
                    <Box className='market-inner'>
                        <Container maxWidth="lg">
                            <CryptoTable />
                            <LearnNEarn />

                        </Container>
                    </Box>
                </Box >
            </ThemeProvider>
        </>
    )
}

export default SubscribedPredictMarkert
