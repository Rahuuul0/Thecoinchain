import React from 'react'
import { Box, Container, Link, Typography } from '@mui/material';
import PriceTicker from './Comman/PriceTicker'
import CryptoList from './Comman/CryptoList';
import FreeGuide from './Comman/FreeGuide';

const Prediction = () => {
    return (
        <Box component="main" sx={{ py: 8 }}>
            <PriceTicker />
            <Box component="div" className='page-head'>
                <Container maxWidth="lg">
                    <Typography component="h3" variant='h3'>
                        Top Cryptocurrency Exchange
                    </Typography>
                    <Typography component="small" variant='body2'>
                        Please <Link href='#'>Subscribe</Link> to get full access to the Most Accurate Short and Long Term Cryptocurrencies' Price Predictions
                    </Typography>
                </Container>
            </Box>
            <Box component="div" className='page-inner'>
                <CryptoList />
                <FreeGuide />
            </Box>
        </Box>
    )
}

export default Prediction
